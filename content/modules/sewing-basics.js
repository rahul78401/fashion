/* Module 10 - Sewing Basics */
(function () {
  function L(t, lang) { return FD.tx(t, lang); }
  function arrowHead(x, y, ang, cls) {
    var a = ang * Math.PI / 180, s = 5;
    var x1 = x - s * Math.cos(a - 0.5), y1 = y - s * Math.sin(a - 0.5);
    var x2 = x - s * Math.cos(a + 0.5), y2 = y - s * Math.sin(a + 0.5);
    return '<path d="M' + x1.toFixed(1) + " " + y1.toFixed(1) + " L" + x + " " + y + " L" + x2.toFixed(1) + " " + y2.toFixed(1) + '" class="' + (cls || "ln") + '"/>';
  }
  function arrow(x1, y1, x2, y2, cls) {
    var ang = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" class="' + (cls || "ln") + '"/>' + arrowHead(x2, y2, ang, cls);
  }
  function seg(x1, y1, x2, y2, cls, extra) {
    return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" class="' + cls + '"' + (extra || "") + "/>";
  }

  /* ---------- 1. Parts of a sewing machine ---------- */
  FD.diagram("sewing-basics-machine", function (a, lang) {
    var s = "";
    /* pedal + cable */
    s += '<path d="M252 172 Q262 190 246 200" class="gd"/>';
    s += '<path d="M222 214 L268 214 L264 202 L226 196 Z" class="fl"/>';
    /* bed */
    s += '<rect x="92" y="150" width="172" height="22" rx="5" class="fl"/>';
    /* pillar + arm + head */
    s += '<path d="M200 150 L200 72 L140 72 L140 122 L100 122 L100 46 Q100 38 108 38 L240 38 Q252 38 252 50 L252 150 Z" class="fl"/>';
    /* hand wheel (seen edge-on) */
    s += '<ellipse cx="258" cy="70" rx="7" ry="20" class="fl"/>';
    /* spool pin + spool */
    s += seg(184, 22, 184, 38, "ln");
    s += '<rect x="178" y="24" width="12" height="11" rx="2" class="sf" stroke="currentColor" stroke-width="1.2"/>';
    /* thread path */
    s += '<path d="M178 30 Q140 28 122 56 L118 120" class="ac" stroke-width="1" stroke-dasharray="2 2"/>';
    /* tension dial */
    s += '<circle cx="120" cy="62" r="7" class="fl"/><line x1="120" y1="56" x2="120" y2="60" class="ln" stroke-width="1"/>';
    /* needle bar, needle */
    s += seg(118, 122, 118, 130, "ln", ' stroke-width="3"') + seg(118, 130, 118, 146, "ln", ' stroke-width="1"');
    /* presser bar + foot */
    s += seg(130, 122, 130, 140, "ln", ' stroke-width="2"');
    s += '<path d="M106 145 Q106 140 112 140 L132 140 L132 146 L108 146 Z" class="fl"/>';
    /* throat plate + feed dogs */
    s += '<rect x="102" y="146" width="48" height="5" rx="1" class="sf" stroke="currentColor" stroke-width="1"/>';
    s += '<path d="M112 146 l2 -2.5 l2 2.5 l2 -2.5 l2 2.5 l2 -2.5 l2 2.5 l2 -2.5 l2 2.5" class="ac" stroke-width="1.1"/>';
    /* bobbin (hidden under the plate) */
    s += '<circle cx="118" cy="161" r="6" class="ac" stroke-dasharray="2 2"/><circle cx="118" cy="161" r="1.8" class="ac"/>';
    /* stitch selector + reverse lever */
    s += '<circle cx="225" cy="92" r="11" class="fl"/><line x1="225" y1="92" x2="225" y2="83" class="ln"/>';
    s += '<rect x="214" y="122" width="22" height="7" rx="2" class="sf" stroke="currentColor" stroke-width="1.2"/>';

    var left = [
      [62, { en: "Tension dial", hi: "टेंशन डायल" }, 113, 62],
      [104, { en: "Needle", hi: "सुई (नीडल)" }, 117, 138],
      [122, { en: "Presser foot", hi: "प्रेसर फुट" }, 107, 143],
      [140, { en: "Feed dogs", hi: "फीड डॉग्स" }, 112, 146],
      [158, { en: "Throat plate", hi: "थ्रोट प्लेट" }, 102, 150],
      [182, { en: "Bobbin", hi: "बॉबिन" }, 112, 163]
    ];
    var right = [
      [22, { en: "Spool pin", hi: "स्पूल पिन" }, 190, 24],
      [58, { en: "Hand wheel", hi: "हैंड व्हील" }, 265, 62],
      [100, { en: "Stitch selector", hi: "स्टिच सेलेक्टर" }, 236, 94],
      [134, { en: "Reverse lever", hi: "रिवर्स लीवर" }, 236, 126],
      [208, { en: "Foot pedal", hi: "पैर का पेडल" }, 268, 208]
    ];
    left.forEach(function (r) {
      s += seg(80, r[0] - 3, r[2], r[3], "gd");
      s += FD.text(78, r[0], L(r[1], lang), { cls: "tx", anchor: "end", size: 9 });
    });
    right.forEach(function (r) {
      s += seg(282, r[0] - 3, r[2], r[3], "gd");
      s += FD.text(284, r[0], L(r[1], lang), { cls: "tx", anchor: "start", size: 9 });
    });
    return FD.svg(360, 222, s);
  });

  /* ---------- 2. Hand stitches ---------- */
  FD.diagram("sewing-basics-stitch", function (a, lang) {
    var t = a.type || "running", s = "", x;
    var th = ' stroke-width="2.2"';
    s += '<rect x="8" y="18" width="164" height="74" rx="3" class="fl"/>';
    if (t === "running" || t === "basting") {
      var on = t === "running" ? 10 : 20, off = t === "running" ? 7 : 8;
      for (x = 18; x + on < 160; x += on + off) {
        s += seg(x, 55, x + on, 55, "ac", th);
        if (x + on + off < 160) s += seg(x + on, 55, x + on + off, 55, "gd");
      }
    } else if (t === "back") {
      for (x = 20; x < 150; x += 14) s += seg(x, 55, x + 11, 55, "ac", th);
      s += '<path d="M150 58 Q155 66 160 58" class="gd"/>' + arrowHead(147, 59, 180, "tm");
      s += FD.text(90, 76, L({ en: "1 step back, 2 steps forward", hi: "1 कदम पीछे, 2 आगे" }, lang), { cls: "tm", size: 8.5 });
    } else if (t === "hem" || t === "slip") {
      /* turned-up hem at the bottom */
      s += '<rect x="8" y="58" width="164" height="34" class="sf"/>' + seg(8, 58, 172, 58, "ln", ' stroke-width="1.2"');
      s += FD.text(90, 82, L({ en: "folded hem", hi: "मुड़ा हुआ हेम" }, lang), { cls: "tm", size: 8.5 });
      if (t === "hem") {
        for (x = 22; x < 160; x += 14) s += seg(x, 61, x + 6, 50, "ac", th);
      } else {
        for (x = 20; x < 155; x += 18) { s += seg(x, 60, x + 12, 60, "ac", ' stroke-width="1" stroke-dasharray="2 2"'); s += '<circle cx="' + (x + 15) + '" cy="55" r="1.3" class="acf"/>'; }
        s += FD.text(90, 42, L({ en: "almost invisible", hi: "लगभग दिखता नहीं" }, lang), { cls: "tm", size: 8.5 });
      }
    } else if (t === "blanket") {
      for (x = 22; x <= 158; x += 12) {
        s += seg(x, 92, x, 72, "ac", th);
        if (x + 12 <= 158) s += seg(x, 91, x + 12, 91, "ac", th);
      }
      s += FD.text(90, 56, L({ en: "worked over the raw edge", hi: "कच्चे किनारे के ऊपर" }, lang), { cls: "tm", size: 8.5 });
    } else if (t === "cross") {
      for (x = 22; x < 155; x += 18) {
        s += seg(x, 47, x + 12, 61, "ac", th) + seg(x + 12, 47, x, 61, "ac", th);
      }
    }
    return FD.svg(180, 100, s);
  });

  /* ---------- 3. Seam cross-sections ---------- */
  FD.diagram("sewing-basics-seam", function (a, lang) {
    var t = a.type || "plain", s = "";
    var A = ' class="ln" stroke-width="3"', B = ' class="ac" stroke-width="3"';
    function st(x, y) { return '<line x1="' + x + '" y1="' + (y - 7) + '" x2="' + x + '" y2="' + (y + 7) + '" class="tx" stroke="currentColor" stroke-width="1" stroke-dasharray="2 1.5"/>'; }
    if (t === "plain") {
      s += '<path d="M15 40 L96 40 Q100 40 100 45 Q100 50 94 50 L70 50"' + A + "/>";
      s += '<path d="M185 40 L104 40 Q100 40 100 45 Q100 50 106 50 L130 50"' + B + "/>";
      s += '<circle cx="100" cy="43" r="2" class="acf"/>';
      s += FD.text(100, 74, L({ en: "allowances pressed open", hi: "अलाउंस खोलकर प्रेस" }, lang), { cls: "tm", size: 8.5 });
    } else if (t === "french") {
      s += '<path d="M15 30 L92 30 Q96 30 96 35 L96 76 Q96 84 100 84 Q98.5 82 98.5 76 L98.5 56"' + A + "/>";
      s += '<path d="M185 30 L108 30 Q104 30 104 35 L104 76 Q104 84 100 84 Q101.5 82 101.5 76 L101.5 56"' + B + "/>";
      s += '<line x1="92" y1="40" x2="108" y2="40" stroke="currentColor" stroke-width="1" stroke-dasharray="2 1.5"/>';
      s += FD.text(114, 66, L({ en: "raw edges inside", hi: "कच्चे किनारे अंदर" }, lang), { cls: "tm", anchor: "start", size: 8.5 });
    } else {
      s += '<path d="M15 56 L100 56"' + A + "/>";
      s += '<path d="M100 56 L185 56"' + B + "/>";
      s += '<path d="M100 56 Q96 56 96 52 Q96 48 100 48 L118 48"' + B + "/>";
      s += '<path d="M100 56 Q90 56 90 48 Q90 40 98 40 L126 40 Q131 40 131 44 Q131 48 126 48 L122 48"' + A + "/>";
      s += st(93, 48) + st(128, 48);
      s += FD.text(110, 82, L({ en: "2 rows of stitching, flat & strong", hi: "2 लाइन सिलाई, सपाट और मज़बूत" }, lang), { cls: "tm", size: 8.5 });
    }
    return FD.svg(200, 92, s);
  });

  /* ---------- 4. Seam finishes (looking at the seam allowance edge) ---------- */
  FD.diagram("sewing-basics-finish", function (a, lang) {
    var t = a.type || "pinked", s = "", y;
    var edge = 96;
    if (t === "pinked") {
      var p = "M20 10 L" + edge + " 10";
      for (y = 10; y < 110; y += 8) p += " L" + (edge + 5) + " " + (y + 4) + " L" + edge + " " + (y + 8);
      s += '<path d="' + p + ' L20 114 Z" class="fl"/>';
    } else if (t === "turned") {
      s += '<rect x="20" y="10" width="' + (edge - 20) + '" height="104" class="fl"/>';
      s += '<rect x="' + (edge - 10) + '" y="10" width="10" height="104" class="sf"/>' + seg(edge, 10, edge, 114, "ln", ' stroke-width="2"');
      s += seg(edge - 6, 10, edge - 6, 114, "ac", ' stroke-width="1.6" stroke-dasharray="4 2"');
    } else if (t === "bound") {
      s += '<rect x="20" y="10" width="' + (edge - 20) + '" height="104" class="fl"/>';
      s += '<rect x="' + (edge - 8) + '" y="10" width="14" height="104" rx="2" class="sf" stroke="currentColor" stroke-width="1.2"/>';
      s += seg(edge - 4, 10, edge - 4, 114, "ac", ' stroke-width="1.6" stroke-dasharray="4 2"');
    } else {
      s += '<rect x="20" y="10" width="' + (edge - 20) + '" height="104" class="fl"/>';
      var z = "M" + (edge - 10) + " 12";
      var step = t === "overlock" ? 3 : 6;
      for (y = 12; y < 112; y += step) z += " L" + (t === "overlock" ? edge + 2 : edge - 2) + " " + (y + step / 2) + " L" + (edge - 10) + " " + (y + step);
      s += '<path d="' + z + '" class="ac" stroke-width="' + (t === "overlock" ? 1 : 1.6) + '"/>';
      if (t === "overlock") s += seg(edge + 2, 10, edge + 2, 114, "ac", ' stroke-width="1.6"');
    }
    s += seg(32, 6, 32, 118, "gd");
    s += FD.text(26, 128, L({ en: "seam", hi: "सीम" }, lang), { cls: "tm", size: 8 });
    s += FD.text(edge, 128, L({ en: "edge", hi: "किनारा" }, lang), { cls: "tm", size: 8 });
    return FD.svg(130, 134, s);
  });

  /* ---------- 5. Shaping: darts, pleats, tucks, gathers, smocking ---------- */
  FD.diagram("sewing-basics-shape", function (a, lang) {
    var t = a.type || "dart", s = "", x;
    var top = 28, bot = 136;
    function panel(path) { return '<path d="' + path + '" class="fl"/>'; }
    if (t === "gather" || t === "smock") {
      s += panel("M40 " + top + " L100 " + top + " L128 " + bot + " L12 " + bot + " Z");
      for (x = 44; x <= 96; x += 6) {
        var bx = 12 + (x - 40) / 60 * 116;
        s += '<path d="M' + x + " " + (top + 2) + " Q" + (x + 2) + " " + ((top + bot) / 2) + " " + bx.toFixed(1) + " " + (bot - 2) + '" class="ln" stroke-width="0.9"/>';
      }
      if (t === "gather") {
        s += seg(40, top + 3, 100, top + 3, "ac", ' stroke-width="1.6" stroke-dasharray="3 2"');
        s += FD.text(70, 18, L({ en: "pull the threads", hi: "धागे खींचो" }, lang), { cls: "acf", size: 8.5 });
        s += arrow(30, 31, 39, 31, "ac") + arrow(110, 31, 101, 31, "ac");
      } else {
        for (var r = 0; r < 3; r++) for (x = 46; x < 84; x += 12) {
          var yy = top + 6 + r * 9, o = r % 2 ? 6 : 0;
          s += '<path d="M' + (x + o) + " " + yy + " l6 4 l6 -4" + '" class="ac" stroke-width="1.4"/>';
        }
        s += FD.text(70, 18, L({ en: "decorative stitches hold the folds", hi: "सजावटी टांके फोल्ड पकड़ते हैं" }, lang), { cls: "acf", size: 8 });
      }
      return FD.svg(140, 146, s);
    }
    s += panel("M15 " + top + " L125 " + top + " L125 " + bot + " L15 " + bot + " Z");
    function fold(x, side) { /* side: -1 shadow on left, 1 on right */
      return '<rect x="' + (side < 0 ? x - 5 : x) + '" y="' + top + '" width="5" height="' + (bot - top) + '" class="sf"/>' + seg(x, top, x, bot, "ln", ' stroke-width="1.4"');
    }
    if (t === "dart") {
      s += '<path d="M60 ' + top + " L70 100 L80 " + top + '" class="ac" stroke-width="1.6" stroke-dasharray="4 2"/><circle cx="70" cy="100" r="2" class="acf"/>';
      s += FD.text(88, 72, L({ en: "point", hi: "पॉइंट" }, lang), { cls: "tm", anchor: "start", size: 8.5 });
      s += FD.text(70, 18, L({ en: "fold & stitch the V", hi: "V को मोड़कर सिलो" }, lang), { cls: "acf", size: 8.5 });
    } else if (t === "knife") {
      [42, 70, 98].forEach(function (x) { s += fold(x, 1); });
      s += arrow(46, 18, 60, 18, "ac") + arrow(74, 18, 88, 18, "ac") + arrow(102, 18, 116, 18, "ac");
    } else if (t === "box") {
      s += fold(50, -1) + fold(90, 1);
      s += arrow(60, 18, 44, 18, "ac") + arrow(80, 18, 96, 18, "ac");
    } else if (t === "inverted") {
      s += '<rect x="64" y="' + top + '" width="12" height="' + (bot - top) + '" class="sf"/>' + seg(67, top, 67, bot, "ln", ' stroke-width="1.4"') + seg(73, top, 73, bot, "ln", ' stroke-width="1.4"');
      s += arrow(44, 18, 62, 18, "ac") + arrow(96, 18, 78, 18, "ac");
    } else if (t === "tuck") {
      for (x = 36; x <= 104; x += 17) {
        s += seg(x, top, x, 96, "ln", ' stroke-width="1.4"') + seg(x + 3, top, x + 3, 96, "ac", ' stroke-width="1.2" stroke-dasharray="3 2"');
        s += '<path d="M' + x + ' 96 Q' + (x + 1) + " 116 " + (x - 4) + " " + bot + '" class="gd"/>';
      }
      s += FD.text(70, 18, L({ en: "stitched folds", hi: "सिले हुए फोल्ड" }, lang), { cls: "acf", size: 8.5 });
    }
    return FD.svg(140, 146, s);
  });

  /* ---------- 6. Hem cross-sections ---------- */
  FD.diagram("sewing-basics-hem", function (a, lang) {
    var t = a.type || "narrow", s = "";
    var A = ' class="ln" stroke-width="3"';
    function st(x, y1, y2) { return '<line x1="' + x + '" y1="' + y1 + '" x2="' + x + '" y2="' + y2 + '" class="ac" stroke-width="1.4" stroke-dasharray="2 1.5"/>'; }
    s += FD.text(16, 30, L({ en: "garment", hi: "कपड़ा" }, lang), { cls: "tm", anchor: "start", size: 8.5 });
    if (t === "narrow") {
      s += '<path d="M15 40 L150 40 Q157 40 157 46 Q157 52 150 52 L134 52 Q129 52 129 49 Q129 46 134 46 L146 46"' + A + "/>";
      s += st(140, 34, 58);
      s += FD.text(100, 78, L({ en: "turned twice, stitched once", hi: "दो बार मोड़ो, एक बार सिलो" }, lang), { cls: "tm", size: 8.5 });
    } else if (t === "rolled") {
      s += '<path d="M15 40 L150 40 Q156 40 156 45 Q156 50 151 50 Q147 50 147 46 Q147 43.5 150 43.5"' + A + "/>";
      s += st(151, 34, 56);
      s += FD.text(100, 78, L({ en: "a tiny roll, for chiffon & dupatta edges", hi: "छोटा सा रोल - शिफॉन, दुपट्टे के किनारे" }, lang), { cls: "tm", size: 8.5 });
    } else {
      s += '<path d="M15 40 L156 40 Q162 40 162 46 Q162 52 156 52 L70 52"' + A + "/>";
      s += '<path d="M70 52 L64 48" class="ln" stroke-width="3"/>';
      s += '<path d="M60 40 L66 50 L72 40 L78 50" class="ac" stroke-width="1.3"/>';
      s += FD.text(69, 64, L({ en: "tiny catch", hi: "छोटा सा टांका" }, lang), { cls: "acf", size: 8.5 });
      s += FD.text(100, 84, L({ en: "hardly shows on the right side", hi: "सीधी तरफ़ मुश्किल से दिखता है" }, lang), { cls: "tm", size: 8.5 });
    }
    return FD.svg(200, 92, s);
  });

  /* ---------- 7. Pressing vs ironing ---------- */
  FD.diagram("sewing-basics-press", function (a, lang) {
    var m = a.mode || "iron", s = "";
    var iron = '<path d="M30 70 L100 70 Q100 48 80 44 L46 44 Q30 48 30 70 Z" class="fl"/><path d="M50 44 Q50 30 64 30 L84 30 Q90 30 90 38 L90 44" class="ln"/>';
    s += seg(10, 86, 130, 86, "ln", ' stroke-width="2"');
    if (m === "iron") {
      s += '<g transform="translate(5 8)">' + iron + "</g>";
      s += arrow(40, 96, 10, 96, "ac") + arrow(90, 96, 124, 96, "ac");
    } else {
      s += '<g transform="translate(5 8)">' + iron + "</g>";
      s += arrow(118, 70, 118, 30, "ac") + arrow(126, 30, 126, 70, "ac");
    }
    return FD.svg(140, 104, s);
  });

  /* ---------- 8. Care label symbols ---------- */
  FD.diagram("sewing-basics-care", function (a, lang) {
    var s = "";
    /* wash tub 30 */
    s += '<path d="M14 22 L20 52 L52 52 L58 22" class="ln"/><path d="M14 26 Q22 20 30 26 Q38 32 46 26 Q52 21 58 26" class="ln"/>';
    s += FD.text(36, 45, "30", { cls: "tx", size: 10 });
    /* bleach triangle crossed */
    s += '<path d="M100 20 L118 52 L82 52 Z" class="ln"/><path d="M88 26 L112 52 M112 26 L88 52" class="ac"/>';
    /* tumble dry */
    s += '<rect x="146" y="20" width="32" height="32" class="ln"/><circle cx="162" cy="36" r="11" class="ln"/><circle cx="162" cy="36" r="1.8" class="tx"/>';
    /* iron one dot */
    s += '<path d="M206 52 L246 52 Q246 32 232 28 L216 28 Q206 32 206 52 Z" class="ln"/><path d="M222 28 Q222 20 230 20 L240 20" class="ln"/><circle cx="226" cy="43" r="1.8" class="tx"/>';
    /* dry clean P */
    s += '<circle cx="290" cy="36" r="16" class="ln"/>' + FD.text(290, 41, "P", { cls: "tx", size: 13 });
    var lab = [[36, { en: "Wash at 30°C", hi: "30°C पर धोएं" }], [100, { en: "No bleach", hi: "ब्लीच नहीं" }], [162, { en: "Tumble dry", hi: "टंबल ड्राई" }],
      [226, { en: "Iron cool", hi: "हल्की गरम प्रेस" }], [290, { en: "Dry clean", hi: "ड्राई क्लीन" }]];
    lab.forEach(function (l) { s += FD.text(l[0], 72, L(l[1], lang), { cls: "tm", size: 9 }); });
    return FD.svg(320, 82, s);
  });
})();

FD.module({
  id: "sewing-basics",
  num: 10,
  level: "basic",
  title: { en: "Sewing Basics", hi: "सिलाई की बेसिक बातें" },
  tagline: { en: "Your machine, your stitches, and how clothes are put together", hi: "तुम्हारी मशीन, तुम्हारे टांके, और कपड़े कैसे जुड़ते हैं" },
  cover: "assets/img/sewing-basics/cover.jpg",
  learn: [
    { en: "The parts of a sewing machine and what each one does", hi: "सिलाई मशीन के पार्ट्स और हर एक का काम" },
    { en: "Seven hand stitches every designer should know", hi: "सात हाथ के टांके जो हर डिज़ाइनर को आने चाहिए" },
    { en: "Seams and how to finish raw edges neatly", hi: "सीम और कच्चे किनारों को साफ़ फ़िनिश करना" },
    { en: "Darts, pleats, tucks and gathers to shape fabric", hi: "डार्ट, प्लीट, टक और गैदर से कपड़े को आकार देना" },
    { en: "Closures, hems, pressing and care labels", hi: "क्लोज़र, हेम, प्रेसिंग और केयर लेबल" }
  ],
  lessons: [
    {
      id: "the-sewing-machine",
      title: { en: "The sewing machine", hi: "सिलाई मशीन" },
      min: 7,
      blocks: [
        { t: "p", text: {
          en: "Almost every garment you wear was joined by a sewing machine. It makes a **lockstitch**: one thread from the top (through the needle) locks with one thread from below (from the bobbin) inside the fabric. Learn the parts once and any machine will feel familiar.",
          hi: "तुम जो भी कपड़े पहनती हो, लगभग सभी सिलाई मशीन से जुड़े होते हैं। मशीन **लॉकस्टिच (Lockstitch)** बनाती है: ऊपर का धागा (सुई से आता है) और नीचे का धागा (बॉबिन से आता है) कपड़े के अंदर आपस में लॉक हो जाते हैं। एक बार पार्ट्स सीख लो, फिर कोई भी मशीन जानी-पहचानी लगेगी।" } },
        { t: "dg", name: "sewing-basics-machine",
          caption: { en: "The main parts of a domestic sewing machine. The dashed circle is the bobbin hidden under the throat plate.", hi: "घरेलू सिलाई मशीन के मुख्य पार्ट्स। डैश वाला गोला बॉबिन है जो थ्रोट प्लेट के नीचे छिपा रहता है।" } },
        { t: "gallery", items: [
          { src: "assets/img/sewing-basics/presser-foot-feed-dogs.jpg", label: { en: "Presser foot & feed dogs", hi: "प्रेसर फुट और फीड डॉग्स" },
            note: { en: "The foot holds the cloth; the teeth below move it forward", hi: "फुट कपड़े को दबाती है; नीचे के दाँत उसे आगे खिसकाते हैं" } },
          { src: "assets/img/sewing-basics/stitch-selector.jpg", label: { en: "Stitch selector", hi: "स्टिच सेलेक्टर" },
            note: { en: "Turn it to pick straight, zigzag or buttonhole", hi: "घुमाकर सीधा, ज़िगज़ैग या बटनहोल चुनो" } },
          { src: "assets/img/sewing-basics/hand-wheel.jpg", label: { en: "Hand wheel", hi: "हैंड व्हील" },
            note: { en: "Turn it towards you to move the needle by hand", hi: "अपनी तरफ़ घुमाकर सुई को हाथ से चलाओ" } },
          { src: "assets/img/sewing-basics/tension-dial.jpg", label: { en: "Tension dial", hi: "टेंशन डायल" },
            note: { en: "Controls how tight the top thread is", hi: "ऊपर के धागे की कसावट तय करता है" } },
          { src: "assets/img/sewing-basics/bobbin-insert.jpg", label: { en: "Bobbin and bobbin case", hi: "बॉबिन और बॉबिन केस" },
            note: { en: "Holds the lower thread", hi: "नीचे का धागा यहाँ रहता है" } }
        ] },
        { t: "cards", items: [
          { icon: "needle", title: { en: "Needle & presser foot", hi: "सुई और प्रेसर फुट" },
            text: { en: "Pick a needle size for your fabric: thin for chiffon, thick for denim. Lift the foot to place the cloth, lower it to sew.", hi: "कपड़े के हिसाब से सुई का नंबर चुनो: शिफॉन के लिए पतली, डेनिम के लिए मोटी। कपड़ा रखने के लिए फुट ऊपर करो, सिलने के लिए नीचे।" } },
          { icon: "thread", title: { en: "Tension", hi: "टेंशन" },
            text: { en: "If the thread loops on top or bottom, the tension is off. Re-thread first, then adjust the dial a little.", hi: "अगर धागा ऊपर या नीचे लूप बना रहा है, तो टेंशन गड़बड़ है। पहले धागा दोबारा डालो, फिर डायल थोड़ा एडजस्ट करो।" } },
          { icon: "machine", title: { en: "Reverse lever", hi: "रिवर्स लीवर" },
            text: { en: "Stitch backwards for 2-3 stitches at the start and end of a seam, to lock it so it won't open.", hi: "सीम की शुरुआत और अंत में 2-3 टांके उल्टे चलाओ ताकि सीम लॉक हो जाए और खुले नहीं।" } },
          { icon: "clock", title: { en: "Foot pedal", hi: "फुट पेडल" },
            text: { en: "Press gently to sew slowly. More pressure means more speed. Start slow!", hi: "हल्का दबाओ तो धीरे चलती है। ज़्यादा दबाओ तो तेज़। शुरुआत धीरे करो!" } }
        ] },
        { t: "h", text: { en: "Domestic, industrial and overlock", hi: "घरेलू, इंडस्ट्रियल और ओवरलॉक" } },
        { t: "gallery", items: [
          { src: "assets/img/sewing-basics/treadle-machine.jpg", label: { en: "Treadle machine", hi: "पैर वाली मशीन" },
            note: { en: "Powered by a foot pedal - found in many Indian homes and darzi shops", hi: "पैर के पेडल से चलती है - बहुत से घरों और दर्ज़ी की दुकानों में मिलती है" } },
          { src: "assets/img/sewing-basics/sewing-hands.jpg", label: { en: "Domestic machine", hi: "घरेलू मशीन" },
            note: { en: "Electric, many stitch types, good for home and college work", hi: "बिजली से चलती है, कई तरह के टांके, घर और कॉलेज के काम के लिए अच्छी" } },
          { src: "assets/img/sewing-basics/industrial-machine.jpg", label: { en: "Industrial machine", hi: "इंडस्ट्रियल मशीन" },
            note: { en: "One stitch type, very fast, built for all-day factory work", hi: "एक ही तरह का टांका, बहुत तेज़, पूरे दिन फ़ैक्टरी के काम के लिए बनी" } },
          { src: "assets/img/sewing-basics/overlock-machine.jpg", label: { en: "Overlock (serger)", hi: "ओवरलॉक (सर्जर)" },
            note: { en: "Cuts, sews and wraps the edge in one go", hi: "एक ही बार में काटती, सिलती और किनारा लपेटती है" } }
        ] },
        { t: "img", src: "assets/img/sewing-basics/tailor-shop-india.jpg",
          caption: { en: "A tailor's shop in India: the machine is the heart of the work.", hi: "भारत में एक दर्ज़ी की दुकान: मशीन ही काम का दिल है।" } },
        { t: "tip", kind: "mistake", text: {
          en: "Always raise the presser foot when you thread the machine. With the foot down, the tension discs are closed and the thread will not sit properly - then you get messy loops.",
          hi: "मशीन में धागा डालते समय प्रेसर फुट हमेशा ऊपर रखो। फुट नीचे हो तो टेंशन डिस्क बंद रहती हैं और धागा ठीक से नहीं बैठता - फिर गंदे लूप बनते हैं।" } },
        { t: "terms", items: [
          { en: "Bobbin", hi: "बॉबिन", def: { en: "A small spool that holds the lower thread.", hi: "छोटी रील जिसमें नीचे का धागा रहता है।" } },
          { en: "Feed dogs", hi: "फीड डॉग्स", def: { en: "Metal teeth under the foot that pull the fabric forward.", hi: "फुट के नीचे लगे धातु के दाँत जो कपड़े को आगे खींचते हैं।" } },
          { en: "Presser foot", hi: "प्रेसर फुट", def: { en: "The foot that presses the fabric flat against the feed dogs.", hi: "वो फुट जो कपड़े को फीड डॉग्स पर दबाकर रखती है।" } },
          { en: "Tension", hi: "टेंशन", def: { en: "How tightly the threads are pulled while stitching.", hi: "सिलाई के समय धागे कितने कसे हुए खिंचते हैं।" } },
          { en: "Overlock", hi: "ओवरलॉक", def: { en: "A machine that trims the edge and wraps it with looped threads.", hi: "मशीन जो किनारा काटकर उसे लूप वाले धागों से लपेट देती है।" } }
        ] },
        { t: "try", text: {
          en: "Take an unthreaded machine and a sheet of paper. Sew straight lines on the paper along drawn lines, slowly. It trains your hands without wasting fabric.",
          hi: "बिना धागे की मशीन और एक पेपर लो। पेपर पर बनी लाइनों पर धीरे-धीरे सीधी सिलाई करो। इससे कपड़ा खराब किए बिना हाथ सधते हैं।" } }
      ]
    },
    {
      id: "hand-stitches",
      title: { en: "Hand stitches", hi: "हाथ के टांके" },
      min: 7,
      blocks: [
        { t: "p", text: {
          en: "Even in the age of machines, designers sew by hand: to hold layers, finish hems, sew on buttons and fix mistakes. All you need is a needle, thread and fabric.",
          hi: "मशीनों के ज़माने में भी डिज़ाइनर हाथ से सिलते हैं: परतों को टिकाने, हेम फ़िनिश करने, बटन लगाने और गलतियाँ ठीक करने के लिए। बस सुई, धागा और कपड़ा चाहिए।" } },
        { t: "img", src: "assets/img/sewing-basics/sewing-kit.jpg",
          caption: { en: "A basic sewing kit: needles, pins, thread, tape measure and a pincushion.", hi: "बेसिक सिलाई किट: सुइयाँ, पिन, धागा, इंचीटेप और पिनकुशन।" } },
        { t: "gallery", cols: 3, items: [
          { dg: "sewing-basics-stitch", args: { type: "running" }, label: { en: "Running stitch", hi: "रनिंग स्टिच" },
            note: { en: "In and out, evenly. For seams and gathering", hi: "अंदर-बाहर, बराबर दूरी पर। सीम और गैदर के लिए" } },
          { dg: "sewing-basics-stitch", args: { type: "basting" }, label: { en: "Basting (tacking)", hi: "बेस्टिंग (तुरपाई/कच्चा टांका)" },
            note: { en: "Long, loose, temporary. Pull out later", hi: "लंबा, ढीला, अस्थायी। बाद में निकाल देते हैं" } },
          { dg: "sewing-basics-stitch", args: { type: "back" }, label: { en: "Backstitch", hi: "बैकस्टिच" },
            note: { en: "Strongest hand stitch, looks like a machine line", hi: "सबसे मज़बूत हाथ का टांका, मशीन की लाइन जैसा" } },
          { dg: "sewing-basics-stitch", args: { type: "hem" }, label: { en: "Hemming stitch", hi: "हेमिंग स्टिच" },
            note: { en: "Small slanted stitches that hold a hem", hi: "छोटे तिरछे टांके जो हेम को टिकाते हैं" } },
          { dg: "sewing-basics-stitch", args: { type: "slip" }, label: { en: "Slip stitch", hi: "स्लिप स्टिच" },
            note: { en: "Nearly invisible; closes openings and lining", hi: "लगभग अदृश्य; खुली जगह और लाइनिंग बंद करता है" } },
          { dg: "sewing-basics-stitch", args: { type: "blanket" }, label: { en: "Blanket stitch", hi: "ब्लैंकेट स्टिच" },
            note: { en: "Wraps a raw edge; also decorative", hi: "कच्चे किनारे को लपेटता है; सजावट भी" } },
          { dg: "sewing-basics-stitch", args: { type: "cross" }, label: { en: "Cross stitch", hi: "क्रॉस स्टिच" },
            note: { en: "Little X shapes, used in embroidery", hi: "छोटे X आकार, कढ़ाई में इस्तेमाल" } }
        ] },
        { t: "img", src: "assets/img/sewing-basics/stitch-sampler.jpg",
          caption: { en: "A real sampler: running, baste, back, invisible (ladder), catch, whip and blanket stitches side by side.", hi: "असली सैंपलर: रनिंग, बेस्ट, बैक, इनविज़िबल (लैडर), कैच, व्हिप और ब्लैंकेट स्टिच साथ-साथ।" } },
        { t: "steps", items: [
          { title: { en: "Thread and knot", hi: "धागा डालो और गाँठ बाँधो" }, text: { en: "Use a thread about as long as your arm. Knot the end. Double thread is stronger for buttons.", hi: "अपनी बाँह जितना लंबा धागा लो। सिरे पर गाँठ बाँधो। बटन के लिए दोहरा धागा ज़्यादा मज़बूत रहता है।" } },
          { title: { en: "Start hidden", hi: "छिपाकर शुरू करो" }, text: { en: "Bring the needle up from the wrong side so the knot stays hidden.", hi: "सुई को उल्टी तरफ़ से ऊपर लाओ ताकि गाँठ छिपी रहे।" } },
          { title: { en: "Keep stitches even", hi: "टांके बराबर रखो" }, text: { en: "Same length, same gap, same pull. Do not pull so tight that the fabric puckers.", hi: "टांके की लंबाई, दूरी और खिंचाव एक जैसा रखो। इतना कसकर मत खींचो कि कपड़ा सिकुड़ जाए।" } },
          { title: { en: "Finish firmly", hi: "पक्का करके खत्म करो" }, text: { en: "Take 2-3 tiny stitches on the same spot, then cut the thread close.", hi: "एक ही जगह पर 2-3 छोटे टांके लगाओ, फिर धागा पास से काट दो।" } }
        ] },
        { t: "img", src: "assets/img/sewing-basics/blanket-stitch.jpg",
          caption: { en: "Evenly spaced stitches along an edge, as in a blanket stitch.", hi: "किनारे पर बराबर दूरी के टांके, जैसे ब्लैंकेट स्टिच में।" } },
        { t: "img", src: "assets/img/sewing-basics/cross-stitch.jpg",
          caption: { en: "Cross stitch in a repeating pattern, a favourite in folk embroidery.", hi: "दोहराए पैटर्न में क्रॉस स्टिच, लोक कढ़ाई में बहुत पसंद किया जाता है।" } },
        { t: "tip", kind: "tip", text: {
          en: "Practise on a piece of striped or checked fabric. The lines work as a guide, so your stitches stay straight and equal.",
          hi: "धारीदार या चेक वाले कपड़े पर प्रैक्टिस करो। लाइनें गाइड का काम करती हैं, इसलिए टांके सीधे और बराबर रहते हैं।" } },
        { t: "terms", items: [
          { en: "Basting / tacking", hi: "बेस्टिंग / टैकिंग", def: { en: "Long temporary stitches that hold fabric in place.", hi: "लंबे अस्थायी टांके जो कपड़े को अपनी जगह पर टिकाते हैं।" } },
          { en: "Backstitch", hi: "बैकस्टिच", def: { en: "A strong stitch where each stitch goes back to meet the last.", hi: "मज़बूत टांका जिसमें हर टांका पीछे जाकर पिछले से मिलता है।" } },
          { en: "Slip stitch", hi: "स्लिप स्टिच", def: { en: "An almost invisible stitch that slides inside a fold.", hi: "लगभग अदृश्य टांका जो फोल्ड के अंदर चलता है।" } },
          { en: "Blanket stitch", hi: "ब्लैंकेट स्टिच", def: { en: "A looped stitch worked along an edge.", hi: "किनारे पर चलने वाला लूप वाला टांका।" } },
          { en: "Raw edge", hi: "रॉ एज", def: { en: "A cut edge of fabric that is not finished and can fray.", hi: "कपड़े का कटा हुआ किनारा जो फ़िनिश नहीं है और उधड़ सकता है।" } }
        ] },
        { t: "try", text: {
          en: "On a scrap, sew 10 stitches of each type in a row. Label them with a pencil. Keep it in your sketchbook as your own sampler.",
          hi: "एक टुकड़े पर हर तरह के 10-10 टांके एक लाइन में सिलो। पेंसिल से नाम लिखो। इसे अपनी स्केचबुक में अपने सैंपलर की तरह रखो।" } }
      ]
    },
    {
      id: "seams-and-finishes",
      title: { en: "Seams & seam finishes", hi: "सीम और सीम फ़िनिश" },
      min: 7,
      blocks: [
        { t: "p", text: {
          en: "A **seam** is the line where two pieces of fabric are sewn together. The seam type decides how strong, flat and neat your garment is, inside and out.",
          hi: "**सीम (Seam)** वो लाइन है जहाँ कपड़े के दो टुकड़े सिलकर जुड़ते हैं। सीम का तरीका तय करता है कि तुम्हारा कपड़ा अंदर और बाहर से कितना मज़बूत, सपाट और साफ़ होगा।" } },
        { t: "gallery", cols: 3, items: [
          { dg: "sewing-basics-seam", args: { type: "plain" }, label: { en: "Plain seam", hi: "प्लेन सीम" },
            note: { en: "Most common. Right sides together, then press open", hi: "सबसे आम। सीधी तरफ़ अंदर करके सिलो, फिर खोलकर प्रेस करो" } },
          { dg: "sewing-basics-seam", args: { type: "french" }, label: { en: "French seam", hi: "फ्रेंच सीम" },
            note: { en: "Seam inside a seam. Great for sheer fabric", hi: "सीम के अंदर सीम। झीने कपड़े के लिए बढ़िया" } },
          { dg: "sewing-basics-seam", args: { type: "flatfelled" }, label: { en: "Flat-felled seam", hi: "फ्लैट-फेल्ड सीम" },
            note: { en: "Strong and flat. Jeans and shirts", hi: "मज़बूत और सपाट। जींस और शर्ट" } }
        ] },
        { t: "p", text: {
          en: "For a **French seam**, first sew with **wrong** sides together, trim, press, then fold and sew again with right sides together. All raw edges end up hidden inside - perfect for chiffon dupattas and blouses.",
          hi: "**फ्रेंच सीम** में पहले **उल्टी** तरफ़ अंदर करके सिलते हैं, कतरते हैं, प्रेस करते हैं, फिर मोड़कर सीधी तरफ़ अंदर करके दोबारा सिलते हैं। सारे कच्चे किनारे अंदर छिप जाते हैं - शिफॉन के दुपट्टे और ब्लाउज़ के लिए एकदम सही।" } },
        { t: "img", src: "assets/img/sewing-basics/flat-felled-seam.jpg",
          caption: { en: "A flat-felled seam on trousers: two neat rows of stitching on the outside, no raw edge anywhere.", hi: "ट्राउज़र पर फ्लैट-फेल्ड सीम: बाहर दो साफ़ सिलाई की लाइनें, कहीं कच्चा किनारा नहीं।" } },
        { t: "h", text: { en: "Finishing the raw edges", hi: "कच्चे किनारों को फ़िनिश करना" } },
        { t: "p", text: {
          en: "Cut edges fray. A **seam finish** stops this, so your garment survives many washes. Choose the finish by the fabric and by how much the inside will be seen.",
          hi: "कटे किनारे उधड़ते हैं। **सीम फ़िनिश (Seam finish)** इसे रोकता है, ताकि तुम्हारा कपड़ा कई धुलाई झेल सके। फ़िनिश कपड़े और इस पर चुनो कि अंदर का हिस्सा कितना दिखेगा।" } },
        { t: "gallery", cols: 3, items: [
          { dg: "sewing-basics-finish", args: { type: "pinked" }, label: { en: "Pinked", hi: "पिंक्ड" },
            note: { en: "Zigzag cut with pinking shears. Quick", hi: "पिंकिंग कैंची से ज़िगज़ैग कट। जल्दी" } },
          { dg: "sewing-basics-finish", args: { type: "zigzag" }, label: { en: "Zigzag", hi: "ज़िगज़ैग" },
            note: { en: "Zigzag stitch near the edge. Any machine", hi: "किनारे के पास ज़िगज़ैग टांका। कोई भी मशीन" } },
          { dg: "sewing-basics-finish", args: { type: "overlock" }, label: { en: "Overlocked", hi: "ओवरलॉक्ड" },
            note: { en: "Looped threads wrap the edge. Used in factories", hi: "लूप वाले धागे किनारा लपेटते हैं। फ़ैक्टरी में आम" } },
          { dg: "sewing-basics-finish", args: { type: "bound" }, label: { en: "Bound", hi: "बाउंड" },
            note: { en: "A bias strip wraps the edge. Neat and fancy", hi: "बायस पट्टी किनारे को लपेटती है। साफ़ और खूबसूरत" } },
          { dg: "sewing-basics-finish", args: { type: "turned" }, label: { en: "Turned and stitched", hi: "टर्न्ड एंड स्टिच्ड" },
            note: { en: "Fold the edge under and stitch. Light fabrics", hi: "किनारा अंदर मोड़कर सिलो। हल्के कपड़ों के लिए" } }
        ] },
        { t: "gallery", items: [
          { src: "assets/img/sewing-basics/pinking-shears.jpg", label: { en: "Pinking shears", hi: "पिंकिंग कैंची" },
            note: { en: "Their zigzag blades cut an edge that frays less", hi: "इनके ज़िगज़ैग ब्लेड ऐसा किनारा काटते हैं जो कम उधड़ता है" } },
          { src: "assets/img/sewing-basics/overlock-edge.jpg", label: { en: "An overlocked edge", hi: "ओवरलॉक किया हुआ किनारा" },
            note: { en: "The looped threads on the edge are easy to spot", hi: "किनारे पर लूप वाले धागे आसानी से पहचाने जाते हैं" } }
        ] },
        { t: "tip", kind: "remember", text: {
          en: "Press every seam right after you sew it. A seam that is pressed flat looks professional; an unpressed one always looks homemade.",
          hi: "हर सीम सिलते ही प्रेस करो। प्रेस की हुई सीम प्रोफ़ेशनल दिखती है; बिना प्रेस की सीम हमेशा घर की सिली लगती है।" } },
        { t: "terms", items: [
          { en: "Seam", hi: "सीम", def: { en: "The line where two fabric pieces are joined.", hi: "वो लाइन जहाँ कपड़े के दो टुकड़े जुड़ते हैं।" } },
          { en: "Right sides together", hi: "राइट साइड्स टुगेदर", def: { en: "Placing the outer faces of two pieces against each other before sewing.", hi: "सिलने से पहले दोनों टुकड़ों की सीधी तरफ़ आपस में अंदर की ओर रखना।" } },
          { en: "Press open", hi: "प्रेस ओपन", def: { en: "Pressing the seam allowances apart so the seam lies flat.", hi: "सीम अलाउंस को दोनों तरफ़ खोलकर प्रेस करना ताकि सीम सपाट रहे।" } },
          { en: "Seam finish", hi: "सीम फ़िनिश", def: { en: "Any treatment that stops a raw edge from fraying.", hi: "कोई भी तरीका जो कच्चे किनारे को उधड़ने से रोके।" } },
          { en: "Bias binding", hi: "बायस बाइंडिंग", def: { en: "A strip cut on the bias, used to wrap and finish edges.", hi: "बायस पर कटी पट्टी, जो किनारों को लपेटकर फ़िनिश करती है।" } }
        ] },
        { t: "try", text: {
          en: "Turn one of your kurtas inside out. Find out which seam finish was used - pinked, overlocked, or turned? Sketch what you see.",
          hi: "अपना एक कुर्ता उल्टा करो। पता लगाओ कि कौन सा सीम फ़िनिश लगा है - पिंक्ड, ओवरलॉक्ड या टर्न्ड? जो दिखे उसका स्केच बनाओ।" } }
      ]
    },
    {
      id: "shaping-fabric",
      title: { en: "Shaping fabric", hi: "कपड़े को आकार देना" },
      min: 7,
      blocks: [
        { t: "p", text: {
          en: "Flat fabric has to fit a curved body. Designers use a few simple tricks to take in fabric, add fullness or add texture: **darts, pleats, tucks, gathers and smocking**.",
          hi: "सपाट कपड़े को घुमावदार शरीर पर फ़िट होना है। डिज़ाइनर कपड़ा कम करने, फैलाव जोड़ने या टेक्सचर देने के लिए कुछ आसान तरीके अपनाते हैं: **डार्ट, प्लीट, टक, गैदर और स्मॉकिंग**।" } },
        { t: "gallery", cols: 3, items: [
          { dg: "sewing-basics-shape", args: { type: "dart" }, label: { en: "Dart", hi: "डार्ट" },
            note: { en: "A stitched wedge: fits the bust and waist", hi: "सिला हुआ V: बस्ट और कमर पर फ़िट करता है" } },
          { dg: "sewing-basics-shape", args: { type: "tuck" }, label: { en: "Tucks", hi: "टक" },
            note: { en: "Narrow stitched folds; they also add texture", hi: "पतले सिले फोल्ड; टेक्सचर भी देते हैं" } },
          { dg: "sewing-basics-shape", args: { type: "gather" }, label: { en: "Gathers", hi: "गैदर" },
            note: { en: "Long stitches pulled to make soft fullness", hi: "लंबे टांके खींचकर नरम फैलाव बनाते हैं" } },
          { dg: "sewing-basics-shape", args: { type: "knife" }, label: { en: "Knife pleats", hi: "नाइफ प्लीट" },
            note: { en: "All folds face the same way", hi: "सारे फोल्ड एक ही दिशा में" } },
          { dg: "sewing-basics-shape", args: { type: "box" }, label: { en: "Box pleats", hi: "बॉक्स प्लीट" },
            note: { en: "Two folds turn away from each other", hi: "दो फोल्ड एक-दूसरे से दूर मुड़ते हैं" } },
          { dg: "sewing-basics-shape", args: { type: "inverted" }, label: { en: "Inverted pleat", hi: "इनवर्टेड प्लीट" },
            note: { en: "Two folds meet in the middle", hi: "दो फोल्ड बीच में मिलते हैं" } },
          { dg: "sewing-basics-shape", args: { type: "smock" }, label: { en: "Smocking", hi: "स्मॉकिंग" },
            note: { en: "Gathers held by decorative stitches; stretchy", hi: "गैदर को सजावटी टांके पकड़ते हैं; लचीला" } }
        ] },
        { t: "p", text: {
          en: "A **dart** removes extra fabric at one point, so a flat piece becomes 3D. A **pleat** is a fold of fabric pressed or stitched in place. Gathers use many tiny folds, so they give a softer, fuller look.",
          hi: "**डार्ट (Dart)** एक जगह का एक्स्ट्रा कपड़ा कम करता है, जिससे सपाट टुकड़ा 3D बन जाता है। **प्लीट (Pleat)** कपड़े का वो फोल्ड है जो प्रेस या सिलाई से टिका होता है। गैदर में बहुत सारे छोटे फोल्ड होते हैं, इसलिए ज़्यादा नरम और भरा लुक आता है।" } },
        { t: "gallery", items: [
          { src: "assets/img/sewing-basics/knife-pleats-skirt.jpg", label: { en: "Knife-pleated skirt", hi: "नाइफ प्लीट वाली स्कर्ट" },
            note: { en: "Like a school-uniform skirt", hi: "स्कूल यूनिफ़ॉर्म की स्कर्ट जैसी" } },
          { src: "assets/img/sewing-basics/box-pleats-fabric.jpg", label: { en: "Box pleats", hi: "बॉक्स प्लीट" },
            note: { en: "Wide, flat folds with a clean box shape", hi: "चौड़े, सपाट फोल्ड, साफ़ बॉक्स आकार" } },
          { src: "assets/img/sewing-basics/gathers.jpg", label: { en: "Gathers", hi: "गैदर" },
            note: { en: "Tiny folds along a cuff or yoke", hi: "कफ या योक पर छोटे फोल्ड" } },
          { src: "assets/img/sewing-basics/smocking-sampler.jpg", label: { en: "Smocking sampler", hi: "स्मॉकिंग सैंपलर" },
            note: { en: "Rows of decorative stitches over gathers", hi: "गैदर के ऊपर सजावटी टांकों की लाइनें" } }
        ] },
        { t: "img", src: "assets/img/sewing-basics/pleats-sewn.jpg",
          caption: { en: "Pleats stitched at the top edge, so they stay in place at the waist.", hi: "ऊपर के किनारे पर सिले प्लीट, ताकि कमर पर अपनी जगह रहें।" } },
        { t: "steps", items: [
          { title: { en: "Gathering by machine", hi: "मशीन से गैदर करना" }, text: { en: "Set the longest stitch length. Sew two parallel lines just inside the seam allowance.", hi: "सबसे लंबा टांका सेट करो। सीम अलाउंस के ठीक अंदर दो पैरेलल लाइनें सिलो।" } },
          { title: { en: "Pull the bobbin threads", hi: "बॉबिन के धागे खींचो" }, text: { en: "Hold both bobbin threads and push the fabric along them, so it bunches evenly.", hi: "दोनों बॉबिन धागे पकड़ो और कपड़े को उन पर खिसकाओ, ताकि वो बराबर इकट्ठा हो।" } },
          { title: { en: "Fit and stitch", hi: "फ़िट करो और सिलो" }, text: { en: "Match the gathered edge to the other piece, pin, and sew on the seam line. Remove the gathering threads.", hi: "गैदर किया किनारा दूसरे टुकड़े से मिलाओ, पिन करो, और सीम लाइन पर सिलो। गैदर के धागे निकाल दो।" } }
        ] },
        { t: "tip", kind: "fact", text: {
          en: "Smocked kurtis, dresses and kids' frocks are popular in India. Many of them use **shirring**: rows of elastic thread that gather the fabric automatically.",
          hi: "भारत में स्मॉक्ड कुर्ती, ड्रेस और बच्चों की फ्रॉक बहुत चलती हैं। इनमें से बहुत सी **शिरिंग (Shirring)** से बनती हैं: इलास्टिक धागे की लाइनें जो कपड़े को अपने आप गैदर कर देती हैं।" } },
        { t: "terms", items: [
          { en: "Dart", hi: "डार्ट", def: { en: "A stitched wedge that removes extra fabric to give shape.", hi: "सिला हुआ V जो एक्स्ट्रा कपड़ा हटाकर आकार देता है।" } },
          { en: "Pleat", hi: "प्लीट", def: { en: "A folded and pressed or stitched layer of fabric.", hi: "कपड़े की मुड़ी हुई परत जो प्रेस या सिलाई से टिकी हो।" } },
          { en: "Tuck", hi: "टक", def: { en: "A small stitched fold, often decorative.", hi: "छोटा सिला हुआ फोल्ड, अक्सर सजावट के लिए।" } },
          { en: "Gathers", hi: "गैदर", def: { en: "Many tiny folds made by pulling a long stitch.", hi: "लंबा टांका खींचकर बने बहुत सारे छोटे फोल्ड।" } },
          { en: "Smocking", hi: "स्मॉकिंग", def: { en: "Decorative stitching that holds gathered fabric in a pattern.", hi: "सजावटी सिलाई जो गैदर किए कपड़े को पैटर्न में पकड़ती है।" } }
        ] },
        { t: "try", text: {
          en: "Take a strip of fabric and gather it by hand with a running stitch. Pull it to half its length and notice how soft the fullness looks.",
          hi: "कपड़े की एक पट्टी लो और रनिंग स्टिच से हाथ से गैदर करो। उसे आधी लंबाई तक खींचो और देखो कि फैलाव कितना नरम दिखता है।" } }
      ]
    },
    {
      id: "closures",
      title: { en: "Closures", hi: "क्लोज़र" },
      min: 6,
      blocks: [
        { t: "p", text: {
          en: "A **closure** is anything that opens and closes a garment: buttons, zips, hooks, snaps. A good closure is strong, easy to use and sits in the right place for the design.",
          hi: "**क्लोज़र (Closure)** वो हर चीज़ है जिससे कपड़ा खुलता और बंद होता है: बटन, ज़िप, हुक, स्नैप। अच्छा क्लोज़र मज़बूत होता है, इस्तेमाल में आसान होता है और डिज़ाइन के हिसाब से सही जगह लगता है।" } },
        { t: "gallery", items: [
          { src: "assets/img/sewing-basics/buttonhole.jpg", label: { en: "Button and buttonhole", hi: "बटन और बटनहोल" },
            note: { en: "The hole should be as long as the button width plus its thickness", hi: "छेद की लंबाई बटन की चौड़ाई + उसकी मोटाई के बराबर रखो" } },
          { src: "assets/img/sewing-basics/buttonhole-hand.jpg", label: { en: "Hand-sewn buttonhole", hi: "हाथ से बना बटनहोल" },
            note: { en: "Tailors do it with a buttonhole stitch", hi: "दर्ज़ी इसे बटनहोल स्टिच से बनाते हैं" } },
          { src: "assets/img/sewing-basics/zippers.jpg", label: { en: "Zippers", hi: "ज़िप" },
            note: { en: "Metal, nylon coil and plastic teeth", hi: "मेटल, नायलॉन कॉइल और प्लास्टिक के दाँत" } },
          { src: "assets/img/sewing-basics/zipper-pull.jpg", label: { en: "Zip slider and pull", hi: "ज़िप का स्लाइडर और पुल" } },
          { src: "assets/img/sewing-basics/press-studs.jpg", label: { en: "Press studs (snaps)", hi: "प्रेस स्टड (स्नैप)" },
            note: { en: "Two halves that snap together", hi: "दो हिस्से जो आपस में क्लिक होते हैं" } },
          { src: "assets/img/sewing-basics/velcro.jpg", label: { en: "Hook-and-loop (Velcro)", hi: "हुक-एंड-लूप (वेल्क्रो)" },
            note: { en: "Quick and easy, good for kids and sportswear", hi: "तेज़ और आसान, बच्चों और स्पोर्ट्सवियर के लिए अच्छा" } }
        ] },
        { t: "cards", items: [
          { icon: "button", title: { en: "Buttons", hi: "बटन" },
            text: { en: "Sew on with a thread shank so the button sits slightly away from the fabric and doesn't strain.", hi: "थ्रेड शैंक के साथ लगाओ, ताकि बटन कपड़े से थोड़ा ऊपर रहे और ज़ोर न पड़े।" } },
          { icon: "layers", title: { en: "Zippers", hi: "ज़िप" },
            text: { en: "Regular zips show their teeth. Invisible zips hide the teeth in the seam, so they suit dresses, lehengas and kurtis. Metal zips are tough and used in jeans and jackets.", hi: "रेगुलर ज़िप में दाँत दिखते हैं। इनविज़िबल ज़िप के दाँत सीम में छिप जाते हैं, इसलिए ड्रेस, लहंगे और कुर्ती पर सूट करती है। मेटल ज़िप मज़बूत होती है, जींस और जैकेट में लगती है।" } },
          { icon: "pin", title: { en: "Hooks & eyes", hi: "हुक और आई" },
            text: { en: "A small metal hook catches a loop (the eye). Used at the top of back zips, waistbands and blouse backs, where you need a flat, strong hold.", hi: "छोटा मेटल हुक एक लूप (आई) में फँसता है। पीछे की ज़िप के ऊपर, वेस्टबैंड और ब्लाउज़ के पीछे लगता है, जहाँ सपाट और मज़बूत पकड़ चाहिए।" } },
          { icon: "star", title: { en: "Press studs", hi: "प्रेस स्टड" },
            text: { en: "Good for light closures like a blouse placket or kurta side opening. They should not carry much strain.", hi: "हल्के क्लोज़र के लिए अच्छे हैं, जैसे ब्लाउज़ की पट्टी या कुर्ते का साइड ओपनिंग। इन पर ज़्यादा ज़ोर नहीं पड़ना चाहिए।" } },
          { icon: "wave", title: { en: "Drawstrings", hi: "ड्रॉस्ट्रिंग" },
            text: { en: "A cord threaded through a channel and pulled tight. Think of a pyjama's nada or a potli bag.", hi: "चैनल में पिरोई हुई डोरी जिसे कसकर बाँधते हैं। पजामे का नाड़ा या पोटली बैग सोचो।" } }
        ] },
        { t: "img", src: "assets/img/sewing-basics/drawstring-pants.jpg",
          caption: { en: "Track pants with a drawstring waist: an elastic waistband plus a cord for adjusting.", hi: "ड्रॉस्ट्रिंग कमर वाली ट्रैक पैंट: इलास्टिक वेस्टबैंड के साथ एडजस्ट करने के लिए डोरी।" } },
        { t: "tip", kind: "tip", text: {
          en: "Always test the buttonhole on a scrap of the same fabric first. Then cut it open with a seam ripper, working from both ends towards the middle.",
          hi: "बटनहोल को पहले उसी कपड़े के टुकड़े पर टेस्ट करो। फिर सीम रिपर से दोनों सिरों से बीच की तरफ़ काटकर खोलो।" } },
        { t: "terms", items: [
          { en: "Closure", hi: "क्लोज़र", def: { en: "A fastener that opens and closes a garment.", hi: "कपड़े को खोलने और बंद करने वाला फ़ास्नर।" } },
          { en: "Placket", hi: "प्लैकेट", def: { en: "The strip of fabric where a garment opens, often with buttons.", hi: "कपड़े की वो पट्टी जहाँ कपड़ा खुलता है, अक्सर बटन के साथ।" } },
          { en: "Slider", hi: "स्लाइडर", def: { en: "The part of a zip you pull to open and close it.", hi: "ज़िप का वो हिस्सा जिसे खींचकर खोलते और बंद करते हैं।" } },
          { en: "Hook and eye", hi: "हुक एंड आई", def: { en: "A small metal hook and loop used to close an opening flat.", hi: "छोटा मेटल हुक और लूप जो खुली जगह को सपाट बंद करता है।" } },
          { en: "Drawstring", hi: "ड्रॉस्ट्रिंग", def: { en: "A cord pulled through a channel to tighten an opening.", hi: "चैनल में पिरोई डोरी जिससे खुली जगह कसी जाती है।" } }
        ] },
        { t: "try", text: {
          en: "Find 5 different closures in your wardrobe. Note where each is placed and why the designer chose it there.",
          hi: "अपनी अलमारी में 5 अलग क्लोज़र ढूंढो। लिखो कि हर एक कहाँ लगा है और डिज़ाइनर ने उसे वहाँ क्यों चुना होगा।" } }
      ]
    },
    {
      id: "finishing",
      title: { en: "Finishing: hems, pressing, care labels", hi: "फ़िनिशिंग: हेम, प्रेसिंग, केयर लेबल" },
      min: 6,
      blocks: [
        { t: "p", text: {
          en: "Finishing is what separates a homemade look from a professional one. A neat hem, well-pressed seams and a proper care label make a garment feel ready to wear.",
          hi: "फ़िनिशिंग से ही घर का सिला और प्रोफ़ेशनल कपड़ा अलग दिखता है। साफ़ हेम, अच्छी तरह प्रेस की सीम और सही केयर लेबल कपड़े को पहनने लायक बनाते हैं।" } },
        { t: "gallery", cols: 3, items: [
          { dg: "sewing-basics-hem", args: { type: "narrow" }, label: { en: "Narrow hem", hi: "नैरो हेम" },
            note: { en: "Turn twice and stitch. Shirts, skirts", hi: "दो बार मोड़कर सिलो। शर्ट, स्कर्ट" } },
          { dg: "sewing-basics-hem", args: { type: "rolled" }, label: { en: "Rolled hem", hi: "रोल्ड हेम" },
            note: { en: "Tiny roll. Chiffon, silk, dupattas", hi: "छोटा रोल। शिफॉन, सिल्क, दुपट्टे" } },
          { dg: "sewing-basics-hem", args: { type: "blind" }, label: { en: "Blind hem", hi: "ब्लाइंड हेम" },
            note: { en: "Hardly visible. Trousers, formal skirts", hi: "मुश्किल से दिखता है। ट्राउज़र, फ़ॉर्मल स्कर्ट" } }
        ] },
        { t: "img", src: "assets/img/sewing-basics/hemming-jeans.jpg",
          caption: { en: "Hemming trousers on the machine. The fold is pinned and pressed first.", hi: "मशीन पर ट्राउज़र की हेम सिलाई। फोल्ड को पहले पिन और प्रेस किया जाता है।" } },
        { t: "p", text: {
          en: "Always press the hem fold before you stitch. Measure with a small ruler or a card, not by eye, so the hem stays the same depth all the way round.",
          hi: "सिलने से पहले हेम का फोल्ड हमेशा प्रेस करो। छोटे रूलर या कार्ड से नापो, आँख से नहीं, ताकि हेम चारों तरफ़ बराबर गहराई का रहे।" } },
        { t: "h", text: { en: "Pressing is not ironing", hi: "प्रेसिंग और आयरनिंग अलग हैं" } },
        { t: "compare", items: [
          { title: { en: "Ironing", hi: "आयरनिंग" }, dg: "sewing-basics-press", args: { mode: "iron" },
            points: [
              { en: "Slide the iron back and forth", hi: "आयरन को आगे-पीछे चलाओ" },
              { en: "Removes wrinkles from finished clothes", hi: "तैयार कपड़ों की सिलवटें निकालता है" },
              { en: "Can stretch fabric if you drag it", hi: "घसीटने से कपड़ा खिंच सकता है" }
            ] },
          { title: { en: "Pressing", hi: "प्रेसिंग" }, dg: "sewing-basics-press", args: { mode: "press" },
            points: [
              { en: "Lift and put the iron down", hi: "आयरन को उठाओ और रखो" },
              { en: "Sets seams, darts and hems while sewing", hi: "सिलाई के दौरान सीम, डार्ट और हेम सेट करता है" },
              { en: "Keeps the shape exact", hi: "आकार एकदम सही रखता है" }
            ] }
        ] },
        { t: "h", text: { en: "Care labels", hi: "केयर लेबल" } },
        { t: "dg", name: "sewing-basics-care",
          caption: { en: "Common care symbols: wash tub (number = max temperature), crossed triangle (no bleach), tumble dry, iron (dots = heat), circle (dry clean).", hi: "आम केयर सिंबल: बाल्टी (नंबर = ज़्यादा से ज़्यादा तापमान), कटा त्रिकोण (ब्लीच नहीं), टंबल ड्राई, आयरन (डॉट = गर्मी), गोला (ड्राई क्लीन)।" } },
        { t: "tip", kind: "tip", text: {
          en: "Before you sew a label in, check the fabric. Cotton and linen tolerate a hot iron; silk, rayon and synthetics need a cool one. Test the iron on a scrap.",
          hi: "लेबल सिलने से पहले कपड़ा देखो। कॉटन और लिनेन गरम आयरन सह लेते हैं; सिल्क, रेयॉन और सिंथेटिक के लिए हल्का आयरन चाहिए। पहले टुकड़े पर आयरन टेस्ट करो।" } },
        { t: "terms", items: [
          { en: "Hem", hi: "हेम", def: { en: "The finished bottom edge of a garment or sleeve.", hi: "कपड़े या स्लीव का फ़िनिश किया हुआ निचला किनारा।" } },
          { en: "Blind hem", hi: "ब्लाइंड हेम", def: { en: "A hem stitched so the stitches are almost invisible.", hi: "ऐसा हेम जिसके टांके लगभग दिखते नहीं।" } },
          { en: "Rolled hem", hi: "रोल्ड हेम", def: { en: "A very narrow hem made by rolling the edge twice.", hi: "किनारे को दो बार रोल करके बना बहुत पतला हेम।" } },
          { en: "Pressing", hi: "प्रेसिंग", def: { en: "Lifting and lowering the iron to shape and set seams.", hi: "आयरन को उठाकर-रखकर सीम को आकार देना और सेट करना।" } },
          { en: "Care label", hi: "केयर लेबल", def: { en: "A tag that tells how to wash, dry and iron a garment.", hi: "टैग जो बताता है कि कपड़ा कैसे धोना, सुखाना और प्रेस करना है।" } }
        ] },
        { t: "try", text: {
          en: "Collect 5 care labels from your clothes. Decode every symbol and write down which fabric each garment is made of.",
          hi: "अपने कपड़ों से 5 केयर लेबल इकट्ठा करो। हर सिंबल का मतलब निकालो और लिखो कि कपड़ा किस फ़ैब्रिक का है।" } }
      ]
    }
  ],
  quiz: [
    { q: { en: "Which part of the machine holds the lower thread?", hi: "मशीन का कौन सा पार्ट नीचे का धागा रखता है?" },
      options: [
        { en: "Spool pin", hi: "स्पूल पिन" },
        { en: "Bobbin", hi: "बॉबिन" },
        { en: "Hand wheel", hi: "हैंड व्हील" }
      ], answer: 1, dg: "sewing-basics-machine",
      why: { en: "The bobbin sits under the throat plate and supplies the lower thread that locks with the needle thread.", hi: "बॉबिन थ्रोट प्लेट के नीचे रहता है और नीचे का धागा देता है जो सुई के धागे से लॉक होता है।" } },
    { q: { en: "Why should you raise the presser foot when threading the machine?", hi: "मशीन में धागा डालते समय प्रेसर फुट ऊपर क्यों करते हैं?" },
      options: [
        { en: "To save the needle", hi: "सुई बचाने के लिए" },
        { en: "So the tension discs open and the thread seats properly", hi: "ताकि टेंशन डिस्क खुलें और धागा ठीक से बैठे" },
        { en: "To turn the hand wheel", hi: "हैंड व्हील घुमाने के लिए" }
      ], answer: 1,
      why: { en: "With the foot down the tension discs stay closed, and the thread cannot go between them correctly.", hi: "फुट नीचे हो तो टेंशन डिस्क बंद रहती हैं और धागा उनके बीच सही से नहीं जाता।" } },
    { q: { en: "Which machine trims the edge and wraps it with looped threads?", hi: "कौन सी मशीन किनारा काटकर उसे लूप वाले धागों से लपेटती है?" },
      options: [
        { en: "Overlock (serger)", hi: "ओवरलॉक (सर्जर)" },
        { en: "Treadle machine", hi: "पैर वाली मशीन" },
        { en: "Embroidery hoop", hi: "कढ़ाई का फ्रेम" }
      ], answer: 0, src: "assets/img/sewing-basics/overlock-machine.jpg",
      why: { en: "An overlock cuts, sews and finishes the edge in a single pass.", hi: "ओवरलॉक एक ही बार में किनारा काटती, सिलती और फ़िनिश करती है।" } },
    { q: { en: "Which hand stitch is almost invisible and used to close a lining?", hi: "कौन सा हाथ का टांका लगभग अदृश्य होता है और लाइनिंग बंद करने में काम आता है?" },
      options: [
        { en: "Slip stitch", hi: "स्लिप स्टिच" },
        { en: "Cross stitch", hi: "क्रॉस स्टिच" },
        { en: "Basting", hi: "बेस्टिंग" }
      ], answer: 0, dg: "sewing-basics-stitch", args: { type: "slip" },
      why: { en: "A slip stitch travels inside the fold, so only tiny dots show on the outside.", hi: "स्लिप स्टिच फोल्ड के अंदर चलता है, इसलिए बाहर सिर्फ़ छोटे बिंदु दिखते हैं।" } },
    { q: { en: "Which seam hides all raw edges inside and suits chiffon?", hi: "कौन सी सीम सारे कच्चे किनारे अंदर छिपा लेती है और शिफॉन पर सूट करती है?" },
      options: [
        { en: "Plain seam", hi: "प्लेन सीम" },
        { en: "French seam", hi: "फ्रेंच सीम" },
        { en: "Zigzag finish", hi: "ज़िगज़ैग फ़िनिश" }
      ], answer: 1, dg: "sewing-basics-seam", args: { type: "french" },
      why: { en: "A French seam is a seam inside a seam, so no raw edge is left visible.", hi: "फ्रेंच सीम सीम के अंदर सीम है, इसलिए कोई कच्चा किनारा नहीं दिखता।" } },
    { q: { en: "Which seam is used on jeans because it is strong and flat?", hi: "जींस में कौन सी सीम इसलिए लगती है क्योंकि वो मज़बूत और सपाट होती है?" },
      options: [
        { en: "Flat-felled seam", hi: "फ्लैट-फेल्ड सीम" },
        { en: "Pinked seam", hi: "पिंक्ड सीम" },
        { en: "Basting", hi: "बेस्टिंग" }
      ], answer: 0, src: "assets/img/sewing-basics/flat-felled-seam.jpg",
      why: { en: "The flat-felled seam wraps one allowance around the other and topstitches it, so it is strong and has no raw edge.", hi: "फ्लैट-फेल्ड सीम एक अलाउंस को दूसरे के चारों ओर लपेटकर टॉपस्टिच करती है, इसलिए मज़बूत है और कच्चा किनारा नहीं रहता।" } },
    { q: { en: "In a box pleat, the two folds...", hi: "बॉक्स प्लीट में दोनों फोल्ड..." },
      options: [
        { en: "Face the same direction", hi: "एक ही दिशा में होते हैं" },
        { en: "Turn away from each other", hi: "एक-दूसरे से दूर मुड़ते हैं" },
        { en: "Meet in the middle", hi: "बीच में मिलते हैं" }
      ], answer: 1, dg: "sewing-basics-shape", args: { type: "box" },
      why: { en: "Knife pleats face one way; box pleats turn away from each other; inverted pleats meet in the middle.", hi: "नाइफ प्लीट एक दिशा में, बॉक्स प्लीट एक-दूसरे से दूर, और इनवर्टेड प्लीट बीच में मिलती है।" } },
    { q: { en: "How long should a buttonhole be?", hi: "बटनहोल कितना लंबा होना चाहिए?" },
      options: [
        { en: "Exactly the button's width", hi: "ठीक बटन की चौड़ाई जितना" },
        { en: "Button width plus its thickness", hi: "बटन की चौड़ाई + उसकी मोटाई" },
        { en: "Twice the button's width", hi: "बटन की चौड़ाई का दोगुना" }
      ], answer: 1, src: "assets/img/sewing-basics/buttonhole.jpg",
      why: { en: "The button has to pass through the hole, so it needs room for its thickness too.", hi: "बटन को छेद से निकलना है, इसलिए उसकी मोटाई जितनी जगह भी चाहिए।" } },
    { q: { en: "What is the difference between pressing and ironing?", hi: "प्रेसिंग और आयरनिंग में क्या फ़र्क है?" },
      options: [
        { en: "Pressing lifts and sets the iron down; ironing slides it", hi: "प्रेसिंग में आयरन उठाकर रखते हैं; आयरनिंग में घसीटते हैं" },
        { en: "Ironing uses steam, pressing never does", hi: "आयरनिंग में भाप होती है, प्रेसिंग में कभी नहीं" },
        { en: "There is no difference", hi: "कोई फ़र्क नहीं" }
      ], answer: 0, dg: "sewing-basics-press", args: { mode: "press" },
      why: { en: "Pressing shapes seams without stretching; ironing slides over the cloth to remove wrinkles.", hi: "प्रेसिंग सीम को बिना खींचे आकार देती है; आयरनिंग कपड़े पर सरककर सिलवटें हटाती है।" } },
    { q: { en: "A crossed-out triangle on a care label means...", hi: "केयर लेबल पर कटा हुआ त्रिकोण का मतलब है..." },
      options: [
        { en: "Do not bleach", hi: "ब्लीच मत करो" },
        { en: "Do not iron", hi: "आयरन मत करो" },
        { en: "Dry clean only", hi: "सिर्फ़ ड्राई क्लीन" }
      ], answer: 0, dg: "sewing-basics-care",
      why: { en: "The triangle stands for bleach; a cross over it means do not bleach.", hi: "त्रिकोण ब्लीच का निशान है; उस पर क्रॉस का मतलब है ब्लीच मत करो।" } }
  ]
});
