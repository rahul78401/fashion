/* Module 2 - Elements & Principles of Design */
(function () {
  var uid = 0;
  function nid(p) { uid++; return p + uid; }
  function t(en, hi, lang) { return FD.tx({ en: en, hi: hi }, lang); }

  /* simple dress figure (120 x 200). Returns {outline, path} */
  var DRESS = "M42 44 L78 44 L74 92 L90 172 L30 172 L46 92 Z";
  function figure(fillCls, extra, clipInner) {
    var id = nid("decl");
    var s = '<circle cx="60" cy="24" r="12" class="ln"/><path d="M56 35 L56 44 M64 35 L64 44" class="ln"/>';
    s += '<path d="M42 46 L33 104 M78 46 L87 104" class="ln"/>';
    s += '<path d="M50 172 L50 194 M70 172 L70 194" class="ln"/>';
    s += '<path d="' + DRESS + '" class="' + (fillCls || "fl") + '"/>';
    if (clipInner) {
      s += '<clipPath id="' + id + '"><path d="' + DRESS + '"/></clipPath><g clip-path="url(#' + id + ')">' + clipInner + "</g>";
      s += '<path d="' + DRESS + '" class="ln"/>';
    }
    return s + (extra || "");
  }

  /* 1. kinds of line */
  FD.diagram("design-elements-line", function (a, lang) {
    var ty = a.type || "vertical", s = "", st = ' class="ac" stroke-width="4"';
    if (ty === "vertical") s = '<path d="M45 10 L45 70 M60 10 L60 70 M75 10 L75 70"' + st + "/>";
    else if (ty === "horizontal") s = '<path d="M20 25 L100 25 M20 40 L100 40 M20 55 L100 55"' + st + "/>";
    else if (ty === "diagonal") s = '<path d="M25 70 L65 10 M45 70 L85 10 M65 70 L105 10"' + st + "/>";
    else if (ty === "curved") s = '<path d="M15 55 C35 5 55 5 60 40 S90 75 105 25"' + st + "/>";
    else if (ty === "zigzag") s = '<path d="M12 55 L27 25 L42 55 L57 25 L72 55 L87 25 L102 55"' + st + "/>";
    else if (ty === "broken") s = '<path d="M15 40 L105 40" class="ac" stroke-width="4" stroke-dasharray="8 7"/><path d="M15 58 L105 58" class="ac" stroke-width="4" stroke-dasharray="1 8"/>';
    return FD.svg(120, 80, s);
  });

  /* 2. stripes on a figure: vertical vs horizontal */
  FD.diagram("design-elements-stripes", function (a, lang) {
    var s = "", i;
    if (a.dir === "h") for (i = 0; i < 14; i++) s += '<rect x="20" y="' + (46 + i * 10) + '" width="80" height="5" class="acf"/>';
    else for (i = 0; i < 10; i++) s += '<rect x="' + (26 + i * 8) + '" y="40" width="4" height="140" class="acf"/>';
    var arrow = a.dir === "h"
      ? '<path d="M8 130 L112 130" class="gd"/><path d="M14 126 L8 130 L14 134 M106 126 L112 130 L106 134" class="ln" stroke-width="1"/>'
      : '<path d="M108 10 L108 194" class="gd"/><path d="M104 16 L108 10 L112 16 M104 188 L108 194 L112 188" class="ln" stroke-width="1"/>';
    return FD.svg(120, 200, figure("fl", arrow, s));
  });

  /* 3. lines inside a garment */
  FD.diagram("design-elements-garment-lines", function (a, lang) {
    var s = "";
    s += '<path d="M92 30 C100 44 120 44 128 30 L150 36 L146 100 L162 200 L58 200 L74 100 L70 36 Z" class="fl"/>';
    s += '<path d="M92 30 C100 44 120 44 128 30" class="ac" stroke-width="3"/>';
    s += '<path d="M84 34 C86 60 88 80 92 100 L86 200 M136 34 C134 60 132 80 128 100 L134 200" class="ac"/>';
    s += '<path d="M100 100 L103 70 L106 100 M114 100 L117 70 L120 100" class="gd"/>';
    s += '<path d="M74 100 L146 100" class="ln"/>';
    for (var i = 0; i < 5; i++) s += '<path d="M' + (98 + i * 6) + ' 104 L' + (96 + i * 7) + ' 196" class="ln" stroke-width="1"/>';
    s += '<path d="M58 200 L162 200" class="ac" stroke-width="3"/>';
    function lab(x, y, x2, y2, en, hi, anc) {
      return '<path d="M' + x + " " + y + " L" + x2 + " " + y2 + '" class="gd"/>' + FD.text(x2 + (anc === "end" ? -3 : 3), y2 + 3, t(en, hi, lang), { cls: "tx", anchor: anc, size: 10 });
    }
    s += lab(110, 41, 178, 18, "Neckline", "नेकलाइन", "start");
    s += lab(133, 60, 178, 60, "Princess seam", "प्रिंसेस सीम", "start");
    s += lab(117, 75, 178, 84, "Dart", "डार्ट", "start");
    s += lab(74, 100, 38, 100, "Waist seam", "वेस्ट सीम", "end");
    s += lab(105, 150, 38, 150, "Pleats", "प्लीट्स", "end");
    s += lab(150, 200, 178, 210, "Hemline", "हेमलाइन", "start");
    return FD.svg(260, 220, s);
  });

  /* 4. geometric vs organic shapes */
  FD.diagram("design-elements-shapes", function (a, lang) {
    var s = "";
    if (a.kind === "organic") {
      s += '<path d="M20 70 C10 40 30 15 45 20 C40 40 45 60 20 70 Z" class="acf" opacity=".85"/>';
      s += '<path d="M70 20 C95 10 110 35 100 55 C92 72 65 75 60 58 C55 45 60 25 70 20 Z" class="sf"/><path d="M70 20 C95 10 110 35 100 55 C92 72 65 75 60 58 C55 45 60 25 70 20 Z" class="ln"/>';
      for (var k = 0; k < 5; k++) {
        var ang = (k * 72 - 90) * Math.PI / 180, cx = 140 + Math.cos(ang) * 11, cy = 45 + Math.sin(ang) * 11;
        s += '<circle cx="' + cx.toFixed(1) + '" cy="' + cy.toFixed(1) + '" r="10" class="acf" opacity=".55"/>';
      }
      s += '<circle cx="140" cy="45" r="6" class="ln"/>';
    } else {
      s += '<rect x="12" y="22" width="44" height="44" class="acf" opacity=".85"/>';
      s += '<circle cx="84" cy="44" r="23" class="sf"/><circle cx="84" cy="44" r="23" class="ln"/>';
      s += '<path d="M140 20 L164 68 L116 68 Z" class="acf" opacity=".55"/><path d="M140 20 L164 68 L116 68 Z" class="ln"/>';
    }
    return FD.svg(176, 88, s);
  });

  /* 5. silhouettes as shapes */
  FD.diagram("design-elements-shape-sil", function (a, lang) {
    var k = a.s || "A", d, g;
    if (k === "A") { d = "M44 30 L56 30 L58 60 L82 130 L18 130 L42 60 Z"; g = "M50 20 L88 136 L12 136 Z"; }
    else if (k === "H") { d = "M34 30 L66 30 L68 130 L32 130 Z"; g = "M26 22 L74 22 L74 136 L26 136 Z"; }
    else if (k === "X") { d = "M32 30 L68 30 L58 70 L76 130 L24 130 L42 70 Z"; g = "M26 24 L74 24 L50 72 L82 136 L18 136 L50 72 Z"; }
    else { d = "M24 30 L76 30 L64 70 L58 130 L42 130 L36 70 Z"; g = "M14 22 L86 22 L50 136 Z"; }
    var s = '<circle cx="50" cy="14" r="8" class="ln"/>';
    s += '<path d="' + g + '" class="gd"/><path d="' + d + '" class="fl"/>';
    return FD.svg(100, 142, s);
  });

  /* 6. pattern tiles */
  FD.diagram("design-elements-pattern", function (a, lang) {
    var ty = a.type || "stripes", id = nid("depat"), s = "", i, j;
    var paisley = "M0 12 C-12 12 -14 -2 -6 -10 C0 -16 6 -17 4 -26 C15 -18 15 10 0 12 Z";
    if (ty === "stripes") for (i = 0; i < 8; i++) s += '<rect x="' + (i * 16) + '" y="0" width="8" height="120" class="acf"/>';
    else if (ty === "checks") {
      for (i = 0; i < 6; i++) s += '<rect x="' + (i * 22) + '" y="0" width="11" height="120" class="acf" opacity=".45"/><rect x="0" y="' + (i * 22) + '" width="120" height="11" class="acf" opacity=".45"/>';
      for (i = 0; i < 6; i++) s += '<path d="M' + (i * 22 + 16) + ' 0 L' + (i * 22 + 16) + ' 120 M0 ' + (i * 22 + 16) + ' L120 ' + (i * 22 + 16) + '" class="ln" stroke-width="1"/>';
    } else if (ty === "polka") {
      for (i = 0; i < 5; i++) for (j = 0; j < 5; j++) s += '<circle cx="' + (12 + j * 24 + (i % 2) * 12) + '" cy="' + (12 + i * 24) + '" r="6" class="acf"/>';
    } else if (ty === "paisley") {
      for (i = 0; i < 3; i++) for (j = 0; j < 3; j++) {
        var x = 20 + j * 40 + (i % 2) * 10, y = 30 + i * 36, rot = (i + j) % 2 ? 30 : -30;
        s += '<g transform="translate(' + x + " " + y + ") rotate(" + rot + ')"><path d="' + paisley + '" class="acf" opacity=".85"/><path d="' + paisley + '" transform="translate(0 3) scale(.5)" class="sf"/><circle cx="0" cy="5" r="1.8" class="acf"/></g>';
      }
    } else if (ty === "floral") {
      var pts = [[28, 30], [88, 26], [58, 66], [24, 98], [96, 96]];
      pts.forEach(function (p, n) {
        for (var q = 0; q < 5; q++) {
          var an = (q * 72 + n * 20) * Math.PI / 180;
          s += '<circle cx="' + (p[0] + Math.cos(an) * 8).toFixed(1) + '" cy="' + (p[1] + Math.sin(an) * 8).toFixed(1) + '" r="6.5" class="acf" opacity=".6"/>';
        }
        s += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="4" class="sf"/>';
      });
    } else if (ty === "chevron") {
      for (i = 0; i < 7; i++) s += '<path d="M-5 ' + (i * 18) + ' L20 ' + (i * 18 + 12) + ' L45 ' + (i * 18) + ' L70 ' + (i * 18 + 12) + ' L95 ' + (i * 18) + ' L120 ' + (i * 18 + 12) + ' L145 ' + (i * 18) + '" class="ac" stroke-width="5"/>';
    } else if (ty === "geometric") {
      for (i = 0; i < 4; i++) for (j = 0; j < 4; j++) {
        var cx = 15 + j * 30, cy = 15 + i * 30;
        s += (i + j) % 2
          ? '<path d="M' + cx + " " + (cy - 12) + " L" + (cx + 12) + " " + cy + " L" + cx + " " + (cy + 12) + " L" + (cx - 12) + " " + cy + ' Z" class="acf"/>'
          : '<path d="M' + (cx - 11) + " " + (cy + 10) + " L" + cx + " " + (cy - 10) + " L" + (cx + 11) + " " + (cy + 10) + ' Z" class="ln"/>';
      }
    } else if (ty === "animal") {
      var spots = [[20, 18], [62, 14], [102, 24], [38, 50], [84, 56], [16, 86], [58, 92], [100, 96], [36, 116]];
      spots.forEach(function (p, n) {
        s += '<ellipse cx="' + p[0] + '" cy="' + p[1] + '" rx="10" ry="7" transform="rotate(' + (n * 37) + " " + p[0] + " " + p[1] + ')" class="ln" stroke-width="3.5" stroke-dasharray="9 4"/>';
        s += '<ellipse cx="' + p[0] + '" cy="' + p[1] + '" rx="4" ry="3" class="acf" opacity=".6"/>';
      });
    } else if (ty === "abstract") {
      s += '<path d="M-5 40 C30 10 50 70 90 30 S130 50 130 50" class="ac" stroke-width="6"/>';
      s += '<circle cx="34" cy="86" r="18" class="acf" opacity=".5"/><rect x="70" y="70" width="34" height="30" transform="rotate(20 87 85)" class="sf"/>';
      s += '<path d="M10 112 L40 100 L60 118 L100 104" class="ln" stroke-width="2"/>';
    }
    var box = '<rect x="0" y="0" width="120" height="120" rx="14"/>';
    return FD.svg(120, 120, '<clipPath id="' + id + '">' + box + '</clipPath><rect x="0" y="0" width="120" height="120" rx="14" class="sf"/><g clip-path="url(#' + id + ')">' + s +
      '</g><rect x="0.75" y="0.75" width="118.5" height="118.5" rx="14" class="ln" stroke-width="1"/>');
  });

  /* 7. balance */
  FD.diagram("design-elements-balance", function (a, lang) {
    var ty = a.type || "sym", s = "";
    if (ty === "radial") {
      s += '<circle cx="60" cy="80" r="50" class="sf"/>';
      for (var k = 0; k < 12; k++) {
        var an = k * 30;
        s += '<g transform="rotate(' + an + ' 60 80)"><path d="M60 72 C54 60 54 42 60 34 C66 42 66 60 60 72 Z" class="acf" opacity="' + (k % 2 ? ".5" : ".9") + '"/></g>';
      }
      s += '<circle cx="60" cy="80" r="8" class="fl"/><circle cx="60" cy="80" r="50" class="ln"/>';
      return FD.svg(120, 160, s);
    }
    if (ty === "asym") {
      s += '<circle cx="60" cy="18" r="10" class="ln"/>';
      s += '<path d="M44 40 L66 32 L78 36 L72 82 L90 150 L30 150 L46 82 Z" class="fl"/>';
      s += '<path d="M66 32 L46 82" class="ac" stroke-width="2"/>';
      s += '<path d="M72 82 C86 96 96 120 98 150 L88 150 C86 126 80 106 72 92 Z" class="acf" opacity=".8"/>';
      s += '<circle cx="66" cy="36" r="5" class="acf"/>';
      s += '<path d="M60 4 L60 158" class="gd"/>';
      return FD.svg(120, 160, s);
    }
    s += '<path d="M60 4 L60 158" class="gd"/>';
    s += FD.mirror(60, '<path d="M60 40 L44 40 L46 82 L30 150 L60 150" class="fl" stroke="none"/><path d="M60 40 L44 40 L46 82 L30 150 L60 150" class="ln"/><circle cx="50" cy="60" r="4" class="acf"/><path d="M38 128 L60 128" class="ac" stroke-width="3"/>');
    s += '<circle cx="60" cy="18" r="10" class="ln"/><path d="M60 4 L60 158" class="gd"/>';
    return FD.svg(120, 160, s);
  });

  /* 8. proportion: top vs bottom */
  FD.diagram("design-elements-proportion", function (a, lang) {
    var r = a.r || "35", topH = r === "equal" ? 60 : r === "35" ? 45 : 75, total = 120, y0 = 34;
    var by = y0 + topH, s = '<circle cx="50" cy="18" r="10" class="ln"/>';
    s += '<path d="M32 ' + y0 + " L68 " + y0 + " L66 " + by + " L34 " + by + ' Z" class="acf" opacity=".85"/>';
    s += '<path d="M34 ' + by + " L66 " + by + " L74 " + (y0 + total) + " L26 " + (y0 + total) + ' Z" class="fl"/>';
    var lt = r === "equal" ? "1" : r === "35" ? "3" : "5", lb = r === "equal" ? "1" : r === "35" ? "5" : "3";
    s += '<path d="M84 ' + y0 + " L84 " + (by - 2) + " M84 " + (by + 2) + " L84 " + (y0 + total) + '" class="gd"/>';
    s += FD.text(92, y0 + topH / 2 + 4, lt, { cls: "tx", size: 13 }) + FD.text(92, by + (total - topH) / 2 + 4, lb, { cls: "tx", size: 13 });
    return FD.svg(104, 162, s);
  });

  /* 9. rhythm */
  FD.diagram("design-elements-rhythm", function (a, lang) {
    var ty = a.type || "repetition", s = "", i;
    if (ty === "repetition") for (i = 0; i < 6; i++) s += '<circle cx="' + (22 + i * 24) + '" cy="40" r="8" class="acf"/>';
    else if (ty === "gradation") { var gx = 6; for (i = 0; i < 6; i++) { var gr = 3 + i * 2.4; gx += gr; s += '<circle cx="' + gx.toFixed(1) + '" cy="40" r="' + gr.toFixed(1) + '" class="acf" opacity="' + (0.3 + i * 0.13).toFixed(2) + '"/>'; gx += gr + 5; } }
    else if (ty === "radiation") {
      for (i = 0; i < 12; i++) { var an = i * 30 * Math.PI / 180; s += '<path d="M' + (80 + Math.cos(an) * 8).toFixed(1) + " " + (40 + Math.sin(an) * 8).toFixed(1) + " L" + (80 + Math.cos(an) * 34).toFixed(1) + " " + (40 + Math.sin(an) * 34).toFixed(1) + '" class="ac" stroke-width="3"/>'; }
      s += '<circle cx="80" cy="40" r="5" class="acf"/>';
    } else if (ty === "alternation") for (i = 0; i < 7; i++) s += i % 2 ? '<rect x="' + (12 + i * 20) + '" y="31" width="16" height="18" rx="3" class="ln"/>' : '<circle cx="' + (20 + i * 20) + '" cy="40" r="9" class="acf"/>';
    return FD.svg(160, 80, s);
  });

  /* 10. emphasis: plain outfit vs one with a focal point */
  FD.diagram("design-elements-emphasis", function (a, lang) {
    var extra = "";
    if (a.focus) {
      extra += '<rect x="44" y="86" width="32" height="9" rx="2" class="acf"/>';
      extra += '<circle cx="60" cy="90" r="22" class="gd"/>';
    }
    return FD.svg(120, 200, figure("fl", extra));
  });

  /* 11. contrast: low vs high */
  FD.diagram("design-elements-contrast", function (a, lang) {
    var hi = a.type === "high", top = hi ? "#111111" : "#cdbfae", bot = hi ? "#f7f3ee" : "#e2d7c9", acc = hi ? "#d7263d" : "#d9ccbb";
    var s = '<circle cx="60" cy="24" r="12" class="ln"/><path d="M56 35 L56 44 M64 35 L64 44" class="ln"/>';
    s += '<path d="M50 172 L50 194 M70 172 L70 194" class="ln"/>';
    s += '<path d="M42 44 L78 44 L74 92 L46 92 Z" fill="' + top + '" stroke="currentColor"/>';
    s += '<path d="M46 92 L74 92 L90 172 L30 172 Z" fill="' + bot + '" stroke="currentColor"/>';
    s += '<path d="M42 46 L33 104 M78 46 L87 104" class="ln"/>';
    s += '<rect x="80" y="100" width="16" height="13" rx="3" fill="' + acc + '" stroke="currentColor"/>';
    return FD.svg(120, 200, s);
  });
})();

FD.module({
  id: "design-elements",
  num: 2,
  level: "basic",
  title: { en: "Elements & Principles of Design", hi: "डिज़ाइन के एलिमेंट और प्रिंसिपल" },
  tagline: {
    en: "The building blocks every designer uses: line, shape, texture, and the rules that make them work together",
    hi: "हर डिज़ाइनर के बेसिक टूल: लाइन, आकार, टेक्सचर, और वो नियम जो इन्हें साथ में सुंदर बनाते हैं" },
  cover: "assets/img/design-elements/cover.jpg",
  learn: [
    { en: "How lines can make a body look taller, wider or softer", hi: "लाइनें शरीर को लंबा, चौड़ा या नरम कैसे दिखाती हैं" },
    { en: "The difference between geometric and organic shapes", hi: "ज्योमेट्रिक और ऑर्गेनिक आकार में क्या फ़र्क है" },
    { en: "Texture and pattern: from velvet and sequins to paisley and plaid", hi: "टेक्सचर और पैटर्न: वेलवेट और सीक्विन से लेकर पेज़ली और चेक तक" },
    { en: "Balance and proportion, and why a 3:5 outfit looks so pleasing", hi: "बैलेंस और प्रपोर्शन, और 3:5 वाला आउटफ़िट इतना अच्छा क्यों लगता है" },
    { en: "Emphasis, rhythm, harmony and contrast in real outfits", hi: "असली आउटफ़िट में एम्फ़ेसिस, रिदम, हार्मनी और कंट्रास्ट" }
  ],
  lessons: [
    /* ---------------- 1. LINE ---------------- */
    {
      id: "line",
      title: { en: "Line", hi: "लाइन (रेखा)" },
      min: 6,
      blocks: [
        { t: "p", text: {
          en: "Every design starts with a **line**. A line is a mark that leads your eye from one point to another. In clothes, lines are everywhere: seams, stripes, pleats, even the edge of a kurta.",
          hi: "हर डिज़ाइन एक **लाइन (Line)** से शुरू होता है। लाइन वो निशान है जो तुम्हारी नज़र को एक पॉइंट से दूसरे पॉइंट तक ले जाता है। कपड़ों में लाइनें हर जगह हैं: सिलाई, धारियाँ, प्लीट्स, यहाँ तक कि कुर्ते का किनारा भी।" } },
        { t: "gallery", cols: 3, items: [
          { dg: "design-elements-line", args: { type: "vertical" }, label: { en: "Vertical", hi: "वर्टिकल (खड़ी)" }, note: { en: "Tall, strong, formal", hi: "लंबा, मज़बूत, फ़ॉर्मल" } },
          { dg: "design-elements-line", args: { type: "horizontal" }, label: { en: "Horizontal", hi: "हॉरिज़ॉन्टल (पड़ी)" }, note: { en: "Calm, wide, restful", hi: "शांत, चौड़ा, आरामदायक" } },
          { dg: "design-elements-line", args: { type: "diagonal" }, label: { en: "Diagonal", hi: "डायगनल (तिरछी)" }, note: { en: "Movement, energy", hi: "हलचल, एनर्जी" } },
          { dg: "design-elements-line", args: { type: "curved" }, label: { en: "Curved", hi: "कर्व्ड (घुमावदार)" }, note: { en: "Soft, graceful, flowing", hi: "नरम, ख़ूबसूरत, बहता हुआ" } },
          { dg: "design-elements-line", args: { type: "zigzag" }, label: { en: "Zig-zag", hi: "ज़िग-ज़ैग" }, note: { en: "Excited, playful, busy", hi: "जोशीला, मज़ेदार, भरा-भरा" } },
          { dg: "design-elements-line", args: { type: "broken" }, label: { en: "Broken / dotted", hi: "टूटी / डॉटेड" }, note: { en: "Light and casual, like topstitching", hi: "हल्का और कैज़ुअल, टॉपस्टिचिंग जैसा" } }
        ] },
        { t: "p", text: {
          en: "Lines also create **illusions**. Your eye travels along a line, so the body seems to stretch in that direction. That is why designers say: vertical lines slim, horizontal lines widen.",
          hi: "लाइनें **इल्यूज़न (Illusion)** यानी नज़र का धोखा भी बनाती हैं। तुम्हारी नज़र लाइन के साथ-साथ चलती है, इसलिए शरीर उसी दिशा में खिंचा हुआ लगता है। इसीलिए डिज़ाइनर कहते हैं: खड़ी लाइनें पतला दिखाती हैं, पड़ी लाइनें चौड़ा।" } },
        { t: "compare", items: [
          { title: { en: "Vertical lines", hi: "खड़ी लाइनें" }, dg: "design-elements-stripes", args: { dir: "v" }, points: [
            { en: "The eye moves up and down", hi: "नज़र ऊपर-नीचे चलती है" },
            { en: "The body looks taller and slimmer", hi: "शरीर लंबा और पतला दिखता है" },
            { en: "Think: pinstripe suit, long straight kurta", hi: "जैसे: पिनस्ट्राइप सूट, लंबा सीधा कुर्ता" } ] },
          { title: { en: "Horizontal lines", hi: "पड़ी लाइनें" }, dg: "design-elements-stripes", args: { dir: "h" }, points: [
            { en: "The eye moves side to side", hi: "नज़र दाएँ-बाएँ चलती है" },
            { en: "The body looks shorter and wider", hi: "शरीर छोटा और चौड़ा दिखता है" },
            { en: "Think: striped T-shirt, wide belt", hi: "जैसे: धारीदार टी-शर्ट, चौड़ी बेल्ट" } ] }
        ] },
        { t: "gallery", items: [
          { src: "assets/img/design-elements/vertical-stripes.jpg", label: { en: "Vertical stripes", hi: "खड़ी धारियाँ" }, note: { en: "A Claire McCardell day dress: the stripes pull your eye up and down", hi: "क्लेयर मैककार्डेल की ड्रेस: धारियाँ नज़र को ऊपर-नीचे खींचती हैं" } },
          { src: "assets/img/design-elements/horizontal-stripes.jpg", label: { en: "Horizontal stripes", hi: "पड़ी धारियाँ" }, note: { en: "Here the eye moves across the body", hi: "यहाँ नज़र शरीर के आर-पार चलती है" } }
        ] },
        { t: "h", text: { en: "Lines you sew", hi: "लाइनें जो सिली जाती हैं" } },
        { t: "p", text: {
          en: "Not all lines are printed. **Structural lines** are made while sewing: seams, darts, pleats, yokes and hemlines. **Decorative lines** are added on top: piping, lace borders, gota patti, a row of buttons.",
          hi: "हर लाइन प्रिंट नहीं होती। **स्ट्रक्चरल लाइन (Structural line)** सिलाई से बनती हैं: सीम, डार्ट, प्लीट्स, योक और हेमलाइन। **डेकोरेटिव लाइन (Decorative line)** ऊपर से लगाई जाती हैं: पाइपिंग, लेस बॉर्डर, गोटा पट्टी, बटनों की लाइन।" } },
        { t: "dg", name: "design-elements-garment-lines", caption: {
          en: "Structural lines on a simple dress. Princess seams run over the bust and make the figure look long and fitted.",
          hi: "एक सिंपल ड्रेस पर स्ट्रक्चरल लाइनें। प्रिंसेस सीम बस्ट के ऊपर से जाती है और फ़िगर को लंबा और फ़िटेड दिखाती है।" } },
        { t: "img", src: "assets/img/design-elements/pleated-skirt.jpg", caption: {
          en: "A pleated skirt: many sharp vertical lines that also swing when you walk.",
          hi: "प्लीटेड स्कर्ट: बहुत सारी तीखी खड़ी लाइनें, जो चलने पर लहराती भी हैं।" } },
        { t: "tip", kind: "fact", text: {
          en: "Scientists found that horizontal stripes do not always make people look wider (the **Helmholtz illusion**). Fashion rules are a guide, not a law. Trust your eye and test it!",
          hi: "वैज्ञानिकों ने पाया कि पड़ी धारियाँ हमेशा चौड़ा नहीं दिखातीं (इसे **हेल्महोल्ट्ज़ इल्यूज़न** कहते हैं)। फ़ैशन के नियम गाइड हैं, क़ानून नहीं। अपनी नज़र पर भरोसा करो और ख़ुद टेस्ट करो!" } },
        { t: "terms", items: [
          { en: "Line", hi: "लाइन", def: { en: "A mark that leads the eye from one point to another; the most basic design element.", hi: "वो निशान जो नज़र को एक पॉइंट से दूसरे तक ले जाता है; डिज़ाइन का सबसे बेसिक एलिमेंट।" } },
          { en: "Structural line", hi: "स्ट्रक्चरल लाइन", def: { en: "A line made while constructing the garment, like a seam, dart or pleat.", hi: "कपड़ा बनाते समय बनी लाइन, जैसे सीम, डार्ट या प्लीट।" } },
          { en: "Decorative line", hi: "डेकोरेटिव लाइन", def: { en: "A line added for beauty, like piping, lace or gota.", hi: "सुंदरता के लिए जोड़ी गई लाइन, जैसे पाइपिंग, लेस या गोटा।" } },
          { en: "Princess seam", hi: "प्रिंसेस सीम", def: { en: "A long curved seam from the shoulder or armhole, over the bust, down to the hem. Used for a close fit.", hi: "कंधे या आर्महोल से बस्ट के ऊपर होकर नीचे तक जाने वाली लंबी घुमावदार सीम। अच्छी फ़िटिंग के लिए।" } },
          { en: "Optical illusion", hi: "ऑप्टिकल इल्यूज़न", def: { en: "When the eye is tricked into seeing something as taller, wider or different than it really is.", hi: "जब आँख को धोखा हो और कोई चीज़ असल से लंबी, चौड़ी या अलग दिखे।" } }
        ] },
        { t: "try", text: {
          en: "Draw the same simple figure twice. Fill one dress with vertical lines and the other with horizontal lines. Which one looks taller to you?",
          hi: "एक ही सिंपल फ़िगर दो बार बनाओ। एक ड्रेस में खड़ी लाइनें भरो, दूसरी में पड़ी। तुम्हें कौन सी लंबी लगती है?" } }
      ]
    },
    /* ---------------- 2. SHAPE & FORM ---------------- */
    {
      id: "shape-form",
      title: { en: "Shape & form", hi: "शेप और फ़ॉर्म (आकार)" },
      min: 5,
      blocks: [
        { t: "p", text: {
          en: "When a line closes on itself, it makes a **shape**. A shape is flat, like a drawing on paper. A **form** is a shape with depth: you can walk around it, like a body or a stitched dress.",
          hi: "जब कोई लाइन घूमकर वापस जुड़ जाती है, तो **शेप (Shape)** बनती है। शेप चपटी होती है, जैसे काग़ज़ पर बनी ड्रॉइंग। **फ़ॉर्म (Form)** गहराई वाली शेप है, जिसके चारों ओर घूम सकते हो, जैसे शरीर या सिली हुई ड्रेस।" } },
        { t: "compare", items: [
          { title: { en: "Geometric shapes", hi: "ज्योमेट्रिक शेप" }, dg: "design-elements-shapes", args: { kind: "geometric" }, points: [
            { en: "Made with a ruler or compass: square, circle, triangle", hi: "रूलर या कंपास से बनती हैं: चौकोर, गोल, तिकोन" },
            { en: "Feel neat, modern, strong", hi: "साफ़, मॉडर्न और मज़बूत लगती हैं" },
            { en: "Seen in: colour-block dresses, checks, Art Deco prints", hi: "दिखती हैं: कलर-ब्लॉक ड्रेस, चेक, आर्ट डेको प्रिंट में" } ] },
          { title: { en: "Organic shapes", hi: "ऑर्गेनिक शेप" }, dg: "design-elements-shapes", args: { kind: "organic" }, points: [
            { en: "Free and irregular, like leaves, flowers, clouds", hi: "आज़ाद और बेढब, जैसे पत्ते, फूल, बादल" },
            { en: "Feel soft, natural, relaxed", hi: "नरम, नेचुरल और रिलैक्स्ड लगती हैं" },
            { en: "Seen in: floral prints, paisley, ruffles, draped saree folds", hi: "दिखती हैं: फ़्लोरल प्रिंट, पेज़ली, रफ़ल, साड़ी की प्लीट्स में" } ] }
        ] },
        { t: "img", src: "assets/img/design-elements/mondrian-dress.jpg", caption: {
          en: "Yves Saint Laurent's 1965 Mondrian dress: pure geometric shapes, copied from a painting by Piet Mondrian.",
          hi: "Yves Saint Laurent की 1965 की मॉन्ड्रियन ड्रेस: सिर्फ़ ज्योमेट्रिक शेप, जो Piet Mondrian की पेंटिंग से ली गई थीं।" } },
        { t: "h", text: { en: "The shape of the whole outfit", hi: "पूरे आउटफ़िट का आकार" } },
        { t: "p", text: {
          en: "Step back and squint at an outfit. You will see one big outer shape, called the **silhouette**. Designers name silhouettes after letters and simple shapes.",
          hi: "किसी आउटफ़िट को थोड़ा दूर से, आँखें सिकोड़कर देखो। तुम्हें एक बड़ा बाहरी आकार दिखेगा, जिसे **सिल्हूट (Silhouette)** कहते हैं। डिज़ाइनर सिल्हूट के नाम अक्षरों और आसान आकारों पर रखते हैं।" } },
        { t: "gallery", cols: 2, items: [
          { dg: "design-elements-shape-sil", args: { s: "A" }, label: { en: "A-line = triangle", hi: "A-लाइन = तिकोन" }, note: { en: "Narrow top, wide hem, like an anarkali", hi: "ऊपर पतला, नीचे चौड़ा, अनारकली जैसा" } },
          { dg: "design-elements-shape-sil", args: { s: "H" }, label: { en: "H-line = rectangle", hi: "H-लाइन = आयत" }, note: { en: "Straight up and down, like a straight kurta", hi: "ऊपर से नीचे सीधा, सीधे कुर्ते जैसा" } },
          { dg: "design-elements-shape-sil", args: { s: "X" }, label: { en: "X-line = hourglass", hi: "X-लाइन = ऑवरग्लास" }, note: { en: "Fitted waist, wide top and hem", hi: "कमर फ़िटेड, ऊपर और नीचे चौड़ा" } },
          { dg: "design-elements-shape-sil", args: { s: "V" }, label: { en: "V-line = inverted triangle", hi: "V-लाइन = उल्टा तिकोन" }, note: { en: "Broad shoulders, narrow hem", hi: "चौड़े कंधे, नीचे पतला" } }
        ] },
        { t: "tip", kind: "remember", text: {
          en: "This is just a first look. In **Module 5, Garment Details**, you will study silhouettes, necklines and sleeves in depth.",
          hi: "ये बस पहली झलक है। **मॉड्यूल 5, गारमेंट डिटेल्स** में तुम सिल्हूट, नेकलाइन और स्लीव्स को विस्तार से पढ़ोगी।" } },
        { t: "terms", items: [
          { en: "Shape", hi: "शेप", def: { en: "A flat, closed outline with length and width only.", hi: "एक चपटी, बंद आउटलाइन जिसमें सिर्फ़ लंबाई और चौड़ाई होती है।" } },
          { en: "Form", hi: "फ़ॉर्म", def: { en: "A 3-D shape with depth, like a body or a finished garment.", hi: "गहराई वाला 3-D आकार, जैसे शरीर या तैयार कपड़ा।" } },
          { en: "Geometric shape", hi: "ज्योमेट्रिक शेप", def: { en: "A regular, mathematical shape such as a square, circle or triangle.", hi: "नियमित, गणित वाला आकार, जैसे चौकोर, गोल या तिकोन।" } },
          { en: "Organic shape", hi: "ऑर्गेनिक शेप", def: { en: "A free, irregular shape found in nature, like a leaf or a cloud.", hi: "आज़ाद, बेढब आकार जो प्रकृति में मिलता है, जैसे पत्ता या बादल।" } },
          { en: "Silhouette", hi: "सिल्हूट", def: { en: "The outer shape of an outfit, like its shadow.", hi: "आउटफ़िट का बाहरी आकार, जैसे उसकी परछाई।" } }
        ] },
        { t: "try", text: {
          en: "Cut 5 shapes from coloured paper: 3 geometric, 2 organic. Arrange them on a paper dress outline to design a colour-block or floral kurta.",
          hi: "रंगीन काग़ज़ से 5 शेप काटो: 3 ज्योमेट्रिक, 2 ऑर्गेनिक। इन्हें काग़ज़ पर बनी ड्रेस की आउटलाइन पर सजाकर एक कलर-ब्लॉक या फ़्लोरल कुर्ता डिज़ाइन करो।" } }
      ]
    },
    /* ---------------- 3. TEXTURE & PATTERN ---------------- */
    {
      id: "texture-pattern",
      title: { en: "Texture & pattern", hi: "टेक्सचर और पैटर्न" },
      min: 7,
      blocks: [
        { t: "p", text: {
          en: "**Texture** is how a surface feels, or how it looks like it would feel. Close your eyes and touch a velvet dupatta, then a denim jacket. Same colour can feel totally different!",
          hi: "**टेक्सचर (Texture)** यानी किसी सतह को छूने पर कैसा लगता है, या देखने में कैसा लगेगा। आँखें बंद करके एक वेलवेट दुपट्टा छुओ, फिर डेनिम जैकेट। एक ही रंग, पर एहसास बिल्कुल अलग!" } },
        { t: "cards", items: [
          { icon: "fabric", title: { en: "Tactile texture", hi: "टैक्टाइल टेक्सचर" }, text: { en: "The real feel under your fingers: soft, rough, smooth, fuzzy.", hi: "उँगलियों के नीचे असली एहसास: नरम, खुरदरा, चिकना, रोएँदार।" } },
          { icon: "eye", title: { en: "Visual texture", hi: "विज़ुअल टेक्सचर" }, text: { en: "Texture you only see, like a print of crushed fabric on a smooth T-shirt.", hi: "वो टेक्सचर जो सिर्फ़ दिखता है, जैसे चिकनी टी-शर्ट पर सिलवट वाले कपड़े का प्रिंट।" } }
        ] },
        { t: "gallery", cols: 2, items: [
          { src: "assets/img/design-elements/velvet.jpg", label: { en: "Velvet: soft, rich", hi: "वेलवेट: नरम, रॉयल" }, note: { en: "Its pile catches light, so the colour looks deeper", hi: "इसके रोएँ रोशनी पकड़ते हैं, इसलिए रंग गहरा दिखता है" } },
          { src: "assets/img/design-elements/sequins.jpg", label: { en: "Sequins: shiny", hi: "सीक्विन: चमकीला" }, note: { en: "Reflects light, draws attention, adds bulk", hi: "रोशनी लौटाता है, ध्यान खींचता है, भारी दिखता है" } },
          { src: "assets/img/design-elements/lace.jpg", label: { en: "Lace: sheer, delicate", hi: "लेस: जालीदार, नाज़ुक" }, note: { en: "You can see through the holes", hi: "छेदों के आर-पार दिखता है" } },
          { src: "assets/img/design-elements/tweed.jpg", label: { en: "Tweed: rough, matte", hi: "ट्वीड: खुरदरा, मैट" }, note: { en: "Thick wool with flecks of colour", hi: "मोटा ऊन, जिसमें रंग के छींटे होते हैं" } }
        ] },
        { t: "tip", kind: "tip", text: {
          en: "Shiny and bulky textures (satin, sequins, fur) make an area look **bigger**. Matte, flat textures (cotton, crepe) make it look **smaller**. Use this like a magic trick.",
          hi: "चमकीले और भारी टेक्सचर (सैटिन, सीक्विन, फ़र) किसी हिस्से को **बड़ा** दिखाते हैं। मैट और सपाट टेक्सचर (कॉटन, क्रेप) उसे **छोटा** दिखाते हैं। इसे जादू की तरह इस्तेमाल करो।" } },
        { t: "h", text: { en: "Pattern", hi: "पैटर्न" } },
        { t: "p", text: {
          en: "A **pattern** is a motif repeated again and again. A **motif** is the single design unit, like one flower or one paisley. Patterns can be printed, woven, knitted or embroidered.",
          hi: "**पैटर्न (Pattern)** यानी एक ही डिज़ाइन का बार-बार दोहराया जाना। **मोटिफ़ (Motif)** वो एक अकेला डिज़ाइन है, जैसे एक फूल या एक कैरी। पैटर्न प्रिंट, बुनाई, निटिंग या कढ़ाई से बन सकते हैं।" } },
        { t: "gallery", cols: 3, items: [
          { dg: "design-elements-pattern", args: { type: "floral" }, label: { en: "Floral", hi: "फ़्लोरल (फूलदार)" } },
          { dg: "design-elements-pattern", args: { type: "stripes" }, label: { en: "Stripes", hi: "स्ट्राइप्स (धारियाँ)" } },
          { dg: "design-elements-pattern", args: { type: "checks" }, label: { en: "Checks / plaid", hi: "चेक / प्लेड" } },
          { dg: "design-elements-pattern", args: { type: "polka" }, label: { en: "Polka dots", hi: "पोल्का डॉट" } },
          { dg: "design-elements-pattern", args: { type: "paisley" }, label: { en: "Paisley (keri / ambi)", hi: "पेज़ली (कैरी / अम्बी)" } },
          { dg: "design-elements-pattern", args: { type: "animal" }, label: { en: "Animal print", hi: "एनिमल प्रिंट" } },
          { dg: "design-elements-pattern", args: { type: "geometric" }, label: { en: "Geometric", hi: "ज्योमेट्रिक" } },
          { dg: "design-elements-pattern", args: { type: "chevron" }, label: { en: "Chevron / zig-zag", hi: "शेवरॉन / ज़िग-ज़ैग" } },
          { dg: "design-elements-pattern", args: { type: "abstract" }, label: { en: "Abstract", hi: "एब्स्ट्रैक्ट" } }
        ] },
        { t: "gallery", cols: 2, items: [
          { src: "assets/img/design-elements/paisley.jpg", label: { en: "Paisley", hi: "पेज़ली" }, note: { en: "The Indian keri (mango) motif, famous on Kashmiri shawls", hi: "भारत का कैरी (आम) मोटिफ़, कश्मीरी शॉल पर मशहूर" } },
          { src: "assets/img/design-elements/tartan.jpg", label: { en: "Tartan / plaid", hi: "टार्टन / प्लेड" }, note: { en: "Coloured stripes crossing at right angles", hi: "रंगीन धारियाँ जो एक-दूसरे को सीधे कोण पर काटती हैं" } },
          { src: "assets/img/design-elements/polka.jpg", label: { en: "Polka dots", hi: "पोल्का डॉट" }, note: { en: "Evenly spaced round dots", hi: "बराबर दूरी पर गोल बिंदियाँ" } },
          { src: "assets/img/design-elements/floral.jpg", label: { en: "Floral", hi: "फ़्लोरल" }, note: { en: "Flowers and leaves: organic shapes", hi: "फूल और पत्ते: ऑर्गेनिक शेप" } },
          { src: "assets/img/design-elements/ikat.jpg", label: { en: "Ikat", hi: "इकत" }, note: { en: "Yarn is tie-dyed before weaving, so edges look blurred", hi: "बुनाई से पहले धागे को बाँधकर रंगते हैं, इसलिए किनारे धुंधले दिखते हैं" } },
          { src: "assets/img/design-elements/kalamkari.jpg", label: { en: "Ethnic motifs", hi: "एथनिक मोटिफ़" }, note: { en: "Kalamkari: hand-painted stories and flowers", hi: "कलमकारी: हाथ से पेंट की गई कहानियाँ और फूल" } }
        ] },
        { t: "tip", kind: "mistake", text: {
          en: "Two busy patterns of the same size often fight. If you mix prints, change the **scale**: a big floral with a tiny check, and keep one colour common.",
          hi: "एक ही साइज़ के दो भरे-भरे पैटर्न अक्सर आपस में लड़ते हैं। प्रिंट मिलाओ तो **स्केल (Scale)** बदलो: बड़ा फ़्लोरल और छोटा चेक, और एक रंग दोनों में कॉमन रखो।" } },
        { t: "terms", items: [
          { en: "Texture", hi: "टेक्सचर", def: { en: "How a surface feels or looks like it would feel.", hi: "सतह छूने में कैसी लगती है, या देखने में कैसी लगेगी।" } },
          { en: "Motif", hi: "मोटिफ़", def: { en: "One single design unit that is repeated to make a pattern.", hi: "एक अकेला डिज़ाइन जिसे दोहराकर पैटर्न बनता है।" } },
          { en: "Paisley", hi: "पेज़ली", def: { en: "A curved teardrop motif from India and Persia, called keri or ambi in India.", hi: "भारत और ईरान का घुमावदार आँसू जैसा मोटिफ़, जिसे भारत में कैरी या अम्बी कहते हैं।" } },
          { en: "Plaid", hi: "प्लेड", def: { en: "A pattern of crossing stripes in different widths and colours; tartan is a Scottish plaid.", hi: "अलग-अलग चौड़ाई और रंग की क्रॉस होती धारियों का पैटर्न; टार्टन स्कॉटलैंड का प्लेड है।" } },
          { en: "Scale (of a print)", hi: "स्केल", def: { en: "How big or small the motifs of a print are.", hi: "किसी प्रिंट के मोटिफ़ कितने बड़े या छोटे हैं।" } }
        ] },
        { t: "try", text: {
          en: "Make a texture board: collect 6 small fabric scraps from a darzi or your home. Stick them in your sketchbook and write one word for each feel.",
          hi: "एक टेक्सचर बोर्ड बनाओ: दर्ज़ी या घर से कपड़े के 6 छोटे टुकड़े लो। इन्हें स्केचबुक में चिपकाओ और हर एक के एहसास के लिए एक शब्द लिखो।" } }
      ]
    },
    /* ---------------- 4. BALANCE & PROPORTION ---------------- */
    {
      id: "balance-proportion",
      title: { en: "Balance & proportion", hi: "बैलेंस और प्रपोर्शन" },
      min: 6,
      blocks: [
        { t: "p", text: {
          en: "Now we move from **elements** (the ingredients) to **principles** (the recipe). The first principle is **balance**: an outfit should feel steady, not heavier on one side.",
          hi: "अब हम **एलिमेंट (Elements)** यानी सामग्री से **प्रिंसिपल (Principles)** यानी रेसिपी पर आते हैं। पहला प्रिंसिपल है **बैलेंस (Balance)**: आउटफ़िट स्थिर लगना चाहिए, किसी एक तरफ़ भारी नहीं।" } },
        { t: "gallery", cols: 3, items: [
          { dg: "design-elements-balance", args: { type: "sym" }, label: { en: "Symmetrical", hi: "सिमेट्रिकल" }, note: { en: "Both halves are mirror images", hi: "दोनों हिस्से आईने जैसे एक जैसे" } },
          { dg: "design-elements-balance", args: { type: "asym" }, label: { en: "Asymmetrical", hi: "एसिमेट्रिकल" }, note: { en: "Different halves, same visual weight", hi: "दोनों हिस्से अलग, पर वज़न बराबर" } },
          { dg: "design-elements-balance", args: { type: "radial" }, label: { en: "Radial", hi: "रेडियल" }, note: { en: "Design spreads out from a centre", hi: "डिज़ाइन बीच से चारों ओर फैलता है" } }
        ] },
        { t: "cards", items: [
          { icon: "scale", title: { en: "Symmetrical (formal) balance", hi: "सिमेट्रिकल (फ़ॉर्मल) बैलेंस" }, text: { en: "Calm, classic, traditional. Most kurtas, lehengas and school uniforms.", hi: "शांत, क्लासिक, पारंपरिक। ज़्यादातर कुर्ते, लहंगे और स्कूल यूनिफ़ॉर्म।" } },
          { icon: "sparkle", title: { en: "Asymmetrical (informal) balance", hi: "एसिमेट्रिकल (इनफ़ॉर्मल) बैलेंस" }, text: { en: "Modern and dramatic. A one-shoulder gown, a saree pallu over one shoulder.", hi: "मॉडर्न और ड्रामैटिक। वन-शोल्डर गाउन, एक कंधे पर साड़ी का पल्लू।" } },
          { icon: "sun", title: { en: "Radial balance", hi: "रेडियल बैलेंस" }, text: { en: "Like a flower or a rangoli. A circle skirt seen from above, a mandala yoke.", hi: "फूल या रंगोली जैसा। ऊपर से देखा गया सर्कल स्कर्ट, मंडला वाला योक।" } }
        ] },
        { t: "gallery", cols: 2, items: [
          { src: "assets/img/design-elements/symmetry.jpg", label: { en: "Symmetrical", hi: "सिमेट्रिकल" }, note: { en: "Left and right match", hi: "बायाँ और दायाँ एक जैसे" } },
          { src: "assets/img/design-elements/asymmetry.jpg", label: { en: "Asymmetrical", hi: "एसिमेट्रिकल" }, note: { en: "One side is different, but it still feels balanced", hi: "एक तरफ़ अलग है, फिर भी बैलेंस लगता है" } },
          { src: "assets/img/design-elements/radial-doily.jpg", label: { en: "Radial", hi: "रेडियल" }, note: { en: "Crochet lace growing out from the centre", hi: "क्रोशिया लेस जो बीच से बाहर की ओर बढ़ती है" } }
        ] },
        { t: "h", text: { en: "Proportion", hi: "प्रपोर्शन" } },
        { t: "p", text: {
          en: "**Proportion** is how the sizes of parts relate to each other and to the whole body. If a top and skirt are exactly equal, the outfit can look cut in half and boring.",
          hi: "**प्रपोर्शन (Proportion)** यानी अलग-अलग हिस्सों के साइज़ का आपस में और पूरे शरीर से रिश्ता। अगर टॉप और स्कर्ट बिल्कुल बराबर हों, तो आउटफ़िट बीच से कटा हुआ और बोरिंग लग सकता है।" } },
        { t: "gallery", cols: 3, items: [
          { dg: "design-elements-proportion", args: { r: "equal" }, label: { en: "1 : 1", hi: "1 : 1 (बराबर)" }, note: { en: "Cut in half, less interesting", hi: "आधा-आधा, कम दिलचस्प" } },
          { dg: "design-elements-proportion", args: { r: "35" }, label: { en: "3 : 5", hi: "3 : 5 (बढ़िया)" }, note: { en: "Short top, long skirt: legs look longer", hi: "छोटा टॉप, लंबी स्कर्ट: टाँगें लंबी दिखती हैं" } },
          { dg: "design-elements-proportion", args: { r: "53" }, label: { en: "5 : 3", hi: "5 : 3 (उल्टा)" }, note: { en: "Long kurta, short bottom", hi: "लंबा कुर्ता, छोटा बॉटम" } }
        ] },
        { t: "p", text: {
          en: "Designers love the ratio **3 : 5** (close to the **golden ratio**, 1 : 1.618). It is the same idea as the **rule of thirds**: split the body into thirds, not halves. One-third top, two-thirds bottom, or the other way round.",
          hi: "डिज़ाइनरों को **3 : 5** का अनुपात बहुत पसंद है (ये **गोल्डन रेशियो**, 1 : 1.618 के क़रीब है)। यही **रूल ऑफ़ थर्ड्स (Rule of thirds)** का आइडिया है: शरीर को आधे-आधे में नहीं, तीन हिस्सों में बाँटो। एक-तिहाई ऊपर, दो-तिहाई नीचे, या उल्टा।" } },
        { t: "img", src: "assets/img/design-elements/proportion-outfit.jpg", caption: {
          en: "A short top with a long skirt: about 1/3 on top and 2/3 below.",
          hi: "छोटा टॉप और लंबी स्कर्ट: लगभग 1/3 ऊपर और 2/3 नीचे।" } },
        { t: "tip", kind: "tip", text: {
          en: "Tucking in a shirt or adding a belt moves the dividing line. A high waist makes your legs look longer at once.",
          hi: "शर्ट को अंदर टक करने या बेल्ट लगाने से बाँटने वाली लाइन ऊपर-नीचे हो जाती है। हाई वेस्ट से टाँगें तुरंत लंबी दिखती हैं।" } },
        { t: "terms", items: [
          { en: "Balance", hi: "बैलेंस", def: { en: "Equal visual weight on both sides of a design, so it feels steady.", hi: "डिज़ाइन के दोनों तरफ़ बराबर विज़ुअल वज़न, ताकि वो स्थिर लगे।" } },
          { en: "Symmetry", hi: "सिमेट्री", def: { en: "Both halves are the same, like a mirror image.", hi: "दोनों हिस्से एक जैसे, आईने की परछाई की तरह।" } },
          { en: "Asymmetry", hi: "एसिमेट्री", def: { en: "The two halves are different but still balanced.", hi: "दोनों हिस्से अलग हैं, फिर भी बैलेंस में हैं।" } },
          { en: "Radial balance", hi: "रेडियल बैलेंस", def: { en: "Design elements spreading out evenly from a centre point.", hi: "डिज़ाइन के हिस्से एक बीच के पॉइंट से बराबर फैलते हैं।" } },
          { en: "Proportion", hi: "प्रपोर्शन", def: { en: "The size relationship between parts of an outfit and the body.", hi: "आउटफ़िट के हिस्सों और शरीर के बीच साइज़ का रिश्ता।" } },
          { en: "Golden ratio", hi: "गोल्डन रेशियो", def: { en: "About 1 : 1.6, a ratio found in nature that looks pleasing; 3 : 5 is close to it.", hi: "लगभग 1 : 1.6, प्रकृति में मिलने वाला सुंदर अनुपात; 3 : 5 इसके क़रीब है।" } }
        ] },
        { t: "try", text: {
          en: "Take 3 photos of yourself in front of a mirror: shirt untucked, half-tucked and fully tucked. Which one gives the best proportion?",
          hi: "आईने के सामने अपनी 3 फ़ोटो लो: शर्ट बाहर, आधी अंदर और पूरी अंदर टक की हुई। किसमें सबसे अच्छा प्रपोर्शन लगता है?" } }
      ]
    },
    /* ---------------- 5. EMPHASIS, RHYTHM, HARMONY, CONTRAST ---------------- */
    {
      id: "emphasis-rhythm",
      title: { en: "Emphasis, rhythm, harmony & contrast", hi: "एम्फ़ेसिस, रिदम, हार्मनी और कंट्रास्ट" },
      min: 7,
      blocks: [
        { t: "p", text: {
          en: "Where do people look first when they see your outfit? That spot is the **focal point**, and creating it is called **emphasis**. A good outfit usually has just one star.",
          hi: "तुम्हारा आउटफ़िट देखकर लोग सबसे पहले कहाँ देखते हैं? वो जगह **फ़ोकल पॉइंट (Focal point)** है, और उसे बनाना **एम्फ़ेसिस (Emphasis)** कहलाता है। अच्छे आउटफ़िट में आमतौर पर बस एक स्टार होता है।" } },
        { t: "compare", items: [
          { title: { en: "No focal point", hi: "कोई फ़ोकल पॉइंट नहीं" }, dg: "design-elements-emphasis", args: {}, points: [
            { en: "The eye wanders, nothing stands out", hi: "नज़र भटकती है, कुछ ख़ास नहीं दिखता" },
            { en: "Safe, but can feel flat", hi: "सेफ़ है, पर फीका लग सकता है" } ] },
          { title: { en: "A clear focal point", hi: "साफ़ फ़ोकल पॉइंट" }, dg: "design-elements-emphasis", args: { focus: true }, points: [
            { en: "A bright belt pulls the eye to the waist", hi: "चटक बेल्ट नज़र को कमर पर खींचती है" },
            { en: "Use colour, shine, size or a special detail", hi: "रंग, चमक, साइज़ या कोई ख़ास डिटेल इस्तेमाल करो" } ] }
        ] },
        { t: "img", src: "assets/img/design-elements/emphasis-necklace.jpg", caption: {
          en: "A statement necklace on a simple outfit: the jewellery is the star.",
          hi: "सिंपल आउटफ़िट पर स्टेटमेंट नेकलेस: यहाँ ज्वेलरी ही स्टार है।" } },
        { t: "h", text: { en: "Rhythm", hi: "रिदम" } },
        { t: "p", text: {
          en: "**Rhythm** is a pattern that makes your eye move, like a beat in music. Designers create it in four main ways.",
          hi: "**रिदम (Rhythm)** वो पैटर्न है जो तुम्हारी नज़र को चलाता है, जैसे गाने की ताल। डिज़ाइनर इसे चार मुख्य तरीक़ों से बनाते हैं।" } },
        { t: "gallery", cols: 2, items: [
          { dg: "design-elements-rhythm", args: { type: "repetition" }, label: { en: "Repetition", hi: "रिपिटिशन (दोहराव)" }, note: { en: "Same thing again: buttons, tucks, frills", hi: "एक ही चीज़ बार-बार: बटन, टक, झालर" } },
          { dg: "design-elements-rhythm", args: { type: "gradation" }, label: { en: "Gradation", hi: "ग्रेडेशन" }, note: { en: "Small to big, or light to dark (ombre)", hi: "छोटे से बड़ा, या हल्के से गहरा (ओम्ब्रे)" } },
          { dg: "design-elements-rhythm", args: { type: "radiation" }, label: { en: "Radiation", hi: "रेडिएशन" }, note: { en: "Lines spread from a point, like gathers or a sunburst pleat", hi: "लाइनें एक पॉइंट से फैलती हैं, जैसे गैदर या सनबर्स्ट प्लीट" } },
          { dg: "design-elements-rhythm", args: { type: "alternation" }, label: { en: "Alternation", hi: "ऑल्टरनेशन" }, note: { en: "Two things take turns, like a border of two motifs", hi: "दो चीज़ें बारी-बारी, जैसे दो मोटिफ़ वाला बॉर्डर" } }
        ] },
        { t: "img", src: "assets/img/design-elements/rhythm-ruffles.jpg", caption: {
          en: "Repetition and gradation: tiers of fringe and ruffles on a bustle gown, each one repeating the one above.",
          hi: "रिपिटिशन और ग्रेडेशन: बस्टल गाउन पर झालर और रफ़ल की परतें, हर परत ऊपर वाली को दोहराती है।" } },
        { t: "h", text: { en: "Harmony and contrast", hi: "हार्मनी और कंट्रास्ट" } },
        { t: "p", text: {
          en: "**Harmony** (or **unity**) means all parts feel like they belong together: similar colours, lines and mood. **Contrast** means putting opposites side by side, like black with white or rough with shiny, to create energy.",
          hi: "**हार्मनी (Harmony)** या **यूनिटी (Unity)** यानी सारे हिस्से एक साथ के लगें: मिलते-जुलते रंग, लाइनें और मूड। **कंट्रास्ट (Contrast)** यानी उल्टी चीज़ें साथ रखना, जैसे काला और सफ़ेद या खुरदरा और चमकीला, ताकि एनर्जी आए।" } },
        { t: "compare", items: [
          { title: { en: "Low contrast = harmony", hi: "कम कंट्रास्ट = हार्मनी" }, dg: "design-elements-contrast", args: { type: "low" }, points: [
            { en: "Beige, sand and cream together", hi: "बेज, रेतीला और क्रीम एक साथ" },
            { en: "Soft, calm, elegant", hi: "नरम, शांत, एलिगेंट" } ] },
          { title: { en: "High contrast", hi: "ज़्यादा कंट्रास्ट" }, dg: "design-elements-contrast", args: { type: "high" }, points: [
            { en: "Black top, white skirt, red bag", hi: "काला टॉप, सफ़ेद स्कर्ट, लाल बैग" },
            { en: "Bold, sharp, eye-catching", hi: "बोल्ड, तीखा, ध्यान खींचने वाला" } ] }
        ] },
        { t: "img", src: "assets/img/design-elements/contrast-bw.jpg", caption: {
          en: "Black and white: the strongest contrast in fashion.",
          hi: "काला और सफ़ेद: फ़ैशन का सबसे तेज़ कंट्रास्ट।" } },
        { t: "tip", kind: "remember", text: {
          en: "Good design = **harmony with a little contrast**. Too much harmony is boring; too much contrast is chaos.",
          hi: "अच्छा डिज़ाइन = **हार्मनी के साथ थोड़ा कंट्रास्ट**। बहुत ज़्यादा हार्मनी बोरिंग है; बहुत ज़्यादा कंट्रास्ट गड़बड़।" } },
        { t: "terms", items: [
          { en: "Emphasis", hi: "एम्फ़ेसिस", def: { en: "Making one part of a design stand out as the centre of attention.", hi: "डिज़ाइन के एक हिस्से को ध्यान का केंद्र बनाना।" } },
          { en: "Focal point", hi: "फ़ोकल पॉइंट", def: { en: "The spot where the eye lands first.", hi: "वो जगह जहाँ नज़र सबसे पहले जाती है।" } },
          { en: "Rhythm", hi: "रिदम", def: { en: "Repeated or changing elements that make the eye move through a design.", hi: "दोहराए या बदलते हिस्से जो नज़र को डिज़ाइन में आगे बढ़ाते हैं।" } },
          { en: "Gradation", hi: "ग्रेडेशन", def: { en: "A step-by-step change in size, colour or shade.", hi: "साइज़, रंग या शेड में धीरे-धीरे होने वाला बदलाव।" } },
          { en: "Harmony", hi: "हार्मनी", def: { en: "When all parts of an outfit work together as one.", hi: "जब आउटफ़िट के सारे हिस्से मिलकर एक लगें।" } },
          { en: "Contrast", hi: "कंट्रास्ट", def: { en: "Putting opposite colours, textures or shapes together for impact.", hi: "असर के लिए उल्टे रंग, टेक्सचर या आकार साथ रखना।" } }
        ] },
        { t: "try", text: {
          en: "Pick one outfit from a Bollywood song. Write: where is the focal point? Which rhythm do you see? Is it more harmony or more contrast?",
          hi: "किसी बॉलीवुड गाने से एक आउटफ़िट चुनो। लिखो: फ़ोकल पॉइंट कहाँ है? कौन सा रिदम दिखता है? उसमें हार्मनी ज़्यादा है या कंट्रास्ट?" } }
      ]
    }
  ],
  quiz: [
    { q: { en: "Which lines usually make a figure look taller and slimmer?", hi: "कौन सी लाइनें आमतौर पर फ़िगर को लंबा और पतला दिखाती हैं?" },
      options: [{ en: "Horizontal", hi: "पड़ी (हॉरिज़ॉन्टल)" }, { en: "Vertical", hi: "खड़ी (वर्टिकल)" }, { en: "Zig-zag", hi: "ज़िग-ज़ैग" }], answer: 1,
      dg: "design-elements-stripes", args: { dir: "v" },
      why: { en: "The eye travels up and down along vertical lines, so the body seems to stretch.", hi: "नज़र खड़ी लाइनों के साथ ऊपर-नीचे चलती है, इसलिए शरीर खिंचा हुआ लगता है।" } },
    { q: { en: "A seam, a dart and a pleat are examples of...", hi: "सीम, डार्ट और प्लीट किसके उदाहरण हैं?" },
      options: [{ en: "Decorative lines", hi: "डेकोरेटिव लाइन" }, { en: "Structural lines", hi: "स्ट्रक्चरल लाइन" }, { en: "Visual texture", hi: "विज़ुअल टेक्सचर" }], answer: 1,
      why: { en: "They are created while constructing the garment, so they are structural.", hi: "ये कपड़ा बनाते समय बनती हैं, इसलिए स्ट्रक्चरल हैं।" } },
    { q: { en: "A leaf, a flower and a cloud are...", hi: "पत्ता, फूल और बादल किस तरह के आकार हैं?" },
      options: [{ en: "Geometric shapes", hi: "ज्योमेट्रिक शेप" }, { en: "Organic shapes", hi: "ऑर्गेनिक शेप" }, { en: "Forms", hi: "फ़ॉर्म" }], answer: 1,
      why: { en: "Free, irregular shapes from nature are called organic.", hi: "प्रकृति के आज़ाद, बेढब आकार ऑर्गेनिक कहलाते हैं।" } },
    { q: { en: "What is this pattern called?", hi: "इस पैटर्न का नाम क्या है?" },
      dg: "design-elements-pattern", args: { type: "paisley" },
      options: [{ en: "Polka dots", hi: "पोल्का डॉट" }, { en: "Paisley (keri)", hi: "पेज़ली (कैरी)" }, { en: "Chevron", hi: "शेवरॉन" }], answer: 1,
      why: { en: "The curved teardrop is the paisley, called keri or ambi in India.", hi: "घुमावदार आँसू जैसा मोटिफ़ पेज़ली है, जिसे भारत में कैरी या अम्बी कहते हैं।" } },
    { q: { en: "Which texture will make an area look bigger?", hi: "कौन सा टेक्सचर किसी हिस्से को बड़ा दिखाएगा?" },
      options: [{ en: "Matte cotton", hi: "मैट कॉटन" }, { en: "Shiny sequins", hi: "चमकीले सीक्विन" }, { en: "Flat crepe", hi: "सपाट क्रेप" }], answer: 1,
      src: "assets/img/design-elements/sequins.jpg",
      why: { en: "Shiny surfaces reflect light and draw the eye, so they look bigger.", hi: "चमकीली सतह रोशनी लौटाती है और नज़र खींचती है, इसलिए बड़ी दिखती है।" } },
    { q: { en: "What kind of balance is this?", hi: "ये कौन सा बैलेंस है?" },
      dg: "design-elements-balance", args: { type: "asym" },
      options: [{ en: "Symmetrical", hi: "सिमेट्रिकल" }, { en: "Asymmetrical", hi: "एसिमेट्रिकल" }, { en: "Radial", hi: "रेडियल" }], answer: 1,
      why: { en: "The two sides are different (one shoulder, side drape) but still feel balanced.", hi: "दोनों तरफ़ अलग हैं (एक कंधा, साइड ड्रेप) फिर भी बैलेंस लगता है।" } },
    { q: { en: "Which top-to-bottom ratio is most pleasing to the eye?", hi: "ऊपर-नीचे का कौन सा अनुपात आँखों को सबसे अच्छा लगता है?" },
      options: [{ en: "1 : 1", hi: "1 : 1 (बराबर)" }, { en: "3 : 5", hi: "3 : 5 (बढ़िया)" }, { en: "1 : 10", hi: "1 : 10 (बहुत ज़्यादा)" }], answer: 1,
      why: { en: "3 : 5 is close to the golden ratio and avoids cutting the body in half.", hi: "3 : 5 गोल्डन रेशियो के क़रीब है और शरीर को आधा-आधा नहीं काटता।" } },
    { q: { en: "An ombre dupatta that goes from dark pink to pale pink shows...", hi: "गहरे गुलाबी से हल्के गुलाबी होता ओम्ब्रे दुपट्टा क्या दिखाता है?" },
      options: [{ en: "Gradation", hi: "ग्रेडेशन" }, { en: "Radiation", hi: "रेडिएशन" }, { en: "Symmetry", hi: "सिमेट्री" }], answer: 0,
      why: { en: "A step-by-step change from dark to light is gradation, a type of rhythm.", hi: "गहरे से हल्के की ओर धीरे-धीरे बदलाव ग्रेडेशन है, जो रिदम का एक तरीक़ा है।" } },
    { q: { en: "A bright red belt on an all-beige outfit creates...", hi: "पूरे बेज आउटफ़िट पर चटक लाल बेल्ट क्या बनाती है?" },
      options: [{ en: "A focal point (emphasis)", hi: "फ़ोकल पॉइंट (एम्फ़ेसिस)" }, { en: "Radial balance", hi: "रेडियल बैलेंस" }, { en: "Visual texture", hi: "विज़ुअल टेक्सचर" }], answer: 0,
      why: { en: "The one bright item pulls the eye first, so it is the focal point.", hi: "एक चटक चीज़ सबसे पहले नज़र खींचती है, इसलिए वो फ़ोकल पॉइंट है।" } },
    { q: { en: "Black top, white skirt: this is an example of...", hi: "काला टॉप, सफ़ेद स्कर्ट: ये किसका उदाहरण है?" },
      dg: "design-elements-contrast", args: { type: "high" },
      options: [{ en: "Harmony", hi: "हार्मनी" }, { en: "Contrast", hi: "कंट्रास्ट" }, { en: "Proportion", hi: "प्रपोर्शन" }], answer: 1,
      why: { en: "Opposites placed together create contrast.", hi: "उल्टी चीज़ें साथ रखने से कंट्रास्ट बनता है।" } }
  ]
});
