"""Find slide start times: compare the left text column (x 0-45%, y 15-60%) between frames."""
import subprocess, sys
W, H, FPS = 192, 108, 5
def cuts(path):
    raw = subprocess.run(["ffmpeg", "-loglevel", "error", "-i", path, "-vf",
        f"fps={FPS},crop=iw*0.45:ih*0.45:0:ih*0.15,scale={W}:{H},format=gray", "-f", "rawvideo", "-"],
        capture_output=True, check=True).stdout
    n = len(raw) // (W * H)
    frames = [raw[i*W*H:(i+1)*W*H] for i in range(n)]
    out, prev = [0.0], frames[0]
    for i in range(1, n):
        f = frames[i]
        changed = sum(1 for a, b in zip(prev, f) if abs(a - b) > 40) / (W * H)
        if changed > 0.01 and (i / FPS - out[-1]) > 1.0:
            out.append(round(i / FPS - 1 / FPS, 2))
        prev = f
    return out, n / FPS
for p in sys.argv[1:]:
    c, d = cuts(p)
    print(p.split("/")[-1], f"dur={d:.1f}", len(c), c)
