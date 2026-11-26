/* Module 1 - Fashion Basics */

/* The fashion cycle: a bell curve with 5 stages. args.hl = 0..4 highlights one stage. */
FD.diagram("fashion-basics-cycle", function (a, lang) {
  var x0 = 24, x1 = 304, base = 150, top = 26;
  function yAt(x) { var u = (x - 164) / 62; return base - (base - top) * Math.exp(-u * u); }
  var cuts = [x0, 80, 136, 192, 248, x1];
  var names = [
    { en: "Introduction", hi: "शुरुआत" }, { en: "Rise", hi: "बढ़त" }, { en: "Peak", hi: "पीक" },
    { en: "Decline", hi: "गिरावट" }, { en: "Obsolete", hi: "पुराना" }];
  var who = [
    { en: "a few", hi: "कुछ लोग" }, { en: "more people", hi: "और लोग" }, { en: "everyone", hi: "सब लोग" },
    { en: "bored", hi: "ऊब गए" }, { en: "out", hi: "बाहर" }];
  var hl = typeof a.hl === "number" ? a.hl : -1;
  var s = "";
  /* highlighted area under the curve */
  if (hl >= 0) {
    var p = "M" + cuts[hl] + " " + base;
    for (var x = cuts[hl]; x <= cuts[hl + 1]; x += 2) p += " L" + x + " " + yAt(x).toFixed(1);
    p += " L" + cuts[hl + 1] + " " + base + " Z";
    s += '<path d="' + p + '" class="sf"/>';
  }
  /* stage dividers */
  for (var i = 1; i < 5; i++) s += '<line x1="' + cuts[i] + '" y1="' + base + '" x2="' + cuts[i] + '" y2="' + (yAt(cuts[i]) + 4).toFixed(1) + '" class="gd"/>';
  /* curve */
  var d = "M" + x0 + " " + yAt(x0).toFixed(1);
  for (var xx = x0 + 2; xx <= x1; xx += 2) d += " L" + xx + " " + yAt(xx).toFixed(1);
  s += '<path d="' + d + '" class="ac" stroke-width="2.5"/>';
  /* axes */
  s += '<line x1="' + x0 + '" y1="' + base + '" x2="' + (x1 + 6) + '" y2="' + base + '" class="ln"/>';
  s += '<line x1="' + x0 + '" y1="' + base + '" x2="' + x0 + '" y2="14" class="ln"/>';
  s += '<path d="M' + (x1 + 2) + ' ' + (base - 3) + ' L' + (x1 + 7) + ' ' + base + ' L' + (x1 + 2) + ' ' + (base + 3) + '" class="ln"/>';
  s += '<path d="M' + (x0 - 3) + ' 18 L' + x0 + ' 13 L' + (x0 + 3) + ' 18" class="ln"/>';
  s += FD.text(x0 + 6, 16, FD.tx({ en: "How popular", hi: "कितना पॉपुलर" }, lang), { cls: "tm", anchor: "start", size: 8 });
  s += FD.text(x1 + 6, base + 34, FD.tx({ en: "Time", hi: "समय" }, lang), { cls: "tm", anchor: "end", size: 8 });
  /* stage labels + dots */
  for (var k = 0; k < 5; k++) {
    var cx = (cuts[k] + cuts[k + 1]) / 2, on = k === hl;
    s += '<circle cx="' + cx + '" cy="' + yAt(cx).toFixed(1) + '" r="' + (on ? 5 : 3.5) + '" class="' + (on ? "acf" : "fl") + '"/>';
    s += FD.text(cx, base + 14, FD.tx(names[k], lang), { cls: on ? "acf" : "tx", size: 9 });
    s += FD.text(cx, base + 25, FD.tx(who[k], lang), { cls: "tm", size: 7.5 });
  }
  return FD.svg(320, 190, s);
});

/* Fad vs trend vs classic: three popularity lines over time. */
FD.diagram("fashion-basics-lifespans", function (a, lang) {
  var x0 = 24, x1 = 300, base = 150;
  function line(fn, cls, extra) {
    var d = "";
    for (var x = x0; x <= x1; x += 3) d += (x === x0 ? "M" : " L") + x + " " + fn(x).toFixed(1);
    return '<path d="' + d + '" class="' + cls + '" stroke-width="2.4"' + (extra || "") + "/>";
  }
  function fad(x) { var u = (x - 70) / 14; return base - 112 * Math.exp(-u * u); }
  function trend(x) { var u = (x - 160) / 48; return base - 78 * Math.exp(-u * u); }
  function classic(x) { var r = 1 / (1 + Math.exp(-(x - 70) / 14)); return base - 8 - 52 * r; }
  var s = "";
  s += '<line x1="' + x0 + '" y1="' + base + '" x2="' + (x1 + 6) + '" y2="' + base + '" class="ln"/>';
  s += '<line x1="' + x0 + '" y1="' + base + '" x2="' + x0 + '" y2="16" class="ln"/>';
  s += FD.text(x0 + 6, 18, FD.tx({ en: "How popular", hi: "कितना पॉपुलर" }, lang), { cls: "tm", anchor: "start", size: 8 });
  s += FD.text(x1 + 6, base + 14, FD.tx({ en: "Time", hi: "समय" }, lang), { cls: "tm", anchor: "end", size: 8 });
  s += line(classic, "ln", ' stroke-dasharray="1 0"');
  s += line(trend, "ac");
  s += line(fad, "ac", ' stroke-dasharray="5 4"');
  s += FD.text(96, 42, FD.tx({ en: "Fad", hi: "फ़ैड" }, lang), { cls: "acf", anchor: "start", size: 10 });
  s += FD.text(96, 53, FD.tx({ en: "quick spike, quick fall", hi: "तेज़ी से ऊपर, तेज़ी से नीचे" }, lang), { cls: "tm", anchor: "start", size: 7.5 });
  s += FD.text(200, 70, FD.tx({ en: "Trend", hi: "ट्रेंड" }, lang), { cls: "acf", anchor: "start", size: 10 });
  s += FD.text(200, 81, FD.tx({ en: "a few seasons", hi: "कुछ सीज़न तक" }, lang), { cls: "tm", anchor: "start", size: 7.5 });
  s += FD.text(298, 86, FD.tx({ en: "Classic", hi: "क्लासिक" }, lang), { cls: "tx", anchor: "end", size: 10 });
  s += FD.text(298, 108, FD.tx({ en: "stays for years", hi: "सालों तक रहता है" }, lang), { cls: "tm", anchor: "end", size: 7.5 });
  return FD.svg(320, 170, s);
});

/* Levels of fashion: a pyramid. args.hl = 0 (top) .. 3 (base). */
FD.diagram("fashion-basics-pyramid", function (a, lang) {
  var ax = 92, ay = 14, by = 214, half = 82;
  var ys = [14, 66, 112, 160, 214];
  var hl = typeof a.hl === "number" ? a.hl : -1;
  var name = [
    { en: "Haute couture", hi: "हॉट कूटूर" }, { en: "Luxury prêt-à-porter", hi: "लक्ज़री प्रेट" },
    { en: "Diffusion / bridge", hi: "डिफ़्यूज़न / ब्रिज" }, { en: "Mass market", hi: "मास मार्केट" }];
  var sub = [
    { en: "made to measure, by hand", hi: "नाप से, हाथ से बना" }, { en: "designer ready-to-wear", hi: "डिज़ाइनर रेडी-टू-वेयर" },
    { en: "designer's lower-price line", hi: "डिज़ाइनर की सस्ती लाइन" }, { en: "high street, big volumes", hi: "हाई स्ट्रीट, ढेर सारा माल" }];
  var price = ["₹₹₹₹", "₹₹₹", "₹₹", "₹"];
  function hw(y) { return half * (y - ay) / (by - ay); }
  var s = "";
  for (var i = 0; i < 4; i++) {
    var t = ys[i], b = ys[i + 1], on = i === hl;
    var pts = (ax - hw(t)) + "," + t + " " + (ax + hw(t)) + "," + t + " " + (ax + hw(b)) + "," + b + " " + (ax - hw(b)) + "," + b;
    s += '<polygon points="' + pts + '" class="' + (on ? "sf" : "fl") + '"/>';
    if (on) s += '<polygon points="' + pts + '" class="ac" stroke-width="2.5"/>';
    var my = (t + b) / 2;
    s += FD.text(ax, my + (i === 0 ? 12 : 4), price[i], { cls: on ? "acf" : "tm", size: i === 0 ? 8 : 10 });
    s += '<line x1="' + (ax + hw(my) + 4) + '" y1="' + my + '" x2="186" y2="' + my + '" class="gd"/>';
    s += FD.text(190, my - 1, FD.tx(name[i], lang), { cls: on ? "acf" : "tx", anchor: "start", size: 10 });
    s += FD.text(190, my + 10, FD.tx(sub[i], lang), { cls: "tm", anchor: "start", size: 7.5 });
  }
  s += FD.text(8, 30, FD.tx({ en: "fewer,", hi: "कम," }, lang), { cls: "tm", anchor: "start", size: 7.5 });
  s += FD.text(8, 40, FD.tx({ en: "costlier", hi: "महंगे" }, lang), { cls: "tm", anchor: "start", size: 7.5 });
  s += '<line x1="14" y1="200" x2="14" y2="52" class="gd"/><path d="M11 56 L14 50 L17 56" class="ln"/>';
  return FD.svg(320, 222, s);
});

/* The fashion year: global shows vs Indian festive and wedding seasons. */
FD.diagram("fashion-basics-year", function (a, lang) {
  var lx = 66, cw = 21, top = 22, rh = 30;
  var months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
  var rows = [
    { name: { en: "Global shows", hi: "ग्लोबल शो" }, bars: [[1, 2, "AW"], [4, 5, { en: "Resort", hi: "रिज़ॉर्ट" }], [8, 9, "SS"]] },
    { name: { en: "Indian shows", hi: "इंडियन शो" }, bars: [[2, 2, "LFW"], [6, 7, "ICW"], [9, 9, "LFW"]] },
    { name: { en: "Festivals", hi: "त्योहार" }, bars: [[8, 10, { en: "Navratri-Diwali", hi: "नवरात्रि-दिवाली" }]] },
    { name: { en: "Weddings", hi: "शादियाँ" }, bars: [[10, 11, ""], [0, 1, ""], [3, 4, ""]] }
  ];
  var s = "";
  for (var m = 0; m < 12; m++) {
    var x = lx + m * cw;
    s += FD.text(x + cw / 2, top - 6, months[m], { cls: "tm", size: 8 });
    if (m) s += '<line x1="' + x + '" y1="' + top + '" x2="' + x + '" y2="' + (top + rows.length * rh) + '" class="gd" opacity=".45"/>';
  }
  rows.forEach(function (r, i) {
    var y = top + i * rh;
    s += '<line x1="4" y1="' + y + '" x2="' + (lx + 12 * cw) + '" y2="' + y + '" class="gd" opacity=".6"/>';
    s += FD.text(lx - 6, y + rh / 2 + 3, FD.tx(r.name, lang), { cls: "tx", anchor: "end", size: 9 });
    r.bars.forEach(function (b) {
      var bx = lx + b[0] * cw + 1.5, bw = (b[1] - b[0] + 1) * cw - 3;
      s += '<rect x="' + bx + '" y="' + (y + 6) + '" width="' + bw + '" height="' + (rh - 12) + '" rx="8" class="' + (i < 2 ? "sf" : "acf") + '"' + (i < 2 ? "" : ' opacity="' + (i === 2 ? 0.85 : 0.55) + '"') + "/>";
      if (i < 2) s += '<rect x="' + bx + '" y="' + (y + 6) + '" width="' + bw + '" height="' + (rh - 12) + '" rx="8" class="ac"/>';
      var lb = FD.tx(b[2], lang);
      if (lb) s += '<text x="' + (bx + bw / 2) + '" y="' + (y + rh / 2 + 3) + '" text-anchor="middle" font-size="7" ' +
        (i < 2 ? 'class="tx"' : 'fill="#fff"') + ">" + FD.esc(lb) + "</text>";
    });
  });
  s += '<line x1="4" y1="' + (top + rows.length * rh) + '" x2="' + (lx + 12 * cw) + '" y2="' + (top + rows.length * rh) + '" class="gd" opacity=".6"/>';
  return FD.svg(320, top + rows.length * rh + 6, s);
});

/* Three basic silhouettes as simple dress outlines (right half, mirrored). args.type = "a" | "x" | "h" */
FD.diagram("fashion-basics-silhouette", function (a, lang) {
  var t = a.type || "a", s = "";
  var half = {
    a: "M60 24 L69 25 Q74 31 72 44 Q71 52 69 58 L94 125 Q80 130 60 131",
    x: "M60 24 L74 25 Q79 31 78 44 Q76 54 68 63 Q78 74 80 88 Q80 108 74 127 Q66 129 60 129",
    h: "M60 24 L73 25 Q78 31 77 44 L77 128 Q68 129 60 129"
  }[t] || "";
  s += FD.mirror(60, '<path d="' + half + '" class="sf"/>');
  s += FD.mirror(60, '<path d="' + half + '" class="ac" stroke-width="2"/>');
  s += '<circle cx="60" cy="12" r="7" class="ln"/><line x1="60" y1="19" x2="60" y2="24" class="ln"/>';
  return FD.svg(120, 136, s);
});

var FBI = "assets/img/fashion-basics/";

FD.module({
  id: "fashion-basics",
  num: 1,
  level: "basic",
  title: { en: "Fashion Basics", hi: "फ़ैशन की बेसिक बातें" },
  tagline: { en: "Start here: what fashion really is, how it moves, and the words designers use", hi: "यहाँ से शुरू करो: फ़ैशन असल में क्या है, ये कैसे बदलता है, और डिज़ाइनर कौन से शब्द बोलते हैं" },
  cover: FBI + "cover.jpg",
  learn: [
    { en: "The difference between clothing, fashion, style, trend, fad and classic", hi: "कपड़े, फ़ैशन, स्टाइल, ट्रेंड, फ़ैड और क्लासिक में फ़र्क" },
    { en: "How a fashion trend is born, peaks and fades (the fashion cycle)", hi: "फ़ैशन ट्रेंड कैसे शुरू होता है, पीक पर पहुँचता है और खत्म होता है (फ़ैशन साइकिल)" },
    { en: "Haute couture, ready-to-wear and fast fashion - who makes what", hi: "हॉट कूटूर, रेडी-टू-वेयर और फ़ास्ट फ़ैशन - कौन क्या बनाता है" },
    { en: "Fashion seasons, fashion weeks and India's wedding season", hi: "फ़ैशन सीज़न, फ़ैशन वीक और भारत का शादियों का सीज़न" },
    { en: "The careers in fashion and the beginner words you will hear every day", hi: "फ़ैशन के करियर और वो शुरुआती शब्द जो तुम रोज़ सुनोगी" }
  ],
  lessons: [
    {
      id: "what-is-fashion",
      title: { en: "What is fashion?", hi: "फ़ैशन क्या है?" },
      min: 6,
      blocks: [
        { t: "p", text: {
          en: "Everyone wears clothes. But only some clothes are **fashion**. Fashion is clothing that a lot of people like and want right now - and it keeps changing.",
          hi: "कपड़े तो सब पहनते हैं। लेकिन हर कपड़ा **फ़ैशन (Fashion)** नहीं होता। फ़ैशन वो कपड़े हैं जो बहुत सारे लोग अभी पसंद करते हैं और पहनना चाहते हैं - और ये बदलता रहता है।" } },
        { t: "img", src: FBI + "everyday-kurtas.jpg", caption: {
          en: "Plain everyday clothing: kurtas and salwars, worn for comfort.",
          hi: "रोज़ के सादे कपड़े: कुर्ते और सलवार, आराम के लिए पहने जाते हैं।" } },
        { t: "cards", items: [
          { icon: "shirt", title: { en: "Clothing", hi: "कपड़े (Clothing)" }, text: { en: "Anything you wear to cover and protect your body.", hi: "कुछ भी जो तुम शरीर को ढकने और बचाने के लिए पहनती हो।" } },
          { icon: "sparkle", title: { en: "Fashion", hi: "फ़ैशन" }, text: { en: "The styles most people like at a given time. It changes.", hi: "वो स्टाइल जो किसी समय ज़्यादातर लोगों को पसंद आती हैं। ये बदलता है।" } },
          { icon: "heart", title: { en: "Style", hi: "स्टाइल" }, text: { en: "YOUR personal way of dressing. It stays with you.", hi: "कपड़े पहनने का तुम्हारा अपना तरीका। ये तुम्हारे साथ रहता है।" } },
          { icon: "trend", title: { en: "Trend", hi: "ट्रेंड" }, text: { en: "A look that is growing popular and lasts a few seasons.", hi: "ऐसा लुक जो पॉपुलर हो रहा है और कुछ सीज़न चलता है।" } },
          { icon: "clock", title: { en: "Fad", hi: "फ़ैड" }, text: { en: "A very short craze - hot today, gone in a few weeks.", hi: "बहुत छोटा क्रेज़ - आज हॉट, कुछ हफ़्तों में गायब।" } },
          { icon: "crown", title: { en: "Classic", hi: "क्लासिक" }, text: { en: "A design that never really goes out, like a white shirt or a saree.", hi: "ऐसा डिज़ाइन जो कभी पुराना नहीं होता, जैसे सफ़ेद शर्ट या साड़ी।" } }
        ] },
        { t: "dg", name: "fashion-basics-lifespans", caption: {
          en: "Same axes, three lifespans: a fad spikes and drops, a trend rises and falls slowly, a classic simply stays.",
          hi: "एक ही ग्राफ़, तीन उम्रें: फ़ैड तेज़ी से चढ़ता-गिरता है, ट्रेंड धीरे चढ़कर उतरता है, और क्लासिक बस टिका रहता है।" } },
        { t: "gallery", items: [
          { src: FBI + "modern-saree.jpg", label: { en: "Style", hi: "स्टाइल" }, note: { en: "A saree worn in a modern, personal way", hi: "साड़ी को अपने मॉडर्न अंदाज़ में पहनना" } },
          { src: FBI + "chanel-suit.jpg", label: { en: "Classic", hi: "क्लासिक" }, note: { en: "A Chanel suit from 1965, still copied today", hi: "1965 का शैनल सूट, आज भी कॉपी होता है" } },
          { src: FBI + "high-street-store.jpg", label: { en: "Fashion", hi: "फ़ैशन" }, note: { en: "Street looks shaped by what shops sell now", hi: "दुकानों में अभी जो बिक रहा है, उससे बने लुक" } }
        ] },
        { t: "tip", kind: "remember", text: {
          en: "Fashion belongs to **everyone at a time**. Style belongs to **you**. Fashion fades; style stays.",
          hi: "फ़ैशन **उस समय सबका** होता है। स्टाइल **सिर्फ़ तुम्हारी** होती है। फ़ैशन फीका पड़ता है; स्टाइल रहती है।" } },
        { t: "terms", items: [
          { en: "Fashion", hi: "फ़ैशन", def: { en: "The style of dress that is popular at a certain time.", hi: "कपड़ों की वो स्टाइल जो किसी समय पॉपुलर होती है।" } },
          { en: "Style", hi: "स्टाइल", def: { en: "Your own personal way of dressing.", hi: "कपड़े पहनने का तुम्हारा अपना तरीका।" } },
          { en: "Trend", hi: "ट्रेंड", def: { en: "A look rising in popularity, usually lasting a few seasons.", hi: "ऐसा लुक जिसकी पॉपुलैरिटी बढ़ रही हो, आमतौर पर कुछ सीज़न चलता है।" } },
          { en: "Fad", hi: "फ़ैड", def: { en: "A short-lived craze that fades fast.", hi: "छोटा क्रेज़ जो जल्दी खत्म हो जाता है।" } },
          { en: "Classic", hi: "क्लासिक", def: { en: "A timeless design that stays in use for years.", hi: "सालों चलने वाला, कभी पुराना न होने वाला डिज़ाइन।" } }
        ] },
        { t: "try", text: {
          en: "Open your wardrobe. Sort 6 pieces into: clothing, trend, fad, classic. Which piece is most 'you'? That is your style.",
          hi: "अपनी अलमारी खोलो। 6 कपड़ों को छाँटो: कपड़े, ट्रेंड, फ़ैड, क्लासिक। कौन सा सबसे ज़्यादा 'तुम' है? वही तुम्हारी स्टाइल है।" } }
      ]
    },
    {
      id: "fashion-cycle",
      title: { en: "The fashion cycle", hi: "फ़ैशन साइकिल" },
      min: 6,
      blocks: [
        { t: "p", text: {
          en: "Why did your mum's bell-bottoms come back as flared jeans? Because fashion moves in a **cycle**. Every trend is born, grows, peaks and fades - then often returns.",
          hi: "तुम्हारी मम्मी की बेल-बॉटम फ़्लेयर्ड जीन्स बनकर क्यों लौट आई? क्योंकि फ़ैशन एक **साइकिल (Cycle)** में चलता है। हर ट्रेंड पैदा होता है, बढ़ता है, पीक पर पहुँचता है और फीका पड़ता है - और अक्सर वापस आ जाता है।" } },
        { t: "dg", name: "fashion-basics-cycle", caption: {
          en: "The five stages of a fashion cycle. A trend is a bell curve.",
          hi: "फ़ैशन साइकिल के पाँच स्टेज। हर ट्रेंड एक घंटी जैसा कर्व होता है।" } },
        { t: "steps", items: [
          { title: { en: "Introduction", hi: "शुरुआत (Introduction)" }, text: { en: "A designer or celebrity shows something new. Only a few brave people wear it.", hi: "कोई डिज़ाइनर या सेलिब्रिटी कुछ नया दिखाता है। सिर्फ़ कुछ हिम्मती लोग इसे पहनते हैं।" }, dg: "fashion-basics-cycle", args: { hl: 0 } },
          { title: { en: "Rise", hi: "बढ़त (Rise)" }, text: { en: "Magazines, influencers and shops pick it up. More people copy it.", hi: "मैगज़ीन, इन्फ़्लुएंसर और दुकानें इसे उठा लेती हैं। और लोग कॉपी करने लगते हैं।" }, dg: "fashion-basics-cycle", args: { hl: 1 } },
          { title: { en: "Peak", hi: "पीक (Peak)" }, text: { en: "Everyone has it. Cheap copies are in every market.", hi: "सबके पास है। हर बाज़ार में सस्ती कॉपी मिलती है।" }, dg: "fashion-basics-cycle", args: { hl: 2 } },
          { title: { en: "Decline", hi: "गिरावट (Decline)" }, text: { en: "People get bored. Trend-followers move on to the next thing.", hi: "लोग ऊब जाते हैं। ट्रेंड फ़ॉलो करने वाले अगली चीज़ पर चले जाते हैं।" }, dg: "fashion-basics-cycle", args: { hl: 3 } },
          { title: { en: "Obsolescence", hi: "पुराना होना (Obsolescence)" }, text: { en: "It looks old-fashioned. Shops sell it at a discount - until it returns!", hi: "ये पुराना लगने लगता है। दुकानें डिस्काउंट पर बेचती हैं - जब तक ये फिर से न लौट आए!" }, dg: "fashion-basics-cycle", args: { hl: 4 } }
        ] },
        { t: "timeline", items: [
          { when: "1970s", title: { en: "Bell-bottoms", hi: "बेल-बॉटम" }, text: { en: "Huge in the 70s, mocked in the 90s, back as 'flares' later.", hi: "70 के दशक में बहुत चले, 90 में मज़ाक बने, बाद में 'फ़्लेयर्स' बनकर लौटे।" }, src: FBI + "bell-bottoms.jpg" },
          { when: "2010s", title: { en: "Skinny jeans", hi: "स्कीनी जीन्स" }, text: { en: "Everyone wore them for years. Now loose, wide jeans are taking over.", hi: "सालों तक सब पहनते रहे। अब ढीली, चौड़ी जीन्स आगे निकल रही हैं।" }, src: FBI + "skinny-jeans.jpg" },
          { when: "2010s", title: { en: "Palazzos", hi: "पलाज़ो" }, text: { en: "Wide-legged pants, loved with a short kurti or even a saree top.", hi: "चौड़ी पैंट, जो छोटी कुर्ती या साड़ी टॉप के साथ पसंद की गई।" }, src: FBI + "palazzo-sketch.jpg" },
          { when: { en: "Today", hi: "आज" }, title: { en: "Anarkali comeback", hi: "अनारकली की वापसी" }, text: { en: "The long flared Anarkali suit keeps returning at weddings and festivals.", hi: "लंबा घेरदार अनारकली सूट शादियों और त्योहारों में बार-बार लौट आता है।" } }
        ] },
        { t: "tip", kind: "fact", text: {
          en: "Fashion often returns after about **20 years**, when a new generation finds it fresh.",
          hi: "फ़ैशन अक्सर करीब **20 साल** बाद लौटता है, जब नई पीढ़ी को वो नया लगता है।" } },
        { t: "terms", items: [
          { en: "Fashion cycle", hi: "फ़ैशन साइकिल", def: { en: "The life of a trend: introduction, rise, peak, decline, obsolescence.", hi: "ट्रेंड की ज़िंदगी: शुरुआत, बढ़त, पीक, गिरावट, पुराना होना।" } },
          { en: "Obsolescence", hi: "ऑब्सोलेसेंस", def: { en: "When something is out of fashion and no longer used.", hi: "जब कुछ फ़ैशन से बाहर हो जाए और कोई न पहने।" } },
          { en: "Early adopter", hi: "अर्ली एडॉप्टर", def: { en: "A person who wears a new trend before most others.", hi: "वो इंसान जो नया ट्रेंड सबसे पहले पहनता है।" } }
        ] },
        { t: "try", text: {
          en: "Ask your mum or aunt for an old photo. Spot one look that is back in shops today. Which stage is it in now?",
          hi: "मम्मी या मौसी से पुरानी फ़ोटो माँगो। कोई ऐसा लुक ढूंढो जो आज दुकानों में फिर दिख रहा है। वो अभी किस स्टेज में है?" } }
      ]
    },
    {
      id: "levels-of-fashion",
      title: { en: "Levels of fashion", hi: "फ़ैशन के लेवल" },
      min: 6,
      blocks: [
        { t: "p", text: {
          en: "A Rs 500 kurti and a Rs 5 lakh lehenga are both fashion, but they are made in very different ways. Designers group fashion into **levels**, like a pyramid.",
          hi: "500 रुपये की कुर्ती और 5 लाख का लहंगा - दोनों फ़ैशन हैं, पर बनते बहुत अलग तरीके से हैं। डिज़ाइनर फ़ैशन को पिरामिड की तरह **लेवल** में बाँटते हैं।" } },
        { t: "dg", name: "fashion-basics-pyramid", caption: {
          en: "Top = few, handmade and costly. Bottom = many, machine-made and cheap.",
          hi: "ऊपर = कम, हाथ से बने और महंगे। नीचे = ढेर सारे, मशीन से बने और सस्ते।" } },
        { t: "img", src: FBI + "couture-show-paris.jpg", caption: {
          en: "A haute couture show in Paris. Every piece is made by hand for one client.",
          hi: "पेरिस में हॉट कूटूर शो। हर पीस एक ग्राहक के लिए हाथ से बनता है।" } },
        { t: "cards", items: [
          { icon: "gem", title: { en: "Haute couture", hi: "हॉट कूटूर" }, text: { en: "Made by hand, to your exact measurements. Months of work. Only a few houses, mainly in Paris, can use this name.", hi: "हाथ से, तुम्हारी नाप पर बनता है। महीनों का काम। गिनी-चुनी कंपनियाँ, ज़्यादातर पेरिस की, ये नाम इस्तेमाल कर सकती हैं।" } },
          { icon: "crown", title: { en: "Luxury ready-to-wear (prêt-à-porter)", hi: "लक्ज़री रेडी-टू-वेयर (प्रेट-अ-पोर्टे)" }, text: { en: "Designer clothes made in standard sizes, in small batches. Think Sabyasachi or Gucci shop pieces.", hi: "डिज़ाइनर कपड़े जो स्टैंडर्ड साइज़ में, छोटे बैच में बनते हैं। जैसे सब्यसाची या गुच्ची की दुकान के पीस।" } },
          { icon: "layers", title: { en: "Diffusion / bridge", hi: "डिफ़्यूज़न / ब्रिज" }, text: { en: "A designer's cheaper second line, like Armani Exchange. Same spirit, lower price.", hi: "डिज़ाइनर की सस्ती दूसरी लाइन, जैसे आरमानी एक्सचेंज। वही स्पिरिट, कम दाम।" } },
          { icon: "store", title: { en: "Mass market / high street", hi: "मास मार्केट / हाई स्ट्रीट" }, text: { en: "Big brands and shops that sell lots of clothes at low prices to everyone.", hi: "बड़े ब्रांड और दुकानें जो सबको सस्ते दाम पर ढेर सारे कपड़े बेचते हैं।" } }
        ] },
        { t: "compare", items: [
          { title: { en: "Fast fashion", hi: "फ़ास्ट फ़ैशन" }, src: FBI + "high-street-store.jpg", points: [
            { en: "New styles every few weeks", hi: "हर कुछ हफ़्तों में नई स्टाइल" },
            { en: "Cheap, copied from the runway", hi: "सस्ते, रनवे से कॉपी किए हुए" },
            { en: "Worn a few times, then thrown", hi: "कुछ बार पहनकर फेंक दिए जाते हैं" },
            { en: "Lots of waste and pollution", hi: "बहुत कचरा और प्रदूषण" }] },
          { title: { en: "Slow fashion", hi: "स्लो फ़ैशन" }, src: FBI + "handloom-weaving.jpg", points: [
            { en: "Fewer, better pieces", hi: "कम, लेकिन बेहतर पीस" },
            { en: "Made carefully, often by hand", hi: "ध्यान से, अक्सर हाथ से बने" },
            { en: "Fair pay for makers and weavers", hi: "बुनकरों और कारीगरों को सही मज़दूरी" },
            { en: "Lasts for years, like a handloom saree", hi: "सालों चलता है, जैसे हैंडलूम साड़ी" }] }
        ] },
        { t: "tip", kind: "fact", text: {
          en: "India has a huge slow-fashion tradition: **khadi, handloom sarees and block prints** are all slow fashion.",
          hi: "भारत में स्लो फ़ैशन की बड़ी परंपरा है: **खादी, हैंडलूम साड़ी और ब्लॉक प्रिंट** सब स्लो फ़ैशन हैं।" } },
        { t: "terms", items: [
          { en: "Haute couture", hi: "हॉट कूटूर", def: { en: "Handmade, made-to-measure luxury fashion.", hi: "हाथ से बना, नाप पर बना लक्ज़री फ़ैशन।" } },
          { en: "Ready-to-wear (prêt-à-porter)", hi: "रेडी-टू-वेयर (प्रेट-अ-पोर्टे)", def: { en: "Clothes made in standard sizes and sold in shops.", hi: "स्टैंडर्ड साइज़ में बने और दुकानों में बिकने वाले कपड़े।" } },
          { en: "Fast fashion", hi: "फ़ास्ट फ़ैशन", def: { en: "Quickly made, cheap clothes that copy current trends.", hi: "जल्दी बने सस्ते कपड़े जो चल रहे ट्रेंड की कॉपी होते हैं।" } },
          { en: "Slow fashion", hi: "स्लो फ़ैशन", def: { en: "Fashion made carefully, to last and to be fair to people and planet.", hi: "ध्यान से बना फ़ैशन, जो टिकाऊ हो और लोगों व पर्यावरण के लिए सही हो।" } }
        ] },
        { t: "try", text: {
          en: "Check the tags in 5 of your clothes. Where were they made? Which level do they belong to?",
          hi: "अपने 5 कपड़ों के टैग देखो। कहाँ बने हैं? ये कौन से लेवल में आते हैं?" } }
      ]
    },
    {
      id: "seasons-and-weeks",
      title: { en: "Seasons & fashion weeks", hi: "सीज़न और फ़ैशन वीक" },
      min: 6,
      blocks: [
        { t: "p", text: {
          en: "Designers work **months ahead**. The clothes you buy in winter were shown on a runway almost a year earlier. Those runway shows happen in **fashion weeks**.",
          hi: "डिज़ाइनर **महीनों पहले** से काम करते हैं। सर्दियों में जो कपड़े तुम खरीदती हो, वो लगभग एक साल पहले रनवे पर दिखाए गए थे। ये रनवे शो **फ़ैशन वीक** में होते हैं।" } },
        { t: "cards", items: [
          { icon: "sun", title: { en: "Spring / Summer (SS)", hi: "स्प्रिंग / समर (SS)" }, text: { en: "Light fabrics, bright colours. Shown the autumn before (Sep-Oct).", hi: "हल्के कपड़े, चटक रंग। पिछली शरद ऋतु में (सितंबर-अक्टूबर) दिखाए जाते हैं।" } },
          { icon: "drop", title: { en: "Autumn / Winter (AW)", hi: "ऑटम / विंटर (AW)" }, text: { en: "Heavy fabrics, wool, layers. Shown in Feb-March.", hi: "भारी कपड़े, ऊन, लेयर्स। फ़रवरी-मार्च में दिखाए जाते हैं।" } },
          { icon: "globe", title: { en: "Resort / Cruise", hi: "रिज़ॉर्ट / क्रूज़" }, text: { en: "Easy, holiday-style clothes for warm trips, between the main seasons.", hi: "गर्म जगह की छुट्टियों के लिए आसान कपड़े, मुख्य सीज़न के बीच में।" } }
        ] },
        { t: "dg", name: "fashion-basics-year", caption: {
          en: "A fashion year. AW = autumn/winter shows, SS = spring/summer shows, LFW = Lakmé Fashion Week, ICW = India Couture Week. Dates shift a little every year.",
          hi: "फ़ैशन का एक साल। AW = ऑटम/विंटर शो, SS = स्प्रिंग/समर शो, LFW = लैक्मे फ़ैशन वीक, ICW = इंडिया कूटूर वीक। तारीखें हर साल थोड़ी बदलती हैं।" } },
        { t: "p", text: {
          en: "The 'Big Four' fashion weeks are **Paris, Milan, London and New York**. In India, **Lakmé Fashion Week** (ready-to-wear) and **India Couture Week** (bridal and luxury) are the biggest.",
          hi: "'बिग फ़ोर' फ़ैशन वीक हैं **पेरिस, मिलान, लंदन और न्यूयॉर्क**। भारत में **लैक्मे फ़ैशन वीक** (रेडी-टू-वेयर) और **इंडिया कूटूर वीक** (दुल्हन और लक्ज़री) सबसे बड़े हैं।" } },
        { t: "gallery", items: [
          { src: FBI + "lakme-ritu-kumar.jpg", label: { en: "Lakmé Fashion Week", hi: "लैक्मे फ़ैशन वीक" }, note: { en: "Designer ensemble on the Mumbai runway", hi: "मुंबई रनवे पर डिज़ाइनर आउटफ़िट" } },
          { src: FBI + "navratri-garba.jpg", label: { en: "Festive season", hi: "त्योहारों का सीज़न" }, note: { en: "Navratri garba: colour, mirrorwork, ghagra choli", hi: "नवरात्रि गरबा: रंग, मिरर वर्क, घाघरा चोली" } },
          { src: FBI + "bridal-lehenga.jpg", label: { en: "Wedding season", hi: "शादी का सीज़न" }, note: { en: "India's biggest buying season", hi: "भारत का सबसे बड़ा खरीदारी सीज़न" } },
          { src: FBI + "saree-shop.jpg", label: { en: "Shop displays", hi: "दुकानों के डिस्प्ले" }, note: { en: "Stores stock up before every season", hi: "हर सीज़न से पहले दुकानें माल भरती हैं" } }
        ] },
        { t: "tip", kind: "tip", text: {
          en: "In India, designers plan around **festivals and weddings**, not just summer and winter. Diwali, Eid and the Nov-Feb wedding months drive most sales.",
          hi: "भारत में डिज़ाइनर सिर्फ़ गर्मी-सर्दी नहीं, **त्योहार और शादियों** के हिसाब से प्लान करते हैं। दिवाली, ईद और नवंबर-फ़रवरी की शादियाँ ज़्यादातर बिक्री लाती हैं।" } },
        { t: "terms", items: [
          { en: "Collection", hi: "कलेक्शन", def: { en: "A group of designs a designer shows together for one season.", hi: "एक सीज़न के लिए डिज़ाइनर के एक साथ दिखाए गए डिज़ाइनों का समूह।" } },
          { en: "Runway", hi: "रनवे", def: { en: "The long stage where models walk to show clothes.", hi: "लंबा स्टेज जहाँ मॉडल कपड़े दिखाने के लिए चलते हैं।" } },
          { en: "Resort / Cruise", hi: "रिज़ॉर्ट / क्रूज़", def: { en: "A collection between main seasons, for holiday wear.", hi: "मुख्य सीज़न के बीच का कलेक्शन, छुट्टियों के कपड़ों के लिए।" } },
          { en: "Buyer", hi: "बायर", def: { en: "A shop's expert who watches shows and orders clothes to sell.", hi: "दुकान का एक्सपर्ट जो शो देखकर बेचने के लिए कपड़े ऑर्डर करता है।" } }
        ] },
        { t: "try", text: {
          en: "Find the dates of the next Lakmé Fashion Week or India Couture Week online. Watch one show and note 3 colours or shapes you see again and again.",
          hi: "अगले लैक्मे फ़ैशन वीक या इंडिया कूटूर वीक की तारीखें ऑनलाइन ढूंढो। एक शो देखो और 3 रंग या आकार नोट करो जो बार-बार दिखें।" } }
      ]
    },
    {
      id: "careers",
      title: { en: "Careers in fashion", hi: "फ़ैशन में करियर" },
      min: 6,
      blocks: [
        { t: "p", text: {
          en: "Fashion is not only about designers. A single garment passes through **many hands** - drawing, cutting, sewing, photographing, selling. Each hand is a career.",
          hi: "फ़ैशन सिर्फ़ डिज़ाइनर का काम नहीं है। एक कपड़ा **कई हाथों** से गुज़रता है - ड्रॉइंग, कटिंग, सिलाई, फ़ोटो, बिक्री। हर हाथ एक करियर है।" } },
        { t: "h", text: { en: "Create", hi: "बनाने वाले" } },
        { t: "cards", items: [
          { icon: "pencil", title: { en: "Fashion designer", hi: "फ़ैशन डिज़ाइनर" }, text: { en: "Plans the whole collection: idea, sketches, fabrics.", hi: "पूरा कलेक्शन प्लान करता है: आइडिया, स्केच, कपड़े।" } },
          { icon: "brush", title: { en: "Fashion illustrator", hi: "फ़ैशन इलस्ट्रेटर" }, text: { en: "Draws designs beautifully to sell the idea.", hi: "डिज़ाइन को सुंदर ड्रॉइंग में बनाता है ताकि आइडिया बिके।" } },
          { icon: "flower", title: { en: "Textile designer", hi: "टेक्सटाइल डिज़ाइनर" }, text: { en: "Creates prints, weaves and patterns for cloth.", hi: "कपड़े के लिए प्रिंट, बुनाई और पैटर्न बनाता है।" } },
          { icon: "grid", title: { en: "CAD designer", hi: "CAD डिज़ाइनर" }, text: { en: "Uses computer software to draw flats and patterns.", hi: "कंप्यूटर सॉफ़्टवेयर से फ़्लैट और पैटर्न बनाता है।" } }
        ] },
        { t: "gallery", items: [
          { src: FBI + "designer-at-desk.jpg", label: { en: "Designer", hi: "डिज़ाइनर" }, note: { en: "Sketching ideas at the desk", hi: "डेस्क पर आइडिया स्केच करते हुए" } },
          { src: FBI + "illustrator-at-work.jpg", label: { en: "Illustrator", hi: "इलस्ट्रेटर" }, note: { en: "Drawing on a big sketch pad", hi: "बड़े स्केच पैड पर ड्रॉइंग" } },
          { src: FBI + "paper-patterns.jpg", label: { en: "Pattern maker", hi: "पैटर्न मेकर" }, note: { en: "Paper patterns hung up, ready to cut", hi: "टंगे हुए कागज़ के पैटर्न, कटाई के लिए तैयार" } },
          { src: FBI + "cad-pattern.jpg", label: { en: "CAD designer", hi: "CAD डिज़ाइनर" }, note: { en: "Pattern pieces on a computer", hi: "कंप्यूटर पर पैटर्न के टुकड़े" } }
        ] },
        { t: "h", text: { en: "Make", hi: "तैयार करने वाले" } },
        { t: "cards", items: [
          { icon: "ruler", title: { en: "Pattern maker", hi: "पैटर्न मेकर" }, text: { en: "Turns a sketch into paper pieces that can be cut and sewn.", hi: "स्केच को कागज़ के टुकड़ों में बदलता है जो काटे-सिले जा सकें।" } },
          { icon: "machine", title: { en: "Tailor / sample maker", hi: "टेलर / सैंपल मेकर" }, text: { en: "Sews the first sample so the designer can check it.", hi: "पहला सैंपल सिलता है ताकि डिज़ाइनर उसे देख सके।" } },
          { icon: "star", title: { en: "Costume designer", hi: "कॉस्ट्यूम डिज़ाइनर" }, text: { en: "Designs clothes for films, TV and theatre.", hi: "फ़िल्म, टीवी और थिएटर के लिए कपड़े डिज़ाइन करता है।" } }
        ] },
        { t: "img", src: FBI + "tailor-at-work.jpg", caption: {
          en: "A tailor at his sewing machine. The local darzi is part of the fashion world too.",
          hi: "सिलाई मशीन पर एक दर्ज़ी। मोहल्ले का दर्ज़ी भी फ़ैशन की दुनिया का हिस्सा है।" } },
        { t: "h", text: { en: "Sell and tell", hi: "बेचने और बताने वाले" } },
        { t: "cards", items: [
          { icon: "trend", title: { en: "Trend forecaster", hi: "ट्रेंड फ़ोरकास्टर" }, text: { en: "Predicts the colours and shapes coming next.", hi: "आने वाले रंगों और आकारों का अंदाज़ा लगाता है।" } },
          { icon: "store", title: { en: "Merchandiser & buyer", hi: "मर्चेंडाइज़र और बायर" }, text: { en: "Plans what to make or buy, how much, and when.", hi: "प्लान करता है कि क्या बनाना या खरीदना है, कितना और कब।" } },
          { icon: "hanger", title: { en: "Stylist", hi: "स्टाइलिस्ट" }, text: { en: "Puts outfits together for shoots, shows and clients.", hi: "शूट, शो और क्लाइंट के लिए आउटफ़िट तैयार करता है।" } },
          { icon: "camera", title: { en: "Fashion photographer", hi: "फ़ैशन फ़ोटोग्राफ़र" }, text: { en: "Shoots the clothes for magazines and websites.", hi: "मैगज़ीन और वेबसाइट के लिए कपड़ों की फ़ोटो खींचता है।" } },
          { icon: "book", title: { en: "Fashion journalist", hi: "फ़ैशन जर्नलिस्ट" }, text: { en: "Writes about shows, designers and trends.", hi: "शो, डिज़ाइनर और ट्रेंड के बारे में लिखता है।" } }
        ] },
        { t: "tip", kind: "tip", text: {
          en: "Not sure which one fits you? Try a bit of everything in college: sketching, sewing, styling, writing. Your favourite will show itself.",
          hi: "पता नहीं कौन सा सही है? कॉलेज में सब थोड़ा-थोड़ा आज़माओ: स्केचिंग, सिलाई, स्टाइलिंग, लिखना। तुम्हारा पसंदीदा खुद सामने आ जाएगा।" } },
        { t: "terms", items: [
          { en: "Merchandiser", hi: "मर्चेंडाइज़र", def: { en: "Plans products, quantities and timelines between design and sales.", hi: "डिज़ाइन और बिक्री के बीच प्रोडक्ट, मात्रा और समय का प्लान बनाता है।" } },
          { en: "Stylist", hi: "स्टाइलिस्ट", def: { en: "Chooses and combines clothes and accessories into a look.", hi: "कपड़ों और एक्सेसरीज़ को मिलाकर लुक बनाता है।" } },
          { en: "Trend forecaster", hi: "ट्रेंड फ़ोरकास्टर", def: { en: "A researcher who predicts future trends.", hi: "रिसर्चर जो आने वाले ट्रेंड का अंदाज़ा लगाता है।" } },
          { en: "Sample", hi: "सैंपल", def: { en: "The first finished garment made to check design and fit.", hi: "डिज़ाइन और फ़िट जाँचने के लिए बना पहला तैयार कपड़ा।" } }
        ] },
        { t: "try", text: {
          en: "Pick 3 careers from this lesson. Write one line on each: what would a normal day look like? Which one makes you curious?",
          hi: "इस लेसन से 3 करियर चुनो। हर एक पर एक लाइन लिखो: एक आम दिन कैसा होगा? कौन सा तुम्हें सबसे ज़्यादा उत्सुक करता है?" } }
      ]
    },
    {
      id: "beginner-words",
      title: { en: "Words every beginner should know", hi: "वो शब्द जो हर शुरुआत करने वाली को पता होने चाहिए" },
      min: 6,
      blocks: [
        { t: "p", text: {
          en: "Fashion has its own language, and most of it comes from French. Learn these words now, and every class, book and video will feel easier.",
          hi: "फ़ैशन की अपनी भाषा है, और ज़्यादातर फ़्रेंच से आई है। ये शब्द अभी सीख लो, फिर हर क्लास, किताब और वीडियो आसान लगेगा।" } },
        { t: "img", src: FBI + "atelier-studio.jpg", caption: {
          en: "An atelier: a designer's studio with a dress form, sketches on the wall and a big cutting table.",
          hi: "एक एटेलियर: डिज़ाइनर का स्टूडियो, जिसमें ड्रेस फ़ॉर्म, दीवार पर स्केच और बड़ी कटिंग टेबल है।" } },
        { t: "tip", kind: "fact", text: {
          en: "**Atelier** means a workshop or studio. That is why this site is called **Khushi's Atelier** - your own studio!",
          hi: "**एटेलियर (Atelier)** का मतलब है वर्कशॉप या स्टूडियो। इसीलिए इस साइट का नाम **खुशी'ज़ एटेलियर** है - तुम्हारा अपना स्टूडियो!" } },
        { t: "gallery", cols: 3, items: [
          { dg: "fashion-basics-silhouette", args: { type: "a" }, label: { en: "A-line", hi: "A-लाइन" }, note: { en: "narrow top, wide hem", hi: "ऊपर पतला, नीचे चौड़ा" } },
          { dg: "fashion-basics-silhouette", args: { type: "x" }, label: { en: "Hourglass", hi: "आवरग्लास" }, note: { en: "shaped at the waist", hi: "कमर पर कसा हुआ" } },
          { dg: "fashion-basics-silhouette", args: { type: "h" }, label: { en: "Column", hi: "कॉलम" }, note: { en: "straight, no waist", hi: "सीधा, बिना कमर" } }
        ] },
        { t: "p", text: {
          en: "These are three **silhouettes** - the outer shape of an outfit, like its shadow.",
          hi: "ये तीन **सिल्हूट (Silhouette)** हैं - आउटफ़िट का बाहरी आकार, जैसे उसकी परछाई।" } },
        { t: "gallery", items: [
          { src: FBI + "toile-on-form.jpg", label: { en: "Toile", hi: "टॉयल" }, note: { en: "A test garment in cheap cotton", hi: "सस्ते सूती कपड़े में टेस्ट गारमेंट" } },
          { src: FBI + "draping-on-form.jpg", label: { en: "Draping", hi: "ड्रेपिंग" }, note: { en: "Shaping fabric directly on a dress form", hi: "ड्रेस फ़ॉर्म पर सीधे कपड़ा आकार देना" } },
          { src: FBI + "gown-illustration.jpg", label: { en: "Ensemble", hi: "एन्सेम्बल" }, note: { en: "Outfits that belong together", hi: "साथ में फ़िट होने वाले आउटफ़िट" } },
          { src: FBI + "chanel-suit.jpg", label: { en: "Garment", hi: "गारमेंट" }, note: { en: "One piece of clothing, here a suit", hi: "कपड़े का एक पीस, यहाँ एक सूट" } }
        ] },
        { t: "terms", items: [
          { en: "Couture", hi: "कूटूर", def: { en: "French for sewing. Today it means high-end, made-to-measure fashion.", hi: "फ़्रेंच में सिलाई। आज इसका मतलब है हाई-एंड, नाप पर बना फ़ैशन।" } },
          { en: "Atelier", hi: "एटेलियर", def: { en: "A designer's workshop or studio.", hi: "डिज़ाइनर की वर्कशॉप या स्टूडियो।" } },
          { en: "Lookbook", hi: "लुकबुक", def: { en: "A photo book showing a collection styled as full looks.", hi: "फ़ोटो की किताब जिसमें कलेक्शन पूरे लुक की तरह दिखता है।" } },
          { en: "Mood board", hi: "मूड बोर्ड", def: { en: "A collage of pictures, colours and fabrics that shows an idea's feeling.", hi: "तस्वीरों, रंगों और कपड़ों का कोलाज जो आइडिया का मूड दिखाता है।" } },
          { en: "Muse", hi: "म्यूज़", def: { en: "A person who inspires a designer.", hi: "वो इंसान जो डिज़ाइनर को प्रेरणा देता है।" } },
          { en: "Silhouette", hi: "सिल्हूट", def: { en: "The outer shape of an outfit.", hi: "आउटफ़िट का बाहरी आकार।" } }
        ] },
        { t: "terms", items: [
          { en: "Garment", hi: "गारमेंट", def: { en: "A single piece of clothing.", hi: "कपड़े का एक पीस।" } },
          { en: "Ensemble", hi: "एन्सेम्बल", def: { en: "A complete outfit where the pieces go together.", hi: "पूरा आउटफ़िट जिसके सारे पीस साथ में जँचते हैं।" } },
          { en: "Bespoke", hi: "बीस्पोक", def: { en: "Made specially for one person, to their measurements.", hi: "किसी एक इंसान के लिए, उसकी नाप पर ख़ास बना।" } },
          { en: "Toile", hi: "टॉयल", def: { en: "A trial version of a garment in cheap fabric, to check fit.", hi: "फ़िट जाँचने के लिए सस्ते कपड़े में बना ट्रायल गारमेंट।" } }
        ] },
        { t: "try", text: {
          en: "Make flashcards: write each word on one side and your own example on the other. Use 'muse' for someone who inspires you.",
          hi: "फ़्लैशकार्ड बनाओ: एक तरफ़ शब्द, दूसरी तरफ़ अपना उदाहरण। 'म्यूज़' के लिए उस इंसान का नाम लिखो जो तुम्हें प्रेरणा देता है।" } }
      ]
    }
  ],
  quiz: [
    { q: { en: "Which one is YOUR personal way of dressing, which stays with you?", hi: "इनमें से कौन सा कपड़े पहनने का तुम्हारा अपना तरीका है, जो तुम्हारे साथ रहता है?" },
      options: [{ en: "Fad", hi: "फ़ैड" }, { en: "Style", hi: "स्टाइल" }, { en: "Trend", hi: "ट्रेंड" }],
      answer: 1, why: { en: "Style is personal and lasts. Trends and fads belong to everybody and fade.", hi: "स्टाइल निजी होती है और टिकती है। ट्रेंड और फ़ैड सबके होते हैं और फीके पड़ जाते हैं।" } },
    { q: { en: "A look that is hot for a few weeks and then vanishes is a...", hi: "जो लुक कुछ हफ़्ते हॉट रहकर गायब हो जाए, वो है..." },
      options: [{ en: "Classic", hi: "क्लासिक" }, { en: "Fad", hi: "फ़ैड" }, { en: "Silhouette", hi: "सिल्हूट" }],
      answer: 1, why: { en: "A fad is a very short craze. A classic stays for years.", hi: "फ़ैड बहुत छोटा क्रेज़ है। क्लासिक सालों तक रहता है।" }, dg: "fashion-basics-lifespans" },
    { q: { en: "Which stage of the fashion cycle comes right after 'Rise'?", hi: "फ़ैशन साइकिल में 'बढ़त (Rise)' के ठीक बाद कौन सा स्टेज आता है?" },
      options: [{ en: "Peak", hi: "पीक" }, { en: "Decline", hi: "गिरावट" }, { en: "Introduction", hi: "शुरुआत" }],
      answer: 0, why: { en: "Order: introduction, rise, peak, decline, obsolescence.", hi: "क्रम: शुरुआत, बढ़त, पीक, गिरावट, पुराना होना।" }, dg: "fashion-basics-cycle", args: { hl: 1 } },
    { q: { en: "Skinny jeans were everywhere for years and are now fading. That is the...", hi: "स्कीनी जीन्स सालों हर जगह थीं और अब फीकी पड़ रही हैं। ये है..." },
      options: [{ en: "Introduction stage", hi: "शुरुआत का स्टेज" }, { en: "Decline stage", hi: "गिरावट का स्टेज" }, { en: "Haute couture", hi: "हॉट कूटूर" }],
      answer: 1, why: { en: "Popularity falling after a long peak is the decline stage.", hi: "लंबे पीक के बाद पॉपुलैरिटी गिरना गिरावट का स्टेज है।" }, src: FBI + "skinny-jeans.jpg" },
    { q: { en: "What makes haute couture different from ready-to-wear?", hi: "हॉट कूटूर, रेडी-टू-वेयर से किस बात में अलग है?" },
      options: [{ en: "It is made by hand to one person's measurements", hi: "ये हाथ से, एक इंसान की नाप पर बनता है" }, { en: "It is made in a factory in standard sizes", hi: "ये फ़ैक्ट्री में स्टैंडर्ड साइज़ में बनता है" }, { en: "It is always cheap", hi: "ये हमेशा सस्ता होता है" }],
      answer: 0, why: { en: "Couture = made-to-measure and handmade. Ready-to-wear = standard sizes.", hi: "कूटूर = नाप पर और हाथ से बना। रेडी-टू-वेयर = स्टैंडर्ड साइज़।" }, dg: "fashion-basics-pyramid", args: { hl: 0 } },
    { q: { en: "Which is an example of slow fashion?", hi: "इनमें से स्लो फ़ैशन का उदाहरण कौन सा है?" },
      options: [{ en: "A cheap top that is thrown after 2 wears", hi: "सस्ता टॉप जो 2 बार पहनकर फेंक दिया जाए" }, { en: "A handloom saree that lasts for years", hi: "हैंडलूम साड़ी जो सालों चलती है" }, { en: "A copy of a runway look in 2 weeks", hi: "2 हफ़्ते में रनवे लुक की कॉपी" }],
      answer: 1, why: { en: "Slow fashion is careful, fair and made to last.", hi: "स्लो फ़ैशन ध्यान से, सही तरीके से और टिकाऊ बनता है।" }, src: FBI + "handloom-weaving.jpg" },
    { q: { en: "Which are the 'Big Four' fashion weeks?", hi: "'बिग फ़ोर' फ़ैशन वीक कौन से हैं?" },
      options: [{ en: "Paris, Milan, London, New York", hi: "पेरिस, मिलान, लंदन, न्यूयॉर्क" }, { en: "Delhi, Mumbai, Kolkata, Chennai", hi: "दिल्ली, मुंबई, कोलकाता, चेन्नई" }, { en: "Tokyo, Dubai, Sydney, Rome", hi: "टोक्यो, दुबई, सिडनी, रोम" }],
      answer: 0, why: { en: "Paris, Milan, London and New York are the big four. India has Lakmé Fashion Week and India Couture Week.", hi: "पेरिस, मिलान, लंदन और न्यूयॉर्क बिग फ़ोर हैं। भारत में लैक्मे फ़ैशन वीक और इंडिया कूटूर वीक हैं।" } },
    { q: { en: "Which professional predicts the colours and shapes of the future?", hi: "भविष्य के रंगों और आकारों का अंदाज़ा कौन लगाता है?" },
      options: [{ en: "Pattern maker", hi: "पैटर्न मेकर" }, { en: "Trend forecaster", hi: "ट्रेंड फ़ोरकास्टर" }, { en: "Photographer", hi: "फ़ोटोग्राफ़र" }],
      answer: 1, why: { en: "A trend forecaster researches what is coming next.", hi: "ट्रेंड फ़ोरकास्टर रिसर्च करके बताता है कि आगे क्या आने वाला है।" } },
    { q: { en: "What is an atelier?", hi: "एटेलियर क्या है?" },
      options: [{ en: "A type of fabric", hi: "एक तरह का कपड़ा" }, { en: "A designer's workshop or studio", hi: "डिज़ाइनर की वर्कशॉप या स्टूडियो" }, { en: "A fashion magazine", hi: "एक फ़ैशन मैगज़ीन" }],
      answer: 1, why: { en: "Atelier is French for workshop. Yours is Khushi's Atelier!", hi: "एटेलियर फ़्रेंच में वर्कशॉप है। तुम्हारा है खुशी'ज़ एटेलियर!" }, src: FBI + "atelier-studio.jpg" },
    { q: { en: "The outer shape of an outfit, like its shadow, is called its...", hi: "आउटफ़िट का बाहरी आकार, जैसे उसकी परछाई, क्या कहलाता है?" },
      options: [{ en: "Silhouette", hi: "सिल्हूट" }, { en: "Toile", hi: "टॉयल" }, { en: "Lookbook", hi: "लुकबुक" }],
      answer: 0, why: { en: "Silhouette = the outline or overall shape.", hi: "सिल्हूट = आउटलाइन या कुल मिलाकर आकार।" }, dg: "fashion-basics-silhouette", args: { type: "a" } }
  ]
});
