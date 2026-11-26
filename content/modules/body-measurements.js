/* Module 8 - Body Shapes & Measurements */
(function () {
  function n(v) { return Math.round(v * 10) / 10; }
  /* segments in head units: dx from the centre line (positive = viewer's left), y in heads from the top */
  function path(cx, top, H, segs, flip) {
    var s = "";
    segs.forEach(function (g) {
      var v = g.slice(1);
      s += g[0];
      for (var i = 0; i < v.length; i += 2) s += (i ? " " : "") + n(cx - (flip ? -1 : 1) * v[i] * H) + "," + n(top + v[i + 1] * H);
      s += " ";
    });
    return s.trim();
  }
  function st(d, cls, extra) { return '<path d="' + d + '" class="' + cls + '"' + (extra || "") + "/>"; }
  function both(cx, top, H, segs, cls) { return st(path(cx, top, H, segs), cls) + st(path(cx, top, H, segs, true), cls); }
  function line(x1, y1, x2, y2, cls, extra) {
    return '<line x1="' + n(x1) + '" y1="' + n(y1) + '" x2="' + n(x2) + '" y2="' + n(y2) + '" class="' + cls + '"' + (extra || "") + "/>";
  }
  function dot(x, y) { return '<circle cx="' + n(x) + '" cy="' + n(y) + '" r="2.4" class="acf"/>'; }

  /* simple 8-head figure, arms slightly away from the body */
  function figure(cx, top, H, cls) {
    var kn = 5.68, an = 7.52, so = 8;
    var s = '<ellipse cx="' + cx + '" cy="' + n(top + 0.5 * H) + '" rx="' + n(0.36 * H) + '" ry="' + n(0.5 * H) + '" class="' + cls + '"/>';
    s += both(cx, top, H, [["M", 0.13, 0.93], ["L", 0.13, 1.32], ["Q", 0.38, 1.36, 0.62, 1.48], ["Q", 0.72, 1.62, 0.64, 1.98],
      ["Q", 0.56, 2.5, 0.42, 3.0], ["Q", 0.68, 3.35, 0.7, 3.75], ["Q", 0.68, (3.75 + kn) / 2, 0.44, kn], ["Q", 0.52, kn + (an - kn) * 0.3, 0.3, an],
      ["Q", 0.34, so, 0.22, so], ["L", 0.13, so], ["Q", 0.11, an + (so - an) * 0.4, 0.15, an],
      ["Q", 0.1, (kn + an) / 2, 0.14, kn], ["Q", 0.13, (4 + kn) / 2, 0.02, 4.05], ["L", 0, 4.07]], cls);
    s += both(cx, top, H, [["M", 0.62, 1.48], ["Q", 0.86, 1.9, 0.88, 2.9], ["Q", 0.94, 3.4, 0.98, 3.9], ["Q", 1.06, 4.3, 0.96, 4.7],
      ["Q", 0.86, 4.45, 0.87, 3.9], ["Q", 0.82, 3.4, 0.76, 2.9], ["Q", 0.7, 2.3, 0.64, 1.98]], cls);
    return s;
  }

  /* measurement marks, in head units */
  var M = {
    bust: { band: [0.66, -0.66, 2.05] },
    underbust: { band: [0.58, -0.58, 2.38] },
    waist: { band: [0.44, -0.44, 3.0] },
    hip: { band: [0.72, -0.72, 3.75] },
    shoulder: { straight: [0.62, 1.48, -0.62, 1.48] },
    neck: { ell: [0, 1.2, 0.18, 0.06, 0] },
    armlength: { segs: [["M", 0.66, 1.44], ["Q", 0.94, 1.9, 0.96, 2.9], ["Q", 1.02, 3.4, 1.06, 3.9]] },
    armhole: { ell: [0.67, 1.74, 0.1, 0.27, -12] },
    bicep: { band: [0.9, 0.67, 2.4] },
    wrist: { band: [1.0, 0.85, 3.88] },
    napewaist: { straight: [0, 1.16, 0, 3.0], dash: true },
    frontlength: { segs: [["M", -0.17, 1.33], ["Q", -0.36, 2.0, -0.3, 3.0]] },
    inseam: { segs: [["M", 0.06, 4.14], ["Q", 0.17, 4.9, 0.19, 5.68], ["Q", 0.16, 6.6, 0.2, 7.48]] },
    outseam: { segs: [["M", -0.46, 3.0], ["Q", -0.76, 3.35, -0.78, 3.75], ["Q", -0.76, 4.7, -0.5, 5.68], ["Q", -0.6, 6.4, -0.36, 7.5]] },
    thigh: { band: [0.66, 0.06, 4.35] },
    knee: { band: [0.46, 0.12, 5.68] },
    ankle: { band: [0.32, 0.13, 7.48] },
    height: { height: true }
  };
  var NAMES = {
    bust: { en: "Bust", hi: "बस्ट" }, underbust: { en: "Under-bust", hi: "अंडर-बस्ट" }, waist: { en: "Waist", hi: "कमर" },
    hip: { en: "Hip", hi: "हिप" }, shoulder: { en: "Shoulder", hi: "शोल्डर" }, neck: { en: "Neck", hi: "गर्दन" },
    armlength: { en: "Arm length", hi: "आर्म लेंथ" }, armhole: { en: "Armhole", hi: "आर्महोल" }, bicep: { en: "Bicep", hi: "बाइसेप" },
    wrist: { en: "Wrist", hi: "कलाई" }, napewaist: { en: "Nape to waist (back)", hi: "नेप से कमर (पीछे)" },
    frontlength: { en: "Front length", hi: "फ्रंट लेंथ" }, inseam: { en: "Inseam", hi: "इनसीम" }, outseam: { en: "Outseam", hi: "आउटसीम" },
    thigh: { en: "Thigh", hi: "जांघ" }, knee: { en: "Knee", hi: "घुटना" }, ankle: { en: "Ankle", hi: "टखना" }, height: { en: "Height", hi: "लंबाई" }
  };

  function mark(key, cx, top, H, cls, tilt) {
    var m = M[key], s = "";
    function X(dx) { return cx - dx * H; }
    function Y(y) { return top + y * H; }
    if (m.band) {
      var b = m.band, x1 = X(b[0]), x2 = X(b[1]), y = Y(b[2]), t = tilt ? 0.35 * H : 0;
      s += st("M" + n(x1) + "," + n(y - t) + " Q" + n((x1 + x2) / 2) + "," + n(y + 0.09 * H) + " " + n(x2) + "," + n(y + t), cls);
      s += dot(x1, y - t) + dot(x2, y + t);
    } else if (m.straight) {
      var q = m.straight;
      s += line(X(q[0]), Y(q[1]), X(q[2]), Y(q[3]), cls, m.dash ? ' stroke-dasharray="5 3"' : "") + dot(X(q[0]), Y(q[1])) + dot(X(q[2]), Y(q[3]));
    } else if (m.ell) {
      var e = m.ell;
      s += '<ellipse cx="' + n(X(e[0])) + '" cy="' + n(Y(e[1])) + '" rx="' + n(e[2] * H) + '" ry="' + n(e[3] * H) + '" class="' + cls + '"' +
        (e[4] ? ' transform="rotate(' + e[4] + " " + n(X(e[0])) + " " + n(Y(e[1])) + ')"' : "") + "/>";
    } else if (m.segs) {
      s += st(path(cx, top, H, m.segs), cls);
      var a = m.segs[0], z = m.segs[m.segs.length - 1].slice(-2);
      s += dot(X(a[1]), Y(a[2])) + dot(X(z[0]), Y(z[1]));
    } else if (m.height) {
      var hx = cx + 1.45 * H;
      s += line(cx - 0.3 * H, Y(0), hx + 6, Y(0), "gd") + line(cx - 1.2 * H, Y(8), hx + 10, Y(8), "gd");
      s += line(hx, Y(0), hx, Y(8), cls) + line(hx - 5, Y(0), hx + 5, Y(0), cls) + line(hx - 5, Y(8), hx + 5, Y(8), cls);
    }
    return s;
  }

  /* Front figure with one measurement highlighted. args.m = key | "all" | "level"; args.wrong = tape tilted */
  FD.diagram("body-measurements-figure", function (a, lang) {
    var cx = 92, top = 10, H = 37, s = "", key = a.m || "all";
    s += figure(cx, top, H, "ln");
    if (key === "all") {
      ["bust", "waist", "hip", "shoulder", "inseam", "height"].forEach(function (k) { s += mark(k, cx, top, H, "ac"); });
    } else if (M[key]) {
      s += mark(key, cx, top, H, "ac", a.wrong);
      s += FD.text(110, 332, FD.tx(NAMES[key], lang), { cls: "tx", size: 14 });
    }
    return FD.svg(220, 340, s);
  });

  /* Body shape outlines (dress-form style). args.shape = hourglass | pear | apple | rectangle | inverted */
  var SH = {
    hourglass: [26, 26, 15, 27], pear: [19, 19, 15, 29], apple: [23, 26, 27, 23],
    rectangle: [23, 23, 21, 23], inverted: [31, 27, 18, 19]
  };
  function bodyShape(w, cls) {
    var S = w[0], B = w[1], W = w[2], Hp = w[3], c = 60;
    var L = [[54, 32], [54, 37], [57, 42, c - S, 45], [c - S - 3, 52, c - S + 1, 58], [c - B, 64, c - B, 68],
      [c - B, 78, c - W, 86], [c - W - (Hp - W) * 0.9, 94, c - Hp, 108], [c - Hp, 130, c - 13, 164], [c - 3, 164], [c - 2, 128, c, 125]];
    var d = "M60,32 L" + L[0].join(",");
    var cur = L[0], i;
    for (i = 1; i < L.length; i++) d += L[i].length === 2 ? " L" + L[i].join(",") : " Q" + L[i][0] + "," + L[i][1] + " " + L[i][2] + "," + L[i][3];
    /* mirror back up the right side */
    for (i = L.length - 1; i >= 1; i--) {
      var p = L[i - 1], to = p.slice(-2), g = L[i];
      d += g.length === 2 ? " L" + (120 - to[0]) + "," + to[1] : " Q" + (120 - g[0]) + "," + g[1] + " " + (120 - to[0]) + "," + to[1];
    }
    return '<circle cx="60" cy="18" r="11" class="' + cls + '"/><path d="' + d + ' L66,32 Z" class="' + cls + '"/>';
  }
  FD.diagram("body-measurements-shape", function (a) {
    var w = SH[a.shape] || SH.hourglass, s = bodyShape(w, "fl");
    [[w[0], 45], [w[2], 86], [w[3], 108]].forEach(function (g) {
      s += line(60 - g[0] - 4, g[1], 60 + g[0] + 4, g[1], "ac") + dot(60 - g[0] - 4, g[1]) + dot(60 + g[0] + 4, g[1]);
    });
    return FD.svg(120, 172, s);
  });

  /* Ease: body (dashed) vs garment. args.kind = wearing | design */
  FD.diagram("body-measurements-ease", function (a, lang) {
    var s = "", design = a.kind === "design";
    s += '<g transform="translate(10 0)">' + bodyShape(SH.hourglass, "gd") + "</g>";
    if (design) {
      s += '<path d="M60,34 Q70,40 70,34 L104,44 L122,92 L106,98 L102,82 L104,150 L36,150 L38,82 L34,98 L18,92 L36,44 L70,34" class="ac" transform="translate(0 0)"/>';
      s += '<path d="M60,34 Q70,42 80,34" class="ac"/>';
    } else {
      s += '<path d="M64,33 Q70,40 76,33 L96,44 Q94,56 96,68 Q94,80 87,88 Q96,98 99,112 L98,140 L42,140 L41,112 Q44,98 53,88 Q46,80 44,68 Q46,56 44,44 Z" class="ac"/>';
    }
    var gx = design ? 104 : 87.5;
    s += line(85, 86, gx, 86, "tx", ' stroke-width="1"') + dot(85, 86) + dot(gx, 86);
    s += FD.text(design ? 96 : 92, 80, FD.tx({ en: "ease", hi: "ईज़" }, lang), { cls: "tm", size: 9 });
    return FD.svg(140, 160, s);
  });
})();

var BMEAS = "assets/img/body-measurements/";

FD.module({
  id: "body-measurements",
  num: 8,
  level: "basic",
  title: { en: "Body Shapes & Measurements", hi: "बॉडी शेप और माप" },
  tagline: { en: "Measure with confidence and dress every body beautifully", hi: "भरोसे से माप लेना और हर बॉडी को खूबसूरती से सजाना" },
  cover: BMEAS + "cover.jpg",
  learn: [
    { en: "Take 18 body measurements correctly with a tape", hi: "टेप से 18 बॉडी माप सही तरीके से लेना" },
    { en: "Read size charts and understand ease", hi: "साइज़ चार्ट पढ़ना और ईज़ (Ease) समझना" },
    { en: "Recognise the 5 common body shapes from three numbers", hi: "तीन नंबरों से 5 आम बॉडी शेप पहचानना" },
    { en: "Pick silhouettes that balance each shape", hi: "हर शेप को बैलेंस करने वाले सिल्हूट चुनना" }
  ],
  lessons: [
    {
      id: "why-measure",
      title: { en: "Why measure? Tools and rules", hi: "माप क्यों? टूल और नियम" },
      min: 5,
      blocks: [
        { t: "p", text: {
          en: "Every perfect-fitting outfit starts with numbers. If your measurements are wrong by even 1 inch, the blouse will pinch or the kurta will hang loose. That is why a good darzi measures twice before cutting once.",
          hi: "हर परफ़ेक्ट फ़िटिंग वाला आउटफ़िट नंबरों से शुरू होता है। माप में सिर्फ़ 1 इंच की भी गलती हो, तो ब्लाउज़ चुभेगा या कुर्ता ढीला लटकेगा। इसीलिए अच्छा दर्ज़ी एक बार काटने से पहले दो बार नापता है।" } },
        { t: "img", src: BMEAS + "tailor-customer.jpg", caption: {
          en: "At the local darzi: measurements are the first step of every order.",
          hi: "मोहल्ले के दर्ज़ी के यहां: हर ऑर्डर का पहला कदम माप ही होता है।" } },
        { t: "gallery", cols: 3, items: [
          { src: BMEAS + "tape-colourful.jpg", label: { en: "Tailor's tape", hi: "टेलर टेप" }, note: { en: "Soft, 150 cm, inches on one side", hi: "नरम, 150 सेमी, एक तरफ़ इंच" } },
          { src: BMEAS + "tape-blue.jpg", label: { en: "Rolled tape", hi: "रोल किया टेप" }, note: { en: "Does not stretch", hi: "खिंचता नहीं है" } },
          { src: BMEAS + "tailor-ruler-bombay.jpg", label: { en: "Wooden scale", hi: "लकड़ी का स्केल" }, note: { en: "For straight pattern lines", hi: "सीधी पैटर्न लाइनों के लिए" } }
        ] },
        { t: "h", text: { en: "Golden rules", hi: "सुनहरे नियम" } },
        { t: "list", style: "check", items: [
          { en: "Wear thin, close-fitting clothes or innerwear. Thick clothes add fake inches.", hi: "पतले, फ़िटिंग वाले कपड़े या इनरवेयर पहनो। मोटे कपड़े नकली इंच जोड़ देते हैं।" },
          { en: "Stand straight and relaxed. Do not hold your breath or pull your tummy in.", hi: "सीधी और रिलैक्स खड़ी हो। सांस मत रोको, पेट अंदर मत खींचो।" },
          { en: "The tape should be **snug, not tight**. You should fit one finger under it.", hi: "टेप **हल्का कसा हो, टाइट नहीं**। उसके नीचे एक उंगली आ जानी चाहिए।" },
          { en: "Keep the tape level, parallel to the floor, and flat against the body.", hi: "टेप को बराबर रखो, ज़मीन के समानांतर और बॉडी से सटा हुआ।" },
          { en: "Write each number down at once, with the name. Measure twice.", hi: "हर नंबर नाम के साथ तुरंत लिख लो। दो बार नापो।" }
        ] },
        { t: "dg", name: "body-measurements-figure", args: { m: "all" }, caption: {
          en: "Main measurements: shoulder, bust, waist, hip, inseam and height. We will do 18 in this module.",
          hi: "मुख्य माप: शोल्डर, बस्ट, कमर, हिप, इनसीम और लंबाई। इस मॉड्यूल में हम 18 माप सीखेंगे।" } },
        { t: "tip", kind: "tip", text: {
          en: "Ask a friend to help. It is almost impossible to measure your own back and shoulders correctly.",
          hi: "किसी दोस्त से मदद लो। अपनी पीठ और कंधों का माप खुद सही लेना लगभग नामुमकिन है।" } },
        { t: "terms", items: [
          { en: "Measurement", hi: "माप", def: { en: "A number that tells the size of one body part.", hi: "एक नंबर जो बॉडी के एक हिस्से का साइज़ बताता है।" } },
          { en: "Circumference", hi: "घेरा", def: { en: "The distance all the way around a body part.", hi: "बॉडी के किसी हिस्से के चारों तरफ़ की दूरी।" } },
          { en: "Snug", hi: "स्नग", def: { en: "Touching the body gently, neither loose nor tight.", hi: "बॉडी को हल्के से छूता हुआ, न ढीला न टाइट।" } }
        ] },
        { t: "try", text: {
          en: "Take a soft tape and measure the length of 5 things at home (a book, your hand span, a dupatta). Write them down in cm and inches.",
          hi: "सॉफ़्ट टेप लो और घर की 5 चीज़ें नापो (किताब, हाथ की बालिश्त, दुपट्टा)। सेमी और इंच दोनों में लिखो।" } }
      ]
    },
    {
      id: "measure-upper-body",
      title: { en: "Measuring the upper body", hi: "ऊपरी बॉडी का माप" },
      min: 8,
      blocks: [
        { t: "p", text: {
          en: "Start from the top. These six measurements are needed for every blouse, kurta, shirt and dress. The pink line on each figure shows where to place the tape.",
          hi: "ऊपर से शुरू करो। हर ब्लाउज़, कुर्ते, शर्ट और ड्रेस के लिए ये छह माप चाहिए। हर फ़िगर पर गुलाबी लाइन दिखाती है कि टेप कहां रखना है।" } },
        { t: "steps", items: [
          { dg: "body-measurements-figure", args: { m: "bust" }, title: { en: "Bust", hi: "बस्ट" }, text: {
            en: "Around the fullest part of the chest, over the nipple points. Keep the tape level at the back, under the shoulder blades.",
            hi: "छाती के सबसे भरे हिस्से के चारों तरफ़। पीठ पर टेप कंधे की हड्डियों के नीचे बराबर रहे।" } },
          { dg: "body-measurements-figure", args: { m: "underbust" }, title: { en: "Under-bust", hi: "अंडर-बस्ट" }, text: {
            en: "Directly under the bust, where a bra band sits. It decides the blouse's fit under the chest.",
            hi: "बस्ट के ठीक नीचे, जहां ब्रा का बैंड बैठता है। इससे ब्लाउज़ की छाती के नीचे की फ़िटिंग तय होती है।" } },
          { dg: "body-measurements-figure", args: { m: "waist" }, title: { en: "Waist", hi: "कमर" }, text: {
            en: "The narrowest part of the torso, above the belly button. Bend sideways: the crease is your natural waist.",
            hi: "धड़ का सबसे पतला हिस्सा, नाभि के ऊपर। बगल की तरफ़ झुको: जो सिलवट बने वही तुम्हारी नैचुरल कमर है।" } },
          { dg: "body-measurements-figure", args: { m: "hip" }, title: { en: "Hip", hi: "हिप" }, text: {
            en: "Around the fullest part of the bottom, about 20 cm below the waist. Feet together.",
            hi: "नितंब के सबसे भरे हिस्से के चारों तरफ़, कमर से लगभग 20 सेमी नीचे। पैर जुड़े हुए।" } },
          { dg: "body-measurements-figure", args: { m: "shoulder" }, title: { en: "Shoulder", hi: "शोल्डर" }, text: {
            en: "From one shoulder tip to the other, across the back, along the neck base.",
            hi: "एक कंधे की नोक से दूसरे तक, पीठ के ऊपर से, गर्दन के निचले हिस्से के पास से।" } },
          { dg: "body-measurements-figure", args: { m: "neck" }, title: { en: "Neck", hi: "गर्दन" }, text: {
            en: "Around the base of the neck where a collar would sit. Allow one finger of space.",
            hi: "गर्दन की जड़ के चारों तरफ़ जहां कॉलर बैठता है। एक उंगली की जगह छोड़ो।" } }
        ] },
        { t: "img", src: BMEAS + "dress-form-tape.jpg", caption: {
          en: "A dress form with tape marks at the bust, waist and hip. Tailors use these three as their key points.",
          hi: "ड्रेस फ़ॉर्म पर बस्ट, कमर और हिप पर टेप के निशान। दर्ज़ी इन तीन को अपने मुख्य पॉइंट मानते हैं।" } },
        { t: "compare", items: [
          { dg: "body-measurements-figure", args: { m: "hip" }, title: { en: "Correct", hi: "सही" }, points: [
            { en: "Tape is level all around", hi: "टेप चारों तरफ़ बराबर है" },
            { en: "Snug, one finger fits", hi: "हल्का कसा, एक उंगली आती है" }] },
          { dg: "body-measurements-figure", args: { m: "hip", wrong: true }, title: { en: "Wrong", hi: "गलत" }, points: [
            { en: "Tape is tilted, so the number is too big", hi: "टेप तिरछा है, इसलिए नंबर बड़ा आएगा" },
            { en: "Always check the back in a mirror", hi: "पीछे का हिस्सा हमेशा शीशे में देखो" }] }
        ] },
        { t: "tip", kind: "mistake", text: {
          en: "Do not pull the tape tight to get a \"smaller\" number. A tight measure gives a tight blouse, and it will not even close.",
          hi: "\"कम\" नंबर पाने के लिए टेप को कसकर मत खींचो। टाइट माप से ब्लाउज़ टाइट बनेगा, और बंद भी नहीं होगा।" } },
        { t: "terms", items: [
          { en: "Bust", hi: "बस्ट", def: { en: "The fullest measurement around the chest.", hi: "छाती के चारों तरफ़ का सबसे भरा माप।" } },
          { en: "Under-bust", hi: "अंडर-बस्ट", def: { en: "The measurement directly under the bust.", hi: "बस्ट के ठीक नीचे का माप।" } },
          { en: "Natural waist", hi: "नैचुरल वेस्ट", def: { en: "The narrowest part of the torso.", hi: "धड़ का सबसे पतला हिस्सा।" } },
          { en: "Shoulder width", hi: "शोल्डर चौड़ाई", def: { en: "Distance between the two shoulder tips.", hi: "दोनों कंधों की नोक के बीच की दूरी।" } }
        ] },
        { t: "try", text: {
          en: "Ask a friend or sibling to measure your bust, waist and hip, and write them in a notebook. Then measure them back. These are your 3 key numbers.",
          hi: "किसी दोस्त या भाई-बहन से अपना बस्ट, कमर और हिप नपवाओ और नोटबुक में लिखो। फिर उनका माप लो। ये तुम्हारे 3 मुख्य नंबर हैं।" } }
      ]
    },
    {
      id: "measure-arms-and-legs",
      title: { en: "Arms, lengths and legs", hi: "बाहें, लंबाई और पैर" },
      min: 8,
      blocks: [
        { t: "p", text: {
          en: "Now the sleeves, the lengths and the legs. For arms, stand with the elbow slightly bent so the sleeve does not feel tight when you move.",
          hi: "अब बाजू, लंबाइयां और पैर। बाहों के लिए कोहनी हल्की मुड़ी रखो, ताकि हिलने पर आस्तीन टाइट न लगे।" } },
        { t: "gallery", cols: 3, items: [
          { dg: "body-measurements-figure", args: { m: "armlength" }, label: { en: "Arm length", hi: "आर्म लेंथ" }, note: { en: "Shoulder tip to wrist, elbow bent", hi: "कंधे की नोक से कलाई तक, कोहनी मुड़ी" } },
          { dg: "body-measurements-figure", args: { m: "armhole" }, label: { en: "Armhole", hi: "आर्महोल" }, note: { en: "Around the shoulder joint, through the armpit", hi: "कंधे के जोड़ के चारों तरफ़, बगल से होकर" } },
          { dg: "body-measurements-figure", args: { m: "bicep" }, label: { en: "Bicep", hi: "बाइसेप" }, note: { en: "Fullest upper arm", hi: "ऊपरी बाजू का सबसे भरा हिस्सा" } },
          { dg: "body-measurements-figure", args: { m: "wrist" }, label: { en: "Wrist", hi: "कलाई" }, note: { en: "For cuffs and bangles", hi: "कफ़ और चूड़ियों के लिए" } },
          { dg: "body-measurements-figure", args: { m: "napewaist" }, label: { en: "Nape to waist", hi: "नेप से कमर" }, note: { en: "Bone at back of neck down to the waist", hi: "गर्दन के पीछे की हड्डी से कमर तक" } },
          { dg: "body-measurements-figure", args: { m: "frontlength" }, label: { en: "Front length", hi: "फ्रंट लेंथ" }, note: { en: "Neck-shoulder point over the bust to the waist", hi: "गर्दन-कंधे के पॉइंट से बस्ट के ऊपर से कमर तक" } }
        ] },
        { t: "img", src: BMEAS + "tape-yellow.jpg", caption: {
          en: "A flexible tape bends around curves. A steel tape cannot, so never use it on the body.",
          hi: "फ़्लेक्सिबल टेप कर्व पर मुड़ जाता है। स्टील टेप नहीं मुड़ता, इसलिए बॉडी पर कभी इस्तेमाल मत करो।" } },
        { t: "h", text: { en: "Legs and height", hi: "पैर और लंबाई" } },
        { t: "gallery", cols: 3, items: [
          { dg: "body-measurements-figure", args: { m: "inseam" }, label: { en: "Inseam", hi: "इनसीम" }, note: { en: "Crotch to ankle along the inside leg", hi: "भीतरी पैर पर क्रॉच से टखने तक" } },
          { dg: "body-measurements-figure", args: { m: "outseam" }, label: { en: "Outseam", hi: "आउटसीम" }, note: { en: "Waist to ankle along the outer side", hi: "कमर से टखने तक बाहरी तरफ़ से" } },
          { dg: "body-measurements-figure", args: { m: "thigh" }, label: { en: "Thigh", hi: "जांघ" }, note: { en: "Fullest part, right under the hip", hi: "सबसे भरा हिस्सा, हिप के ठीक नीचे" } },
          { dg: "body-measurements-figure", args: { m: "knee" }, label: { en: "Knee", hi: "घुटना" }, note: { en: "Around the middle of the knee", hi: "घुटने के बीच में चारों तरफ़" } },
          { dg: "body-measurements-figure", args: { m: "ankle" }, label: { en: "Ankle", hi: "टखना" }, note: { en: "For churidar and pant hems", hi: "चूड़ीदार और पैंट के हेम के लिए" } },
          { dg: "body-measurements-figure", args: { m: "height" }, label: { en: "Height", hi: "लंबाई" }, note: { en: "Without shoes, back to a wall", hi: "बिना जूतों के, दीवार से पीठ लगाकर" } }
        ] },
        { t: "tip", kind: "tip", text: {
          en: "For a **churidar** or **salwar**, the tailor needs outseam, inseam, thigh, knee and ankle. These 5 numbers decide whether the fit is neat.",
          hi: "**चूड़ीदार** या **सलवार** के लिए दर्ज़ी को आउटसीम, इनसीम, जांघ, घुटना और टखना चाहिए। ये 5 नंबर तय करते हैं कि फ़िटिंग साफ़ आएगी या नहीं।" } },
        { t: "tip", kind: "remember", text: {
          en: "Always keep a **measurement card**: name, date and all 18 numbers. Bodies change, so re-measure every 6 months.",
          hi: "हमेशा एक **माप कार्ड** रखो: नाम, तारीख और सारे 18 नंबर। बॉडी बदलती है, इसलिए हर 6 महीने में दोबारा नापो।" } },
        { t: "terms", items: [
          { en: "Inseam", hi: "इनसीम", def: { en: "Length of the inside leg, crotch to ankle.", hi: "भीतरी पैर की लंबाई, क्रॉच से टखने तक।" } },
          { en: "Outseam", hi: "आउटसीम", def: { en: "Length of the outer leg, waist to ankle.", hi: "बाहरी पैर की लंबाई, कमर से टखने तक।" } },
          { en: "Armhole", hi: "आर्महोल", def: { en: "The opening in a garment where the sleeve joins.", hi: "कपड़े का वो खुला हिस्सा जहां आस्तीन जुड़ती है।" } },
          { en: "Nape", hi: "नेप", def: { en: "The back of the neck, at the top of the spine.", hi: "गर्दन का पिछला हिस्सा, रीढ़ के ऊपर।" } }
        ] },
        { t: "try", text: {
          en: "Make a measurement card for yourself with all 18 names in a table. Fill in every number with a helper. Keep it in your sketchbook.",
          hi: "अपने लिए एक माप कार्ड बनाओ जिसमें सारे 18 नाम टेबल में हों। किसी की मदद से हर नंबर भरो। इसे अपनी स्केचबुक में रखो।" } }
      ]
    },
    {
      id: "size-charts-and-ease",
      title: { en: "Size charts & ease", hi: "साइज़ चार्ट और ईज़" },
      min: 6,
      blocks: [
        { t: "p", text: {
          en: "S, M, L are not a measurement. They are a rough group, and every brand makes its own. A medium at one brand can be a small at another. Always check the brand's chart, and trust your tape, not the label.",
          hi: "S, M, L कोई माप नहीं है। ये एक मोटा ग्रुप है, और हर ब्रांड अपना बनाता है। एक ब्रांड का मीडियम दूसरे का स्मॉल हो सकता है। हमेशा ब्रांड का चार्ट देखो, और लेबल पर नहीं, अपने टेप पर भरोसा करो।" } },
        { t: "img", src: BMEAS + "size-label.jpg", caption: {
          en: "The size on a label: XS, S, M, L, XL, XXL.",
          hi: "लेबल पर साइज़: XS, S, M, L, XL, XXL।" } },
        { t: "table", head: [{ en: "Size", hi: "साइज़" }, "UK", "US", "EU"], rows: [
          ["XS", "6", "2", "34"], ["S", "8", "4", "36"], ["M", "10", "6", "38"], ["L", "12", "8", "40"], ["XL", "14", "10", "42"]
        ] },
        { t: "table", head: [{ en: "Size", hi: "साइज़" }, { en: "Bust (in)", hi: "बस्ट (इंच)" }, { en: "Waist (in)", hi: "कमर (इंच)" }, { en: "Hip (in)", hi: "हिप (इंच)" }], rows: [
          ["XS", "32", "26", "35"], ["S", "34", "28", "37"], ["M", "36", "30", "39"], ["L", "38", "32", "41"], ["XL", "40", "34", "43"]
        ] },
        { t: "tip", kind: "fact", text: {
          en: "These are rough women's numbers. Indian brands often use UK-style sizes, but charts differ, so always check the one on the product page.",
          hi: "ये महिलाओं के मोटे नंबर हैं। भारतीय ब्रांड अक्सर UK जैसे साइज़ इस्तेमाल करते हैं, पर चार्ट अलग होते हैं, इसलिए प्रोडक्ट पेज पर दिया चार्ट ज़रूर देखो।" } },
        { t: "h", text: { en: "What is ease?", hi: "ईज़ क्या है?" } },
        { t: "p", text: {
          en: "Clothes are never cut to your exact body size. They are made a little bigger so you can breathe, sit and move. That extra room is called **ease**. There are two kinds.",
          hi: "कपड़े कभी बिल्कुल तुम्हारे बॉडी साइज़ के नहीं काटे जाते। उन्हें थोड़ा बड़ा बनाते हैं, ताकि तुम सांस ले सको, बैठ सको और चल सको। इस एक्स्ट्रा जगह को **ईज़ (Ease)** कहते हैं। इसके दो प्रकार हैं।" } },
        { t: "compare", items: [
          { dg: "body-measurements-ease", args: { kind: "wearing" }, title: { en: "Wearing ease", hi: "वेयरिंग ईज़" }, points: [
            { en: "The minimum room to move comfortably", hi: "आराम से हिलने की कम से कम जगह" },
            { en: "About 2 to 4 cm at the bust of a fitted blouse", hi: "फ़िटेड ब्लाउज़ में बस्ट पर लगभग 2 से 4 सेमी" }] },
          { dg: "body-measurements-ease", args: { kind: "design" }, title: { en: "Design ease", hi: "डिज़ाइन ईज़" }, points: [
            { en: "Extra room added on purpose for the style", hi: "स्टाइल के लिए जानबूझकर जोड़ी गई एक्स्ट्रा जगह" },
            { en: "An oversized shirt may have 15 cm or more", hi: "ओवरसाइज़ शर्ट में 15 सेमी या ज़्यादा हो सकती है" }] }
        ] },
        { t: "terms", items: [
          { en: "Size chart", hi: "साइज़ चार्ट", def: { en: "A table that links sizes to body measurements.", hi: "टेबल जो साइज़ को बॉडी माप से जोड़ती है।" } },
          { en: "Ease", hi: "ईज़", def: { en: "The extra room in a garment beyond your body size.", hi: "कपड़े में तुम्हारी बॉडी से ज़्यादा की एक्स्ट्रा जगह।" } },
          { en: "Wearing ease", hi: "वेयरिंग ईज़", def: { en: "The small room needed to breathe and move.", hi: "सांस लेने और हिलने के लिए ज़रूरी छोटी जगह।" } },
          { en: "Design ease", hi: "डिज़ाइन ईज़", def: { en: "Extra room added to create a loose or flowing style.", hi: "ढीला या बहता स्टाइल बनाने के लिए जोड़ी गई जगह।" } }
        ] },
        { t: "try", text: {
          en: "Take your own bust, waist and hip. Find the size on any online fashion store chart. Is it the same size for all three? Often it is not.",
          hi: "अपना बस्ट, कमर और हिप नापो। किसी ऑनलाइन फ़ैशन स्टोर के चार्ट में साइज़ ढूंढो। क्या तीनों में एक ही साइज़ आया? अक्सर नहीं आता।" } }
      ]
    },
    {
      id: "body-shapes",
      title: { en: "Body shapes", hi: "बॉडी शेप" },
      min: 6,
      blocks: [
        { t: "p", text: {
          en: "Bodies come in many lovely shapes. Designers sort them into **five common shapes**, only to decide which cuts will balance the figure. No shape is better than another.",
          hi: "बॉडी कई प्यारे आकारों में आती हैं। डिज़ाइनर उन्हें **पांच आम शेप** में बांटते हैं, सिर्फ़ ये तय करने के लिए कि कौन से कट फ़िगर को बैलेंस करेंगे। कोई शेप दूसरी से बेहतर नहीं है।" } },
        { t: "gallery", cols: 3, items: [
          { dg: "body-measurements-shape", args: { shape: "hourglass" }, label: { en: "Hourglass", hi: "आवरग्लास" }, note: { en: "Shoulders and hips match, small waist", hi: "कंधे और हिप बराबर, पतली कमर" } },
          { dg: "body-measurements-shape", args: { shape: "pear" }, label: { en: "Pear (triangle)", hi: "पियर (ट्राएंगल)" }, note: { en: "Hips wider than shoulders", hi: "हिप कंधों से चौड़े" } },
          { dg: "body-measurements-shape", args: { shape: "apple" }, label: { en: "Apple (round)", hi: "एप्पल (राउंड)" }, note: { en: "Fuller middle, slimmer legs", hi: "बीच का हिस्सा भरा, पैर पतले" } },
          { dg: "body-measurements-shape", args: { shape: "rectangle" }, label: { en: "Rectangle", hi: "रेक्टैंगल" }, note: { en: "Shoulders, waist, hips similar", hi: "कंधे, कमर, हिप लगभग एक जैसे" } },
          { dg: "body-measurements-shape", args: { shape: "inverted" }, label: { en: "Inverted triangle", hi: "इनवर्टेड ट्राएंगल" }, note: { en: "Shoulders wider than hips", hi: "कंधे हिप से चौड़े" } }
        ] },
        { t: "h", text: { en: "How to find yours", hi: "अपनी शेप कैसे पहचानो" } },
        { t: "p", text: {
          en: "Use only three numbers: **bust, waist and hip** (from your measurement card). Compare them using this simple guide. It is approximate, so many people sit between two shapes.",
          hi: "सिर्फ़ तीन नंबर लो: **बस्ट, कमर और हिप** (अपने माप कार्ड से)। इस आसान गाइड से उनकी तुलना करो। ये अंदाज़ा है, इसलिए कई लोग दो शेप के बीच में आते हैं।" } },
        { t: "list", style: "dot", items: [
          { en: "**Hourglass**: bust and hip are within about 5% of each other, and the waist is much smaller (about 25% less).", hi: "**आवरग्लास**: बस्ट और हिप में लगभग 5% का ही फ़र्क, और कमर काफ़ी छोटी (लगभग 25% कम)।" },
          { en: "**Pear**: hip is more than 5% bigger than the bust.", hi: "**पियर**: हिप बस्ट से 5% से ज़्यादा बड़ा।" },
          { en: "**Inverted triangle**: bust or shoulders are more than 5% bigger than the hip.", hi: "**इनवर्टेड ट्राएंगल**: बस्ट या कंधे हिप से 5% से ज़्यादा बड़े।" },
          { en: "**Rectangle**: bust and hip are similar, and the waist is only a little smaller.", hi: "**रेक्टैंगल**: बस्ट और हिप लगभग बराबर, और कमर थोड़ी ही छोटी।" },
          { en: "**Apple**: the waist is about as wide as the bust and hip, or wider.", hi: "**एप्पल**: कमर लगभग बस्ट और हिप जितनी चौड़ी, या ज़्यादा।" }
        ] },
        { t: "img", src: BMEAS + "vintage-form.jpg", caption: {
          en: "A tailor's form. Designers fit clothes on forms like this, but real bodies are all different, and that is a good thing.",
          hi: "दर्ज़ी का फ़ॉर्म। डिज़ाइनर ऐसे फ़ॉर्म पर कपड़े फ़िट करते हैं, पर असली बॉडी सब अलग होती हैं, और यही अच्छी बात है।" } },
        { t: "tip", kind: "remember", text: {
          en: "Shapes are a **tool for designers**, not a label for people. Weight, height and posture also change how clothes look.",
          hi: "शेप **डिज़ाइनर के लिए एक टूल** है, लोगों पर लेबल नहीं। वज़न, हाइट और पोस्चर भी कपड़ों का लुक बदलते हैं।" } },
        { t: "terms", items: [
          { en: "Silhouette", hi: "सिल्हूट", def: { en: "The outer outline shape of a body or an outfit.", hi: "बॉडी या आउटफ़िट का बाहरी आकार।" } },
          { en: "Hourglass", hi: "आवरग्लास", def: { en: "A shape with matching bust and hips and a defined waist.", hi: "बराबर बस्ट और हिप और साफ़ कमर वाली शेप।" } },
          { en: "Pear", hi: "पियर", def: { en: "A shape that is fuller at the hips than at the shoulders.", hi: "ऐसी शेप जिसमें हिप कंधों से भरे हों।" } },
          { en: "Inverted triangle", hi: "इनवर्टेड ट्राएंगल", def: { en: "A shape with broader shoulders than hips.", hi: "कंधे हिप से चौड़े वाली शेप।" } }
        ] },
        { t: "try", text: {
          en: "Use the guide on 3 family members or friends (with permission). Do not tell anyone they are \"wrong\". Just notice how many shapes there are.",
          hi: "इस गाइड को 3 घरवालों या दोस्तों पर आज़माओ (उनकी इजाज़त से)। किसी को ये मत कहो कि वो \"गलत\" हैं। बस देखो कितनी अलग शेप होती हैं।" } }
      ]
    },
    {
      id: "dressing-body-shapes",
      title: { en: "Dressing different shapes", hi: "अलग-अलग शेप को कैसे पहनाएं" },
      min: 7,
      blocks: [
        { t: "p", text: {
          en: "The goal of a designer is **balance**, never hiding. We play with line, cut and detail to bring the eye where we want it. Every shape can look stunning when the outfit works with it.",
          hi: "डिज़ाइनर का लक्ष्य **बैलेंस** है, छुपाना कभी नहीं। हम लाइन, कट और डिटेल से नज़र को वहां ले जाते हैं जहां चाहते हैं। जब आउटफ़िट बॉडी के साथ काम करे, तो हर शेप शानदार लग सकती है।" } },
        { t: "cards", items: [
          { dg: "body-measurements-shape", args: { shape: "hourglass" }, title: { en: "Hourglass", hi: "आवरग्लास" }, text: {
            en: "Follow the waist. Wrap dresses, belted kurtis, fitted blouses with a saree and neat pleats, high-waist lehenga skirts.",
            hi: "कमर को फ़ॉलो करो। रैप ड्रेस, बेल्ट वाली कुर्ती, साड़ी के साथ फ़िटेड ब्लाउज़ और साफ़ प्लीट्स, हाई-वेस्ट लहंगा।" } },
          { dg: "body-measurements-shape", args: { shape: "pear" }, title: { en: "Pear", hi: "पियर" }, text: {
            en: "Bring the eye up. Boat necks, puff or embroidered sleeves, bright tops, with A-line or flared skirts, palazzos and Anarkalis.",
            hi: "नज़र ऊपर लाओ। बोट नेक, पफ़ या कढ़ाई वाली आस्तीन, चटक टॉप, और A-लाइन या फ़्लेयर स्कर्ट, पलाज़ो और अनारकली।" } },
          { dg: "body-measurements-shape", args: { shape: "apple" }, title: { en: "Apple", hi: "एप्पल" }, text: {
            en: "Make a long, easy line. V-necks, empire waists, straight or flowing kurtas, soft sarees. Show off legs and arms.",
            hi: "लंबी, आसान लाइन बनाओ। V-नेक, एम्पायर वेस्ट, सीधे या बहते कुर्ते, नरम साड़ियां। पैर और बाहें दिखाओ।" } },
          { dg: "body-measurements-shape", args: { shape: "rectangle" }, title: { en: "Rectangle", hi: "रेक्टैंगल" }, text: {
            en: "Create curves. Peplum tops, belts, ruffles, layers, gathered waists, fit-and-flare dresses, a kurta with a jacket.",
            hi: "कर्व बनाओ। पेप्लम टॉप, बेल्ट, रफ़ल, लेयर, गैदर वाली कमर, फ़िट-एंड-फ़्लेयर ड्रेस, जैकेट के साथ कुर्ता।" } },
          { dg: "body-measurements-shape", args: { shape: "inverted" }, title: { en: "Inverted triangle", hi: "इनवर्टेड ट्राएंगल" }, text: {
            en: "Soften the top, add volume below. Soft shoulders, V or scoop necks, flared palazzos, printed bottoms, voluminous lehengas.",
            hi: "ऊपर को नरम करो, नीचे वॉल्यूम जोड़ो। नरम कंधे, V या स्कूप नेक, फ़्लेयर पलाज़ो, प्रिंटेड बॉटम, घेरदार लहंगे।" } }
        ] },
        { t: "gallery", cols: 2, items: [
          { src: BMEAS + "tailor-sewing.jpg", label: { en: "Made-to-measure", hi: "नाप के हिसाब से सिलाई" }, note: { en: "A darzi can adjust every cut to the person", hi: "दर्ज़ी हर कट को इंसान के हिसाब से बदल सकता है" } },
          { src: BMEAS + "tailor-shop-front.jpg", label: { en: "The neighbourhood tailor", hi: "मोहल्ले का दर्ज़ी" }, note: { en: "Fit problems are solved with small alterations", hi: "फ़िटिंग की दिक्कतें छोटे बदलावों से सुलझ जाती हैं" } }
        ] },
        { t: "h", text: { en: "Four tools of balance", hi: "बैलेंस के चार औज़ार" } },
        { t: "list", style: "check", items: [
          { en: "**Neckline**: V and scoop lengthen, boat widens.", hi: "**नेकलाइन**: V और स्कूप लंबा दिखाते हैं, बोट चौड़ा।" },
          { en: "**Waistline**: high, natural or low changes where the body seems to divide.", hi: "**वेस्टलाइन**: हाई, नैचुरल या लो — बॉडी कहां बंटती दिखे, ये बदल देती है।" },
          { en: "**Colour and print**: light and bright catches the eye, dark and plain calms it.", hi: "**रंग और प्रिंट**: हल्का और चटक नज़र खींचता है, गहरा और सादा शांत करता है।" },
          { en: "**Fabric**: soft fabrics drape, stiff fabrics add shape and volume.", hi: "**कपड़ा**: नरम कपड़े गिरते हैं, सख़्त कपड़े शेप और वॉल्यूम देते हैं।" }
        ] },
        { t: "tip", kind: "remember", text: {
          en: "These are **guides, not rules**. If you love an outfit and feel confident in it, it works. Confidence is the best accessory.",
          hi: "ये **गाइड हैं, नियम नहीं**। अगर तुम्हें कोई आउटफ़िट पसंद है और उसमें कॉन्फ़िडेंट लगता है, तो वो सही है। कॉन्फ़िडेंस सबसे अच्छी एक्सेसरी है।" } },
        { t: "terms", items: [
          { en: "Balance", hi: "बैलेंस", def: { en: "Making the top and bottom of an outfit look in harmony.", hi: "आउटफ़िट के ऊपर और नीचे के हिस्सों को तालमेल में दिखाना।" } },
          { en: "Empire waist", hi: "एम्पायर वेस्ट", def: { en: "A waistline placed just under the bust.", hi: "बस्ट के ठीक नीचे रखी गई वेस्टलाइन।" } },
          { en: "Peplum", hi: "पेप्लम", def: { en: "A short flared ruffle sewn at the waist.", hi: "कमर पर सिली गई छोटी फ़्लेयर रफ़ल।" } },
          { en: "Made-to-measure", hi: "मेड-टू-मेज़र", def: { en: "Clothes cut and sewn for one person's exact numbers.", hi: "एक इंसान के सटीक माप के हिसाब से कटे और सिले कपड़े।" } }
        ] },
        { t: "try", text: {
          en: "Pick one shape. Draw 3 outfits (kurta, lehenga or dress) that balance it, using the four tools. Write why each works.",
          hi: "कोई एक शेप चुनो। चार औज़ारों का इस्तेमाल करके उसे बैलेंस करने वाले 3 आउटफ़िट (कुर्ता, लहंगा या ड्रेस) बनाओ। हर एक के काम करने का कारण लिखो।" } }
      ]
    }
  ],
  quiz: [
    { q: { en: "How should the measuring tape sit on the body?", hi: "टेप बॉडी पर कैसे बैठना चाहिए?" },
      options: [{ en: "Very tight", hi: "बहुत टाइट" }, { en: "Snug and level, one finger fits", hi: "हल्का कसा और बराबर, एक उंगली आए" }, { en: "Loose and tilted", hi: "ढीला और तिरछा" }], answer: 1,
      why: { en: "Snug and level gives the true size. Tight gives too small, tilted gives too big.", hi: "हल्का कसा और बराबर टेप असली साइज़ देता है। टाइट कम और तिरछा ज़्यादा नंबर देगा।" },
      src: BMEAS + "tape-colourful.jpg" },
    { q: { en: "What should you wear when being measured?", hi: "माप लेते समय क्या पहनना चाहिए?" },
      options: [{ en: "A thick jacket", hi: "मोटी जैकेट" }, { en: "Thin, close-fitting clothes", hi: "पतले, फ़िटिंग वाले कपड़े" }, { en: "A heavy lehenga", hi: "भारी लहंगा" }], answer: 1,
      why: { en: "Thick clothing adds extra inches to every number.", hi: "मोटे कपड़े हर नंबर में एक्स्ट्रा इंच जोड़ देते हैं।" } },
    { q: { en: "Where do you measure the bust?", hi: "बस्ट कहां से नापते हैं?" },
      options: [{ en: "Around the narrowest part of the torso", hi: "धड़ के सबसे पतले हिस्से के चारों तरफ़" }, { en: "Around the fullest part of the chest", hi: "छाती के सबसे भरे हिस्से के चारों तरफ़" }, { en: "From shoulder to waist", hi: "कंधे से कमर तक" }], answer: 1,
      why: { en: "Bust is the fullest circumference of the chest, with the tape level at the back.", hi: "बस्ट छाती का सबसे भरा घेरा है, और पीठ पर टेप बराबर रहता है।" },
      dg: "body-measurements-figure", args: { m: "bust" } },
    { q: { en: "Which pair of measurements does a churidar need most?", hi: "चूड़ीदार के लिए कौन से माप सबसे ज़रूरी हैं?" },
      options: [{ en: "Neck and wrist", hi: "गर्दन और कलाई" }, { en: "Outseam, inseam and ankle", hi: "आउटसीम, इनसीम और टखना" }, { en: "Armhole and bicep", hi: "आर्महोल और बाइसेप" }], answer: 1,
      why: { en: "Leg measurements decide the length and the neat fit at the ankle.", hi: "पैर के माप लंबाई और टखने पर साफ़ फ़िटिंग तय करते हैं।" },
      dg: "body-measurements-figure", args: { m: "inseam" } },
    { q: { en: "Is a size M the same at every brand?", hi: "क्या हर ब्रांड में साइज़ M एक जैसा होता है?" },
      options: [{ en: "Yes, always", hi: "हां, हमेशा" }, { en: "No, check each brand's chart", hi: "नहीं, हर ब्रांड का चार्ट देखो" }, { en: "Only in India", hi: "सिर्फ़ भारत में" }], answer: 1,
      why: { en: "S, M, L are rough groups. Every brand sets its own numbers.", hi: "S, M, L मोटे ग्रुप हैं। हर ब्रांड अपने नंबर खुद तय करता है।" },
      src: BMEAS + "size-label.jpg" },
    { q: { en: "UK 10 is about which letter size?", hi: "UK 10 लगभग कौन सा लेटर साइज़ है?" },
      options: [{ en: "S", hi: "S साइज़" }, { en: "M", hi: "M साइज़" }, { en: "XL", hi: "XL साइज़" }], answer: 1,
      why: { en: "UK 10 is about M (US 6, EU 38).", hi: "UK 10 लगभग M है (US 6, EU 38)।" } },
    { q: { en: "What is design ease?", hi: "डिज़ाइन ईज़ क्या है?" },
      options: [{ en: "Extra room added on purpose for the style", hi: "स्टाइल के लिए जानबूझकर जोड़ी गई जगह" }, { en: "The room needed to breathe", hi: "सांस लेने के लिए ज़रूरी जगह" }, { en: "A stitching mistake", hi: "सिलाई की गलती" }], answer: 0,
      why: { en: "Wearing ease is the minimum room. Design ease is the extra, for an oversized or flowing look.", hi: "वेयरिंग ईज़ कम से कम जगह है। डिज़ाइन ईज़ ओवरसाइज़ या बहते लुक के लिए एक्स्ट्रा जगह है।" },
      dg: "body-measurements-ease", args: { kind: "design" } },
    { q: { en: "Hips noticeably wider than the bust and shoulders is which shape?", hi: "हिप का बस्ट और कंधों से साफ़ चौड़ा होना कौन सी शेप है?" },
      options: [{ en: "Inverted triangle", hi: "इनवर्टेड ट्राएंगल" }, { en: "Pear", hi: "पियर" }, { en: "Rectangle", hi: "रेक्टैंगल" }], answer: 1,
      why: { en: "That is a pear (triangle). The inverted triangle is the opposite.", hi: "ये पियर (ट्राएंगल) है। इनवर्टेड ट्राएंगल इसका उल्टा है।" },
      dg: "body-measurements-shape", args: { shape: "pear" } },
    { q: { en: "Bust and hip match and the waist is much smaller. Which shape?", hi: "बस्ट और हिप बराबर और कमर काफ़ी छोटी। कौन सी शेप?" },
      options: [{ en: "Hourglass", hi: "आवरग्लास" }, { en: "Apple", hi: "एप्पल" }, { en: "Rectangle", hi: "रेक्टैंगल" }], answer: 0,
      why: { en: "A matching bust and hip with a defined waist is the hourglass.", hi: "बराबर बस्ट और हिप के साथ साफ़ कमर आवरग्लास है।" },
      dg: "body-measurements-shape", args: { shape: "hourglass" } },
    { q: { en: "What is the goal of dressing different body shapes?", hi: "अलग-अलग बॉडी शेप को पहनाने का लक्ष्य क्या है?" },
      options: [{ en: "Hide the body", hi: "बॉडी को छुपाना" }, { en: "Balance the figure and feel confident", hi: "फ़िगर को बैलेंस करना और कॉन्फ़िडेंट महसूस करना" }, { en: "Make everyone look the same", hi: "सबको एक जैसा दिखाना" }], answer: 1,
      why: { en: "Designers aim for balance and confidence. No shape needs hiding.", hi: "डिज़ाइनर बैलेंस और कॉन्फ़िडेंस चाहते हैं। किसी शेप को छुपाने की ज़रूरत नहीं।" } }
  ]
});
