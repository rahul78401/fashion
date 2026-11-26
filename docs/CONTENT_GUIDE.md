# Content guide — Khushi's Atelier

A static, mobile-first fashion-design learning site for one learner: **Khushi**, a fashion-design
student in India. Every lesson exists in **English** and **Hindi** (a toggle at the top switches
language). No backend, no build step — plain JS files.

Project root: `C:\Users\isourcing\Desktop\explor\fashion-design` (Git Bash: `/c/Users/isourcing/Desktop/explor/fashion-design`).
The shell resets its working directory after every command, so start each command with
`cd /c/Users/isourcing/Desktop/explor/fashion-design && ...`.

## 1. Files you own

| What | Where |
|---|---|
| One module | `content/modules/<module-id>.js` (file name = module id) |
| Its photos | `assets/img/<module-id>/<name>.jpg` (+ `.sm.jpg` + `.json`, made by the tool) |
| Its diagrams | inside the same module file, above `FD.module(...)` |

Do **not** edit shared files (`assets/js/*`, `assets/css/*`, `index.html`, `tools/*`). If you need
something shared (a new icon, a new block type), say so in your report instead.

## 2. Module file shape

```js
/* Module 6 - Fabrics & Fibres */
FD.diagram("fabrics-weave-plain", function (a, lang) { /* return an <svg> string */ });

FD.module({
  id: "fabrics",              // = file name, lowercase-kebab
  num: 6,                     // position in the learning path (given to you)
  level: "basic",             // "basic" | "intermediate"
  title:   { en: "Fabrics & Fibres", hi: "फ़ैब्रिक और फ़ाइबर" },
  tagline: { en: "Know your cloth: where it comes from and how it behaves", hi: "..." },
  cover: "assets/img/fabrics/cover.jpg",
  learn: [ {en, hi}, ... ],   // 3-5 "You will learn" bullets
  lessons: [
    { id: "natural-fibres", title: {en, hi}, min: 6, blocks: [ ...blocks ] },
    ...                       // 4-7 lessons
  ],
  quiz: [                     // 8-10 questions
    { q: {en, hi}, options: [{en, hi}, {en, hi}, {en, hi}], answer: 1, why: {en, hi},
      src: "assets/img/...jpg" /* optional photo */, dg: "name" /* optional diagram */ }
  ]
});
```

`T` below means a text: `{ en: "...", hi: "..." }`. A plain string is allowed only when it is the
same in both languages (a name like "Coco Chanel", a year, a hex code).
Inside any text you may use `**bold**` — nothing else (no HTML).

## 3. Blocks

| `t` | Fields | Use for |
|---|---|---|
| `p` | `text: T` | A short paragraph (max 3 sentences). |
| `h` | `text: T` | A small heading inside a lesson. |
| `img` | `src`, `caption?: T` | One big photo (full width on phones). |
| `gallery` | `items: [{ src` or `dg, args?`, `label: T, note?: T }]`, `cols?: 2\|3` | Grid of photos/diagrams with labels — "types of X". 4-8 items. Default 2 columns. |
| `cards` | `items: [{ title: T, text?: T, icon?` or `src?` or `dg? }]` | Concept cards (2-6). Icon names: see §7. |
| `compare` | `items: [A, B]`, each `{ title: T, src?/dg?, points: [T] }` | Side-by-side: woven vs knit, couture vs fast fashion. |
| `steps` | `items: [{ title: T, text?: T, src?/dg? }]` | Numbered how-to steps. |
| `list` | `items: [T]`, `style?: "dot"\|"check"\|"num"` | Simple bullet list. |
| `tip` | `kind: "tip"\|"remember"\|"mistake"\|"fact"`, `text: T` | Callouts: 💡 tip, 📌 remember, ⚠️ common mistake, ✨ fun fact. |
| `try` | `text: T` | "Try this" practice task (sketchbook / hands-on). These also appear in the Practice tab. **One per lesson.** |
| `terms` | `items: [{ en: "Selvedge", hi: "सेल्वेज", def: T }]` | Key words of the lesson. These also build the site glossary. 3-6 per lesson. |
| `dg` | `name`, `args?`, `caption?: T` | One SVG diagram (see §6). |
| `swatches` | `items: [{ c: "#hex", label?: T }]`, `caption?: T` | Colour chips (palettes). |
| `table` | `head: [T]`, `rows: [[T]]` | Small tables only (max 4 columns — phones!). |
| `timeline` | `items: [{ when: "1920s", title: T, text?: T, src?/dg? }]` | History. |
| `quote` | `text: T`, `by: "Name"` | A designer quote. |

A good lesson (≈ 4-7 min) flows like:
`p` (hook, why it matters) → visual → `p`/`cards` (explain) → visual (`gallery`/`dg`/`compare`) →
`tip` → `terms` → `try`. **At least 2 visual blocks per lesson** (img, gallery, dg, swatches,
timeline, or cards/steps/compare items with `src`/`dg`). Visuals are the priority of this site —
when a picture can explain it, use a picture.

## 4. Writing style

**English** — explain it like a friendly older sister / a patient tutor (patiently explaining to
a beginner):
- Simple words, short sentences (aim < 18 words). No jargon without explaining it right there:
  "A **silhouette** is the outer shape of an outfit — like its shadow."
- Talk to her: "you". Warm, encouraging, never childish.
- Use Indian everyday examples: kurta, saree, lehenga, school uniform, jeans, the local darzi,
  Diwali and wedding outfits, Sarojini Nagar / local market, Bollywood looks.
- Basic → intermediate. Be accurate (this is her study material). Give the real industry term.

**Hindi** — simple spoken Hindi (Hindustani), written in Devanagari:
- Natural, conversational. Not word-by-word translation, not heavy शुद्ध/Sanskrit words.
  Prefer "कपड़ा, रंग, आकार, सिलाई, आसान" over "वस्त्र, परिधान, वर्ण".
- Keep fashion/technical terms in English, written in Devanagari, with the English word in
  brackets the first time in a lesson: "सिल्हूट (Silhouette) यानी आउटफिट का बाहरी आकार — जैसे उसकी परछाई।"
- Talk to her as **तुम**, with feminine verb forms: "तुम सीखोगी", "तुमने देखा होगा", "बनाकर देखो".
- Normal digits (1, 2, 3). Brand/person names may stay in English letters.
- Same meaning and same length as the English. Every English text must have its Hindi.

## 5. Photos

Use real photos generously — this site is for personal study (non-commercial), and we credit
every photo automatically. Prefer **Wikimedia Commons** (best for Indian textiles, crafts,
costumes, history, designers, tools), then **Openverse** (Flickr CC — good for modern fashion,
street style, runway).

```bash
cd /c/Users/isourcing/Desktop/explor/fashion-design && python tools/img.py search "bandhani tie dye" --sheet
cd /c/Users/isourcing/Desktop/explor/fashion-design && python tools/img.py search "street style india" --src openverse --sheet
```
This prints numbered candidates + a `key:` + a `sheet:` path. **Always look at the contact sheet
(open the sheet JPEG with the Read tool) before choosing** — titles lie. Then:
```bash
cd /c/Users/isourcing/Desktop/explor/fashion-design && python tools/img.py get <key> <index> assets/img/<module-id>/<name>.jpg
```
It downloads, resizes for phones, makes `<name>.sm.jpg` and a credit file `<name>.json`.
Search tips: short English queries work best ("chikankari", "kalamkari painting", "dress form",
"tailor india", "saree drape"); add `--n 16` for more choices. Commons searches file names and
descriptions, so try synonyms. If a direct image URL is needed:
`python tools/img.py url <image-url> <dest.jpg> --title ... --author ... --license ... --source <page-url>`.

Pick photos that clearly show the thing, are sharp, not watermarked/collaged with big text, and
decent (no nudity). Names: lowercase-kebab, e.g. `assets/img/fabrics/denim.jpg`.
Cover: `assets/img/<module-id>/cover.jpg` — a beautiful, calm, on-topic photo with the subject in
the centre (it is cropped to a tall card on the home page and a wide banner on the module page).
Aim for **12-30 photos per module**. Don't reuse the same photo twice in a module.

## 6. Diagrams (SVG)

When a drawing explains better than a photo (colour wheel, weave structure, body measurements,
pattern markings, seam cross-sections, a process flow), draw an SVG:

```js
FD.diagram("fabrics-weave-plain", function (a, lang) {
  var s = "";
  for (var r = 0; r < 6; r++) for (var c = 0; c < 6; c++) {
    var over = (r + c) % 2 === 0;
    s += '<rect x="' + (10 + c * 20) + '" y="' + (10 + r * 20) + '" width="18" height="18" rx="3" class="' + (over ? "acf" : "sf") + '"/>';
  }
  return FD.svg(140, 140, s);
});
```

- Name diagrams `<module-id>-<thing>` (they share one global registry).
- `FD.svg(w, h, inner)` wraps the markup in `<svg viewBox="0 0 w h">`; it is drawn 100% wide, so pick
  a viewBox shape that fits a phone (landscape ~ 320×200, square, or tall for figures; for gallery
  items use small viewBoxes like 120×140).
- Style with classes (they follow light/dark mode automatically): `ln` outline (no fill), `fl`
  garment fill + outline, `gd` dashed guide line, `ac` accent stroke, `acf` accent fill, `sf` soft
  tinted fill, `tx` text, `tm` small muted text. Literal hex colours are fine for colour theory.
- Text inside SVG must use the language: `FD.text(x, y, FD.tx({en: "Bust", hi: "बस्ट"}, lang), {cls: "tm", size: 9})`.
  Keep SVG text short; put explanations in captions/labels outside the SVG.
- Helpers: `FD.svg`, `FD.text(x, y, str, {cls, anchor, size})`, `FD.mirror(cx, inner)` (draws `inner` and
  its mirror image around x = cx — handy for symmetric garments), `FD.esc`, `FD.tx(T, lang)`.
- The function gets `(args, lang)`; use `args` to draw variants (e.g. `{ scheme: "triadic" }`).
- Keep it minimal line-art: ~1.5 stroke, round joins, lots of white space.

## 7. Icons (for `cards`)

needle thread scissors tape pencil brush palette hanger dress shirt fabric button pin pushpin ruler
iron machine sparkle heart star eye book camera globe leaf trend store crown user briefcase bulb
layers grid drop sun flower gem shoe bag scale target wave shapes recycle calendar chat award clock
check info alert

## 8. Check your work

```bash
cd /c/Users/isourcing/Desktop/explor/fashion-design && node tools/check.js <module-id> [<module-id> ...]
```
Must end with `OK - 0 errors`. Fix warnings where sensible (e.g. lessons with < 2 visuals).

## 9. Example lesson

```js
{
  id: "necklines",
  title: { en: "Necklines", hi: "नेकलाइन" },
  min: 5,
  blocks: [
    { t: "p", text: {
      en: "The **neckline** is the edge of a garment around your neck. It is the first thing people notice, because it frames your face.",
      hi: "**नेकलाइन (Neckline)** यानी कपड़े का वो किनारा जो गले के आसपास होता है। लोग सबसे पहले इसी को देखते हैं, क्योंकि ये तुम्हारे चेहरे को फ्रेम करती है।" } },
    { t: "gallery", cols: 3, items: [
      { dg: "flat-neckline", args: { type: "v" }, label: { en: "V-neck", hi: "वी-नेक" } },
      { dg: "flat-neckline", args: { type: "boat" }, label: { en: "Boat neck", hi: "बोट नेक" },
        note: { en: "Wide, along the collarbone", hi: "चौड़ी, कॉलरबोन के साथ-साथ" } }
    ] },
    { t: "img", src: "assets/img/garment-details/boat-neck-blouse.jpg",
      caption: { en: "A boat-neck blouse with a silk saree.", hi: "सिल्क साड़ी के साथ बोट-नेक ब्लाउज़।" } },
    { t: "tip", kind: "tip", text: {
      en: "A **V-neck** makes the neck look longer. Great for round faces!",
      hi: "**वी-नेक** से गर्दन लंबी दिखती है। गोल चेहरे पर बहुत अच्छी लगती है!" } },
    { t: "terms", items: [
      { en: "Neckline", hi: "नेकलाइन", def: { en: "The shape of the garment's edge around the neck.", hi: "गले के आसपास कपड़े के किनारे का आकार।" } }
    ] },
    { t: "try", text: {
      en: "Open your wardrobe. Find 3 different necklines and sketch each one in 1 minute.",
      hi: "अपनी अलमारी खोलो। 3 अलग नेकलाइन ढूंढो और हर एक का 1 मिनट में स्केच बनाओ।" } }
  ]
}
```
