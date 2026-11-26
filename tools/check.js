#!/usr/bin/env node
/* Content validator.  node tools/check.js            -> check everything
                       node tools/check.js fabrics    -> check only these module ids
   Exit code 1 when there are errors. Warnings are advice. */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const only = process.argv.slice(2);

const ctx = { console, Math, JSON, Date, String, Number, Array, Object, parseInt, parseFloat, isNaN };
ctx.window = ctx;
vm.createContext(ctx);

function load(rel) {
  const p = path.join(ROOT, rel);
  if (!fs.existsSync(p)) return false;
  try {
    vm.runInContext(fs.readFileSync(p, "utf8"), ctx, { filename: rel });
  } catch (e) {
    errors.push(`${rel}: script error: ${e.message}`);
  }
  return true;
}

const errors = [];
const warns = [];
["assets/js/core.js", "assets/js/icons.js", "assets/js/svg.js", "assets/js/diagrams.js", "assets/js/flats.js"].forEach(load);
const modDir = path.join(ROOT, "content", "modules");
const modFiles = fs.readdirSync(modDir).filter((f) => f.endsWith(".js")).sort();
const fileOf = {};
modFiles.forEach((f) => {
  const before = ctx.FD.modules.length;
  load("content/modules/" + f);
  ctx.FD.modules.slice(before).forEach((m) => (fileOf[m.id] = f));
});
load("content/glossary.js");

const FD = ctx.FD;
const DEV = /[ऀ-ॿ]/;
const BLOCKS = new Set(["p", "h", "img", "gallery", "list", "cards", "compare", "steps", "tip", "try", "terms", "dg", "swatches", "table", "timeline", "quote"]);
const VISUAL = new Set(["img", "gallery", "dg", "swatches", "timeline"]);
const TIPKINDS = new Set(["tip", "remember", "mistake", "fact"]);

let nImg = 0, nDg = 0, nWords = 0, nQuiz = 0, nLessons = 0;
const usedImgs = new Set();

function where(m, l, i) { return `${m}${l ? " > " + l : ""}${i != null ? " > block " + i : ""}`; }

function T(v, at, field, opt) {
  opt = opt || {};
  if (v == null || v === "") { if (!opt.optional) errors.push(`${at}: missing ${field}`); return; }
  if (typeof v === "string") {
    if (!opt.plainOk && v.trim().split(/\s+/).length > 3)
      warns.push(`${at}: ${field} is a plain string ("${v.slice(0, 40)}") - should it be {en, hi}?`);
    checkMarkup(v, at, field);
    return;
  }
  if (typeof v !== "object") { errors.push(`${at}: ${field} must be text or {en, hi}`); return; }
  if (!v.en || !String(v.en).trim()) errors.push(`${at}: ${field}.en is empty`);
  if (!v.hi || !String(v.hi).trim()) errors.push(`${at}: ${field}.hi is empty`);
  else if (!DEV.test(v.hi)) errors.push(`${at}: ${field}.hi has no Hindi (Devanagari) text`);
  if (v.en) checkMarkup(v.en, at, field + ".en");
  if (v.hi) checkMarkup(v.hi, at, field + ".hi");
}

function checkMarkup(s, at, field) {
  if (((s.match(/\*\*/g) || []).length) % 2) warns.push(`${at}: ${field} has an unclosed ** bold marker`);
  if (/<[a-z]/i.test(s)) warns.push(`${at}: ${field} contains HTML - use **bold** only`);
}

function img(src, at) {
  if (!src) return;
  nImg++;
  usedImgs.add(src);
  if (!/^assets\/img\/[a-z0-9-]+\/[a-z0-9._-]+\.jpg$/.test(src)) { errors.push(`${at}: bad image path "${src}" (use assets/img/<module>/<name>.jpg, lowercase)`); return; }
  const p = path.join(ROOT, src);
  if (!fs.existsSync(p)) { errors.push(`${at}: image not found: ${src}`); return; }
  if (!fs.existsSync(p.replace(/\.jpg$/, ".sm.jpg"))) errors.push(`${at}: small version missing for ${src} (download with tools/img.py)`);
  if (!fs.existsSync(p.replace(/\.jpg$/, ".json"))) warns.push(`${at}: credit file missing for ${src}`);
}

function dg(name, args, at) {
  if (!name) return;
  nDg++;
  const fn = FD.diagrams[name];
  if (!fn) { errors.push(`${at}: diagram "${name}" is not defined (FD.diagram("${name}", ...))`); return; }
  ["en", "hi"].forEach((lang) => {
    let out;
    try { out = typeof fn === "function" ? fn(args || {}, lang) : fn; }
    catch (e) { errors.push(`${at}: diagram "${name}" threw (${lang}): ${e.message}`); return; }
    if (typeof out !== "string" || !out.trim().startsWith("<svg") || !/viewBox=/.test(out)) errors.push(`${at}: diagram "${name}" must return an <svg ... viewBox=...> string`);
    else if (/undefined|NaN/.test(out)) errors.push(`${at}: diagram "${name}" output contains undefined/NaN (${lang})`);
  });
}

function icon(name, at) {
  if (name && !FD.icons[name]) errors.push(`${at}: unknown icon "${name}" (see docs/CONTENT_GUIDE.md for the list)`);
}

function visual(item, at) { img(item.src, at); dg(item.dg, item.args, at); icon(item.icon, at); }

function block(b, at) {
  if (!b || !BLOCKS.has(b.t)) { errors.push(`${at}: unknown block type "${b && b.t}"`); return false; }
  switch (b.t) {
    case "p": case "h": T(b.text, at, "text"); break;
    case "img": if (!b.src) errors.push(`${at}: img needs src`); img(b.src, at); T(b.caption, at, "caption", { optional: true }); break;
    case "gallery":
      if (!Array.isArray(b.items) || b.items.length < 2) errors.push(`${at}: gallery needs 2+ items`);
      (b.items || []).forEach((it, k) => { const a = `${at} item ${k}`; if (!it.src && !it.dg) errors.push(`${a}: needs src or dg`); visual(it, a); T(it.label, a, "label"); T(it.note, a, "note", { optional: true }); });
      if (b.cols && ![2, 3].includes(b.cols)) errors.push(`${at}: gallery cols must be 2 or 3`);
      break;
    case "list":
      if (!Array.isArray(b.items) || !b.items.length) errors.push(`${at}: list needs items`);
      (b.items || []).forEach((it, k) => T(it, `${at} item ${k}`, "item"));
      break;
    case "cards":
      if (!Array.isArray(b.items) || b.items.length < 2) errors.push(`${at}: cards needs 2+ items`);
      (b.items || []).forEach((it, k) => { const a = `${at} card ${k}`; T(it.title, a, "title"); T(it.text, a, "text", { optional: true }); visual(it, a); });
      break;
    case "compare":
      if (!Array.isArray(b.items) || b.items.length !== 2) errors.push(`${at}: compare needs exactly 2 items`);
      (b.items || []).forEach((it, k) => { const a = `${at} side ${k}`; T(it.title, a, "title"); visual(it, a); (it.points || []).forEach((p, j) => T(p, `${a} point ${j}`, "point")); if (!(it.points || []).length) errors.push(`${a}: needs points`); });
      break;
    case "steps":
      if (!Array.isArray(b.items) || b.items.length < 2) errors.push(`${at}: steps needs 2+ items`);
      (b.items || []).forEach((it, k) => { const a = `${at} step ${k}`; T(it.title, a, "title"); T(it.text, a, "text", { optional: true }); visual(it, a); });
      break;
    case "tip": if (b.kind && !TIPKINDS.has(b.kind)) errors.push(`${at}: tip kind must be tip|remember|mistake|fact`); T(b.text, at, "text"); break;
    case "try": T(b.text, at, "text"); break;
    case "terms":
      (b.items || []).forEach((it, k) => { const a = `${at} term ${k}`; nWords++; if (!it.en) errors.push(`${a}: needs en`); if (!it.hi || !DEV.test(it.hi)) errors.push(`${a}: needs hi (Hindi word, Devanagari)`); T(it.def, a, "def"); });
      break;
    case "dg": if (!b.name) errors.push(`${at}: dg needs name`); dg(b.name, b.args, at); T(b.caption, at, "caption", { optional: true }); break;
    case "swatches":
      (b.items || []).forEach((it, k) => { if (!/^#[0-9a-f]{3,8}$/i.test(it.c || "")) errors.push(`${at} swatch ${k}: c must be a hex colour`); T(it.label, `${at} swatch ${k}`, "label", { optional: true, plainOk: true }); });
      T(b.caption, at, "caption", { optional: true });
      break;
    case "table":
      (b.head || []).forEach((c, k) => T(c, `${at} head ${k}`, "cell", { plainOk: true }));
      (b.rows || []).forEach((r, j) => { if (r.length !== (b.head || []).length) errors.push(`${at} row ${j}: has ${r.length} cells, head has ${(b.head || []).length}`); r.forEach((c, k) => T(c, `${at} row ${j} cell ${k}`, "cell", { plainOk: true })); });
      break;
    case "timeline":
      (b.items || []).forEach((it, k) => { const a = `${at} item ${k}`; if (!it.when) errors.push(`${a}: needs when`); T(it.title, a, "title"); T(it.text, a, "text", { optional: true }); visual(it, a); });
      break;
    case "quote": T(b.text, at, "text"); if (!b.by) warns.push(`${at}: quote without "by"`); break;
  }
  const hasVisual = VISUAL.has(b.t) || ((b.items || []).some((it) => it && (it.src || it.dg)));
  return hasVisual;
}

const seenIds = new Set(), seenNums = new Set();
FD.modules.slice().sort((a, b) => a.num - b.num).forEach((m) => {
  if (only.length && !only.includes(m.id)) return;
  const at = m.id || "(module without id)";
  if (!m.id || !/^[a-z0-9-]+$/.test(m.id)) errors.push(`${at}: id must be lowercase-kebab`);
  if (fileOf[m.id] && fileOf[m.id] !== m.id + ".js") errors.push(`${at}: file name should be ${m.id}.js (is ${fileOf[m.id]})`);
  if (seenIds.has(m.id)) errors.push(`${at}: duplicate module id`); seenIds.add(m.id);
  if (typeof m.num !== "number") errors.push(`${at}: num must be a number`);
  if (seenNums.has(m.num)) errors.push(`${at}: duplicate num ${m.num}`); seenNums.add(m.num);
  if (!["basic", "intermediate"].includes(m.level)) errors.push(`${at}: level must be basic|intermediate`);
  T(m.title, at, "title"); T(m.tagline, at, "tagline");
  if (!m.cover) errors.push(`${at}: needs cover`); img(m.cover, at + " > cover");
  if (!Array.isArray(m.learn) || m.learn.length < 3) warns.push(`${at}: add 3-5 "learn" bullets`);
  (m.learn || []).forEach((x, k) => T(x, `${at} > learn ${k}`, "item"));
  const lids = new Set();
  if (!Array.isArray(m.lessons) || !m.lessons.length) errors.push(`${at}: no lessons`);
  (m.lessons || []).forEach((l) => {
    nLessons++;
    const la = where(m.id, l.id);
    if (!l.id || !/^[a-z0-9-]+$/.test(l.id)) errors.push(`${la}: lesson id must be lowercase-kebab`);
    if (lids.has(l.id)) errors.push(`${la}: duplicate lesson id`); lids.add(l.id);
    if (l.id === "quiz") errors.push(`${la}: "quiz" is reserved`);
    T(l.title, la, "title");
    if (typeof l.min !== "number") warns.push(`${la}: add min (reading minutes)`);
    if (!Array.isArray(l.blocks) || !l.blocks.length) { errors.push(`${la}: no blocks`); return; }
    let visuals = 0;
    l.blocks.forEach((b, i) => { if (block(b, where(m.id, l.id, i))) visuals++; });
    if (visuals < 2) warns.push(`${la}: only ${visuals} visual block(s) - aim for 2+`);
  });
  if (!Array.isArray(m.quiz) || m.quiz.length < 5) warns.push(`${at}: quiz should have 6-10 questions`);
  (m.quiz || []).forEach((q, k) => {
    nQuiz++;
    const qa = `${at} > quiz ${k}`;
    T(q.q, qa, "q");
    if (!Array.isArray(q.options) || q.options.length < 2 || q.options.length > 4) errors.push(`${qa}: needs 2-4 options`);
    (q.options || []).forEach((o, j) => T(o, `${qa} option ${j}`, "option", { plainOk: true }));
    if (typeof q.answer !== "number" || q.answer < 0 || q.answer >= (q.options || []).length) errors.push(`${qa}: answer must be an index into options`);
    T(q.why, qa, "why");
    img(q.src, qa); dg(q.dg, q.args, qa);
  });
});

(FD.words || []).forEach((w, k) => { nWords++; if (!w.en || !w.hi) errors.push(`glossary ${k}: needs en and hi`); T(w.def, `glossary ${w.en}`, "def"); });

/* images on disk that nothing uses */
if (!only.length) {
  const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
  const imgRoot = path.join(ROOT, "assets", "img");
  if (fs.existsSync(imgRoot)) walk(imgRoot).filter((p) => p.endsWith(".jpg") && !p.endsWith(".sm.jpg")).forEach((p) => {
    const rel = path.relative(ROOT, p).split(path.sep).join("/");
    if (!usedImgs.has(rel) && !rel.startsWith("assets/img/app/")) warns.push(`unused image: ${rel}`);
  });
}

const shown = FD.modules.filter((m) => !only.length || only.includes(m.id));
console.log(`modules ${shown.length} | lessons ${nLessons} | images ${nImg} | diagrams ${nDg} | words ${nWords} | quiz questions ${nQuiz}`);
warns.forEach((w) => console.log("  warn  " + w));
errors.forEach((e) => console.log("  ERROR " + e));
console.log(errors.length ? `\n${errors.length} error(s), ${warns.length} warning(s)` : `\nOK - 0 errors, ${warns.length} warning(s)`);
process.exit(errors.length ? 1 : 0);
