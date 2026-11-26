/* Module 7 - Indian Textiles & Crafts */

/* A simple, map-like sketch of India with craft centres. args.set: weaves | prints | embroidery */
FD.diagram("indian-textiles-map", function (a, lang) {
  /* rough outline as [longitude, latitude] points */
  var pts = [[68.5,23.5],[70.2,24.6],[70.6,25.7],[70,27.2],[71.6,28],[73,29.6],[74.4,30.6],[74.6,32.2],[74,33.2],[74,34.6],[75.8,35.6],
    [77.8,35.5],[79.2,34.4],[79,32.6],[78.6,31.2],[80.2,30.2],[80.1,28.8],[83,27.4],[85,26.8],[88,26.4],[88.2,27.6],[88.9,27.2],
    [89.8,26.7],[92,26.9],[94,27.6],[96,29],[97.2,28],[96,27.2],[95,26.4],[94.4,25.4],[94,23.6],[93.3,22.2],[92.6,23.4],[92,24.6],
    [91.4,23.2],[91.2,24.2],[92,25.1],[90,25.2],[89.8,26],[88.5,26.2],[88.2,25.2],[88.8,24.3],[88.8,22],[88.2,21.6],[86.8,21.5],
    [85.5,20],[84.5,19],[83,17.8],[82.2,16.6],[81,15.8],[80.2,15.2],[80.3,13.2],[79.8,11.5],[79.8,10.3],[79,9.3],[78.2,8.8],[77.5,8.1],
    [76.5,8.9],[76,10.5],[75.5,11.8],[74.8,13],[74.4,14.5],[73.5,16],[73,18],[72.8,19.5],[72.7,21],[72.6,22.2],[72.2,21.6],[71,20.8],
    [69.5,21.8],[69,22.4],[70,22.9]];
  function X(lon) { return 12 + (lon - 68) * 10; }
  function Y(lat) { return 10 + (37 - lat) * 10.6; }
  var d = pts.map(function (p, i) { return (i ? "L" : "M") + X(p[0]).toFixed(1) + " " + Y(p[1]).toFixed(1); }).join(" ") + " Z";
  var s = '<path class="sf" d="' + d + '"/><path class="ln" d="' + d + '"/>';
  var sets = {
    weaves: [
      [72.1, 23.85, { en: "Patola", hi: "पटोला" }, "end"],
      [78.1, 24.7, { en: "Chanderi", hi: "चंदेरी" }, "start"],
      [75.6, 22.2, { en: "Maheshwari", hi: "महेश्वरी" }, "start"],
      [83.0, 25.3, { en: "Banarasi", hi: "बनारसी" }, "start"],
      [75.4, 19.5, { en: "Paithani", hi: "पैठणी" }, "start"],
      [78.8, 17.3, { en: "Pochampally", hi: "पोचमपल्ली" }, "start"],
      [79.7, 12.8, { en: "Kanjeevaram", hi: "कांजीवरम" }, "start"],
      [91.7, 26.2, { en: "Muga", hi: "मूगा" }, "middle"]
    ],
    prints: [
      [75.5, 26.9, { en: "Bagru & Sanganer", hi: "बगरू और सांगानेर" }, "start"],
      [69.7, 23.25, { en: "Ajrakh", hi: "अजरख" }, "start"],
      [74.6, 24.9, { en: "Dabu", hi: "दाबू" }, "start"],
      [79.7, 13.75, { en: "Kalamkari", hi: "कलमकारी" }],
      [81.1, 16.2, null],
      [71.0, 22.2, { en: "Bandhani", hi: "बांधनी" }, "below"],
      [73.0, 26.3, { en: "Leheriya", hi: "लहरिया" }, "end"]
    ],
    embroidery: [
      [74.8, 34.1, { en: "Kashida & Sozni", hi: "कशीदा और सोज़नी" }, "start"],
      [75.8, 30.9, { en: "Phulkari", hi: "फुलकारी" }, "end"],
      [80.9, 26.8, { en: "Chikankari (Lucknow)", hi: "चिकनकारी (लखनऊ)" }, "start"],
      [88.2, 23.3, { en: "Kantha", hi: "कांथा" }, "start"],
      [69.7, 23.25, { en: "Kutch mirror work", hi: "कच्छ का शीशा वर्क" }, "start"]
    ]
  };
  var list = sets[a.set] || sets.weaves, n = 0, legend = [];
  list.forEach(function (m) {
    var x = X(m[0]).toFixed(1), y = Y(m[1]).toFixed(1);
    if (m[2]) { n++; legend.push(m[2]); }
    s += '<circle cx="' + x + '" cy="' + y + '" r="7" class="acf"/>' + FD.text(x, (+y + 3.5).toFixed(1), String(n), { cls: "tx", size: 9 });
  });
  legend.forEach(function (t, k) {
    var y = 206 + k * 15;
    s += '<circle cx="196" cy="' + (y - 3.5) + '" r="6" class="acf"/>' + FD.text(196, y, String(k + 1), { cls: "tx", size: 8 });
    s += FD.text(207, y, FD.tx(t, lang), { cls: "tx", size: 10, anchor: "start" });
  });
  return FD.svg(320, 320, s);
});

/* How resist dyeing works: tie, dye, open. */
FD.diagram("indian-textiles-resist", function (a, lang) {
  function L(en, hi) { return FD.tx({ en: en, hi: hi }, lang); }
  var s = "";
  /* 1. white cloth with tied knots */
  s += '<rect x="12" y="30" width="80" height="80" rx="3" class="fl"/>';
  [[32, 50], [72, 50], [52, 70], [32, 90], [72, 90]].forEach(function (p) {
    s += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="6" class="fl"/><path class="ac" d="M' + (p[0] - 6) + " " + p[1] + " L" + (p[0] + 6) + " " + p[1] + '" stroke-width="3"/>';
  });
  /* 2. dye pot */
  s += '<path class="fl" d="M124 52 L196 52 L190 108 Q160 116 130 108 Z"/>';
  s += '<path class="acf" d="M127 66 Q160 60 193 66 L190 108 Q160 116 130 108 Z"/>';
  s += '<path class="ln" d="M150 30 q6 10 0 20 M170 30 q6 10 0 20"/>';
  /* 3. opened cloth: coloured with white dots where the thread was */
  s += '<rect x="228" y="30" width="80" height="80" rx="3" class="acf"/>';
  [[248, 50], [288, 50], [268, 70], [248, 90], [288, 90]].forEach(function (p) {
    s += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="7" class="fl"/><circle cx="' + p[0] + '" cy="' + p[1] + '" r="2.5" class="sf"/>';
  });
  [102, 212].forEach(function (x) { s += '<path class="ac" d="M' + (x) + " 70 L" + (x + 12) + " 70 M" + (x + 7) + " 65 L" + (x + 12) + " 70 L" + (x + 7) + ' 75"/>'; });
  s += FD.text(52, 134, L("1. Tie tightly", "1. कसकर बांधो"), { cls: "tx", size: 11 });
  s += FD.text(160, 134, L("2. Dip in dye", "2. रंग में डुबाओ"), { cls: "tx", size: 11 });
  s += FD.text(268, 134, L("3. Open", "3. खोलो"), { cls: "tx", size: 11 });
  s += FD.text(52, 150, L("thread blocks dye", "धागा रंग रोकता है"), { cls: "tm", size: 9 });
  s += FD.text(160, 150, L("only open cloth takes colour", "खुला कपड़ा ही रंग पकड़ता है"), { cls: "tm", size: 9 });
  s += FD.text(268, 150, L("white dots appear", "सफ़ेद बिंदु दिखते हैं"), { cls: "tm", size: 9 });
  return FD.svg(320, 160, s);
});

/* Ikat: the yarn is tied and dyed BEFORE weaving. */
FD.diagram("indian-textiles-ikat", function (a, lang) {
  function L(en, hi) { return FD.tx({ en: en, hi: hi }, lang); }
  var s = "", i;
  /* 1. bundle of yarns with tied bands */
  for (i = 0; i < 7; i++) s += '<path class="ln" d="M' + (18 + i * 10) + " 26 L" + (18 + i * 10) + ' 112"/>';
  [44, 84].forEach(function (y) { s += '<rect x="12" y="' + y + '" width="72" height="12" rx="3" class="fl"/>'; });
  /* 2. dyed yarns: colour everywhere except tied bands */
  for (i = 0; i < 7; i++) {
    var x = 124 + i * 10;
    s += '<path class="ac" d="M' + x + " 26 L" + x + " 44 M" + x + " 56 L" + x + " 84 M" + x + " 96 L" + x + ' 112" stroke-width="4"/>';
    s += '<path class="gd" d="M' + x + " 44 L" + x + " 56 M" + x + " 84 L" + x + ' 96"/>';
  }
  /* 3. woven cloth: soft, feathered pattern */
  s += '<rect x="226" y="26" width="84" height="86" rx="3" class="acf"/>';
  [[268, 50], [268, 90]].forEach(function (p) {
    for (var r = -3; r <= 3; r++) {
      var w = 30 - Math.abs(r) * 7, off = (r % 2) * 3;
      s += '<rect x="' + (p[0] - w / 2 + off) + '" y="' + (p[1] + r * 3 - 1.5) + '" width="' + w + '" height="3" class="fl"/>';
    }
  });
  [96, 202].forEach(function (x) { s += '<path class="ac" d="M' + x + " 69 L" + (x + 12) + " 69 M" + (x + 7) + " 64 L" + (x + 12) + " 69 L" + (x + 7) + ' 74"/>'; });
  s += FD.text(48, 134, L("1. Tie the yarn", "1. धागे बांधो"), { cls: "tx", size: 11 });
  s += FD.text(154, 134, L("2. Dye the yarn", "2. धागे रंगो"), { cls: "tx", size: 11 });
  s += FD.text(268, 134, L("3. Weave", "3. बुनो"), { cls: "tx", size: 11 });
  s += FD.text(268, 150, L("blurry, feathered edges", "धुंधले, पंख जैसे किनारे"), { cls: "tm", size: 9 });
  return FD.svg(320, 160, s);
});

/* Block printing: one carved block for each colour. */
FD.diagram("indian-textiles-blocks", function (a, lang) {
  function L(en, hi) { return FD.tx({ en: en, hi: hi }, lang); }
  function flower(cx, cy, cls, outline) {
    var s = "";
    for (var k = 0; k < 6; k++) {
      var ang = k * 60;
      s += '<ellipse cx="' + cx + '" cy="' + (cy - 13) + '" rx="7" ry="12" transform="rotate(' + ang + " " + cx + " " + cy + ')" class="' + cls + '"/>';
    }
    s += '<circle cx="' + cx + '" cy="' + cy + '" r="5" class="' + (outline ? "ln" : cls) + '"/>';
    return s;
  }
  var s = "";
  s += '<rect x="14" y="20" width="80" height="80" rx="4" class="fl"/>' + flower(54, 60, "ln", true);
  s += '<rect x="120" y="20" width="80" height="80" rx="4" class="fl"/>' + flower(160, 60, "sf");
  s += '<rect x="226" y="20" width="80" height="80" rx="4" class="fl"/>' + flower(266, 60, "sf") + flower(266, 60, "ln", true);
  s += FD.text(107, 64, "+", { cls: "tx", size: 18 }) + FD.text(213, 64, "=", { cls: "tx", size: 18 });
  s += FD.text(54, 120, L("Block 1: outline", "ब्लॉक 1: आउटलाइन"), { cls: "tx", size: 10 });
  s += FD.text(160, 120, L("Block 2: fill colour", "ब्लॉक 2: भराई का रंग"), { cls: "tx", size: 10 });
  s += FD.text(266, 120, L("Final print", "फ़ाइनल प्रिंट"), { cls: "tx", size: 10 });
  return FD.svg(320, 132, s);
});

FD.module({
  id: "indian-textiles",
  num: 7,
  level: "basic",
  title: { en: "Indian Textiles & Crafts", hi: "भारतीय टेक्सटाइल और शिल्प" },
  tagline: {
    en: "A colourful tour of India's weaves, dyes, prints and embroideries",
    hi: "भारत की बुनाई, रंगाई, छपाई और कढ़ाई की एक रंगीन सैर"
  },
  cover: "assets/img/indian-textiles/cover.jpg",
  learn: [
    { en: "India's famous handwoven saris and where they come from", hi: "भारत की मशहूर हाथ से बुनी साड़ियाँ और वो कहाँ से आती हैं" },
    { en: "How tie-dye and other resist methods make patterns", hi: "टाई-डाई और दूसरे रेज़िस्ट तरीकों से डिज़ाइन कैसे बनते हैं" },
    { en: "Block printing, Kalamkari and natural dyes like indigo", hi: "ब्लॉक प्रिंटिंग, कलमकारी और नील जैसे प्राकृतिक रंग" },
    { en: "How to recognise 8 famous Indian embroideries", hi: "8 मशहूर भारतीय कढ़ाइयों को कैसे पहचानें" },
    { en: "Why khadi, handloom and GI tags matter for designers today", hi: "आज के डिज़ाइनरों के लिए खादी, हैंडलूम और GI टैग क्यों ज़रूरी हैं" }
  ],
  lessons: [
    /* ---------------------------------------------------------------- 1 */
    {
      id: "handwoven-saris",
      title: { en: "Handwoven silks & saris", hi: "हाथ से बुनी सिल्क और साड़ियाँ" },
      min: 8,
      blocks: [
        { t: "p", text: {
          en: "Almost every state in India has its own famous sari. Each one is woven by hand on a **handloom**, with skills passed down for generations.",
          hi: "भारत के लगभग हर राज्य की अपनी एक मशहूर साड़ी है। हर एक को **हैंडलूम (Handloom)** पर हाथ से बुना जाता है, और ये हुनर पीढ़ियों से चला आ रहा है।" } },
        { t: "dg", name: "indian-textiles-map", args: { set: "weaves" }, caption: {
          en: "Where the famous weaves come from.",
          hi: "मशहूर बुनाइयाँ कहाँ से आती हैं।" } },
        { t: "img", src: "assets/img/indian-textiles/banaras-weaver.jpg", caption: {
          en: "A weaver in Varanasi making a Banarasi brocade on a handloom.",
          hi: "वाराणसी में एक बुनकर हैंडलूम पर बनारसी ब्रोकेड बनाते हुए।" } },
        { t: "gallery", items: [
          { src: "assets/img/indian-textiles/banarasi.jpg", label: { en: "Banarasi (Uttar Pradesh)", hi: "बनारसी (उत्तर प्रदेश)" },
            note: { en: "Silk brocade with gold and silver zari motifs. The bridal favourite", hi: "सोने-चांदी की ज़री वाले डिज़ाइन का सिल्क ब्रोकेड। दुल्हनों की पहली पसंद" } },
          { src: "assets/img/indian-textiles/kanjeevaram.jpg", label: { en: "Kanjeevaram (Tamil Nadu)", hi: "कांजीवरम (तमिलनाडु)" },
            note: { en: "Heavy mulberry silk, wide contrast borders, temple motifs", hi: "भारी मलबरी सिल्क, चौड़े कंट्रास्ट बॉर्डर, मंदिर वाले डिज़ाइन" } },
          { src: "assets/img/indian-textiles/paithani.jpg", label: { en: "Paithani (Maharashtra)", hi: "पैठणी (महाराष्ट्र)" },
            note: { en: "Peacock and parrot motifs on a rich zari pallu", hi: "ज़री के भारी पल्लू पर मोर और तोते के डिज़ाइन" } },
          { src: "assets/img/indian-textiles/patola.jpg", label: { en: "Patola (Gujarat)", hi: "पटोला (गुजरात)" },
            note: { en: "Double ikat: both warp and weft are tie-dyed before weaving", hi: "डबल इकत: ताना और बाना दोनों बुनाई से पहले रंगे जाते हैं" } },
          { src: "assets/img/indian-textiles/pochampally.jpg", label: { en: "Pochampally (Telangana)", hi: "पोचमपल्ली (तेलंगाना)" },
            note: { en: "Sharp geometric ikat in bright colours", hi: "चटक रंगों में तीखे ज्यामितीय इकत" } },
          { src: "assets/img/indian-textiles/chanderi-weaving.jpg", label: { en: "Chanderi (Madhya Pradesh)", hi: "चंदेरी (मध्य प्रदेश)" },
            note: { en: "Light, sheer silk-cotton with tiny gold buti", hi: "हल्की, पारदर्शी सिल्क-कॉटन, छोटी ज़री बूटी के साथ" } },
          { src: "assets/img/indian-textiles/maheshwari.jpg", label: { en: "Maheshwari (Madhya Pradesh)", hi: "महेश्वरी (मध्य प्रदेश)" },
            note: { en: "Light cotton-silk with a reversible border", hi: "हल्की कॉटन-सिल्क, दोनों तरफ़ पहना जाने वाला बॉर्डर" } },
          { src: "assets/img/indian-textiles/muga.jpg", label: { en: "Muga & Eri (Assam)", hi: "मूगा और एरी (असम)" },
            note: { en: "Muga is a natural golden silk found only in Assam. Eri is a warm 'peace silk'", hi: "मूगा सिर्फ़ असम में मिलने वाला कुदरती सुनहरा सिल्क है। एरी एक गरम 'पीस सिल्क' है" } }
        ] },
        { t: "tip", kind: "tip", text: {
          en: "To spot a real handloom, look at the back. Handwoven cloth has tiny irregularities and loose thread ends behind the motifs. Machine cloth looks too perfect.",
          hi: "असली हैंडलूम पहचानने के लिए पीछे की तरफ़ देखो। हाथ की बुनाई में छोटी-छोटी कमियाँ और डिज़ाइन के पीछे धागों के सिरे होते हैं। मशीन का कपड़ा बहुत ज़्यादा परफ़ेक्ट दिखता है।" } },
        { t: "terms", items: [
          { en: "Handloom", hi: "हैंडलूम", def: { en: "A loom worked by hand and foot, without electricity.", hi: "हाथ और पैर से चलने वाला करघा, बिना बिजली के।" } },
          { en: "Zari", hi: "ज़री", def: { en: "Metallic gold or silver thread woven or embroidered into cloth.", hi: "सोने या चांदी जैसा धातु का धागा जो कपड़े में बुना या काढ़ा जाता है।" } },
          { en: "Pallu", hi: "पल्लू", def: { en: "The decorated end of a sari that falls over the shoulder.", hi: "साड़ी का सजा हुआ सिरा जो कंधे पर गिरता है।" } },
          { en: "Buti", hi: "बूटी", def: { en: "A small motif repeated all over the fabric.", hi: "छोटा डिज़ाइन जो पूरे कपड़े पर दोहराया जाता है।" } },
          { en: "Brocade", hi: "ब्रोकेड", def: { en: "Fabric with raised patterns woven in, often with zari.", hi: "बुनाई से बने उभरे डिज़ाइन वाला कपड़ा, अक्सर ज़री के साथ।" } }
        ] },
        { t: "try", text: {
          en: "Ask your mother or nani to show you her best sari. Find out its name and state, then sketch its border and pallu motifs.",
          hi: "अपनी मम्मी या नानी से उनकी सबसे अच्छी साड़ी दिखाने को कहो। उसका नाम और राज्य पता करो, फिर उसके बॉर्डर और पल्लू के डिज़ाइन स्केच करो।" } }
      ]
    },

    /* ---------------------------------------------------------------- 2 */
    {
      id: "tie-dye-resist",
      title: { en: "Tie & dye and resist", hi: "बांधनी, टाई-डाई और रेज़िस्ट" },
      min: 6,
      blocks: [
        { t: "p", text: {
          en: "How do you make white dots on red cloth without paint? You **block** the dye. This idea is called **resist dyeing**: some parts are protected, so they stay uncoloured.",
          hi: "बिना पेंट के लाल कपड़े पर सफ़ेद बिंदु कैसे बनाओगी? रंग को **रोककर**। इसे **रेज़िस्ट डाइंग (Resist dyeing)** कहते हैं: कुछ हिस्सों को बचाया जाता है, तो वो बिना रंग के रह जाते हैं।" } },
        { t: "dg", name: "indian-textiles-resist", caption: {
          en: "Tie, dye, open. Wherever the thread was tight, the dye could not reach.",
          hi: "बांधो, रंगो, खोलो। जहाँ धागा कसकर बंधा था, वहाँ रंग नहीं पहुंच पाया।" } },
        { t: "gallery", items: [
          { src: "assets/img/indian-textiles/bandhani.jpg", label: { en: "Bandhani", hi: "बांधनी" },
            note: { en: "Gujarat & Rajasthan. Thousands of tiny dots, each tied by hand", hi: "गुजरात और राजस्थान। हज़ारों छोटे बिंदु, हर एक हाथ से बंधा" } },
          { src: "assets/img/indian-textiles/ikat.jpg", label: { en: "Ikat", hi: "इकत" },
            note: { en: "The yarn is tied and dyed before weaving. Blurry, feathered edges", hi: "बुनाई से पहले धागे को बांधकर रंगा जाता है। धुंधले, पंख जैसे किनारे" } },
          { src: "assets/img/indian-textiles/shibori.jpg", label: { en: "Shibori", hi: "शिबोरी" },
            note: { en: "Japanese cousin: fold, stitch or clamp, then dye", hi: "जापानी रिश्तेदार: मोड़ो, सिलो या दबाओ, फिर रंगो" } }
        ] },
        { t: "h", text: { en: "Ikat: resist on the yarn", hi: "इकत: धागे पर रेज़िस्ट" } },
        { t: "dg", name: "indian-textiles-ikat", caption: {
          en: "In ikat the pattern is planned on the yarn. The weaver lines it up while weaving.",
          hi: "इकत में डिज़ाइन धागे पर ही तय होता है। बुनकर बुनते समय उसे मिलाता जाता है।" } },
        { t: "tip", kind: "fact", text: {
          en: "A single Bandhani dupatta can have more than **50,000** tiny knots, tied by women artisans with their fingernails.",
          hi: "एक बांधनी दुपट्टे में **50,000** से भी ज़्यादा छोटी गांठें हो सकती हैं, जिन्हें महिला कारीगर अपने नाख़ूनों से बांधती हैं।" } },
        { t: "terms", items: [
          { en: "Resist dyeing", hi: "रेज़िस्ट डाइंग", def: { en: "Blocking parts of the cloth so the dye cannot reach them.", hi: "कपड़े के कुछ हिस्सों को बचाना ताकि वहाँ रंग न पहुंचे।" } },
          { en: "Bandhani", hi: "बांधनी", def: { en: "Tie-dye with tiny dots, from the word 'bandhan' (to tie).", hi: "छोटे बिंदुओं वाली टाई-डाई, 'बंधन' (बांधना) शब्द से।" } },
          { en: "Leheriya", hi: "लहरिया", def: { en: "Tie-dye with diagonal wave stripes, from 'lehar' (wave).", hi: "तिरछी लहरदार धारियों वाली टाई-डाई, 'लहर' शब्द से।" } },
          { en: "Ikat", hi: "इकत", def: { en: "Yarn is resist-dyed before weaving; the pattern has soft, blurry edges.", hi: "बुनाई से पहले धागे को रेज़िस्ट से रंगा जाता है; डिज़ाइन के किनारे धुंधले होते हैं।" } },
          { en: "Double ikat", hi: "डबल इकत", def: { en: "Both warp and weft are tie-dyed, as in Patola. Very hard to make.", hi: "ताना और बाना दोनों रंगे जाते हैं, जैसे पटोला में। बनाना बहुत मुश्किल।" } }
        ] },
        { t: "try", text: {
          en: "Take an old white handkerchief. Tie 5 small pinches tightly with thread and dip it in tea or haldi water. Dry, untie, and stick it in your sketchbook.",
          hi: "एक पुराना सफ़ेद रूमाल लो। 5 छोटी चुटकियों को धागे से कसकर बांधो और चाय या हल्दी के पानी में डुबाओ। सुखाओ, खोलो, और स्केचबुक में चिपकाओ।" } }
      ]
    },

    /* ---------------------------------------------------------------- 3 */
    {
      id: "printing-painting",
      title: { en: "Printing & painting", hi: "छपाई और पेंटिंग" },
      min: 7,
      blocks: [
        { t: "p", text: {
          en: "Before machines, Indian printers carved designs into wooden **blocks**, dipped them in colour and stamped them by hand. Rajasthan and Gujarat are still famous for it.",
          hi: "मशीनों से पहले भारतीय छीपे (छपाई करने वाले) लकड़ी के **ब्लॉक** पर डिज़ाइन खोदते, उन्हें रंग में डुबाते और हाथ से छापते थे। राजस्थान और गुजरात आज भी इसके लिए मशहूर हैं।" } },
        { t: "steps", items: [
          { title: { en: "Carve the block", hi: "ब्लॉक खोदो" },
            text: { en: "A craftsman carves the motif into teak or sheesham wood. One block for each colour.", hi: "कारीगर सागौन या शीशम की लकड़ी पर डिज़ाइन खोदता है। हर रंग के लिए एक ब्लॉक।" },
            src: "assets/img/indian-textiles/wooden-blocks.jpg" },
          { title: { en: "Print by hand", hi: "हाथ से छापो" },
            text: { en: "The printer presses the block onto the cloth, again and again, in a perfect line.", hi: "छीपा ब्लॉक को कपड़े पर बार-बार, बिल्कुल सीधी लाइन में दबाता है।" },
            src: "assets/img/indian-textiles/block-printing.jpg" },
          { title: { en: "Dye, wash and dry in the sun", hi: "रंगो, धोओ और धूप में सुखाओ" },
            text: { en: "Many prints are dyed in vats and dried in the open to fix the colour.", hi: "बहुत से प्रिंट को टब में रंगा जाता है और रंग पक्का करने के लिए खुले में सुखाया जाता है।" },
            src: "assets/img/indian-textiles/indigo.jpg" }
        ] },
        { t: "dg", name: "indian-textiles-blocks", caption: {
          en: "Each colour needs its own block. The outline block usually goes first.",
          hi: "हर रंग का अपना ब्लॉक होता है। आमतौर पर आउटलाइन वाला ब्लॉक पहले लगता है।" } },
        { t: "dg", name: "indian-textiles-map", args: { set: "prints" }, caption: {
          en: "Famous printing and dyeing centres.",
          hi: "छपाई और रंगाई के मशहूर केंद्र।" } },
        { t: "gallery", items: [
          { src: "assets/img/indian-textiles/bagru.jpg", label: { en: "Bagru & Sanganer", hi: "बगरू और सांगानेर" },
            note: { en: "Near Jaipur. Bagru: earthy colours. Sanganer: fine motifs on white", hi: "जयपुर के पास। बगरू: मिट्टी जैसे रंग। सांगानेर: सफ़ेद पर बारीक डिज़ाइन" } },
          { src: "assets/img/indian-textiles/dabu.jpg", label: { en: "Dabu", hi: "दाबू" },
            note: { en: "Rajasthan. Mud paste is printed as a resist, then dyed indigo", hi: "राजस्थान। मिट्टी का लेप रेज़िस्ट की तरह छापा जाता है, फिर नील में रंगा जाता है" } },
          { src: "assets/img/indian-textiles/kalamkari.jpg", label: { en: "Kalamkari", hi: "कलमकारी" },
            note: { en: "Andhra Pradesh. Hand-painted with a 'kalam' (pen): stories from myths", hi: "आंध्र प्रदेश। 'कलम' से हाथ से पेंट: पौराणिक कहानियाँ" } }
        ] },
        { t: "compare", items: [
          { title: { en: "Block printing", hi: "ब्लॉक प्रिंटिंग" }, src: "assets/img/indian-textiles/block-print-cloth.jpg", points: [
            { en: "Wooden block, stamped by hand", hi: "लकड़ी का ब्लॉक, हाथ से छापा" },
            { en: "Slow; small 'mistakes' show it is handmade", hi: "धीमा; छोटी 'गलतियाँ' बताती हैं कि ये हाथ का है" },
            { en: "Best for small runs and craft value", hi: "कम मात्रा और हस्तकला के लिए सबसे अच्छा" }
          ] },
          { title: { en: "Screen printing", hi: "स्क्रीन प्रिंटिंग" }, points: [
            { en: "Ink pushed through a mesh screen", hi: "जाली वाली स्क्रीन से स्याही दबाई जाती है" },
            { en: "Fast; every repeat looks the same", hi: "तेज़; हर दोहराव एक जैसा दिखता है" },
            { en: "Best for big production, T-shirt prints", hi: "बड़े प्रोडक्शन और टी-शर्ट प्रिंट के लिए सबसे अच्छा" }
          ] }
        ] },
        { t: "h", text: { en: "Natural dyes", hi: "प्राकृतिक रंग" } },
        { t: "swatches", caption: {
          en: "Colours that come from plants, roots and minerals.",
          hi: "पौधों, जड़ों और खनिजों से मिलने वाले रंग।" }, items: [
          { c: "#1f3a6b", label: { en: "Indigo (neel)", hi: "नील" } },
          { c: "#a33a2c", label: { en: "Madder (manjistha)", hi: "मंजीठ" } },
          { c: "#e0a526", label: { en: "Turmeric (haldi)", hi: "हल्दी" } },
          { c: "#7a5a3a", label: { en: "Pomegranate rind", hi: "अनार का छिलका" } },
          { c: "#2b2523", label: { en: "Iron rust black", hi: "लोहे की जंग से काला" } }
        ] },
        { t: "tip", kind: "fact", text: {
          en: "Indigo was so precious that it was called 'blue gold'. In 1917, Gandhiji's first big protest in Champaran was for indigo farmers.",
          hi: "नील इतना कीमती था कि उसे 'नीला सोना' कहा जाता था। 1917 में गांधीजी का पहला बड़ा आंदोलन चंपारण में नील किसानों के लिए था।" } },
        { t: "terms", items: [
          { en: "Block printing", hi: "ब्लॉक प्रिंटिंग", def: { en: "Printing cloth by hand with carved wooden blocks.", hi: "खोदे हुए लकड़ी के ब्लॉक से हाथ से कपड़ा छापना।" } },
          { en: "Kalamkari", hi: "कलमकारी", def: { en: "Hand-painting on cloth with a bamboo pen and natural dyes.", hi: "बांस की कलम और प्राकृतिक रंगों से कपड़े पर हाथ से पेंटिंग।" } },
          { en: "Mordant", hi: "मॉर्डेंट", def: { en: "A substance (like alum) that helps natural dye stick to cloth.", hi: "ऐसा पदार्थ (जैसे फिटकरी) जो प्राकृतिक रंग को कपड़े पर पक्का करता है।" } },
          { en: "Screen printing", hi: "स्क्रीन प्रिंटिंग", def: { en: "Pushing ink through a stencil on a mesh screen.", hi: "जाली वाली स्क्रीन पर बने स्टेंसिल से स्याही दबाकर छापना।" } }
        ] },
        { t: "try", text: {
          en: "Cut a potato in half and carve a simple flower into it. Dip it in fabric paint and print a border on an old dupatta or on paper.",
          hi: "एक आलू आधा काटो और उस पर एक आसान फूल खोदो। फ़ैब्रिक पेंट में डुबाकर किसी पुराने दुपट्टे या कागज़ पर बॉर्डर छापो।" } }
      ]
    },

    /* ---------------------------------------------------------------- 4 */
    {
      id: "embroideries",
      title: { en: "Embroideries of India", hi: "भारत की कढ़ाइयाँ" },
      min: 7,
      blocks: [
        { t: "p", text: {
          en: "**Embroidery** means decorating cloth with needle and thread. Every region of India has its own style, with its own stitches, colours and motifs.",
          hi: "**एम्ब्रॉयडरी (Embroidery)** यानी सुई-धागे से कपड़े को सजाना। भारत के हर इलाके की अपनी कढ़ाई है, अपने टांकों, रंगों और डिज़ाइनों के साथ।" } },
        { t: "dg", name: "indian-textiles-map", args: { set: "embroidery" }, caption: {
          en: "Where the famous embroideries come from.",
          hi: "मशहूर कढ़ाइयाँ कहाँ से आती हैं।" } },
        { t: "gallery", items: [
          { src: "assets/img/indian-textiles/chikankari.jpg", label: { en: "Chikankari (Lucknow)", hi: "चिकनकारी (लखनऊ)" },
            note: { en: "Delicate white-on-white shadow work on muslin", hi: "मलमल पर नाज़ुक, सफ़ेद पर सफ़ेद शैडो वर्क" } },
          { src: "assets/img/indian-textiles/phulkari.jpg", label: { en: "Phulkari (Punjab)", hi: "फुलकारी (पंजाब)" },
            note: { en: "'Flower work': bright silk darning stitch covering the cloth", hi: "'फूलों का काम': चमकीले रेशमी टांके जो पूरा कपड़ा ढक देते हैं" } },
          { src: "assets/img/indian-textiles/kantha.jpg", label: { en: "Kantha (Bengal)", hi: "कांथा (बंगाल)" },
            note: { en: "Simple running stitch, first used to layer old saris into quilts", hi: "सीधा रनिंग टांका, पहले पुरानी साड़ियों की परतें जोड़कर रज़ाई बनाने के लिए" } },
          { src: "assets/img/indian-textiles/zardozi.jpg", label: { en: "Zardozi", hi: "ज़रदोज़ी" },
            note: { en: "Royal metal-thread work with beads and sequins. Bridal wear", hi: "मोतियों और सितारों के साथ शाही ज़री का काम। दुल्हन के कपड़े" } },
          { src: "assets/img/indian-textiles/kashida.jpg", label: { en: "Kashida (Kashmir)", hi: "कशीदा (कश्मीर)" },
            note: { en: "Chain-stitch flowers, chinar leaves and birds on shawls", hi: "शॉल पर चेन टांके से फूल, चिनार के पत्ते और पक्षी" } },
          { src: "assets/img/indian-textiles/kutch-mirror.jpg", label: { en: "Kutch mirror work", hi: "कच्छ का शीशा वर्क" },
            note: { en: "Gujarat. Small mirrors (abhla) held in place with bright stitches", hi: "गुजरात। चमकीले टांकों से जड़े छोटे शीशे (आभला)" } },
          { src: "assets/img/indian-textiles/aari.jpg", label: { en: "Aari work", hi: "आरी वर्क" },
            note: { en: "A hooked needle makes fast, fine chain stitch on a frame", hi: "हुक वाली सुई फ्रेम पर तेज़, बारीक चेन टांका बनाती है" } }
        ] },
        { t: "cards", items: [
          { icon: "needle", title: { en: "Running stitch", hi: "रनिंग टांका" }, text: { en: "Up-down dashes. The base of Kantha.", hi: "ऊपर-नीचे छोटी लाइनें। कांथा का आधार।" } },
          { icon: "thread", title: { en: "Chain stitch", hi: "चेन टांका" }, text: { en: "Loops linked like a chain. Kashida and Aari.", hi: "ज़ंजीर की तरह जुड़े फंदे। कशीदा और आरी।" } },
          { icon: "gem", title: { en: "Couching", hi: "काउचिंग" }, text: { en: "Thick zari laid on top and tacked down. Zardozi.", hi: "मोटी ज़री ऊपर रखकर छोटे टांकों से टिकाना। ज़रदोज़ी।" } },
          { icon: "sparkle", title: { en: "Shadow work", hi: "शैडो वर्क" }, text: { en: "Stitched on the back, glows through sheer cloth. Chikankari.", hi: "पीछे से टांका, पारदर्शी कपड़े में से झलकता है। चिकनकारी।" } }
        ] },
        { t: "tip", kind: "mistake", text: {
          en: "Don't call every white embroidery 'chikan'. Real Chikankari has many special stitches, like **bakhiya** (shadow) and **phanda** (tiny knots).",
          hi: "हर सफ़ेद कढ़ाई को 'चिकन' मत कहो। असली चिकनकारी में कई ख़ास टांके होते हैं, जैसे **बखिया** (शैडो) और **फंदा** (छोटी गांठें)।" } },
        { t: "terms", items: [
          { en: "Embroidery", hi: "एम्ब्रॉयडरी (कढ़ाई)", def: { en: "Decorating fabric with needle and thread.", hi: "सुई-धागे से कपड़े को सजाना।" } },
          { en: "Zardozi", hi: "ज़रदोज़ी", def: { en: "Heavy embroidery with metallic threads, beads and sequins.", hi: "धातु के धागों, मोतियों और सितारों वाली भारी कढ़ाई।" } },
          { en: "Abhla", hi: "आभला", def: { en: "Small mirrors stitched onto cloth in Gujarati and Rajasthani work.", hi: "गुजराती और राजस्थानी काम में कपड़े पर टांके गए छोटे शीशे।" } },
          { en: "Adda", hi: "अड्डा", def: { en: "The wooden frame used to stretch cloth for zardozi and aari work.", hi: "लकड़ी का फ्रेम जिस पर ज़रदोज़ी और आरी वर्क के लिए कपड़ा ताना जाता है।" } }
        ] },
        { t: "try", text: {
          en: "Pick one embroidery from this lesson. On a scrap of cloth, practise its main stitch 10 times. Paste it next to a photo of the real thing.",
          hi: "इस लेसन से एक कढ़ाई चुनो। कपड़े के एक टुकड़े पर उसका मुख्य टांका 10 बार प्रैक्टिस करो। उसे असली काम की फ़ोटो के पास चिपकाओ।" } }
      ]
    },

    /* ---------------------------------------------------------------- 5 */
    {
      id: "khadi-handloom",
      title: { en: "Khadi, handloom & GI tags", hi: "खादी, हैंडलूम और GI टैग" },
      min: 6,
      blocks: [
        { t: "p", text: {
          en: "India has millions of handloom weavers, more than any other country. When you choose handloom, you keep a family's skill and income alive.",
          hi: "भारत में लाखों हैंडलूम बुनकर हैं, किसी भी दूसरे देश से ज़्यादा। जब तुम हैंडलूम चुनती हो, तो किसी परिवार का हुनर और रोज़ी-रोटी ज़िंदा रखती हो।" } },
        { t: "img", src: "assets/img/indian-textiles/charkha.jpg", caption: {
          en: "The charkha (spinning wheel): Gandhiji's symbol of self-reliance.",
          hi: "चरखा: गांधीजी का आत्मनिर्भरता का निशान।" } },
        { t: "timeline", items: [
          { when: "1700s", title: { en: "Indian cloth rules the world", hi: "भारतीय कपड़े का दुनिया पर राज" },
            text: { en: "Bengal muslin and Indian chintz are sold across Europe and Asia.", hi: "बंगाल की मलमल और भारतीय छींट यूरोप और एशिया में बिकती है।" } },
          { when: "1800s", title: { en: "Machine cloth arrives", hi: "मशीन का कपड़ा आता है" },
            text: { en: "Cheap British mill cloth floods India and many weavers lose their work.", hi: "सस्ता अंग्रेज़ी मिल का कपड़ा भारत में भर जाता है और बहुत से बुनकरों का काम छिन जाता है।" } },
          { when: "1920s", title: { en: "The Khadi movement", hi: "खादी आंदोलन" },
            text: { en: "Gandhiji asks Indians to spin and wear khadi, and to burn foreign cloth.", hi: "गांधीजी भारतीयों से खादी कातने और पहनने, और विदेशी कपड़े जलाने को कहते हैं।" },
            src: "assets/img/indian-textiles/gandhi-charkha.jpg" },
          { when: "2015", title: { en: "National Handloom Day", hi: "राष्ट्रीय हैंडलूम दिवस" },
            text: { en: "7 August is declared National Handloom Day.", hi: "7 अगस्त को राष्ट्रीय हैंडलूम दिवस घोषित किया गया।" } }
        ] },
        { t: "img", src: "assets/img/indian-textiles/maheshwar-weaver.jpg", caption: {
          en: "A weaver in Maheshwar, Madhya Pradesh. The shuttle carries the weft through the warp by hand.",
          hi: "महेश्वर, मध्य प्रदेश में एक बुनकर। शटल हाथ से बाने को ताने के बीच से ले जाती है।" } },
        { t: "cards", items: [
          { icon: "award", title: { en: "GI tag", hi: "GI टैग" }, text: {
            en: "A **Geographical Indication** says a product is genuinely from one place. Banarasi, Kanjeevaram, Pochampally and Chanderi all have one.",
            hi: "**जियोग्राफ़िकल इंडिकेशन (GI)** बताता है कि कोई चीज़ असल में एक ख़ास जगह की है। बनारसी, कांजीवरम, पोचमपल्ली और चंदेरी सबके पास ये है।" } },
          { icon: "check", title: { en: "Handloom Mark", hi: "हैंडलूम मार्क" }, text: {
            en: "A government label that tells buyers the cloth is truly handwoven.",
            hi: "सरकारी लेबल जो ख़रीदार को बताता है कि कपड़ा सच में हाथ से बुना है।" } },
          { icon: "recycle", title: { en: "Slow fashion", hi: "स्लो फ़ैशन" }, text: {
            en: "Handloom uses little electricity, lasts for years and is often made with natural fibres and dyes.",
            hi: "हैंडलूम में बहुत कम बिजली लगती है, ये सालों चलता है और अक्सर प्राकृतिक फ़ाइबर और रंगों से बनता है।" } },
          { icon: "user", title: { en: "Designer + artisan", hi: "डिज़ाइनर + कारीगर" }, text: {
            en: "Designers like Sabyasachi, Anavila and Raw Mango work directly with weavers to make handloom modern.",
            hi: "Sabyasachi, Anavila और Raw Mango जैसे डिज़ाइनर सीधे बुनकरों के साथ काम करके हैंडलूम को मॉडर्न बनाते हैं।" } }
        ] },
        { t: "quote", text: {
          en: "Khadi is not just a cloth, it is a thought.",
          hi: "खादी सिर्फ़ एक कपड़ा नहीं, एक सोच है।" }, by: "Mahatma Gandhi" },
        { t: "tip", kind: "tip", text: {
          en: "When you design with a craft, credit the artisans, pay them fairly, and don't copy their motifs on cheap machine prints.",
          hi: "जब तुम किसी शिल्प के साथ डिज़ाइन करो, तो कारीगरों को क्रेडिट दो, सही दाम दो, और उनके डिज़ाइन को सस्ते मशीन प्रिंट पर कॉपी मत करो।" } },
        { t: "terms", items: [
          { en: "GI tag", hi: "GI टैग", def: { en: "A legal label that links a product to the place it comes from.", hi: "कानूनी लेबल जो किसी चीज़ को उसकी असली जगह से जोड़ता है।" } },
          { en: "Artisan", hi: "आर्टिज़न (कारीगर)", def: { en: "A skilled crafts person who makes things by hand.", hi: "हुनरमंद व्यक्ति जो हाथ से चीज़ें बनाता है।" } },
          { en: "Slow fashion", hi: "स्लो फ़ैशन", def: { en: "Buying fewer, better-made clothes that last, made fairly.", hi: "कम पर अच्छे से बने कपड़े ख़रीदना जो लंबे चलें और ईमानदारी से बने हों।" } },
          { en: "Charkha", hi: "चरखा", def: { en: "A hand-turned spinning wheel for making yarn.", hi: "हाथ से घुमाया जाने वाला पहिया जिससे धागा काता जाता है।" } }
        ] },
        { t: "try", text: {
          en: "Design a modern outfit (a crop top, jacket or co-ord set) using one Indian craft from this module. Sketch it and note which artisans you would work with.",
          hi: "इस मॉड्यूल के किसी एक भारतीय शिल्प से एक मॉडर्न आउटफ़िट (क्रॉप टॉप, जैकेट या को-ऑर्ड सेट) डिज़ाइन करो। स्केच बनाओ और लिखो कि तुम किन कारीगरों के साथ काम करोगी।" } }
      ]
    }
  ],

  quiz: [
    { q: { en: "Which sari comes from Varanasi and is famous for gold zari brocade?", hi: "कौन सी साड़ी वाराणसी से आती है और सुनहरी ज़री ब्रोकेड के लिए मशहूर है?" },
      options: [{ en: "Kanjeevaram", hi: "कांजीवरम" }, { en: "Banarasi", hi: "बनारसी" }, { en: "Chanderi", hi: "चंदेरी" }],
      answer: 1, src: "assets/img/indian-textiles/banarasi.jpg",
      why: { en: "Banaras is the old name of Varanasi, the home of Banarasi brocade.", hi: "बनारस, वाराणसी का पुराना नाम है, और यही बनारसी ब्रोकेड का घर है।" } },
    { q: { en: "Patola from Gujarat is famous as a…", hi: "गुजरात का पटोला मशहूर है…" },
      options: [{ en: "Block print", hi: "ब्लॉक प्रिंट के रूप में" }, { en: "Double ikat", hi: "डबल इकत के रूप में" }, { en: "Embroidery", hi: "कढ़ाई के रूप में" }],
      answer: 1, src: "assets/img/indian-textiles/patola.jpg",
      why: { en: "In Patola, both warp and weft yarns are tie-dyed before weaving.", hi: "पटोला में ताना और बाना दोनों बुनाई से पहले बांधकर रंगे जाते हैं।" } },
    { q: { en: "Which silk is naturally golden and found only in Assam?", hi: "कौन सा सिल्क कुदरती रूप से सुनहरा है और सिर्फ़ असम में मिलता है?" },
      options: [{ en: "Muga", hi: "मूगा" }, { en: "Mulberry", hi: "मलबरी" }, { en: "Tussar", hi: "टसर" }],
      answer: 0,
      why: { en: "Muga silk has a natural golden shine and has a GI tag for Assam.", hi: "मूगा सिल्क में कुदरती सुनहरी चमक होती है और असम के लिए इसका GI टैग है।" } },
    { q: { en: "What is the main idea behind Bandhani and Leheriya?", hi: "बांधनी और लहरिया के पीछे मुख्य आइडिया क्या है?" },
      options: [
        { en: "Painting with a pen", hi: "कलम से पेंटिंग" },
        { en: "Tying the cloth so dye can't reach some parts", hi: "कपड़ा बांधना ताकि कुछ हिस्सों तक रंग न पहुंचे" },
        { en: "Stitching mirrors", hi: "शीशे टांकना" }
      ], answer: 1, dg: "indian-textiles-resist",
      why: { en: "Both are resist dyeing: tied parts stay undyed and form the pattern.", hi: "दोनों रेज़िस्ट डाइंग हैं: बंधे हिस्से बिना रंग के रहकर डिज़ाइन बनाते हैं।" } },
    { q: { en: "In ikat, what is tied and dyed?", hi: "इकत में क्या बांधकर रंगा जाता है?" },
      options: [{ en: "The finished cloth", hi: "तैयार कपड़ा" }, { en: "The yarn, before weaving", hi: "धागा, बुनाई से पहले" }, { en: "The wooden block", hi: "लकड़ी का ब्लॉक" }],
      answer: 1, dg: "indian-textiles-ikat",
      why: { en: "Ikat yarn is resist-dyed first, which gives its soft, blurry edges.", hi: "इकत में धागा पहले रंगा जाता है, इसी से किनारे धुंधले बनते हैं।" } },
    { q: { en: "Kalamkari is made by…", hi: "कलमकारी बनती है…" },
      options: [{ en: "Painting with a bamboo pen", hi: "बांस की कलम से पेंटिंग करके" }, { en: "Knotting tiny dots", hi: "छोटी गांठें बांधकर" }, { en: "Weaving zari", hi: "ज़री बुनकर" }],
      answer: 0, src: "assets/img/indian-textiles/kalamkari.jpg",
      why: { en: "'Kalam' means pen. Artists draw and fill the design by hand with natural dyes.", hi: "'कलम' यानी पेन। कलाकार प्राकृतिक रंगों से हाथ से डिज़ाइन बनाते और भरते हैं।" } },
    { q: { en: "Which natural dye gives blue?", hi: "कौन सा प्राकृतिक रंग नीला देता है?" },
      options: [{ en: "Madder", hi: "मंजीठ" }, { en: "Turmeric", hi: "हल्दी" }, { en: "Indigo", hi: "नील" }],
      answer: 2,
      why: { en: "Indigo (neel) comes from the leaves of the indigo plant.", hi: "नील, नील के पौधे की पत्तियों से आता है।" } },
    { q: { en: "Delicate white shadow work from Lucknow is called…", hi: "लखनऊ का नाज़ुक सफ़ेद शैडो वर्क कहलाता है…" },
      options: [{ en: "Phulkari", hi: "फुलकारी" }, { en: "Chikankari", hi: "चिकनकारी" }, { en: "Kantha", hi: "कांथा" }],
      answer: 1, src: "assets/img/indian-textiles/chikankari.jpg",
      why: { en: "Chikankari is Lucknow's famous white-on-white embroidery.", hi: "चिकनकारी लखनऊ की मशहूर सफ़ेद पर सफ़ेद कढ़ाई है।" } },
    { q: { en: "Which embroidery from Punjab means 'flower work'?", hi: "पंजाब की कौन सी कढ़ाई का मतलब 'फूलों का काम' है?" },
      options: [{ en: "Phulkari", hi: "फुलकारी" }, { en: "Zardozi", hi: "ज़रदोज़ी" }, { en: "Sozni", hi: "सोज़नी" }],
      answer: 0, src: "assets/img/indian-textiles/phulkari.jpg",
      why: { en: "'Phul' = flower, 'kari' = work. Bright silk threads cover the whole cloth.", hi: "'फुल' = फूल, 'कारी' = काम। चमकीले रेशमी धागे पूरा कपड़ा ढक देते हैं।" } },
    { q: { en: "What does a GI tag tell you?", hi: "GI टैग क्या बताता है?" },
      options: [
        { en: "The product is genuinely from a certain place", hi: "चीज़ सच में एक ख़ास जगह की है" },
        { en: "The product is machine-made", hi: "चीज़ मशीन से बनी है" },
        { en: "The product is on sale", hi: "चीज़ सेल पर है" }
      ], answer: 0,
      why: { en: "A Geographical Indication protects crafts like Banarasi and Kanjeevaram from fakes.", hi: "जियोग्राफ़िकल इंडिकेशन बनारसी और कांजीवरम जैसे शिल्प को नकली चीज़ों से बचाता है।" } }
  ]
});
