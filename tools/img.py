#!/usr/bin/env python3
"""Find, preview and download openly licensed images for the site.

  python tools/img.py search "block printing india"                 # Wikimedia Commons (default)
  python tools/img.py search "fashion sketch" --src openverse --sheet
  python tools/img.py get <key> <index> assets/img/indian-textiles/block-print.jpg
  python tools/img.py url <image-url> assets/img/x/y.jpg --title "..." --author "..." --source <page-url>
  python tools/img.py credits                                         # rebuild content/credits.js

`search` prints numbered candidates and a <key>. With --sheet it also writes a
numbered contact sheet JPEG (open it with an image viewer to compare picks).
`get` downloads candidate <index> from that search, resizes it for phones
(max 1000 px wide, 1250 px tall, progressive JPEG) and writes a .json credit
file next to it. `credits` collects every .json credit into content/credits.js.
"""
import argparse
import concurrent.futures as cf
import html
import io
import json
import os
import re
import sys
import time

import warnings
warnings.filterwarnings("ignore")
import requests  # noqa: E402
from PIL import Image, ImageDraw, ImageFont, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CACHE = os.path.join(ROOT, "tools", ".cache")
UA = "FashionNotebook/1.0 (personal non-commercial study site)"
COMMONS = "https://commons.wikimedia.org/w/api.php"
OPENVERSE = "https://api.openverse.org/v1/images/"

S = requests.Session()
S.headers["User-Agent"] = UA

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")


def get(url, tries=4, timeout=40, **kw):
    last = None
    for i in range(tries):
        try:
            r = S.get(url, timeout=timeout, **kw)
            if r.status_code in (429, 500, 502, 503, 504):
                wait = min(30, 3 * (i + 1) + int(r.headers.get("Retry-After", "0") or 0))
                last = RuntimeError(f"HTTP {r.status_code} for {url}")
                time.sleep(wait)
                continue
            r.raise_for_status()
            return r
        except requests.RequestException as e:
            last = e
            time.sleep(2 * (i + 1))
    raise last


def slug(s):
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")[:70] or "q"


def strip_html(s):
    s = re.sub(r"<[^>]+>", "", s or "")
    return re.sub(r"\s+", " ", html.unescape(s)).strip()


def to_rgb(im):
    im = ImageOps.exif_transpose(im)
    if im.mode in ("RGBA", "LA") or (im.mode == "P" and "transparency" in im.info):
        im = im.convert("RGBA")
        bg = Image.new("RGB", im.size, (255, 255, 255))
        bg.paste(im, mask=im.split()[-1])
        return bg
    return im.convert("RGB")


# ---------- search providers ----------

def search_commons(q, n):
    params = {
        "action": "query", "format": "json", "formatversion": "2",
        "generator": "search", "gsrsearch": f"{q} filetype:bitmap", "gsrnamespace": "6",
        "gsrlimit": str(n), "prop": "imageinfo",
        "iiprop": "url|size|mime|extmetadata",
        "iiextmetadatafilter": "Artist|LicenseShortName",
        "iiurlwidth": "330",
    }
    pages = get(COMMONS, params=params).json().get("query", {}).get("pages", [])
    pages.sort(key=lambda p: p.get("index", 0))
    out = []
    for p in pages:
        ii = (p.get("imageinfo") or [{}])[0]
        meta = ii.get("extmetadata", {})
        out.append({
            "provider": "Wikimedia Commons",
            "title": re.sub(r"\.(jpe?g|png|tiff?|webp|gif)$", "", p["title"].replace("File:", "", 1), flags=re.I),
            "file": p["title"],
            "thumb": ii.get("thumburl"),
            "orig": ii.get("url"),
            "width": ii.get("width"), "height": ii.get("height"),
            "license": strip_html(meta.get("LicenseShortName", {}).get("value", "")),
            "author": strip_html(meta.get("Artist", {}).get("value", ""))[:120],
            "source": ii.get("descriptionurl"),
        })
    return out


def search_openverse(q, n):
    res = get(OPENVERSE, params={"q": q, "page_size": str(n), "mature": "false"}).json().get("results", [])
    out = []
    for r in res:
        lic = (r.get("license") or "").lower()
        ver = r.get("license_version") or ""
        if lic == "cc0":
            lic_s = "CC0"
        elif lic == "pdm":
            lic_s = "Public domain"
        else:
            lic_s = f"CC {lic.upper()} {ver}".strip()
        out.append({
            "provider": "Openverse / " + (r.get("source") or r.get("provider") or "web"),
            "title": r.get("title") or "Untitled",
            "thumb": r.get("thumbnail"),
            "orig": r.get("url"),
            "width": r.get("width"), "height": r.get("height"),
            "license": lic_s,
            "author": (r.get("creator") or "")[:120],
            "source": r.get("foreign_landing_url"),
        })
    return out


# ---------- contact sheet ----------

def contact_sheet(cands, path, cell=260, cols=4):
    rows = (len(cands) + cols - 1) // cols
    sheet = Image.new("RGB", (cols * cell, rows * cell), "white")
    draw = ImageDraw.Draw(sheet)
    try:
        font = ImageFont.load_default(size=28)
    except TypeError:
        font = ImageFont.load_default()

    def fetch(item):
        i, c = item
        try:
            im = to_rgb(Image.open(io.BytesIO(get(c["thumb"], tries=2, timeout=30).content)))
            im.thumbnail((cell - 10, cell - 10))
            return i, im
        except Exception:
            return i, None

    with cf.ThreadPoolExecutor(4) as ex:
        for i, im in ex.map(fetch, enumerate(cands)):
            x, y = (i % cols) * cell, (i // cols) * cell
            draw.rectangle([x + 2, y + 2, x + cell - 3, y + cell - 3], fill=(236, 233, 228))
            if im:
                sheet.paste(im, (x + (cell - im.width) // 2, y + (cell - im.height) // 2))
            else:
                draw.text((x + 70, y + cell // 2 - 14), "no preview", fill=(120, 120, 120), font=font)
            draw.rectangle([x + 2, y + 2, x + 50, y + 40], fill=(0, 0, 0))
            draw.text((x + 10, y + 5), str(i), fill=(255, 255, 255), font=font)
    sheet.save(path, "JPEG", quality=85)


# ---------- download ----------

def commons_urls(c):
    """Yield candidate download URLs for a Commons file, best first."""
    for w in (960, 1280, 500):
        try:
            params = {"action": "query", "format": "json", "formatversion": "2", "titles": c["file"],
                      "prop": "imageinfo", "iiprop": "url", "iiurlwidth": str(w)}
            ii = get(COMMONS, params=params).json()["query"]["pages"][0]["imageinfo"][0]
            if ii.get("thumburl"):
                yield ii["thumburl"]
        except Exception:
            continue
    if c.get("orig"):
        yield c["orig"]


def save_jpeg(data, dest, maxw=1000, maxh=1250):
    """Write dest (max 1000x1250) plus a small dest.sm.jpg (max 480 wide) for phone grids."""
    if not dest.lower().endswith(".jpg"):
        raise SystemExit("dest must end with .jpg")
    im = to_rgb(Image.open(io.BytesIO(data)))
    if im.width < 300 or im.height < 200:
        raise RuntimeError(f"image too small ({im.width}x{im.height})")
    im.thumbnail((maxw, maxh), Image.LANCZOS)
    os.makedirs(os.path.dirname(os.path.abspath(dest)), exist_ok=True)
    im.save(dest, "JPEG", quality=80, optimize=True, progressive=True)
    sm = im.copy()
    sm.thumbnail((480, 600), Image.LANCZOS)
    sm.save(dest[:-4] + ".sm.jpg", "JPEG", quality=78, optimize=True, progressive=True)
    return im.size


def write_credit(dest, c, size):
    rel = os.path.relpath(os.path.abspath(dest), ROOT).replace("\\", "/")
    side = os.path.splitext(dest)[0] + ".json"
    with open(side, "w", encoding="utf-8") as f:
        json.dump({
            "file": rel, "w": size[0], "h": size[1], "title": c.get("title", ""), "author": c.get("author", ""),
            "license": c.get("license", ""), "source": c.get("source", ""), "provider": c.get("provider", ""),
        }, f, ensure_ascii=False, indent=1)
    return rel


def download_to(urls, dest):
    err = None
    for u in urls:
        try:
            r = get(u, tries=3, timeout=60)
            if not r.headers.get("Content-Type", "").startswith("image/"):
                err = RuntimeError(f"not an image: {u}")
                continue
            return save_jpeg(r.content, dest)
        except Exception as e:
            err = e
    raise SystemExit(f"download failed: {err}")


# ---------- commands ----------

def cmd_search(a):
    q = " ".join(a.query)
    cands = search_commons(q, a.n * 2) if a.src == "commons" else search_openverse(q, a.n * 2)
    cands = [c for c in cands if c.get("thumb") and (c.get("width") or 0) >= a.min_width][: a.n]
    if not cands:
        print("no results - try simpler or different words")
        return
    key = slug(f"{a.src}-{q}")
    os.makedirs(os.path.join(CACHE, "search"), exist_ok=True)
    with open(os.path.join(CACHE, "search", key + ".json"), "w", encoding="utf-8") as f:
        json.dump(cands, f, ensure_ascii=False)
    print(f"key: {key}")
    for i, c in enumerate(cands):
        print(f"[{i}] {c.get('width')}x{c.get('height')}  {c['license'] or '?'}  {c['title'][:90]}  - {c['author'][:40]}")
    if a.sheet:
        os.makedirs(os.path.join(CACHE, "sheets"), exist_ok=True)
        p = os.path.join(CACHE, "sheets", key + ".jpg")
        contact_sheet(cands, p)
        print(f"sheet: {p}")


def cmd_get(a):
    p = os.path.join(CACHE, "search", a.key + ".json")
    if not os.path.exists(p):
        raise SystemExit(f"unknown key {a.key} - run search first")
    cands = json.load(open(p, encoding="utf-8"))
    c = cands[a.index]
    urls = commons_urls(c) if c["provider"] == "Wikimedia Commons" else [c["orig"]]
    size = download_to(urls, a.dest)
    rel = write_credit(a.dest, c, size)
    kb = os.path.getsize(a.dest) // 1024
    print(f"saved {rel} {size[0]}x{size[1]} {kb}KB  ({c['license']}, {c['title'][:60]})")


def cmd_url(a):
    size = download_to([a.url], a.dest)
    rel = write_credit(a.dest, {"title": a.title, "author": a.author, "license": a.license,
                                "source": a.source or a.url, "provider": a.provider}, size)
    print(f"saved {rel} {size[0]}x{size[1]} {os.path.getsize(a.dest) // 1024}KB")


def cmd_credits(a):
    items = []
    img_root = os.path.join(ROOT, "assets", "img")
    for dp, _, files in os.walk(img_root):
        for fn in files:
            if fn.endswith(".json"):
                with open(os.path.join(dp, fn), encoding="utf-8") as f:
                    c = json.load(f)
                if os.path.exists(os.path.join(ROOT, c.get("file", ""))):
                    items.append(c)
    items.sort(key=lambda c: c["file"])
    out = os.path.join(ROOT, "content", "credits.js")
    with open(out, "w", encoding="utf-8") as f:
        f.write("/* Generated by tools/img.py credits - photo sources and licences. */\n")
        f.write("FD.credits = " + json.dumps(items, ensure_ascii=False, indent=0) + ";\n")
    print(f"wrote {len(items)} credits to content/credits.js")


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)
    s = sub.add_parser("search")
    s.add_argument("query", nargs="+")
    s.add_argument("--src", choices=["commons", "openverse"], default="commons")
    s.add_argument("--n", type=int, default=12)
    s.add_argument("--min-width", type=int, default=600)
    s.add_argument("--sheet", action="store_true")
    s.set_defaults(fn=cmd_search)
    g = sub.add_parser("get")
    g.add_argument("key")
    g.add_argument("index", type=int)
    g.add_argument("dest")
    g.set_defaults(fn=cmd_get)
    u = sub.add_parser("url")
    u.add_argument("url")
    u.add_argument("dest")
    u.add_argument("--title", default="")
    u.add_argument("--author", default="")
    u.add_argument("--license", default="")
    u.add_argument("--source", default="")
    u.add_argument("--provider", default="Web")
    u.set_defaults(fn=cmd_url)
    c = sub.add_parser("credits")
    c.set_defaults(fn=cmd_credits)
    a = ap.parse_args()
    a.fn(a)


if __name__ == "__main__":
    main()
