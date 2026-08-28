#!/usr/bin/env python3
"""Regenerate Open Graph cards at 2× (2400×1260) so LinkedIn previews stay sharp."""

from __future__ import annotations

import math
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"

# LinkedIn display size is ~1200×630; render at 2× then keep full-res assets.
SCALE = 2
W, H = 1200 * SCALE, 630 * SCALE
PH_W, PH_H = 1270, 760
GALLERY = ROOT / "docs" / "product-hunt" / "gallery"


def S(n: float, scale: float = SCALE) -> int:
    return int(round(n * scale))


def blob(
    od: ImageDraw.ImageDraw,
    cx: int,
    cy: int,
    r: int,
    color: tuple[int, int, int],
    alpha: int,
) -> None:
    for i in range(12, 0, -1):
        a = int(alpha * (i / 12) * 0.38)
        rr = int(r * (1.18 - i * 0.035))
        od.ellipse([cx - rr, cy - rr, cx + rr, cy + rr], fill=(*color, a))


def draw_mark(
    draw: ImageDraw.ImageDraw,
    mark_x: int,
    mark_y: int,
    mark_s: int,
    scale: float = SCALE,
) -> None:
    draw.rounded_rectangle(
        [mark_x, mark_y, mark_x + mark_s, mark_y + mark_s],
        radius=S(20, scale),
        fill="#000000",
    )
    scale = mark_s / 256
    bars = [
        (48, 48, 20, 160, "#FFFFFF", 0),
        (84, 48, 20, 160, "#FFFFFF", 0),
        (120, 48, 20, 160, "#FFFFFF", 0),
        (156, 48, 20, 160, "#FFFFFF", 0),
        (184, 48, 20, 160, "#FF6A00", 16),
    ]
    for bx, by, bw, bh, color, rot in bars:
        if rot == 0:
            x0 = mark_x + bx * scale
            y0 = mark_y + by * scale
            draw.rounded_rectangle(
                [x0, y0, x0 + bw * scale, y0 + bh * scale],
                radius=max(2, int(10 * scale)),
                fill=color,
            )
            continue
        cx = mark_x + (184 + 10) * scale
        cy = mark_y + 128 * scale
        w, h = 20 * scale, 160 * scale
        rad = math.radians(rot)
        pts = []
        for x, y in [(-w / 2, -h / 2), (w / 2, -h / 2), (w / 2, h / 2), (-w / 2, h / 2)]:
            pts.append(
                (
                    cx + x * math.cos(rad) - y * math.sin(rad),
                    cy + x * math.sin(rad) + y * math.cos(rad),
                )
            )
        draw.polygon(pts, fill=color)


def base_canvas(width: int = W, height: int = H, scale: float = SCALE) -> Image.Image:
    img = Image.new("RGB", (width, height), "#f6f1e8")
    overlay = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    blob(od, S(160, scale), S(-20, scale), S(460, scale), (196, 92, 74), 85)
    blob(od, S(1040, scale), S(80, scale), S(420, scale), (42, 122, 110), 75)
    blob(od, S(780, scale), S(580, scale), S(380, scale), (74, 93, 138), 50)
    return Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")


def band(
    draw: ImageDraw.ImageDraw,
    width: int = W,
    height: int = H,
    scale: float = SCALE,
) -> None:
    colors = ["#c45c4a", "#c4923a", "#2a7a6e", "#4a5d8a", "#b86b7a"]
    bw = width // len(colors)
    bar_h = S(12, scale)
    for i, c in enumerate(colors):
        draw.rectangle(
            [i * bw, height - bar_h, (i + 1) * bw if i < 4 else width, height],
            fill=c,
        )


def load_font(paths: list[str], size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    for path in paths:
        if Path(path).exists():
            try:
                return ImageFont.truetype(path, size)
            except OSError:
                continue
    return ImageFont.load_default()


def fonts(scale: float = SCALE) -> dict[str, ImageFont.FreeTypeFont | ImageFont.ImageFont]:
    serif_bold = [
        "/System/Library/Fonts/Supplemental/Georgia Bold.ttf",
        "/Library/Fonts/Georgia Bold.ttf",
        "/System/Library/Fonts/Supplemental/Times New Roman Bold.ttf",
        "/System/Library/Fonts/Supplemental/Georgia.ttf",
    ]
    serif = [
        "/System/Library/Fonts/Supplemental/Georgia.ttf",
        "/Library/Fonts/Georgia.ttf",
    ]
    sans = [
        "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/Library/Fonts/Arial.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
    ]
    mono = [
        "/System/Library/Fonts/Menlo.ttc",
        "/System/Library/Fonts/SFNSMono.ttf",
        "/Library/Fonts/Andale Mono.ttf",
    ]
    return {
        "brand": load_font(serif_bold, S(40, scale)),
        "title": load_font(serif_bold, S(68, scale)),
        "body": load_font(sans, S(30, scale)),
        "small": load_font(sans, S(24, scale)),
        "mono": load_font(mono, S(28, scale)),
    }


def chip(
    draw: ImageDraw.ImageDraw,
    text: str,
    font: ImageFont.ImageFont,
    y: int,
    scale: float = SCALE,
) -> None:
    bbox = draw.textbbox((0, 0), text, font=font)
    pad_x, pad_y = S(24, scale), S(18, scale)
    cw = bbox[2] - bbox[0] + pad_x * 2
    ch = bbox[3] - bbox[1] + pad_y * 2
    x = S(72, scale)
    draw.rounded_rectangle([x, y, x + cw, y + ch], radius=S(14, scale), fill="#1a524a")
    draw.text((x + pad_x, y + pad_y - S(1, scale)), text, fill="#f6f1e8", font=font)


def save_pair(img: Image.Image, stem: str) -> None:
    png = PUBLIC / f"{stem}.png"
    jpg = PUBLIC / f"{stem}.jpg"
    img.save(png, "PNG", optimize=True)
    # High quality JPEG — LinkedIn recompresses; start sharp.
    img.convert("RGB").save(jpg, "JPEG", quality=95, optimize=True, subsampling=0)
    print(f"wrote {png.name} {png.stat().st_size}B · {jpg.name} {jpg.stat().st_size}B · {img.size}")


def write_agents(f: dict[str, ImageFont.ImageFont]) -> None:
    img = base_canvas()
    draw = ImageDraw.Draw(img)
    draw_mark(draw, S(72), S(64), S(120))
    draw.text((S(220), S(95)), "Un-Default", fill="#1a1f2e", font=f["brand"])
    draw.text((S(72), S(220)), "After agents write copy,", fill="#1a1f2e", font=f["title"])
    draw.text((S(72), S(300)), "catch racist & sexist defaults.", fill="#1a1f2e", font=f["title"])
    draw.text(
        (S(72), S(395)),
        "Local rules — skill, MCP, and PR check. No account.",
        fill="#3d4558",
        font=f["body"],
    )
    chip(draw, "npx -y anti-default init", f["mono"], S(460))
    draw.text((S(72), S(555)), "darkai.ca/un-default/for-agents", fill="#2a7a6e", font=f["small"])
    band(draw)
    save_pair(img, "og-for-agents")


def write_home(f: dict[str, ImageFont.ImageFont]) -> None:
    img = base_canvas()
    draw = ImageDraw.Draw(img)
    draw_mark(draw, S(72), S(64), S(120))
    draw.text((S(220), S(95)), "Un-Default", fill="#1a1f2e", font=f["brand"])
    draw.text((S(72), S(220)), "Catch racist & sexist", fill="#1a1f2e", font=f["title"])
    draw.text((S(72), S(300)), "defaults before they ship.", fill="#1a1f2e", font=f["title"])
    draw.text(
        (S(72), S(395)),
        "Racist, sexist & ableist — local rules, no account.",
        fill="#3d4558",
        font=f["body"],
    )
    chip(draw, "npx -y anti-default init", f["mono"], S(460))
    draw.text((S(72), S(555)), "darkai.ca/un-default", fill="#2a7a6e", font=f["small"])
    band(draw)
    save_pair(img, "og")


def write_ph_hero() -> None:
    """Product Hunt gallery hero — same card style as OG, 1270×760."""
    scale = PH_W / 1200
    f = fonts(scale)
    img = base_canvas(PH_W, PH_H, scale)
    draw = ImageDraw.Draw(img)
    draw_mark(draw, S(72, scale), S(64, scale), S(120, scale), scale)
    draw.text((S(220, scale), S(95, scale)), "Un-Default", fill="#1a1f2e", font=f["brand"])
    draw.text(
        (S(72, scale), S(220, scale)),
        "Catch racist & sexist",
        fill="#1a1f2e",
        font=f["title"],
    )
    draw.text(
        (S(72, scale), S(300, scale)),
        "defaults before they ship.",
        fill="#1a1f2e",
        font=f["title"],
    )
    draw.text(
        (S(72, scale), S(395, scale)),
        "Racist, sexist & ableist — local rules, no account.",
        fill="#3d4558",
        font=f["body"],
    )
    chip(draw, "npx -y anti-default init", f["mono"], S(460, scale), scale)
    draw.text(
        (S(72, scale), S(555, scale)),
        "darkai.ca/un-default/for-agents",
        fill="#2a7a6e",
        font=f["small"],
    )
    band(draw, PH_W, PH_H, scale)
    GALLERY.mkdir(parents=True, exist_ok=True)
    out = GALLERY / "01-home-hero.png"
    img.save(out, "PNG", optimize=True)
    print(f"wrote {out.relative_to(ROOT)} · {out.stat().st_size}B · {img.size}")


def main() -> None:
    PUBLIC.mkdir(parents=True, exist_ok=True)
    f = fonts()
    write_agents(f)
    write_home(f)
    write_ph_hero()


if __name__ == "__main__":
    main()
