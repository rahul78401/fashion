/* Module 13 - Design Process & Portfolio */

/* From idea to garment: 10 steps in a zig-zag flow. args.hl = 0..9 highlights one step. */
FD.diagram("design-process-flow", function (a, lang) {
  var steps = [
    { en: "Research", hi: "रिसर्च" }, { en: "Mood board", hi: "मूड बोर्ड" },
    { en: "Colour story", hi: "कलर स्टोरी" }, { en: "Fabric story", hi: "फ़ैब्रिक स्टोरी" },
    { en: "Sketches", hi: "स्केच" }, { en: "Flats & specs", hi: "फ़्लैट और स्पेक्स" },
    { en: "Pattern", hi: "पैटर्न" }, { en: "Toile / sample", hi: "टॉयल / सैंपल" },
    { en: "Fitting", hi: "फ़िटिंग" }, { en: "Final garment", hi: "फ़ाइनल कपड़ा" }];
  var phase = [
    { en: "THINK", hi: "सोचो" }, { en: "THINK", hi: "सोचो" }, { en: "THINK", hi: "सोचो" }, { en: "THINK", hi: "सोचो" },
    { en: "DRAW", hi: "ड्रॉ करो" }, { en: "DRAW", hi: "ड्रॉ करो" },
    { en: "MAKE", hi: "बनाओ" }, { en: "MAKE", hi: "बनाओ" }, { en: "MAKE", hi: "बनाओ" }, { en: "MAKE", hi: "बनाओ" }];
  var hl = typeof a.hl === "number" ? a.hl : -1;
  var W = 128, H = 40, colX = [20, 172], rowY = 10, gap = 62, s = "";
  function pos(i) { var r = Math.floor(i / 2), c = i % 2; if (r % 2) c = 1 - c; return { x: colX[c], y: rowY + r * gap, r: r }; }
  /* connectors first */
  for (var i = 0; i < 9; i++) {
    var p = pos(i), q = pos(i + 1);
    if (p.r === q.r) {
      var ltr = q.x > p.x, x1 = ltr ? p.x + W : p.x, x2 = ltr ? q.x : q.x + W, y = p.y + H / 2;
      s += '<line x1="' + x1 + '" y1="' + y + '" x2="' + x2 + '" y2="' + y + '" class="ac"/>';
      s += ltr ? '<path d="M' + (x2 - 6) + " " + (y - 4) + " L" + x2 + " " + y + " L" + (x2 - 6) + " " + (y + 4) + '" class="ac"/>'
               : '<path d="M' + (x2 + 6) + " " + (y - 4) + " L" + x2 + " " + y + " L" + (x2 + 6) + " " + (y + 4) + '" class="ac"/>';
    } else {
      var cx = p.x + W / 2, y1 = p.y + H, y2 = q.y;
      s += '<line x1="' + cx + '" y1="' + y1 + '" x2="' + cx + '" y2="' + y2 + '" class="ac"/>';
      s += '<path d="M' + (cx - 4) + " " + (y2 - 6) + " L" + cx + " " + y2 + " L" + (cx + 4) + " " + (y2 - 6) + '" class="ac"/>';
    }
  }
  for (var k = 0; k < 10; k++) {
    var b = pos(k), on = k === hl;
    s += '<rect x="' + b.x + '" y="' + b.y + '" width="' + W + '" height="' + H + '" rx="20" class="' + (on ? "sf" : "fl") + '"' + (on ? ' style="stroke:var(--accent)" stroke-width="2.5"' : "") + "/>";
    s += '<circle cx="' + (b.x + 20) + '" cy="' + (b.y + H / 2) + '" r="12" class="' + (on || k === 9 ? "acf" : "sf") + '"/>';
    s += '<text x="' + (b.x + 20) + '" y="' + (b.y + H / 2 + 4) + '" text-anchor="middle" font-size="11" font-weight="700" ' +
      (on || k === 9 ? 'fill="#fff"' : 'class="tx"') + ">" + (k + 1) + "</text>";
    s += FD.text(b.x + 38, b.y + H / 2, FD.tx(steps[k], lang), { cls: on ? "acf" : "tx", anchor: "start", size: 10.5 });
    s += FD.text(b.x + 38, b.y + H / 2 + 11, FD.tx(phase[k], lang), { cls: "tm", anchor: "start", size: 7 });
  }
  return FD.svg(320, rowY + 4 * gap + H + 10, s);
});

/* Where trends come from: a funnel from many sources to the shop rack. */
FD.diagram("design-process-trend-funnel", function (a, lang) {
  var s = "";
  var src = [
    { en: "Runway", hi: "रनवे" }, { en: "Street", hi: "स्ट्रीट" }, { en: "Social media", hi: "सोशल मीडिया" },
    { en: "Films & music", hi: "फ़िल्म, म्यूज़िक" }, { en: "Culture & news", hi: "कल्चर, ख़बरें" }];
  var lv = [
    { y: 64, w: 300, t: { en: "Forecasters spot patterns", hi: "फ़ोरकास्टर पैटर्न पकड़ते हैं" }, sub: { en: "e.g. WGSN, trend agencies", hi: "जैसे WGSN, ट्रेंड एजेंसी" } },
    { y: 110, w: 236, t: { en: "Trend report", hi: "ट्रेंड रिपोर्ट" }, sub: { en: "colours, fabrics, shapes", hi: "रंग, फ़ैब्रिक, आकार" } },
    { y: 156, w: 172, t: { en: "Designers & brands", hi: "डिज़ाइनर और ब्रांड" }, sub: { en: "pick what fits them", hi: "अपने हिसाब से चुनते हैं" } },
    { y: 202, w: 108, t: { en: "Shops", hi: "दुकानें" }, sub: { en: "and your wardrobe", hi: "और तुम्हारी अलमारी" } }];
  /* source chips */
  var cw = 60;
  src.forEach(function (t, i) {
    var x = 10 + i * (cw + 2);
    s += '<rect x="' + x + '" y="6" width="' + cw + '" height="24" rx="12" class="sf"/>';
    s += FD.text(x + cw / 2, 21, FD.tx(t, lang), { cls: "tx", size: 7.5 });
    s += '<line x1="' + (x + cw / 2) + '" y1="31" x2="' + (160 + (x + cw / 2 - 160) * 0.55) + '" y2="' + (lv[0].y - 20) + '" class="gd"/>';
  });
  lv.forEach(function (l, i) {
    var x = 160 - l.w / 2, last = i === lv.length - 1;
    s += '<rect x="' + x + '" y="' + (l.y - 20) + '" width="' + l.w + '" height="36" rx="10" class="' + (last ? "acf" : "fl") + '"' + (last ? ' opacity=".9"' : "") + "/>";
    s += '<text x="160" y="' + (l.y - 4) + '" text-anchor="middle" font-size="10" ' + (last ? 'fill="#fff"' : 'class="tx"') + ">" + FD.esc(FD.tx(l.t, lang)) + "</text>";
    s += '<text x="160" y="' + (l.y + 8) + '" text-anchor="middle" font-size="7.5" ' + (last ? 'fill="#fff" opacity=".85"' : 'class="tm"') + ">" + FD.esc(FD.tx(l.sub, lang)) + "</text>";
    if (!last) s += '<path d="M160 ' + (l.y + 17) + ' L160 ' + (lv[i + 1].y - 21) + ' M156 ' + (lv[i + 1].y - 26) + ' L160 ' + (lv[i + 1].y - 21) + ' L164 ' + (lv[i + 1].y - 26) + '" class="ac"/>';
  });
  return FD.svg(320, 228, s);
});

/* A mood board layout. args.pal = array of hex colours for the colour chips. */
FD.diagram("design-process-moodboard", function (a, lang) {
  var pal = a.pal || ["#2f5d50", "#8fb8a8", "#f2e8d5", "#c9a227", "#5b7db1"];
  var s = '<rect x="6" y="6" width="308" height="208" rx="6" class="fl"/>';
  function pic(x, y, w, h, k) {
    var r = '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="3" style="fill:' + pal[k % pal.length] + '" opacity=".55"/>';
    r += '<path d="M' + (x + 6) + " " + (y + h - 6) + " L" + (x + w * 0.38) + " " + (y + h * 0.45) + " L" + (x + w * 0.58) + " " + (y + h * 0.7) +
      " L" + (x + w * 0.74) + " " + (y + h * 0.55) + " L" + (x + w - 6) + " " + (y + h - 6) + ' Z" class="ln" opacity=".6"/>';
    r += '<circle cx="' + (x + w * 0.78) + '" cy="' + (y + h * 0.28) + '" r="' + Math.min(w, h) * 0.09 + '" class="ln" opacity=".6"/>';
    return r;
  }
  s += pic(16, 16, 124, 104, 0);
  s += pic(148, 16, 76, 58, 1);
  s += pic(232, 16, 72, 100, 4);
  s += pic(148, 82, 76, 70, 3);
  s += pic(16, 128, 60, 76, 1);
  /* fabric swatches with pinked (zig-zag) edges */
  [[86, 130, 0], [122, 136, 2]].forEach(function (f) {
    var x = f[0], y = f[1], d = "M" + x + " " + y;
    for (var i = 0; i < 8; i++) d += " L" + (x + i * 4 + 2) + " " + (y - 3) + " L" + (x + i * 4 + 4) + " " + y;
    d += " L" + (x + 32) + " " + (y + 40) + " L" + x + " " + (y + 40) + " Z";
    s += '<path d="' + d + '" style="fill:' + pal[f[2]] + '" class="ln"/>';
    for (var j = 1; j < 5; j++) s += '<line x1="' + (x + 3) + '" y1="' + (y + j * 8) + '" x2="' + (x + 29) + '" y2="' + (y + j * 8) + '" class="ln" opacity=".25"/>';
  });
  /* colour chips */
  pal.forEach(function (c, i) {
    s += '<circle cx="' + (170 + i * 26) + '" cy="172" r="10" style="fill:' + c + '" class="ln"/>';
  });
  s += FD.text(268, 134, FD.tx({ en: "calm · rainy · fresh", hi: "शांत · बारिश · ताज़ा" }, lang), { cls: "tm", size: 7.5 });
  s += FD.text(222, 205, FD.tx({ en: "MONSOON GARDEN", hi: "मानसून गार्डन" }, lang), { cls: "tx", size: 10 });
  s += FD.text(102, 194, FD.tx({ en: "fabrics", hi: "फ़ैब्रिक" }, lang), { cls: "tm", anchor: "start", size: 7 });
  s += FD.text(222, 192, FD.tx({ en: "colours", hi: "रंग" }, lang), { cls: "tm", size: 7 });
  return FD.svg(320, 220, s);
});

/* A mini-collection line-up: 6 looks in one colour story. args.pal = 5 hex colours. */
FD.diagram("design-process-lineup", function (a, lang) {
  var pal = a.pal || ["#2f5d50", "#8fb8a8", "#f2e8d5", "#c9a227", "#5b7db1"];
  var looks = [
    { p: [["M0 24 L9 25 Q13 31 11 44 L10 56 L24 136 Q12 139 0 139", 0]] },
    { p: [["M0 84 L11 84 L10 138 L2 138 L1 100 L0 100", 2], ["M0 24 L10 25 Q14 31 12 44 L12 60 L17 106 Q9 108 0 108", 4]] },
    { p: [["M0 60 L11 60 L22 114 Q12 117 0 117", 1], ["M0 24 L10 25 Q14 31 12 44 L11 62 Q6 63 0 63", 2]], legs: 117 },
    { p: [["M0 24 L10 25 Q14 31 12 44 L11 60 L14 80 L14 138 L3 138 L1 84 L0 84", 3]] },
    { p: [["M0 60 L12 60 L15 138 L3 138 L1 84 L0 84", 2], ["M0 24 L12 25 Q16 31 15 44 L15 72 Q8 74 0 74", 0]] },
    { p: [["M0 24 L10 25 Q14 31 12 44 L12 64 Q13 96 12 126 Q6 128 0 128", 4], ["M0 58 L12 58 L12 64 L0 64", 3]], legs: 128 }];
  var s = '<line x1="6" y1="150" x2="314" y2="150" class="gd"/>';
  looks.forEach(function (lk, i) {
    var cx = 30 + i * 52, inner = "";
    if (lk.legs) inner += '<path d="M4 ' + lk.legs + ' L5 140" class="ln"/>';
    lk.p.forEach(function (pc) { inner += '<path d="' + pc[0] + '" class="ln" style="fill:' + pal[pc[1]] + '"/>'; });
    s += '<g transform="translate(' + cx + ' 4)">' + FD.mirror(0, inner) +
      '<circle cx="0" cy="12" r="7" class="ln"/><line x1="0" y1="19" x2="0" y2="24" class="ln"/></g>';
    s += FD.text(cx, 164, FD.tx({ en: "Look " + (i + 1), hi: "लुक " + (i + 1) }, lang), { cls: "tm", size: 8 });
  });
  return FD.svg(320, 170, s);
});

/* Usual vs zero-waste pattern layout on a piece of fabric. args.type = "usual" | "zero" */
FD.diagram("design-process-zerowaste", function (a, lang) {
  var z = a.type === "zero", s = "";
  s += '<defs><pattern id="dp-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="3" y1="0" x2="3" y2="6" class="ac" stroke-width="1.2" opacity=".6"/></pattern></defs>';
  s += '<rect x="10" y="10" width="140" height="100" rx="2" fill="url(#dp-hatch)" stroke="none"/>';
  s += '<rect x="10" y="10" width="140" height="100" rx="2" class="ac" stroke-width="1.5"/>';
  if (!z) {
    s += '<path d="M16 16 L62 16 Q70 30 66 42 L66 102 L16 102 Z" class="fl"/>';
    s += '<path d="M74 16 L116 16 Q122 34 116 46 L120 102 L74 102 Z" class="fl"/>';
    s += '<path d="M126 18 Q144 24 144 40 Q144 56 126 62 Z" class="fl"/>';
    s += '<path d="M128 70 Q144 76 144 86 Q144 98 128 104 Z" class="fl"/>';
  } else {
    [[10, 10, 50, 100], [60, 10, 50, 100], [110, 10, 40, 50], [110, 60, 40, 50]].forEach(function (r) {
      s += '<rect x="' + r[0] + '" y="' + r[1] + '" width="' + r[2] + '" height="' + r[3] + '" class="fl"/>';
    });
    s += '<path d="M40 10 Q35 22 26 24" class="gd"/><path d="M80 10 Q85 22 94 24" class="gd"/>';
  }
  s += FD.text(80, 124, FD.tx(z ? { en: "almost nothing wasted", hi: "लगभग कुछ बर्बाद नहीं" } : { en: "striped = waste", hi: "धारियाँ = बर्बादी" }, lang), { cls: "tm", size: 9 });
  return FD.svg(160, 130, s);
});

/* Portfolio page types, drawn as small page thumbnails. args.type = "concept" | "illus" | "flats" | "photo" | "process" | "about" */
FD.diagram("design-process-page", function (a, lang) {
  var t = a.type || "concept", s = '<rect x="4" y="4" width="152" height="108" rx="4" class="fl"/>';
  function lines(x, y, n, w) { var r = ""; for (var i = 0; i < n; i++) r += '<line x1="' + x + '" y1="' + (y + i * 7) + '" x2="' + (x + (i === n - 1 ? w * 0.6 : w)) + '" y2="' + (y + i * 7) + '" class="gd"/>'; return r; }
  function fig(cx, top, fill) {
    return '<circle cx="' + cx + '" cy="' + (top + 6) + '" r="5" class="ln"/>' +
      FD.mirror(cx, (function (d) { return '<path d="' + d + '" class="' + fill + '"/><path d="' + d + '" class="ln"/>'; })(
        "M" + cx + " " + (top + 13) + " L" + (cx + 7) + " " + (top + 14) + " L" + (cx + 6) + " " + (top + 34) + " L" + (cx + 14) + " " + (top + 78) + " L" + cx + " " + (top + 79)));
  }
  if (t === "concept") {
    s += '<rect x="12" y="12" width="60" height="56" rx="2" class="sf"/><rect x="76" y="12" width="36" height="26" rx="2" class="sf"/><rect x="116" y="12" width="32" height="56" rx="2" class="sf"/><rect x="76" y="42" width="36" height="26" rx="2" class="sf"/>';
    ["#2f5d50", "#8fb8a8", "#f2e8d5", "#c9a227", "#5b7db1"].forEach(function (c, i) { s += '<circle cx="' + (20 + i * 16) + '" cy="82" r="6" class="ln" style="fill:' + c + '"/>'; });
    s += lines(104, 80, 3, 44);
  } else if (t === "illus") {
    s += fig(42, 16, "sf") + fig(80, 16, "acf") + fig(118, 16, "sf");
  } else if (t === "flats") {
    var shirt = "M80 18 L70 20 L52 30 L58 44 L66 40 L66 98 L80 98";
    s += FD.mirror(80, '<path d="' + shirt + '" class="ln"/>');
    s += '<path d="M74 19 L80 28 L86 19" class="ln"/><line x1="80" y1="28" x2="80" y2="98" class="gd"/>';
    s += '<line x1="104" y1="40" x2="104" y2="98" class="ac"/><line x1="100" y1="40" x2="108" y2="40" class="ac"/><line x1="100" y1="98" x2="108" y2="98" class="ac"/>';
    s += lines(116, 60, 3, 32) + lines(12, 60, 3, 32);
  } else if (t === "photo") {
    s += '<rect x="12" y="12" width="84" height="92" rx="2" class="sf"/>' + fig(54, 18, "acf");
    s += lines(104, 20, 4, 44);
  } else if (t === "process") {
    s += '<rect x="12" y="12" width="64" height="64" rx="2" class="sf"/>' + fig(44, 14, "fl");
    s += '<rect x="84" y="12" width="64" height="64" rx="2" class="sf"/><path d="M92 64 Q104 30 116 50 T140 24" class="ac"/>';
    s += lines(12, 86, 3, 136);
  } else {
    s += '<circle cx="44" cy="44" r="22" class="sf"/><circle cx="44" cy="38" r="8" class="ln"/><path d="M30 60 Q44 46 58 60" class="ln"/>';
    s += '<line x1="80" y1="28" x2="140" y2="28" class="ac" stroke-width="3"/>' + lines(80, 42, 5, 64) + lines(20, 80, 3, 120);
  }
  return FD.svg(160, 116, s);
});

var DPI = "assets/img/design-process/";

FD.module({
  id: "design-process",
  num: 13,
  level: "intermediate",
  title: { en: "Design Process & Portfolio", hi: "डिज़ाइन प्रोसेस और पोर्टफ़ोलियो" },
  tagline: { en: "From a spark of inspiration to a finished garment and a portfolio that shows it off", hi: "इंस्पिरेशन की चिंगारी से तैयार कपड़े तक, और एक पोर्टफ़ोलियो जो तुम्हारा काम दिखाए" },
  cover: DPI + "cover.jpg",
  learn: [
    { en: "The 10 steps from research to a finished garment", hi: "रिसर्च से तैयार कपड़े तक के 10 स्टेप" },
    { en: "Where designers find inspiration and how to keep a sketchbook", hi: "डिज़ाइनर को इंस्पिरेशन कहाँ मिलती है और स्केचबुक कैसे रखें" },
    { en: "How to build a mood board, a colour story and a mini collection", hi: "मूड बोर्ड, कलर स्टोरी और मिनी कलेक्शन कैसे बनाएँ" },
    { en: "How trends are forecast, and the basics of sustainable design", hi: "ट्रेंड का अंदाज़ा कैसे लगता है, और टिकाऊ डिज़ाइन की बेसिक बातें" },
    { en: "What to put in your portfolio for college, NIFT and internships", hi: "कॉलेज, NIFT और इंटर्नशिप के लिए पोर्टफ़ोलियो में क्या रखें" }
  ],
  lessons: [
    {
      id: "idea-to-garment",
      title: { en: "From idea to garment", hi: "आइडिया से कपड़े तक" },
      min: 6,
      blocks: [
        { t: "p", text: {
          en: "A garment never starts with a needle. It starts with a **thought**. Professional designers follow a clear path, so a loose idea becomes a real, wearable piece.",
          hi: "कोई भी कपड़ा सुई से शुरू नहीं होता। वो एक **सोच** से शुरू होता है। प्रोफ़ेशनल डिज़ाइनर एक साफ़ रास्ता अपनाते हैं, ताकि ढीला-ढाला आइडिया असली, पहनने लायक कपड़ा बन जाए।" } },
        { t: "dg", name: "design-process-flow", caption: {
          en: "The whole design process in 10 steps: think, draw, then make.",
          hi: "पूरा डिज़ाइन प्रोसेस 10 स्टेप में: सोचो, ड्रॉ करो, फिर बनाओ।" } },
        { t: "steps", items: [
          { title: { en: "Research & mood board", hi: "रिसर्च और मूड बोर्ड" }, text: { en: "Collect pictures, history and ideas around a theme.", hi: "एक थीम के आसपास तस्वीरें, इतिहास और आइडिया इकट्ठा करो।" }, dg: "design-process-flow", args: { hl: 1 } },
          { title: { en: "Colour story & fabric story", hi: "कलर स्टोरी और फ़ैब्रिक स्टोरी" }, text: { en: "Choose 4-6 colours and the fabrics that fit the mood.", hi: "4-6 रंग और मूड के हिसाब से कपड़े चुनो।" }, src: DPI + "colour-chart.jpg" },
          { title: { en: "Sketches, flats & specs", hi: "स्केच, फ़्लैट और स्पेक्स" }, text: { en: "Draw many ideas, pick the best, then draw clean flats with measurements.", hi: "बहुत सारे आइडिया ड्रॉ करो, सबसे अच्छे चुनो, फिर नाप के साथ साफ़ फ़्लैट बनाओ।" }, src: DPI + "sketch-dress.jpg" },
          { title: { en: "Pattern, toile, fitting", hi: "पैटर्न, टॉयल, फ़िटिंग" }, text: { en: "Make the pattern, sew a test version in cheap cloth and fix the fit.", hi: "पैटर्न बनाओ, सस्ते कपड़े में टेस्ट वर्ज़न सिलो और फ़िट ठीक करो।" }, src: DPI + "toile-fitting.jpg" },
          { title: { en: "Final garment", hi: "फ़ाइनल कपड़ा" }, text: { en: "Cut the real fabric, sew with care, finish and photograph.", hi: "असली कपड़ा काटो, ध्यान से सिलो, फ़िनिशिंग करो और फ़ोटो खींचो।" } }
        ] },
        { t: "tip", kind: "mistake", text: {
          en: "Do not skip the **toile**. Cutting your expensive fabric first is the most common beginner mistake.",
          hi: "**टॉयल** मत छोड़ो। पहले महंगा कपड़ा काट देना शुरुआत करने वालों की सबसे आम गलती है।" } },
        { t: "terms", items: [
          { en: "Design brief", hi: "डिज़ाइन ब्रीफ़", def: { en: "A short description of who the design is for and what it must do.", hi: "छोटा सा विवरण कि डिज़ाइन किसके लिए है और उसे क्या करना है।" } },
          { en: "Flat", hi: "फ़्लैट", def: { en: "A neat technical drawing of a garment laid flat, front and back.", hi: "कपड़े का साफ़ टेक्निकल ड्रॉइंग, सपाट रखकर, आगे और पीछे।" } },
          { en: "Spec sheet", hi: "स्पेक शीट", def: { en: "A page with measurements, fabrics and sewing details for the maker.", hi: "एक पेज जिसमें बनाने वाले के लिए नाप, कपड़े और सिलाई की डिटेल हो।" } },
          { en: "Toile", hi: "टॉयल", def: { en: "A test garment sewn in cheap cloth to check the fit.", hi: "फ़िट जाँचने के लिए सस्ते कपड़े में सिला टेस्ट गारमेंट।" } }
        ] },
        { t: "try", text: {
          en: "Pick a garment you love. Write the 10 steps and guess what the designer did at each step. Where did the idea start?",
          hi: "कोई पसंदीदा कपड़ा चुनो। 10 स्टेप लिखो और अंदाज़ा लगाओ कि डिज़ाइनर ने हर स्टेप पर क्या किया होगा। आइडिया कहाँ से शुरू हुआ?" } }
      ]
    },
    {
      id: "inspiration",
      title: { en: "Finding inspiration", hi: "इंस्पिरेशन ढूंढना" },
      min: 6,
      blocks: [
        { t: "p", text: {
          en: "Inspiration is not magic. It is **looking carefully** at the world and saving what you notice. Anything can be a start: a door, a flower, a market, a song.",
          hi: "इंस्पिरेशन कोई जादू नहीं है। ये दुनिया को **ध्यान से देखना** और जो दिखे उसे सहेजना है। कुछ भी शुरुआत बन सकता है: दरवाज़ा, फूल, बाज़ार, गाना।" } },
        { t: "gallery", items: [
          { src: DPI + "art-inspiration.jpg", label: { en: "Art", hi: "कला" }, note: { en: "Paintings give colour mixes and bold shapes", hi: "पेंटिंग से रंगों के मेल और गहरे आकार मिलते हैं" } },
          { src: DPI + "street-style.jpg", label: { en: "Street style", hi: "स्ट्रीट स्टाइल" }, note: { en: "Real people mix clothes in fresh ways", hi: "असली लोग कपड़ों को नए तरीके से मिलाते हैं" } },
          { src: DPI + "sketchbook-page.jpg", label: { en: "Sketchbook", hi: "स्केचबुक" }, note: { en: "A page of drawn ideas, nothing is wasted", hi: "आइडिया से भरा पन्ना, कुछ बेकार नहीं" } }
        ] },
        { t: "cards", items: [
          { icon: "leaf", title: { en: "Nature", hi: "प्रकृति" }, text: { en: "Leaf veins, shells, feathers, monsoon clouds - shapes and colours.", hi: "पत्तियों की नसें, सीपियाँ, पंख, मानसून के बादल - आकार और रंग।" } },
          { icon: "grid", title: { en: "Architecture", hi: "वास्तुकला" }, text: { en: "Arches, jaalis and domes become necklines, cut-outs and prints.", hi: "मेहराब, जालियाँ और गुंबद नेकलाइन, कट-आउट और प्रिंट बन जाते हैं।" } },
          { icon: "globe", title: { en: "Culture & heritage", hi: "संस्कृति और विरासत" }, text: { en: "Festivals, crafts and folk costumes hold centuries of ideas.", hi: "त्योहार, हस्तकला और लोक पोशाकों में सदियों के आइडिया हैं।" } },
          { icon: "clock", title: { en: "History", hi: "इतिहास" }, text: { en: "Look back at old costumes - then give them a modern twist.", hi: "पुरानी पोशाकें देखो - फिर उन्हें मॉडर्न ट्विस्ट दो।" } },
          { icon: "camera", title: { en: "Travel", hi: "सफ़र" }, text: { en: "New places mean new colours, fabrics and ways of dressing.", hi: "नई जगह यानी नए रंग, कपड़े और पहनने के तरीके।" } },
          { icon: "eye", title: { en: "Street & people", hi: "सड़क और लोग" }, text: { en: "Watch what people actually wear to work, college and weddings.", hi: "देखो लोग असल में ऑफ़िस, कॉलेज और शादियों में क्या पहनते हैं।" } }
        ] },
        { t: "dg", name: "design-process-flow", args: { hl: 0 }, caption: {
          en: "Inspiration feeds step 1 (research) - and everything after it.",
          hi: "इंस्पिरेशन स्टेप 1 (रिसर्च) को ताकत देती है - और उसके बाद हर स्टेप को।" } },
        { t: "tip", kind: "tip", text: {
          en: "Always carry your phone camera or a small notebook. Great ideas often show up on a normal bus ride.",
          hi: "फ़ोन का कैमरा या छोटी नोटबुक हमेशा साथ रखो। बढ़िया आइडिया अक्सर आम बस के सफ़र में मिलते हैं।" } },
        { t: "terms", items: [
          { en: "Inspiration", hi: "इंस्पिरेशन", def: { en: "Something that gives you an idea to design from.", hi: "कुछ भी जो तुम्हें डिज़ाइन करने का आइडिया दे।" } },
          { en: "Sketchbook", hi: "स्केचबुक", def: { en: "A notebook for quick drawings, notes and collected ideas.", hi: "तेज़ ड्रॉइंग, नोट्स और इकट्ठा किए आइडिया की कॉपी।" } },
          { en: "Research", hi: "रिसर्च", def: { en: "Studying a topic in depth before you design.", hi: "डिज़ाइन से पहले किसी विषय को गहराई से पढ़ना।" } }
        ] },
        { t: "try", text: {
          en: "Start an inspiration journal. For one week, collect 1 picture or sketch a day. Next to each one write: what do I like about this?",
          hi: "इंस्पिरेशन जर्नल शुरू करो। एक हफ़्ते तक रोज़ 1 तस्वीर या स्केच जमा करो। हर एक के पास लिखो: मुझे इसमें क्या पसंद आया?" } }
      ]
    },
    {
      id: "mood-board",
      title: { en: "Making a mood board", hi: "मूड बोर्ड बनाना" },
      min: 6,
      blocks: [
        { t: "p", text: {
          en: "A **mood board** is a collage that shows the *feeling* of your collection - before you draw a single dress. It helps you, your teacher and your client see the same idea.",
          hi: "**मूड बोर्ड (Mood board)** एक कोलाज है जो तुम्हारे कलेक्शन का *एहसास* दिखाता है - एक भी ड्रेस बनाने से पहले। ये तुम्हें, तुम्हारी टीचर को और क्लाइंट को एक ही आइडिया दिखाता है।" } },
        { t: "img", src: DPI + "designer-studio.jpg", caption: {
          en: "A designer's studio wall pinned with images, sketches and swatches. A real, physical mood board.",
          hi: "डिज़ाइनर के स्टूडियो की दीवार, जिस पर तस्वीरें, स्केच और कपड़े के टुकड़े लगे हैं। असली, फ़िज़िकल मूड बोर्ड।" } },
        { t: "dg", name: "design-process-moodboard", caption: {
          en: "A simple layout: one big hero picture, smaller supporting pictures, fabric swatches, colour chips and a title.",
          hi: "एक आसान लेआउट: एक बड़ी हीरो तस्वीर, छोटी सपोर्टिंग तस्वीरें, कपड़े के टुकड़े, कलर चिप और एक टाइटल।" } },
        { t: "compare", items: [
          { title: { en: "Physical board", hi: "फ़िज़िकल बोर्ड" }, points: [
            { en: "Real fabric, thread and paper you can touch", hi: "असली कपड़ा, धागा और कागज़ जिसे छू सको" },
            { en: "Cut, stick and rearrange by hand", hi: "हाथ से काटो, चिपकाओ, बदलो" },
            { en: "Slower, but very personal", hi: "धीमा, लेकिन बहुत निजी" }] },
          { title: { en: "Digital board", hi: "डिजिटल बोर्ड" }, points: [
            { en: "Pinterest, Canva or PowerPoint", hi: "पिंटरेस्ट, कैनवा या पावरपॉइंट" },
            { en: "Fast, easy to share and change", hi: "तेज़, शेयर करना और बदलना आसान" },
            { en: "Cannot show real fabric feel", hi: "कपड़े का असली एहसास नहीं दिखा सकता" }] }
        ] },
        { t: "h", text: { en: "Example theme: Colours of Rajasthan", hi: "उदाहरण थीम: राजस्थान के रंग" } },
        { t: "gallery", items: [
          { src: DPI + "jaipur-gate.jpg", label: { en: "Arch & green door", hi: "मेहराब और हरा दरवाज़ा" }, note: { en: "Scalloped shape, sage green, gold", hi: "कंगूरेदार आकार, सेज हरा, सुनहरा" } },
          { src: DPI + "mirror-work-market.jpg", label: { en: "Mirror work", hi: "मिरर वर्क" }, note: { en: "Sparkle, embroidery, bright blues and reds", hi: "चमक, कढ़ाई, गहरे नीले और लाल रंग" } },
          { src: DPI + "holi-colours.jpg", label: { en: "Festival colour", hi: "त्योहार के रंग" }, note: { en: "Powder pinks, greens and yellows", hi: "गुलाल जैसे गुलाबी, हरे और पीले" } },
          { src: DPI + "fabric-swatches.jpg", label: { en: "Fabric swatches", hi: "कपड़े के टुकड़े" }, note: { en: "Linen and cotton in earthy tones", hi: "मिट्टी जैसे रंगों में लिनन और कॉटन" } }
        ] },
        { t: "list", style: "check", items: [
          { en: "One clear theme or title", hi: "एक साफ़ थीम या टाइटल" },
          { en: "5-9 pictures, not 30 - choose the strongest", hi: "5-9 तस्वीरें, 30 नहीं - सबसे दमदार चुनो" },
          { en: "A colour palette of 4-6 colours", hi: "4-6 रंगों का कलर पैलेट" },
          { en: "Real fabric swatches or textures", hi: "असली कपड़े के टुकड़े या टेक्सचर" },
          { en: "A few keywords for the mood (calm, bold, playful)", hi: "मूड के कुछ कीवर्ड (शांत, बोल्ड, मज़ेदार)" }
        ] },
        { t: "tip", kind: "tip", text: {
          en: "Leave **empty space**. Overlap a few pictures, but keep one hero image bigger than the rest, so the eye knows where to start.",
          hi: "**खाली जगह** छोड़ो। कुछ तस्वीरें ओवरलैप करो, पर एक हीरो इमेज बाकी से बड़ी रखो, ताकि नज़र को पता रहे कहाँ से शुरू करना है।" } },
        { t: "terms", items: [
          { en: "Mood board", hi: "मूड बोर्ड", def: { en: "A collage of images, colours and fabrics that shows an idea's feeling.", hi: "तस्वीरों, रंगों और कपड़ों का कोलाज जो आइडिया का एहसास दिखाता है।" } },
          { en: "Hero image", hi: "हीरो इमेज", def: { en: "The biggest, strongest picture on the board.", hi: "बोर्ड की सबसे बड़ी और सबसे दमदार तस्वीर।" } },
          { en: "Swatch", hi: "स्वैच", def: { en: "A small cut piece of fabric that shows colour and texture.", hi: "कपड़े का छोटा कटा टुकड़ा जो रंग और टेक्सचर दिखाता है।" } }
        ] },
        { t: "try", text: {
          en: "Choose a theme like 'rainy day' or 'my grandmother's trunk'. Make a mood board on a chart paper or in Canva with 7 pictures, 5 colours and 3 keywords.",
          hi: "'बारिश का दिन' या 'नानी का संदूक' जैसी थीम चुनो। चार्ट पेपर या कैनवा पर 7 तस्वीरों, 5 रंगों और 3 कीवर्ड का मूड बोर्ड बनाओ।" } }
      ]
    },
    {
      id: "mini-collection",
      title: { en: "Designing a mini collection", hi: "मिनी कलेक्शन डिज़ाइन करना" },
      min: 7,
      blocks: [
        { t: "p", text: {
          en: "A **collection** is not just 6 nice dresses. It is 6 looks that clearly **belong together**, like songs on one album. Same story, but not the same song.",
          hi: "**कलेक्शन (Collection)** सिर्फ़ 6 सुंदर ड्रेस नहीं है। ये 6 ऐसे लुक हैं जो साफ़ तौर पर **साथ के** लगते हैं, जैसे एक एल्बम के गाने। कहानी एक, पर गाना अलग-अलग।" } },
        { t: "steps", items: [
          { title: { en: "Theme", hi: "थीम" }, text: { en: "One idea, in a few words. Example: Monsoon Garden.", hi: "एक आइडिया, कुछ शब्दों में। जैसे: मानसून गार्डन।" } },
          { title: { en: "Colour story", hi: "कलर स्टोरी" }, text: { en: "4-6 colours: 2 main, 2 support, 1 pop.", hi: "4-6 रंग: 2 मुख्य, 2 सपोर्ट, 1 पॉप।" } },
          { title: { en: "Fabric story", hi: "फ़ैब्रिक स्टोरी" }, text: { en: "2-4 fabrics with a common feel: cotton, linen, chanderi.", hi: "2-4 कपड़े जिनका एहसास मिलता हो: कॉटन, लिनन, चंदेरी।" } },
          { title: { en: "6-8 looks", hi: "6-8 लुक" }, text: { en: "Mix tops, dresses, co-ords and layers.", hi: "टॉप, ड्रेस, को-ऑर्ड और लेयर्स मिलाओ।" } },
          { title: { en: "Line-up", hi: "लाइन-अप" }, text: { en: "Draw all looks side by side and check the balance.", hi: "सारे लुक साथ-साथ ड्रॉ करो और बैलेंस जाँचो।" } }
        ] },
        { t: "swatches", items: [
          { c: "#2f5d50", label: { en: "Leaf green", hi: "पत्ती हरा" } },
          { c: "#8fb8a8", label: { en: "Sage", hi: "सेज" } },
          { c: "#f2e8d5", label: { en: "Ivory", hi: "आइवरी" } },
          { c: "#c9a227", label: { en: "Mustard", hi: "सरसों" } },
          { c: "#5b7db1", label: { en: "Rain blue", hi: "बारिश नीला" } }
        ], caption: {
          en: "Colour story for 'Monsoon Garden': two deep colours, two soft ones, one bright pop.",
          hi: "'मानसून गार्डन' की कलर स्टोरी: दो गहरे रंग, दो हल्के, और एक चमकदार पॉप।" } },
        { t: "dg", name: "design-process-lineup", caption: {
          en: "A line-up of 6 looks. Different shapes, one colour story.",
          hi: "6 लुक की लाइन-अप। अलग आकार, एक कलर स्टोरी।" } },
        { t: "tip", kind: "remember", text: {
          en: "**Variety within unity.** Keep colours, fabrics and mood the same, but change the shapes, lengths and layers.",
          hi: "**एकता में विविधता।** रंग, कपड़े और मूड एक रखो, पर आकार, लंबाई और लेयर्स बदलो।" } },
        { t: "list", style: "check", items: [
          { en: "Does each look use at least 2 colours from the story?", hi: "क्या हर लुक में कहानी के कम से कम 2 रंग हैं?" },
          { en: "Are there tops, bottoms and one-piece looks?", hi: "क्या टॉप, बॉटम और वन-पीस लुक हैं?" },
          { en: "Is there one star piece that people will remember?", hi: "क्या एक स्टार पीस है जो लोगों को याद रहेगा?" }
        ] },
        { t: "terms", items: [
          { en: "Colour story", hi: "कलर स्टोरी", def: { en: "The small set of colours chosen for a whole collection.", hi: "पूरे कलेक्शन के लिए चुने गए रंगों का छोटा सेट।" } },
          { en: "Fabric story", hi: "फ़ैब्रिक स्टोरी", def: { en: "The set of fabrics chosen to suit the theme.", hi: "थीम के हिसाब से चुने गए कपड़ों का सेट।" } },
          { en: "Line-up", hi: "लाइन-अप", def: { en: "All the looks drawn together to check they work as a group.", hi: "सारे लुक एक साथ ड्रॉ करना, ये देखने के लिए कि वो ग्रुप में जँचते हैं।" } },
          { en: "Co-ord set", hi: "को-ऑर्ड सेट", def: { en: "A matching top and bottom made from the same fabric or print.", hi: "एक ही कपड़े या प्रिंट के मैचिंग टॉप और बॉटम।" } }
        ] },
        { t: "try", text: {
          en: "Plan your own 6-look collection on one page: theme, 5 colours, 3 fabrics and tiny thumbnail sketches of the 6 looks.",
          hi: "एक पेज पर अपना 6 लुक का कलेक्शन प्लान करो: थीम, 5 रंग, 3 कपड़े और 6 लुक के छोटे थंबनेल स्केच।" } }
      ]
    },
    {
      id: "trends-and-sustainability",
      title: { en: "Trends & sustainability", hi: "ट्रेंड और टिकाऊ फ़ैशन" },
      min: 7,
      blocks: [
        { t: "p", text: {
          en: "Trends do not appear by accident. Professional **forecasters** study many sources to spot what people will want 1-2 years from now.",
          hi: "ट्रेंड अचानक नहीं आते। प्रोफ़ेशनल **फ़ोरकास्टर** कई सोर्स देखकर पहचानते हैं कि 1-2 साल बाद लोग क्या चाहेंगे।" } },
        { t: "dg", name: "design-process-trend-funnel", caption: {
          en: "Many sources flow into one trend report. Designers and brands pick what suits them.",
          hi: "कई सोर्स एक ट्रेंड रिपोर्ट में आते हैं। डिज़ाइनर और ब्रांड अपने हिसाब से चुनते हैं।" } },
        { t: "list", items: [
          { en: "Runway: what top designers show", hi: "रनवे: टॉप डिज़ाइनर क्या दिखाते हैं" },
          { en: "Street style and social media: what people really wear", hi: "स्ट्रीट स्टाइल और सोशल मीडिया: लोग असल में क्या पहनते हैं" },
          { en: "Agencies like WGSN publish paid trend reports", hi: "WGSN जैसी एजेंसियाँ पेड ट्रेंड रिपोर्ट छापती हैं" },
          { en: "Culture: films, music, news and big events", hi: "संस्कृति: फ़िल्में, म्यूज़िक, ख़बरें और बड़े इवेंट" }
        ] },
        { t: "h", text: { en: "Designing with care for the planet", hi: "पर्यावरण का ध्यान रखकर डिज़ाइन" } },
        { t: "p", text: {
          en: "Fashion creates lots of waste and water pollution. **Sustainable design** means making clothes that harm people and the planet less.",
          hi: "फ़ैशन से बहुत कचरा और पानी का प्रदूषण होता है। **टिकाऊ डिज़ाइन (Sustainable design)** यानी ऐसे कपड़े बनाना जो लोगों और धरती को कम नुकसान पहुँचाएँ।" } },
        { t: "compare", items: [
          { title: { en: "Usual cutting", hi: "आम कटिंग" }, dg: "design-process-zerowaste", args: { type: "usual" }, points: [
            { en: "Curved pieces leave gaps", hi: "गोल टुकड़े खाली जगह छोड़ते हैं" },
            { en: "10-20% of cloth becomes scrap", hi: "10-20% कपड़ा कतरन बन जाता है" }] },
          { title: { en: "Zero-waste cutting", hi: "ज़ीरो-वेस्ट कटिंग" }, dg: "design-process-zerowaste", args: { type: "zero" }, points: [
            { en: "Pieces fit together like a puzzle", hi: "टुकड़े पज़ल की तरह फ़िट होते हैं" },
            { en: "Almost the full cloth is used", hi: "लगभग पूरा कपड़ा काम आता है" }] }
        ] },
        { t: "cards", items: [
          { icon: "recycle", title: { en: "Upcycling", hi: "अपसाइक्लिंग" }, text: { en: "Turn old clothes into something new and better.", hi: "पुराने कपड़ों को कुछ नया और बेहतर बना दो।" } },
          { icon: "drop", title: { en: "Natural dyes", hi: "प्राकृतिक रंग" }, text: { en: "Indigo, turmeric, madder and pomegranate colour cloth gently.", hi: "नील, हल्दी, मजीठ और अनार कपड़े को हल्के से रंगते हैं।" } },
          { icon: "scissors", title: { en: "Zero-waste patterns", hi: "ज़ीरो-वेस्ट पैटर्न" }, text: { en: "Cut so almost no fabric is thrown. Sarees and dhotis are natural examples!", hi: "ऐसे काटो कि लगभग कपड़ा फेंकना न पड़े। साड़ी और धोती इसके असली उदाहरण हैं!" } },
          { icon: "store", title: { en: "Thrifting", hi: "थ्रिफ्टिंग" }, text: { en: "Buy second-hand from Sarojini-style markets or thrift stores.", hi: "सरोजिनी जैसे बाज़ार या थ्रिफ़्ट स्टोर से सेकंड-हैंड खरीदो।" } }
        ] },
        { t: "img", src: DPI + "natural-dye-vat.jpg", caption: {
          en: "Dyeing cloth in an indigo vat. Natural dyes are slow, but gentle on water and skin.",
          hi: "नील के कुंड में कपड़ा रंगना। प्राकृतिक रंग धीमे हैं, पर पानी और त्वचा के लिए हल्के।" } },
        { t: "tip", kind: "fact", text: {
          en: "A saree is **one uncut piece of cloth**, about 5-6 metres. It is a classic zero-waste garment, made in India for centuries.",
          hi: "साड़ी **कपड़े का एक बिना कटा टुकड़ा** है, करीब 5-6 मीटर। ये ज़ीरो-वेस्ट गारमेंट का क्लासिक उदाहरण है, जो भारत में सदियों से बनता है।" } },
        { t: "terms", items: [
          { en: "Sustainable fashion", hi: "सस्टेनेबल फ़ैशन", def: { en: "Fashion that cares for people and the environment.", hi: "ऐसा फ़ैशन जो लोगों और पर्यावरण का ध्यान रखे।" } },
          { en: "Upcycling", hi: "अपसाइक्लिंग", def: { en: "Making old items into something of higher value.", hi: "पुरानी चीज़ों को ज़्यादा कीमती चीज़ में बदलना।" } },
          { en: "Zero-waste", hi: "ज़ीरो-वेस्ट", def: { en: "A cutting method that leaves almost no fabric waste.", hi: "कटिंग का तरीका जिसमें लगभग कपड़ा बर्बाद नहीं होता।" } },
          { en: "Trend forecasting", hi: "ट्रेंड फ़ोरकास्टिंग", def: { en: "Predicting future colours, shapes and moods.", hi: "आने वाले रंग, आकार और मूड का अंदाज़ा लगाना।" } }
        ] },
        { t: "try", text: {
          en: "Take one old kurta or dupatta. Sketch 3 ways to upcycle it: a bag, a top, a scrunchie, a patchwork piece. Try one this week.",
          hi: "कोई पुराना कुर्ता या दुपट्टा लो। उसे अपसाइकल करने के 3 तरीके स्केच करो: बैग, टॉप, स्क्रंची, पैचवर्क। इस हफ़्ते एक आज़माओ।" } }
      ]
    },
    {
      id: "portfolio",
      title: { en: "Building a portfolio", hi: "पोर्टफ़ोलियो बनाना" },
      min: 7,
      blocks: [
        { t: "p", text: {
          en: "A **portfolio** is your work, shown beautifully. Colleges, NIFT, internships and clients decide about you by looking at it, often before they meet you.",
          hi: "**पोर्टफ़ोलियो (Portfolio)** तुम्हारा काम है, खूबसूरती से दिखाया हुआ। कॉलेज, NIFT, इंटर्नशिप और क्लाइंट अक्सर तुमसे मिलने से पहले इसी को देखकर फ़ैसला करते हैं।" } },
        { t: "gallery", cols: 3, items: [
          { dg: "design-process-page", args: { type: "concept" }, label: { en: "Concept", hi: "कॉन्सेप्ट" }, note: { en: "mood board + colours", hi: "मूड बोर्ड + रंग" } },
          { dg: "design-process-page", args: { type: "illus" }, label: { en: "Illustrations", hi: "इलस्ट्रेशन" }, note: { en: "your looks, drawn", hi: "तुम्हारे लुक, ड्रॉ किए हुए" } },
          { dg: "design-process-page", args: { type: "flats" }, label: { en: "Flats", hi: "फ़्लैट" }, note: { en: "technical drawings", hi: "टेक्निकल ड्रॉइंग" } },
          { dg: "design-process-page", args: { type: "process" }, label: { en: "Process", hi: "प्रोसेस" }, note: { en: "toile, notes, fixes", hi: "टॉयल, नोट्स, सुधार" } },
          { dg: "design-process-page", args: { type: "photo" }, label: { en: "Final photos", hi: "फ़ाइनल फ़ोटो" }, note: { en: "the finished garment", hi: "तैयार कपड़ा" } },
          { dg: "design-process-page", args: { type: "about" }, label: { en: "About me", hi: "मेरे बारे में" }, note: { en: "photo + short bio", hi: "फ़ोटो + छोटा परिचय" } }
        ] },
        { t: "cards", items: [
          { icon: "book", title: { en: "Show the process", hi: "प्रोसेस दिखाओ" }, text: { en: "Reviewers love seeing how you think: mood board, rough sketches, toile and fixes, not only the final dress.", hi: "रिव्यू करने वालों को तुम्हारी सोच देखना पसंद है: मूड बोर्ड, रफ़ स्केच, टॉयल और सुधार, सिर्फ़ फ़ाइनल ड्रेस नहीं।" } },
          { icon: "star", title: { en: "Your best 8-12 pieces", hi: "तुम्हारे सबसे अच्छे 8-12 काम" }, text: { en: "Quality beats quantity. Remove the weak ones, even if you worked hard on them.", hi: "मात्रा से ज़्यादा क्वालिटी। कमज़ोर काम हटा दो, चाहे उन पर कितनी भी मेहनत की हो।" } },
          { icon: "layers", title: { en: "A consistent layout", hi: "एक जैसा लेआउट" }, text: { en: "Same fonts, margins and page style across pages. It looks professional.", hi: "सब पेज पर एक जैसे फ़ॉन्ट, मार्जिन और पेज स्टाइल। इससे प्रोफ़ेशनल लगता है।" } },
          { icon: "camera", title: { en: "Good photographs", hi: "अच्छी फ़ोटो" }, text: { en: "Shoot garments in daylight on a plain background, flat or on a friend or dress form.", hi: "कपड़ों की फ़ोटो दिन की रोशनी में, सादे बैकग्राउंड पर खींचो, फ़्लैट या दोस्त या ड्रेस फ़ॉर्म पर।" } }
        ] },
        { t: "dg", name: "design-process-lineup", caption: {
          en: "An illustration page: show your whole line-up side by side so reviewers see the collection at once.",
          hi: "इलस्ट्रेशन पेज: पूरी लाइन-अप साथ-साथ दिखाओ ताकि देखने वाले एक नज़र में कलेक्शन समझ लें।" } },
        { t: "tip", kind: "tip", text: {
          en: "Make a **digital portfolio** too: one PDF (under 20 MB) plus a Behance or Instagram page. Keep a printed A3 copy for interviews.",
          hi: "**डिजिटल पोर्टफ़ोलियो** भी बनाओ: एक PDF (20 MB से कम) और Behance या Instagram पेज। इंटरव्यू के लिए A3 की प्रिंटेड कॉपी रखो।" } },
        { t: "tip", kind: "mistake", text: {
          en: "Do not add everything you ever made. A crowded portfolio hides your best work.",
          hi: "जो कुछ भी बनाया है, सब मत डालो। भीड़ वाला पोर्टफ़ोलियो तुम्हारे सबसे अच्छे काम को छुपा देता है।" } },
        { t: "list", style: "num", items: [
          { en: "Start with your strongest project", hi: "सबसे मज़बूत प्रोजेक्ट से शुरू करो" },
          { en: "Give each project a title, a one-line idea and 3-4 pages", hi: "हर प्रोजेक्ट को टाइटल, एक लाइन का आइडिया और 3-4 पेज दो" },
          { en: "End with your contact details and a short bio", hi: "अपनी कॉन्टैक्ट डिटेल और छोटे परिचय पर खत्म करो" }
        ] },
        { t: "terms", items: [
          { en: "Portfolio", hi: "पोर्टफ़ोलियो", def: { en: "A curated collection of your best work.", hi: "तुम्हारे सबसे अच्छे काम का चुना हुआ संग्रह।" } },
          { en: "Process page", hi: "प्रोसेस पेज", def: { en: "A page that shows the steps behind a design.", hi: "वो पेज जो डिज़ाइन के पीछे के स्टेप दिखाता है।" } },
          { en: "Presentation", hi: "प्रेज़ेंटेशन", def: { en: "How you explain and show your work to others.", hi: "तुम अपना काम दूसरों को कैसे समझाती और दिखाती हो।" } }
        ] },
        { t: "try", text: {
          en: "Open Canva or a notebook. Make one project spread: title, mood board, colours, 3 illustrations and 2 flats. Show it to a friend and ask what they understood.",
          hi: "कैनवा या नोटबुक खोलो। एक प्रोजेक्ट का स्प्रेड बनाओ: टाइटल, मूड बोर्ड, रंग, 3 इलस्ट्रेशन और 2 फ़्लैट। किसी दोस्त को दिखाओ और पूछो कि उसे क्या समझ आया।" } }
      ]
    }
  ],
  quiz: [
    { q: { en: "Which step comes first in the design process?", hi: "डिज़ाइन प्रोसेस में सबसे पहले कौन सा स्टेप आता है?" },
      options: [{ en: "Sewing the final garment", hi: "फ़ाइनल कपड़ा सिलना" }, { en: "Research", hi: "रिसर्च" }, { en: "Fitting", hi: "फ़िटिंग" }],
      answer: 1, why: { en: "You always begin by researching and collecting ideas.", hi: "शुरुआत हमेशा रिसर्च और आइडिया जमा करने से होती है।" }, dg: "design-process-flow", args: { hl: 0 } },
    { q: { en: "Why do designers sew a toile first?", hi: "डिज़ाइनर पहले टॉयल क्यों सिलते हैं?" },
      options: [{ en: "To check fit in cheap cloth before cutting the real fabric", hi: "असली कपड़ा काटने से पहले सस्ते कपड़े में फ़िट जाँचने के लिए" }, { en: "To sell it", hi: "उसे बेचने के लिए" }, { en: "To avoid drawing flats", hi: "फ़्लैट ड्रॉ करने से बचने के लिए" }],
      answer: 0, why: { en: "A toile lets you fix mistakes cheaply.", hi: "टॉयल से तुम गलतियाँ सस्ते में सुधार लेती हो।" }, src: DPI + "toile-fitting.jpg" },
    { q: { en: "A mood board mainly shows...", hi: "मूड बोर्ड मुख्य रूप से क्या दिखाता है?" },
      options: [{ en: "Exact measurements", hi: "सटीक नाप" }, { en: "The feeling and look of a collection idea", hi: "कलेक्शन आइडिया का एहसास और लुक" }, { en: "The price of the garments", hi: "कपड़ों की कीमत" }],
      answer: 1, why: { en: "It is a collage of pictures, colours and fabrics that sets the mood.", hi: "ये तस्वीरों, रंगों और कपड़ों का कोलाज है जो मूड तय करता है।" }, dg: "design-process-moodboard" },
    { q: { en: "A good mood board has...", hi: "अच्छे मूड बोर्ड में होता है..." },
      options: [{ en: "30 different unrelated pictures", hi: "30 अलग-अलग बेमेल तस्वीरें" }, { en: "One clear theme, a hero image and a palette", hi: "एक साफ़ थीम, हीरो इमेज और पैलेट" }, { en: "Only text", hi: "सिर्फ़ टेक्स्ट" }],
      answer: 1, why: { en: "Focus beats quantity: a theme, a hero image, 4-6 colours.", hi: "फ़ोकस मात्रा से बेहतर है: थीम, हीरो इमेज, 4-6 रंग।" }, src: DPI + "designer-studio.jpg" },
    { q: { en: "What is a colour story?", hi: "कलर स्टोरी क्या है?" },
      options: [{ en: "A fairy tale about colours", hi: "रंगों की परी-कथा" }, { en: "A small set of colours chosen for a whole collection", hi: "पूरे कलेक्शन के लिए चुने गए रंगों का छोटा सेट" }, { en: "All colours in the rainbow", hi: "इंद्रधनुष के सारे रंग" }],
      answer: 1, why: { en: "Usually 4-6 colours that work well together.", hi: "आमतौर पर 4-6 रंग जो साथ में अच्छे लगते हैं।" }, src: DPI + "colour-chart.jpg" },
    { q: { en: "'Variety within unity' in a collection means...", hi: "कलेक्शन में 'एकता में विविधता' का मतलब है..." },
      options: [{ en: "Every look is identical", hi: "हर लुक बिल्कुल एक जैसा" }, { en: "Same colours and mood, but different shapes", hi: "रंग और मूड एक, पर आकार अलग" }, { en: "Every look uses different colours", hi: "हर लुक में अलग रंग" }],
      answer: 1, why: { en: "The looks should feel related but not boring.", hi: "लुक आपस में जुड़े लगें, पर बोरिंग न हों।" }, dg: "design-process-lineup" },
    { q: { en: "Which one is a real source of trend forecasting?", hi: "इनमें से ट्रेंड फ़ोरकास्टिंग का असली सोर्स कौन सा है?" },
      options: [{ en: "Runway, street style and social media", hi: "रनवे, स्ट्रीट स्टाइल और सोशल मीडिया" }, { en: "A lucky draw", hi: "लकी ड्रॉ" }, { en: "Only the weather", hi: "सिर्फ़ मौसम" }],
      answer: 0, why: { en: "Forecasters combine many sources and look for patterns.", hi: "फ़ोरकास्टर कई सोर्स मिलाकर पैटर्न ढूंढते हैं।" }, dg: "design-process-trend-funnel" },
    { q: { en: "What does zero-waste pattern cutting aim for?", hi: "ज़ीरो-वेस्ट पैटर्न कटिंग का लक्ष्य क्या है?" },
      options: [{ en: "Using almost all of the fabric", hi: "लगभग पूरा कपड़ा इस्तेमाल करना" }, { en: "Making clothes smaller", hi: "कपड़े छोटे बनाना" }, { en: "Using more dye", hi: "ज़्यादा रंग इस्तेमाल करना" }],
      answer: 0, why: { en: "Pieces are laid out so almost nothing is left over.", hi: "टुकड़े ऐसे रखे जाते हैं कि लगभग कुछ नहीं बचता।" }, dg: "design-process-zerowaste", args: { type: "zero" } },
    { q: { en: "Which Indian garment is a classic zero-waste example?", hi: "कौन सा भारतीय कपड़ा ज़ीरो-वेस्ट का क्लासिक उदाहरण है?" },
      options: [{ en: "Saree", hi: "साड़ी" }, { en: "Tailored blazer", hi: "सिला हुआ ब्लेज़र" }, { en: "Skinny jeans", hi: "स्कीनी जीन्स" }],
      answer: 0, why: { en: "A saree is one uncut piece of cloth.", hi: "साड़ी कपड़े का एक बिना कटा टुकड़ा है।" } },
    { q: { en: "What should a strong fashion portfolio include?", hi: "मज़बूत फ़ैशन पोर्टफ़ोलियो में क्या होना चाहिए?" },
      options: [{ en: "Only final photos, nothing else", hi: "सिर्फ़ फ़ाइनल फ़ोटो, और कुछ नहीं" }, { en: "Your best work and the process behind it", hi: "तुम्हारा सबसे अच्छा काम और उसके पीछे का प्रोसेस" }, { en: "Everything you ever made", hi: "जो कुछ भी कभी बनाया" }],
      answer: 1, why: { en: "Choose the best 8-12 pieces and show your thinking.", hi: "सबसे अच्छे 8-12 काम चुनो और अपनी सोच दिखाओ।" }, dg: "design-process-page", args: { type: "process" } }
  ]
});
