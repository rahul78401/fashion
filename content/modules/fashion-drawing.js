/* Module 4 - Fashion Drawing */
(function () {
  /* ---------- tiny geometry helpers (figure is drawn in "head units") ---------- */
  function n(v) { return Math.round(v * 10) / 10; }
  /* Build a path "d" from segments in head units: ["M",dx,y] ["L",dx,y] ["Q",cdx,cy,dx,y].
     dx = distance from the centre line (positive = left side), y = heads from the top. */
  function path(cx, top, H, segs, flip) {
    var s = "";
    segs.forEach(function (g) {
      var c = g[0], v = g.slice(1);
      s += c;
      for (var i = 0; i < v.length; i += 2) s += (i ? " " : "") + n(cx - (flip ? -1 : 1) * v[i] * H) + "," + n(top + v[i + 1] * H);
      s += " ";
    });
    return s.trim();
  }
  function stroke(d, cls) { return '<path d="' + d + '" class="' + cls + '"/>'; }
  /* left half + mirrored right half, as open strokes */
  function both(cx, top, H, segs, cls) {
    return stroke(path(cx, top, H, segs), cls) + stroke(path(cx, top, H, segs, true), cls);
  }
  /* closed symmetric shape: pts go down the left side from the centre top to the centre bottom */
  function sym(cx, top, H, pts, cls) {
    var left = path(cx, top, H, pts);
    var back = "";
    for (var i = pts.length - 1; i > 0; i--) {
      var g = pts[i], prev = pts[i - 1], pe = prev.slice(-2);
      if (g[0] === "Q") back += " Q" + n(cx + g[1] * H) + "," + n(top + g[2] * H) + " " + n(cx + pe[0] * H) + "," + n(top + pe[1] * H);
      else back += " L" + n(cx + pe[0] * H) + "," + n(top + pe[1] * H);
    }
    return '<path d="' + left + back + ' Z" class="' + cls + '"/>';
  }
  function line(x1, y1, x2, y2, cls, extra) {
    return '<line x1="' + n(x1) + '" y1="' + n(y1) + '" x2="' + n(x2) + '" y2="' + n(y2) + '" class="' + cls + '"' + (extra || "") + "/>";
  }
  function rot(px, py, ox, oy, deg) {
    var r = deg * Math.PI / 180, c = Math.cos(r), s = Math.sin(r);
    return [ox + (px - ox) * c - (py - oy) * s, oy + (px - ox) * s + (py - oy) * c];
  }

  /* ---------- the croquis, split into parts ---------- */
  function legs(L) { return { kn: 4 + L * 0.42, an: 4 + L * 0.88, so: 4 + L }; }
  var P = {
    head: function (cx, top, H, cls) {
      return '<ellipse cx="' + cx + '" cy="' + n(top + 0.5 * H) + '" rx="' + n(0.36 * H) + '" ry="' + n(0.5 * H) + '" class="' + cls + '"/>' +
        both(cx, top, H, [["M", 0.13, 0.93], ["L", 0.13, 1.32]], cls);
    },
    torso: function (cx, top, H, cls) {
      return both(cx, top, H, [["M", 0.13, 1.32], ["Q", 0.38, 1.36, 0.62, 1.48], ["Q", 0.72, 1.62, 0.64, 1.98],
        ["Q", 0.52, 2.5, 0.4, 3.0], ["Q", 0.66, 3.35, 0.68, 3.75]], cls);
    },
    legs: function (cx, top, H, L, cls) {
      var g = legs(L);
      return both(cx, top, H, [["M", 0.68, 3.75], ["Q", 0.66, (3.75 + g.kn) / 2, 0.44, g.kn], ["Q", 0.52, g.kn + (g.an - g.kn) * 0.3, 0.3, g.an],
        ["Q", 0.34, g.so, 0.22, g.so], ["L", 0.13, g.so], ["Q", 0.11, g.an + (g.so - g.an) * 0.4, 0.15, g.an],
        ["Q", 0.1, (g.kn + g.an) / 2, 0.14, g.kn], ["Q", 0.13, (4 + g.kn) / 2, 0.02, 4.05], ["L", 0, 4.07]], cls);
    },
    arms: function (cx, top, H, cls) {
      return both(cx, top, H, [["M", 0.62, 1.48], ["Q", 0.82, 1.9, 0.8, 2.9], ["Q", 0.83, 3.4, 0.84, 3.9], ["Q", 0.9, 4.3, 0.8, 4.7],
        ["Q", 0.72, 4.45, 0.74, 3.9], ["Q", 0.73, 3.4, 0.7, 2.9], ["Q", 0.68, 2.3, 0.64, 1.98]], cls);
    }
  };
  function figure(cx, top, H, L, cls) {
    return P.head(cx, top, H, cls) + P.torso(cx, top, H, cls) + P.legs(cx, top, H, L, cls) + P.arms(cx, top, H, cls);
  }

  /* 1. The 9-head fashion croquis with head-count guides */
  FD.diagram("fashion-drawing-croquis", function (a, lang) {
    var cx = 110, top = 14, H = 34, s = "";
    for (var k = 0; k <= 9; k++) s += line(36, top + k * H, 180, top + k * H, "gd");
    for (k = 1; k <= 9; k++) s += FD.text(26, top + (k - 0.5) * H + 4, String(k), { cls: "tm", size: 11 });
    s += figure(cx, top, H, 5, "ln");
    s += line(cx, top + 1.32 * H, cx, top + 9 * H, "ac", ' stroke-dasharray="4 4"');
    var lab = [
      [1, { en: "chin", hi: "ठुड्डी" }], [1.48, { en: "shoulders", hi: "कंधे" }], [2, { en: "bust", hi: "बस्ट" }],
      [3, { en: "waist", hi: "कमर" }], [4, { en: "hips / crotch", hi: "हिप्स" }], [4.7, { en: "fingertips", hi: "उंगलियां" }],
      [6.1, { en: "knees", hi: "घुटने" }], [8.4, { en: "ankles", hi: "टखने" }], [9, { en: "feet", hi: "पैर" }]
    ];
    lab.forEach(function (l) { s += FD.text(186, top + l[0] * H + 3, FD.tx(l[1], lang), { cls: "tx", anchor: "start", size: 10 }); });
    s += FD.text(cx, top + 9 * H + 14, FD.tx({ en: "balance line", hi: "बैलेंस लाइन" }, lang), { cls: "tm", size: 9 });
    return FD.svg(260, 340, s);
  });

  /* 2. Real body (7.5 heads) vs fashion figure (9 heads), same height */
  FD.diagram("fashion-drawing-real-vs-fashion", function (a, lang) {
    var top = 10, tall = 288, s = "";
    [[80, 7.5, 3.5], [230, 9, 5]].forEach(function (f, i) {
      var cx = f[0], H = tall / f[1];
      for (var k = 0; k <= Math.floor(f[1]); k++) s += line(cx - 52, top + k * H, cx + 52, top + k * H, "gd");
      if (f[1] % 1) s += line(cx - 52, top + tall, cx + 52, top + tall, "gd");
      s += figure(cx, top, H, f[2], "ln");
      var y1 = top + 4.07 * H, y2 = top + tall, bx = cx + 60;
      s += line(bx, y1, bx, y2, "ac") + line(bx - 4, y1, bx + 4, y1, "ac") + line(bx - 4, y2, bx + 4, y2, "ac");
      s += FD.text(bx - 3, (y1 + y2) / 2, FD.tx({ en: "legs", hi: "पैर" }, lang), { cls: "tm", size: 9, anchor: "end" });
      s += FD.text(cx, top + tall + 22, FD.tx(i ? { en: "Fashion: 9 heads", hi: "फ़ैशन: 9 हेड" } : { en: "Real: 7.5 heads", hi: "असली: 7.5 हेड" }, lang), { cls: "tx", size: 12 });
    });
    return FD.svg(320, 330, s);
  });

  /* 3. Step-by-step croquis (args.step = 1..6) */
  FD.diagram("fashion-drawing-steps", function (a) {
    var st = a.step || 6, cx = 80, top = 12, H = 31, s = "";
    function c(k) { return k === st ? "ac" : "ln"; }
    for (var k = 0; k <= 9; k++) s += line(cx - 44, top + k * H, cx + 44, top + k * H, "gd");
    s += line(cx, top + 1.32 * H, cx, top + 9 * H, st === 1 ? "ac" : "gd", ' stroke-dasharray="4 4"');
    if (st >= 2) s += P.head(cx, top, H, c(2));
    if (st >= 3) {
      var blk = [["M", 0.62, 1.48], ["L", 0.4, 3.0], ["L", 0.68, 3.75], ["L", 0.5, 4.07]];
      s += both(cx, top, H, blk, st === 3 ? "ac" : "gd");
      s += line(cx - 0.62 * H, top + 1.48 * H, cx + 0.62 * H, top + 1.48 * H, st === 3 ? "ac" : "gd");
      s += line(cx - 0.68 * H, top + 3.75 * H, cx + 0.68 * H, top + 3.75 * H, st === 3 ? "ac" : "gd");
      s += line(cx - 0.4 * H, top + 3 * H, cx + 0.4 * H, top + 3 * H, st === 3 ? "ac" : "gd");
      s += line(cx - 0.5 * H, top + 4.07 * H, cx + 0.5 * H, top + 4.07 * H, st === 3 ? "ac" : "gd");
    }
    if (st >= 4) s += P.torso(cx, top, H, c(4));
    if (st >= 5) s += P.legs(cx, top, H, 5, c(5));
    if (st >= 6) s += P.arms(cx, top, H, c(6));
    return FD.svg(160, 300, s);
  });

  /* 4. Gesture skeleton: front pose vs hip shift (contrapposto). args.pose = "front" | "shift" */
  FD.diagram("fashion-drawing-pose", function (a, lang) {
    var shift = a.pose === "shift", s = "", cx = 80;
    var neck = [80, 53];
    /* chest block + shoulders */
    var chestO = [80, 82], hipO = shift ? [77, 120] : [80, 120];
    var cRot = shift ? -5 : 0, hRot = shift ? 8 : 0;
    function R(p, o, d) { return rot(p[0], p[1], o[0], o[1], d); }
    var shL = R([60, 58], chestO, cRot), shR = R([100, 58], chestO, cRot);
    var wL = R([68, 104], hipO, hRot), wR = R([92, 104], hipO, hRot);
    var hx = hipO[0];
    var hL = R([hx - 21, 126], hipO, hRot), hR = R([hx + 21, 126], hipO, hRot);
    var crL = R([hx - 12, 137], hipO, hRot), crR = R([hx + 12, 137], hipO, hRot), crM = R([hx, 140], hipO, hRot);
    var jL = R([hx - 10, 133], hipO, hRot), jR = R([hx + 10, 133], hipO, hRot);
    function pl(pts, cls) { return '<polyline points="' + pts.map(function (p) { return n(p[0]) + "," + n(p[1]); }).join(" ") + '" class="' + cls + '"/>'; }
    function dot(p) { return '<circle cx="' + n(p[0]) + '" cy="' + n(p[1]) + '" r="2.6" class="acf"/>'; }
    /* balance line */
    s += line(cx, neck[1], cx, 292, "gd", ' stroke-dasharray="4 4"');
    s += line(20, 292, 140, 292, "gd");
    /* head */
    var hc = shift ? [78, 28] : [80, 28];
    s += '<ellipse cx="' + hc[0] + '" cy="' + hc[1] + '" rx="11" ry="15.5" class="ln"' + (shift ? ' transform="rotate(-6 ' + hc[0] + " " + hc[1] + ')"' : "") + "/>";
    s += line(hc[0], hc[1] + 15, neck[0], neck[1], "ln");
    /* blocks */
    var cwL = R([68, 104], chestO, cRot), cwR = R([92, 104], chestO, cRot);
    s += pl([shL, shR, cwR, cwL, shL], "ln");
    s += pl([wL, wR, hR, crR, crM, crL, hL, wL], "ln");
    s += line(shL[0], shL[1], shR[0], shR[1], "ac") + line(hL[0], hL[1], hR[0], hR[1], "ac");
    /* legs */
    var legL, legR, armL, armR;
    if (!shift) {
      legL = [jL, [72, 201], [75, 272], [72, 289]];
      legR = [jR, [88, 201], [85, 272], [88, 289]];
      armL = [shL, [53, 104], [51, 138], [50, 154]];
      armR = [shR, [107, 104], [109, 138], [110, 154]];
    } else {
      legL = [jL, [71, 201], [80, 272], [77, 289]];
      legR = [jR, [96, 204], [104, 268], [110, 284]];
      armL = [shL, [52, 107], [52, 140], [51, 156]];
      armR = [shR, [114, 96], [hR[0] + 2, hR[1] - 6]];
    }
    [legL, legR, armL, armR].forEach(function (lg) { s += pl(lg, "ln"); lg.slice(0, -1).forEach(function (p) { s += dot(p); }); });
    s += FD.text(cx, 304, FD.tx({ en: "balance line", hi: "बैलेंस लाइन" }, lang), { cls: "tm", size: 9 });
    return FD.svg(160, 308, s);
  });

  /* 5. Fashion face proportions */
  FD.diagram("fashion-drawing-face", function (a, lang) {
    var cx = 110, s = "";
    var ys = { top: 37, eye: 125, nose: 169, lip: 186, chin: 213, hair: 66 };
    s += line(cx, 30, cx, 220, "gd", ' stroke-dasharray="3 4"');
    [["hair", { en: "hairline", hi: "हेयरलाइन" }], ["eye", { en: "eyes = ½", hi: "आंखें = ½" }], ["nose", { en: "nose", hi: "नाक" }], ["lip", { en: "lips", hi: "होंठ" }], ["chin", { en: "chin", hi: "ठुड्डी" }]]
      .forEach(function (g) { s += line(40, ys[g[0]], 190, ys[g[0]], "gd") + FD.text(196, ys[g[0]] + 3, FD.tx(g[1], lang), { cls: "tm", size: 10, anchor: "start" }); });
    s += '<path d="M48,120 Q48,37 110,37 Q172,37 172,120 Q170,175 140,200 Q122,214 110,214 Q98,214 80,200 Q50,175 48,120 Z" class="ln"/>';
    /* eyes, brows, nose, lips, ears */
    s += FD.mirror(cx, '<path d="M72,125 Q85,114 98,125 Q85,131 72,125 Z" class="ln"/><circle cx="85" cy="124" r="4.5" class="acf"/>' +
      '<path d="M70,111 Q84,102 99,109" class="ln"/><path d="M48,122 Q40,124 42,140 Q45,158 54,160" class="ln"/>');
    s += '<path d="M106,164 Q110,170 114,164" class="ln"/><path d="M108,140 L106,160" class="gd"/>';
    s += '<path d="M95,186 Q103,179 110,183 Q117,179 125,186 Q110,197 95,186 Z" class="ac"/><path d="M95,186 L125,186" class="ln"/>';
    return FD.svg(280, 240, s);
  });

  /* 6. Hands and feet, the simple way */
  FD.diagram("fashion-drawing-hands-feet", function (a, lang) {
    var s = "";
    /* hand: palm box + finger block (construction) then outline */
    s += '<rect x="60" y="18" width="30" height="44" class="gd"/><path d="M60,62 L90,62 L86,104 L66,104 Z" class="gd"/>';
    s += '<path d="M64,18 L60,60 Q59,86 68,104 Q76,116 82,104 Q88,90 90,74 Q100,66 104,54 Q100,46 90,50 L88,18" class="ac"/>';
    s += line(67, 72, 69, 98, "ln") + line(74, 74, 76, 104, "ln") + line(81, 74, 82, 100, "ln");
    /* face of the same length */
    s += '<ellipse cx="140" cy="61" rx="30" ry="43" class="ln"/>';
    s += line(50, 18, 176, 18, "gd", ' stroke-dasharray="3 4"') + line(50, 104, 176, 104, "gd", ' stroke-dasharray="3 4"');
    s += FD.text(118, 128, FD.tx({ en: "hand ≈ face", hi: "हाथ ≈ चेहरा" }, lang), { cls: "tx", size: 11 });
    /* foot in a heel, side view */
    s += '<path d="M222,16 L222,70 Q240,100 285,135 Q300,146 300,152 Q300,158 292,158 L262,158 Q238,128 212,118 L214,122 L208,158 L204,158 L206,118 Q196,112 200,95 L200,16" class="ac"/>';
    s += line(262, 158, 304, 158, "gd") + line(196, 158, 214, 158, "gd");
    s += FD.text(252, 176, FD.tx({ en: "foot in a heel", hi: "हील में पैर" }, lang), { cls: "tx", size: 11 });
    return FD.svg(320, 186, s);
  });

  /* 7. Fold types. args.type = pipe | zigzag | drape | gathers | spiral | tension */
  FD.diagram("fashion-drawing-fold", function (a) {
    var t = a.type || "pipe", s = "";
    if (t === "pipe") {
      s += line(14, 18, 106, 18, "ln");
      s += '<path d="M20,18 L12,118 q11.5,10 23,0 q11.5,10 23,0 q11.5,10 23,0 q11.5,10 23,0 L100,18" class="fl"/>';
      [35, 58, 81].forEach(function (x) { s += '<path d="M' + (x + 1) + ',24 Q' + x + ',80 ' + x + ',118" class="ln"/>'; });
      [24, 47, 70, 93].forEach(function (x) { s += '<path d="M' + (x + 2) + ',70 L' + x + ',124" class="gd"/>'; });
    } else if (t === "zigzag") {
      s += '<path d="M40,12 L38,96 Q30,112 34,128 L88,128 Q92,112 84,96 L82,12" class="fl"/>';
      s += '<path d="M40,74 L62,84 L83,76" class="ln"/><path d="M38,92 L60,104 L84,94" class="ln"/><path d="M36,110 L58,120 L86,112" class="ln"/>';
      s += '<path d="M48,60 L60,68 L74,62" class="gd"/>';
    } else if (t === "drape") {
      s += '<circle cx="18" cy="22" r="3" class="acf"/><circle cx="102" cy="22" r="3" class="acf"/>';
      s += '<path d="M18,22 Q60,128 102,22 Q60,50 18,22 Z" class="fl"/>';
      s += '<path d="M18,22 Q60,74 102,22" class="ln"/><path d="M18,22 Q60,100 102,22" class="ln"/>';
    } else if (t === "gathers") {
      s += '<path d="M36,30 L10,124 Q20,132 32,124 Q44,132 56,124 Q68,132 80,124 Q92,132 104,124 Q112,128 110,122 L84,30 Z" class="fl"/>';
      s += '<rect x="32" y="18" width="56" height="12" rx="2" class="fl"/>';
      for (var i = 0; i < 9; i++) { var x = 38 + i * 5.5; s += '<path d="M' + n(x) + ',31 L' + n(x + (x - 60) * 0.5) + ',' + (48 + (i % 2) * 8) + '" class="ln"/>'; }
      s += '<path d="M32,124 L40,80" class="gd"/><path d="M56,124 L58,76" class="gd"/><path d="M80,124 L76,78" class="gd"/>';
    } else if (t === "spiral") {
      s += '<path d="M42,10 L38,130 L82,130 L78,10 Z" class="fl"/>';
      [34, 56, 78, 100].forEach(function (y) { s += '<path d="M39,' + (y + 10) + ' Q60,' + (y + 2) + ' 81,' + (y - 8) + '" class="ln"/>'; });
    } else {
      s += '<path d="M24,14 L14,128 L106,128 L96,14 Q60,26 24,14 Z" class="fl"/>';
      s += line(60, 22, 60, 128, "gd");
      s += '<circle cx="60" cy="60" r="3.2" class="acf"/><circle cx="60" cy="92" r="3.2" class="acf"/>';
      [[-1, 0], [1, 0]].forEach(function (d) {
        var sx = d[0];
        s += '<path d="M' + (60 + sx * 4) + ',60 Q' + (60 + sx * 20) + ',54 ' + (60 + sx * 38) + ',44" class="ln"/>';
        s += '<path d="M' + (60 + sx * 4) + ',62 Q' + (60 + sx * 22) + ',64 ' + (60 + sx * 40) + ',60" class="ln"/>';
        s += '<path d="M' + (60 + sx * 4) + ',64 Q' + (60 + sx * 20) + ',72 ' + (60 + sx * 36) + ',78" class="ln"/>';
      });
    }
    return FD.svg(120, 140, s);
  });

  /* 8. Fitted vs loose dress on the croquis. args.fit = fitted | loose */
  FD.diagram("fashion-drawing-fit", function (a) {
    var cx = 80, top = 12, H = 31, s = "";
    s += figure(cx, top, H, 5, "gd");
    if (a.fit === "loose") {
      s += sym(cx, top, H, [["M", 0, 1.62], ["Q", 0.22, 1.62, 0.28, 1.38], ["L", 0.64, 1.5], ["Q", 0.9, 1.95, 1.04, 2.55], ["L", 0.74, 2.42],
        ["Q", 0.9, 4.5, 1.2, 6.3], ["Q", 0.6, 6.5, 0, 6.42]], "fl");
      s += both(cx, top, H, [["M", 0.3, 2.3], ["Q", 0.36, 4.5, 0.5, 6.4]], "ln") + both(cx, top, H, [["M", 0.62, 3.2], ["Q", 0.8, 5, 0.92, 6.35]], "ln");
    } else {
      s += sym(cx, top, H, [["M", 0, 1.72], ["Q", 0.24, 1.72, 0.3, 1.4], ["L", 0.56, 1.5], ["Q", 0.5, 1.76, 0.64, 2.02],
        ["Q", 0.52, 2.5, 0.42, 3.0], ["Q", 0.72, 3.38, 0.7, 3.8], ["L", 0.58, 6.0], ["L", 0, 6.0]], "fl");
      s += both(cx, top, H, [["M", 0.4, 2.85], ["Q", 0.3, 2.95, 0.22, 3.0]], "ln") + both(cx, top, H, [["M", 0.6, 4.6], ["Q", 0.5, 4.75, 0.38, 4.8]], "ln");
    }
    return FD.svg(160, 300, s);
  });

  /* 9. A technical flat: kurta, front view */
  FD.diagram("fashion-drawing-flat", function () {
    var s = FD.mirror(100, '<path d="M100,26 L88,26 L86,38 L62,46 L36,112 L56,118 L66,74 L66,182 L58,222 L100,222" class="fl"/>' +
      '<path d="M41,104 L59,110" class="gd" stroke-dasharray="2 2"/><path d="M60,216 L100,216" class="gd" stroke-dasharray="2 2"/>' +
      '<path d="M66,182 L66,190" class="ln"/>');
    s += '<path d="M86,38 Q100,43 114,38" class="ln"/><rect x="96" y="41" width="8" height="70" class="ln"/>';
    [55, 75, 95].forEach(function (y) { s += '<circle cx="100" cy="' + y + '" r="2" class="ln"/>'; });
    return FD.svg(200, 240, s);
  });

  /* 10. Rendering swatches. args.fab = denim | satin | sheer | knit | print | sequins */
  FD.diagram("fashion-drawing-render", function (a) {
    var f = a.fab || "denim", id = "fdr-" + f, s = "", inner = "";
    var shape = "M14,14 L106,14 L106,112 Q90,128 74,116 Q58,104 42,120 Q26,134 14,118 Z";
    var defs = '<clipPath id="' + id + '-c"><path d="' + shape + '"/></clipPath>';
    if (f === "denim") {
      inner += '<rect width="120" height="140" fill="#3d5a87"/>';
      for (var i = -140; i < 140; i += 4) inner += '<line x1="' + i + '" y1="0" x2="' + (i + 140) + '" y2="140" stroke="#6f8cb8" stroke-width="1"/>';
      inner += '<path d="M14,34 L106,34" stroke="#e0a040" stroke-width="1.3" stroke-dasharray="3 2" fill="none"/><path d="M14,39 L106,39" stroke="#e0a040" stroke-width="1.3" stroke-dasharray="3 2" fill="none"/>';
      inner += '<path d="M60,40 L60,130" stroke="#2b4268" stroke-width="1.5"/><path d="M64,40 L64,130" stroke="#e0a040" stroke-width="1.2" stroke-dasharray="3 2"/>';
    } else if (f === "satin") {
      defs += '<linearGradient id="' + id + '-g" x1="0" y1="0" x2="1" y2="0.35"><stop offset="0" stop-color="#7a1f3d"/><stop offset="0.28" stop-color="#f2b6c8"/>' +
        '<stop offset="0.45" stop-color="#8e2748"/><stop offset="0.7" stop-color="#fbd9e3"/><stop offset="0.85" stop-color="#a3315a"/><stop offset="1" stop-color="#6b1a35"/></linearGradient>';
      inner += '<rect width="120" height="140" fill="url(#' + id + '-g)"/>';
      inner += '<path d="M36,14 Q30,70 40,130" stroke="#ffffff" stroke-width="3" opacity="0.7" fill="none"/><path d="M84,14 Q80,70 86,130" stroke="#ffffff" stroke-width="2" opacity="0.6" fill="none"/>';
    } else if (f === "sheer") {
      inner += '<rect width="120" height="140" fill="#fbf7f2"/><path d="M40,0 Q34,70 44,140 L84,140 Q90,70 80,0 Z" fill="#d9a77f"/>';
      inner += '<rect width="120" height="140" fill="#7fc4b3" opacity="0.42"/>';
      [[22, 34], [58, 70], [92, 102]].forEach(function (b) { inner += '<path d="M' + b[0] + ',0 Q' + (b[0] - 4) + ',70 ' + (b[0] + 2) + ',140 L' + (b[1] + 2) + ',140 Q' + (b[1] - 4) + ',70 ' + b[1] + ',0 Z" fill="#4fa792" opacity="0.4"/>'; });
    } else if (f === "knit") {
      inner += '<rect width="120" height="140" fill="#d8b48a"/>';
      for (var y = 6; y < 140; y += 8) for (var x = 4; x < 120; x += 10)
        inner += '<path d="M' + x + ',' + y + ' L' + (x + 5) + ',' + (y + 7) + ' L' + (x + 10) + ',' + y + '" stroke="#9c7448" stroke-width="1.4" fill="none"/>';
    } else if (f === "print") {
      inner += '<rect width="120" height="140" fill="#fff3df"/>';
      for (var r = 0; r < 6; r++) for (var c = 0; c < 5; c++) {
        var px = 10 + c * 24 + (r % 2) * 12, py = 12 + r * 24;
        inner += '<circle cx="' + px + '" cy="' + py + '" r="5" fill="#d9534f"/><circle cx="' + px + '" cy="' + py + '" r="1.8" fill="#f6c343"/>' +
          '<path d="M' + (px + 5) + ',' + (py + 4) + ' q5,2 7,7" stroke="#4c8c4a" stroke-width="1.6" fill="none"/>';
      }
    } else {
      inner += '<rect width="120" height="140" fill="#2d2f5a"/>';
      var cols = ["#9fa8da", "#ffffff", "#5c6bc0", "#c5cae9", "#7986cb"];
      for (var yy = 6, k = 0; yy < 140; yy += 7) for (var xx = 4 + ((yy / 7) % 2) * 3.5; xx < 120; xx += 7, k++)
        inner += '<circle cx="' + n(xx) + '" cy="' + yy + '" r="3" fill="' + cols[(k * 7 + yy) % 5] + '" opacity="' + ((k % 4) ? 0.85 : 1) + '"/>';
    }
    s += "<defs>" + defs + "</defs>" + '<g clip-path="url(#' + id + '-c)">' + inner + "</g>" + '<path d="' + shape + '" class="ln"/>';
    return FD.svg(120, 140, s);
  });
})();

var FDRAW = "assets/img/fashion-drawing/";

FD.module({
  id: "fashion-drawing",
  num: 4,
  level: "basic",
  title: { en: "Fashion Drawing", hi: "फ़ैशन ड्रॉइंग" },
  tagline: { en: "Draw the fashion figure and dress it with your ideas", hi: "फ़ैशन फ़िगर बनाना सीखो और उस पर अपने आइडिया पहनाओ" },
  cover: FDRAW + "cover.jpg",
  learn: [
    { en: "Pick the right pencils, pens, markers and paper for fashion sketching", hi: "फ़ैशन स्केचिंग के लिए सही पेंसिल, पेन, मार्कर और पेपर चुनना" },
    { en: "Draw the 9-head fashion figure (croquis) step by step", hi: "9 हेड वाली फ़ैशन फ़िगर (क्रोकी) स्टेप बाय स्टेप बनाना" },
    { en: "Sketch faces, hands and feet in a simple fashion way", hi: "चेहरा, हाथ और पैर फ़ैशन के आसान तरीके से बनाना" },
    { en: "Show how fabric falls, folds and shines on a body", hi: "बॉडी पर कपड़ा कैसे गिरता है, मुड़ता है और चमकता है — ये दिखाना" },
    { en: "Tell a flat sketch from an illustration, and render fabrics", hi: "फ़्लैट स्केच और इलस्ट्रेशन का फ़र्क समझना और फ़ैब्रिक रेंडर करना" }
  ],
  lessons: [
    {
      id: "drawing-kit",
      title: { en: "Your drawing kit", hi: "तुम्हारी ड्रॉइंग किट" },
      min: 6,
      blocks: [
        { t: "p", text: {
          en: "You do not need an expensive box of tools to start. A pencil, an eraser and a plain sketchbook are enough. Let us see what each tool does, so you buy only what you need.",
          hi: "शुरू करने के लिए महंगी किट की ज़रूरत नहीं है। एक पेंसिल, रबर और सादी स्केचबुक काफ़ी है। चलो देखते हैं हर चीज़ क्या काम करती है, ताकि तुम सिर्फ़ ज़रूरी चीज़ें ही खरीदो।" } },
        { t: "img", src: FDRAW + "designer-sketching.jpg", caption: {
          en: "A designer sketching at his desk: paper, pencil and ideas.",
          hi: "डिज़ाइनर अपनी टेबल पर स्केच करता हुआ: पेपर, पेंसिल और आइडिया।" } },
        { t: "img", src: FDRAW + "pencil-grades-eraser.jpg", caption: {
          en: "Pencils come in grades. B is soft and dark, H is hard and light. An eraser is a drawing tool too.",
          hi: "पेंसिलें अलग-अलग ग्रेड की होती हैं। B नरम और गहरी होती है, H सख़्त और हल्की। रबर भी एक ड्रॉइंग टूल है।" } },
        { t: "table", head: [{ en: "Pencil", hi: "पेंसिल" }, { en: "Feel", hi: "कैसी है" }, { en: "Use it for", hi: "किसलिए" }], rows: [
          ["HB", { en: "Medium, light", hi: "मीडियम, हल्की" }, { en: "First light guide lines", hi: "शुरुआती हल्की गाइड लाइनें" }],
          ["2B", { en: "Soft, dark", hi: "नरम, गहरी" }, { en: "Clean outline of the figure", hi: "फ़िगर की साफ़ आउटलाइन" }],
          ["4B", { en: "Very soft, black", hi: "बहुत नरम, काली" }, { en: "Shadows and bold lines", hi: "शैडो और गहरी लाइनें" }]
        ] },
        { t: "gallery", cols: 2, items: [
          { src: FDRAW + "fineliners.jpg", label: { en: "Fineliners", hi: "फ़ाइनलाइनर" }, note: { en: "0.1 to 0.5 mm. For final, crisp outlines.", hi: "0.1 से 0.5 mm। फ़ाइनल, साफ़ आउटलाइन के लिए।" } },
          { src: FDRAW + "alcohol-markers.jpg", label: { en: "Alcohol markers", hi: "अल्कोहल मार्कर" }, note: { en: "Smooth, blendable colour. Used by most designers.", hi: "चिकना, मिलने वाला रंग। ज़्यादातर डिज़ाइनर यही इस्तेमाल करते हैं।" } },
          { src: FDRAW + "colour-pencils.jpg", label: { en: "Colour pencils", hi: "कलर पेंसिल" }, note: { en: "Great for texture and soft shading.", hi: "टेक्सचर और हल्की शेडिंग के लिए बढ़िया।" } },
          { src: FDRAW + "watercolour-set.jpg", label: { en: "Watercolour", hi: "वॉटरकलर" }, note: { en: "Soft, flowing look for chiffon and silk.", hi: "शिफ़ॉन और सिल्क के लिए नरम, बहता हुआ लुक।" } }
        ] },
        { t: "h", text: { en: "Paper matters", hi: "पेपर भी मायने रखता है" } },
        { t: "p", text: {
          en: "Use an **A4** sketchbook for daily practice and **A3** for presentation sheets. For markers, buy **marker paper** (it is smooth and stops colour from bleeding through). Thin copier paper works for pencil only.",
          hi: "रोज़ की प्रैक्टिस के लिए **A4** स्केचबुक और प्रेज़ेंटेशन शीट के लिए **A3** लो। मार्कर के लिए **मार्कर पेपर** लो (ये चिकना होता है और रंग पीछे तक नहीं फैलता)। पतला कॉपियर पेपर सिर्फ़ पेंसिल के लिए ठीक है।" } },
        { t: "img", src: FDRAW + "sketchpad.jpg", caption: {
          en: "A spiral sketchpad lies flat, so it is easy to draw in.",
          hi: "स्पाइरल स्केचपैड सपाट खुलता है, इसलिए उसमें ड्रॉ करना आसान है।" } },
        { t: "img", src: FDRAW + "marker-sketchbook.jpg", caption: {
          en: "A sketchbook, a fineliner and alcohol markers: a complete starter set.",
          hi: "स्केचबुक, फ़ाइनलाइनर और अल्कोहल मार्कर — एक पूरा स्टार्टर सेट।" } },
        { t: "tip", kind: "tip", text: {
          en: "No **light box**? Tape your photo or pencil sketch to a bright window, put clean paper on top and trace. A phone screen at full brightness works too.",
          hi: "**लाइट बॉक्स (Light box)** नहीं है? अपनी फ़ोटो या पेंसिल स्केच को चमकती खिड़की पर टेप कर दो, ऊपर साफ़ पेपर रखो और ट्रेस करो। फ़ुल ब्राइटनेस पर फ़ोन की स्क्रीन भी चलेगी।" } },
        { t: "terms", items: [
          { en: "HB", hi: "एचबी", def: { en: "A medium pencil grade, not too light or dark.", hi: "मीडियम ग्रेड की पेंसिल, ज़्यादा हल्की या गहरी नहीं।" } },
          { en: "Fineliner", hi: "फ़ाइनलाइनर", def: { en: "A pen with a very thin, even tip.", hi: "बहुत पतली और बराबर नोक वाला पेन।" } },
          { en: "Alcohol marker", hi: "अल्कोहल मार्कर", def: { en: "A marker whose ink blends smoothly, used for colour.", hi: "ऐसा मार्कर जिसका रंग आसानी से मिल जाता है।" } },
          { en: "Light box", hi: "लाइट बॉक्स", def: { en: "A glowing table that lets you trace through paper.", hi: "चमकती टेबल जिससे पेपर के आर-पार देखकर ट्रेस कर सकते हैं।" } }
        ] },
        { t: "try", text: {
          en: "Take one pencil and draw a line from very light to very dark, pressing harder little by little. Do it with HB, then 2B. See the difference?",
          hi: "एक पेंसिल लो और एक लाइन खींचो — बहुत हल्की से बहुत गहरी, धीरे-धीरे ज़ोर बढ़ाते हुए। पहले HB से, फिर 2B से। फ़र्क दिखा?" } }
      ]
    },
    {
      id: "fashion-figure",
      title: { en: "The fashion figure (croquis)", hi: "फ़ैशन फ़िगर (क्रोकी)" },
      min: 7,
      blocks: [
        { t: "p", text: {
          en: "Fashion designers do not draw people exactly as they are. They draw a tall, slim figure called a **croquis** (say \"kro-kee\"). It is a blank body that shows off the clothes, like a hanger with legs.",
          hi: "फ़ैशन डिज़ाइनर लोगों को बिल्कुल वैसा नहीं बनाते जैसे वो हैं। वो एक लंबी, पतली फ़िगर बनाते हैं जिसे **क्रोकी (Croquis)** कहते हैं (बोलो \"क्रो-की\")। ये एक खाली बॉडी है जो कपड़ों को अच्छे से दिखाती है, जैसे पैरों वाला हैंगर।" } },
        { t: "p", text: {
          en: "We measure the body in **heads**: the height of the head is one unit. A real adult is about **7.5 heads** tall. A fashion figure is **9 heads** tall. All the extra length goes into the legs.",
          hi: "बॉडी को **हेड (Head)** में नापते हैं: सिर की ऊंचाई एक यूनिट है। असली इंसान लगभग **7.5 हेड** लंबा होता है। फ़ैशन फ़िगर **9 हेड** लंबी होती है। ये सारी एक्स्ट्रा लंबाई पैरों में जाती है।" } },
        { t: "dg", name: "fashion-drawing-real-vs-fashion", caption: {
          en: "Same height, different plan. Look how much longer the fashion legs are.",
          hi: "ऊंचाई एक जैसी, पर प्लान अलग। देखो फ़ैशन फ़िगर के पैर कितने लंबे हैं।" } },
        { t: "h", text: { en: "Where everything sits", hi: "हर चीज़ कहां आती है" } },
        { t: "dg", name: "fashion-drawing-croquis", caption: {
          en: "The 9-head croquis. Draw 10 light lines, each one head apart, and place the body on them.",
          hi: "9 हेड की क्रोकी। हल्की 10 लाइनें खींचो, हर एक हेड की दूरी पर, और बॉडी को उन पर रखो।" } },
        { t: "list", style: "check", items: [
          { en: "Head 1 ends at the **chin**. Shoulders are at about 1.5.", hi: "हेड 1 **ठुड्डी** पर खत्म होता है। कंधे लगभग 1.5 पर होते हैं।" },
          { en: "**Bust** at 2, **waist** at 3, **hips** at about 4.", hi: "**बस्ट** 2 पर, **कमर** 3 पर, **हिप्स** लगभग 4 पर।" },
          { en: "**Knees** at 6, **ankles** at about 8, feet end at 9.", hi: "**घुटने** 6 पर, **टखने** लगभग 8 पर, पैर 9 पर खत्म।" }
        ] },
        { t: "img", src: FDRAW + "cover.jpg", caption: {
          en: "A finished fashion illustration: see the long legs and small head.",
          hi: "तैयार फ़ैशन इलस्ट्रेशन: लंबे पैर और छोटा सिर देखो।" } },
        { t: "tip", kind: "remember", text: {
          en: "The **balance line** is an imaginary straight line from the pit of the neck to the floor. It keeps your figure from looking like it will fall over.",
          hi: "**बैलेंस लाइन (Balance line)** एक काल्पनिक सीधी लाइन है जो गर्दन के गड्ढे से ज़मीन तक जाती है। इसकी वजह से फ़िगर गिरती हुई नहीं लगती।" } },
        { t: "tip", kind: "fact", text: {
          en: "Some designers stretch to 10 heads for a dramatic, high-fashion look. Beginners are happy with 9, and some textbooks teach 8.",
          hi: "कुछ डिज़ाइनर ड्रामैटिक हाई-फ़ैशन लुक के लिए 10 हेड तक खींचते हैं। शुरुआत में 9 ठीक है, और कुछ किताबें 8 सिखाती हैं।" } },
        { t: "terms", items: [
          { en: "Croquis", hi: "क्रोकी", def: { en: "The basic fashion figure you dress with designs.", hi: "बेसिक फ़ैशन फ़िगर जिस पर तुम डिज़ाइन पहनाती हो।" } },
          { en: "Head unit", hi: "हेड यूनिट", def: { en: "One head's height, used to measure the whole figure.", hi: "एक सिर की ऊंचाई, जिससे पूरी फ़िगर नापी जाती है।" } },
          { en: "Balance line", hi: "बैलेंस लाइन", def: { en: "A straight line from neck pit to floor that keeps the pose steady.", hi: "गर्दन के गड्ढे से ज़मीन तक की सीधी लाइन जो पोज़ को स्थिर रखती है।" } },
          { en: "Proportion", hi: "प्रपोर्शन", def: { en: "How the sizes of the body parts relate to each other.", hi: "बॉडी के हिस्सों के साइज़ का आपस में रिश्ता।" } }
        ] },
        { t: "try", text: {
          en: "On a sheet, draw 10 light horizontal lines, each 3 cm apart. Number the gaps 1 to 9 and mark chin, waist, hips and knees on the lines.",
          hi: "एक शीट पर 10 हल्की आड़ी लाइनें खींचो, हर एक 3 सेमी की दूरी पर। खाली जगहों पर 1 से 9 नंबर लिखो और लाइनों पर ठुड्डी, कमर, हिप्स और घुटने मार्क करो।" } }
      ]
    },
    {
      id: "draw-croquis",
      title: { en: "Draw a croquis step by step", hi: "क्रोकी स्टेप बाय स्टेप बनाओ" },
      min: 8,
      blocks: [
        { t: "p", text: {
          en: "Now let us draw one. Work **light to dark**: first very faint guide lines, and only at the end a darker outline. Do not rush, and do not press hard in the beginning.",
          hi: "अब चलो एक क्रोकी बनाते हैं। **हल्के से गहरे** की तरफ़ चलो: पहले बहुत हल्की गाइड लाइनें, और आख़िर में गहरी आउटलाइन। जल्दी मत करो, और शुरू में ज़ोर से मत दबाओ।" } },
        { t: "steps", items: [
          { dg: "fashion-drawing-steps", args: { step: 1 }, title: { en: "Guide lines and balance line", hi: "गाइड लाइनें और बैलेंस लाइन" },
            text: { en: "Draw 10 head lines and one straight vertical balance line down the middle.", hi: "10 हेड लाइनें और बीच में एक सीधी खड़ी बैलेंस लाइन खींचो।" } },
          { dg: "fashion-drawing-steps", args: { step: 2 }, title: { en: "Head and neck", hi: "सिर और गर्दन" },
            text: { en: "An egg shape in the first box, with the neck as two short lines.", hi: "पहले बॉक्स में अंडे जैसा आकार बनाओ और गर्दन के लिए दो छोटी लाइनें।" } },
          { dg: "fashion-drawing-steps", args: { step: 3 }, title: { en: "Shoulder and hip blocks", hi: "शोल्डर और हिप ब्लॉक" },
            text: { en: "Chest block (wide at the shoulders, narrow at the waist) and a hip block below it.", hi: "चेस्ट ब्लॉक (कंधों पर चौड़ा, कमर पर पतला) और उसके नीचे हिप ब्लॉक।" } },
          { dg: "fashion-drawing-steps", args: { step: 4 }, title: { en: "Smooth the torso", hi: "धड़ को स्मूद करो" },
            text: { en: "Turn the blocks into one curvy line: shoulders, bust, waist, hips.", hi: "ब्लॉक को एक कर्व वाली लाइन में बदलो: कंधे, बस्ट, कमर, हिप्स।" } },
          { dg: "fashion-drawing-steps", args: { step: 5 }, title: { en: "Legs", hi: "पैर" },
            text: { en: "Long legs from the hips. Knee at line 6, ankle near line 8, pointed feet at 9.", hi: "हिप्स से लंबे पैर। घुटना लाइन 6 पर, टखना लाइन 8 के पास, नुकीले पैर 9 पर।" } },
          { dg: "fashion-drawing-steps", args: { step: 6 }, title: { en: "Arms and hands", hi: "बाहें और हाथ" },
            text: { en: "Elbows near the waist, wrists near the hip line, fingertips about mid-thigh.", hi: "कोहनी कमर के पास, कलाई हिप लाइन के पास, उंगलियों की नोक जांघ के बीच तक।" } }
        ] },
        { t: "h", text: { en: "Make it stand like a model", hi: "मॉडल की तरह खड़ा करो" } },
        { t: "p", text: {
          en: "A stiff, straight figure looks like a robot. Real models stand with weight on one leg. This is called **contrapposto**. The hip lifts on one side, and the shoulders tilt the other way.",
          hi: "सीधी-अकड़ी फ़िगर रोबोट जैसी लगती है। असली मॉडल एक पैर पर वज़न डालकर खड़ी होती हैं। इसे **कॉन्ट्रापोस्टो (Contrapposto)** कहते हैं। एक तरफ़ हिप ऊपर उठती है और कंधे दूसरी तरफ़ झुकते हैं।" } },
        { t: "compare", items: [
          { dg: "fashion-drawing-pose", args: { pose: "front" }, title: { en: "Front pose", hi: "सीधा पोज़" }, points: [
            { en: "Shoulder and hip lines are level", hi: "शोल्डर और हिप लाइन बराबर हैं" },
            { en: "Both legs share the weight", hi: "दोनों पैरों पर बराबर वज़न" },
            { en: "Good for showing a garment clearly", hi: "कपड़े को साफ़ दिखाने के लिए अच्छा" }] },
          { dg: "fashion-drawing-pose", args: { pose: "shift" }, title: { en: "Hip shift", hi: "हिप शिफ़्ट" }, points: [
            { en: "Hip line tilts one way, shoulders the other", hi: "हिप लाइन एक तरफ़, कंधे दूसरी तरफ़ झुके" },
            { en: "The standing leg sits under the balance line", hi: "सहारे वाला पैर बैलेंस लाइन के नीचे" },
            { en: "Looks natural and full of attitude", hi: "नैचुरल और एटीट्यूड से भरा लगता है" }] }
        ] },
        { t: "gallery", cols: 3, items: [
          { src: FDRAW + "croquis-dress.jpg", label: { en: "Front pose", hi: "सीधा पोज़" }, note: { en: "A simple pencil croquis in a dress", hi: "ड्रेस में सादी पेंसिल क्रोकी" } },
          { src: FDRAW + "croquis-suit-flat.jpg", label: { en: "Hand on hip", hi: "हाथ कमर पर" }, note: { en: "Gentle hip shift, flat drawn beside it", hi: "हल्की हिप शिफ़्ट, बगल में फ़्लैट" } },
          { src: FDRAW + "croquis-couture-pair.jpg", label: { en: "Walking pose", hi: "चलता हुआ पोज़" }, note: { en: "One foot forward, arm swinging", hi: "एक पैर आगे, बाज़ू झूलती हुई" } }
        ] },
        { t: "tip", kind: "mistake", text: {
          en: "Do not draw both legs and both shoulders level in every pose. Pose after pose will look stiff. Always tilt the hip line a little.",
          hi: "हर पोज़ में दोनों पैर और दोनों कंधे बराबर मत बनाओ। हर पोज़ अकड़ा हुआ लगेगा। हिप लाइन को हमेशा थोड़ा तिरछा रखो।" } },
        { t: "terms", items: [
          { en: "Contrapposto", hi: "कॉन्ट्रापोस्टो", def: { en: "A relaxed pose with weight on one leg and tilted hips and shoulders.", hi: "एक पैर पर वज़न वाला रिलैक्स पोज़, जिसमें हिप और कंधे तिरछे होते हैं।" } },
          { en: "Gesture", hi: "जेस्चर", def: { en: "A quick, loose sketch of the pose's movement.", hi: "पोज़ की चाल का जल्दी बना ढीला स्केच।" } },
          { en: "Three-quarter view", hi: "थ्री-क्वार्टर व्यू", def: { en: "The body turned halfway between front and side.", hi: "बॉडी आगे और बगल के बीच आधी घूमी हुई।" } }
        ] },
        { t: "try", text: {
          en: "Draw 5 quick stick-figure poses (1 minute each). In each, tilt the hip line one way and the shoulder line the other.",
          hi: "5 तेज़ स्टिक-फ़िगर पोज़ बनाओ (हर एक 1 मिनट में)। हर एक में हिप लाइन को एक तरफ़ और शोल्डर लाइन को दूसरी तरफ़ झुकाओ।" } }
      ]
    },
    {
      id: "face-hands-feet",
      title: { en: "Face, hair, hands & feet", hi: "चेहरा, बाल, हाथ और पैर" },
      min: 6,
      blocks: [
        { t: "p", text: {
          en: "In fashion drawing the clothes are the hero. So the face, hands and feet are kept **simple and stylised**. Many designers even leave the face almost blank. But the proportions still need to be right.",
          hi: "फ़ैशन ड्रॉइंग में हीरो कपड़े होते हैं। इसलिए चेहरा, हाथ और पैर **सिंपल और स्टाइलाइज़्ड** रखते हैं। कई डिज़ाइनर चेहरा लगभग खाली भी छोड़ देते हैं। पर प्रपोर्शन फिर भी सही होने चाहिए।" } },
        { t: "dg", name: "fashion-drawing-face", caption: {
          en: "Face map: eyes sit halfway down the head, the nose halfway between eyes and chin, lips a third below the nose.",
          hi: "चेहरे का नक्शा: आंखें सिर के आधे पर, नाक आंखों और ठुड्डी के बीच में, होंठ नाक से एक-तिहाई नीचे।" } },
        { t: "steps", items: [
          { title: { en: "Egg shape + centre line", hi: "अंडे का आकार + बीच की लाइन" }, text: { en: "Wider at the top, narrower at the chin.", hi: "ऊपर चौड़ा, ठुड्डी की तरफ़ पतला।" } },
          { title: { en: "Eye line at the middle", hi: "बीच में आंखों की लाइन" }, text: { en: "Space between the eyes is about one eye wide.", hi: "दोनों आंखों के बीच की दूरी लगभग एक आंख जितनी।" } },
          { title: { en: "Nose and lips", hi: "नाक और होंठ" }, text: { en: "Keep them small: a tiny curve for the nose, a soft shape for the lips.", hi: "इन्हें छोटा रखो: नाक के लिए छोटा कर्व, होंठों के लिए नरम आकार।" } },
          { title: { en: "Hair as one big shape", hi: "बाल एक बड़े आकार में" }, text: { en: "Draw the whole hair mass first, then add a few flowing strands.", hi: "पहले पूरे बालों का आकार बनाओ, फिर कुछ बहती लटें जोड़ो।" } }
        ] },
        { t: "dg", name: "fashion-drawing-hands-feet", caption: {
          en: "A hand is about as long as the face. Draw it as a mitten first, then split the fingers. Feet are long and pointed, like they are in heels.",
          hi: "हाथ लगभग चेहरे जितना लंबा होता है। पहले उसे दस्ताने की तरह बनाओ, फिर उंगलियां अलग करो। पैर लंबे और नुकीले बनाओ, जैसे हील में होते हैं।" } },
        { t: "gallery", cols: 2, items: [
          { src: FDRAW + "illustration-1920s.jpg", label: { en: "Simple face, strong style", hi: "सिंपल चेहरा, दमदार स्टाइल" }, note: { en: "A 1920s fashion plate", hi: "1920 के दशक की फ़ैशन प्लेट" } },
          { src: FDRAW + "sketch-notebook.jpg", label: { en: "Faceless is fine", hi: "बिना चेहरे के भी चलता है" }, note: { en: "The gown tells the story", hi: "गाउन ही कहानी कहता है" } }
        ] },
        { t: "tip", kind: "tip", text: {
          en: "Hands are hard. Hide them! Put one on the hip, in a pocket, or holding a bag. Practise real hands slowly in your free time.",
          hi: "हाथ बनाना मुश्किल है। उन्हें छुपा दो! एक हाथ कमर पर, जेब में या बैग पकड़े हुए रखो। खाली समय में धीरे-धीरे असली हाथों की प्रैक्टिस करो।" } },
        { t: "terms", items: [
          { en: "Stylised", hi: "स्टाइलाइज़्ड", def: { en: "Simplified and exaggerated on purpose, not realistic.", hi: "जानबूझकर आसान और बढ़ा-चढ़ाकर बनाया हुआ, असली जैसा नहीं।" } },
          { en: "Hairline", hi: "हेयरलाइन", def: { en: "The edge where the hair starts on the forehead.", hi: "माथे पर वो किनारा जहां से बाल शुरू होते हैं।" } },
          { en: "Mitten shape", hi: "मिटेन शेप", def: { en: "A hand drawn first as a simple block, without fingers.", hi: "हाथ को पहले बिना उंगलियों के सादे ब्लॉक की तरह बनाना।" } }
        ] },
        { t: "try", text: {
          en: "Draw 6 faces in a row using the face map, each 4 cm tall. Change only the hairstyle. Notice how the same face looks new.",
          hi: "फ़ेस मैप से 6 चेहरे एक लाइन में बनाओ, हर एक 4 सेमी ऊंचा। सिर्फ़ हेयरस्टाइल बदलो। देखो एक ही चेहरा कैसे नया लगता है।" } }
      ]
    },
    {
      id: "dressing-the-figure",
      title: { en: "Dressing the figure", hi: "फ़िगर को कपड़े पहनाना" },
      min: 7,
      blocks: [
        { t: "p", text: {
          en: "A garment is not a flat shape stuck on a body. Fabric hangs, bunches and stretches around the body underneath. If you understand the **folds**, your clothes will look real and soft.",
          hi: "कपड़ा बॉडी पर चिपका हुआ सपाट आकार नहीं होता। कपड़ा नीचे की बॉडी के चारों तरफ़ लटकता, इकट्ठा होता और खिंचता है। अगर तुम **फ़ोल्ड (Folds)** समझ लो, तो तुम्हारे कपड़े असली और नरम दिखेंगे।" } },
        { t: "gallery", cols: 3, items: [
          { dg: "fashion-drawing-fold", args: { type: "pipe" }, label: { en: "Pipe folds", hi: "पाइप फ़ोल्ड" }, note: { en: "Fabric hanging from a point", hi: "एक पॉइंट से लटकता कपड़ा" } },
          { dg: "fashion-drawing-fold", args: { type: "zigzag" }, label: { en: "Zigzag folds", hi: "ज़िगज़ैग फ़ोल्ड" }, note: { en: "At bends and hems", hi: "मोड़ और हेम पर" } },
          { dg: "fashion-drawing-fold", args: { type: "drape" }, label: { en: "Drape", hi: "ड्रेप" }, note: { en: "A swag between two points", hi: "दो पॉइंट के बीच झूलता कपड़ा" } },
          { dg: "fashion-drawing-fold", args: { type: "gathers" }, label: { en: "Gathers", hi: "गैदर" }, note: { en: "Fabric squeezed into a band", hi: "बैंड में समेटा गया कपड़ा" } },
          { dg: "fashion-drawing-fold", args: { type: "spiral" }, label: { en: "Spiral folds", hi: "स्पाइरल फ़ोल्ड" }, note: { en: "Fabric twisting around an arm or leg", hi: "बाज़ू या पैर पर घूमता कपड़ा" } },
          { dg: "fashion-drawing-fold", args: { type: "tension" }, label: { en: "Tension folds", hi: "टेंशन फ़ोल्ड" }, note: { en: "Pull lines from a tight spot", hi: "कसे हुए पॉइंट से खिंचाव की लाइनें" } }
        ] },
        { t: "p", text: {
          en: "Folds always start from a **tension point**: a place where the body holds or pulls the fabric, like the shoulder, bust, waist, elbow or knee. Draw those first, and the folds will follow.",
          hi: "फ़ोल्ड हमेशा **टेंशन पॉइंट** से शुरू होते हैं: वो जगह जहां बॉडी कपड़े को पकड़ती या खींचती है, जैसे कंधा, बस्ट, कमर, कोहनी या घुटना। पहले इन्हें बनाओ, फ़ोल्ड अपने आप आ जाएंगे।" } },
        { t: "compare", items: [
          { dg: "fashion-drawing-fit", args: { fit: "fitted" }, title: { en: "Fitted", hi: "फ़िटेड" }, points: [
            { en: "Follows the body line", hi: "बॉडी की लाइन पर चलता है" },
            { en: "Few folds, small pull lines near the waist", hi: "कम फ़ोल्ड, कमर के पास छोटी खिंचाव लाइनें" }] },
          { dg: "fashion-drawing-fit", args: { fit: "loose" }, title: { en: "Loose", hi: "लूज़" }, points: [
            { en: "Stands away from the body", hi: "बॉडी से दूर रहता है" },
            { en: "Long folds fall from the shoulder and bust", hi: "कंधे और बस्ट से लंबे फ़ोल्ड गिरते हैं" }] }
        ] },
        { t: "gallery", cols: 2, items: [
          { src: FDRAW + "gown-line-sketch.jpg", label: { en: "Folds in a line sketch", hi: "लाइन स्केच में फ़ोल्ड" }, note: { en: "A few flowing lines are enough", hi: "कुछ बहती लाइनें ही काफ़ी हैं" } },
          { src: FDRAW + "drapery-study.jpg", label: { en: "Drapery study", hi: "ड्रेपरी स्टडी" }, note: { en: "Shading shows where folds go in and out", hi: "शेडिंग दिखाती है फ़ोल्ड कहां अंदर और कहां बाहर हैं" } },
          { src: FDRAW + "drapery-folds.jpg", label: { en: "Heavy cloth", hi: "भारी कपड़ा" }, note: { en: "Thick fabric makes big, round folds", hi: "मोटा कपड़ा बड़े, गोल फ़ोल्ड बनाता है" } },
          { src: FDRAW + "sketchbook-ruffle.jpg", label: { en: "Ruffles and volume", hi: "रफ़ल और वॉल्यूम" }, note: { en: "Many layers make many folds", hi: "ज़्यादा लेयर, ज़्यादा फ़ोल्ड" } }
        ] },
        { t: "tip", kind: "tip", text: {
          en: "Fabric weight changes folds. Chiffon makes many small soft folds. Denim and wool make few big, stiff ones. Silk satin falls in long, smooth lines.",
          hi: "कपड़े के वज़न से फ़ोल्ड बदल जाते हैं। शिफ़ॉन में बहुत सारे छोटे नरम फ़ोल्ड बनते हैं। डेनिम और ऊन में कम और बड़े सख़्त फ़ोल्ड। सिल्क साटन लंबी, चिकनी लाइनों में गिरता है।" } },
        { t: "tip", kind: "mistake", text: {
          en: "Do not scatter folds randomly like wavy lines. Every fold must start or end at a tension point.",
          hi: "फ़ोल्ड को टेढ़ी-मेढ़ी लाइनों की तरह कहीं भी मत बिखेरो। हर फ़ोल्ड किसी टेंशन पॉइंट से शुरू या खत्म होना चाहिए।" } },
        { t: "terms", items: [
          { en: "Drape", hi: "ड्रेप", def: { en: "How a fabric hangs and falls on its own weight.", hi: "कपड़ा अपने वज़न से कैसे लटकता और गिरता है।" } },
          { en: "Gathers", hi: "गैदर", def: { en: "Small folds made by squeezing fabric onto a shorter edge.", hi: "कपड़े को छोटे किनारे पर समेटने से बने छोटे फ़ोल्ड।" } },
          { en: "Tension point", hi: "टेंशन पॉइंट", def: { en: "A spot where the body pulls or holds the fabric.", hi: "वो जगह जहां बॉडी कपड़े को खींचती या पकड़ती है।" } },
          { en: "Fitted", hi: "फ़िटेड", def: { en: "Close to the body shape.", hi: "बॉडी के आकार के करीब।" } }
        ] },
        { t: "try", text: {
          en: "Hang a dupatta from a hook or your finger. Sketch the folds in 3 minutes. Where do they start? That is your tension point.",
          hi: "एक दुपट्टा हुक या अपनी उंगली से लटकाओ। 3 मिनट में उसके फ़ोल्ड स्केच करो। वो कहां से शुरू होते हैं? वही तुम्हारा टेंशन पॉइंट है।" } }
      ]
    },
    {
      id: "flats-and-rendering",
      title: { en: "Flats, illustration & rendering", hi: "फ़्लैट, इलस्ट्रेशन और रेंडरिंग" },
      min: 8,
      blocks: [
        { t: "p", text: {
          en: "Designers draw in two ways. A **fashion illustration** shows the mood on a figure. A **flat** (technical sketch) shows exactly how the garment is made, so a tailor or factory can copy it.",
          hi: "डिज़ाइनर दो तरह से ड्रॉ करते हैं। **फ़ैशन इलस्ट्रेशन (Fashion illustration)** फ़िगर पर मूड दिखाता है। **फ़्लैट (Flat)** यानी टेक्निकल स्केच बिल्कुल दिखाता है कि कपड़ा कैसे बना है, ताकि दर्ज़ी या फ़ैक्टरी उसे कॉपी कर सके।" } },
        { t: "compare", items: [
          { dg: "fashion-drawing-flat", title: { en: "Flat", hi: "फ़्लैट" }, points: [
            { en: "No body, laid flat, front and back", hi: "बिना बॉडी के, सपाट, आगे और पीछे" },
            { en: "Both sides exactly the same", hi: "दोनों तरफ़ बिल्कुल एक जैसा" },
            { en: "Stitch lines, buttons, pockets shown", hi: "सिलाई की लाइनें, बटन, पॉकेट दिखाए जाते हैं" }] },
          { src: FDRAW + "three-gowns.jpg", title: { en: "Illustration", hi: "इलस्ट्रेशन" }, points: [
            { en: "Drawn on a posed figure", hi: "पोज़ वाली फ़िगर पर बना" },
            { en: "Shows mood, colour and fabric", hi: "मूड, रंग और कपड़ा दिखाता है" },
            { en: "Used for moodboards and selling the idea", hi: "मूडबोर्ड और आइडिया बेचने के लिए" }] }
        ] },
        { t: "img", src: FDRAW + "croquis-suit-flat.jpg", caption: {
          en: "A fashion plate with the small flat drawings beside the figure. Designers still do this today.",
          hi: "फ़ैशन प्लेट जिसमें फ़िगर के बगल में छोटे फ़्लैट ड्रॉइंग हैं। डिज़ाइनर आज भी ऐसा करते हैं।" } },
        { t: "tip", kind: "remember", text: {
          en: "Flat rules: use one clean line weight, draw it symmetrical (you can fold your paper to copy one half), and dash the stitching. You will see the style catalogue in Garment Details.",
          hi: "फ़्लैट के नियम: एक जैसी साफ़ लाइन, सिमेट्रिकल ड्रॉइंग (पेपर मोड़कर आधा हिस्सा कॉपी कर सकती हो), और सिलाई डैश लाइन में। स्टाइल का कैटलॉग तुम गारमेंट डिटेल्स में देखोगी।" } },
        { t: "h", text: { en: "Rendering fabrics", hi: "फ़ैब्रिक रेंडर करना" } },
        { t: "p", text: {
          en: "**Rendering** means colouring a drawing so you can see what the fabric is. The trick is simple: look at how the fabric catches light.",
          hi: "**रेंडरिंग (Rendering)** यानी ड्रॉइंग में रंग भरना ताकि पता चले कि कपड़ा कौन सा है। ट्रिक आसान है: देखो कपड़ा रोशनी को कैसे पकड़ता है।" } },
        { t: "gallery", cols: 3, items: [
          { dg: "fashion-drawing-render", args: { fab: "denim" }, label: { en: "Denim", hi: "डेनिम" }, note: { en: "Diagonal twill lines and orange stitching", hi: "तिरछी ट्विल लाइनें और नारंगी सिलाई" } },
          { dg: "fashion-drawing-render", args: { fab: "satin" }, label: { en: "Satin", hi: "साटन" }, note: { en: "Leave white streaks, keep dark next to them", hi: "सफ़ेद चमक छोड़ो, उसके पास गहरा रंग रखो" } },
          { dg: "fashion-drawing-render", args: { fab: "sheer" }, label: { en: "Chiffon", hi: "शिफ़ॉन" }, note: { en: "Light colour, skin shows through", hi: "हल्का रंग, स्किन दिखती है" } },
          { dg: "fashion-drawing-render", args: { fab: "knit" }, label: { en: "Knit", hi: "निट" }, note: { en: "Rows of small V stitches", hi: "छोटी V सिलाई की कतारें" } },
          { dg: "fashion-drawing-render", args: { fab: "print" }, label: { en: "Print", hi: "प्रिंट" }, note: { en: "Repeat the motif, let it bend with folds", hi: "मोटिफ़ दोहराओ, फ़ोल्ड के साथ मुड़ने दो" } },
          { dg: "fashion-drawing-render", args: { fab: "sequins" }, label: { en: "Sequins", hi: "सीक्वेन" }, note: { en: "Dots, with a few bright white sparkles", hi: "डॉट्स, और कुछ चमकती सफ़ेद चिंगारियां" } }
        ] },
        { t: "img", src: FDRAW + "satin.jpg", caption: {
          en: "Real satin: sharp bright highlights right next to deep dark folds. Copy that contrast.",
          hi: "असली साटन: गहरे फ़ोल्ड के ठीक पास तेज़ चमकदार हाइलाइट। यही कंट्रास्ट कॉपी करो।" } },
        { t: "gallery", cols: 3, items: [
          { src: FDRAW + "chiffon-shawl.jpg", label: { en: "Real chiffon", hi: "असली शिफ़ॉन" }, note: { en: "Soft and see-through", hi: "नरम और आर-पार दिखने वाला" } },
          { src: FDRAW + "chiffon-sleeve.jpg", label: { en: "Sheer sleeve", hi: "पारदर्शी आस्तीन" }, note: { en: "Skin shows through, colour looks lighter", hi: "स्किन दिखती है, रंग हल्का लगता है" } },
          { src: FDRAW + "sequins.jpg", label: { en: "Real sequins", hi: "असली सीक्वेन" }, note: { en: "Tiny mirrors that flash", hi: "छोटे शीशे जो चमकते हैं" } }
        ] },
        { t: "img", src: FDRAW + "watercolour-sketch.jpg", caption: {
          en: "Watercolour on a sketch: loose and flowing, perfect for soft fabrics.",
          hi: "स्केच पर वॉटरकलर: खुला और बहता हुआ, नरम कपड़ों के लिए एकदम सही।" } },
        { t: "h", text: { en: "Marker tips", hi: "मार्कर टिप्स" } },
        { t: "list", style: "check", items: [
          { en: "Colour in light-to-dark order. You cannot make a dark marker lighter.", hi: "हल्के से गहरे के क्रम में रंग भरो। गहरा मार्कर हल्का नहीं हो सकता।" },
          { en: "Work fast and keep the edge wet so there are no streaks.", hi: "तेज़ी से काम करो और किनारे को गीला रखो, ताकि धारियां न पड़ें।" },
          { en: "Add shadows with a slightly darker marker, highlights with a white gel pen.", hi: "थोड़े गहरे मार्कर से शैडो और सफ़ेद जेल पेन से हाइलाइट जोड़ो।" },
          { en: "Put scrap paper under your sheet. Markers bleed.", hi: "शीट के नीचे रफ़ पेपर रखो। मार्कर पीछे तक फैलते हैं।" }
        ] },
        { t: "terms", items: [
          { en: "Flat", hi: "फ़्लैट", def: { en: "A technical drawing of a garment, laid flat, with no body.", hi: "कपड़े का टेक्निकल ड्रॉइंग, सपाट, बिना बॉडी के।" } },
          { en: "Illustration", hi: "इलस्ट्रेशन", def: { en: "A stylish drawing of a design on a figure.", hi: "फ़िगर पर डिज़ाइन का स्टाइलिश ड्रॉइंग।" } },
          { en: "Rendering", hi: "रेंडरिंग", def: { en: "Colouring and shading to show fabric and light.", hi: "रंग और शेडिंग से कपड़ा और रोशनी दिखाना।" } },
          { en: "Highlight", hi: "हाइलाइट", def: { en: "The brightest spot where light hits a shiny fabric.", hi: "चमकदार कपड़े पर सबसे ज़्यादा रोशनी वाली जगह।" } }
        ] },
        { t: "try", text: {
          en: "Draw one simple kurta flat (half, then mirror it). Then draw the same kurta on a croquis and colour it in satin and in cotton. Compare.",
          hi: "एक सादे कुर्ते का फ़्लैट बनाओ (आधा बनाकर मिरर करो)। फिर वही कुर्ता क्रोकी पर बनाओ और साटन और कॉटन दोनों में रंग भरो। तुलना करो।" } }
      ]
    }
  ],
  quiz: [
    { q: { en: "How many heads tall is a fashion figure?", hi: "फ़ैशन फ़िगर कितने हेड लंबी होती है?" },
      options: [{ en: "5 heads", hi: "5 हेड" }, { en: "7.5 heads", hi: "7.5 हेड" }, { en: "9 heads", hi: "9 हेड" }], answer: 2,
      why: { en: "A real body is about 7.5 heads. A fashion figure stretches to 9 heads, mostly in the legs.", hi: "असली बॉडी लगभग 7.5 हेड की होती है। फ़ैशन फ़िगर 9 हेड तक खिंचती है, ज़्यादातर पैरों में।" },
      dg: "fashion-drawing-real-vs-fashion" },
    { q: { en: "Where do the waist and the knees sit on a 9-head croquis?", hi: "9 हेड की क्रोकी पर कमर और घुटने कहां आते हैं?" },
      options: [{ en: "Waist at 2, knees at 4", hi: "कमर 2 पर, घुटने 4 पर" }, { en: "Waist at 3, knees at 6", hi: "कमर 3 पर, घुटने 6 पर" }, { en: "Waist at 5, knees at 8", hi: "कमर 5 पर, घुटने 8 पर" }], answer: 1,
      why: { en: "Bust is at 2, waist at 3, hips at about 4, knees at 6.", hi: "बस्ट 2 पर, कमर 3 पर, हिप्स लगभग 4 पर, घुटने 6 पर।" },
      dg: "fashion-drawing-croquis" },
    { q: { en: "Which pencil is best for the first light guide lines?", hi: "शुरुआती हल्की गाइड लाइनों के लिए कौन सी पेंसिल सबसे अच्छी है?" },
      options: [{ en: "4B", hi: "4B पेंसिल" }, { en: "HB", hi: "HB पेंसिल" }, { en: "A marker", hi: "मार्कर" }], answer: 1,
      why: { en: "HB is light and easy to erase. Use 2B or 4B later for darker lines.", hi: "HB हल्की है और आसानी से मिट जाती है। गहरी लाइनों के लिए बाद में 2B या 4B लो।" },
      src: FDRAW + "pencil-grades-eraser.jpg" },
    { q: { en: "What is the balance line?", hi: "बैलेंस लाइन क्या है?" },
      options: [{ en: "The line of the hem", hi: "हेम की लाइन" }, { en: "A straight line from the neck pit to the floor", hi: "गर्दन के गड्ढे से ज़मीन तक सीधी लाइन" }, { en: "The outline of the face", hi: "चेहरे की आउटलाइन" }], answer: 1,
      why: { en: "It keeps the pose steady. The standing foot should sit near it.", hi: "ये पोज़ को स्थिर रखती है। सहारे वाला पैर इसके पास होना चाहिए।" },
      dg: "fashion-drawing-pose", args: { pose: "shift" } },
    { q: { en: "In a hip-shift pose, if the left hip goes up, the shoulders...", hi: "हिप-शिफ़्ट पोज़ में अगर बायीं हिप ऊपर जाए, तो कंधे..." },
      options: [{ en: "stay perfectly level", hi: "बिल्कुल बराबर रहते हैं" }, { en: "tilt the same way", hi: "उसी तरफ़ झुकते हैं" }, { en: "tilt the opposite way", hi: "उल्टी तरफ़ झुकते हैं" }], answer: 2,
      why: { en: "Hips and shoulders tilt in opposite directions. That is what makes the pose look natural.", hi: "हिप और कंधे उल्टी दिशाओं में झुकते हैं। यही पोज़ को नैचुरल बनाता है।" } },
    { q: { en: "Where do the eyes sit on a fashion face?", hi: "फ़ैशन चेहरे में आंखें कहां होती हैं?" },
      options: [{ en: "At the top third", hi: "ऊपर के एक-तिहाई पर" }, { en: "Near the chin", hi: "ठुड्डी के पास" }, { en: "Halfway down the head", hi: "सिर के बिल्कुल आधे पर" }], answer: 2,
      why: { en: "The eye line is at the middle of the head, not near the top.", hi: "आंखों की लाइन सिर के बीच में होती है, ऊपर नहीं।" },
      dg: "fashion-drawing-face" },
    { q: { en: "Folds in fabric always start from...", hi: "कपड़े के फ़ोल्ड हमेशा कहां से शुरू होते हैं?" },
      options: [{ en: "Random places", hi: "कहीं भी, रैंडम" }, { en: "A tension point like the bust, waist or knee", hi: "टेंशन पॉइंट से, जैसे बस्ट, कमर या घुटना" }, { en: "The hem only", hi: "सिर्फ़ हेम से" }], answer: 1,
      why: { en: "The body holds or pulls the cloth at tension points, so folds begin or end there.", hi: "बॉडी टेंशन पॉइंट पर कपड़े को पकड़ती या खींचती है, इसलिए फ़ोल्ड वहीं से शुरू या खत्म होते हैं।" },
      dg: "fashion-drawing-fold", args: { type: "tension" } },
    { q: { en: "What is a flat?", hi: "फ़्लैट क्या होता है?" },
      options: [{ en: "A shoe with no heel", hi: "बिना हील का जूता" }, { en: "A painting of a model", hi: "मॉडल की पेंटिंग" }, { en: "A technical drawing of a garment laid flat", hi: "कपड़े का सपाट रखा टेक्निकल ड्रॉइंग" }], answer: 2,
      why: { en: "A flat has no body and shows all the construction details for the tailor.", hi: "फ़्लैट में बॉडी नहीं होती और दर्ज़ी के लिए सारी बनावट की डिटेल दिखती है।" },
      dg: "fashion-drawing-flat" },
    { q: { en: "How do you draw satin so it looks shiny?", hi: "साटन को चमकदार दिखाने के लिए क्या करो?" },
      options: [{ en: "Colour it in one flat shade", hi: "एक ही सपाट शेड में रंगो" }, { en: "Leave bright white streaks next to dark shadows", hi: "गहरी छाया के पास चमकती सफ़ेद धारियां छोड़ो" }, { en: "Draw lots of tiny dots", hi: "बहुत सारे छोटे डॉट्स बनाओ" }], answer: 1,
      why: { en: "Strong contrast between highlight and dark creates the shine.", hi: "हाइलाइट और गहरे रंग का तेज़ कंट्रास्ट ही चमक बनाता है।" },
      dg: "fashion-drawing-render", args: { fab: "satin" } }
  ]
});
