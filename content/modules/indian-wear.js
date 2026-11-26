/* Module 11 - Indian Wear */
(function () {
  function P(d, cls) { return '<path d="' + d + '" class="' + (cls || "ln") + '"/>'; }
  function L(x1, y1, x2, y2, cls) { return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" class="' + (cls || "ln") + '"/>'; }
  function C(x, y, r, cls) { return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" class="' + (cls || "ln") + '"/>'; }
  function T(x, y, t, lang, o) { return FD.text(x, y, FD.tx(t, lang), o || { cls: "tm", size: 9 }); }
  /* leader line from a point on the drawing to a label */
  function lab(px, py, tx, ty, t, lang, anchor) {
    return C(px, py, 1.8, "acf") + L(px, py, tx + (anchor === "end" ? 3 : -3), ty - 3, "gd") +
      T(tx, ty, t, lang, { cls: "tx", size: 10, anchor: anchor || "start" });
  }

  /* ---------- Saree laid flat: body, borders, pallu, blouse piece ---------- */
  FD.diagram("indian-wear-saree-flat", function (a, lang) {
    var s = "";
    var x0 = 34, x1 = 310, y0 = 34, y1 = 104;
    s += '<rect x="' + x0 + '" y="' + y0 + '" width="' + (x1 - x0) + '" height="' + (y1 - y0) + '" rx="2" class="fl"/>';
    // small buttis (dots) on the body
    for (var c = 0; c < 9; c++) for (var r = 0; r < 3; r++) s += C(52 + c * 21 + (r % 2) * 10, 52 + r * 17, 1.6, "acf");
    // pallu panel
    s += '<rect x="236" y="' + y0 + '" width="54" height="' + (y1 - y0) + '" class="sf"/>';
    for (var k = 0; k < 4; k++) s += L(244 + k * 12, y0 + 8, 244 + k * 12, y1 - 8, "ac");
    // borders top and bottom
    s += '<rect x="' + x0 + '" y="' + y0 + '" width="256" height="7" class="acf"/>';
    s += '<rect x="' + x0 + '" y="' + (y1 - 7) + '" width="256" height="7" class="acf"/>';
    // blouse piece
    s += L(290, y0, 290, y1, "gd");
    s += '<rect x="292" y="' + (y0 + 2) + '" width="16" height="' + (y1 - y0 - 4) + '" class="sf"/>';
    // labels
    s += T(130, 24, { en: "Border (both edges)", hi: "बॉर्डर (दोनों किनारे)" }, lang, { cls: "tx", size: 10 });
    s += L(130, 27, 130, 34, "gd");
    s += T(130, 76, { en: "Body", hi: "बॉडी" }, lang, { cls: "tx", size: 11 });
    s += T(263, 24, { en: "Pallu", hi: "पल्लू" }, lang, { cls: "tx", size: 10 });
    s += T(300, 124, { en: "Blouse piece", hi: "ब्लाउज़ पीस" }, lang, { cls: "tm", size: 8, anchor: "end" });
    s += L(300, 104, 300, 115, "gd");
    // length arrow
    s += L(x0, 140, x1, 140, "ac") + P("M" + (x0 + 6) + " 136 L" + x0 + " 140 L" + (x0 + 6) + " 144", "ac") + P("M" + (x1 - 6) + " 136 L" + x1 + " 140 L" + (x1 - 6) + " 144", "ac");
    s += T((x0 + x1) / 2, 156, { en: "Length: about 5.5 to 6 yards (5 to 5.5 m) · Nauvari: 9 yards", hi: "लंबाई: लगभग 5.5 से 6 गज़ (5 से 5.5 मीटर) · नौवारी: 9 गज़" }, lang, { cls: "tm", size: 9 });
    // width arrow
    s += L(18, y0, 18, y1, "ac") + P("M14 " + (y0 + 6) + " L18 " + y0 + " L22 " + (y0 + 6), "ac") + P("M14 " + (y1 - 6) + " L18 " + y1 + " L22 " + (y1 - 6), "ac");
    s += '<text x="11" y="' + ((y0 + y1) / 2) + '" class="tm" font-size="8" text-anchor="middle" transform="rotate(-90 11 ' + ((y0 + y1) / 2) + ')">' + FD.esc(FD.tx({ en: "≈ 1.1 m wide", hi: "≈ 1.1 मीटर चौड़ी" }, lang)) + "</text>";
    return FD.svg(320, 166, s);
  });

  /* ---------- Parts of a Nivi saree on a figure ---------- */
  FD.diagram("indian-wear-saree-parts", function (a, lang) {
    var s = "", g = "";
    // pallu hanging behind the left shoulder (drawn first, it is behind)
    s += P("M128 60 L146 62 L158 168 L138 170 Z", "sf");
    s += P("M140 160 L157 158 L158 168 L138 170 Z", "acf");
    // head & neck
    s += C(110, 30, 15, "ln") + P("M104 45 L104 54 M116 45 L116 54", "ln");
    // arms
    s += P("M86 62 L76 70 L72 112 L74 150", "ln") + P("M134 62 L144 70 L148 112 L146 150", "ln");
    // blouse
    s += P("M86 58 Q110 52 134 58 L137 98 L83 98 Z", "fl");
    s += P("M86 58 L75 66 L78 84 L87 80 Z", "fl") + P("M134 58 L145 66 L142 84 L133 80 Z", "fl");
    // midriff
    s += P("M84 98 L83 108 M136 98 L137 108", "ln");
    // saree skirt (body over petticoat)
    s += P("M82 108 L138 108 L152 284 L68 284 Z", "fl");
    // petticoat shown as a dashed line inside
    s += P("M86 112 L72 280", "gd");
    // pleats fanning from the waist
    for (var i = 0; i < 6; i++) s += L(98 + i * 4, 110, 90 + i * 7, 284, "ln");
    // border at the hem
    s += P("M69 272 L151 272 L152 284 L68 284 Z", "acf");
    // pallu across the chest, over the left shoulder
    s += P("M82 104 L84 124 L146 70 L134 56 Z", "sf");
    s += P("M84 124 L146 70 M82 104 L134 56", "ac");
    // labels (the figure is moved 50 to the right)
    g += lab(198, 118, 222, 122, { en: "Pallu", hi: "पल्लू" }, lang);
    g += lab(168, 86, 222, 80, { en: "Pallu (front)", hi: "सामने का पल्लू" }, lang);
    g += lab(142, 70, 100, 64, { en: "Blouse", hi: "ब्लाउज़" }, lang, "end");
    g += lab(134, 140, 100, 140, { en: "Petticoat (inside)", hi: "पेटीकोट (अंदर)" }, lang, "end");
    g += lab(158, 220, 100, 214, { en: "Pleats", hi: "प्लीट्स (चुन्नटें)" }, lang, "end");
    g += lab(130, 250, 100, 256, { en: "Body", hi: "बॉडी" }, lang, "end");
    g += lab(196, 278, 222, 266, { en: "Border", hi: "बॉर्डर" }, lang);
    g += lab(160, 108, 222, 102, { en: "Tucked at waist", hi: "कमर पर खोंसी" }, lang);
    return FD.svg(310, 292, '<g transform="translate(50 0)">' + s + "</g>" + g);
  });

  /* ---------- Lehenga skirt shapes ---------- */
  FD.diagram("indian-wear-lehenga", function (a, lang) {
    var t = a.type || "aline", s = "";
    var band = '<rect x="40" y="12" width="40" height="8" rx="2" class="acf"/>';
    if (t === "aline") {
      s += P("M40 20 L80 20 L102 124 Q60 132 18 124 Z", "fl") + P("M21 114 Q60 122 99 114", "ac");
      s += P("M52 22 L44 126 M68 22 L76 126", "gd");
    } else if (t === "flared") {
      s += P("M40 20 L80 20 Q96 70 114 122 Q60 138 6 122 Q24 70 40 20 Z", "fl");
      s += P("M10 112 Q60 128 110 112", "ac");
      [[46, 22, 22, 124], [53, 22, 42, 130], [60, 22, 60, 131], [67, 22, 78, 130], [74, 22, 98, 124]].forEach(function (q) { s += P("M" + q[0] + " " + q[1] + " Q" + ((q[0] + q[2]) / 2) + " 80 " + q[2] + " " + q[3], "gd"); });
    } else if (t === "kalidar") {
      s += P("M40 20 L80 20 Q96 70 114 122 Q60 138 6 122 Q24 70 40 20 Z", "fl");
      for (var i = 0; i < 9; i++) { var xt = 41 + i * 4.75, xb = 9 + i * 12.75; s += L(xt, 20, xb, 123 + Math.sin(i / 8 * Math.PI) * 8, "ln"); }
      s += P("M10 112 Q60 128 110 112", "ac");
    } else if (t === "mermaid") {
      s += P("M40 20 L80 20 Q85 52 78 86 Q80 100 106 126 Q60 136 14 126 Q40 100 42 86 Q35 52 40 20 Z", "fl");
      s += P("M42 86 Q60 92 78 86", "ac") + P("M18 120 Q60 130 102 120", "ac");
    } else if (t === "sharara") {
      s += FD.mirror(60, P("M60 20 L80 20 L106 126 L64 126 L60 44", "fl"));
      s += P("M60 44 L56 126 M60 44 L64 126", "ln") + P("M70 30 L84 124 M50 30 L36 124", "gd");
      band = '<rect x="40" y="12" width="40" height="8" rx="2" class="acf"/>';
    } else if (t === "gharara") {
      var leg = P("M60 20 L80 20 L82 78 L108 126 L64 126 L64 78 L60 46", "fl");
      s += FD.mirror(60, leg);
      s += FD.mirror(60, P("M64 74 L82 74 L83 84 L64 84 Z", "acf"));
      s += FD.mirror(60, P("M72 86 L76 124 M86 90 L96 124", "gd"));
    }
    return FD.svg(120, 140, s + band);
  });

  /* ---------- Kurta shapes (flat sketches) ---------- */
  FD.diagram("indian-wear-kurta", function (a, lang) {
    var t = a.type || "straight", s = "";
    var top = "M60 24 L67 12 L82 16 L100 64 L91 67 L80 36";
    var half, extra = "";
    if (t === "straight") { half = top + " L82 120 L60 120"; extra = L(82, 120, 82, 98, "ac"); }
    else if (t === "aline") { half = top + " L94 126 Q77 129 60 129"; extra = L(94, 126, 89, 104, "ac"); }
    else if (t === "anarkali") {
      half = top + " L78 50 Q96 100 112 148 Q86 154 60 154";
      extra = P("M62 50 L78 50", "ac") + P("M70 52 Q76 100 84 152 M76 52 Q90 100 100 150", "gd");
      top = "M60 24 L67 12 L82 16 L98 92 L89 94 L80 36";
      half = top + " L78 50 Q96 100 112 148 Q86 154 60 154";
    }
    else if (t === "kaftan") { half = "M60 26 L67 12 L114 20 L114 64 L90 74 L90 124 L60 124"; extra = L(60, 26, 60, 44, "ln"); }
    else if (t === "angrakha") {
      top = "M60 24 L67 12 L82 16 L98 92 L89 94 L80 36";
      half = top + " L80 56 Q92 96 102 136 Q81 140 60 140";
      extra = "";
    }
    else if (t === "highlow") {
      s += FD.mirror(60, P("M80 60 L86 112 Q82 140 60 144", "fl"));
      half = top + " L84 104 Q74 112 60 112";
    }
    else if (t === "slit") { half = top + " L82 126 L60 126"; }
    s += FD.mirror(60, P(half, "fl"));
    if (extra) s += FD.mirror(60, extra);
    // neckline
    if (t !== "kaftan") s += P("M53 12 Q60 22 67 12", "ln");
    if (t === "straight" || t === "aline" || t === "highlow" || t === "slit") s += L(60, 24, 60, 40, "ln");
    if (t === "kaftan") s += P("M53 12 Q60 26 67 12", "ln") + P("M60 26 L60 44", "ln");
    if (t === "slit") s += P("M60 126 L60 92", "ac") + P("M56 126 L60 92 L64 126", "ln");
    if (t === "angrakha") {
      s += P("M53 12 Q58 40 80 58", "ac");
      s += C(80, 60, 1.6, "acf") + P("M80 60 L86 72 M80 60 L90 68", "ln");
      s += P("M66 64 Q80 100 88 136 M58 66 Q60 100 64 138", "gd");
    }
    return FD.svg(120, 160, s);
  });

  /* ---------- Bottoms ---------- */
  FD.diagram("indian-wear-bottom", function (a, lang) {
    var t = a.type || "salwar", s = "", half = "", det = "";
    if (t === "salwar") {
      half = "M50 12 L70 12 Q88 60 70 120 L70 132 L56 132 L56 120 Q58 98 50 88";
      det = P("M58 120 L70 120", "ac") + P("M60 30 Q70 70 62 116", "gd");
    } else if (t === "patiala") {
      half = "M50 12 L70 12 Q98 60 72 120 L72 132 L57 132 L57 120 Q58 104 50 96";
      det = P("M58 120 L72 120", "ac") + P("M54 14 Q72 50 66 116 M60 14 Q82 52 70 114 M66 14 Q90 56 72 112", "gd");
    } else if (t === "churidar") {
      half = "M50 12 L68 12 L64 60 L60 106 L59 134 L52 134 L52 106 L52 60 L50 50";
      for (var i = 0; i < 6; i++) det += P("M52 " + (108 + i * 4) + " Q56 " + (111 + i * 4) + " " + (60 - i * 0.1) + " " + (107 + i * 4), "ln");
    } else if (t === "palazzo") {
      half = "M50 12 L68 12 L86 134 L53 134 L50 54";
      det = P("M60 20 L66 130 M66 18 L78 130", "gd");
    } else if (t === "dhoti") {
      half = "M50 12 L68 12 Q84 50 72 96 L66 126 L66 132 L56 132 L56 126 Q54 116 50 108";
      det = P("M56 128 L66 128", "ac");
      s += P("M40 16 Q50 64 60 16 M36 16 Q50 88 64 16 M44 16 Q50 44 56 16", "gd");
    } else if (t === "cigarette") {
      half = "M50 12 L67 12 L65 60 L63 122 L54 122 L52 60 L50 48";
      det = P("M62 14 L62 28", "ln");
    }
    s = FD.mirror(50, P(half, "fl")) + FD.mirror(50, det) + s;
    s += '<rect x="30" y="8" width="40" height="6" rx="2" class="acf"/>';
    return FD.svg(100, 140, s);
  });

  /* ---------- Blouse: necklines, backs, sleeves, cuts ---------- */
  FD.diagram("indian-wear-blouse", function (a, lang) {
    var neck = a.neck || "round", sl = a.sleeve || "short", s = "";
    var nk = {
      round: "M60 26 Q70 26 72 12",
      boat: "M60 18 Q74 18 82 15",
      high: "M60 9 Q66 9 68 8",
      sweetheart: "M60 36 Q63 26 68 28 Q75 30 74 18 L72 13",
      deep: "M60 34 L71 12",
      deepback: "M60 62 Q76 62 75 13",
      keyhole: "M60 9 Q66 9 68 8",
      dori: "M60 56 L74 56 L74 13",
      square: "M60 30 L72 30 L72 13"
    }[neck] || "M60 26 Q70 26 72 12";
    var nx = { boat: 82, high: 68, keyhole: 68, sweetheart: 72, deep: 71, round: 72, deepback: 75, dori: 74, square: 72 }[neck] || 72;
    var shoulder = " L" + nx + " " + (neck === "boat" ? 15 : 12) + " L90 18";
    var sleeve = {
      none: " L86 34",
      cap: " L95 28 L88 34",
      short: " L102 44 L93 50 L86 36",
      elbow: " L108 66 L98 70 L86 38",
      full: " L114 98 L105 100 L86 40",
      puff: " Q108 22 104 44 L94 48 L86 36"
    }[sl] || " L102 44 L93 50 L86 36";
    var half = nk + shoulder + sleeve + " L86 82 L60 86";
    s += FD.mirror(60, P(half, "fl"));
    if (sl === "puff") s += FD.mirror(60, P("M92 24 Q98 34 96 46", "gd"));
    if (neck === "high" || neck === "keyhole") s += P("M52 8 L52 14 Q60 16 68 14 L68 8", "ac");
    if (neck === "keyhole") s += P("M60 16 Q52 26 60 38 Q68 26 60 16 Z", "ln") + C(60, 12, 1.5, "acf");
    if (neck === "dori") {
      s += P("M53 30 Q60 34 67 30", "ac") + P("M60 32 L54 58 M60 32 L66 58", "ln");
      s += C(54, 61, 3, "acf") + C(66, 61, 3, "acf");
    }
    if (a.cut === "princess") s += FD.mirror(60, P("M84 30 Q70 46 70 84", "ac"));
    if (a.cut === "katori") s += FD.mirror(60, P("M62 62 Q68 44 84 50 M62 62 Q74 68 84 64", "ac"));
    if (a.view === "back") s += L(60, neck === "deepback" || neck === "dori" ? 62 : 40, 60, 86, "gd");
    return FD.svg(120, 112, s);
  });

  /* ---------- Men's garments (flat sketches) ---------- */
  FD.diagram("indian-wear-mens", function (a, lang) {
    var t = a.type || "kurta", s = "";
    var top = "M60 14 L66 10 L84 14 L106 98 L97 100 L82 36";
    var collar = P("M53 7 L53 13 Q60 16 67 13 L67 7", "ac");
    var btn = function (y0, y1, step) { var b = ""; for (var y = y0; y <= y1; y += step) b += C(60, y, 1.4, "acf"); return b; };
    if (t === "kurta") {
      s += FD.mirror(60, P(top + " L84 134 L60 134", "fl"));
      s += FD.mirror(60, L(84, 134, 84, 110, "ac"));
      s += collar + L(60, 14, 60, 44, "ln") + btn(20, 40, 8);
    } else if (t === "sherwani") {
      s += FD.mirror(60, P(top + " L80 60 L90 154 L60 156", "fl"));
      s += collar + L(60, 14, 60, 156, "ln") + btn(18, 96, 9);
      s += FD.mirror(60, P("M72 58 L86 58", "gd"));
    } else if (t === "achkan") {
      s += FD.mirror(60, P(top + " L78 62 L84 140 L60 142", "fl"));
      s += collar + P("M53 12 Q58 40 64 60 L64 140", "ln") + C(56, 24, 1.4, "acf") + C(60, 40, 1.4, "acf") + C(63, 56, 1.4, "acf");
    } else if (t === "bandhgala") {
      s += FD.mirror(60, P(top + " L82 92 L60 96", "fl"));
      s += collar + L(60, 14, 60, 96, "ln") + btn(18, 88, 10);
      s += FD.mirror(60, P("M68 74 L78 74", "gd"));
    } else if (t === "nehru") {
      s += FD.mirror(60, P("M60 14 L66 10 L78 14 Q74 26 82 38 L84 96 L60 100", "fl"));
      s += collar + L(60, 14, 60, 100, "ln") + btn(18, 88, 10);
      s += FD.mirror(60, P("M66 44 L74 44 M68 78 L78 78", "gd"));
    }
    return FD.svg(120, 160, s);
  });

  /* ---------- Dupatta drapes ---------- */
  FD.diagram("indian-wear-dupatta", function (a, lang) {
    var st = a.style || "classic", s = "";
    var head = C(50, 16, 9, "ln") + P("M46 25 L46 30 M54 25 L54 30", "ln");
    var body = P("M32 32 Q50 28 68 32 L66 70 L62 124 L38 124 L34 70 Z", "fl") + P("M32 32 L26 40 L22 90 M68 32 L74 40 L78 90", "ln");
    if (st === "head") {
      s += body;
      s += P("M36 24 Q36 0 50 1 Q64 0 64 24 L72 38 L76 120 L64 120 L62 46 Q60 32 58 22 Q58 9 50 8 Q42 9 42 22 Q40 32 38 46 L36 120 L24 120 L28 38 Z", "sf");
      s += P("M36 24 Q36 0 50 1 Q64 0 64 24", "ac") + C(50, 16, 8, "ln");
      return FD.svg(100, 130, s);
    }
    s += head + body;
    if (st === "classic") {
      s += P("M30 32 Q50 66 70 32 L64 30 Q50 52 36 30 Z", "sf") + P("M30 32 Q50 66 70 32", "ac");
      s += P("M31 33 L28 44 M69 33 L72 44", "gd");
    } else if (st === "one-shoulder") {
      s += P("M58 30 L70 32 L72 124 L58 124 Z", "sf") + P("M58 30 L58 124 M70 32 L72 124", "ac") + C(64, 33, 2, "acf");
    } else if (st === "both") {
      s += P("M32 30 L42 30 L44 124 L32 124 Z", "sf") + P("M58 30 L68 30 L68 124 L56 124 Z", "sf");
      s += P("M42 30 L44 124 M58 30 L56 124", "ac");
    } else if (st === "diagonal") {
      s += P("M70 32 L60 28 L32 90 L36 104 Z", "sf") + P("M60 28 L32 90 M70 32 L36 104", "ac");
    }
    return FD.svg(100, 130, s);
  });
})();

FD.module({
  id: "indian-wear",
  num: 11,
  level: "basic",
  title: { en: "Indian Wear", hi: "भारतीय पहनावा" },
  tagline: {
    en: "Sarees, lehengas, kurtas and sherwanis: the shapes every Indian designer must know",
    hi: "साड़ी, लहंगा, कुर्ता और शेरवानी: वो आकार जो हर भारतीय डिज़ाइनर को पता होने चाहिए"
  },
  cover: "assets/img/indian-wear/cover.jpg",
  learn: [
    { en: "Name every part of a saree and tell 5 regional drapes apart", hi: "साड़ी के हर हिस्से का नाम बताना और 5 क्षेत्रीय ड्रेप पहचानना" },
    { en: "Know lehenga, kurta and bottom shapes by their real names", hi: "लहंगे, कुर्ते और बॉटम के आकारों को उनके असली नाम से जानना" },
    { en: "Talk like a pro about blouse necklines, backs and cuts", hi: "ब्लाउज़ की नेकलाइन, बैक और कट पर प्रो की तरह बात करना" },
    { en: "Tell a sherwani from an achkan, a bandhgala and a Nehru jacket", hi: "शेरवानी, अचकन, बंदगला और नेहरू जैकेट में फ़र्क़ करना" },
    { en: "Take a visual tour of regional dress across India", hi: "पूरे भारत के क्षेत्रीय पहनावे की तस्वीरों के साथ सैर करना" }
  ],
  lessons: [
    {
      id: "saree",
      title: { en: "The Saree: Parts and Drapes", hi: "साड़ी: हिस्से और ड्रेप" },
      min: 7,
      blocks: [
        { t: "p", text: {
          en: "A **saree** is one long piece of unstitched cloth. No buttons, no zips, no sewing. Yet the same cloth can be worn in dozens of ways, and each region of India has its own style.",
          hi: "**साड़ी (Saree)** बिना सिला हुआ एक लंबा कपड़ा है। न बटन, न ज़िप, न सिलाई। फिर भी एक ही कपड़े को दर्जनों तरीकों से पहना जाता है, और भारत के हर इलाके का अपना स्टाइल है।" } },
        { t: "img", src: "assets/img/indian-wear/saree-drying.jpg",
          caption: { en: "Opened out to dry, you can see how long a saree really is.", hi: "सूखने के लिए फैलाई साड़ी में दिखता है कि ये असल में कितनी लंबी होती है।" } },
        { t: "dg", name: "indian-wear-saree-flat",
          caption: { en: "A saree laid flat. The pallu end is the most decorated part.", hi: "फैलाकर रखी साड़ी। पल्लू वाला सिरा सबसे ज़्यादा सजा होता है।" } },
        { t: "p", text: {
          en: "Most sarees are **5.5 to 6 yards** long (about 5 to 5.5 metres) and a little over 1 metre wide. The Maharashtrian **nauvari** is 9 yards. Nau means nine!",
          hi: "ज़्यादातर साड़ियां **5.5 से 6 गज़** लंबी (लगभग 5 से 5.5 मीटर) और 1 मीटर से थोड़ी ज़्यादा चौड़ी होती हैं। महाराष्ट्र की **नौवारी (Nauvari)** 9 गज़ की होती है। नौ यानी नौ!" } },
        { t: "dg", name: "indian-wear-saree-parts",
          caption: { en: "The parts of a saree in the common Nivi drape.", hi: "आम निवी ड्रेप में साड़ी के हिस्से।" } },
        { t: "cards", items: [
          { icon: "sparkle", title: { en: "Pallu", hi: "पल्लू" }, text: { en: "The loose, decorated end that falls over the shoulder.", hi: "सजा हुआ खुला सिरा जो कंधे पर से गिरता है।" } },
          { icon: "layers", title: { en: "Pleats", hi: "प्लीट्स" }, text: { en: "Folds made at the waist and tucked in. They let you walk freely.", hi: "कमर पर बनाकर खोंसी गई तहें। इनसे चलना आसान होता है।" } },
          { icon: "ruler", title: { en: "Border", hi: "बॉर्डर" }, text: { en: "The decorated band along both long edges.", hi: "दोनों लंबे किनारों पर सजी पट्टी।" } },
          { icon: "fabric", title: { en: "Body", hi: "बॉडी" }, text: { en: "The main field of the saree, plain or with small motifs (buttis).", hi: "साड़ी का मुख्य हिस्सा, सादा या छोटे मोटिफ़ (बूटी) वाला।" } },
          { icon: "shirt", title: { en: "Blouse", hi: "ब्लाउज़" }, text: { en: "A fitted top worn under the saree. Often cut from the blouse piece.", hi: "साड़ी के नीचे पहना जाने वाला फ़िटेड टॉप। अक्सर ब्लाउज़ पीस से बनता है।" } },
          { icon: "dress", title: { en: "Petticoat", hi: "पेटीकोट" }, text: { en: "A cotton underskirt with a drawstring. The saree is tucked into it.", hi: "नाड़े वाला सूती अंदर का स्कर्ट। साड़ी इसी में खोंसी जाती है।" } }
        ] },
        { t: "img", src: "assets/img/indian-wear/saree-flat-border.jpg",
          caption: { en: "Spread out: see the plain body, the patterned border and the pallu end.", hi: "फैली हुई साड़ी: सादी बॉडी, डिज़ाइन वाला बॉर्डर और पल्लू वाला सिरा देखो।" } },
        { t: "h", text: { en: "Five famous drapes", hi: "पांच मशहूर ड्रेप" } },
        { t: "gallery", cols: 2, items: [
          { src: "assets/img/indian-wear/nivi-green-saree.jpg", label: { en: "Nivi (Andhra Pradesh)", hi: "निवी (आंध्र प्रदेश)" },
            note: { en: "Pleats in front, pallu over the left shoulder. The most common drape today.", hi: "आगे प्लीट्स, पल्लू बाएं कंधे पर। आज का सबसे आम ड्रेप।" } },
          { src: "assets/img/indian-wear/bengali-drape.jpg", label: { en: "Bengali (Athpourey)", hi: "बंगाली (आटपौरे)" },
            note: { en: "Traditionally no front pleats; pallu goes over the left shoulder twice, often with a key bunch.", hi: "पारंपरिक रूप से आगे प्लीट्स नहीं; पल्लू दो बार बाएं कंधे पर, अक्सर चाबी के गुच्छे के साथ।" } },
          { src: "assets/img/indian-wear/gujarati-drape.jpg", label: { en: "Gujarati (Seedha pallu)", hi: "गुजराती (सीधा पल्लू)" },
            note: { en: "Pallu comes from the back over the right shoulder and spreads across the front.", hi: "पल्लू पीछे से दाएं कंधे पर आकर सामने फैलता है।" } },
          { src: "assets/img/indian-wear/nauvari-vintage.jpg", label: { en: "Maharashtrian Nauvari", hi: "महाराष्ट्रीयन नौवारी" },
            note: { en: "9 yards, tucked at the back like a dhoti, so you can move freely.", hi: "9 गज़, धोती की तरह पीछे खोंसी जाती है, ताकि आराम से चल-फिर सको।" } },
          { src: "assets/img/indian-wear/kerala-set-mundu-painting.jpg", label: { en: "Kerala Mundum Neriyathum", hi: "केरल मुंडुम नेरियथुम" },
            note: { en: "Two pieces: a mundu wrapped below and a neriyathu on top. Painting by Raja Ravi Varma.", hi: "दो टुकड़े: नीचे लपेटा मुंडू और ऊपर नेरियथु। राजा रवि वर्मा की पेंटिंग।" } }
        ] },
        { t: "tip", kind: "fact", text: {
          en: "The saree is very old, but the **blouse and petticoat** became common only about 150 years ago. In the 1870s, Jnanadanandini Devi of the Tagore family helped make the blouse popular in Bengal.",
          hi: "साड़ी बहुत पुरानी है, लेकिन **ब्लाउज़ और पेटीकोट** लगभग 150 साल पहले ही आम हुए। 1870 के दशक में टैगोर परिवार की ज्ञानदानंदिनी देवी ने बंगाल में ब्लाउज़ को लोकप्रिय बनाने में मदद की।" } },
        { t: "tip", kind: "tip", text: {
          en: "When you design a saree, think about **where the eye goes**: the pallu and the border are what people see first.",
          hi: "जब तुम साड़ी डिज़ाइन करो, तो सोचो कि **नज़र कहां जाती है**: लोग सबसे पहले पल्लू और बॉर्डर ही देखते हैं।" } },
        { t: "terms", items: [
          { en: "Pallu", hi: "पल्लू", def: { en: "The decorated end of the saree worn over the shoulder.", hi: "साड़ी का सजा हुआ सिरा जो कंधे पर डाला जाता है।" } },
          { en: "Pleats", hi: "प्लीट्स (चुन्नटें)", def: { en: "Even folds of cloth tucked in at the waist.", hi: "कपड़े की बराबर तहें जो कमर पर खोंसी जाती हैं।" } },
          { en: "Drape", hi: "ड्रेप", def: { en: "The way an unstitched cloth is wrapped around the body.", hi: "बिना सिले कपड़े को शरीर पर लपेटने का तरीका।" } },
          { en: "Nauvari", hi: "नौवारी", def: { en: "A 9-yard Maharashtrian saree worn like a dhoti.", hi: "9 गज़ की महाराष्ट्रीयन साड़ी जो धोती की तरह पहनी जाती है।" } },
          { en: "Blouse piece", hi: "ब्लाउज़ पीस", def: { en: "Extra fabric at one end of a saree, cut off to stitch the blouse.", hi: "साड़ी के एक सिरे पर अलग कपड़ा, जिसे काटकर ब्लाउज़ सिला जाता है।" } }
        ] },
        { t: "try", text: {
          en: "Take a dupatta or bedsheet and try the Nivi drape on yourself or a chair. Then sketch it and label the pallu, pleats and border.",
          hi: "एक दुपट्टा या चादर लो और खुद पर या कुर्सी पर निवी ड्रेप करके देखो। फिर उसका स्केच बनाकर पल्लू, प्लीट्स और बॉर्डर लिखो।" } }
      ]
    },
    {
      id: "lehenga-choli",
      title: { en: "Lehenga, Choli and Dupatta", hi: "लहंगा, चोली और दुपट्टा" },
      min: 6,
      blocks: [
        { t: "p", text: {
          en: "A **lehenga choli** has three parts: a long skirt (lehenga), a short fitted top (choli) and a dupatta. It is the star of Indian weddings, sangeets and Navratri nights.",
          hi: "**लहंगा चोली (Lehenga choli)** के तीन हिस्से होते हैं: लंबा स्कर्ट (लहंगा), छोटा फ़िटेड टॉप (चोली) और दुपट्टा। ये शादी, संगीत और नवरात्रि की रातों का स्टार है।" } },
        { t: "img", src: "assets/img/indian-wear/lehenga-green.jpg",
          caption: { en: "A lehenga with a matching choli and a contrast dupatta.", hi: "मैचिंग चोली और कॉन्ट्रास्ट दुपट्टे के साथ लहंगा।" } },
        { t: "h", text: { en: "Lehenga shapes", hi: "लहंगे के आकार" } },
        { t: "gallery", cols: 3, items: [
          { dg: "indian-wear-lehenga", args: { type: "aline" }, label: { en: "A-line", hi: "ए-लाइन" },
            note: { en: "Fitted at the waist, gently wider at the hem. Suits everyone.", hi: "कमर पर फ़िट, नीचे हल्का चौड़ा। सब पर जंचता है।" } },
          { dg: "indian-wear-lehenga", args: { type: "flared" }, label: { en: "Flared / circular", hi: "फ़्लेयर्ड / सर्कुलर" },
            note: { en: "Cut as a full circle. Twirls beautifully.", hi: "पूरे गोले में कटा। घूमने पर बहुत सुंदर घेरा बनता है।" } },
          { dg: "indian-wear-lehenga", args: { type: "kalidar" }, label: { en: "Kalidar (panelled)", hi: "कलीदार (पैनल वाला)" },
            note: { en: "Made of many triangular panels called kalis.", hi: "कई तिकोने पैनलों से बना, जिन्हें कली कहते हैं।" } },
          { dg: "indian-wear-lehenga", args: { type: "mermaid" }, label: { en: "Mermaid / fishcut", hi: "मरमेड / फ़िशकट" },
            note: { en: "Hugs the hips and thighs, flares below the knee.", hi: "कूल्हों और जांघों पर फ़िट, घुटने के नीचे से फैलता है।" } },
          { dg: "indian-wear-lehenga", args: { type: "sharara" }, label: { en: "Sharara", hi: "शरारा" },
            note: { en: "A cousin of the lehenga: wide pants that flare from the waist.", hi: "लहंगे का रिश्तेदार: चौड़ी पैंट जो कमर से ही फैलती है।" } },
          { dg: "indian-wear-lehenga", args: { type: "gharara" }, label: { en: "Gharara", hi: "गरारा" },
            note: { en: "Fitted to the knee, then a big flare. The knee joint is often decorated.", hi: "घुटने तक फ़िट, फिर बड़ा घेरा। घुटने का जोड़ अक्सर सजा होता है।" } }
        ] },
        { t: "gallery", cols: 2, items: [
          { src: "assets/img/indian-wear/lehenga-white.jpg", label: { en: "Pastel flared lehenga", hi: "पेस्टल फ़्लेयर्ड लहंगा" } },
          { src: "assets/img/indian-wear/lehenga-mannequin.jpg", label: { en: "A-line lehenga with a printed border", hi: "प्रिंटेड बॉर्डर वाला ए-लाइन लहंगा" } },
          { src: "assets/img/indian-wear/bridal-shop.jpg", label: { en: "Bridal lehengas in a Varanasi shop", hi: "वाराणसी की दुकान में दुल्हन के लहंगे" } },
          { src: "assets/img/indian-wear/sharara.jpg", label: { en: "A sharara set", hi: "शरारा सेट" } }
        ] },
        { t: "h", text: { en: "Choli styles", hi: "चोली के स्टाइल" } },
        { t: "p", text: {
          en: "A **choli** can be a short blouse, a crop top, a long choli down to the waist, a corset style or a jacket style. In Gujarat and Kutch, cholis are covered in mirror work.",
          hi: "**चोली (Choli)** छोटा ब्लाउज़, क्रॉप टॉप, कमर तक लंबी चोली, कॉर्सेट स्टाइल या जैकेट स्टाइल हो सकती है। गुजरात और कच्छ में चोलियां शीशे के काम से भरी होती हैं।" } },
        { t: "compare", items: [
          { title: { en: "Chaniya choli (Gujarat)", hi: "चनिया चोली (गुजरात)" }, src: "assets/img/indian-wear/chaniya-choli-garba.jpg",
            points: [ { en: "Worn for garba in Navratri", hi: "नवरात्रि में गरबा के लिए" }, { en: "Bright colours, mirrors, light cotton", hi: "चटक रंग, शीशे, हल्का सूती कपड़ा" } ] },
          { title: { en: "Embroidered choli (Kutch)", hi: "कढ़ाई वाली चोली (कच्छ)" }, src: "assets/img/indian-wear/kutch-choli.jpg",
            points: [ { en: "Hand embroidery all over", hi: "पूरी हाथ की कढ़ाई" }, { en: "A museum treasure today", hi: "आज ये संग्रहालय का ख़ज़ाना है" } ] }
        ] },
        { t: "h", text: { en: "Dupatta drapes", hi: "दुपट्टे के ड्रेप" } },
        { t: "p", text: {
          en: "A **dupatta** is a long scarf, about 2.25 to 2.5 metres. The way you drape it changes the whole look of the outfit.",
          hi: "**दुपट्टा (Dupatta)** लगभग 2.25 से 2.5 मीटर का लंबा स्कार्फ़ है। इसे ड्रेप करने का तरीका पूरे आउटफ़िट का लुक बदल देता है।" } },
        { t: "gallery", cols: 3, items: [
          { dg: "indian-wear-dupatta", args: { style: "classic" }, label: { en: "Classic U", hi: "क्लासिक U" } },
          { dg: "indian-wear-dupatta", args: { style: "one-shoulder" }, label: { en: "One shoulder", hi: "एक कंधे पर" } },
          { dg: "indian-wear-dupatta", args: { style: "both" }, label: { en: "Both shoulders", hi: "दोनों कंधों पर" } },
          { dg: "indian-wear-dupatta", args: { style: "diagonal" }, label: { en: "Saree style", hi: "साड़ी स्टाइल" } },
          { dg: "indian-wear-dupatta", args: { style: "head" }, label: { en: "Over the head", hi: "सिर पर" } }
        ] },
        { t: "tip", kind: "tip", text: {
          en: "A heavy bridal lehenga can weigh several kilos. Designers add **can-can** (a stiff net layer) inside to hold the flare.",
          hi: "भारी ब्राइडल लहंगा कई किलो का हो सकता है। घेरा बनाए रखने के लिए डिज़ाइनर अंदर **कैन-कैन (Can-can)** यानी सख़्त जाली की परत लगाते हैं।" } },
        { t: "terms", items: [
          { en: "Lehenga", hi: "लहंगा", def: { en: "A long, full skirt worn with a choli and dupatta.", hi: "लंबा, घेरदार स्कर्ट जो चोली और दुपट्टे के साथ पहना जाता है।" } },
          { en: "Kali", hi: "कली", def: { en: "A triangular panel; many kalis make a kalidar garment.", hi: "तिकोना पैनल; कई कलियां मिलकर कलीदार कपड़ा बनाती हैं।" } },
          { en: "Choli", hi: "चोली", def: { en: "A short, fitted top worn with a lehenga or saree.", hi: "लहंगे या साड़ी के साथ पहना जाने वाला छोटा फ़िटेड टॉप।" } },
          { en: "Can-can", hi: "कैन-कैन", def: { en: "A stiff net layer inside a skirt that adds volume.", hi: "स्कर्ट के अंदर सख़्त जाली की परत जो घेरा बढ़ाती है।" } },
          { en: "Gharara", hi: "गरारा", def: { en: "Pants fitted to the knee, then flared, with a joint at the knee.", hi: "घुटने तक फ़िट और फिर घेरदार पैंट, घुटने पर जोड़ के साथ।" } }
        ] },
        { t: "try", text: {
          en: "Draw the same choli with 3 different lehenga shapes: A-line, kalidar and mermaid. Which one would you pick for a sangeet?",
          hi: "एक ही चोली के साथ 3 अलग लहंगे बनाओ: ए-लाइन, कलीदार और मरमेड। संगीत के लिए तुम कौन सा चुनोगी?" } }
      ]
    },
    {
      id: "kurta-bottoms",
      title: { en: "Kurtas and Bottoms", hi: "कुर्ते और बॉटम" },
      min: 7,
      blocks: [
        { t: "p", text: {
          en: "The **kurta** is India's everyday hero: college, office, puja, travel. Change its length, flare or slit and you get a totally new garment.",
          hi: "**कुर्ता (Kurta)** भारत का रोज़ का हीरो है: कॉलेज, ऑफ़िस, पूजा, सफ़र। इसकी लंबाई, घेरा या स्लिट बदलो और एकदम नया कपड़ा बन जाता है।" } },
        { t: "img", src: "assets/img/indian-wear/salwar-kameez-beach.jpg",
          caption: { en: "Salwar kameez with dupattas, an easy everyday look.", hi: "दुपट्टे के साथ सलवार कमीज़, रोज़ का आसान लुक।" } },
        { t: "h", text: { en: "Kurta styles", hi: "कुर्ते के स्टाइल" } },
        { t: "gallery", cols: 3, items: [
          { dg: "indian-wear-kurta", args: { type: "straight" }, label: { en: "Straight", hi: "स्ट्रेट" }, note: { en: "Side slits, classic", hi: "साइड स्लिट, क्लासिक" } },
          { dg: "indian-wear-kurta", args: { type: "aline" }, label: { en: "A-line", hi: "ए-लाइन" }, note: { en: "Wider at the hem", hi: "नीचे से चौड़ा" } },
          { dg: "indian-wear-kurta", args: { type: "anarkali" }, label: { en: "Anarkali", hi: "अनारकली" }, note: { en: "Fitted top, big flare", hi: "ऊपर फ़िट, नीचे बड़ा घेरा" } },
          { dg: "indian-wear-kurta", args: { type: "kaftan" }, label: { en: "Kaftan", hi: "कफ़्तान" }, note: { en: "Loose, wide sleeves", hi: "ढीला, चौड़ी बाजू" } },
          { dg: "indian-wear-kurta", args: { type: "angrakha" }, label: { en: "Angrakha", hi: "अंगरखा" }, note: { en: "Overlap tied at the side", hi: "एक-दूसरे पर चढ़ा, साइड में बंधा" } },
          { dg: "indian-wear-kurta", args: { type: "highlow" }, label: { en: "High-low", hi: "हाई-लो" }, note: { en: "Short front, long back", hi: "आगे छोटा, पीछे लंबा" } },
          { dg: "indian-wear-kurta", args: { type: "slit" }, label: { en: "Front slit", hi: "फ़्रंट स्लिट" }, note: { en: "Opening at centre front", hi: "बीच में आगे से खुला" } }
        ] },
        { t: "compare", items: [
          { title: { en: "Anarkali", hi: "अनारकली" }, dg: "indian-wear-kurta", args: { type: "anarkali" },
            points: [ { en: "Fitted bodice, then many flared panels", hi: "फ़िटेड बॉडिस, फिर कई घेरदार पैनल" },
                      { en: "Named after the legendary Mughal-era dancer Anarkali", hi: "मुग़ल ज़माने की मशहूर नर्तकी अनारकली के नाम पर" } ] },
          { title: { en: "Angrakha", hi: "अंगरखा" }, src: "assets/img/indian-wear/angrakha-museum.jpg",
            points: [ { en: "Wrap front that overlaps and ties", hi: "आगे से लपेटकर बंधने वाला" },
                      { en: "Name means 'body protector'", hi: "नाम का मतलब 'अंग की रक्षा करने वाला'" } ] }
        ] },
        { t: "h", text: { en: "Bottoms", hi: "बॉटम" } },
        { t: "gallery", cols: 3, items: [
          { dg: "indian-wear-bottom", args: { type: "salwar" }, label: { en: "Salwar", hi: "सलवार" }, note: { en: "Loose, narrow at the ankle", hi: "ढीली, टखने पर पतली" } },
          { dg: "indian-wear-bottom", args: { type: "patiala" }, label: { en: "Patiala", hi: "पटियाला" }, note: { en: "Many deep pleats", hi: "बहुत सारी गहरी प्लीट्स" } },
          { dg: "indian-wear-bottom", args: { type: "churidar" }, label: { en: "Churidar", hi: "चूड़ीदार" }, note: { en: "Tight, bunched at ankle", hi: "टाइट, टखने पर सिलवटें" } },
          { dg: "indian-wear-bottom", args: { type: "palazzo" }, label: { en: "Palazzo", hi: "पलाज़ो" }, note: { en: "Wide, straight, flowy", hi: "चौड़ा, सीधा, लहराता" } },
          { dg: "indian-wear-bottom", args: { type: "dhoti" }, label: { en: "Dhoti pants", hi: "धोती पैंट" }, note: { en: "Low crotch, draped folds", hi: "नीचा क्रॉच, लटकती तहें" } },
          { dg: "indian-wear-bottom", args: { type: "cigarette" }, label: { en: "Cigarette pants", hi: "सिगरेट पैंट" }, note: { en: "Slim, straight, ankle length", hi: "पतली, सीधी, टखने तक" } }
        ] },
        { t: "gallery", cols: 2, items: [
          { src: "assets/img/indian-wear/patiala-suit.jpg", label: { en: "Patiala salwar suit", hi: "पटियाला सलवार सूट" } },
          { src: "assets/img/indian-wear/kurta-front-slit.jpg", label: { en: "Front-slit kurta with leggings", hi: "लेगिंग्स के साथ फ़्रंट-स्लिट कुर्ता" } }
        ] },
        { t: "tip", kind: "remember", text: {
          en: "**Churidar** comes from churi (bangle). The extra length bunches at the ankle into rings that look like bangles.",
          hi: "**चूड़ीदार** शब्द चूड़ी से आया है। एक्स्ट्रा लंबाई टखने पर इकट्ठी होकर चूड़ियों जैसे छल्ले बनाती है।" } },
        { t: "tip", kind: "mistake", text: {
          en: "Don't mix up sharara and gharara. **Sharara** flares from the waist; **gharara** is fitted to the knee and flares below it.",
          hi: "शरारा और गरारा में गड़बड़ मत करना। **शरारा** कमर से फैलता है; **गरारा** घुटने तक फ़िट रहता है और उसके नीचे फैलता है।" } },
        { t: "terms", items: [
          { en: "Kameez", hi: "कमीज़", def: { en: "A long tunic top; another word for kurta in a suit.", hi: "लंबा ट्यूनिक टॉप; सूट में कुर्ते का दूसरा नाम।" } },
          { en: "Anarkali", hi: "अनारकली", def: { en: "A long kurta with a fitted bodice and a wide flared skirt.", hi: "फ़िटेड ऊपरी हिस्से और चौड़े घेरे वाला लंबा कुर्ता।" } },
          { en: "Angrakha", hi: "अंगरखा", def: { en: "A wrap-style top with an overlapping front tied at the side.", hi: "लपेटकर पहना जाने वाला टॉप, जिसका आगे का हिस्सा साइड में बंधता है।" } },
          { en: "Churidar", hi: "चूड़ीदार", def: { en: "Tight trousers that bunch into rings at the ankle.", hi: "टाइट पजामा जो टखने पर छल्लों में इकट्ठा होता है।" } },
          { en: "Nada", hi: "नाड़ा", def: { en: "The drawstring that holds a salwar or petticoat at the waist.", hi: "डोरी जो सलवार या पेटीकोट को कमर पर रोकती है।" } }
        ] },
        { t: "try", text: {
          en: "Look at your own kurtas. Sort them by style (straight, A-line, Anarkali...) and note which bottom you wear with each.",
          hi: "अपने कुर्ते देखो। उन्हें स्टाइल के हिसाब से छांटो (स्ट्रेट, ए-लाइन, अनारकली...) और लिखो कि हर एक के साथ कौन सा बॉटम पहनती हो।" } }
      ]
    },
    {
      id: "blouse-designs",
      title: { en: "Blouse Designs", hi: "ब्लाउज़ डिज़ाइन" },
      min: 6,
      blocks: [
        { t: "p", text: {
          en: "A plain saree can look royal with the right **blouse**. Many brides spend as much thought on the blouse as on the saree itself!",
          hi: "सही **ब्लाउज़ (Blouse)** से सादी साड़ी भी शाही लग सकती है। कई दुल्हनें ब्लाउज़ पर उतना ही सोचती हैं जितना साड़ी पर!" } },
        { t: "img", src: "assets/img/indian-wear/aari-blouse.jpg",
          caption: { en: "Blouse sleeves with rich aari embroidery.", hi: "भारी आरी कढ़ाई वाली ब्लाउज़ की बाजू।" } },
        { t: "h", text: { en: "Front necklines", hi: "आगे की नेकलाइन" } },
        { t: "gallery", cols: 3, items: [
          { dg: "indian-wear-blouse", args: { neck: "round", sleeve: "short" }, label: { en: "Round", hi: "राउंड" } },
          { dg: "indian-wear-blouse", args: { neck: "boat", sleeve: "elbow" }, label: { en: "Boat neck", hi: "बोट नेक" }, note: { en: "Wide, along the collarbone", hi: "चौड़ी, कॉलरबोन के साथ" } },
          { dg: "indian-wear-blouse", args: { neck: "high", sleeve: "none" }, label: { en: "High neck", hi: "हाई नेक" }, note: { en: "Closed collar, often sleeveless", hi: "बंद गला, अक्सर बिना बाजू" } },
          { dg: "indian-wear-blouse", args: { neck: "sweetheart", sleeve: "cap" }, label: { en: "Sweetheart", hi: "स्वीटहार्ट" }, note: { en: "Shaped like the top of a heart", hi: "दिल के ऊपरी हिस्से जैसी" } },
          { dg: "indian-wear-blouse", args: { neck: "square", sleeve: "short" }, label: { en: "Square", hi: "स्क्वेयर" } },
          { dg: "indian-wear-blouse", args: { neck: "deep", sleeve: "short" }, label: { en: "Deep V", hi: "डीप वी" } }
        ] },
        { t: "h", text: { en: "Backs", hi: "पीछे के डिज़ाइन" } },
        { t: "gallery", cols: 3, items: [
          { dg: "indian-wear-blouse", args: { neck: "deepback", view: "back" }, label: { en: "Deep U back", hi: "डीप U बैक" } },
          { dg: "indian-wear-blouse", args: { neck: "keyhole", view: "back", sleeve: "elbow" }, label: { en: "Keyhole", hi: "कीहोल" }, note: { en: "A small opening with a button", hi: "बटन के साथ छोटा खुला हिस्सा" } },
          { dg: "indian-wear-blouse", args: { neck: "dori", view: "back" }, label: { en: "Dori / tie-up", hi: "डोरी / टाई-अप" }, note: { en: "Strings with tassels (latkans)", hi: "लटकन वाली डोरियां" } }
        ] },
        { t: "p", text: {
          en: "A **sheer back** uses net or organza in place of solid fabric, often with embroidery on top. It looks bold but stays covered.",
          hi: "**शीयर बैक (Sheer back)** में ठोस कपड़े की जगह नेट या ऑर्गेंज़ा लगता है, अक्सर ऊपर कढ़ाई के साथ। ये बोल्ड लगता है पर ढका भी रहता है।" } },
        { t: "h", text: { en: "Sleeves", hi: "बाजू (स्लीव्स)" } },
        { t: "gallery", cols: 3, items: [
          { dg: "indian-wear-blouse", args: { neck: "round", sleeve: "none" }, label: { en: "Sleeveless", hi: "स्लीवलेस" } },
          { dg: "indian-wear-blouse", args: { neck: "round", sleeve: "cap" }, label: { en: "Cap", hi: "कैप" } },
          { dg: "indian-wear-blouse", args: { neck: "round", sleeve: "puff" }, label: { en: "Puff", hi: "पफ़" } },
          { dg: "indian-wear-blouse", args: { neck: "round", sleeve: "elbow" }, label: { en: "Elbow", hi: "कोहनी तक" } },
          { dg: "indian-wear-blouse", args: { neck: "round", sleeve: "full" }, label: { en: "Full", hi: "फ़ुल" } }
        ] },
        { t: "h", text: { en: "Cuts for a good fit", hi: "अच्छी फ़िटिंग के कट" } },
        { t: "compare", items: [
          { title: { en: "Princess cut", hi: "प्रिंसेस कट" }, dg: "indian-wear-blouse", args: { neck: "round", sleeve: "short", cut: "princess" },
            points: [ { en: "Long seams from the armhole over the bust to the waist", hi: "आर्महोल से बस्ट के ऊपर से कमर तक लंबी सिलाई" },
                      { en: "Smooth fit with no darts", hi: "बिना डार्ट के चिकनी फ़िटिंग" } ] },
          { title: { en: "Katori cut", hi: "कटोरी कट" }, dg: "indian-wear-blouse", args: { neck: "round", sleeve: "short", cut: "katori" },
            points: [ { en: "Cup-shaped (katori = bowl) panels under the bust", hi: "बस्ट के नीचे कटोरी जैसे पैनल" },
                      { en: "Gives lift and a rounded shape", hi: "उठान और गोल आकार देता है" } ] }
        ] },
        { t: "tip", kind: "tip", text: {
          en: "Heavy saree? Keep the blouse simple. Plain saree? Let the blouse do the talking with a fun back or sleeves.",
          hi: "भारी साड़ी? ब्लाउज़ सादा रखो। सादी साड़ी? मज़ेदार बैक या बाजू वाले ब्लाउज़ को बोलने दो।" } },
        { t: "terms", items: [
          { en: "Princess cut", hi: "प्रिंसेस कट", def: { en: "A blouse with long curved seams for shaping instead of darts.", hi: "ऐसा ब्लाउज़ जिसमें डार्ट की जगह लंबी घुमावदार सिलाई से शेप दी जाती है।" } },
          { en: "Katori", hi: "कटोरी", def: { en: "Bowl-shaped cups stitched under the bust of a blouse.", hi: "ब्लाउज़ में बस्ट के नीचे सिले कटोरी जैसे कप।" } },
          { en: "Boat neck", hi: "बोट नेक", def: { en: "A wide, shallow neckline running towards the shoulders.", hi: "चौड़ी, कम गहरी नेकलाइन जो कंधों की तरफ़ जाती है।" } },
          { en: "Latkan", hi: "लटकन", def: { en: "A decorative tassel at the end of a dori.", hi: "डोरी के सिरे पर सजावटी फुंदना।" } }
        ] },
        { t: "try", text: {
          en: "Design 3 blouse backs for one plain silk saree: one deep U, one keyhole, one dori. Add sleeves to each.",
          hi: "एक सादी सिल्क साड़ी के लिए 3 ब्लाउज़ बैक डिज़ाइन करो: एक डीप U, एक कीहोल, एक डोरी। हर एक में बाजू भी जोड़ो।" } }
      ]
    },
    {
      id: "mens-wear",
      title: { en: "Men's Indian Wear", hi: "पुरुषों का भारतीय पहनावा" },
      min: 6,
      blocks: [
        { t: "p", text: {
          en: "Men's Indian wear is mostly about **length, collar and closure**. A kurta, a sherwani and a Nehru jacket can share the same band collar but look completely different.",
          hi: "पुरुषों के भारतीय कपड़ों में ज़्यादातर फ़र्क़ **लंबाई, कॉलर और बंद होने के तरीके** का है। कुर्ता, शेरवानी और नेहरू जैकेट में एक ही बंद गला हो सकता है, फिर भी ये बिल्कुल अलग दिखते हैं।" } },
        { t: "gallery", cols: 3, items: [
          { dg: "indian-wear-mens", args: { type: "kurta" }, label: { en: "Kurta", hi: "कुर्ता" }, note: { en: "Pullover, half placket", hi: "सिर से पहना, आधी प्लैकेट" } },
          { dg: "indian-wear-mens", args: { type: "sherwani" }, label: { en: "Sherwani", hi: "शेरवानी" }, note: { en: "Long coat, buttons to the hem", hi: "लंबा कोट, नीचे तक बटन" } },
          { dg: "indian-wear-mens", args: { type: "achkan" }, label: { en: "Achkan", hi: "अचकन" }, note: { en: "Fitted, knee length", hi: "फ़िटेड, घुटने तक" } },
          { dg: "indian-wear-mens", args: { type: "bandhgala" }, label: { en: "Bandhgala", hi: "बंदगला" }, note: { en: "Hip-length jacket, closed neck", hi: "कूल्हे तक जैकेट, बंद गला" } },
          { dg: "indian-wear-mens", args: { type: "nehru" }, label: { en: "Nehru jacket", hi: "नेहरू जैकेट" }, note: { en: "Sleeveless, worn over a kurta", hi: "बिना बाजू, कुर्ते के ऊपर" } }
        ] },
        { t: "cards", items: [
          { src: "assets/img/indian-wear/kurta-pyjama-museum.jpg", title: { en: "Kurta pyjama", hi: "कुर्ता पजामा" },
            text: { en: "The everyday classic. The pyjama has a drawstring and can be straight or churidar.", hi: "रोज़ का क्लासिक। पजामे में नाड़ा होता है, ये सीधा या चूड़ीदार हो सकता है।" } },
          { src: "assets/img/indian-wear/rajput-sherwani.jpg", title: { en: "Sherwani", hi: "शेरवानी" },
            text: { en: "The groom's favourite. A long buttoned coat worn with churidar, often with a safa and a stole.", hi: "दूल्हे की पसंद। लंबा बटन वाला कोट, चूड़ीदार के साथ, अक्सर साफ़ा और स्टोल भी।" } },
          { src: "assets/img/indian-wear/bandhgala-sabyasachi.jpg", title: { en: "Bandhgala / Jodhpuri", hi: "बंदगला / जोधपुरी" },
            text: { en: "'Closed neck' jacket from Jodhpur. Formal, sharp and very royal.", hi: "जोधपुर से आया 'बंद गले' का जैकेट। फ़ॉर्मल, शार्प और बहुत शाही।" } },
          { src: "assets/img/indian-wear/kurta-churidar-nehru.jpg", title: { en: "Kurta, churidar and Nehru jacket", hi: "कुर्ता, चूड़ीदार और नेहरू जैकेट" },
            text: { en: "A sleeveless jacket with a mandarin collar over a kurta. Named after Jawaharlal Nehru.", hi: "कुर्ते के ऊपर मैंडरिन कॉलर वाली बिना बाजू की जैकेट। जवाहरलाल नेहरू के नाम पर।" } }
        ] },
        { t: "compare", items: [
          { title: { en: "Dhoti", hi: "धोती" }, src: "assets/img/indian-wear/dhoti-wedding.jpg",
            points: [ { en: "One unstitched cloth wrapped and tucked", hi: "बिना सिला एक कपड़ा, लपेटकर खोंसा जाता है" },
                      { en: "Called veshti or mundu in the South", hi: "दक्षिण में इसे वेष्टि या मुंडू कहते हैं" } ] },
          { title: { en: "Safa / Pagdi", hi: "साफ़ा / पगड़ी" }, src: "assets/img/indian-wear/safa.jpg",
            points: [ { en: "A long cloth tied as a turban", hi: "लंबा कपड़ा जो पगड़ी की तरह बांधा जाता है" },
                      { en: "Bright bandhani and leheriya safas in Rajasthan", hi: "राजस्थान में चटक बांधनी और लहरिया साफ़े" } ] }
        ] },
        { t: "img", src: "assets/img/indian-wear/jodhpuri-safa.jpg",
          caption: { en: "A bandhgala with a bright safa: a classic Rajasthani look.", hi: "चटक साफ़े के साथ बंदगला: क्लासिक राजस्थानी लुक।" } },
        { t: "tip", kind: "remember", text: {
          en: "The **achkan** came first. The **sherwani** grew out of it, and is usually a bit looser and more decorated.",
          hi: "**अचकन** पहले आई। **शेरवानी** उसी से निकली, और आमतौर पर थोड़ी ढीली और ज़्यादा सजी होती है।" } },
        { t: "terms", items: [
          { en: "Sherwani", hi: "शेरवानी", def: { en: "A long, buttoned coat with a band collar, worn by grooms.", hi: "बंद गले वाला लंबा बटन वाला कोट, जो दूल्हे पहनते हैं।" } },
          { en: "Achkan", hi: "अचकन", def: { en: "A fitted, knee-length coat; the ancestor of the sherwani.", hi: "घुटने तक का फ़िटेड कोट; शेरवानी का पूर्वज।" } },
          { en: "Bandhgala", hi: "बंदगला", def: { en: "A jacket with a closed band collar; also called Jodhpuri.", hi: "बंद गले वाली जैकेट; इसे जोधपुरी भी कहते हैं।" } },
          { en: "Mandarin collar", hi: "मैंडरिन कॉलर", def: { en: "A short stand-up collar with no fold.", hi: "छोटा खड़ा कॉलर जो मुड़ता नहीं।" } },
          { en: "Safa", hi: "साफ़ा", def: { en: "A long turban cloth, popular in Rajasthan and at weddings.", hi: "पगड़ी का लंबा कपड़ा, राजस्थान और शादियों में लोकप्रिय।" } }
        ] },
        { t: "try", text: {
          en: "Sketch one groom look and one simple Diwali look for a man. Use at least 3 garments from this lesson.",
          hi: "एक दूल्हे का लुक और एक सादा दिवाली लुक स्केच करो। इस लेसन के कम से कम 3 कपड़े इस्तेमाल करो।" } }
      ]
    },
    {
      id: "regional-dress",
      title: { en: "Regional Dress of India", hi: "भारत का क्षेत्रीय पहनावा" },
      min: 6,
      blocks: [
        { t: "p", text: {
          en: "India's weather, crafts and history shaped what people wear. Warm wool in Kashmir, light cotton and silk in Kerala, mirrors and bright colours in the desert.",
          hi: "भारत के मौसम, हस्तकला और इतिहास ने लोगों के पहनावे को आकार दिया। कश्मीर में गर्म ऊन, केरल में हल्का सूती और सिल्क, रेगिस्तान में शीशे और चटक रंग।" } },
        { t: "h", text: { en: "North and West", hi: "उत्तर और पश्चिम" } },
        { t: "gallery", cols: 2, items: [
          { src: "assets/img/indian-wear/rajasthan-ghagra.jpg", label: { en: "Rajasthan: ghagra and odhni", hi: "राजस्थान: घाघरा और ओढ़नी" },
            note: { en: "Wide skirt, choli and a long odhni (veil), in bandhani and leheriya.", hi: "चौड़ा घाघरा, चोली और लंबी ओढ़नी, बांधनी और लहरिया में।" } },
          { src: "assets/img/indian-wear/phulkari-women.jpg", label: { en: "Punjab: suit and phulkari", hi: "पंजाब: सूट और फुलकारी" },
            note: { en: "Patiala suits with phulkari ('flower work') dupattas.", hi: "पटियाला सूट के साथ फुलकारी ('फूलों का काम') दुपट्टे।" } },
          { src: "assets/img/indian-wear/pheran-man.jpg", label: { en: "Kashmir: pheran", hi: "कश्मीर: फेरन" },
            note: { en: "A long, loose woollen gown for the cold winters.", hi: "ठंडी सर्दियों के लिए लंबा, ढीला ऊनी चोगा।" } },
          { src: "assets/img/indian-wear/pheran-tilla-vintage.jpg", label: { en: "Kashmir: tilla pheran", hi: "कश्मीर: तिल्ला फेरन" },
            note: { en: "Women's pheran with tilla (metal thread) embroidery.", hi: "तिल्ला (धातु के धागे) की कढ़ाई वाला महिलाओं का फेरन।" } },
          { src: "assets/img/indian-wear/lavani-nauvari.jpg", label: { en: "Maharashtra: nauvari", hi: "महाराष्ट्र: नौवारी" },
            note: { en: "The 9-yard drape, worn with traditional jewellery.", hi: "9 गज़ का ड्रेप, पारंपरिक गहनों के साथ।" } }
        ] },
        { t: "h", text: { en: "East and South", hi: "पूर्व और दक्षिण" } },
        { t: "gallery", cols: 2, items: [
          { src: "assets/img/indian-wear/mekhela-chador.jpg", label: { en: "Assam: mekhela chador", hi: "असम: मेखेला चादर" },
            note: { en: "A pleated wrap skirt (mekhela) and a draped upper cloth (chador).", hi: "प्लीट वाला लपेटने वाला स्कर्ट (मेखेला) और ऊपर का कपड़ा (चादर)।" } },
          { src: "assets/img/indian-wear/veshti.jpg", label: { en: "Tamil Nadu: veshti", hi: "तमिलनाडु: वेष्टि" },
            note: { en: "A white dhoti with a border, worn with a shirt and angavastram.", hi: "बॉर्डर वाली सफ़ेद धोती, शर्ट और अंगवस्त्रम के साथ।" } },
          { src: "assets/img/indian-wear/bengal-tant.jpg", label: { en: "West Bengal: tant saree", hi: "पश्चिम बंगाल: तांत साड़ी" },
            note: { en: "Light, crisp handloom cotton, perfect for humid weather.", hi: "हल्की, कड़क हैंडलूम कॉटन, उमस वाले मौसम के लिए बढ़िया।" } },
          { src: "assets/img/indian-wear/sambalpuri.jpg", label: { en: "Odisha: Sambalpuri", hi: "ओडिशा: संबलपुरी" },
            note: { en: "Ikat sarees where the yarn is tie-dyed before weaving.", hi: "इकत साड़ियां, जिनमें बुनाई से पहले धागे को बांधकर रंगा जाता है।" } }
        ] },
        { t: "table", head: [ { en: "Region", hi: "इलाका" }, { en: "Women", hi: "महिलाएं" }, { en: "Men", hi: "पुरुष" } ], rows: [
          [ { en: "Rajasthan", hi: "राजस्थान" }, { en: "Ghagra, choli, odhni", hi: "घाघरा, चोली, ओढ़नी" }, { en: "Angrakha, dhoti, safa", hi: "अंगरखा, धोती, साफ़ा" } ],
          [ { en: "Punjab", hi: "पंजाब" }, { en: "Patiala suit, phulkari", hi: "पटियाला सूट, फुलकारी" }, { en: "Kurta, tehmat, pagg", hi: "कुर्ता, तहमत, पग" } ],
          [ { en: "Kashmir", hi: "कश्मीर" }, { en: "Pheran", hi: "फेरन" }, { en: "Pheran", hi: "फेरन" } ],
          [ { en: "Assam", hi: "असम" }, { en: "Mekhela chador", hi: "मेखेला चादर" }, { en: "Dhoti, gamosa", hi: "धोती, गमोसा" } ],
          [ { en: "Kerala", hi: "केरल" }, { en: "Kasavu / set mundu", hi: "कसावु / सेट मुंडू" }, { en: "Mundu", hi: "मुंडू" } ],
          [ { en: "Manipur", hi: "मणिपुर" }, { en: "Phanek and innaphi", hi: "फनेक और इन्नफ़ी" }, { en: "Dhoti, turban", hi: "धोती, पगड़ी" } ],
          [ { en: "Tamil Nadu", hi: "तमिलनाडु" }, { en: "Kanjeevaram saree", hi: "कांजीवरम साड़ी" }, { en: "Veshti", hi: "वेष्टि" } ]
        ] },
        { t: "tip", kind: "tip", text: {
          en: "When a designer 'takes inspiration' from a region, the best ones **work with local artisans** and credit the craft, not just copy the look.",
          hi: "जब कोई डिज़ाइनर किसी इलाके से 'प्रेरणा' लेता है, तो अच्छे डिज़ाइनर **वहां के कारीगरों के साथ काम करते हैं** और हस्तकला को क्रेडिट देते हैं, सिर्फ़ लुक कॉपी नहीं करते।" } },
        { t: "terms", items: [
          { en: "Odhni", hi: "ओढ़नी", def: { en: "A long veil-like cloth worn over the head and shoulders.", hi: "सिर और कंधों पर ओढ़ा जाने वाला लंबा कपड़ा।" } },
          { en: "Pheran", hi: "फेरन", def: { en: "A long, loose Kashmiri gown, usually of wool.", hi: "लंबा, ढीला कश्मीरी चोगा, आमतौर पर ऊन का।" } },
          { en: "Mekhela chador", hi: "मेखेला चादर", def: { en: "Assam's two-piece drape: a wrap skirt and an upper cloth.", hi: "असम का दो हिस्सों वाला पहनावा: लपेटने वाला स्कर्ट और ऊपर का कपड़ा।" } },
          { en: "Phanek", hi: "फनेक", def: { en: "A striped wrap skirt from Manipur.", hi: "मणिपुर का धारीदार लपेटने वाला स्कर्ट।" } },
          { en: "Kasavu", hi: "कसावु", def: { en: "The gold zari border on Kerala's cream sarees and mundus.", hi: "केरल की क्रीम साड़ियों और मुंडू पर सुनहरी ज़री का बॉर्डर।" } }
        ] },
        { t: "try", text: {
          en: "Pick one state you have never visited. Find 3 photos of its dress and make a mood board page with colours, fabrics and one sketch.",
          hi: "एक ऐसा राज्य चुनो जहां तुम कभी नहीं गईं। उसके पहनावे की 3 फ़ोटो ढूंढो और रंग, कपड़े और एक स्केच के साथ मूड बोर्ड का एक पेज बनाओ।" } }
      ]
    }
  ],
  quiz: [
    { q: { en: "What is the decorated end of a saree that falls over the shoulder called?", hi: "साड़ी का वो सजा हुआ सिरा जो कंधे पर गिरता है, क्या कहलाता है?" },
      options: [ { en: "Pleats", hi: "प्लीट्स" }, { en: "Pallu", hi: "पल्लू" }, { en: "Petticoat", hi: "पेटीकोट" } ], answer: 1,
      why: { en: "The pallu is the loose, decorated end worn over the shoulder.", hi: "पल्लू ही वो खुला, सजा सिरा है जो कंधे पर डाला जाता है।" }, dg: "indian-wear-saree-parts" },
    { q: { en: "How long is a nauvari saree?", hi: "नौवारी साड़ी कितनी लंबी होती है?" },
      options: [ { en: "5 yards", hi: "5 गज़" }, { en: "6 yards", hi: "6 गज़" }, { en: "9 yards", hi: "9 गज़" } ], answer: 2,
      why: { en: "Nau means nine: the Maharashtrian nauvari is 9 yards long.", hi: "नौ यानी नौ: महाराष्ट्र की नौवारी 9 गज़ लंबी होती है।" } },
    { q: { en: "In which drape does the pallu come over the right shoulder and spread across the front?", hi: "किस ड्रेप में पल्लू दाएं कंधे पर से आकर सामने फैलता है?" },
      options: [ { en: "Nivi", hi: "निवी" }, { en: "Gujarati seedha pallu", hi: "गुजराती सीधा पल्लू" }, { en: "Bengali", hi: "बंगाली" } ], answer: 1,
      why: { en: "In the seedha pallu style the pallu is shown off in front.", hi: "सीधा पल्लू स्टाइल में पल्लू सामने दिखाया जाता है।" }, src: "assets/img/indian-wear/gujarati-drape.jpg" },
    { q: { en: "A lehenga made of many triangular panels is called...", hi: "कई तिकोने पैनलों से बना लहंगा कहलाता है..." },
      options: [ { en: "Kalidar", hi: "कलीदार" }, { en: "Mermaid", hi: "मरमेड" }, { en: "A-line", hi: "ए-लाइन" } ], answer: 0,
      why: { en: "Each triangular panel is a kali, so the lehenga is kalidar.", hi: "हर तिकोना पैनल एक कली है, इसलिए लहंगा कलीदार कहलाता है।" }, dg: "indian-wear-lehenga", args: { type: "kalidar" } },
    { q: { en: "Which bottom is fitted to the knee and then flares out?", hi: "कौन सा बॉटम घुटने तक फ़िट होता है और फिर फैलता है?" },
      options: [ { en: "Sharara", hi: "शरारा" }, { en: "Palazzo", hi: "पलाज़ो" }, { en: "Gharara", hi: "गरारा" } ], answer: 2,
      why: { en: "A gharara has a joint at the knee; a sharara flares from the waist.", hi: "गरारे में घुटने पर जोड़ होता है; शरारा कमर से ही फैलता है।" } },
    { q: { en: "Why is a churidar called 'churidar'?", hi: "चूड़ीदार को 'चूड़ीदार' क्यों कहते हैं?" },
      options: [ { en: "It has bangles sewn on it", hi: "उस पर चूड़ियां सिली होती हैं" }, { en: "Its extra length bunches at the ankle like bangles", hi: "उसकी एक्स्ट्रा लंबाई टखने पर चूड़ियों जैसी इकट्ठी होती है" }, { en: "It comes from the city of Churu", hi: "ये चूरू शहर से आया है" } ], answer: 1,
      why: { en: "The rings of fabric at the ankle look like churis (bangles).", hi: "टखने पर कपड़े के छल्ले चूड़ियों जैसे दिखते हैं।" }, dg: "indian-wear-bottom", args: { type: "churidar" } },
    { q: { en: "A blouse with cup-shaped panels under the bust is a...", hi: "बस्ट के नीचे कटोरी जैसे पैनल वाला ब्लाउज़ होता है..." },
      options: [ { en: "Katori blouse", hi: "कटोरी ब्लाउज़" }, { en: "Boat-neck blouse", hi: "बोट-नेक ब्लाउज़" }, { en: "Keyhole blouse", hi: "कीहोल ब्लाउज़" } ], answer: 0,
      why: { en: "Katori means bowl: the cups give lift and shape.", hi: "कटोरी यानी कटोरा: ये कप उठान और शेप देते हैं।" } },
    { q: { en: "Which is a sleeveless jacket with a mandarin collar, worn over a kurta?", hi: "कुर्ते के ऊपर पहनी जाने वाली मैंडरिन कॉलर वाली बिना बाजू की जैकेट कौन सी है?" },
      options: [ { en: "Sherwani", hi: "शेरवानी" }, { en: "Achkan", hi: "अचकन" }, { en: "Nehru jacket", hi: "नेहरू जैकेट" } ], answer: 2,
      why: { en: "The Nehru jacket is short and sleeveless; the sherwani and achkan are long coats.", hi: "नेहरू जैकेट छोटी और बिना बाजू की है; शेरवानी और अचकन लंबे कोट हैं।" }, dg: "indian-wear-mens", args: { type: "nehru" } },
    { q: { en: "The mekhela chador comes from which state?", hi: "मेखेला चादर किस राज्य से है?" },
      options: [ { en: "Assam", hi: "असम" }, { en: "Kerala", hi: "केरल" }, { en: "Punjab", hi: "पंजाब" } ], answer: 0,
      why: { en: "It is Assam's two-piece drape, often woven in muga silk.", hi: "ये असम का दो हिस्सों वाला पहनावा है, अक्सर मूगा सिल्क में बुना।" } },
    { q: { en: "A long, loose woollen gown worn in Kashmir is a...", hi: "कश्मीर में पहना जाने वाला लंबा, ढीला ऊनी चोगा है..." },
      options: [ { en: "Phanek", hi: "फनेक" }, { en: "Pheran", hi: "फेरन" }, { en: "Kediyu", hi: "केडियू" } ], answer: 1,
      why: { en: "The pheran keeps people warm through Kashmir's cold winters.", hi: "फेरन कश्मीर की ठंडी सर्दियों में गर्म रखता है।" } }
  ]
});
