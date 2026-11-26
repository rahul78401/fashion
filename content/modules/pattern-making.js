/* Module 9 - Pattern Making Basics */
(function () {
  function L(t, lang) { return FD.tx(t, lang); }
  /* rotated text */
  function rt(x, y, deg, str, cls, size) {
    return '<text x="' + x + '" y="' + y + '" class="' + (cls || "tm") + '" text-anchor="middle" font-size="' + (size || 9) +
      '" transform="rotate(' + deg + " " + x + " " + y + ')">' + FD.esc(str) + "</text>";
  }
  function arrowHead(x, y, ang, cls) {
    /* small open arrow head pointing in direction ang (degrees) at x,y */
    var a = ang * Math.PI / 180, s = 5;
    var x1 = x - s * Math.cos(a - 0.5), y1 = y - s * Math.sin(a - 0.5);
    var x2 = x - s * Math.cos(a + 0.5), y2 = y - s * Math.sin(a + 0.5);
    return '<path d="M' + x1.toFixed(1) + " " + y1.toFixed(1) + " L" + x + " " + y + " L" + x2.toFixed(1) + " " + y2.toFixed(1) + '" class="' + (cls || "ln") + '"/>';
  }
  function dblArrow(x1, y1, x2, y2, cls) {
    var ang = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" class="' + (cls || "ln") + '"/>' +
      arrowHead(x2, y2, ang, cls) + arrowHead(x1, y1, ang + 180, cls);
  }

  /* ---------- 1. A labelled pattern piece (skirt front, cut on fold) ---------- */
  FD.diagram("pattern-making-piece", function (a, lang) {
    var hl = a.hl || "";
    function op(k) { return hl && hl !== k ? ' opacity="0.28"' : ""; }
    function cl(k) { return hl === k ? "ac" : "ln"; }
    var s = "";
    /* paper piece: cutting line */
    s += '<path d="M40 40 Q95 42 150 34 Q164 75 166 105 L180 250 Q110 258 40 258 Z" class="fl"' + (hl ? ' opacity="0.9"' : "") + "/>";
    /* seam allowance band highlight */
    if (hl === "sa") s += '<path d="M150 34 Q164 75 166 105 L180 250 L170 236 L157 105 Q155 80 142 44 Z" class="sf"/>';
    /* stitching line (dashed) */
    s += '<g' + op("sa") + '><path d="M40 50 Q92 51 142 44 Q155 80 157 105 L170 236 Q105 246 40 246" class="' + (hl === "sa" ? "ac" : "gd") + '"' + (hl === "sa" ? ' stroke-dasharray="4 3"' : "") + "/></g>";
    /* dart */
    s += '<g' + op("dart") + '><path d="M85 49 L92 108 L99 48" class="' + cl("dart") + '"/><circle cx="92" cy="108" r="1.8" class="' + (hl === "dart" ? "acf" : "tx") + '"/></g>';
    /* grainline */
    s += '<g' + op("grain") + ">" + dblArrow(146, 125, 146, 225, cl("grain")) + "</g>";
    /* notch on side seam at hip */
    s += '<g' + op("notch") + '><path d="M160 107 L171 104" class="' + cl("notch") + '" stroke-width="2.2"/></g>';
    /* place on fold bracket */
    s += '<g' + op("fold") + '><path d="M44 95 L58 95 L58 195 L44 195" class="' + cl("fold") + '"/>' + arrowHead(43, 95, 180, cl("fold")) + arrowHead(43, 195, 180, cl("fold")) + "</g>";
    /* centre front line */
    s += '<g' + op("cf") + '><line x1="40" y1="30" x2="40" y2="268" class="' + cl("cf") + '" stroke-dasharray="9 3 2 3"/></g>';
    /* piece name */
    s += FD.text(106, 150, L({ en: "SKIRT FRONT", hi: "स्कर्ट फ्रंट" }, lang), { cls: "tx", size: 9 });
    s += FD.text(106, 162, L({ en: "Cut 1 on fold", hi: "फोल्ड पर 1 काटें" }, lang), { cls: "tm", size: 8.5 });

    var lab = {
      grain: [rt(156, 175, 90, L({ en: "Grainline", hi: "ग्रेनलाइन" }, lang), hl === "grain" ? "acf" : "tm", 9)],
      dart: [FD.text(104, 85, L({ en: "Dart", hi: "डार्ट" }, lang), { cls: hl === "dart" ? "acf" : "tm", anchor: "start", size: 9 })],
      notch: [FD.text(176, 103, L({ en: "Notch", hi: "नॉच" }, lang), { cls: hl === "notch" ? "acf" : "tm", anchor: "start", size: 9 })],
      sa: ['<line x1="176" y1="190" x2="196" y2="196" class="gd"/>',
        FD.text(199, 194, L({ en: "Seam", hi: "सीम" }, lang), { cls: hl === "sa" ? "acf" : "tm", anchor: "start", size: 9 }),
        FD.text(199, 205, L({ en: "allowance", hi: "अलाउंस" }, lang), { cls: hl === "sa" ? "acf" : "tm", anchor: "start", size: 9 })],
      fold: [rt(66, 145, 90, L({ en: "Place on fold", hi: "फोल्ड पर रखें" }, lang), hl === "fold" ? "acf" : "tm", 8.5)],
      cf: [FD.text(40, 24, L({ en: "CF", hi: "CF" }, lang), { cls: hl === "cf" ? "acf" : "tm", size: 9 }),
        FD.text(30, 280, L({ en: "Centre front", hi: "सेंटर फ्रंट" }, lang), { cls: hl === "cf" ? "acf" : "tm", anchor: "start", size: 8.5 })]
    };
    Object.keys(lab).forEach(function (k) { if (!hl || hl === k) s += lab[k].join(""); });
    return FD.svg(250, 290, s);
  });

  /* ---------- 2. Button & buttonhole marks on a blouse front edge ---------- */
  FD.diagram("pattern-making-buttons", function (a, lang) {
    var s = '<path d="M30 20 L150 20 L150 270 L30 270 Z" class="fl"/>';
    s += '<line x1="60" y1="12" x2="60" y2="278" class="ac" stroke-dasharray="9 3 2 3"/>';
    s += FD.text(60, 10, "CF", { cls: "acf", size: 9 });
    [55, 110, 165, 220].forEach(function (y) {
      s += '<line x1="56" y1="' + y + '" x2="80" y2="' + y + '" class="ac" stroke-width="2.4"/>';
      s += '<path d="M56 ' + (y - 4) + " L56 " + (y + 4) + '" class="ac"/>';
      s += '<circle cx="60" cy="' + y + '" r="5" class="ln"/><path d="M57 ' + (y - 3) + " L63 " + (y + 3) + " M63 " + (y - 3) + " L57 " + (y + 3) + '" class="ln" stroke-width="1"/>';
    });
    s += rt(44, 150, 90, L({ en: "Extension", hi: "एक्सटेंशन" }, lang), "tm", 8.5);
    s += FD.text(86, 58, L({ en: "Buttonhole", hi: "बटनहोल" }, lang), { cls: "tm", anchor: "start", size: 8.5 });
    s += FD.text(72, 125, L({ en: "Button on CF", hi: "बटन CF पर" }, lang), { cls: "tm", anchor: "start", size: 8.5 });
    s += FD.text(90, 290, L({ en: "Blouse front edge", hi: "ब्लाउज़ का फ्रंट किनारा" }, lang), { cls: "tm", size: 8.5 });
    return FD.svg(180, 300, s);
  });

  /* ---------- 3. Basic blocks (slopers) ---------- */
  FD.diagram("pattern-making-blocks", function (a, lang) {
    var s = "";
    function g(x, y, sc, inner) { return '<g transform="translate(' + x + " " + y + ") scale(" + sc + ')">' + inner + "</g>"; }
    /* bodice front: CF on the left */
    var bf = '<path d="M0 20 Q20 18 24 0 L62 10 C55 35 58 50 72 56 L68 104 L0 104 Z" class="fl" stroke-width="1.3"/>' +
      '<path d="M30 104 L35 64 L40 104" class="ln" stroke-width="1.1"/>' + '<path d="M72 68 L46 62 L71 78" class="ln" stroke-width="1.1"/>';
    /* bodice back: CB on the right */
    var bb = '<path d="M72 8 Q56 8 50 0 L10 8 C16 33 13 50 0 56 L4 104 L72 104 Z" class="fl" stroke-width="1.3"/>' +
      '<path d="M32 104 L36 60 L40 104" class="ln" stroke-width="1.1"/><path d="M26 4 L29 22 L33 3" class="ln" stroke-width="1.1"/>';
    /* sleeve */
    var sl = '<path d="M0 38 C14 30 22 0 45 0 C68 0 76 30 90 38 L80 130 L10 130 Z" class="fl" stroke-width="1.3"/>' +
      '<line x1="45" y1="8" x2="45" y2="122" class="gd"/>';
    /* skirt front */
    var sk = '<path d="M0 2 Q30 3 58 0 Q68 25 70 40 L72 120 L0 120 Z" class="fl" stroke-width="1.3"/>' +
      '<path d="M26 3 L29 34 L32 3" class="ln" stroke-width="1.1"/><line x1="0" y1="40" x2="70" y2="40" class="gd"/>';
    s += g(14, 30, 0.95, bf) + g(96, 30, 0.95, bb) + g(178, 22, 0.78, sl) + g(262, 30, 0.85, sk);
    s += FD.text(48, 148, L({ en: "Bodice front", hi: "बॉडिस फ्रंट" }, lang), { cls: "tm", size: 9 });
    s += FD.text(130, 148, L({ en: "Bodice back", hi: "बॉडिस बैक" }, lang), { cls: "tm", size: 9 });
    s += FD.text(213, 148, L({ en: "Sleeve", hi: "स्लीव" }, lang), { cls: "tm", size: 9 });
    s += FD.text(293, 148, L({ en: "Skirt", hi: "स्कर्ट" }, lang), { cls: "tm", size: 9 });
    s += FD.text(170, 14, L({ en: "A basic block set (no style, no seam allowance)", hi: "बेसिक ब्लॉक सेट (बिना स्टाइल, बिना सीम अलाउंस)" }, lang), { cls: "tm", size: 9 });
    return FD.svg(340, 160, s);
  });

  /* ---------- 4. Fabric grain ---------- */
  FD.diagram("pattern-making-grain", function (a, lang) {
    var hl = a.hl || "";
    function op(k) { return hl && hl !== k ? ' opacity="0.25"' : ""; }
    var s = '<rect x="30" y="30" width="260" height="150" class="fl"/>';
    /* weave lines */
    var w = "";
    for (var x = 42; x < 290; x += 12) w += '<line x1="' + x + '" y1="38" x2="' + x + '" y2="172" class="gd" stroke-dasharray="1 0" opacity="0.35"/>';
    for (var y = 46; y < 172; y += 12) w += '<line x1="30" y1="' + y + '" x2="290" y2="' + y + '" class="gd" stroke-dasharray="1 0" opacity="0.35"/>';
    s += w;
    /* selvedges */
    s += '<rect x="30" y="30" width="260" height="8" class="sf"/><rect x="30" y="172" width="260" height="8" class="sf"/>';
    s += '<line x1="30" y1="38" x2="290" y2="38" class="ln" stroke-width="1"/><line x1="30" y1="172" x2="290" y2="172" class="ln" stroke-width="1"/>';
    for (var k = 34; k < 290; k += 6) { s += '<circle cx="' + k + '" cy="34" r="0.9" class="tm"/><circle cx="' + k + '" cy="176" r="0.9" class="tm"/>'; }
    s += FD.text(160, 22, L({ en: "Selvedge (finished edge)", hi: "सेल्वेज (बना हुआ किनारा)" }, lang), { cls: "tm", size: 9 });
    s += FD.text(160, 196, L({ en: "Selvedge", hi: "सेल्वेज" }, lang), { cls: "tm", size: 9 });
    s += rt(18, 105, -90, L({ en: "Cut edge", hi: "कटा किनारा" }, lang), "tm", 8.5);
    s += rt(302, 105, 90, L({ en: "Cut edge", hi: "कटा किनारा" }, lang), "tm", 8.5);
    /* lengthwise */
    s += '<g' + op("length") + ">" + dblArrow(60, 60, 260, 60, hl === "length" ? "ac" : "ln") +
      FD.text(160, 55, L({ en: "Lengthwise grain (warp)", hi: "लेंथवाइज़ ग्रेन (ताना)" }, lang), { cls: hl === "length" ? "acf" : "tx", size: 9.5 }) + "</g>";
    /* crosswise */
    s += '<g' + op("cross") + ">" + dblArrow(70, 75, 70, 162, hl === "cross" ? "ac" : "ln") +
      rt(80, 118, 90, L({ en: "Crosswise (weft)", hi: "क्रॉसवाइज़ (बाना)" }, lang), hl === "cross" ? "acf" : "tx", 9) + "</g>";
    /* bias */
    s += '<g' + op("bias") + ">" + dblArrow(150, 162, 230, 82, hl === "bias" ? "ac" : "ln") +
      rt(201, 129, -45, L({ en: "True bias 45°", hi: "ट्रू बायस 45°" }, lang), hl === "bias" ? "acf" : "tx", 9.5) + "</g>";
    return FD.svg(320, 205, s);
  });

  /* ---------- 5. Cutting layout on folded fabric ---------- */
  FD.diagram("pattern-making-layout", function (a, lang) {
    var s = "";
    /* folded fabric: fold on the left, both selvedges on the right */
    s += '<path d="M50 20 L250 20 L250 200 L50 200 Z" class="fl"/>';
    s += '<line x1="50" y1="20" x2="50" y2="200" class="ln" stroke-width="2.4"/>';
    s += '<rect x="244" y="20" width="6" height="180" class="sf"/>';
    s += rt(38, 110, -90, L({ en: "FOLD", hi: "फोल्ड" }, lang), "tx", 9);
    s += rt(264, 110, 90, L({ en: "Selvedges", hi: "सेल्वेज" }, lang), "tm", 9);
    /* skirt front on the fold */
    s += '<path d="M50 34 Q80 35 104 30 Q113 55 114 72 L122 170 Q86 175 50 175 Z" class="sf" stroke="currentColor" stroke-width="1.2"/>';
    s += '<path d="M54 80 L64 80 L64 140 L54 140" class="ac"/>' + arrowHead(52, 80, 180, "ac") + arrowHead(52, 140, 180, "ac");
    s += FD.text(88, 118, L({ en: "Front", hi: "फ्रंट" }, lang), { cls: "tx", size: 9 });
    /* skirt back with grainline */
    s += '<path d="M132 36 Q160 38 186 32 Q196 56 197 74 L206 172 L138 176 L132 36 Z" class="sf" stroke="currentColor" stroke-width="1.2"/>';
    s += dblArrow(168, 90, 168, 160, "ac");
    s += FD.text(168, 82, L({ en: "Back", hi: "बैक" }, lang), { cls: "tx", size: 9 });
    /* waistband */
    s += '<rect x="218" y="30" width="16" height="150" class="sf" stroke="currentColor" stroke-width="1.2"/>';
    s += dblArrow(226, 60, 226, 150, "ac");
    s += rt(212, 105, -90, L({ en: "Waistband", hi: "वेस्टबैंड" }, lang), "tm", 8);
    /* equal distance check */
    s += '<line x1="168" y1="100" x2="244" y2="100" class="gd"/><line x1="168" y1="150" x2="244" y2="150" class="gd"/>';
    s += FD.text(150, 214, L({ en: "Grainlines run parallel to the selvedge", hi: "ग्रेनलाइन सेल्वेज के पैरेलल रहती है" }, lang), { cls: "tm", size: 9 });
    return FD.svg(300, 222, s);
  });

  /* ---------- 6. Drafting an A-line skirt front, step by step ---------- */
  FD.diagram("pattern-making-skirt", function (a, lang) {
    var st = a.step || 6;
    function A(n) { return st === n ? "ac" : "ln"; }
    var s = "";
    /* scale: 3 px = 1 cm. CF x=50, waist y=30, hip y=90, hem y=210, side x=125 */
    if (st === 1) {
      s += '<rect x="50" y="30" width="75" height="180" class="ac"/>';
      s += '<line x1="50" y1="90" x2="125" y2="90" class="ac" stroke-dasharray="4 3"/>';
      s += FD.text(87, 22, L({ en: "Hip ÷ 4 + 1 = 25 cm", hi: "हिप ÷ 4 + 1 = 25 cm" }, lang), { cls: "acf", size: 9 });
      s += FD.text(132, 93, L({ en: "Hip line", hi: "हिप लाइन" }, lang), { cls: "tm", anchor: "start", size: 9 });
      s += FD.text(132, 63, "20 cm", { cls: "tm", anchor: "start", size: 9 });
      s += FD.text(132, 150, L({ en: "Length 60 cm", hi: "लंबाई 60 cm" }, lang), { cls: "tm", anchor: "start", size: 9 });
    } else {
      s += '<rect x="50" y="30" width="75" height="180" class="gd"/>';
      s += '<line x1="50" y1="90" x2="125" y2="90" class="gd"/>';
    }
    if (st >= 2) {
      /* waist curve + side seam to hip */
      s += '<path d="M50 30 Q82 31 110 26" class="' + A(2) + '"/>';
      s += '<path d="M110 26 Q122 55 125 90" class="' + A(2) + '"/>';
      if (st === 2) {
        s += '<path d="M110 30 L125 30" class="gd"/>';
        s += FD.text(80, 20, L({ en: "Waist ÷ 4 + 0.5 + dart", hi: "वेस्ट ÷ 4 + 0.5 + डार्ट" }, lang), { cls: "acf", size: 9 });
        s += FD.text(132, 33, L({ en: "raise 1.25 cm", hi: "1.25 cm ऊपर" }, lang), { cls: "tm", anchor: "start", size: 8.5 });
        s += FD.text(132, 60, L({ en: "Hip curve", hi: "हिप कर्व" }, lang), { cls: "tm", anchor: "start", size: 8.5 });
      }
    }
    if (st >= 3) {
      s += '<path d="M77 29.6 L80 60 L83 29.3" class="' + A(3) + '"/>';
      if (st === 3) {
        s += FD.text(87, 74, L({ en: "Dart: 2 cm wide,", hi: "डार्ट: 2 cm चौड़ा," }, lang), { cls: "acf", size: 8.5 });
        s += FD.text(87, 84, L({ en: "10 cm long", hi: "10 cm लंबा" }, lang), { cls: "acf", size: 8.5 });
      }
    }
    if (st >= 4) {
      s += '<path d="M125 90 L140 207" class="' + A(4) + '"/>';
      s += '<path d="M140 207 Q96 211 50 210" class="' + A(4) + '"/>';
      if (st === 4) {
        s += '<line x1="125" y1="210" x2="140" y2="210" class="gd"/>';
        s += FD.text(146, 205, L({ en: "+5 cm flare", hi: "+5 cm फ्लेयर" }, lang), { cls: "acf", anchor: "start", size: 8.5 });
        s += FD.text(146, 216, L({ en: "curve the hem", hi: "हेम को कर्व करो" }, lang), { cls: "tm", anchor: "start", size: 8.5 });
      }
    } else {
      s += '<line x1="125" y1="90" x2="125" y2="210" class="ln"/><line x1="50" y1="210" x2="125" y2="210" class="ln"/>';
    }
    /* centre front line */
    s += '<line x1="50" y1="30" x2="50" y2="210" class="ln"/>';
    if (st >= 5) {
      s += '<path d="M50 25.5 Q82 26.5 109 21.5 L115 21 Q127 55 130 90 L145.5 206 L146 218 Q96 223 50 222" class="' + A(5) + '"/>';
      if (st === 5) {
        s += FD.text(152, 120, L({ en: "1.5 cm seam", hi: "1.5 cm सीम" }, lang), { cls: "acf", anchor: "start", size: 8.5 });
        s += FD.text(152, 131, L({ en: "allowance", hi: "अलाउंस" }, lang), { cls: "acf", anchor: "start", size: 8.5 });
        s += FD.text(96, 234, L({ en: "4 cm hem allowance", hi: "4 cm हेम अलाउंस" }, lang), { cls: "acf", size: 8.5 });
        s += FD.text(152, 24, L({ en: "1.5 cm", hi: "1.5 cm" }, lang), { cls: "acf", anchor: "start", size: 8.5 });
      }
    }
    if (st >= 6) {
      s += dblArrow(108, 115, 108, 195, "ac");
      s += '<path d="M54 118 L64 118 L64 185 L54 185" class="ac"/>' + arrowHead(52, 118, 180, "ac") + arrowHead(52, 185, 180, "ac");
      s += '<path d="M125 89 L133 88" class="ac" stroke-width="2.2"/>';
      s += FD.text(86, 106, L({ en: "SKIRT FRONT", hi: "स्कर्ट फ्रंट" }, lang), { cls: "tx", size: 8.5 });
      s += FD.text(152, 120, L({ en: "Grainline, fold,", hi: "ग्रेनलाइन, फोल्ड," }, lang), { cls: "acf", anchor: "start", size: 8.5 });
      s += FD.text(152, 131, L({ en: "notch, label", hi: "नॉच, लेबल" }, lang), { cls: "acf", anchor: "start", size: 8.5 });
    }
    s += FD.text(44, 120, "CF", { cls: "tm", anchor: "end", size: 9 });
    return FD.svg(240, 240, s);
  });

  /* ---------- 7. Drafting tools drawn as simple line art ---------- */
  FD.diagram("pattern-making-tool", function (a, lang) {
    var t = a.tool || "lsquare", s = "", i;
    if (t === "lsquare") {
      s += '<path d="M20 20 L36 20 L36 104 L104 104 L104 120 L20 120 Z" class="fl"/>';
      for (i = 28; i < 104; i += 8) s += '<line x1="20" y1="' + i + '" x2="' + (i % 16 === 12 ? 30 : 26) + '" y2="' + i + '" class="ln" stroke-width="1"/>';
      for (i = 44; i < 104; i += 8) s += '<line x1="' + i + '" y1="120" x2="' + i + '" y2="' + (i % 16 === 12 ? 110 : 114) + '" class="ln" stroke-width="1"/>';
      s += '<path d="M44 96 L44 112 M36 96 L52 96" class="ac" stroke-width="1"/>';
      s += FD.text(70, 136, "90°", { cls: "acf", size: 9 });
    } else if (t === "hipcurve") {
      s += '<path d="M30 10 Q44 70 92 130 L104 122 Q58 64 46 8 Z" class="fl"/>';
      for (i = 0; i < 8; i++) { var q = 0.08 + i * 0.11, x = (1 - q) * (1 - q) * 38 + 2 * (1 - q) * q * 51 + q * q * 98, y = (1 - q) * (1 - q) * 9 + 2 * (1 - q) * q * 67 + q * q * 126; s += '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="1" class="tx"/>'; }
      s += FD.text(60, 138, L({ en: "long, gentle curve", hi: "लंबा, हल्का कर्व" }, lang), { cls: "tm", size: 8.5 });
    } else if (t === "notcher") {
      s += '<path d="M40 70 L28 128 L38 130 L52 74 Z" class="fl"/><path d="M80 70 L92 128 L82 130 L68 74 Z" class="fl"/>';
      s += '<path d="M42 70 Q42 50 54 44 L54 22 L66 22 L66 44 Q78 50 78 70 Z" class="fl"/>';
      s += '<rect x="56" y="14" width="8" height="10" class="acf"/><circle cx="60" cy="62" r="3" class="ln"/>';
      s += FD.text(60, 142, L({ en: "cuts a tiny slot", hi: "छोटा सा कट" }, lang), { cls: "acf", size: 8.5 });
    } else if (t === "weight") {
      s += '<rect x="10" y="40" width="100" height="80" class="fl"/>';
      s += '<path d="M24 54 Q60 50 92 56 L96 112 L24 112 Z" class="gd"/>';
      [[30, 60], [86, 62], [32, 104], [88, 104]].forEach(function (p) { s += '<ellipse cx="' + p[0] + '" cy="' + p[1] + '" rx="9" ry="6" class="sf" stroke="currentColor" stroke-width="1.3"/>'; });
      s += FD.text(60, 32, L({ en: "hold paper flat", hi: "पेपर को दबाकर रखें" }, lang), { cls: "tm", size: 8.5 });
    } else {
      s += '<rect x="14" y="20" width="92" height="100" class="fl"/>';
      for (var r = 0; r < 9; r++) for (var c = 0; c < 8; c++) {
        var px = 22 + c * 11, py = 28 + r * 11;
        s += (r % 3 === 0 && c % 3 === 0) ? '<path d="M' + (px - 2) + " " + py + " L" + (px + 2) + " " + py + " M" + px + " " + (py - 2) + " L" + px + " " + (py + 2) + '" class="ac" stroke-width="1"/>' : '<circle cx="' + px + '" cy="' + py + '" r="0.8" class="tm"/>';
      }
      s += '<path d="M106 20 Q116 22 116 34 L116 120 L106 120" class="ln"/>';
    }
    return FD.svg(120, 145, s);
  });

  /* ---------- 8. Measurements for a skirt ---------- */
  FD.diagram("pattern-making-measure", function (a, lang) {
    var s = "";
    s += FD.mirror(110, '<path d="M84 10 Q82 26 78 36 Q64 60 62 86 Q62 120 70 190" class="ln"/>');
    s += '<path d="M110 120 L110 190" class="gd"/>';
    s += '<ellipse cx="110" cy="36" rx="32" ry="5" class="ac"/>';
    s += '<ellipse cx="110" cy="86" rx="48" ry="7" class="ac"/>';
    s += '<path d="M40 36 L40 86" class="ln"/><path d="M36 36 L44 36 M36 86 L44 86" class="ln"/>';
    s += '<path d="M180 36 L180 170" class="ln"/><path d="M176 36 L184 36 M176 170 L184 170" class="ln"/>';
    s += FD.text(110, 26, L({ en: "Waist", hi: "वेस्ट" }, lang), { cls: "acf", size: 9.5 });
    s += FD.text(110, 106, L({ en: "Hip (fullest part)", hi: "हिप (सबसे चौड़ा हिस्सा)" }, lang), { cls: "acf", size: 9.5 });
    s += FD.text(36, 58, L({ en: "Waist", hi: "वेस्ट से" }, lang), { cls: "tm", anchor: "end", size: 8.5 });
    s += FD.text(36, 69, L({ en: "to hip", hi: "हिप तक" }, lang), { cls: "tm", anchor: "end", size: 8.5 });
    s += FD.text(186, 100, L({ en: "Skirt", hi: "स्कर्ट की" }, lang), { cls: "tm", anchor: "start", size: 8.5 });
    s += FD.text(186, 111, L({ en: "length", hi: "लंबाई" }, lang), { cls: "tm", anchor: "start", size: 8.5 });
    return FD.svg(230, 200, s);
  });
})();

FD.module({
  id: "pattern-making",
  num: 9,
  level: "intermediate",
  title: { en: "Pattern Making Basics", hi: "पैटर्न मेकिंग की बेसिक बातें" },
  tagline: { en: "From body measurements to paper pieces that become clothes", hi: "शरीर के नाप से पेपर के टुकड़े तक, जो आगे चलकर कपड़े बनते हैं" },
  cover: "assets/img/pattern-making/cover.jpg",
  learn: [
    { en: "What a pattern, a block and a toile are", hi: "पैटर्न, ब्लॉक और टॉयल क्या होते हैं" },
    { en: "The tools pattern makers use every day", hi: "पैटर्न मेकर रोज़ कौन से टूल्स इस्तेमाल करते हैं" },
    { en: "How to read every marking on a pattern piece", hi: "पैटर्न पीस पर बने हर निशान को कैसे पढ़ें" },
    { en: "Fabric grain, bias and a clean cutting layout", hi: "फ़ैब्रिक ग्रेन, बायस और सही कटिंग लेआउट" },
    { en: "How to draft your first A-line skirt, step by step", hi: "अपनी पहली A-लाइन स्कर्ट का ड्राफ्ट, एक-एक स्टेप में" }
  ],
  lessons: [
    {
      id: "what-is-a-pattern",
      title: { en: "What is a pattern?", hi: "पैटर्न क्या होता है?" },
      min: 6,
      blocks: [
        { t: "p", text: {
          en: "Before your darzi cuts a kurta, he first needs a plan for each piece. A **pattern** is that plan: a paper template of every piece of a garment. You trace it on fabric, cut, and sew the pieces together.",
          hi: "तुम्हारा दर्ज़ी कुर्ता काटने से पहले हर टुकड़े का प्लान बनाता है। **पैटर्न (Pattern)** यही प्लान है: कपड़े के हर टुकड़े का पेपर टेम्पलेट। इसे फ़ैब्रिक पर ट्रेस करो, काटो, और टुकड़ों को जोड़कर सिल दो।" } },
        { t: "img", src: "assets/img/pattern-making/tailor-patterns-hanging.jpg",
          caption: { en: "Paper pattern pieces hanging on a tailor's wall, ready to be used again and again.", hi: "दर्ज़ी की दीवार पर टंगे पेपर पैटर्न - बार-बार इस्तेमाल के लिए तैयार।" } },
        { t: "p", text: {
          en: "One garment is made of many pieces. A simple kurta has a front, a back, two sleeves and a neck facing. Each piece gets its own paper pattern.",
          hi: "एक कपड़ा कई टुकड़ों से बनता है। एक सिंपल कुर्ते में फ्रंट, बैक, दो स्लीव और नेक फेसिंग होती है। हर टुकड़े का अपना अलग पेपर पैटर्न बनता है।" } },
        { t: "h", text: { en: "Three ways to make a pattern", hi: "पैटर्न बनाने के तीन तरीके" } },
        { t: "cards", items: [
          { title: { en: "Flat pattern drafting", hi: "फ्लैट पैटर्न ड्राफ्टिंग" }, src: "assets/img/pattern-making/pattern-on-table.jpg",
            text: { en: "Draw the pattern on paper using body measurements, rulers and maths. Most tailors and factories work this way.", hi: "शरीर के नाप, रूलर और थोड़े हिसाब से पेपर पर पैटर्न बनाना। ज़्यादातर दर्ज़ी और फ़ैक्टरियाँ ऐसे ही काम करते हैं।" } },
          { title: { en: "Draping", hi: "ड्रेपिंग" }, src: "assets/img/pattern-making/draping-toile-bw.jpg",
            text: { en: "Pin fabric directly on a dress form and shape it like a sculptor. Then copy the shape onto paper.", hi: "फ़ैब्रिक को सीधे ड्रेस फ़ॉर्म पर पिन करके मूर्तिकार की तरह आकार देना। फिर उस आकार को पेपर पर उतारना।" } },
          { title: { en: "Commercial patterns", hi: "कमर्शियल पैटर्न" }, src: "assets/img/pattern-making/commercial-pattern-envelope.jpg",
            text: { en: "Ready-made printed patterns sold in envelopes or magazines, in standard sizes. You just pick your size and trace.", hi: "लिफ़ाफ़े या मैगज़ीन में बिकने वाले छपे हुए रेडीमेड पैटर्न, स्टैंडर्ड साइज़ में। बस अपना साइज़ चुनो और ट्रेस करो।" } }
        ] },
        { t: "h", text: { en: "Blocks (slopers): the starting point", hi: "ब्लॉक (स्लोपर): शुरुआत का पैटर्न" } },
        { t: "p", text: {
          en: "A **block** (also called a **sloper**) is a basic pattern that fits the body closely. It has no style details and usually no seam allowance. Designers trace the block and change it into new styles - this is called **pattern manipulation**.",
          hi: "**ब्लॉक (Block)**, जिसे **स्लोपर (Sloper)** भी कहते हैं, एक बेसिक पैटर्न है जो शरीर पर एकदम फ़िट बैठता है। इसमें कोई स्टाइल नहीं होता और आमतौर पर सीम अलाउंस भी नहीं। डिज़ाइनर ब्लॉक ट्रेस करके उसे नए स्टाइल में बदलते हैं - इसे **पैटर्न मैनिपुलेशन (Pattern manipulation)** कहते हैं।" } },
        { t: "dg", name: "pattern-making-blocks",
          caption: { en: "A basic block set: bodice front and back, sleeve and skirt. Almost every design starts from these.", hi: "बेसिक ब्लॉक सेट: बॉडिस फ्रंट, बैक, स्लीव और स्कर्ट। लगभग हर डिज़ाइन इन्हीं से शुरू होता है।" } },
        { t: "img", src: "assets/img/pattern-making/pattern-sheet.jpg",
          caption: { en: "A magazine pattern sheet: many pieces and sizes printed on top of each other. You trace only your own lines.", hi: "मैगज़ीन की पैटर्न शीट: कई टुकड़े और साइज़ एक-दूसरे के ऊपर छपे हैं। तुम सिर्फ़ अपने साइज़ की लाइन ट्रेस करती हो।" } },
        { t: "tip", kind: "remember", text: {
          en: "A pattern is always a little bigger than the body. This extra room is called **ease** - without it you could not sit, breathe or move.",
          hi: "पैटर्न हमेशा शरीर से थोड़ा बड़ा होता है। इस एक्स्ट्रा जगह को **ईज़ (Ease)** कहते हैं - इसके बिना तुम न बैठ पाओगी, न साँस ले पाओगी, न हिल पाओगी।" } },
        { t: "terms", items: [
          { en: "Pattern", hi: "पैटर्न", def: { en: "A paper template for each piece of a garment.", hi: "कपड़े के हर टुकड़े का पेपर टेम्पलेट।" } },
          { en: "Block / Sloper", hi: "ब्लॉक / स्लोपर", def: { en: "A basic close-fitting pattern with no style, used to make new designs.", hi: "बिना स्टाइल का बेसिक फ़िटेड पैटर्न, जिससे नए डिज़ाइन बनते हैं।" } },
          { en: "Flat pattern drafting", hi: "फ्लैट पैटर्न ड्राफ्टिंग", def: { en: "Making a pattern on paper from measurements.", hi: "नाप लेकर पेपर पर पैटर्न बनाना।" } },
          { en: "Pattern manipulation", hi: "पैटर्न मैनिपुलेशन", def: { en: "Changing a block into a new style, for example moving a dart.", hi: "ब्लॉक को नए स्टाइल में बदलना, जैसे डार्ट की जगह बदलना।" } },
          { en: "Ease", hi: "ईज़", def: { en: "Extra room added to body measurements so you can move.", hi: "शरीर के नाप में जोड़ी गई एक्स्ट्रा जगह ताकि तुम आराम से हिल सको।" } }
        ] },
        { t: "try", text: {
          en: "Turn an old kurta or top inside out. Count how many pieces it is made of, and sketch each piece as a flat shape.",
          hi: "एक पुराना कुर्ता या टॉप उल्टा करो। गिनो कि वो कितने टुकड़ों से बना है, और हर टुकड़े का फ्लैट आकार स्केच करो।" } }
      ]
    },
    {
      id: "tools",
      title: { en: "Pattern-making tools", hi: "पैटर्न मेकिंग के टूल्स" },
      min: 5,
      blocks: [
        { t: "p", text: {
          en: "Good patterns need clean, exact lines. Pattern makers use a small kit of rulers, curves and markers. You don't need everything on day one - start with paper, a long ruler, a French curve, a pencil and a tape.",
          hi: "अच्छे पैटर्न के लिए साफ़ और सही लाइनें चाहिए। पैटर्न मेकर रूलर, कर्व और मार्कर की एक छोटी किट रखते हैं। पहले दिन सब कुछ नहीं चाहिए - पेपर, लंबा रूलर, फ्रेंच कर्व, पेंसिल और इंचीटेप से शुरू करो।" } },
        { t: "gallery", cols: 3, items: [
          { dg: "pattern-making-tool", args: { tool: "paper" }, label: { en: "Pattern paper", hi: "पैटर्न पेपर" },
            note: { en: "Dot-and-cross paper or brown kraft paper", hi: "डॉट-एंड-क्रॉस पेपर या ब्राउन पेपर" } },
          { src: "assets/img/pattern-making/tailors-square.jpg", label: { en: "L-square", hi: "L-स्क्वेयर" },
            note: { en: "Draws perfect right angles", hi: "एकदम सही 90° कोना बनाता है" } },
          { src: "assets/img/pattern-making/french-curve.jpg", label: { en: "French curve", hi: "फ्रेंच कर्व" },
            note: { en: "For necklines and armholes", hi: "नेकलाइन और आर्महोल के लिए" } },
          { dg: "pattern-making-tool", args: { tool: "hipcurve" }, label: { en: "Hip curve", hi: "हिप कर्व" },
            note: { en: "For side seams, hips and hems", hi: "साइड सीम, हिप और हेम के लिए" } },
          { src: "assets/img/pattern-making/tracing-wheel.jpg", label: { en: "Tracing wheel", hi: "ट्रेसिंग व्हील" },
            note: { en: "Copies lines through paper", hi: "पेपर के आर-पार लाइन उतारता है" } },
          { dg: "pattern-making-tool", args: { tool: "notcher" }, label: { en: "Notcher", hi: "नॉचर" },
            note: { en: "Cuts notches in the paper edge", hi: "पेपर के किनारे पर नॉच काटता है" } },
          { src: "assets/img/pattern-making/awl.jpg", label: { en: "Awl", hi: "ऑल (सुआ)" },
            note: { en: "Punches dart points and drill holes", hi: "डार्ट पॉइंट और ड्रिल होल में छेद करता है" } },
          { dg: "pattern-making-tool", args: { tool: "weight" }, label: { en: "Pattern weights", hi: "पैटर्न वेट" },
            note: { en: "Hold paper still instead of pins", hi: "पिन की जगह पेपर को दबाकर रखते हैं" } },
          { src: "assets/img/pattern-making/tailors-chalk.jpg", label: { en: "Tailor's chalk", hi: "टेलर चॉक" },
            note: { en: "Marks fabric; brushes away later", hi: "कपड़े पर निशान; बाद में झड़ जाता है" } }
        ] },
        { t: "img", src: "assets/img/pattern-making/dress-form.jpg",
          caption: { en: "An adjustable dress form. Pattern makers use it to check fit and to drape.", hi: "एडजस्टेबल ड्रेस फ़ॉर्म। पैटर्न मेकर इस पर फ़िटिंग चेक करते हैं और ड्रेपिंग करते हैं।" } },
        { t: "cards", items: [
          { icon: "ruler", title: { en: "Measure & draw straight", hi: "नापना और सीधी लाइन" },
            text: { en: "Measuring tape, long metre scale, L-square.", hi: "इंचीटेप, लंबा मीटर स्केल, L-स्क्वेयर।" } },
          { icon: "shapes", title: { en: "Draw curves", hi: "कर्व बनाना" },
            text: { en: "French curve for small curves, hip curve for long ones.", hi: "छोटे कर्व के लिए फ्रेंच कर्व, लंबे कर्व के लिए हिप कर्व।" } },
          { icon: "pencil", title: { en: "Mark & copy", hi: "निशान और कॉपी" },
            text: { en: "Pencil, tailor's chalk, tracing wheel, awl, notcher.", hi: "पेंसिल, टेलर चॉक, ट्रेसिंग व्हील, ऑल, नॉचर।" } },
          { icon: "scissors", title: { en: "Cut", hi: "काटना" },
            text: { en: "Paper scissors for paper, fabric shears only for fabric.", hi: "पेपर के लिए पेपर वाली कैंची, फ़ैब्रिक के लिए सिर्फ़ फ़ैब्रिक कैंची।" } }
        ] },
        { t: "tip", kind: "mistake", text: {
          en: "Never cut paper with your fabric scissors. Paper makes the blades dull very fast. Tie a ribbon on your fabric scissors so nobody at home borrows them!",
          hi: "फ़ैब्रिक वाली कैंची से कभी पेपर मत काटना। पेपर से धार बहुत जल्दी खराब होती है। फ़ैब्रिक कैंची पर एक रिबन बाँध दो ताकि घर में कोई उसे उधार न ले!" } },
        { t: "terms", items: [
          { en: "L-square", hi: "L-स्क्वेयर", def: { en: "An L-shaped ruler for drawing right angles (90°).", hi: "L आकार का रूलर, सही 90° कोना बनाने के लिए।" } },
          { en: "French curve", hi: "फ्रेंच कर्व", def: { en: "A curved template for drawing necklines and armholes.", hi: "नेकलाइन और आर्महोल बनाने के लिए घुमावदार टेम्पलेट।" } },
          { en: "Hip curve", hi: "हिप कर्व", def: { en: "A long, gently curved ruler for hips, side seams and hems.", hi: "हिप, साइड सीम और हेम के लिए लंबा, हल्का घुमावदार रूलर।" } },
          { en: "Tracing wheel", hi: "ट्रेसिंग व्हील", def: { en: "A spiked wheel that copies lines onto paper or fabric.", hi: "नुकीले दाँतों वाला पहिया जो लाइन को पेपर या कपड़े पर उतारता है।" } },
          { en: "Notcher", hi: "नॉचर", def: { en: "A tool that cuts small slots (notches) in the pattern edge.", hi: "पैटर्न के किनारे पर छोटे कट (नॉच) लगाने वाला टूल।" } }
        ] },
        { t: "try", text: {
          en: "Make your own pattern weights: fill small cloth pouches with rice or dal and stitch them shut. Use them on your next pattern.",
          hi: "अपने पैटर्न वेट खुद बनाओ: छोटी कपड़े की थैलियों में चावल या दाल भरकर सिल दो। अगले पैटर्न पर इन्हें इस्तेमाल करो।" } }
      ]
    },
    {
      id: "pattern-markings",
      title: { en: "Pattern markings", hi: "पैटर्न के निशान" },
      min: 6,
      blocks: [
        { t: "p", text: {
          en: "Every pattern piece carries small symbols. They tell you how to place, cut and join the piece. Learn them once and you can read any pattern in the world.",
          hi: "हर पैटर्न पीस पर छोटे-छोटे निशान होते हैं। ये बताते हैं कि टुकड़ा कैसे रखना, काटना और जोड़ना है। एक बार सीख लो, फिर दुनिया का कोई भी पैटर्न पढ़ सकोगी।" } },
        { t: "dg", name: "pattern-making-piece",
          caption: { en: "A skirt front pattern with all its markings. The solid line is the cutting line; the dashed line inside is the stitching line.", hi: "स्कर्ट फ्रंट का पैटर्न सारे निशानों के साथ। बाहर की सीधी लाइन कटिंग लाइन है; अंदर की डैश वाली लाइन सिलाई की लाइन है।" } },
        { t: "gallery", cols: 3, items: [
          { dg: "pattern-making-piece", args: { hl: "grain" }, label: { en: "Grainline", hi: "ग्रेनलाइन" },
            note: { en: "Keep it parallel to the selvedge", hi: "इसे सेल्वेज के पैरेलल रखो" } },
          { dg: "pattern-making-piece", args: { hl: "notch" }, label: { en: "Notches", hi: "नॉच" },
            note: { en: "Match them when you join pieces", hi: "टुकड़े जोड़ते समय इन्हें मिलाओ" } },
          { dg: "pattern-making-piece", args: { hl: "dart" }, label: { en: "Dart", hi: "डार्ट" },
            note: { en: "A stitched V that shapes fabric", hi: "सिला हुआ V जो कपड़े को आकार देता है" } },
          { dg: "pattern-making-piece", args: { hl: "sa" }, label: { en: "Seam allowance", hi: "सीम अलाउंस" },
            note: { en: "Extra fabric between cut and stitch line", hi: "कटिंग और सिलाई लाइन के बीच का कपड़ा" } },
          { dg: "pattern-making-piece", args: { hl: "fold" }, label: { en: "Place on fold", hi: "फोल्ड पर रखें" },
            note: { en: "Cut as one mirrored piece", hi: "एक जुड़ा हुआ, दोनों तरफ़ बराबर टुकड़ा" } },
          { dg: "pattern-making-piece", args: { hl: "cf" }, label: { en: "Centre front", hi: "सेंटर फ्रंट" },
            note: { en: "The exact middle of the front", hi: "फ्रंट का बिल्कुल बीच" } }
        ] },
        { t: "dg", name: "pattern-making-buttons",
          caption: { en: "Button marks sit on the CF line. The extension is extra fabric beyond CF so the buttons can overlap.", hi: "बटन के निशान CF लाइन पर होते हैं। एक्सटेंशन CF से आगे का एक्स्ट्रा कपड़ा है ताकि बटन ओवरलैप हो सकें।" } },
        { t: "table", head: [{ en: "Seam", hi: "सीम" }, { en: "Usual allowance", hi: "आम अलाउंस" }],
          rows: [
            [{ en: "Side & shoulder seams", hi: "साइड और शोल्डर सीम" }, "1.5 cm"],
            [{ en: "Necklines & armholes", hi: "नेकलाइन और आर्महोल" }, "1 cm"],
            [{ en: "Hems", hi: "हेम" }, "3 - 4 cm"],
            [{ en: "Centre back with zip", hi: "ज़िप वाली सेंटर बैक" }, "2 cm"]
          ] },
        { t: "tip", kind: "fact", text: {
          en: "Many Indian tailors leave a wider allowance (about 2.5 cm) at the side seams of blouses and kurtas. This **margin** lets them loosen the garment later.",
          hi: "बहुत से भारतीय दर्ज़ी ब्लाउज़ और कुर्ते की साइड सीम में चौड़ा अलाउंस (करीब 2.5 cm) छोड़ते हैं। इस **मार्जिन** से बाद में कपड़ा ढीला किया जा सकता है।" } },
        { t: "terms", items: [
          { en: "Grainline", hi: "ग्रेनलाइन", def: { en: "An arrow showing how the piece must line up with the fabric grain.", hi: "तीर जो बताता है कि टुकड़ा फ़ैब्रिक के ग्रेन के साथ कैसे रखना है।" } },
          { en: "Notch", hi: "नॉच", def: { en: "A small mark on the edge that helps match two pieces.", hi: "किनारे पर छोटा निशान जो दो टुकड़ों को मिलाने में मदद करता है।" } },
          { en: "Seam allowance", hi: "सीम अलाउंस", def: { en: "The fabric between the cutting line and the stitching line.", hi: "कटिंग लाइन और सिलाई लाइन के बीच का कपड़ा।" } },
          { en: "Cut on fold", hi: "कट ऑन फोल्ड", def: { en: "Placing a pattern edge on the fabric fold to cut one symmetric piece.", hi: "पैटर्न का किनारा कपड़े की तह पर रखकर एक बराबर टुकड़ा काटना।" } },
          { en: "Centre front (CF)", hi: "सेंटर फ्रंट (CF)", def: { en: "The vertical middle line of the garment front.", hi: "कपड़े के फ्रंट की बीच वाली सीधी लाइन।" } }
        ] },
        { t: "try", text: {
          en: "Draw any simple pattern piece on paper. Add all 6 markings from this lesson and label them without looking.",
          hi: "पेपर पर कोई भी सिंपल पैटर्न पीस बनाओ। इस लेसन के सारे 6 निशान लगाओ और बिना देखे उनके नाम लिखो।" } }
      ]
    },
    {
      id: "grain-and-layout",
      title: { en: "Fabric grain & layout", hi: "फ़ैब्रिक ग्रेन और लेआउट" },
      min: 7,
      blocks: [
        { t: "p", text: {
          en: "Ever had a kurta whose side seam twisted to the front after washing? That happens when it is cut **off-grain**. Grain is the direction of the threads in woven fabric, and it decides how a garment hangs.",
          hi: "कभी किसी कुर्ते की साइड सीम धुलने के बाद घूमकर आगे आ गई? ऐसा तब होता है जब कपड़ा **ऑफ़-ग्रेन (Off-grain)** कटा हो। ग्रेन यानी बुने हुए कपड़े में धागों की दिशा, और यही तय करता है कि कपड़ा कैसे लटकेगा।" } },
        { t: "dg", name: "pattern-making-grain",
          caption: { en: "Selvedges run along both long edges. Lengthwise grain is parallel to them; crosswise grain goes across; true bias is at 45°.", hi: "सेल्वेज दोनों लंबे किनारों पर होते हैं। लेंथवाइज़ ग्रेन उनके पैरेलल है; क्रॉसवाइज़ ग्रेन आर-पार; ट्रू बायस 45° पर।" } },
        { t: "img", src: "assets/img/pattern-making/selvedge.jpg",
          caption: { en: "The selvedge is the tightly woven edge that does not fray. Mills often print their name on it.", hi: "सेल्वेज कसकर बुना हुआ किनारा है जो उधड़ता नहीं। मिलें अक्सर इस पर अपना नाम छापती हैं।" } },
        { t: "gallery", cols: 3, items: [
          { dg: "pattern-making-grain", args: { hl: "length" }, label: { en: "Lengthwise grain", hi: "लेंथवाइज़ ग्रेन" },
            note: { en: "Strongest, barely stretches", hi: "सबसे मज़बूत, लगभग नहीं खिंचता" } },
          { dg: "pattern-making-grain", args: { hl: "cross" }, label: { en: "Crosswise grain", hi: "क्रॉसवाइज़ ग्रेन" },
            note: { en: "Stretches a little", hi: "थोड़ा सा खिंचता है" } },
          { dg: "pattern-making-grain", args: { hl: "bias" }, label: { en: "True bias", hi: "ट्रू बायस" },
            note: { en: "Stretches the most, drapes softly", hi: "सबसे ज़्यादा खिंचता है, नरमी से लटकता है" } }
        ] },
        { t: "p", text: {
          en: "Fabric cut on the **bias** stretches and clings to the body's curves. In the 1920s-30s, the French designer Madeleine Vionnet made bias-cut gowns famous. Bias strips are also used for piping and neck binding.",
          hi: "**बायस (Bias)** पर कटा कपड़ा खिंचता है और शरीर के कर्व्स पर चिपककर बैठता है। 1920-30 के दशक में फ्रेंच डिज़ाइनर Madeleine Vionnet ने बायस-कट गाउन मशहूर किए। बायस पट्टियाँ पाइपिंग और गले की बाइंडिंग में भी लगती हैं।" } },
        { t: "gallery", items: [
          { src: "assets/img/pattern-making/bias-gown-1930s.jpg", label: { en: "1930s bias-cut gown", hi: "1930 का बायस-कट गाउन" } },
          { src: "assets/img/pattern-making/bias-dress.jpg", label: { en: "Bias dress on a form", hi: "फ़ॉर्म पर बायस ड्रेस" },
            note: { en: "See how it flows over the curves", hi: "देखो कैसे कर्व्स पर बहता है" } }
        ] },
        { t: "h", text: { en: "Layout and cutting, step by step", hi: "लेआउट और कटिंग, स्टेप बाय स्टेप" } },
        { t: "dg", name: "pattern-making-layout",
          caption: { en: "A cutting layout on folded fabric. The skirt front sits on the fold; every grainline is the same distance from the selvedge at both ends.", hi: "तह किए कपड़े पर कटिंग लेआउट। स्कर्ट फ्रंट फोल्ड पर है; हर ग्रेनलाइन दोनों सिरों पर सेल्वेज से बराबर दूरी पर है।" } },
        { t: "steps", items: [
          { title: { en: "Prepare the fabric", hi: "कपड़ा तैयार करो" },
            text: { en: "Pre-wash cotton so it shrinks now, not after sewing. Press out all creases.", hi: "कॉटन को पहले धो लो ताकि वो अभी सिकुड़े, सिलाई के बाद नहीं। सारी सिलवटें प्रेस करके निकालो।" } },
          { title: { en: "Fold", hi: "तह करो" },
            text: { en: "Fold right sides together, selvedges matching, so you cut two mirror pieces at once.", hi: "सीधी तरफ़ अंदर करके तह करो, सेल्वेज मिलाकर, ताकि एक बार में दो बराबर टुकड़े कटें।" } },
          { title: { en: "Place the pieces", hi: "टुकड़े रखो" },
            text: { en: "Big pieces first. Measure from each end of the grainline to the selvedge - both must be equal.", hi: "पहले बड़े टुकड़े। ग्रेनलाइन के दोनों सिरों से सेल्वेज तक नापो - दोनों बराबर होने चाहिए।" } },
          { title: { en: "Pin or weight, then mark", hi: "पिन या वेट लगाओ, फिर निशान" },
            text: { en: "Mark darts, notches and seam lines with chalk or a tracing wheel.", hi: "डार्ट, नॉच और सीम लाइन चॉक या ट्रेसिंग व्हील से मार्क करो।" } },
          { title: { en: "Cut", hi: "काटो" }, src: "assets/img/pattern-making/cutting-fabric.jpg",
            text: { en: "Use long, smooth strokes. Keep the fabric flat on the table and move around it, not the fabric.", hi: "लंबे, स्मूद कट लगाओ। कपड़ा टेबल पर सपाट रखो और खुद उसके चारों ओर घूमो, कपड़े को मत घुमाओ।" } }
        ] },
        { t: "img", src: "assets/img/pattern-making/cutting-machine.jpg",
          caption: { en: "In factories, many layers are cut together with an electric cutting machine.", hi: "फ़ैक्टरी में कई परतें एक साथ बिजली की कटिंग मशीन से कटती हैं।" } },
        { t: "tip", kind: "mistake", text: {
          en: "Velvet, corduroy and one-way prints have a direction (called **nap**). Place all pieces facing the same way, or one panel will look a different shade.",
          hi: "वेलवेट, कॉरडरॉय और एक-तरफ़ा प्रिंट की एक दिशा होती है (इसे **नैप (Nap)** कहते हैं)। सारे टुकड़े एक ही दिशा में रखो, वरना एक पैनल का रंग अलग दिखेगा।" } },
        { t: "terms", items: [
          { en: "Selvedge", hi: "सेल्वेज", def: { en: "The finished edge of woven fabric that does not fray.", hi: "बुने कपड़े का बना हुआ किनारा जो उधड़ता नहीं।" } },
          { en: "Lengthwise grain", hi: "लेंथवाइज़ ग्रेन", def: { en: "Warp threads, running parallel to the selvedge.", hi: "ताने के धागे, जो सेल्वेज के पैरेलल चलते हैं।" } },
          { en: "Crosswise grain", hi: "क्रॉसवाइज़ ग्रेन", def: { en: "Weft threads, running from selvedge to selvedge.", hi: "बाने के धागे, जो एक सेल्वेज से दूसरे तक जाते हैं।" } },
          { en: "Bias", hi: "बायस", def: { en: "Any diagonal direction; true bias is exactly 45°.", hi: "कोई भी तिरछी दिशा; ट्रू बायस ठीक 45° पर होता है।" } },
          { en: "Nap", hi: "नैप", def: { en: "A fabric surface or print that looks different from each direction.", hi: "कपड़े की सतह या प्रिंट जो हर दिशा से अलग दिखे।" } }
        ] },
        { t: "try", text: {
          en: "Take a cotton scrap. Pull it gently along the length, across, and on the diagonal. Write down which direction stretches the most.",
          hi: "कॉटन का एक टुकड़ा लो। उसे लंबाई में, चौड़ाई में और तिरछा हल्के से खींचो। लिखो कि किस दिशा में सबसे ज़्यादा खिंचता है।" } }
      ]
    },
    {
      id: "draft-a-line-skirt",
      title: { en: "Draft a simple A-line skirt", hi: "सिंपल A-लाइन स्कर्ट ड्राफ्ट करो" },
      min: 8,
      blocks: [
        { t: "p", text: {
          en: "An **A-line skirt** fits at the waist and flares gently to the hem, like the letter A. It has only a few pieces, so it is the perfect first draft. We will draft the front; the back is almost the same.",
          hi: "**A-लाइन स्कर्ट** कमर पर फ़िट होती है और हेम तक हल्की सी फैलती है, बिल्कुल A अक्षर की तरह। इसमें बस कुछ ही टुकड़े हैं, इसलिए ये पहले ड्राफ्ट के लिए एकदम सही है। हम फ्रंट बनाएँगे; बैक लगभग वैसा ही होता है।" } },
        { t: "dg", name: "pattern-making-measure",
          caption: { en: "The four measurements you need: waist, hip, waist-to-hip and skirt length.", hi: "चार नाप चाहिए: वेस्ट, हिप, वेस्ट से हिप तक, और स्कर्ट की लंबाई।" } },
        { t: "table", head: [{ en: "Measurement", hi: "नाप" }, { en: "Example", hi: "उदाहरण" }, { en: "We use", hi: "हम लेंगे" }],
          rows: [
            [{ en: "Waist", hi: "वेस्ट" }, "70 cm", { en: "70 ÷ 4 = 17.5 (+0.5 ease)", hi: "70 ÷ 4 = 17.5 (+0.5 ईज़)" }],
            [{ en: "Hip", hi: "हिप" }, "96 cm", { en: "96 ÷ 4 = 24 (+1 ease)", hi: "96 ÷ 4 = 24 (+1 ईज़)" }],
            [{ en: "Waist to hip", hi: "वेस्ट से हिप" }, "20 cm", { en: "hip line", hi: "हिप लाइन" }],
            [{ en: "Skirt length", hi: "स्कर्ट लंबाई" }, "60 cm", { en: "rectangle height", hi: "आयत की ऊँचाई" }]
          ] },
        { t: "steps", items: [
          { title: { en: "Draw the rectangle", hi: "आयत बनाओ" }, dg: "pattern-making-skirt", args: { step: 1 },
            text: { en: "Width = hip ÷ 4 + 1 cm ease (25 cm). Height = skirt length (60 cm). The left edge is CF. Draw the hip line 20 cm below the waist.", hi: "चौड़ाई = हिप ÷ 4 + 1 cm ईज़ (25 cm)। ऊँचाई = स्कर्ट की लंबाई (60 cm)। बायाँ किनारा CF है। कमर से 20 cm नीचे हिप लाइन बनाओ।" } },
          { title: { en: "Shape the waist", hi: "कमर का आकार दो" }, dg: "pattern-making-skirt", args: { step: 2 },
            text: { en: "Mark waist ÷ 4 + 0.5 cm ease + 2 cm dart = 20 cm from CF. Raise this point 1.25 cm. Curve the waist, then curve down to the hip with a hip curve.", hi: "CF से वेस्ट ÷ 4 + 0.5 cm ईज़ + 2 cm डार्ट = 20 cm मार्क करो। इस पॉइंट को 1.25 cm ऊपर उठाओ। कमर को कर्व करो, फिर हिप कर्व से हिप तक कर्व लाइन बनाओ।" } },
          { title: { en: "Add the dart", hi: "डार्ट बनाओ" }, dg: "pattern-making-skirt", args: { step: 3 },
            text: { en: "In the middle of the waist, draw a dart 2 cm wide and about 10 cm long. It takes in the extra fabric between waist and hip.", hi: "कमर के बीच में 2 cm चौड़ा और करीब 10 cm लंबा डार्ट बनाओ। ये कमर और हिप के बीच का एक्स्ट्रा कपड़ा कम करता है।" } },
          { title: { en: "Flare the side seam", hi: "साइड सीम को फैलाओ" }, dg: "pattern-making-skirt", args: { step: 4 },
            text: { en: "At the hem, go out 5 cm. Join this point to the hip. Raise the hem slightly at the side and curve it, so the side seam meets the hem at a right angle.", hi: "हेम पर 5 cm बाहर जाओ। इस पॉइंट को हिप से जोड़ो। साइड पर हेम को थोड़ा ऊपर उठाकर कर्व करो, ताकि साइड सीम और हेम 90° पर मिलें।" } },
          { title: { en: "Add seam allowance", hi: "सीम अलाउंस जोड़ो" }, dg: "pattern-making-skirt", args: { step: 5 },
            text: { en: "Add 1.5 cm at the waist and side seam and 4 cm at the hem. No allowance on CF - it goes on the fold.", hi: "कमर और साइड सीम पर 1.5 cm, हेम पर 4 cm जोड़ो। CF पर अलाउंस नहीं - वो फोल्ड पर जाएगा।" } },
          { title: { en: "Finish the pattern", hi: "पैटर्न पूरा करो" }, dg: "pattern-making-skirt", args: { step: 6 },
            text: { en: "Add the grainline, the fold sign, a notch at the hip, and write the piece name and 'Cut 1 on fold'.", hi: "ग्रेनलाइन, फोल्ड का निशान, हिप पर नॉच लगाओ, और टुकड़े का नाम व 'फोल्ड पर 1 काटें' लिखो।" } }
        ] },
        { t: "p", text: {
          en: "Draft the **back** the same way. Make the back dart a little longer (about 12-13 cm) and add 2 cm at centre back for the zip seam. Finally, cut a **waistband**: waist + 3 cm overlap long, and about 8 cm wide (folded in half).",
          hi: "**बैक** भी इसी तरह बनाओ। बैक का डार्ट थोड़ा लंबा रखो (करीब 12-13 cm) और ज़िप की सीम के लिए सेंटर बैक पर 2 cm जोड़ो। आखिर में **वेस्टबैंड** काटो: लंबाई वेस्ट + 3 cm ओवरलैप, और चौड़ाई करीब 8 cm (आधा मोड़कर)।" } },
        { t: "tip", kind: "tip", text: {
          en: "Always sew a quick test version in cheap cotton first. Fix the fit on this **toile**, copy the changes to paper, and only then cut your good fabric.",
          hi: "हमेशा पहले सस्ते कॉटन में एक टेस्ट वर्ज़न सिलो। इस **टॉयल (Toile)** पर फ़िटिंग ठीक करो, बदलाव पेपर पर उतारो, और फिर ही अपना अच्छा कपड़ा काटो।" } },
        { t: "terms", items: [
          { en: "A-line", hi: "A-लाइन", def: { en: "A shape fitted at the top that flares gently towards the hem.", hi: "ऊपर से फ़िट और नीचे हेम तक हल्का फैलता आकार।" } },
          { en: "Hip line", hi: "हिप लाइन", def: { en: "A guide line at the fullest part of the hips.", hi: "हिप के सबसे चौड़े हिस्से पर गाइड लाइन।" } },
          { en: "Flare", hi: "फ्लेयर", def: { en: "Extra width added towards the hem so a garment spreads out.", hi: "हेम की तरफ़ जोड़ी गई एक्स्ट्रा चौड़ाई जिससे कपड़ा फैलता है।" } },
          { en: "Hem allowance", hi: "हेम अलाउंस", def: { en: "Extra length at the bottom that is turned up to finish the hem.", hi: "नीचे की एक्स्ट्रा लंबाई जो मोड़कर हेम बनाई जाती है।" } },
          { en: "Waistband", hi: "वेस्टबैंड", def: { en: "A strip of fabric that finishes the waist of a skirt or trousers.", hi: "कपड़े की पट्टी जो स्कर्ट या पैंट की कमर को फ़िनिश करती है।" } }
        ] },
        { t: "try", text: {
          en: "Draft this skirt front at quarter scale (divide every number by 4) in your notebook. Then try it with your own measurements on full-size paper.",
          hi: "इस स्कर्ट फ्रंट को अपनी नोटबुक में चौथाई स्केल पर बनाओ (हर नंबर को 4 से भाग दो)। फिर अपने नाप से पूरे साइज़ के पेपर पर बनाकर देखो।" } }
      ]
    },
    {
      id: "draping",
      title: { en: "Draping on the dress form", hi: "ड्रेस फ़ॉर्म पर ड्रेपिंग" },
      min: 6,
      blocks: [
        { t: "p", text: {
          en: "**Draping** means shaping fabric directly on a dress form, pinning and cutting as you go. You see the design in 3D from the very first minute. It is how many couture gowns are born.",
          hi: "**ड्रेपिंग (Draping)** यानी फ़ैब्रिक को सीधे ड्रेस फ़ॉर्म पर आकार देना, साथ-साथ पिन करना और काटना। पहले ही मिनट से डिज़ाइन 3D में दिखता है। बहुत से कूटूर गाउन ऐसे ही बनते हैं।" } },
        { t: "img", src: "assets/img/pattern-making/draped-dresses-forms.jpg",
          caption: { en: "Dresses being draped on forms: folds and gathers are pinned in place to study the shape.", hi: "फ़ॉर्म पर ड्रेप होती ड्रेस: आकार देखने के लिए फोल्ड और गैदर पिन से टिकाए गए हैं।" } },
        { t: "cards", items: [
          { title: { en: "Muslin / markin", hi: "मलमल / मारकीन" }, src: "assets/img/pattern-making/muslin-fabric.jpg",
            text: { en: "Cheap plain cotton used for draping and test garments. In Indian colleges it is often called markin cloth.", hi: "ड्रेपिंग और टेस्ट कपड़ों के लिए सस्ता सादा कॉटन। भारतीय कॉलेजों में इसे अक्सर मारकीन कपड़ा कहते हैं।" } },
          { title: { en: "Toile", hi: "टॉयल" }, src: "assets/img/pattern-making/toile-bodice.jpg",
            text: { en: "A test version of a garment, made in muslin to check fit and shape before the real fabric.", hi: "कपड़े का टेस्ट वर्ज़न, मलमल में बना, ताकि असली कपड़े से पहले फ़िटिंग और आकार चेक हो सके।" } }
        ] },
        { t: "img", src: "assets/img/pattern-making/dress-forms-style-tape.jpg",
          caption: { en: "Dress forms marked with style tape: thin lines for centre front, bust, waist and the seams you plan.", hi: "स्टाइल टेप लगे ड्रेस फ़ॉर्म: सेंटर फ्रंट, बस्ट, वेस्ट और प्लान की गई सीम की पतली लाइनें।" } },
        { t: "steps", items: [
          { title: { en: "Prepare the form", hi: "फ़ॉर्म तैयार करो" }, text: { en: "Mark CF, CB, bust, waist and hip with style tape.", hi: "स्टाइल टेप से CF, CB, बस्ट, वेस्ट और हिप मार्क करो।" } },
          { title: { en: "Prepare the muslin", hi: "मलमल तैयार करो" }, text: { en: "Tear it straight, press it, and draw the grainlines in pencil.", hi: "सीधा फाड़ो, प्रेस करो, और पेंसिल से ग्रेनलाइन बनाओ।" } },
          { title: { en: "Pin and smooth", hi: "पिन करो और स्मूद करो" }, text: { en: "Match the muslin's CF to the form's CF. Smooth the fabric outwards and pin; fold the extra into darts or tucks.", hi: "मलमल का CF फ़ॉर्म के CF से मिलाओ। कपड़े को बाहर की ओर स्मूद करके पिन करो; एक्स्ट्रा कपड़े को डार्ट या टक में मोड़ो।" } },
          { title: { en: "Mark", hi: "निशान लगाओ" }, text: { en: "Mark seams, darts and the neckline with pencil or chalk dots while it is still on the form.", hi: "फ़ॉर्म पर रहते-रहते पेंसिल या चॉक के डॉट से सीम, डार्ट और नेकलाइन मार्क करो।" } },
          { title: { en: "True and transfer", hi: "ट्रू करो और उतारो" }, text: { en: "Take it off, lay it flat, and connect the dots with rulers and curves (truing). Add seam allowance and copy it onto paper.", hi: "उतारकर सपाट रखो, और रूलर व कर्व से डॉट्स जोड़ो (ट्रूइंग)। सीम अलाउंस जोड़कर पेपर पर कॉपी करो।" } }
        ] },
        { t: "compare", items: [
          { title: { en: "Flat drafting", hi: "फ्लैट ड्राफ्टिंग" }, src: "assets/img/pattern-making/pattern-envelope-back.jpg",
            points: [
              { en: "Exact, based on numbers", hi: "सही नाप, नंबरों पर आधारित" },
              { en: "Fast for basic, fitted styles", hi: "बेसिक, फ़िटेड स्टाइल के लिए तेज़" },
              { en: "Easy to grade into sizes", hi: "अलग साइज़ में ग्रेड करना आसान" }
            ] },
          { title: { en: "Draping", hi: "ड्रेपिंग" },
            points: [
              { en: "You see the design in 3D", hi: "डिज़ाइन 3D में दिखता है" },
              { en: "Best for cowls, bias and soft folds", hi: "काउल, बायस और नरम फोल्ड के लिए सबसे अच्छा" },
              { en: "Needs a dress form and practice", hi: "ड्रेस फ़ॉर्म और प्रैक्टिस चाहिए" }
            ] }
        ] },
        { t: "tip", kind: "remember", text: {
          en: "Designers often mix both methods: draft a block on paper, then drape the tricky parts, like a cowl neck or an asymmetric drape.",
          hi: "डिज़ाइनर अक्सर दोनों तरीके मिलाते हैं: पेपर पर ब्लॉक बनाते हैं, फिर मुश्किल हिस्से, जैसे काउल नेक या तिरछा ड्रेप, फ़ॉर्म पर ड्रेप करते हैं।" } },
        { t: "terms", items: [
          { en: "Draping", hi: "ड्रेपिंग", def: { en: "Creating a pattern by pinning fabric on a dress form.", hi: "ड्रेस फ़ॉर्म पर कपड़ा पिन करके पैटर्न बनाना।" } },
          { en: "Muslin", hi: "मलमल", def: { en: "Cheap plain cotton used for draping and toiles.", hi: "ड्रेपिंग और टॉयल के लिए सस्ता सादा कॉटन।" } },
          { en: "Toile", hi: "टॉयल", def: { en: "A test garment made to check fit before cutting the real fabric.", hi: "असली कपड़ा काटने से पहले फ़िटिंग चेक करने के लिए बना टेस्ट कपड़ा।" } },
          { en: "Style tape", hi: "स्टाइल टेप", def: { en: "Thin tape pinned on a dress form to mark guide lines and seams.", hi: "ड्रेस फ़ॉर्म पर गाइड लाइन और सीम मार्क करने वाला पतला टेप।" } },
          { en: "Truing", hi: "ट्रूइंग", def: { en: "Smoothing and correcting the marked lines after draping.", hi: "ड्रेपिंग के बाद मार्क की गई लाइनों को स्मूद और ठीक करना।" } }
        ] },
        { t: "try", text: {
          en: "No dress form? Use a pillow tied with a belt, or a friend. Drape an old dupatta into a cowl neck with safety pins and take a photo.",
          hi: "ड्रेस फ़ॉर्म नहीं है? बेल्ट से बंधा तकिया या किसी दोस्त को इस्तेमाल करो। एक पुराने दुपट्टे को सेफ़्टी पिन से काउल नेक में ड्रेप करो और फ़ोटो लो।" } }
      ]
    }
  ],
  quiz: [
    { q: { en: "What is a block (sloper)?", hi: "ब्लॉक (स्लोपर) क्या है?" },
      options: [
        { en: "A finished designer garment", hi: "एक तैयार डिज़ाइनर कपड़ा" },
        { en: "A basic close-fitting pattern with no style details", hi: "बिना स्टाइल वाला बेसिक फ़िटेड पैटर्न" },
        { en: "A wooden printing block", hi: "लकड़ी का छपाई वाला ठप्पा" }
      ], answer: 1, dg: "pattern-making-blocks",
      why: { en: "A block is the basic pattern that designers trace and change into new styles.", hi: "ब्लॉक वो बेसिक पैटर्न है जिसे डिज़ाइनर ट्रेस करके नए स्टाइल में बदलते हैं।" } },
    { q: { en: "Which tool helps you draw a smooth neckline or armhole?", hi: "स्मूद नेकलाइन या आर्महोल बनाने में कौन सा टूल मदद करता है?" },
      options: [
        { en: "L-square", hi: "L-स्क्वेयर" },
        { en: "French curve", hi: "फ्रेंच कर्व" },
        { en: "Notcher", hi: "नॉचर" }
      ], answer: 1, src: "assets/img/pattern-making/french-curve.jpg",
      why: { en: "The French curve has small, tight curves made for necklines and armholes.", hi: "फ्रेंच कर्व में छोटे, गहरे कर्व होते हैं जो नेकलाइन और आर्महोल के लिए बने हैं।" } },
    { q: { en: "The grainline arrow on a pattern should be placed...", hi: "पैटर्न पर ग्रेनलाइन का तीर कैसे रखना चाहिए?" },
      options: [
        { en: "Parallel to the selvedge", hi: "सेल्वेज के पैरेलल" },
        { en: "At 45° to the selvedge", hi: "सेल्वेज से 45° पर" },
        { en: "Anywhere, it does not matter", hi: "कहीं भी, फ़र्क नहीं पड़ता" }
      ], answer: 0,
      why: { en: "Measure both ends of the arrow to the selvedge - they must be equal, so the piece is on-grain.", hi: "तीर के दोनों सिरों से सेल्वेज तक नापो - बराबर होने चाहिए, तभी टुकड़ा ऑन-ग्रेन होगा।" } },
    { q: { en: "What do notches help you do?", hi: "नॉच किस काम आते हैं?" },
      options: [
        { en: "Match pieces correctly when sewing", hi: "सिलाई के समय टुकड़ों को सही मिलाना" },
        { en: "Decorate the hem", hi: "हेम को सजाना" },
        { en: "Show where to press", hi: "बताना कि कहाँ प्रेस करें" }
      ], answer: 0, dg: "pattern-making-piece", args: { hl: "notch" },
      why: { en: "Notches on two pieces line up, so you join the right edges at the right points.", hi: "दो टुकड़ों के नॉच एक-दूसरे से मिलते हैं, जिससे सही किनारे सही जगह जुड़ते हैं।" } },
    { q: { en: "Which direction of woven fabric stretches the most?", hi: "बुने कपड़े में किस दिशा में सबसे ज़्यादा खिंचाव होता है?" },
      options: [
        { en: "Lengthwise grain", hi: "लेंथवाइज़ ग्रेन" },
        { en: "Crosswise grain", hi: "क्रॉसवाइज़ ग्रेन" },
        { en: "True bias", hi: "ट्रू बायस" }
      ], answer: 2, src: "assets/img/pattern-making/bias-gown-1930s.jpg",
      why: { en: "The true bias (45°) stretches the most - that is why bias-cut dresses cling and drape.", hi: "ट्रू बायस (45°) सबसे ज़्यादा खिंचता है - इसलिए बायस-कट ड्रेस शरीर पर बैठती और लहराती हैं।" } },
    { q: { en: "'Place on fold' means...", hi: "'फोल्ड पर रखें' का मतलब है..." },
      options: [
        { en: "Fold the pattern paper in half before storing", hi: "रखने से पहले पैटर्न पेपर आधा मोड़ो" },
        { en: "Put that edge on the fabric fold, so you cut one symmetric piece", hi: "वो किनारा कपड़े की तह पर रखो, ताकि एक बराबर टुकड़ा कटे" },
        { en: "Add a pleat at that edge", hi: "उस किनारे पर प्लीट डालो" }
      ], answer: 1, dg: "pattern-making-piece", args: { hl: "fold" },
      why: { en: "The fold edge has no seam - when you open the fabric, you get one whole, mirrored piece.", hi: "फोल्ड वाले किनारे पर सीम नहीं होती - कपड़ा खोलने पर एक पूरा, दोनों तरफ़ बराबर टुकड़ा मिलता है।" } },
    { q: { en: "In our skirt draft, why do we add 1 cm to hip ÷ 4?", hi: "हमारे स्कर्ट ड्राफ्ट में हिप ÷ 4 में 1 cm क्यों जोड़ा?" },
      options: [
        { en: "For ease, so you can move and sit", hi: "ईज़ के लिए, ताकि तुम हिल और बैठ सको" },
        { en: "For the hem", hi: "हेम के लिए" },
        { en: "For the zip", hi: "ज़िप के लिए" }
      ], answer: 0,
      why: { en: "Ease is extra room. 1 cm on each quarter gives 4 cm around the hips.", hi: "ईज़ यानी एक्स्ट्रा जगह। हर चौथाई पर 1 cm से हिप के चारों ओर 4 cm मिलते हैं।" } },
    { q: { en: "What is a toile?", hi: "टॉयल क्या है?" },
      options: [
        { en: "A test garment in cheap cotton to check fit", hi: "फ़िटिंग चेक करने के लिए सस्ते कॉटन में बना टेस्ट कपड़ा" },
        { en: "A type of silk", hi: "एक तरह का सिल्क" },
        { en: "A pattern-making ruler", hi: "पैटर्न बनाने का रूलर" }
      ], answer: 0, src: "assets/img/pattern-making/toile-bodice.jpg",
      why: { en: "You fix the fit on the toile first, then cut your real fabric with confidence.", hi: "पहले टॉयल पर फ़िटिंग ठीक करो, फिर भरोसे के साथ असली कपड़ा काटो।" } },
    { q: { en: "Why should you pre-wash cotton before cutting?", hi: "काटने से पहले कॉटन को धोना क्यों चाहिए?" },
      options: [
        { en: "To make it brighter", hi: "रंग चमकाने के लिए" },
        { en: "So it shrinks now, not after you sew it", hi: "ताकि वो अभी सिकुड़े, सिलाई के बाद नहीं" },
        { en: "To find the bias", hi: "बायस ढूंढने के लिए" }
      ], answer: 1,
      why: { en: "Cotton can shrink in the first wash. Pre-washing keeps your finished garment the right size.", hi: "कॉटन पहली धुलाई में सिकुड़ सकता है। पहले धोने से तैयार कपड़ा सही साइज़ का रहता है।" } }
  ]
});
