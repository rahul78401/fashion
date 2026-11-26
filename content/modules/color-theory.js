/* Module 3 - Colour Theory */
(function () {
  function t(en, hi, lang) { return FD.tx({ en: en, hi: hi }, lang); }

  /* 12-part artist's (RYB) colour wheel, starting with yellow at the top, going clockwise */
  var WHEEL = ["#FFD200", "#FFA800", "#FF7A00", "#F24A1D", "#E0201B", "#B0177A",
               "#6B2C91", "#3E3A9E", "#1D5FAE", "#0E9488", "#25A244", "#A6C82C"];
  var KIND = ["P", "T", "S", "T", "P", "T", "S", "T", "P", "T", "S", "T"];
  var SCHEMES = {
    mono: [8], analogous: [8, 9, 10], complementary: [4, 10], split: [4, 9, 11],
    triadic: [2, 6, 10], tetradic: [2, 4, 8, 10], primary: [0, 4, 8], secondary: [2, 6, 10],
    tertiary: [1, 3, 5, 7, 9, 11]
  };

  function hexToRgb(h) { h = h.replace("#", ""); return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]; }
  function rgbToHex(c) { return "#" + c.map(function (v) { var s = Math.round(v).toString(16); return s.length < 2 ? "0" + s : s; }).join(""); }
  function mix(a, b, k) { var x = hexToRgb(a), y = hexToRgb(b); return rgbToHex([0, 1, 2].map(function (i) { return x[i] + (y[i] - x[i]) * k; })); }
  function pt(cx, cy, r, deg) { var a = deg * Math.PI / 180; return [(cx + Math.cos(a) * r).toFixed(2), (cy + Math.sin(a) * r).toFixed(2)]; }
  function sector(cx, cy, R, r, a0, a1) {
    var p1 = pt(cx, cy, R, a0), p2 = pt(cx, cy, R, a1), p3 = pt(cx, cy, r, a1), p4 = pt(cx, cy, r, a0);
    return "M" + p1.join(" ") + " A" + R + " " + R + " 0 0 1 " + p2.join(" ") + " L" + p3.join(" ") + " A" + r + " " + r + " 0 0 0 " + p4.join(" ") + " Z";
  }
  function textCol(hex) { var c = hexToRgb(hex); return (c[0] * 0.3 + c[1] * 0.59 + c[2] * 0.11) > 150 ? "#222" : "#fff"; }

  /* args: { scheme, hl:[...], marks:true, split:true } */
  FD.diagram("color-theory-wheel", function (a, lang) {
    var cx = 110, cy = 110, R = 100, r = 46, s = "";
    var hl = a.hl || (a.scheme ? SCHEMES[a.scheme] : null);
    for (var i = 0; i < 12; i++) {
      var mid = -90 + i * 30, on = !hl || hl.indexOf(i) >= 0;
      s += '<path d="' + sector(cx, cy, R, r, mid - 15, mid + 15) + '" fill="' + WHEEL[i] + '" stroke="#ffffff" stroke-width="2"' + (on ? "" : ' opacity="0.16"') + "/>";
      if (a.marks && on) {
        var p = pt(cx, cy, (R + r) / 2, mid);
        s += '<text x="' + p[0] + '" y="' + (+p[1] + 4).toFixed(2) + '" text-anchor="middle" font-size="12" font-weight="700" fill="' + textCol(WHEEL[i]) + '">' + KIND[i] + "</text>";
      }
    }
    if (hl && a.scheme) {
      var pts = hl.map(function (k) { return pt(cx, cy, r - 6, -90 + k * 30); });
      if (pts.length === 1) s += '<circle cx="' + pts[0][0] + '" cy="' + pts[0][1] + '" r="4" class="acf"/>';
      else s += '<path d="M' + pts.map(function (q) { return q.join(" "); }).join(" L") + (pts.length > 2 ? " Z" : "") + '" class="ln" stroke-width="2"/>';
      pts.forEach(function (q) { s += '<circle cx="' + q[0] + '" cy="' + q[1] + '" r="3" class="tx"/>'; });
    }
    if (hl && !a.scheme) hl.forEach(function (k) { s += '<path d="' + sector(cx, cy, R + 4, R - 1, -90 + k * 30 - 13, -90 + k * 30 + 13) + '" class="tx"/>'; });
    if (a.split) {
      var e1 = pt(cx, cy, R + 8, -105), e2 = pt(cx, cy, R + 8, 75);
      s += '<path d="M' + e1.join(" ") + " L" + e2.join(" ") + '" class="ln" stroke-width="2" stroke-dasharray="5 4"/>';
      s += FD.text(cx + 22, cy + 4, t("Warm", "गर्म", lang), { cls: "tx", size: 11 });
      s += FD.text(cx - 22, cy + 4, t("Cool", "ठंडे", lang), { cls: "tx", size: 11 });
    }
    return FD.svg(220, 220, s);
  });

  /* colour mixing: primary + primary = secondary */
  FD.diagram("color-theory-mix", function (a, lang) {
    var rows = [[0, 4, 2, "Yellow", "पीला", "Red", "लाल", "Orange", "नारंगी"], [4, 8, 6, "Red", "लाल", "Blue", "नीला", "Violet", "बैंगनी"], [8, 0, 10, "Blue", "नीला", "Yellow", "पीला", "Green", "हरा"]];
    var s = "";
    rows.forEach(function (rw, i) {
      var y = 28 + i * 66;
      s += '<circle cx="40" cy="' + y + '" r="20" fill="' + WHEEL[rw[0]] + '"/>' + FD.text(40, y + 34, t(rw[3], rw[4], lang), { cls: "tm", size: 9 });
      s += FD.text(85, y + 6, "+", { cls: "tx", size: 18 });
      s += '<circle cx="130" cy="' + y + '" r="20" fill="' + WHEEL[rw[1]] + '"/>' + FD.text(130, y + 34, t(rw[5], rw[6], lang), { cls: "tm", size: 9 });
      s += FD.text(178, y + 6, "=", { cls: "tx", size: 18 });
      s += '<circle cx="228" cy="' + y + '" r="22" fill="' + WHEEL[rw[2]] + '" stroke="currentColor" stroke-width="1.5"/>' + FD.text(228, y + 36, t(rw[7], rw[8], lang), { cls: "tx", size: 10 });
    });
    return FD.svg(270, 200, s);
  });

  /* a row of 7 chips: tints (to white), shades (to black), tones (to grey) or a grey value scale */
  FD.diagram("color-theory-scale", function (a, lang) {
    var hex = a.hex || WHEEL[8], kind = a.kind || "tint", n = 7, s = "";
    var to = kind === "tint" ? "#ffffff" : kind === "shade" ? "#000000" : "#808080";
    for (var i = 0; i < n; i++) {
      var c = kind === "value" ? mix("#000000", "#ffffff", i / (n - 1)) : mix(hex, to, i / (n - 1) * 0.92);
      s += '<rect x="' + (6 + i * 44) + '" y="6" width="40" height="44" rx="8" fill="' + c + '" stroke="currentColor" stroke-opacity=".25" stroke-width="1"/>';
    }
    var lab = {
      tint: [t("Pure hue", "असली रंग", lang), t("+ white", "+ सफ़ेद", lang)],
      shade: [t("Pure hue", "असली रंग", lang), t("+ black", "+ काला", lang)],
      tone: [t("Pure hue", "असली रंग", lang), t("+ grey", "+ ग्रे", lang)],
      value: [t("Dark", "गहरा", lang), t("Light", "हल्का", lang)]
    }[kind];
    s += FD.text(26, 66, lab[0], { cls: "tm", size: 10 }) + FD.text(290, 66, lab[1], { cls: "tm", size: 10 });
    s += '<path d="M64 62 L246 62" class="gd"/><path d="M240 58 L246 62 L240 66" class="ln" stroke-width="1"/>';
    return FD.svg(316, 74, s);
  });

  /* hue / value / saturation in three strips */
  FD.diagram("color-theory-hvs", function (a, lang) {
    var s = "", base = WHEEL[8], i;
    var rows = [t("Hue", "ह्यू", lang), t("Value", "वैल्यू", lang), t("Saturation", "सैचुरेशन", lang)];
    rows.forEach(function (lb, k) { s += FD.text(6, 34 + k * 50, lb, { cls: "tx", anchor: "start", size: 11 }); });
    for (i = 0; i < 12; i++) s += '<rect x="' + (84 + i * 19) + '" y="14" width="19" height="32" fill="' + WHEEL[i] + '"/>';
    for (i = 0; i < 12; i++) {
      var v = i < 6 ? mix("#000000", base, (i + 1) / 6) : mix(base, "#ffffff", (i - 5) / 7);
      s += '<rect x="' + (84 + i * 19) + '" y="64" width="19" height="32" fill="' + v + '"/>';
    }
    for (i = 0; i < 12; i++) s += '<rect x="' + (84 + i * 19) + '" y="114" width="19" height="32" fill="' + mix("#7a7f89", base, i / 11) + '"/>';
    s += FD.text(84, 108, t("dark", "गहरा", lang), { cls: "tm", anchor: "start", size: 9 }) + FD.text(312, 108, t("light", "हल्का", lang), { cls: "tm", anchor: "end", size: 9 });
    s += FD.text(84, 158, t("dull", "फीका", lang), { cls: "tm", anchor: "start", size: 9 }) + FD.text(312, 158, t("bright", "चटक", lang), { cls: "tm", anchor: "end", size: 9 });
    return FD.svg(318, 164, s);
  });

  /* simple outfit figure painted with three colours: {top, bottom, acc} */
  FD.diagram("color-theory-outfit", function (a, lang) {
    var top = a.top || "#1D5FAE", bot = a.bottom || "#f2ede6", acc = a.acc || "#E0201B";
    var s = '<circle cx="60" cy="22" r="12" class="ln"/><path d="M56 33 L56 42 M64 33 L64 42" class="ln"/>';
    s += '<path d="M50 166 L50 192 M70 166 L70 192" class="ln"/>';
    s += '<path d="M40 42 L80 42 L78 98 L42 98 Z" fill="' + top + '" stroke="currentColor"/>';
    s += '<path d="M42 98 L78 98 L92 168 L28 168 Z" fill="' + bot + '" stroke="currentColor"/>';
    s += '<path d="M40 44 L30 100 M80 44 L90 100" class="ln"/>';
    s += '<path d="M44 42 C40 70 38 110 32 150 L40 150 C46 112 50 76 54 42 Z" fill="' + acc + '" stroke="currentColor" stroke-width="1"/>';
    s += '<rect x="42" y="94" width="36" height="7" fill="' + acc + '" stroke="currentColor" stroke-width="1"/>';
    return FD.svg(120, 200, s);
  });

  /* 60-30-10 rule bar */
  FD.diagram("color-theory-603010", function (a, lang) {
    var c = a.c || ["#1D5FAE", "#f2ede6", "#FFA800"], s = "";
    s += '<rect x="6" y="8" width="180" height="40" fill="' + c[0] + '"/><rect x="186" y="8" width="90" height="40" fill="' + c[1] + '"/><rect x="276" y="8" width="30" height="40" fill="' + c[2] + '"/>';
    s += '<rect x="6" y="8" width="300" height="40" rx="2" class="ln" stroke-width="1"/>';
    s += FD.text(96, 66, "60% · " + t("main", "मेन", lang), { cls: "tx", size: 10 });
    s += FD.text(231, 66, "30% · " + t("second", "दूसरा", lang), { cls: "tx", size: 10 });
    s += FD.text(291, 80, "10% · " + t("accent", "एक्सेंट", lang), { cls: "tm", anchor: "end", size: 10 });
    return FD.svg(312, 86, s);
  });
})();

FD.module({
  id: "color-theory",
  num: 3,
  level: "basic",
  title: { en: "Colour Theory", hi: "कलर थ्योरी (रंगों का ज्ञान)" },
  tagline: {
    en: "How colours mix, match and make us feel, from the colour wheel to a bride's red lehenga",
    hi: "रंग कैसे मिलते हैं, कैसे जमते हैं और हमें कैसा महसूस कराते हैं: कलर व्हील से दुल्हन के लाल लहंगे तक" },
  cover: "assets/img/color-theory/cover.jpg",
  learn: [
    { en: "Primary, secondary and tertiary colours on the 12-part colour wheel", hi: "12 हिस्सों वाले कलर व्हील पर प्राइमरी, सेकेंडरी और टर्शियरी रंग" },
    { en: "Hue, value and saturation, and how to make tints, shades and tones", hi: "ह्यू, वैल्यू और सैचुरेशन, और टिंट, शेड और टोन कैसे बनते हैं" },
    { en: "Warm, cool and neutral colours", hi: "गर्म, ठंडे और न्यूट्रल रंग" },
    { en: "Six colour schemes you can use to plan any outfit", hi: "छह कलर स्कीम जिनसे तुम कोई भी आउटफ़िट प्लान कर सकती हो" },
    { en: "What colours mean in Indian culture and in fashion trends", hi: "भारतीय संस्कृति और फ़ैशन ट्रेंड में रंगों का मतलब" }
  ],
  lessons: [
    /* ---------------- 1. COLOUR WHEEL ---------------- */
    {
      id: "colour-wheel",
      title: { en: "The colour wheel", hi: "कलर व्हील (रंगों का पहिया)" },
      min: 6,
      blocks: [
        { t: "p", text: {
          en: "The **colour wheel** is a designer's map of colours. It arranges colours in a circle so you can see how they are related. Isaac Newton drew the first one in 1704.",
          hi: "**कलर व्हील (Colour wheel)** डिज़ाइनर का रंगों वाला नक्शा है। इसमें रंग एक गोले में सजे होते हैं, ताकि दिखे कि वो आपस में कैसे जुड़े हैं। पहला कलर व्हील Isaac Newton ने 1704 में बनाया था।" } },
        { t: "dg", name: "color-theory-wheel", args: { marks: true }, caption: {
          en: "The 12-part artist's colour wheel. P = primary, S = secondary, T = tertiary. Yellow is at the top; go clockwise to orange, red, violet, blue and green.",
          hi: "आर्टिस्ट का 12 हिस्सों वाला कलर व्हील। P = प्राइमरी, S = सेकेंडरी, T = टर्शियरी। सबसे ऊपर पीला है; घड़ी की दिशा में नारंगी, लाल, बैंगनी, नीला और हरा आते हैं।" } },
        { t: "img", src: "assets/img/color-theory/rainbow-threads.jpg", caption: {
          en: "Thread in a market: when colours are lined up in wheel order, they flow smoothly from one to the next.",
          hi: "बाज़ार में धागे: जब रंग व्हील के क्रम में सजे हों, तो एक से दूसरे में आराम से बदलते हैं।" } },
        { t: "img", src: "assets/img/color-theory/threads-radial.jpg", caption: {
          en: "The same market threads photographed as a spinning circle: a real-life colour wheel.",
          hi: "बाज़ार के वही धागे गोल घुमाकर खींचे गए: असली ज़िंदगी का कलर व्हील।" } },
        { t: "gallery", cols: 3, items: [
          { dg: "color-theory-wheel", args: { hl: [0, 4, 8] }, label: { en: "3 primary", hi: "3 प्राइमरी" }, note: { en: "Red, yellow, blue", hi: "लाल, पीला, नीला" } },
          { dg: "color-theory-wheel", args: { hl: [2, 6, 10] }, label: { en: "3 secondary", hi: "3 सेकेंडरी" }, note: { en: "Orange, violet, green", hi: "नारंगी, बैंगनी, हरा" } },
          { dg: "color-theory-wheel", args: { hl: [1, 3, 5, 7, 9, 11] }, label: { en: "6 tertiary", hi: "6 टर्शियरी" }, note: { en: "In-between colours", hi: "बीच वाले रंग" } }
        ] },
        { t: "cards", items: [
          { icon: "drop", title: { en: "Primary colours", hi: "प्राइमरी रंग" }, text: { en: "Red, yellow, blue. You cannot make them by mixing other paints.", hi: "लाल, पीला, नीला। इन्हें दूसरे रंग मिलाकर नहीं बना सकते।" } },
          { icon: "palette", title: { en: "Secondary colours", hi: "सेकेंडरी रंग" }, text: { en: "Mix two primaries: orange, violet (purple) and green.", hi: "दो प्राइमरी मिलाओ: नारंगी, बैंगनी और हरा।" } },
          { icon: "layers", title: { en: "Tertiary colours", hi: "टर्शियरी रंग" }, text: { en: "Mix a primary with the secondary next to it: yellow-orange, red-orange, red-violet, blue-violet, blue-green, yellow-green.", hi: "एक प्राइमरी को उसके बगल वाले सेकेंडरी से मिलाओ: पीला-नारंगी, लाल-नारंगी, लाल-बैंगनी, नीला-बैंगनी, नीला-हरा, पीला-हरा।" } }
        ] },
        { t: "dg", name: "color-theory-mix", caption: {
          en: "Mixing paint: two primaries make the secondary colour between them.",
          hi: "पेंट मिलाना: दो प्राइमरी रंग मिलकर उनके बीच वाला सेकेंडरी रंग बनाते हैं।" } },
        { t: "img", src: "assets/img/color-theory/mondrian-primary.jpg", caption: {
          en: "Yves Saint Laurent's Mondrian dress next to a Mondrian painting: primary colours with black and white.",
          hi: "मॉन्ड्रियन पेंटिंग के बगल में Yves Saint Laurent की मॉन्ड्रियन ड्रेस: प्राइमरी रंग, काले और सफ़ेद के साथ।" } },
        { t: "tip", kind: "fact", text: {
          en: "Paints and dyes follow the **RYB** wheel you see here. Screens use light, so they mix **RGB** (red, green, blue), and printers use **CMYK**. Same idea, different primaries.",
          hi: "पेंट और डाई यहाँ दिखाए गए **RYB** व्हील पर चलते हैं। स्क्रीन रोशनी से बनती है, इसलिए वो **RGB** (लाल, हरा, नीला) मिलाती है, और प्रिंटर **CMYK** इस्तेमाल करते हैं। आइडिया एक, प्राइमरी अलग।" } },
        { t: "terms", items: [
          { en: "Colour wheel", hi: "कलर व्हील", def: { en: "A circle that shows colours in order and how they relate.", hi: "एक गोला जो रंगों को क्रम में और उनका आपसी रिश्ता दिखाता है।" } },
          { en: "Primary colours", hi: "प्राइमरी रंग", def: { en: "Red, yellow and blue: the base colours that cannot be mixed from others.", hi: "लाल, पीला और नीला: मूल रंग जो दूसरे रंगों से नहीं बनते।" } },
          { en: "Secondary colours", hi: "सेकेंडरी रंग", def: { en: "Orange, violet and green, made by mixing two primaries.", hi: "नारंगी, बैंगनी और हरा, जो दो प्राइमरी मिलाकर बनते हैं।" } },
          { en: "Tertiary colours", hi: "टर्शियरी रंग", def: { en: "Six colours made by mixing a primary with a neighbouring secondary.", hi: "छह रंग जो एक प्राइमरी को बगल वाले सेकेंडरी से मिलाकर बनते हैं।" } }
        ] },
        { t: "try", text: {
          en: "Using only red, yellow and blue paint, make your own 12-part colour wheel in your sketchbook. Label every colour.",
          hi: "सिर्फ़ लाल, पीले और नीले पेंट से अपनी स्केचबुक में अपना 12 हिस्सों वाला कलर व्हील बनाओ। हर रंग का नाम लिखो।" } }
      ]
    },
    /* ---------------- 2. HUE VALUE SATURATION ---------------- */
    {
      id: "hue-value-saturation",
      title: { en: "Hue, value & saturation", hi: "ह्यू, वैल्यू और सैचुरेशन" },
      min: 6,
      blocks: [
        { t: "p", text: {
          en: "\"Blue\" can mean a pale sky blue, a deep navy or a dusty denim blue. To describe a colour exactly, designers use three words: **hue**, **value** and **saturation**.",
          hi: "\"नीला\" का मतलब हल्का आसमानी, गहरा नेवी या धूल जैसा डेनिम नीला, कुछ भी हो सकता है। किसी रंग को सही-सही बताने के लिए डिज़ाइनर तीन शब्द इस्तेमाल करते हैं: **ह्यू (Hue)**, **वैल्यू (Value)** और **सैचुरेशन (Saturation)**।" } },
        { t: "dg", name: "color-theory-hvs", caption: {
          en: "Hue = the colour family. Value = how light or dark. Saturation = how bright or dull.",
          hi: "ह्यू = रंग का परिवार। वैल्यू = कितना हल्का या गहरा। सैचुरेशन = कितना चटक या फीका।" } },
        { t: "list", style: "dot", items: [
          { en: "**Hue** is the name of the colour family: red, blue, green.", hi: "**ह्यू** रंग के परिवार का नाम है: लाल, नीला, हरा।" },
          { en: "**Value** is lightness or darkness. Baby pink has a high value; maroon has a low value.", hi: "**वैल्यू** यानी हल्कापन या गहरापन। बेबी पिंक की वैल्यू ज़्यादा है; मैरून की कम।" },
          { en: "**Saturation** (also called **chroma** or intensity) is how pure and bright it is. Rani pink is highly saturated; onion pink is not.", hi: "**सैचुरेशन** (इसे **क्रोमा** या इंटेंसिटी भी कहते हैं) यानी रंग कितना शुद्ध और चटक है। रानी पिंक बहुत सैचुरेटेड है; प्याज़ी पिंक नहीं।" } ] },
        { t: "h", text: { en: "Tints, shades and tones", hi: "टिंट, शेड और टोन" } },
        { t: "gallery", cols: 2, items: [
          { dg: "color-theory-scale", args: { kind: "tint", hex: "#E0201B" }, label: { en: "Tint = hue + white", hi: "टिंट = रंग + सफ़ेद" }, note: { en: "Red becomes pink: pastels", hi: "लाल गुलाबी बन जाता है: पेस्टल" } },
          { dg: "color-theory-scale", args: { kind: "shade", hex: "#E0201B" }, label: { en: "Shade = hue + black", hi: "शेड = रंग + काला" }, note: { en: "Red becomes maroon", hi: "लाल मैरून बन जाता है" } },
          { dg: "color-theory-scale", args: { kind: "tone", hex: "#E0201B" }, label: { en: "Tone = hue + grey", hi: "टोन = रंग + ग्रे" }, note: { en: "Softer, dusty colours", hi: "नरम, धूल जैसे रंग" } },
          { dg: "color-theory-scale", args: { kind: "value" }, label: { en: "Value scale", hi: "वैल्यू स्केल" }, note: { en: "Black to white with greys between", hi: "काले से सफ़ेद, बीच में ग्रे" } }
        ] },
        { t: "img", src: "assets/img/color-theory/pastel.jpg", caption: {
          en: "Pastels are tints: soft, light colours with a lot of white in them.",
          hi: "पेस्टल रंग टिंट होते हैं: नरम, हल्के रंग जिनमें बहुत सफ़ेद मिला हो।" } },
        { t: "tip", kind: "tip", text: {
          en: "Squint at an outfit or take a black-and-white photo. If everything turns the same grey, the colours have the same **value** and may look flat. Mix light and dark.",
          hi: "आउटफ़िट को आँखें सिकोड़कर देखो या उसकी ब्लैक-एंड-व्हाइट फ़ोटो लो। अगर सब एक जैसा ग्रे दिखे, तो रंगों की **वैल्यू** एक है और लुक फीका लग सकता है। हल्का और गहरा मिलाओ।" } },
        { t: "terms", items: [
          { en: "Hue", hi: "ह्यू", def: { en: "The pure colour family, like red or blue.", hi: "शुद्ध रंग का परिवार, जैसे लाल या नीला।" } },
          { en: "Value", hi: "वैल्यू", def: { en: "How light or dark a colour is.", hi: "रंग कितना हल्का या गहरा है।" } },
          { en: "Saturation", hi: "सैचुरेशन", def: { en: "How bright and pure, or dull and greyish, a colour is.", hi: "रंग कितना चटक और शुद्ध, या फीका और ग्रे सा है।" } },
          { en: "Tint", hi: "टिंट", def: { en: "A colour mixed with white.", hi: "सफ़ेद मिला हुआ रंग।" } },
          { en: "Shade", hi: "शेड", def: { en: "A colour mixed with black.", hi: "काला मिला हुआ रंग।" } },
          { en: "Tone", hi: "टोन", def: { en: "A colour mixed with grey.", hi: "ग्रे मिला हुआ रंग।" } }
        ] },
        { t: "try", text: {
          en: "Pick one paint colour. Make 5 tints (add white) and 5 shades (add black) in a row. Which of them would you wear?",
          hi: "एक पेंट का रंग चुनो। एक लाइन में 5 टिंट (सफ़ेद मिलाकर) और 5 शेड (काला मिलाकर) बनाओ। इनमें से कौन सा रंग तुम पहनना चाहोगी?" } }
      ]
    },
    /* ---------------- 3. WARM COOL NEUTRAL ---------------- */
    {
      id: "warm-cool-neutral",
      title: { en: "Warm, cool & neutral colours", hi: "गर्म, ठंडे और न्यूट्रल रंग" },
      min: 5,
      blocks: [
        { t: "p", text: {
          en: "Cut the colour wheel in half and you get two moods. **Warm colours** remind us of fire and sun. **Cool colours** remind us of water, sky and leaves.",
          hi: "कलर व्हील को आधा काटो तो दो मूड मिलते हैं। **वॉर्म (Warm) यानी गर्म रंग** हमें आग और धूप की याद दिलाते हैं। **कूल (Cool) यानी ठंडे रंग** पानी, आसमान और पत्तों की।" } },
        { t: "dg", name: "color-theory-wheel", args: { split: true }, caption: {
          en: "Warm: yellow, orange, red and red-violet. Cool: violet, blue and green.",
          hi: "गर्म: पीला, नारंगी, लाल और लाल-बैंगनी। ठंडे: बैंगनी, नीला और हरा।" } },
        { t: "compare", items: [
          { title: { en: "Warm colours", hi: "गर्म रंग" }, src: "assets/img/color-theory/warm.jpg", points: [
            { en: "Energetic, happy, festive", hi: "जोशीले, ख़ुश, त्योहार जैसे" },
            { en: "Seem to come forward: they look closer and bigger", hi: "आगे आते लगते हैं: पास और बड़े दिखते हैं" },
            { en: "Great for Diwali, haldi, sangeet", hi: "दिवाली, हल्दी, संगीत के लिए बढ़िया" } ] },
          { title: { en: "Cool colours", hi: "ठंडे रंग" }, src: "assets/img/color-theory/cool.jpg", points: [
            { en: "Calm, fresh, peaceful", hi: "शांत, ताज़े, सुकून भरे" },
            { en: "Seem to move back: they look further away and smaller", hi: "पीछे जाते लगते हैं: दूर और छोटे दिखते हैं" },
            { en: "Great for summer cottons and office wear", hi: "गर्मी के कॉटन और ऑफ़िस वियर के लिए बढ़िया" } ] }
        ] },
        { t: "h", text: { en: "Neutrals", hi: "न्यूट्रल रंग" } },
        { t: "p", text: {
          en: "**Neutrals** are not on the wheel: white, black, grey, beige, cream, brown and navy. They calm down bright colours and go with almost everything, so they are the backbone of a wardrobe.",
          hi: "**न्यूट्रल (Neutral)** रंग व्हील पर नहीं होते: सफ़ेद, काला, ग्रे, बेज, क्रीम, भूरा और नेवी। ये चटक रंगों को शांत करते हैं और लगभग हर चीज़ के साथ जमते हैं, इसलिए ये वॉर्डरोब की रीढ़ हैं।" } },
        { t: "swatches", caption: { en: "A neutral palette: build a capsule wardrobe on these, then add one bright colour.", hi: "न्यूट्रल पैलेट: इन पर कैप्सूल वॉर्डरोब बनाओ, फिर एक चटक रंग जोड़ो।" }, items: [
          { c: "#ffffff", label: { en: "White", hi: "सफ़ेद" } }, { c: "#f3ead8", label: { en: "Cream", hi: "क्रीम" } },
          { c: "#d8c3a5", label: { en: "Beige", hi: "बेज" } }, { c: "#8a8a8a", label: { en: "Grey", hi: "ग्रे" } },
          { c: "#6b4a2f", label: { en: "Brown", hi: "भूरा" } }, { c: "#1f2a44", label: { en: "Navy", hi: "नेवी" } },
          { c: "#111111", label: { en: "Black", hi: "काला" } } ] },
        { t: "img", src: "assets/img/color-theory/neutral.jpg", caption: {
          en: "A neutral outfit in cream and beige. Calm, elegant and timeless.",
          hi: "क्रीम और बेज रंग का न्यूट्रल आउटफ़िट। शांत, एलिगेंट और हमेशा फ़ैशन में।" } },
        { t: "tip", kind: "fact", text: {
          en: "Every hue has warm and cool versions. A lemon yellow is cooler than a mustard; a bluish red (like rani) is cooler than a tomato red.",
          hi: "हर रंग के गर्म और ठंडे रूप होते हैं। नींबू जैसा पीला सरसों वाले पीले से ठंडा है; नीलापन लिए लाल (जैसे रानी) टमाटर वाले लाल से ठंडा है।" } },
        { t: "terms", items: [
          { en: "Warm colours", hi: "वॉर्म रंग", def: { en: "Reds, oranges and yellows that feel energetic and come forward.", hi: "लाल, नारंगी और पीले रंग जो जोशीले लगते हैं और आगे आते दिखते हैं।" } },
          { en: "Cool colours", hi: "कूल रंग", def: { en: "Blues, greens and violets that feel calm and move back.", hi: "नीले, हरे और बैंगनी रंग जो शांत लगते हैं और पीछे जाते दिखते हैं।" } },
          { en: "Neutrals", hi: "न्यूट्रल", def: { en: "Black, white, grey, beige, brown and navy: colours that go with almost everything.", hi: "काला, सफ़ेद, ग्रे, बेज, भूरा और नेवी: रंग जो लगभग हर चीज़ के साथ जमते हैं।" } }
        ] },
        { t: "try", text: {
          en: "Sort your wardrobe into three piles: warm, cool and neutral. Which pile is biggest? That tells you your colour comfort zone.",
          hi: "अपने वॉर्डरोब को तीन ढेरों में बाँटो: गर्म, ठंडे और न्यूट्रल। कौन सा ढेर सबसे बड़ा है? यही तुम्हारा कलर कम्फ़र्ट ज़ोन है।" } }
      ]
    },
    /* ---------------- 4. HARMONIOUS SCHEMES ---------------- */
    {
      id: "schemes-harmony",
      title: { en: "Colour schemes I: calm & close", hi: "कलर स्कीम 1: शांत और पास-पास के रंग" },
      min: 6,
      blocks: [
        { t: "p", text: {
          en: "A **colour scheme** is a plan for which colours go together. Instead of guessing, you pick colours by their position on the wheel. Let's start with the two calmest schemes.",
          hi: "**कलर स्कीम (Colour scheme)** यानी कौन से रंग साथ जाएँगे, इसका प्लान। अंदाज़े की जगह तुम रंगों को व्हील पर उनकी जगह से चुनती हो। चलो दो सबसे शांत स्कीम से शुरू करें।" } },
        { t: "h", text: { en: "1. Monochromatic", hi: "1. मोनोक्रोमैटिक" } },
        { t: "p", text: {
          en: "**Mono** means one. A monochromatic look uses one hue in different tints, shades and tones, like a navy kurta with a sky-blue dupatta.",
          hi: "**मोनो** यानी एक। मोनोक्रोमैटिक लुक में एक ही रंग के अलग-अलग टिंट, शेड और टोन होते हैं, जैसे नेवी कुर्ता और आसमानी दुपट्टा।" } },
        { t: "gallery", cols: 2, items: [
          { dg: "color-theory-wheel", args: { scheme: "mono" }, label: { en: "One hue", hi: "एक रंग" } },
          { dg: "color-theory-outfit", args: { top: "#1D5FAE", bottom: "#a9c4e6", acc: "#0f2f5c" }, label: { en: "Blue on blue", hi: "नीले पर नीला" } }
        ] },
        { t: "swatches", items: [{ c: "#0f2f5c" }, { c: "#1D5FAE" }, { c: "#5d8bcc" }, { c: "#a9c4e6" }, { c: "#e3ecf7" }], caption: { en: "Monochromatic blue palette", hi: "मोनोक्रोमैटिक नीला पैलेट" } },
        { t: "img", src: "assets/img/color-theory/monochrome.jpg", caption: {
          en: "A one-colour red dress: monochrome looks tall and polished.",
          hi: "एक रंग की लाल ड्रेस: मोनोक्रोम लुक लंबा और सलीकेदार दिखता है।" } },
        { t: "h", text: { en: "2. Analogous", hi: "2. एनालॉगस" } },
        { t: "p", text: {
          en: "**Analogous** colours are 3 neighbours on the wheel, like blue, blue-green and green. They blend smoothly, like a sunset or a peacock feather.",
          hi: "**एनालॉगस (Analogous)** रंग व्हील पर 3 पड़ोसी रंग हैं, जैसे नीला, नीला-हरा और हरा। ये आराम से घुल-मिल जाते हैं, जैसे सूर्यास्त या मोर का पंख।" } },
        { t: "gallery", cols: 2, items: [
          { dg: "color-theory-wheel", args: { scheme: "analogous" }, label: { en: "3 neighbours", hi: "3 पड़ोसी" } },
          { dg: "color-theory-outfit", args: { top: "#0E9488", bottom: "#1D5FAE", acc: "#25A244" }, label: { en: "Peacock palette", hi: "मोर वाला पैलेट" } }
        ] },
        { t: "swatches", items: [{ c: "#1D5FAE" }, { c: "#0E9488" }, { c: "#25A244" }, { c: "#f3ead8" }], caption: { en: "Analogous: blue, teal, green (with cream to rest the eye)", hi: "एनालॉगस: नीला, टील, हरा (आँखों को आराम देने के लिए क्रीम के साथ)" } },
        { t: "h", text: { en: "The 60-30-10 rule", hi: "60-30-10 का नियम" } },
        { t: "p", text: {
          en: "Don't use colours in equal amounts. Let one colour lead (60%), one support (30%) and one add a spark (10%), like a jacket, a top and a bag.",
          hi: "रंगों को बराबर मात्रा में मत डालो। एक रंग लीड करे (60%), एक साथ दे (30%) और एक चमक जोड़े (10%), जैसे जैकेट, टॉप और बैग।" } },
        { t: "dg", name: "color-theory-603010", args: { c: ["#1D5FAE", "#f3ead8", "#FFA800"] }, caption: {
          en: "60% main colour, 30% second colour, 10% accent.",
          hi: "60% मुख्य रंग, 30% दूसरा रंग, 10% एक्सेंट।" } },
        { t: "tip", kind: "tip", text: {
          en: "Monochrome is the easiest way to look expensive. Mix textures (silk with cotton, matte with shine) so it doesn't look flat.",
          hi: "मोनोक्रोम महँगा दिखने का सबसे आसान तरीक़ा है। टेक्सचर मिलाओ (सिल्क के साथ कॉटन, मैट के साथ चमक) ताकि लुक फीका न लगे।" } },
        { t: "terms", items: [
          { en: "Colour scheme", hi: "कलर स्कीम", def: { en: "A planned group of colours chosen by their place on the colour wheel.", hi: "कलर व्हील पर जगह के हिसाब से चुने गए रंगों का प्लान किया हुआ ग्रुप।" } },
          { en: "Monochromatic", hi: "मोनोक्रोमैटिक", def: { en: "Using one hue in different tints, shades and tones.", hi: "एक ही रंग के अलग-अलग टिंट, शेड और टोन इस्तेमाल करना।" } },
          { en: "Analogous", hi: "एनालॉगस", def: { en: "Three colours that sit next to each other on the wheel.", hi: "तीन रंग जो व्हील पर एक-दूसरे के बगल में हैं।" } },
          { en: "60-30-10 rule", hi: "60-30-10 नियम", def: { en: "Use a main colour for 60%, a second for 30% and an accent for 10%.", hi: "मुख्य रंग 60%, दूसरा 30% और एक्सेंट 10% रखो।" } }
        ] },
        { t: "try", text: {
          en: "Plan one monochromatic and one analogous outfit using clothes you already own. Click a photo of each and compare.",
          hi: "अपने ही कपड़ों से एक मोनोक्रोमैटिक और एक एनालॉगस आउटफ़िट प्लान करो। दोनों की फ़ोटो खींचकर तुलना करो।" } }
      ]
    },
    /* ---------------- 5. CONTRASTING SCHEMES ---------------- */
    {
      id: "schemes-contrast",
      title: { en: "Colour schemes II: bold & balanced", hi: "कलर स्कीम 2: बोल्ड और बैलेंस्ड" },
      min: 7,
      blocks: [
        { t: "p", text: {
          en: "These schemes use colours from **across** the wheel. They create contrast and energy, which is why Indian festive wear loves them.",
          hi: "इन स्कीम में व्हील के **आमने-सामने** के रंग होते हैं। इनसे कंट्रास्ट और एनर्जी आती है, इसीलिए भारतीय त्योहारी कपड़ों में ये बहुत दिखती हैं।" } },
        { t: "h", text: { en: "3. Complementary", hi: "3. कॉम्प्लिमेंट्री" } },
        { t: "p", text: {
          en: "**Complementary** colours sit exactly opposite each other: red and green, blue and orange, yellow and violet. Side by side, each makes the other look brighter.",
          hi: "**कॉम्प्लिमेंट्री (Complementary)** रंग व्हील पर ठीक आमने-सामने होते हैं: लाल और हरा, नीला और नारंगी, पीला और बैंगनी। साथ रखने पर दोनों एक-दूसरे को और चटक दिखाते हैं।" } },
        { t: "gallery", cols: 2, items: [
          { dg: "color-theory-wheel", args: { scheme: "complementary" }, label: { en: "Opposites", hi: "आमने-सामने" } },
          { dg: "color-theory-outfit", args: { top: "#25A244", bottom: "#E0201B", acc: "#FFD200" }, label: { en: "Red lehenga, green choli", hi: "लाल लहंगा, हरी चोली" } }
        ] },
        { t: "img", src: "assets/img/color-theory/complementary.jpg", caption: {
          en: "A blue dress against an orange backdrop: complementary colours make each other pop.",
          hi: "नारंगी बैकग्राउंड पर नीली ड्रेस: कॉम्प्लिमेंट्री रंग एक-दूसरे को उभार देते हैं।" } },
        { t: "h", text: { en: "4. Split-complementary", hi: "4. स्प्लिट-कॉम्प्लिमेंट्री" } },
        { t: "p", text: {
          en: "Take one colour, then instead of its opposite, use the **two neighbours** of the opposite. You get contrast, but softer and easier to wear.",
          hi: "एक रंग लो, फिर उसके सामने वाले रंग की जगह उसके **दोनों पड़ोसी** लो। कंट्रास्ट मिलता है, पर नरम और पहनने में आसान।" } },
        { t: "gallery", cols: 2, items: [
          { dg: "color-theory-wheel", args: { scheme: "split" }, label: { en: "Red + blue-green + yellow-green", hi: "लाल + नीला-हरा + पीला-हरा" } },
          { dg: "color-theory-outfit", args: { top: "#0E9488", bottom: "#E0201B", acc: "#A6C82C" }, label: { en: "Softer contrast", hi: "नरम कंट्रास्ट" } }
        ] },
        { t: "h", text: { en: "5. Triadic", hi: "5. ट्रायडिक" } },
        { t: "p", text: {
          en: "**Triadic** colours are three colours evenly spaced, forming a triangle: orange, violet and green, or red, yellow and blue. Very lively, so let one colour lead.",
          hi: "**ट्रायडिक (Triadic)** रंग तीन बराबर दूरी वाले रंग हैं, जो तिकोन बनाते हैं: नारंगी, बैंगनी और हरा, या लाल, पीला और नीला। बहुत जीवंत, इसलिए एक रंग को लीड करने दो।" } },
        { t: "gallery", cols: 2, items: [
          { dg: "color-theory-wheel", args: { scheme: "triadic" }, label: { en: "A triangle", hi: "एक तिकोन" } },
          { dg: "color-theory-outfit", args: { top: "#6B2C91", bottom: "#25A244", acc: "#FF7A00" }, label: { en: "Violet, green, orange", hi: "बैंगनी, हरा, नारंगी" } }
        ] },
        { t: "h", text: { en: "6. Tetradic (double complementary)", hi: "6. टेट्राडिक (डबल कॉम्प्लिमेंट्री)" } },
        { t: "p", text: {
          en: "**Tetradic** uses two complementary pairs, making a rectangle on the wheel. It is the richest scheme. Think of a Rajasthani bandhani or a phulkari: many colours, still in balance.",
          hi: "**टेट्राडिक (Tetradic)** में दो कॉम्प्लिमेंट्री जोड़ियाँ होती हैं, जो व्हील पर आयत बनाती हैं। ये सबसे भरी हुई स्कीम है। राजस्थानी बांधनी या फुलकारी सोचो: बहुत सारे रंग, फिर भी बैलेंस में।" } },
        { t: "gallery", cols: 2, items: [
          { dg: "color-theory-wheel", args: { scheme: "tetradic" }, label: { en: "A rectangle", hi: "एक आयत" } },
          { src: "assets/img/color-theory/tetradic.jpg", label: { en: "Many colours together", hi: "कई रंग एक साथ" } }
        ] },
        { t: "swatches", items: [{ c: "#FF7A00" }, { c: "#1D5FAE" }, { c: "#E0201B" }, { c: "#25A244" }], caption: { en: "Tetradic: orange + blue, red + green", hi: "टेट्राडिक: नारंगी + नीला, लाल + हरा" } },
        { t: "tip", kind: "mistake", text: {
          en: "Using bold opposites in equal amounts can look like a football jersey. Follow 60-30-10, or soften one colour into a tint or shade.",
          hi: "बोल्ड आमने-सामने वाले रंग बराबर मात्रा में डालने से लुक फ़ुटबॉल जर्सी जैसा लग सकता है। 60-30-10 मानो, या एक रंग को टिंट या शेड में बदल दो।" } },
        { t: "terms", items: [
          { en: "Complementary", hi: "कॉम्प्लिमेंट्री", def: { en: "Two colours directly opposite each other on the wheel.", hi: "व्हील पर ठीक आमने-सामने के दो रंग।" } },
          { en: "Split-complementary", hi: "स्प्लिट-कॉम्प्लिमेंट्री", def: { en: "One colour plus the two colours beside its opposite.", hi: "एक रंग, और उसके सामने वाले रंग के दोनों पड़ोसी।" } },
          { en: "Triadic", hi: "ट्रायडिक", def: { en: "Three colours evenly spaced around the wheel, making a triangle.", hi: "व्हील पर बराबर दूरी के तीन रंग, जो तिकोन बनाते हैं।" } },
          { en: "Tetradic", hi: "टेट्राडिक", def: { en: "Four colours made of two complementary pairs, making a rectangle.", hi: "दो कॉम्प्लिमेंट्री जोड़ियों से बने चार रंग, जो आयत बनाते हैं।" } }
        ] },
        { t: "try", text: {
          en: "Cut a triangle and a rectangle from card. Spin them on your colour wheel and write down 3 triadic and 2 tetradic palettes you like.",
          hi: "कार्ड से एक तिकोन और एक आयत काटो। इन्हें अपने कलर व्हील पर घुमाओ और अपनी पसंद के 3 ट्रायडिक और 2 टेट्राडिक पैलेट लिखो।" } }
      ]
    },
    /* ---------------- 6. PSYCHOLOGY & CULTURE ---------------- */
    {
      id: "colour-meaning-india",
      title: { en: "Colour psychology & colours in India", hi: "रंगों का मनोविज्ञान और भारत में रंग" },
      min: 7,
      blocks: [
        { t: "p", text: {
          en: "Colours talk before you do. **Colour psychology** studies the feelings and meanings we link with colours. Meanings change with culture, so a designer must know who she is designing for.",
          hi: "रंग तुमसे पहले बोल पड़ते हैं। **कलर साइकोलॉजी (Colour psychology)** उन भावनाओं और मतलबों को पढ़ती है जो हम रंगों से जोड़ते हैं। मतलब संस्कृति के साथ बदलते हैं, इसलिए डिज़ाइनर को पता होना चाहिए कि वो किसके लिए डिज़ाइन कर रही है।" } },
        { t: "cards", items: [
          { icon: "heart", title: { en: "Red", hi: "लाल" }, text: { en: "Love, power, energy, danger. In India: marriage, auspiciousness, the bride.", hi: "प्यार, ताक़त, एनर्जी, ख़तरा। भारत में: शादी, शुभ, दुल्हन।" } },
          { icon: "sun", title: { en: "Yellow", hi: "पीला" }, text: { en: "Joy, optimism, warmth. In India: haldi, spring (basant), prosperity.", hi: "ख़ुशी, उम्मीद, गर्मजोशी। भारत में: हल्दी, बसंत, समृद्धि।" } },
          { icon: "leaf", title: { en: "Green", hi: "हरा" }, text: { en: "Nature, growth, fertility. In India: mehendi, Teej, a happy married life.", hi: "प्रकृति, बढ़ोतरी, उपज। भारत में: मेहंदी, तीज, सुखी वैवाहिक जीवन।" } },
          { icon: "drop", title: { en: "Blue", hi: "नीला" }, text: { en: "Trust, calm, depth. In India: Krishna, the sky; navy is a work-wear classic.", hi: "भरोसा, शांति, गहराई। भारत में: कृष्ण, आसमान; नेवी ऑफ़िस वियर का क्लासिक है।" } },
          { icon: "star", title: { en: "White", hi: "सफ़ेद" }, text: { en: "Purity, peace, simplicity. In India: also mourning, but also Kerala's festive kasavu saree.", hi: "पवित्रता, शांति, सादगी। भारत में: शोक का रंग भी, पर केरल की त्योहारी कसावु साड़ी भी।" } },
          { icon: "flower", title: { en: "Saffron", hi: "केसरिया" }, text: { en: "Sacrifice, courage, spirituality. Worn by sadhus, and in our national flag.", hi: "त्याग, साहस, अध्यात्म। साधु पहनते हैं, और हमारे राष्ट्रीय झंडे में भी है।" } }
        ] },
        { t: "img", src: "assets/img/color-theory/wedding-red.jpg", caption: {
          en: "Red and pink for the bride, white and ivory for the groom: a classic Indian wedding palette.",
          hi: "दुल्हन के लिए लाल और गुलाबी, दूल्हे के लिए सफ़ेद और आइवरी: क्लासिक भारतीय शादी का पैलेट।" } },
        { t: "h", text: { en: "Festival and ceremony palettes", hi: "त्योहार और रस्मों के पैलेट" } },
        { t: "gallery", cols: 2, items: [
          { src: "assets/img/color-theory/holi-colours.jpg", label: { en: "Holi: every colour", hi: "होली: हर रंग" }, note: { en: "Gulal in bright primaries: joy and spring", hi: "चटक प्राइमरी रंगों का गुलाल: ख़ुशी और बसंत" } },
          { src: "assets/img/color-theory/haldi.jpg", label: { en: "Haldi: yellow", hi: "हल्दी: पीला" }, note: { en: "Everyone wears yellow cotton for good luck", hi: "सब शुभ के लिए पीले सूती कपड़े पहनते हैं" } }
        ] },
        { t: "swatches", items: [
          { c: "#B3122D", label: { en: "Bridal red", hi: "दुल्हन का लाल" } }, { c: "#F2B705", label: { en: "Haldi yellow", hi: "हल्दी पीला" } },
          { c: "#2E7D32", label: { en: "Mehendi green", hi: "मेहंदी हरा" } }, { c: "#FF9933", label: { en: "Saffron", hi: "केसरिया" } },
          { c: "#E91E8C", label: { en: "Rani pink", hi: "रानी पिंक" } }, { c: "#F5EBD7", label: { en: "Kasavu cream", hi: "कसावु क्रीम" } } ],
          caption: { en: "Some colours Indian festive wear is built on.", hi: "कुछ रंग जिन पर भारतीय त्योहारी कपड़े बने हैं।" } },
        { t: "h", text: { en: "Seasonal palettes & Pantone", hi: "सीज़नल पैलेट और पैंटोन" } },
        { t: "p", text: {
          en: "Fashion is planned in **seasons**. Summer palettes are light and fresh (pastels, aqua, coral). Winter palettes are deep (maroon, bottle green, charcoal). Indian festive season, from Navratri to Diwali, brings jewel tones.",
          hi: "फ़ैशन **सीज़न** के हिसाब से प्लान होता है। गर्मी के पैलेट हल्के और ताज़े होते हैं (पेस्टल, आसमानी, कोरल)। सर्दी के पैलेट गहरे (मैरून, बोतल हरा, चारकोल)। नवरात्रि से दिवाली तक का त्योहारी सीज़न ज्वेल टोन लाता है।" } },
        { t: "swatches", items: [
          { c: "#F7CAC9", label: { en: "Summer", hi: "गर्मी" } }, { c: "#7FCDCD", label: { en: "Summer", hi: "गर्मी" } },
          { c: "#FF6F61", label: { en: "Summer", hi: "गर्मी" } }, { c: "#7B1E3A", label: { en: "Winter", hi: "सर्दी" } },
          { c: "#0B4F3A", label: { en: "Winter", hi: "सर्दी" } }, { c: "#36454F", label: { en: "Winter", hi: "सर्दी" } } ],
          caption: { en: "Two seasonal palettes: light and fresh vs deep and rich.", hi: "दो सीज़नल पैलेट: हल्के और ताज़े बनाम गहरे और भरपूर।" } },
        { t: "p", text: {
          en: "**Pantone** is a company that names colours with numbers so printers and factories everywhere can match them. Every year it picks a **Colour of the Year**, such as Living Coral in 2019. Designers watch it as a trend signal.",
          hi: "**पैंटोन (Pantone)** एक कंपनी है जो रंगों को नंबर देती है ताकि दुनिया भर के प्रिंटर और फ़ैक्ट्रियाँ वही रंग मिला सकें। हर साल वो एक **कलर ऑफ़ द ईयर** चुनती है, जैसे 2019 का लिविंग कोरल। डिज़ाइनर इसे ट्रेंड का इशारा मानते हैं।" } },
        { t: "tip", kind: "tip", text: {
          en: "Know your client. A red dress is a bridal choice in India but may feel loud at a funeral, and white means different things in different homes. Ask first!",
          hi: "अपने क्लाइंट को जानो। भारत में लाल ड्रेस दुल्हन की पसंद है, पर किसी शोक के मौक़े पर चुभ सकती है, और सफ़ेद का मतलब अलग घरों में अलग होता है। पहले पूछ लो!" } },
        { t: "terms", items: [
          { en: "Colour psychology", hi: "कलर साइकोलॉजी", def: { en: "The study of how colours affect feelings and behaviour.", hi: "इसका अध्ययन कि रंग भावनाओं और व्यवहार पर कैसे असर डालते हैं।" } },
          { en: "Palette", hi: "पैलेट", def: { en: "The set of colours chosen for a design or a collection.", hi: "किसी डिज़ाइन या कलेक्शन के लिए चुने गए रंगों का सेट।" } },
          { en: "Jewel tones", hi: "ज्वेल टोन", def: { en: "Deep, rich colours like ruby red, emerald, sapphire and amethyst.", hi: "गहरे, भरपूर रंग, जैसे रूबी लाल, पन्ना हरा, नीलम नीला और जामुनी।" } },
          { en: "Pantone Colour of the Year", hi: "पैंटोन कलर ऑफ़ द ईयर", def: { en: "One colour chosen each year by Pantone to show the mood of the time.", hi: "हर साल पैंटोन द्वारा चुना गया एक रंग जो उस समय का मूड दिखाता है।" } }
        ] },
        { t: "try", text: {
          en: "Pick a festival (Navratri, Eid, Christmas, Onam). Make a 5-colour palette for it with swatches of paint or fabric, and note what each colour means.",
          hi: "कोई त्योहार चुनो (नवरात्रि, ईद, क्रिसमस, ओणम)। पेंट या कपड़े के टुकड़ों से उसका 5 रंगों का पैलेट बनाओ और हर रंग का मतलब लिखो।" } }
      ]
    }
  ],
  quiz: [
    { q: { en: "Which three colours are the primary colours on the artist's wheel?", hi: "आर्टिस्ट के व्हील पर तीन प्राइमरी रंग कौन से हैं?" },
      options: [{ en: "Red, yellow, blue", hi: "लाल, पीला, नीला" }, { en: "Red, green, blue", hi: "लाल, हरा, नीला" }, { en: "Orange, green, violet", hi: "नारंगी, हरा, बैंगनी" }], answer: 0,
      dg: "color-theory-wheel", args: { hl: [0, 4, 8] },
      why: { en: "Red, yellow and blue cannot be mixed from other paints. (RGB is for light on screens.)", hi: "लाल, पीला और नीला दूसरे पेंट से नहीं बनते। (RGB स्क्रीन की रोशनी के लिए है।)" } },
    { q: { en: "Yellow + blue = ?", hi: "पीला + नीला = ?" },
      options: [{ en: "Orange", hi: "नारंगी" }, { en: "Violet", hi: "बैंगनी" }, { en: "Green", hi: "हरा" }], answer: 2,
      why: { en: "Two primaries make a secondary colour: yellow and blue make green.", hi: "दो प्राइमरी मिलकर सेकेंडरी बनाते हैं: पीला और नीला मिलकर हरा।" } },
    { q: { en: "A colour mixed with white is called a...", hi: "सफ़ेद मिला हुआ रंग क्या कहलाता है?" },
      options: [{ en: "Shade", hi: "शेड" }, { en: "Tint", hi: "टिंट" }, { en: "Tone", hi: "टोन" }], answer: 1,
      dg: "color-theory-scale", args: { kind: "tint", hex: "#1D5FAE" },
      why: { en: "Tint = hue + white (pastels). Shade = + black. Tone = + grey.", hi: "टिंट = रंग + सफ़ेद (पेस्टल)। शेड = + काला। टोन = + ग्रे।" } },
    { q: { en: "Which word means \"how light or dark a colour is\"?", hi: "\"रंग कितना हल्का या गहरा है\" के लिए कौन सा शब्द है?" },
      options: [{ en: "Hue", hi: "ह्यू" }, { en: "Value", hi: "वैल्यू" }, { en: "Saturation", hi: "सैचुरेशन" }], answer: 1,
      why: { en: "Value is lightness or darkness. Hue is the colour family; saturation is brightness.", hi: "वैल्यू यानी हल्कापन या गहरापन। ह्यू रंग का परिवार है; सैचुरेशन चटकपन।" } },
    { q: { en: "Which of these is a COOL colour?", hi: "इनमें से कौन सा ठंडा (कूल) रंग है?" },
      options: [{ en: "Orange", hi: "नारंगी" }, { en: "Red", hi: "लाल" }, { en: "Blue-green", hi: "नीला-हरा" }], answer: 2,
      dg: "color-theory-wheel", args: { split: true },
      why: { en: "Blues, greens and violets are cool; reds, oranges and yellows are warm.", hi: "नीले, हरे और बैंगनी ठंडे हैं; लाल, नारंगी और पीले गर्म।" } },
    { q: { en: "Which scheme is this?", hi: "ये कौन सी स्कीम है?" },
      options: [{ en: "Analogous", hi: "एनालॉगस" }, { en: "Complementary", hi: "कॉम्प्लिमेंट्री" }, { en: "Triadic", hi: "ट्रायडिक" }], answer: 1,
      dg: "color-theory-wheel", args: { scheme: "complementary" },
      why: { en: "Two colours directly opposite each other are complementary.", hi: "ठीक आमने-सामने के दो रंग कॉम्प्लिमेंट्री होते हैं।" } },
    { q: { en: "Which scheme is this?", hi: "ये कौन सी स्कीम है?" },
      options: [{ en: "Triadic", hi: "ट्रायडिक" }, { en: "Tetradic", hi: "टेट्राडिक" }, { en: "Analogous", hi: "एनालॉगस" }], answer: 0,
      dg: "color-theory-wheel", args: { scheme: "triadic" },
      why: { en: "Three evenly spaced colours form a triangle: triadic.", hi: "बराबर दूरी के तीन रंग तिकोन बनाते हैं: ट्रायडिक।" } },
    { q: { en: "Blue, blue-green and green sit side by side on the wheel. This is...", hi: "नीला, नीला-हरा और हरा व्हील पर साथ-साथ हैं। ये है...?" },
      options: [{ en: "Analogous", hi: "एनालॉगस" }, { en: "Split-complementary", hi: "स्प्लिट-कॉम्प्लिमेंट्री" }, { en: "Monochromatic", hi: "मोनोक्रोमैटिक" }], answer: 0,
      dg: "color-theory-wheel", args: { scheme: "analogous" },
      why: { en: "Neighbouring colours make an analogous scheme.", hi: "पड़ोसी रंग एनालॉगस स्कीम बनाते हैं।" } },
    { q: { en: "In the 60-30-10 rule, what does the 10% do?", hi: "60-30-10 नियम में 10% क्या करता है?" },
      options: [{ en: "It is the main colour", hi: "ये मुख्य रंग है" }, { en: "It adds a small accent of colour", hi: "ये रंग का छोटा एक्सेंट जोड़ता है" }, { en: "It is always black", hi: "ये हमेशा काला होता है" }], answer: 1,
      dg: "color-theory-603010",
      why: { en: "60% leads, 30% supports, 10% is the spark: a bag, a belt or jewellery.", hi: "60% लीड करता है, 30% साथ देता है, 10% चमक है: बैग, बेल्ट या ज्वेलरी।" } },
    { q: { en: "In Indian tradition, which colour is most linked with the bride?", hi: "भारतीय परंपरा में दुल्हन से सबसे ज़्यादा जुड़ा रंग कौन सा है?" },
      options: [{ en: "Red", hi: "लाल" }, { en: "Grey", hi: "ग्रे" }, { en: "Navy", hi: "नेवी" }], answer: 0,
      src: "assets/img/color-theory/wedding-red.jpg",
      why: { en: "Red stands for marriage and good luck, so bridal lehengas and sarees are often red.", hi: "लाल शादी और शुभ का प्रतीक है, इसलिए दुल्हन के लहंगे और साड़ियाँ अक्सर लाल होती हैं।" } }
  ]
});
