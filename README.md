# fashion

**Khushi's Atelier** is a small, mobile-first website for learning fashion design step by step, in simple English with a one-tap switch to Hindi.

- 13 modules, from Fashion Basics to Design Process & Portfolio (basic to intermediate)
- Lessons with photos, line drawings, tips, key words, practice tasks and a quiz for every module
- Practice tab, a searchable bilingual glossary (Words), and progress saved on the device
- Works offline and can be installed on a phone home screen

## Run it

It is a static site with no build step and no backend. Open `index.html` in a browser, or serve the folder:

```
python -m http.server 8000
```

Then open http://localhost:8000.

## Content

- Modules: `content/modules/<id>.js` (format in `docs/CONTENT_GUIDE.md`)
- Photos: `assets/img/<module>/`, from Wikimedia Commons under open licences. Every photo is credited on the in-app "Photo credits" page.
- Check content: `node tools/check.js`
- Rebuild credits: `python tools/img.py credits`

Made for personal, non-commercial study.
