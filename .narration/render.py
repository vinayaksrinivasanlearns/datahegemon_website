"""Render every guide slide, message by message, as 1920x1080 stills.

python render.py [BASE_URL]   (default http://127.0.0.1:3000, the dev server)
Writes work/frames/<guide>/<slide>/NN.png and work/frames/<guide>/plan.json:
for each slide, the relative weight (screen time) of each still.
"""
import json
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://127.0.0.1:3000"
OUT = Path(__file__).parent / "work" / "frames"

KINDS = """SLIDES.map(s => s.chat ? s.chat.map(m => ({
  k: m.chip ? 'chip' : m.typing ? 'typing' : m.tap ? 'tap' : m.sheet ? (m.sheet === 'close' ? 'close' : 'open')
     : m.me !== undefined ? 'me' : m.bot !== undefined ? 'bot' : 'other',
  n: String(m.bot || m.me || '').length, pre: !!m.pre })) : null)"""


def plan_slide(items):
    """[(query, weight)] for one slide's chat."""
    if items is None:
        return [("", 1.0)]
    start = 0
    while start < len(items) and (items[start]["k"] == "chip" or items[start]["pre"]):
        start += 1
    frames = [(f"&upto={start}", 0.8)] if start else []
    for k in range(start + 1, len(items) + 1):
        m = items[k - 1]
        if m["k"] == "close":          # the sheet closing shows with the next message
            continue
        if m["k"] == "bot":
            frames.append((f"&upto={k - 1}&typing=1", 0.45))
            frames.append((f"&upto={k}", 1.0 + min(m["n"], 400) / 220))
        elif m["k"] == "tap":
            frames.append((f"&upto={k}", 0.6))
        elif m["k"] == "open":
            frames.append((f"&upto={k}", 0.9))
        else:
            frames.append((f"&upto={k}", 0.7))
    q, w = frames[-1]
    frames[-1] = (q, w + 1.5)          # linger on the finished chat
    return frames


def main():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 1920, "height": 1080})
        for guide in ("resident", "admin"):
            url = f"{BASE}/guides/{guide}-steps.html?render"
            page.goto(url)
            slides = page.evaluate(KINDS)
            plan = []
            for i, items in enumerate(slides):
                d = OUT / guide / f"{i:02d}"
                d.mkdir(parents=True, exist_ok=True)
                for old in d.glob("*.png"):
                    old.unlink()
                frames = plan_slide(items)
                for j, (q, _) in enumerate(frames):
                    page.goto(f"{url}&slide={i}{q}")
                    page.evaluate("document.fonts.ready")
                    page.wait_for_timeout(250)
                    page.screenshot(path=str(d / f"{j:02d}.png"))
                plan.append([w for _, w in frames])
                print(guide, i, len(frames), flush=True)
            (OUT / guide / "plan.json").write_text(json.dumps(plan))
        browser.close()


if __name__ == "__main__":
    main()
