/* Technical flat sketches (front view) for Module 5 "Garment Details".
   Diagrams: flat-silhouette, flat-dress, flat-neckline, flat-collar, flat-sleeve, flat-skirt,
   flat-trouser (args: { type }), plus garment-waistlines and garment-hemlines. */
(function () {
  var FD = window.FD;
  var W = 120;

  function mx(x) { return Math.round((W - x) * 10) / 10; }
  /* Closed symmetric outline: `start` lies on the centre line (x = 60); `segs` trace the LEFT half
     (absolute L / Q / C commands) and must end on the centre line. The right half is mirrored. */
  function sym(start, segs) {
    var d = "M" + start[0] + " " + start[1], cur = start, hist = [];
    segs.forEach(function (s) {
      d += " " + s[0] + s.slice(1).join(" ");
      hist.push({ s: s, from: cur });
      cur = [s[s.length - 2], s[s.length - 1]];
    });
    for (var i = hist.length - 1; i >= 0; i--) {
      var s = hist[i].s, f = hist[i].from;
      if (s[0] === "L") d += " L" + mx(f[0]) + " " + f[1];
      else if (s[0] === "Q") d += " Q" + mx(s[1]) + " " + s[2] + " " + mx(f[0]) + " " + f[1];
      else d += " C" + mx(s[3]) + " " + s[4] + " " + mx(s[1]) + " " + s[2] + " " + mx(f[0]) + " " + f[1];
    }
    return d + " Z";
  }
  function body(d) { return '<path class="fl" d="' + d + '"/>'; }
  function piece(d) { return '<path class="fl" d="' + d + '"/>'; }
  function soft(d) { return '<path class="sf" d="' + d + '"/>'; }
  function dt(d) { return '<path class="ln" stroke-width="1" d="' + d + '"/>'; }
  function st(d) { return '<path class="ln" stroke-width=".8" stroke-dasharray="2 1.6" d="' + d + '"/>'; }
  function both(svgPart) { return FD.mirror(60, svgPart); }
  function btn(x, y, r) { return '<circle class="fl" stroke-width="1" cx="' + x + '" cy="' + y + '" r="' + (r || 1.6) + '"/>'; }
  function buttons(x, ys, r) { return ys.map(function (y) { return btn(x, y, r); }).join(""); }
  function wrap(h, inner) { return FD.svg(W, h, inner, "flat"); }

  /* ---------------- NECKLINES (on a sleeveless shell top) ---------------- */
  function shell(start, neck, sp) {
    sp = sp || [30, 22];
    return sym(start, neck.concat([["L", sp[0], sp[1]], ["Q", 38, 40, 31, 52], ["Q", 34, 86, 29, 120], ["Q", 44, 123, 60, 123]]));
  }
  function backNeck(x, y, dip) { return dt("M" + x + " " + y + " Q60 " + (y + (dip || 4)) + " " + mx(x) + " " + y); }
  var NECK = {
    round: function () { return body(shell([60, 28], [["C", 53, 28, 47, 24, 47, 16]])) + backNeck(47, 16); },
    scoop: function () { return body(shell([60, 46], [["C", 50, 46, 45, 36, 45, 16]])) + backNeck(45, 16); },
    v: function () { return body(shell([60, 46], [["L", 47, 16]])) + backNeck(47, 16); },
    square: function () { return body(shell([60, 40], [["L", 48, 40], ["L", 48, 16]])) + backNeck(48, 16); },
    sweetheart: function () { return body(shell([60, 38], [["C", 57, 29, 50, 25, 46, 30], ["L", 45, 16]], [35, 17])) + dt("M45 16 Q60 25 75 16"); },
    boat: function () { return body(shell([60, 21], [["C", 52, 21, 44, 19, 40, 15]], [29, 20])) + backNeck(40, 15, 3); },
    offshoulder: function () {
      return body(sym([60, 30], [["Q", 40, 31, 21, 26], ["L", 19, 42], ["L", 31, 47], ["Q", 34, 86, 29, 120], ["Q", 44, 123, 60, 123]])) +
        dt("M60 35 Q40 36 21.5 31 M98.5 31 Q80 36 60 35");
    },
    halter: function () {
      return body(sym([60, 44], [["L", 53, 8], ["L", 47, 8], ["Q", 42, 38, 31, 52], ["Q", 34, 86, 29, 120], ["Q", 44, 123, 60, 123]])) +
        '<path class="ln" d="M53 8 Q60 3 67 8"/>';
    },
    high: function () {
      return body(sym([60, 4], [["Q", 54, 3.5, 48, 4], ["L", 47, 17], ["L", 30, 23], ["Q", 38, 40, 31, 52], ["Q", 34, 86, 29, 120], ["Q", 44, 123, 60, 123]])) +
        dt("M47 17 Q60 21 73 17") + dt("M47.5 10.5 Q60 13.5 72.5 10.5") + st("M51 5 L51 10.5 M55.5 4.5 L55.5 11.5 M60 4.3 L60 12 M64.5 4.5 L64.5 11.5 M69 5 L69 10.5");
    },
    cowl: function () {
      return body(shell([60, 46], [["C", 50, 46, 45, 34, 45, 16]])) + backNeck(45, 16) +
        dt("M46 22 Q60 33 74 22") + dt("M47 29 Q60 40 73 29") + dt("M49.5 36 Q60 44 70.5 36");
    },
    keyhole: function () {
      return body(shell([60, 26], [["C", 53, 26, 47, 22, 47, 16]])) + backNeck(47, 16) +
        '<path class="sf" stroke="currentColor" stroke-width="1.2" d="M60 26 C55.5 31 55.5 40 60 42 C64.5 40 64.5 31 60 26 Z"/>' + btn(60, 25, 1.3);
    },
    oneshoulder: function () {
      return body("M45 16 L32 20 Q38 40 31 52 Q34 86 29 120 Q44 123 60 123 Q76 123 91 120 Q86 86 89 52 C76 46 58 30 45 16 Z") +
        dt("M50 22 C62 32 74 40 85 47");
    }
  };

  /* ---------------- SLEEVES (on a fitted round-neck top) ---------------- */
  function top(sleeve, opt) {
    opt = opt || {};
    var segs = [["C", 55, 22, 50, 19, 50, 13]];
    if (!opt.noShoulder) segs.push(["L", 38, 19]);
    segs = segs.concat(sleeve);
    segs = segs.concat(opt.side || [["Q", 41, 84, 37, 120], ["Q", 48, 123, 60, 123]]);
    return body(sym([60, 22], segs)) + dt("M50 13 Q60 17 70 13");
  }
  var seam = both(dt("M38 19 Q41 34 39 46"));
  var SLEEVE = {
    sleeveless: function () { return top([["Q", 44, 36, 39, 48]]); },
    cap: function () { return top([["Q", 31, 19, 28, 28], ["Q", 33, 31, 38, 33], ["Q", 40, 40, 39, 46]]) + both(dt("M38 19 Q39.5 26 38 33")); },
    short: function () { return top([["L", 22, 42], ["L", 32, 49], ["L", 39, 46]]) + seam + both(st("M23.5 39 L33 45.6")); },
    puff: function () {
      return top([["C", 26, 12, 14, 30, 22, 41], ["L", 31, 48], ["L", 39, 46]]) + seam +
        both(dt("M35 21 l-1.5 3 M32 21.5 l-2 3 M29.5 23 l-2 2.5 M24.5 39.5 l1.2 -3.4 M27.5 41.6 l1 -3.4 M30.5 43.7 l.8 -3.4"));
    },
    flutter: function () {
      return top([["C", 30, 22, 22, 36, 14, 46], ["Q", 19, 44, 22, 48], ["Q", 26, 46, 29, 50], ["Q", 32, 48, 36, 50], ["L", 39, 46]]) + seam +
        both(dt("M34 24 Q27 36 21 47") + dt("M36.5 29 Q32 40 29 49"));
    },
    threequarter: function () { return top([["L", 24, 78], ["L", 33, 81], ["L", 39, 46]]) + seam + both(st("M24.5 75 L33.3 77.8")); },
    full: function () { return top([["L", 21, 104], ["L", 30, 106], ["L", 39, 46]]) + seam + both(dt("M21.7 97 L30.4 99.4") + btn(25.8, 101.6, 1)); },
    bell: function () { return top([["Q", 28, 58, 12, 102], ["Q", 21, 108, 31, 103], ["Q", 33, 74, 39, 46]]) + seam + both(dt("M31 58 Q26 80 21 104")); },
    bishop: function () {
      return top([["C", 28, 52, 12, 82, 20, 95], ["L", 21, 104], ["L", 31, 105], ["L", 31, 96], ["C", 35, 84, 38, 62, 39, 46]]) + seam +
        both(dt("M20 95 L31 96") + dt("M22.5 92 l.8 3 M25.5 92 l.4 3.4 M28.5 92.5 l.2 3.4"));
    },
    raglan: function () {
      return top([["Q", 36, 16, 22, 42], ["L", 32, 49], ["L", 39, 46]], { noShoulder: true }) + both(dt("M53.1 19.7 Q46 30 39 46"));
    },
    kimono: function () {
      return top([["L", 12, 30], ["L", 16, 52], ["Q", 34, 56, 39, 86]], { noShoulder: true, side: [["Q", 40, 104, 37, 120], ["Q", 48, 123, 60, 123]] }) +
        both(dt("M16 34 Q24 44 30 70"));
    },
    coldshoulder: function () {
      return top([["L", 24, 74], ["L", 33, 77], ["L", 39, 46]]) + seam +
        both('<path class="sf" stroke="currentColor" stroke-width="1.2" d="M37 22 C31 22 27 30 28 38 C32 38 37.5 31 37 22 Z"/>');
    }
  };

  /* ---------------- COLLARS (on a short-sleeve blouse) ---------------- */
  function blouse(start, neck) {
    return body(sym(start, neck.concat([["L", 36, 18], ["L", 22, 40], ["L", 32, 47], ["L", 38, 44], ["Q", 40, 80, 37, 108], ["Q", 48, 110, 60, 110]])));
  }
  function placket(y0, ys) { return dt("M57 " + y0 + " L57 110 M63 " + y0 + " L63 110") + buttons(60, ys); }
  var COLLAR = {
    peterpan: function () {
      return blouse([60, 24], [["C", 55, 24, 50, 20, 50, 12]]) + '<path class="ln" stroke-width="1" d="M50 12 Q60 8.5 70 12"/>' +
        both(piece("M60 24 C55 24 50 20 50 12 C42 13 37 23 42 30 C47 35 56 33 60 24 Z"));
    },
    shirt: function () {
      return blouse([60, 16], [["C", 55, 16, 50, 13, 50, 8]]) + '<path class="ln" stroke-width="1" d="M50 6 Q60 2.5 70 6"/>' +
        placket(15, [36, 56, 76, 96]) + both(piece("M50 6 Q42 11 39.5 20 L45 32 L58.5 16 Q56 9 50 6 Z")) + btn(60, 18, 1.3);
    },
    mandarin: function () {
      return blouse([60, 18], [["C", 55, 18, 50, 15, 50, 12]]) + '<path class="ln" stroke-width="1" d="M50.5 5 Q60 3 69.5 5"/>' +
        dt("M57 19 L57 66 M63 19 L63 66 M57 66 L63 66") + buttons(60, [27, 40, 53]) +
        both(piece("M58.5 7 Q54 6.5 50.5 5 L50 13 Q54 17 58.5 18.5 Q59.6 12.7 58.5 7 Z"));
    },
    shawl: function () {
      return blouse([60, 66], [["L", 52, 11]]) + soft("M52.5 11.5 L60 62 L67.5 11.5 Q60 8 52.5 11.5 Z") + '<path class="ln" stroke-width="1" d="M50 6 Q60 2.5 70 6"/>' +
        both(piece("M50 6 C40 10 36 24 42 38 C47 50 54 58 59.5 65 L52 11 Q51 8 50 6 Z")) + buttons(60, [70, 88]);
    },
    notched: function () {
      return blouse([60, 68], [["L", 52, 11]]) + soft("M52.5 11.5 L60 64 L67.5 11.5 Q60 8 52.5 11.5 Z") + '<path class="ln" stroke-width="1" d="M50 5 Q60 2 70 5"/>' +
        both(piece("M50 5 Q43 8 41 19 L45.5 22.5 L38.5 26 C40 40 50 56 59.5 67 L52 11 Q51 7.5 50 5 Z") + dt("M45.5 22.5 L52 14")) + buttons(60, [74, 92]);
    },
    sailor: function () {
      return blouse([60, 48], [["L", 50, 10]]) + soft("M50.5 10.5 L60 46 L69.5 10.5 Q60 8 50.5 10.5 Z") +
        both(piece("M50 10 L36 17 L57 52 L60 47 Z") + dt("M39.5 18.5 L57.5 48.5")) +
        piece("M56.5 49 L63.5 49 L62 54 L58 54 Z") + both(piece("M58.5 54 L54 70 L57.5 70.5 L60 55 Z"));
    },
    bow: function () {
      return blouse([60, 17], [["C", 55, 17, 50, 14, 50, 9]]) + dt("M50 9 Q60 5.5 70 9") +
        both(piece("M58.5 15.5 C52 26 50 38 48.5 50 L53 50.5 C54 39 56.5 27 60 17 Z")) +
        both(piece("M60 17 C52 8 42 11 44 18 C46 25 55 22 60 18.5 Z")) + '<rect class="fl" x="57" y="14" width="6" height="7" rx="2"/>';
    },
    ruffle: function () {
      return blouse([60, 22], [["C", 55, 22, 50, 19, 50, 12]]) + dt("M50 12 Q60 8.5 70 12") +
        both(piece("M60 22 C55 22 50 19 50 12 Q46 10 43 14 Q38.5 17 41 21.5 Q37.5 26 42.5 28.5 Q42.5 33 47.5 32.5 Q50.5 36 54.5 33.5 Q57.5 36.5 60 33 Z") +
          dt("M50 15 L43.5 16 M51.5 19 L41.5 23 M54 21.5 L46 30 M57 22.5 L54 31.5"));
    },
    polo: function () {
      return blouse([60, 16], [["C", 55, 16, 50, 13, 50, 8]]) + '<path class="ln" stroke-width="1" d="M50 6 Q60 2.5 70 6"/>' +
        dt("M57 16 L57 46 M63 16 L63 46 M57 46 L63 46") + buttons(60, [25, 37]) + both(piece("M50 6 Q42.5 11 40.5 19 L44 29 Q51 23.5 58 16 Q55.5 9 50 6 Z")) +
        both(st("M23.5 37.5 L33.2 44.2"));
    }
  };

  /* ---------------- SKIRTS ---------------- */
  function skirt(side, hem, extra) {
    return body(sym([60, 8], [["L", 40, 8], ["L", 40, 15]].concat(side, hem))) + dt("M40 15 L80 15") + (extra || "");
  }
  var SKIRT = {
    aline: function () { return skirt([["L", 24, 124]], [["Q", 42, 128, 60, 128]]); },
    pencil: function () { return skirt([["C", 37, 28, 35, 40, 36, 52], ["Q", 38, 90, 41, 122]], [["L", 60, 122]], both(dt("M48 15 L49 31")) + dt("M60 122 L60 108")); },
    straight: function () { return skirt([["Q", 36, 40, 37, 56], ["L", 37, 124]], [["L", 60, 124]], both(dt("M48 15 L49 31"))); },
    flared: function () {
      return skirt([["Q", 32, 30, 8, 116]], [["Q", 16, 122, 24, 119], ["Q", 32, 126, 42, 121], ["Q", 51, 127, 60, 122]],
        both(dt("M46 16 Q40 70 24 119") + dt("M53 16 Q51 70 42 121")));
    },
    pleated: function () {
      var lines = "";
      [45, 50, 55, 60, 65, 70, 75].forEach(function (x) { lines += "M" + x + " 15 L" + (60 + (x - 60) * 1.7) + " " + (x === 60 ? 127 : 126.5) + " "; });
      return skirt([["L", 26, 124]], [["Q", 43, 127, 60, 127]], dt(lines));
    },
    gathered: function () {
      var g = "";
      for (var x = 43; x <= 77; x += 3.4) g += "M" + x.toFixed(1) + " 16 l" + ((x - 60) * 0.04).toFixed(2) + " 6 ";
      return skirt([["Q", 32, 40, 22, 122]], [["Q", 41, 126, 60, 126]], dt(g) + both(dt("M47 22 Q42 70 33 123") + dt("M54 22 Q53 70 49 125")));
    },
    wrap: function () {
      return skirt([["L", 24, 124]], [["Q", 42, 128, 60, 128]],
        '<path class="ln" d="M78 15 C72 52 58 100 44 127.5"/>' + piece("M78 16 C84 10 90 13 88 18 C86 22 81 20 78 17 Z") + piece("M78 17 L80 33 L83 32.5 L79.5 17 Z") + piece("M78 17 L75 31 L77.8 31.5 L79 17.5 Z"));
    },
    tiered: function () {
      var g = "";
      [[42, 17, 78, 2.6], [36, 52, 84, 3.2], [29, 90, 91, 3.6]].forEach(function (r) {
        for (var x = r[0]; x <= r[2]; x += r[3]) g += "M" + x.toFixed(1) + " " + r[1] + " l0 4 ";
      });
      return skirt([["L", 36, 50], ["L", 34, 50], ["L", 28, 88], ["L", 26, 88], ["L", 18, 126]], [["Q", 39, 130, 60, 130]],
        dt("M36 50 Q60 53 84 50 M28 88 Q60 92 92 88") + dt(g));
    },
    mermaid: function () {
      return skirt([["C", 36, 30, 35, 48, 37, 62], ["Q", 40, 84, 39, 98], ["Q", 34, 114, 16, 134]], [["Q", 40, 138, 60, 137]],
        dt("M39 98 Q60 101 81 98") + both(dt("M45 100 Q42 120 34 136") + dt("M52 100.5 Q51 120 48 137")));
    },
    tulip: function () {
      return skirt([["C", 34, 30, 30, 60, 36, 92], ["Q", 38, 104, 44, 112]], [["Q", 52, 115, 60, 114]],
        '<path class="ln" d="M75 15 C86 52 72 98 47 112.6"/>' + both(dt("M48 15 L49 28")));
    },
    highlow: function () {
      return skirt([["Q", 32, 60, 24, 124]], [["Q", 40, 132, 60, 132]],
        soft("M27.1 100 Q44 76 60 76 Q76 76 92.9 100 L96 124 Q80 132 60 132 Q40 132 24 124 Z") +
        '<path class="ln" d="M27.1 100 Q44 76 60 76 Q76 76 92.9 100"/><path class="ln" d="M24 124 Q40 132 60 132 Q80 132 96 124"/>');
    },
    bubble: function () {
      return skirt([["C", 28, 40, 16, 90, 33, 114]], [["Q", 46, 119, 60, 118]],
        both(dt("M36.5 111 l2.5 -3.8 M41 113.6 l1.8 -4 M46 115.6 l1.2 -4 M51 116.8 l.8 -4 M56 117.5 l.3 -4")) + dt("M44 16 l-.6 5 M50 16 l-.3 5 M56 16 l0 5 M64 16 l0 5 M70 16 l.3 5 M76 16 l.6 5"));
    }
  };

  /* ---------------- TROUSERS ---------------- */
  function pants(outer, hem, inner, extra, opt) {
    opt = opt || {};
    var crotch = opt.crotch || [["Q", 58, 58, 60, 54]];
    var d = sym([60, 6], [["L", 39, 6], ["L", 39, 13]].concat(outer, hem, inner, crotch));
    var fly = opt.noFly ? "" : dt("M55 13 L55 38 Q55 44 60 46");
    var pockets = opt.noPockets ? "" : both(dt("M44 13 Q46 22 40 27"));
    return body(d) + dt("M39 13 L81 13") + fly + pockets + (extra || "");
  }
  var TROUSER = {
    straight: function () { return pants([["Q", 36, 40, 37, 60], ["L", 37, 160]], [["L", 56, 160]], [["L", 57, 70]], both(dt("M47 22 L47 160"))); },
    skinny: function () { return pants([["Q", 35, 40, 37, 62], ["Q", 40, 120, 44, 160]], [["L", 54, 160]], [["Q", 53, 110, 57, 70]]); },
    bootcut: function () { return pants([["Q", 35, 40, 37, 62], ["Q", 39, 108, 40, 116], ["Q", 39, 140, 35, 160]], [["L", 56, 160]], [["L", 55, 120], ["Q", 57, 80, 57, 70]]); },
    flared: function () { return pants([["Q", 35, 40, 37, 62], ["L", 39, 106], ["Q", 34, 140, 25, 160]], [["L", 58, 160]], [["Q", 55, 124, 55, 106], ["L", 57, 70]]); },
    wideleg: function () {
      return pants([["Q", 32, 30, 26, 60], ["L", 20, 160]], [["L", 58, 160]], [["L", 59, 64]], both(dt("M41 30 Q38 90 33 158") + dt("M51 46 L49.5 158")), { crotch: [["Q", 59.5, 58, 60, 54]] });
    },
    cigarette: function () { return pants([["Q", 36, 40, 37, 60], ["Q", 39, 110, 41, 146]], [["L", 54, 146]], [["L", 56, 70]], both(dt("M47 22 L47.5 146"))); },
    harem: function () {
      var g = both(dt("M42 142 l1 5 M45.5 142.5 l.6 5 M49 143 l.3 5 M52 143.5 l0 4.5")) + dt("M43 7 l0 5 M47 7 l0 5 M51 7 l0 5 M55 7 l0 5 M65 7 l0 5 M69 7 l0 5 M73 7 l0 5 M77 7 l0 5");
      return pants([["C", 30, 40, 26, 100, 40, 148], ["L", 42, 158]], [["L", 54, 158]], [["L", 54, 148], ["Q", 56, 120, 59, 102]], g +
        both(dt("M40 148 L54 148")), { crotch: [["L", 60, 100]], noFly: true, noPockets: true });
    },
    culottes: function () { return pants([["Q", 32, 30, 28, 60], ["L", 24, 120]], [["L", 58, 120]], [["L", 59, 64]], both(dt("M48 13 L46.5 30")), { crotch: [["Q", 59.5, 58, 60, 54]] }); },
    joggers: function () {
      return pants([["Q", 34, 40, 36, 70], ["Q", 39, 120, 42, 148], ["L", 43, 158]], [["L", 54, 158]], [["L", 54, 148], ["Q", 55, 100, 57, 70]],
        both(dt("M42 148 L54 148") + '<path class="ln" stroke-width="1.2" d="M58 11 Q57 20 55 27"/>') + dt("M43 7 l0 5 M47 7 l0 5 M51 7 l0 5 M69 7 l0 5 M73 7 l0 5 M77 7 l0 5"),
        { noFly: true });
    }
  };

  /* ---------------- DRESSES & SILHOUETTES ---------------- */
  function dress(side, hem, extra, opt) {
    opt = opt || {};
    var segs = [["C", 55, 20, 50, 17, 50, 10]].concat(opt.shoulder || [["L", 38, 15], ["Q", 44, 30, 38, 42]], side, hem);
    return body(sym([60, opt.neckY || 20], opt.neck ? opt.neck.concat(segs.slice(1)) : segs)) + dt("M50 10 Q60 14 70 10") + (extra || "");
  }
  var DRESS = {
    a: function () { return dress([["Q", 38, 58, 35, 66], ["L", 16, 156]], [["Q", 38, 161, 60, 161]]); },
    h: function () { return dress([["L", 37, 156]], [["Q", 48, 158, 60, 158]]); },
    x: function () { return dress([["Q", 44, 64, 43, 72], ["Q", 26, 100, 18, 152]], [["Q", 38, 158, 60, 158]], dt("M43 72 Q60 75 77 72")); },
    y: function () {
      return dress([["Q", 38, 100, 46, 156]], [["Q", 53, 158, 60, 158]], both(dt("M29 15.5 Q33 22 36 30")), { shoulder: [["L", 28, 14], ["Q", 37, 30, 35, 44]] });
    },
    o: function () { return dress([["C", 24, 70, 24, 130, 42, 156]], [["Q", 51, 159, 60, 159]]); },
    trapeze: function () { return dress([["L", 12, 140]], [["Q", 36, 146, 60, 146]]); },
    sheath: function () { return dress([["Q", 45, 66, 43, 74], ["Q", 38, 96, 39, 130], ["Q", 40, 136, 42, 142]], [["L", 60, 142]], both(dt("M47 46 L48 72") + dt("M48 78 L48.6 100"))); },
    empire: function () {
      var g = both(dt("M44 50 l-.5 5 M49 51 l-.3 5 M54 51.5 l-.1 5"));
      return dress([["L", 39, 47], ["L", 20, 158]], [["Q", 40, 162, 60, 162]], dt("M39 47 Q60 51 81 47") + g);
    },
    mermaid: function () {
      return dress([["Q", 45, 66, 43, 74], ["Q", 36, 100, 41, 122], ["Q", 30, 148, 12, 164]], [["Q", 36, 168, 60, 166]],
        dt("M41 122 Q60 125 79 122") + both(dt("M47 124 Q43 145 33 166") + dt("M54 124.5 Q53 145 50 166.5")));
    },
    ballgown: function () {
      return dress([["Q", 44, 62, 43, 70], ["C", 18, 80, 6, 130, 4, 164]], [["Q", 30, 168, 60, 168]],
        dt("M43 70 Q60 73 77 70") + both(dt("M49 72 Q42 120 30 166") + dt("M55 73 Q54 120 50 168")));
    },
    wrap: function () {
      return dress([["Q", 44, 60, 41, 70], ["L", 22, 158]], [["Q", 40, 162, 60, 162]],
        dt("M41 67 L79 67 M41 74 L79 74") + '<path class="ln" d="M68 74 C63 110 56 140 47 161"/>' +
        piece("M41 70 C34 63 28 67 31 71 C34 75 38 73 41 71 Z") + piece("M41 71 L35 88 L38.5 88.5 L42 72 Z") + piece("M41.5 72 L40 92 L43.5 92 L42.5 72 Z"),
        { neckY: 56, neck: [["L", 50, 10]] });
    },
    shirtdress: function () {
      var segs = [["C", 55, 16, 50, 14, 50, 9], ["L", 37, 14], ["L", 25, 34], ["L", 34, 40], ["L", 39, 37], ["Q", 42, 58, 41, 70], ["L", 28, 152], ["Q", 44, 156, 60, 156]];
      return body(sym([60, 16], segs)) + '<path class="ln" stroke-width="1" d="M50 5 Q60 2 70 5"/>' + dt("M57 15 L57 156 M63 15 L63 156") +
        buttons(60, [24, 38, 52, 86, 102, 118, 134]) + both(piece("M50 5 Q44 9 42.5 15 L46.5 24 L58.5 15 Q56 8 50 5 Z")) +
        '<rect class="fl" x="40.6" y="65" width="38.8" height="8" rx="1"/><rect class="fl" stroke-width="1.2" x="56" y="63.5" width="8" height="11" rx="1.5"/>';
    }
  };

  function reg(name, set, h) {
    FD.diagram(name, function (a) { var f = set[a && a.type] || set[Object.keys(set)[0]]; return wrap(h, f()); });
  }
  reg("flat-neckline", NECK, 128);
  reg("flat-sleeve", SLEEVE, 128);
  reg("flat-collar", COLLAR, 112);
  reg("flat-skirt", SKIRT, 140);
  reg("flat-trouser", TROUSER, 166);
  reg("flat-dress", DRESS, 170);
  reg("flat-silhouette", DRESS, 170);
  FD.flatTypes = { neckline: NECK, sleeve: SLEEVE, collar: COLLAR, skirt: SKIRT, trouser: TROUSER, dress: DRESS };

  /* ---------------- figure for lengths & waistlines ---------------- */
  function figure() {
    /* simple 9-head fashion figure, centre x = 60, head = 32 units, feet at y = 290 */
    var arm = "M39.5 51 Q34.5 70 34.5 98 L32.5 127 Q30.5 135 32.5 141 Q35.5 143 36.5 135 L38.5 127 L40.5 99 Q41.5 80 42.5 66 Z";
    var torso = sym([60, 36], [["L", 55.5, 36], ["L", 55.5, 44], ["Q", 44, 45, 40, 49], ["Q", 38, 52, 39, 60], ["L", 42, 72], ["Q", 46, 92, 47, 100],
      ["Q", 41, 118, 42, 132], ["Q", 43, 150, 45, 170], ["Q", 47, 190, 47, 198], ["Q", 45, 220, 48, 240], ["L", 51, 272], ["L", 47, 288], ["Q", 52, 291, 57, 290],
      ["L", 56, 272], ["L", 55.5, 240], ["Q", 54.5, 220, 56, 198], ["Q", 57, 170, 60, 142]]);
    return FD.mirror(60, '<path class="sf" stroke="currentColor" stroke-width="1" d="' + arm + '"/>') +
      '<path class="sf" stroke="currentColor" stroke-width="1" d="' + torso + '"/>' +
      '<ellipse class="sf" stroke="currentColor" stroke-width="1" cx="60" cy="20" rx="11" ry="16"/>';
  }
  FD.diagram("garment-hemlines", function (a, lang) {
    var L = [
      { y: 160, en: "Mini", hi: "मिनी", n: { en: "mid-thigh", hi: "जांघ के बीच तक" } },
      { y: 197, en: "Knee", hi: "नी-लेंथ", n: { en: "at the knee", hi: "घुटने तक" } },
      { y: 229, en: "Midi", hi: "मिडी", n: { en: "mid-calf", hi: "पिंडली के बीच तक" } },
      { y: 266, en: "Maxi", hi: "मैक्सी", n: { en: "at the ankle", hi: "टखने तक" } },
      { y: 290, en: "Floor", hi: "फ़्लोर-लेंथ", n: { en: "touches the floor", hi: "ज़मीन तक" } }
    ];
    var s = figure();
    L.forEach(function (l) {
      s += '<path class="ac" stroke-width="2" d="M38 ' + l.y + ' L82 ' + l.y + '"/><path class="gd" d="M86 ' + l.y + ' L132 ' + l.y + '"/>' +
        '<circle class="acf" cx="83" cy="' + l.y + '" r="2.4"/>' +
        FD.text(136, l.y + 1, FD.tx({ en: l.en, hi: l.hi }, lang), { cls: "tx", anchor: "start", size: 12.5 }) +
        FD.text(136, l.y + 13, FD.tx(l.n, lang), { cls: "tm", anchor: "start", size: 9.5 });
    });
    return FD.svg(240, 308, s);
  });
  FD.diagram("garment-waistlines", function (a, lang) {
    var L = [
      { y: 64, w: 30, en: "Empire", hi: "एम्पायर", n: { en: "just under the bust", hi: "बस्ट के ठीक नीचे" } },
      { y: 97, w: 22, en: "Natural", hi: "नैचुरल", n: { en: "at the real waist", hi: "असली कमर पर" } },
      { y: 128, w: 30, en: "Dropped", hi: "ड्रॉप्ड", n: { en: "lower, near the hips", hi: "नीचे, हिप्स के पास" } }
    ];
    var torso = '<path class="sf" stroke="currentColor" stroke-width="1.2" d="M52 14 Q52 6 60 6 Q68 6 68 14 L68 22 Q84 26 90 34 Q94 40 92 52 Q90 66 86 78 Q82 90 82 98 Q84 110 90 124 Q94 134 92 146 L28 146 Q26 134 30 124 Q36 110 38 98 Q38 90 34 78 Q30 66 28 52 Q26 40 30 34 Q36 26 52 22 Z"/>' +
      '<path class="ln" stroke-width="1" d="M60 146 L60 168 M46 172 L74 172 M60 168 L60 172"/>' + '<path class="gd" d="M60 22 L60 146"/>';
    var s = torso;
    L.forEach(function (l) {
      var w = l.w;
      s += '<path class="ac" stroke-width="2" d="M' + (60 - w) + " " + l.y + " Q60 " + (l.y + 4) + " " + (60 + w) + " " + l.y + '"/>' + '<path class="gd" d="M' + (62 + w) + " " + l.y + ' L130 ' + l.y + '"/>' +
        FD.text(134, l.y - 1, FD.tx({ en: l.en, hi: l.hi }, lang), { cls: "tx", anchor: "start", size: 12 }) +
        FD.text(134, l.y + 11, FD.tx(l.n, lang), { cls: "tm", anchor: "start", size: 9.5 });
    });
    return FD.svg(240, 180, s);
  });
})();
