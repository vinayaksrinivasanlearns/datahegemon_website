"""Build the narrated 1080p guide videos from the rendered guide stills.

python render.py                 # first: stills from public/guides (dev server running)
python build.py OUT_DIR [name ...]
Writes <name>.mp4 to OUT_DIR (normally ../public/videos).
"""
import asyncio
import hashlib
import json
import subprocess
import sys
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

import edge_tts

from script import VIDEOS

VOICE, RATE, PITCH = "en-US-ChristopherNeural", "-3%", "-6Hz"
LEAD, TAIL = 0.8, 0.6   # silence before / after each line inside its slide
XF = 0.4                # cross-fade between slides
MIN_UNIT = {"short": 0.6, "full": 0.75}   # seconds per unit of still weight, at least
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


def build(name, out_dir):
    guide, lines, which = VIDEOS[name]
    frames_dir = WORK / "frames" / guide
    plan = json.loads((frames_dir / "plan.json").read_text())
    assert len(plan) == len(lines), (name, len(plan), len(lines))
    work = WORK / name
    work.mkdir(parents=True, exist_ok=True)

    # 1. voice clips (cached by text)
    (WORK / "tts").mkdir(exist_ok=True)
    clips = [WORK / "tts" / (hashlib.sha1(f"{VOICE}{RATE}{PITCH}{l[which]}".encode()).hexdigest()[:12] + ".mp3")
             for l in lines]

    async def all_tts():
        for l, c in zip(lines, clips):
            await speak(l[which], c)
    asyncio.run(all_tts())

    # 2. each slide: its stills, spread over max(voice time, a readable minimum)
    inputs, chains, lens, report = [], [], [], []
    for i, (weights, clip) in enumerate(zip(plan, clips)):
        voice = duration(clip)
        length = max(LEAD + voice + TAIL, sum(weights) * MIN_UNIT[which])
        if i < len(plan) - 1:
            length += XF                       # the fade eats into the end of the slide
        unit = (length - (XF if i else 0)) / sum(weights)
        stills = sorted((frames_dir / f"{i:02d}").glob("*.png"))
        assert len(stills) == len(weights), (name, i)
        txt = ""
        for k, (f, w) in enumerate(zip(stills, weights)):
            d = w * unit + (XF if i and k == 0 else 0)   # first still also covers the fade-in
            txt += f"file '{f.as_posix()}'\nduration {d:.3f}\n"
        txt += f"file '{stills[-1].as_posix()}'\n"
        lst = work / f"slide{i:02d}.txt"
        lst.write_text(txt)
        inputs += ["-f", "concat", "-safe", "0", "-i", str(lst)]
        chains.append(f"[{i}:v]scale=1920:1080:flags=lanczos,fps=30,format=yuv420p,"
                      f"tpad=stop_mode=clone:stop_duration=2,trim=duration={length:.3f},setpts=PTS-STARTPTS,"
                      f"settb=1/30[s{i}]")
        lens.append(length)
        report.append(dict(slide=i, stills=len(weights), voice=round(voice, 2), length=round(length, 2)))

    # slide i becomes visible at starts[i]; the fade into it ends XF later
    starts, t = [], 0.0
    for i, L in enumerate(lens):
        starts.append(t)
        t += L - XF
    total = t + XF
    prev = "s0"
    for i in range(1, len(lens)):
        out = f"x{i}" if i < len(lens) - 1 else "vout"
        chains.append(f"[{prev}][s{i}]xfade=transition=fade:duration={XF}:offset={starts[i]:.3f}[{out}]")
        prev = out

    # 3. voice: each line at its slide's start + LEAD
    n = len(lens)
    for i, (clip, s) in enumerate(zip(clips, starts)):
        inputs += ["-i", str(clip)]
        ms = int((s + LEAD) * 1000)
        chains.append(f"[{n + i}:a]aresample=48000,adelay={ms}|{ms}[a{i}]")
    chains.append("".join(f"[a{i}]" for i in range(n)) +
                  f"amix=inputs={n}:normalize=0:dropout_transition=0,apad,atrim=0:{total:.3f},"
                  f"loudnorm=I=-16:TP=-1.5:LRA=11[aout]")

    graph = work / "graph.txt"
    graph.write_text(";\n".join(chains))
    out = Path(out_dir) / f"{name}.mp4"
    run(["ffmpeg", "-y", "-loglevel", "error", *inputs, "-filter_complex_script", str(graph),
         "-map", "[vout]", "-map", "[aout]",
         "-c:v", "libx264", "-preset", "medium", "-crf", "21", "-profile:v", "high", "-pix_fmt", "yuv420p", "-r", "30",
         "-c:a", "aac", "-b:a", "160k", "-ac", "2", "-ar", "48000",
         "-movflags", "+faststart", "-t", f"{total:.3f}", str(out)])
    (work / "plan.json").write_text(json.dumps(report, indent=1))
    return f"{name}: {total:.1f}s, {out.stat().st_size / 1e6:.1f} MB"


if __name__ == "__main__":
    out_dir, *names = sys.argv[1:]
    Path(out_dir).mkdir(parents=True, exist_ok=True)
    with ThreadPoolExecutor(2) as pool:
        for r in pool.map(lambda n: build(n, out_dir), names or list(VIDEOS)):
            print(r, flush=True)
