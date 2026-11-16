"""Build narrated 1080p guide videos.

python build.py SRC_DIR OUT_DIR [name ...]
Reads the 4K slide videos from SRC_DIR (never writes there) and writes <name>.mp4 to OUT_DIR.
"""
import asyncio
import hashlib
import json
import subprocess
import sys
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

import edge_tts

from script import RENDERED, VIDEOS

VOICE, RATE, PITCH = "en-US-ChristopherNeural", "-3%", "-6Hz"
LEAD, TAIL = 0.8, 0.5          # silence before / after each line inside its slide
WORK = Path(__file__).parent / "work"


def run(cmd):
    subprocess.run(cmd, check=True, capture_output=True)


def duration(path):
    out = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of",
                          "default=nw=1:nk=1", str(path)], capture_output=True, text=True, check=True)
    return float(out.stdout.strip())


async def speak(text, path):
    if not path.exists():
        await edge_tts.Communicate(text, VOICE, rate=RATE, pitch=PITCH).save(str(path))


def build(name, src_dir, out_dir):
    src_name, lines, which, starts = VIDEOS[name]
    src = Path(src_dir) / src_name
    work = WORK / name
    work.mkdir(parents=True, exist_ok=True)
    total_src = duration(src)
    assert len(lines) == len(starts), (name, len(lines), len(starts))

    # 1. voice clips (cached by text)
    clips = []
    for text in (l[which] for l in lines):
        h = hashlib.sha1(f"{VOICE}{RATE}{PITCH}{text}".encode()).hexdigest()[:12]
        clips.append(WORK / "tts" / f"{h}.mp3")
    (WORK / "tts").mkdir(exist_ok=True)

    async def all_tts():
        for (l, c) in zip(lines, clips):
            if l[which]:
                await speak(l[which], c)
    asyncio.run(all_tts())

    # 2. video segments at 1080p, holding the last frame when the line is longer than the slide
    seg_files, offsets, used, t = [], [], [], 0.0
    plan = []
    for i, (s, clip) in enumerate(zip(starts, clips)):
        if RENDERED.get((name.split("-")[0], i)) == "skip":  # slide no longer in the product
            continue
        e = starts[i + 1] if i + 1 < len(starts) else total_src
        slot, d = e - s, duration(clip)
        hold = max(0.0, LEAD + d + TAIL - slot)
        seg = work / f"seg{i:02d}.mp4"
        vf = "scale=1920:1080:flags=lanczos,fps=30,format=yuv420p"
        if hold > 0:
            vf += f",tpad=stop_mode=clone:stop_duration={hold:.3f}"
        enc = ["-an", "-c:v", "libx264", "-preset", "medium", "-crf", "21", "-profile:v", "high", "-r", "30"]
        weights = RENDERED.get((name.split("-")[0], i))
        if weights:  # re-rendered slide: stills shown in turn over the same slot
            frames = sorted((WORK / "render" / f"{name.split('-')[0]}-{i}").glob("*.png"))
            assert len(frames) == len(weights), (name, i, len(frames))
            unit = slot / sum(weights)
            lines_txt = "".join(f"file '{f.as_posix()}'\nduration {w * unit:.3f}\n" for f, w in zip(frames, weights))
            lines_txt += f"file '{frames[-1].as_posix()}'\n"  # concat demuxer needs the last file twice
            cl = work / f"render{i:02d}.txt"
            cl.write_text(lines_txt)
            run(["ffmpeg", "-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", str(cl),
                 "-vf", vf, "-t", f"{slot + hold:.3f}", *enc, str(seg)])
        else:
            run(["ffmpeg", "-y", "-loglevel", "error", "-ss", f"{s:.3f}", "-t", f"{slot:.3f}", "-i", str(src),
                 "-vf", vf, *enc, str(seg)])
        seg_files.append(seg)
        offsets.append(t)
        used.append(clip)
        real = duration(seg)
        plan.append(dict(slide=i, src_start=s, slot=round(slot, 2), voice=round(d, 2), hold=round(hold, 2),
                         new_start=round(t, 2)))
        t += real
    total = t

    lst = work / "list.txt"
    lst.write_text("".join(f"file '{p.as_posix()}'\n" for p in seg_files))
    video = work / "video.mp4"
    run(["ffmpeg", "-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", str(lst), "-c", "copy",
         str(video)])

    # 3. voice track: each clip placed at its slide's new start + LEAD
    inputs, chains = [], []
    clips = used
    for i, (clip, off) in enumerate(zip(clips, offsets)):
        inputs += ["-i", str(clip)]
        ms = int((off + LEAD) * 1000)
        chains.append(f"[{i}:a]aresample=48000,adelay={ms}|{ms}[a{i}]")
    mix = "".join(f"[a{i}]" for i in range(len(clips)))
    fc = ";".join(chains) + f";{mix}amix=inputs={len(clips)}:normalize=0:dropout_transition=0," \
         f"apad,atrim=0:{total:.3f},loudnorm=I=-16:TP=-1.5:LRA=11[out]"
    voice = work / "voice.m4a"
    run(["ffmpeg", "-y", "-loglevel", "error", *inputs, "-filter_complex", fc, "-map", "[out]",
         "-ac", "2", "-ar", "48000", "-c:a", "aac", "-b:a", "160k", str(voice)])

    # 4. mux
    out = Path(out_dir) / f"{name}.mp4"
    run(["ffmpeg", "-y", "-loglevel", "error", "-i", str(video), "-i", str(voice), "-map", "0:v", "-map", "1:a",
         "-c", "copy", "-movflags", "+faststart", "-t", f"{total:.3f}", str(out)])
    (work / "plan.json").write_text(json.dumps(plan, indent=1))
    return f"{name}: {total_src:.1f}s -> {total:.1f}s, {out.stat().st_size / 1e6:.1f} MB"


if __name__ == "__main__":
    src_dir, out_dir, *names = sys.argv[1:]
    names = names or list(VIDEOS)
    Path(out_dir).mkdir(parents=True, exist_ok=True)
    with ThreadPoolExecutor(2) as pool:
        for r in pool.map(lambda n: build(n, src_dir, out_dir), names):
            print(r, flush=True)
