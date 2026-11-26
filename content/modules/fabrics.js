/* Module 6 - Fabrics & Fibres */

/* Fibre -> yarn -> fabric -> garment, as a simple flow. */
FD.diagram("fabrics-journey", function (a, lang) {
  var s = "";
  var xs = [40, 120, 200, 280];
  var names = [
    { en: "Fibre", hi: "फ़ाइबर" }, { en: "Yarn", hi: "धागा (यार्न)" },
    { en: "Fabric", hi: "फ़ैब्रिक" }, { en: "Garment", hi: "कपड़ा (गारमेंट)" }
  ];
  /* fibre: a fluffy tuft */
  s += '<path class="sf" d="M22 60 q-6 -12 6 -18 q2 -12 16 -10 q10 -8 20 2 q12 0 10 14 q8 10 -4 18 q-4 10 -18 6 q-12 6 -20 -2 q-14 0 -10 -10z"/>';
  s += '<path class="ln" d="M30 52 q8 -4 16 2 M38 64 q8 -6 18 0 M44 44 q6 2 10 8"/>';
  /* yarn: a twisted strand on a cone */
  s += '<path class="fl" d="M108 80 L132 80 L126 34 L114 34 Z"/>';
  for (var i = 0; i < 7; i++) s += '<path class="ac" d="M' + (112 + i * 0.3) + " " + (40 + i * 6) + " q8 -3 " + (16 - i * 0.6) + ' 0"/>';
  s += '<path class="ac" d="M132 50 q14 -4 10 -18 q-3 -8 8 -10"/>';
  /* fabric: a woven square */
  for (var r = 0; r < 5; r++) for (var c = 0; c < 5; c++) {
    var up = (r + c) % 2 === 0;
    s += '<rect x="' + (180 + c * 8) + '" y="' + (36 + r * 8) + '" width="7" height="7" rx="1.5" class="' + (up ? "acf" : "sf") + '"/>';
  }
  s += '<rect x="178" y="34" width="44" height="44" rx="3" class="ln"/>';
  /* garment: a simple kurta */
  s += FD.mirror(280, '<path class="fl" d="M280 30 L270 30 L256 38 L250 56 L258 58 L264 46 L264 84 L280 84 Z"/>');
  s += '<path class="ln" d="M274 30 L280 40 L286 30"/>';
  /* arrows */
  [80, 160, 240].forEach(function (x) {
    s += '<path class="ac" d="M' + (x - 10) + " 57 L" + (x + 8) + " 57 M" + (x + 3) + " 52 L" + (x + 8) + " 57 L" + (x + 3) + ' 62"/>';
  });
  xs.forEach(function (x, k) { s += FD.text(x, 106, FD.tx(names[k], lang), { cls: "tx", size: 11 }); });
  return FD.svg(320, 120, s);
});

/* Family tree of fibres. */
FD.diagram("fabrics-fibre-tree", function (a, lang) {
  function L(en, hi) { return FD.tx({ en: en, hi: hi }, lang); }
  var s = "";
  function box(x, y, w, label, cls) {
    return '<rect x="' + (x - w / 2) + '" y="' + (y - 11) + '" width="' + w + '" height="22" rx="11" class="' + (cls || "fl") + '"/>' +
      FD.text(x, y + 4, label, { cls: "tx", size: 10 });
  }
  function line(x1, y1, x2, y2) { return '<path class="gd" d="M' + x1 + " " + y1 + " L" + x2 + " " + y2 + '"/>'; }
  s += line(160, 26, 85, 62) + line(160, 26, 235, 62);
  s += line(85, 62, 45, 104) + line(85, 62, 125, 104) + line(235, 62, 195, 104) + line(235, 62, 275, 104);
  [45, 125, 195, 275].forEach(function (x) { s += line(x, 104, x, 128); });
  s += box(160, 22, 90, L("Fibres", "फ़ाइबर"), "acf");
  s += box(85, 62, 96, L("Natural", "प्राकृतिक"), "sf");
  s += box(235, 62, 96, L("Man-made", "मैन-मेड"), "sf");
  s += box(45, 104, 74, L("Plant", "पौधे से"));
  s += box(125, 104, 74, L("Animal", "जानवर से"));
  s += box(195, 104, 74, L("Regenerated", "रीजनरेटेड"));
  s += box(275, 104, 74, L("Synthetic", "सिंथेटिक"));
  var leaves = [
    [L("Cotton", "कॉटन"), L("Linen", "लिनन"), L("Jute", "जूट")],
    [L("Silk", "सिल्क"), L("Wool", "ऊन"), L("Pashmina", "पश्मीना")],
    [L("Viscose", "विस्कोस"), L("Modal", "मोडल"), L("Bamboo", "बैंबू")],
    [L("Polyester", "पॉलिएस्टर"), L("Nylon", "नायलॉन"), L("Spandex", "स्पैन्डेक्स")]
  ];
  [45, 125, 195, 275].forEach(function (x, k) {
    leaves[k].forEach(function (w, j) { s += FD.text(x, 144 + j * 16, w, { cls: "tm", size: 10 }); });
  });
  s += FD.text(85, 206, L("from nature", "कुदरत से"), { cls: "tm", size: 9 });
  s += FD.text(235, 206, L("made in a factory", "फ़ैक्ट्री में बने"), { cls: "tm", size: 9 });
  return FD.svg(320, 214, s);
});

/* Weave structures. args.type: plain | twill | satin. Tall cells = warp on top, wide cells = weft on top. */
FD.diagram("fabrics-weave", function (a) {
  var type = a.type || "plain", n = 8, cell = 15, o = 10, s = "";
  for (var r = 0; r < n; r++) for (var c = 0; c < n; c++) {
    var up;
    if (type === "twill") up = (c - r + 32) % 3 !== 2;          /* 2/1 twill: diagonal lines */
    else if (type === "satin") up = (c * 2 + r) % 5 !== 0;      /* 5-end satin: long warp floats */
    else up = (r + c) % 2 === 0;                               /* plain: over 1, under 1 */
    var x = o + c * cell, y = o + r * cell;
    if (up) s += '<rect x="' + (x + 3) + '" y="' + (y + 0.5) + '" width="' + (cell - 6) + '" height="' + (cell - 1) + '" rx="3" class="acf"/>';
    else s += '<rect x="' + (x + 0.5) + '" y="' + (y + 3) + '" width="' + (cell - 1) + '" height="' + (cell - 6) + '" rx="3" class="sf"/>';
  }
  s += '<rect x="' + (o - 2) + '" y="' + (o - 2) + '" width="' + (n * cell + 4) + '" height="' + (n * cell + 4) + '" rx="4" class="ln"/>';
  return FD.svg(140, 140, s);
});

/* Knit stitches: the "V" columns you see on the face of a T-shirt. */
FD.diagram("fabrics-knit", function (a) {
  var s = "";
  for (var r = 0; r < 8; r++) for (var c = 0; c < 6; c++) {
    var x = 24 + c * 18.5, y = 18 + r * 14.5;
    s += '<ellipse cx="' + (x - 3.6) + '" cy="' + y + '" rx="3.6" ry="8.5" transform="rotate(-30 ' + (x - 3.6) + " " + y + ')" class="acf"/>';
    s += '<ellipse cx="' + (x + 3.6) + '" cy="' + y + '" rx="3.6" ry="8.5" transform="rotate(30 ' + (x + 3.6) + " " + y + ')" class="sf"/>';
  }
  s += '<rect x="6" y="6" width="128" height="128" rx="4" class="ln"/>';
  return FD.svg(140, 140, s);
});

/* Grain lines on a piece of woven fabric. */
FD.diagram("fabrics-grain", function (a, lang) {
  function L(en, hi) { return FD.tx({ en: en, hi: hi }, lang); }
  var s = "";
  s += '<rect x="70" y="20" width="180" height="170" rx="2" class="fl"/>';
  s += '<rect x="70" y="20" width="10" height="170" class="sf"/><rect x="240" y="20" width="10" height="170" class="sf"/>';
  for (var y = 26; y < 190; y += 8) s += '<path class="gd" d="M72 ' + y + ' l6 0 M242 ' + y + ' l6 0"/>';
  s += '<path class="ac" d="M98 48 L98 178 M92 56 L98 48 L104 56 M92 170 L98 178 L104 170"/>';
  s += '<path class="ac" d="M88 146 L232 146 M96 140 L88 146 L96 152 M224 140 L232 146 L224 152"/>';
  s += '<path class="ac" d="M122 128 L212 44 M202 44 L212 44 L212 54" stroke-dasharray="5 4"/>';
  s += FD.text(160, 36, L("Lengthwise grain (warp)", "लंबाई वाला ग्रेन (ताना)"), { cls: "tx", size: 10 });
  s += FD.text(165, 166, L("Crosswise grain (weft)", "चौड़ाई वाला ग्रेन (बाना)"), { cls: "tx", size: 10 });
  s += FD.text(160, 76, L("Bias 45°", "बायस 45°"), { cls: "tx", size: 10, anchor: "end" });
  s += FD.text(36, 100, L("Selvedge", "सेल्वेज"), { cls: "tm", size: 10 });
  s += '<path class="gd" d="M54 104 L72 110"/>';
  s += FD.text(284, 100, L("Selvedge", "सेल्वेज"), { cls: "tm", size: 10 });
  s += '<path class="gd" d="M266 104 L248 110"/>';
  return FD.svg(320, 200, s);
});

/* How a fabric falls. args.type: fluid | stiff */
FD.diagram("fabrics-drape", function (a) {
  var s = "";
  s += '<path class="ln" d="M70 150 L70 40 M56 150 L84 150"/>';
  s += '<ellipse cx="70" cy="40" rx="22" ry="6" class="fl"/>';
  if (a.type === "stiff") {
    s += '<path class="sf" d="M48 40 Q70 32 92 40 L128 120 Q112 112 100 124 Q86 112 70 126 Q54 112 40 124 Q28 112 12 120 Z"/>';
    s += '<path class="ln" d="M48 40 Q70 32 92 40 L128 120 Q112 112 100 124 Q86 112 70 126 Q54 112 40 124 Q28 112 12 120 Z"/>';
    s += '<path class="gd" d="M58 44 L40 122 M82 44 L100 122"/>';
  } else {
    s += '<path class="sf" d="M48 40 Q70 32 92 40 Q94 90 98 140 Q92 134 86 142 Q80 134 74 142 Q68 134 62 142 Q56 134 50 142 Q46 134 42 140 Q46 90 48 40 Z"/>';
    s += '<path class="ln" d="M48 40 Q70 32 92 40 Q94 90 98 140 Q92 134 86 142 Q80 134 74 142 Q68 134 62 142 Q56 134 50 142 Q46 134 42 140 Q46 90 48 40 Z"/>';
    s += '<path class="gd" d="M58 46 Q60 96 56 138 M70 46 Q72 96 68 138 M82 46 Q84 96 80 138"/>';
  }
  return FD.svg(140, 160, s);
});

/* Fabric weight (GSM) scale, light to heavy. */
FD.diagram("fabrics-gsm", function (a, lang) {
  function L(en, hi) { return FD.tx({ en: en, hi: hi }, lang); }
  var s = "";
  var x0 = 20, x1 = 300;
  for (var i = 0; i < 28; i++) {
    s += '<rect x="' + (x0 + i * 10) + '" y="70" width="10" height="' + (6 + i * 0.7) + '" class="' + (i < 9 ? "sf" : i < 19 ? "acf" : "acf") + '" opacity="' + (0.3 + i * 0.025) + '"/>';
  }
  s += '<path class="ln" d="M' + x0 + " 70 L" + x1 + ' 70"/>';
  var marks = [
    [L("Chiffon", "शिफॉन"), "~40", 30], [L("Poplin shirt", "पॉपलिन शर्ट"), "~110", 95],
    [L("T-shirt", "टी-शर्ट"), "~180", 160], [L("Denim", "डेनिम"), "~350", 230], [L("Wool coat", "ऊनी कोट"), "~450", 290]
  ];
  marks.forEach(function (m, k) {
    var x = m[2], up = k % 2 === 0;
    s += '<path class="gd" d="M' + x + " 70 L" + x + " " + (up ? 50 : 110) + '"/>';
    s += '<circle cx="' + x + '" cy="70" r="3" class="acf"/>';
    s += FD.text(x, up ? 32 : 124, m[0], { cls: "tx", size: 10 });
    s += FD.text(x, up ? 45 : 137, m[1] + " GSM", { cls: "tm", size: 9 });
  });
  s += FD.text(20, 158, L("light, floaty", "हल्का, उड़ने वाला"), { cls: "tm", size: 9, anchor: "start" });
  s += FD.text(300, 158, L("heavy, warm", "भारी, गरम"), { cls: "tm", size: 9, anchor: "end" });
  return FD.svg(320, 166, s);
});

/* Laundry care symbols. args.s: wash | hand | nobleach | tumble | iron | dryclean */
FD.diagram("fabrics-care", function (a) {
  var s = "", t = a.s || "wash";
  var tub = '<path class="ln" d="M28 38 L36 82 L84 82 L92 38"/><path class="ln" d="M24 38 q6 -6 12 0 q6 6 12 0 q6 -6 12 0 q6 6 12 0 q6 -6 12 0 q6 6 12 0"/>';
  if (t === "wash") {
    s += tub + FD.text(60, 70, "30", { cls: "tx", size: 20 });
  } else if (t === "hand") {
    s += tub + '<path class="ac" d="M50 74 L50 58 q0 -4 4 -4 q4 0 4 4 L58 50 q0 -4 4 -4 q4 0 4 4 L66 56 q0 -3 3 -3 q3 0 3 3 L72 68 q0 8 -8 8 L56 76 z"/>';
  } else if (t === "nobleach") {
    s += '<path class="ln" d="M60 20 L96 82 L24 82 Z"/><path class="ac" d="M30 26 L90 86 M90 26 L30 86"/>';
  } else if (t === "tumble") {
    s += '<rect x="28" y="22" width="64" height="64" rx="3" class="ln"/><circle cx="60" cy="54" r="24" class="ln"/><circle cx="60" cy="54" r="3.5" class="acf"/>';
  } else if (t === "iron") {
    s += '<path class="ln" d="M24 78 L96 78 L96 60 Q96 36 70 36 L44 36 Q44 44 50 44 L66 44 Q72 44 72 50 L40 50 Q26 56 24 78 Z"/>';
    s += '<circle cx="60" cy="66" r="3.5" class="acf"/>';
  } else if (t === "dryclean") {
    s += '<circle cx="60" cy="54" r="32" class="ln"/>' + FD.text(60, 63, "P", { cls: "tx", size: 26 });
  }
  return FD.svg(120, 100, s);
});

FD.module({
  id: "fabrics",
  num: 6,
  level: "basic",
  title: { en: "Fabrics & Fibres", hi: "फ़ैब्रिक और फ़ाइबर" },
  tagline: {
    en: "Know your cloth: where it comes from and how it behaves",
    hi: "अपने कपड़े को पहचानो: ये कहाँ से आता है और कैसे बर्ताव करता है"
  },
  cover: "assets/img/fabrics/cover.jpg",
  learn: [
    { en: "How a fluffy fibre becomes yarn, then fabric, then a garment", hi: "एक रुई जैसा फ़ाइबर कैसे धागा, फिर फ़ैब्रिक और फिर कपड़ा बनता है" },
    { en: "Natural vs man-made fibres, and the pros and cons of each", hi: "प्राकृतिक और मैन-मेड फ़ाइबर, और हर एक के फ़ायदे-नुकसान" },
    { en: "The difference between woven and knitted fabric", hi: "बुने हुए (वोवन) और निट किए हुए फ़ैब्रिक में फ़र्क" },
    { en: "Names and feel of the fabrics every designer must know", hi: "वो फ़ैब्रिक जिनके नाम और एहसास हर डिज़ाइनर को पता होने चाहिए" },
    { en: "Drape, GSM, stretch, sheen and how to read a care label", hi: "ड्रेप, GSM, स्ट्रेच, चमक और केयर लेबल कैसे पढ़ें" }
  ],
  lessons: [
    /* ---------------------------------------------------------------- 1 */
    {
      id: "fibre-to-fabric",
      title: { en: "Fibre → yarn → fabric: the journey", hi: "फ़ाइबर → धागा → फ़ैब्रिक: पूरा सफ़र" },
      min: 5,
      blocks: [
        { t: "p", text: {
          en: "Every kurta you own started as tiny hairs called **fibres**. A fibre is too thin and short to sew with. So it goes on a journey to become cloth.",
          hi: "तुम्हारी हर कुर्ती की शुरुआत छोटे-छोटे बालों जैसे रेशों से हुई, जिन्हें **फ़ाइबर (Fibre)** कहते हैं। फ़ाइबर इतना पतला और छोटा होता है कि उससे सिलाई नहीं हो सकती। इसलिए कपड़ा बनने के लिए ये एक सफ़र पर निकलता है।" } },
        { t: "dg", name: "fabrics-journey", caption: {
          en: "The four big stages: fibre, yarn, fabric, garment.",
          hi: "चार बड़े पड़ाव: फ़ाइबर, धागा, फ़ैब्रिक, कपड़ा।" } },
        { t: "steps", items: [
          { title: { en: "Grow or make the fibre", hi: "फ़ाइबर उगाओ या बनाओ" },
            text: { en: "Cotton grows in a boll on a plant. Silk comes from a cocoon. Polyester is made in a factory.", hi: "कॉटन पौधे पर एक डोडे (Boll) में उगता है। सिल्क कोकून से आता है। पॉलिएस्टर फ़ैक्ट्री में बनता है।" },
            src: "assets/img/fabrics/cotton-boll.jpg" },
          { title: { en: "Spin it into yarn", hi: "कातकर धागा बनाओ" },
            text: { en: "**Spinning** twists many short fibres together into one long, strong yarn.", hi: "**कताई (Spinning)** में बहुत सारे छोटे फ़ाइबर को मरोड़कर एक लंबा, मज़बूत धागा बनाया जाता है।" },
            src: "assets/img/fabrics/spinning.jpg" },
          { title: { en: "Wind the yarn", hi: "धागे को लपेटो" },
            text: { en: "Yarn is wound on cones and often dyed at this stage.", hi: "धागे को कोन पर लपेटा जाता है और अक्सर इसी समय रंगा भी जाता है।" },
            src: "assets/img/fabrics/yarn-cones.jpg" },
          { title: { en: "Weave or knit it into fabric", hi: "बुनकर या निट करके फ़ैब्रिक बनाओ" },
            text: { en: "A **loom** weaves yarns at right angles. A knitting machine makes loops.", hi: "**करघा (Loom)** धागों को आड़ा-खड़ा बुनता है। निटिंग मशीन फंदे (Loops) बनाती है।" },
            src: "assets/img/fabrics/handloom.jpg" },
          { title: { en: "Finish it", hi: "फ़िनिशिंग करो" },
            text: { en: "The cloth is washed, dyed or printed, and softened. Now it is ready for the tailor.", hi: "कपड़े को धोया, रंगा या छापा और मुलायम किया जाता है। अब ये दर्ज़ी के लिए तैयार है।" },
            }
        ] },
        { t: "tip", kind: "remember", text: {
          en: "**Fibre** = the raw hair. **Yarn** = fibres twisted into a thread. **Fabric** = yarns woven or knitted into cloth.",
          hi: "**फ़ाइबर** = कच्चा रेशा। **यार्न** = रेशों को मरोड़कर बना धागा। **फ़ैब्रिक** = धागों को बुनकर या निट करके बना कपड़ा।" } },
        { t: "terms", items: [
          { en: "Fibre", hi: "फ़ाइबर", def: { en: "A tiny, hair-like strand. The raw material of every fabric.", hi: "बाल जैसा एक छोटा रेशा। हर फ़ैब्रिक का कच्चा माल।" } },
          { en: "Yarn", hi: "यार्न (धागा)", def: { en: "Fibres twisted together into a long thread for weaving or knitting.", hi: "रेशों को मरोड़कर बना लंबा धागा, जिससे बुनाई या निटिंग होती है।" } },
          { en: "Spinning", hi: "स्पिनिंग (कताई)", def: { en: "Twisting fibres into yarn.", hi: "रेशों को मरोड़कर धागा बनाना।" } },
          { en: "Loom", hi: "लूम (करघा)", def: { en: "The machine or frame on which yarn is woven into cloth.", hi: "वो मशीन या ढांचा जिस पर धागों को बुनकर कपड़ा बनता है।" } }
        ] },
        { t: "try", text: {
          en: "Pull one thread out of an old cotton dupatta. Untwist it slowly. Can you see the tiny fibres inside? Stick it in your sketchbook and label it.",
          hi: "किसी पुराने कॉटन दुपट्टे से एक धागा खींचो। उसे धीरे-धीरे खोलो। क्या अंदर छोटे-छोटे रेशे दिखे? इसे अपनी स्केचबुक में चिपकाओ और नाम लिखो।" } }
      ]
    },

    /* ---------------------------------------------------------------- 2 */
    {
      id: "natural-fibres",
      title: { en: "Natural fibres", hi: "प्राकृतिक फ़ाइबर" },
      min: 7,
      blocks: [
        { t: "p", text: {
          en: "**Natural fibres** come from plants or animals. India is one of the world's biggest growers of cotton and jute, and makes a lot of silk too.",
          hi: "**प्राकृतिक फ़ाइबर (Natural fibres)** पौधों या जानवरों से आते हैं। भारत दुनिया में कॉटन और जूट उगाने वाले सबसे बड़े देशों में है, और यहाँ सिल्क भी बहुत बनता है।" } },
        { t: "gallery", items: [
          { src: "assets/img/fabrics/cotton-picking.jpg", label: { en: "Cotton", hi: "कॉटन (सूती)" },
            note: { en: "From the fluffy boll of the cotton plant", hi: "कपास के पौधे के रुई वाले डोडे से" } },
          { src: "assets/img/fabrics/silk-cocoons.jpg", label: { en: "Silk", hi: "सिल्क (रेशम)" },
            note: { en: "From the cocoon of the silkworm", hi: "रेशम के कीड़े के कोकून से" } },
          { src: "assets/img/design-elements/tweed.jpg", label: { en: "Wool", hi: "ऊन" },
            note: { en: "From the hair of sheep (and goats, for pashmina)", hi: "भेड़ के बालों से (पश्मीना के लिए बकरी से)" } },
          { src: "assets/img/fabrics/flax.jpg", label: { en: "Linen", hi: "लिनन" },
            note: { en: "From the stem of the flax plant", hi: "अलसी (Flax) के पौधे के तने से" } },
          { src: "assets/img/fabrics/jute.jpg", label: { en: "Jute", hi: "जूट (पटसन)" },
            note: { en: "From the jute plant, mostly grown in Bengal and Assam", hi: "जूट के पौधे से, ज़्यादातर बंगाल और असम में उगता है" } },
          { src: "assets/img/fabrics/khadi.jpg", label: { en: "Khadi", hi: "खादी" },
            note: { en: "Hand-spun, hand-woven cloth, usually cotton", hi: "हाथ से कता और हाथ से बुना कपड़ा, ज़्यादातर कॉटन" } }
        ] },
        { t: "table",
          head: [{ en: "Fibre", hi: "फ़ाइबर" }, { en: "Feels like", hi: "छूने में" }, { en: "Good for", hi: "किसके लिए अच्छा" }, { en: "Watch out", hi: "ध्यान रखो" }],
          rows: [
            [{ en: "Cotton", hi: "कॉटन" }, { en: "Soft, cool", hi: "मुलायम, ठंडा" }, { en: "Kurtas, shirts, summer wear", hi: "कुर्ते, शर्ट, गर्मी के कपड़े" }, { en: "Wrinkles, can shrink", hi: "सिलवटें, सिकुड़ सकता है" }],
            [{ en: "Silk", hi: "सिल्क" }, { en: "Smooth, shiny", hi: "चिकना, चमकदार" }, { en: "Sarees, lehengas, festive wear", hi: "साड़ी, लहंगा, त्योहार के कपड़े" }, { en: "Costly, dry clean", hi: "महंगा, ड्राई क्लीन" }],
            [{ en: "Wool", hi: "ऊन" }, { en: "Warm, springy", hi: "गरम, लचीला" }, { en: "Shawls, coats, sweaters", hi: "शॉल, कोट, स्वेटर" }, { en: "Can itch, shrinks in hot water", hi: "चुभ सकता है, गरम पानी में सिकुड़ता है" }],
            [{ en: "Linen", hi: "लिनन" }, { en: "Crisp, cool", hi: "कड़क, ठंडा" }, { en: "Summer shirts, suits", hi: "गर्मी की शर्ट, सूट" }, { en: "Creases very easily", hi: "बहुत जल्दी सिलवट पड़ती है" }],
            [{ en: "Jute", hi: "जूट" }, { en: "Rough, stiff", hi: "खुरदरा, कड़ा" }, { en: "Bags, mats, accessories", hi: "बैग, चटाई, एक्सेसरीज़" }, { en: "Too rough for skin", hi: "त्वचा के लिए बहुत खुरदरा" }]
          ] },
        { t: "p", text: {
          en: "**Khadi** is not a separate fibre. It is any cloth that is spun and woven by hand, usually cotton, silk or wool. Gandhiji made it a symbol of freedom.",
          hi: "**खादी (Khadi)** कोई अलग फ़ाइबर नहीं है। ये वो कपड़ा है जो हाथ से काता और हाथ से बुना जाता है, ज़्यादातर कॉटन, सिल्क या ऊन। गांधीजी ने इसे आज़ादी का निशान बनाया।" } },
        { t: "tip", kind: "fact", text: {
          en: "One silkworm cocoon is a single unbroken thread, often more than **1 km** long!",
          hi: "रेशम का एक कोकून एक ही लंबे धागे से बना होता है, जो अक्सर **1 किलोमीटर** से भी लंबा होता है!" } },
        { t: "img", src: "assets/img/fabrics/silkworm.jpg", caption: {
          en: "Silkworms eating mulberry leaves. Each one will spin a cocoon of pure silk.",
          hi: "शहतूत के पत्ते खाते रेशम के कीड़े। हर एक शुद्ध रेशम का कोकून बुनेगा।" } },
        { t: "terms", items: [
          { en: "Natural fibre", hi: "नेचुरल फ़ाइबर", def: { en: "A fibre that comes from a plant or an animal.", hi: "पौधे या जानवर से मिलने वाला फ़ाइबर।" } },
          { en: "Cellulose fibre", hi: "सेल्युलोज़ फ़ाइबर", def: { en: "A plant fibre, like cotton, linen or jute.", hi: "पौधे से मिलने वाला फ़ाइबर, जैसे कॉटन, लिनन या जूट।" } },
          { en: "Protein fibre", hi: "प्रोटीन फ़ाइबर", def: { en: "An animal fibre, like silk or wool.", hi: "जानवर से मिलने वाला फ़ाइबर, जैसे सिल्क या ऊन।" } },
          { en: "Khadi", hi: "खादी", def: { en: "Cloth that is hand-spun and hand-woven.", hi: "हाथ से कता और हाथ से बुना कपड़ा।" } },
          { en: "Pashmina", hi: "पश्मीना", def: { en: "Very fine, soft wool from the Changthangi goat of Ladakh.", hi: "लद्दाख की चांगथांगी बकरी का बहुत बारीक, मुलायम ऊन।" } }
        ] },
        { t: "try", text: {
          en: "Read the labels on 5 clothes at home. Make a list: which are cotton, silk, wool or linen? Which fibre do you own the most?",
          hi: "घर के 5 कपड़ों के लेबल पढ़ो। लिस्ट बनाओ: कौन से कॉटन, सिल्क, ऊन या लिनन के हैं? तुम्हारे पास सबसे ज़्यादा किस फ़ाइबर के कपड़े हैं?" } }
      ]
    },

    /* ---------------------------------------------------------------- 3 */
    {
      id: "man-made-fibres",
      title: { en: "Man-made fibres", hi: "मैन-मेड फ़ाइबर" },
      min: 6,
      blocks: [
        { t: "p", text: {
          en: "Your gym leggings, your rain jacket and that shiny party top are probably **man-made**. These fibres are made in factories, not grown.",
          hi: "तुम्हारी जिम लेगिंग, रेनकोट और वो चमकीला पार्टी टॉप शायद **मैन-मेड (Man-made)** है। ये फ़ाइबर उगाए नहीं जाते, फ़ैक्ट्री में बनाए जाते हैं।" } },
        { t: "dg", name: "fabrics-fibre-tree", caption: {
          en: "The fibre family tree. Man-made fibres split into two groups.",
          hi: "फ़ाइबर का पूरा परिवार। मैन-मेड फ़ाइबर के दो ग्रुप होते हैं।" } },
        { t: "compare", items: [
          { title: { en: "Regenerated", hi: "रीजनरेटेड" }, points: [
            { en: "Made from plant pulp (wood, bamboo) dissolved and re-formed", hi: "पौधे के गूदे (लकड़ी, बांस) को घोलकर दोबारा बनाया जाता है" },
            { en: "Viscose (rayon), modal, lyocell, bamboo fabric", hi: "विस्कोस (रेयॉन), मोडल, लायोसेल, बैंबू फ़ैब्रिक" },
            { en: "Soft, flowy, breathable, feels like cotton or silk", hi: "मुलायम, बहने वाला, हवादार, कॉटन या सिल्क जैसा लगता है" },
            { en: "Weak when wet, can shrink", hi: "गीला होने पर कमज़ोर, सिकुड़ सकता है" }
          ] },
          { title: { en: "Synthetic", hi: "सिंथेटिक" }, src: "assets/img/fabrics/polyester.jpg", points: [
            { en: "Made from petroleum chemicals (a kind of plastic)", hi: "पेट्रोलियम केमिकल से बनता है (एक तरह का प्लास्टिक)" },
            { en: "Polyester, nylon, acrylic, spandex (Lycra)", hi: "पॉलिएस्टर, नायलॉन, एक्रेलिक, स्पैन्डेक्स (लाइक्रा)" },
            { en: "Strong, cheap, does not wrinkle, dries fast", hi: "मज़बूत, सस्ता, सिलवट नहीं पड़ती, जल्दी सूखता है" },
            { en: "Traps sweat and heat, sheds microplastics", hi: "पसीना और गर्मी रोकता है, माइक्रोप्लास्टिक छोड़ता है" }
          ] }
        ] },
        { t: "table",
          head: [{ en: "Fibre", hi: "फ़ाइबर" }, { en: "Best quality", hi: "सबसे बड़ी खूबी" }, { en: "You see it in", hi: "कहाँ दिखता है" }],
          rows: [
            [{ en: "Viscose / rayon", hi: "विस्कोस / रेयॉन" }, { en: "Silky drape, cheap", hi: "सिल्क जैसा ड्रेप, सस्ता" }, { en: "Printed kurtis, palazzos", hi: "प्रिंटेड कुर्ती, प्लाज़ो" }],
            [{ en: "Modal", hi: "मोडल" }, { en: "Super soft", hi: "बहुत मुलायम" }, { en: "Innerwear, nightwear", hi: "इनरवियर, नाइटवियर" }],
            [{ en: "Polyester", hi: "पॉलिएस्टर" }, { en: "Strong, no wrinkles", hi: "मज़बूत, सिलवट नहीं" }, { en: "Sarees, uniforms, sportswear", hi: "साड़ी, यूनिफ़ॉर्म, स्पोर्ट्सवियर" }],
            [{ en: "Nylon", hi: "नायलॉन" }, { en: "Very strong, light", hi: "बहुत मज़बूत, हल्का" }, { en: "Stockings, jackets, bags", hi: "स्टॉकिंग, जैकेट, बैग" }],
            [{ en: "Acrylic", hi: "एक्रेलिक" }, { en: "Wool-like, cheap", hi: "ऊन जैसा, सस्ता" }, { en: "Sweaters, shawls", hi: "स्वेटर, शॉल" }],
            [{ en: "Spandex (Lycra)", hi: "स्पैन्डेक्स (लाइक्रा)" }, { en: "Stretches 5x and springs back", hi: "5 गुना खिंचता है और वापस आता है" }, { en: "Leggings, jeggings, swimwear", hi: "लेगिंग, जेगिंग, स्विमवियर" }]
          ] },
        { t: "tip", kind: "tip", text: {
          en: "Many fabrics are **blends**, like 60% cotton + 40% polyester. You get cotton's comfort and polyester's strength in one cloth.",
          hi: "बहुत से फ़ैब्रिक **ब्लेंड (Blend)** होते हैं, जैसे 60% कॉटन + 40% पॉलिएस्टर। एक ही कपड़े में कॉटन का आराम और पॉलिएस्टर की मज़बूती मिल जाती है।" } },
        { t: "terms", items: [
          { en: "Regenerated fibre", hi: "रीजनरेटेड फ़ाइबर", def: { en: "A man-made fibre made from natural plant pulp, like viscose.", hi: "पौधे के गूदे से बना मैन-मेड फ़ाइबर, जैसे विस्कोस।" } },
          { en: "Synthetic fibre", hi: "सिंथेटिक फ़ाइबर", def: { en: "A fibre made from chemicals (petroleum), like polyester.", hi: "केमिकल (पेट्रोलियम) से बना फ़ाइबर, जैसे पॉलिएस्टर।" } },
          { en: "Viscose", hi: "विस्कोस", def: { en: "Also called rayon. Soft, silky, made from wood pulp.", hi: "इसे रेयॉन भी कहते हैं। मुलायम, सिल्क जैसा, लकड़ी के गूदे से बना।" } },
          { en: "Spandex", hi: "स्पैन्डेक्स", def: { en: "A very stretchy synthetic fibre. Brand name: Lycra.", hi: "बहुत खिंचने वाला सिंथेटिक फ़ाइबर। ब्रांड का नाम: लाइक्रा।" } },
          { en: "Blend", hi: "ब्लेंड", def: { en: "A fabric made from two or more fibres mixed together.", hi: "दो या ज़्यादा फ़ाइबर मिलाकर बना फ़ैब्रिक।" } }
        ] },
        { t: "try", text: {
          en: "Find one blended garment at home (the label shows two fibres). Write down the mix and guess why the brand chose it.",
          hi: "घर पर एक ब्लेंड वाला कपड़ा ढूंढो (लेबल पर दो फ़ाइबर लिखे हों)। मिक्स लिखो और सोचो कि ब्रांड ने ये क्यों चुना।" } }
      ]
    },

    /* ---------------------------------------------------------------- 4 */
    {
      id: "woven-vs-knit",
      title: { en: "Woven vs knitted", hi: "वोवन और निटेड" },
      min: 7,
      blocks: [
        { t: "p", text: {
          en: "Your jeans don't stretch much, but your T-shirt does. Why? Jeans are **woven**, and the T-shirt is **knitted**. Same yarn, different construction.",
          hi: "तुम्हारी जींस ज़्यादा नहीं खिंचती, पर टी-शर्ट खिंचती है। क्यों? जींस **वोवन (Woven, बुनी हुई)** है और टी-शर्ट **निटेड (Knitted)**। धागा एक जैसा, बनाने का तरीका अलग।" } },
        { t: "compare", items: [
          { title: { en: "Woven", hi: "वोवन (बुना हुआ)" }, dg: "fabrics-weave", args: { type: "plain" }, points: [
            { en: "Two sets of yarn cross at right angles", hi: "धागों के दो सेट आड़े-खड़े एक-दूसरे को काटते हैं" },
            { en: "Little or no stretch (except on the bias)", hi: "बहुत कम या कोई खिंचाव नहीं (बायस को छोड़कर)" },
            { en: "Holds a crisp shape; edges fray", hi: "कड़क आकार रखता है; किनारे उधड़ते हैं" },
            { en: "Shirts, jeans, kurtas, sarees", hi: "शर्ट, जींस, कुर्ते, साड़ी" }
          ] },
          { title: { en: "Knitted", hi: "निटेड" }, dg: "fabrics-knit", points: [
            { en: "One yarn makes rows of loops", hi: "एक ही धागा फंदों की कतारें बनाता है" },
            { en: "Stretches, especially across the width", hi: "खिंचता है, ख़ासकर चौड़ाई में" },
            { en: "Comfy and wrinkle-free; edges curl, don't fray", hi: "आरामदायक, सिलवट नहीं; किनारे मुड़ते हैं, उधड़ते नहीं" },
            { en: "T-shirts, leggings, sweaters, socks", hi: "टी-शर्ट, लेगिंग, स्वेटर, मोज़े" }
          ] }
        ] },
        { t: "h", text: { en: "Warp, weft and grain", hi: "ताना, बाना और ग्रेन" } },
        { t: "p", text: {
          en: "In weaving, the long yarns on the loom are the **warp** (ताना). The yarn that goes side to side is the **weft** (बाना). The neat, firm edge is the **selvedge**.",
          hi: "बुनाई में करघे पर लंबाई में लगे धागे **ताना (Warp)** कहलाते हैं। जो धागा आड़ा चलता है वो **बाना (Weft)** है। कपड़े का साफ़, मज़बूत किनारा **सेल्वेज (Selvedge)** कहलाता है।" } },
        { t: "dg", name: "fabrics-grain", caption: {
          en: "The bias (45°) stretches the most. Cutting on the bias makes a dress cling and flow.",
          hi: "बायस (45°) पर सबसे ज़्यादा खिंचाव होता है। बायस पर कटा कपड़ा शरीर पर बहता हुआ लगता है।" } },
        { t: "h", text: { en: "The three basic weaves", hi: "तीन बेसिक बुनाई" } },
        { t: "gallery", cols: 3, items: [
          { dg: "fabrics-weave", args: { type: "plain" }, label: { en: "Plain weave", hi: "प्लेन वीव" },
            note: { en: "Over 1, under 1. Poplin, muslin, chiffon", hi: "1 ऊपर, 1 नीचे। पॉपलिन, मलमल, शिफॉन" } },
          { dg: "fabrics-weave", args: { type: "twill" }, label: { en: "Twill weave", hi: "ट्विल वीव" },
            note: { en: "Makes diagonal lines. Denim, gabardine", hi: "तिरछी लाइनें बनती हैं। डेनिम, गैबर्डीन" } },
          { dg: "fabrics-weave", args: { type: "satin" }, label: { en: "Satin weave", hi: "सैटिन वीव" },
            note: { en: "Long floats = shine. Satin, sateen", hi: "लंबे फ़्लोट = चमक। सैटिन, सैटीन" } }
        ] },
        { t: "compare", items: [
          { title: { en: "Woven close-up", hi: "वोवन पास से" }, src: "assets/img/fabrics/woven-macro.jpg", points: [
            { en: "Look for a tiny grid of crossing yarns", hi: "आड़े-खड़े धागों का छोटा-सा जाल देखो" }
          ] },
          { title: { en: "Knit close-up", hi: "निट पास से" }, src: "assets/img/fabrics/knit-macro.jpg", points: [
            { en: "Look for columns of little 'V' loops", hi: "छोटे 'V' फंदों की लाइनें देखो" }
          ] }
        ] },
        { t: "tip", kind: "mistake", text: {
          en: "Don't use a pattern made for knits with a woven fabric. Without stretch, the garment will be too tight to wear.",
          hi: "निट के लिए बना पैटर्न वोवन फ़ैब्रिक पर मत इस्तेमाल करो। खिंचाव न होने से कपड़ा पहनने में बहुत टाइट होगा।" } },
        { t: "terms", items: [
          { en: "Warp", hi: "वार्प (ताना)", def: { en: "Yarns running along the length of the fabric.", hi: "कपड़े की लंबाई में चलने वाले धागे।" } },
          { en: "Weft", hi: "वेफ़्ट (बाना)", def: { en: "Yarns running across the width of the fabric.", hi: "कपड़े की चौड़ाई में चलने वाले धागे।" } },
          { en: "Selvedge", hi: "सेल्वेज", def: { en: "The firm, finished edge of a woven fabric that doesn't fray.", hi: "बुने कपड़े का मज़बूत, तैयार किनारा जो उधड़ता नहीं।" } },
          { en: "Bias", hi: "बायस", def: { en: "The 45° diagonal of a woven fabric. It stretches the most.", hi: "बुने कपड़े की 45° तिरछी दिशा। इसमें सबसे ज़्यादा खिंचाव होता है।" } },
          { en: "Twill", hi: "ट्विल", def: { en: "A weave that makes diagonal lines, like on denim.", hi: "बुनाई जिससे तिरछी लाइनें बनती हैं, जैसे डेनिम पर।" } }
        ] },
        { t: "try", text: {
          en: "Take a strip of paper in two colours and weave a 6×6 plain weave. Then try a twill: over 2, under 1, shifting one step each row.",
          hi: "दो रंगों के कागज़ की पट्टियाँ लो और 6×6 की प्लेन बुनाई करो। फिर ट्विल करो: 2 ऊपर, 1 नीचे, हर लाइन में एक कदम खिसकाकर।" } }
      ]
    },

    /* ---------------------------------------------------------------- 5 */
    {
      id: "common-fabrics",
      title: { en: "Fabrics every designer must know", hi: "हर डिज़ाइनर को पता होने वाले फ़ैब्रिक" },
      min: 7,
      blocks: [
        { t: "p", text: {
          en: "When you go to a cloth market, shopkeepers will throw names at you: georgette, crepe, organza. Here is your cheat sheet. Learn to recognise them by **look** and **touch**.",
          hi: "कपड़ा बाज़ार में दुकानदार तुम्हें तरह-तरह के नाम बताएंगे: जॉर्जेट, क्रेप, ऑर्गेंज़ा। ये रही तुम्हारी चीट शीट। इन्हें **देखकर** और **छूकर** पहचानना सीखो।" } },
        { t: "h", text: { en: "Light and sheer", hi: "हल्के और पारदर्शी" } },
        { t: "gallery", items: [
          { src: "assets/img/fabrics/chiffon.jpg", label: { en: "Chiffon", hi: "शिफॉन" },
            note: { en: "Very light, see-through, floaty. Sarees, dupattas", hi: "बहुत हल्का, आर-पार दिखने वाला, उड़ने वाला। साड़ी, दुपट्टे" } },
          { src: "assets/img/fabrics/organza.jpg", label: { en: "Organza", hi: "ऑर्गेंज़ा" },
            note: { en: "Sheer but stiff and crisp. Holds volume", hi: "पारदर्शी पर कड़क। फुलाव बनाए रखता है" } },
          { src: "assets/img/fabrics/muslin.jpg", label: { en: "Muslin (mulmul)", hi: "मलमल" },
            note: { en: "Soft, light cotton. Summer kurtas, toiles", hi: "मुलायम, हल्का कॉटन। गर्मी के कुर्ते, टॉयल" } },
          { src: "assets/img/fabrics/crepe.jpg", label: { en: "Crepe", hi: "क्रेप" },
            note: { en: "Crinkled, pebbly surface. Drapes beautifully", hi: "सिकुड़ी, दानेदार सतह। बहुत सुंदर ड्रेप" } }
        ] },
        { t: "h", text: { en: "With body, shine or texture", hi: "भारी, चमकदार या टेक्सचर वाले" } },
        { t: "gallery", items: [
          { src: "assets/img/fabrics/denim.jpg", label: { en: "Denim", hi: "डेनिम" },
            note: { en: "Strong cotton twill, blue warp + white weft", hi: "मज़बूत कॉटन ट्विल, नीला ताना + सफ़ेद बाना" } },
          { src: "assets/img/fabrics/satin.jpg", label: { en: "Satin", hi: "सैटिन" },
            note: { en: "Glossy face, dull back. Gowns, linings", hi: "आगे से चमकदार, पीछे से फीका। गाउन, अस्तर" } },
          { src: "assets/img/fabrics/velvet.jpg", label: { en: "Velvet", hi: "वेलवेट (मख़मल)" },
            note: { en: "Short, soft pile. Rich winter wedding wear", hi: "छोटे, मुलायम रोएं। सर्दियों की शादी के कपड़े" } },
          { src: "assets/img/fabrics/corduroy.jpg", label: { en: "Corduroy", hi: "कॉर्डरॉय" },
            note: { en: "Raised ribs called 'wales'. Trousers, jackets", hi: "उभरी धारियाँ, जिन्हें 'वेल्स' कहते हैं। पैंट, जैकेट" } },
          { src: "assets/img/fabrics/tweed.jpg", label: { en: "Tweed", hi: "ट्वीड" },
            note: { en: "Rough, flecked wool. Blazers, coats", hi: "खुरदरा, धब्बेदार ऊन। ब्लेज़र, कोट" } },
          { src: "assets/img/fabrics/jersey.jpg", label: { en: "Jersey", hi: "जर्सी" },
            note: { en: "Stretchy single knit. T-shirts, dresses", hi: "खिंचने वाला सिंगल निट। टी-शर्ट, ड्रेस" } }
        ] },
        { t: "list", style: "dot", items: [
          { en: "**Poplin**: smooth, crisp, tightly woven cotton. School shirts!", hi: "**पॉपलिन (Poplin)**: चिकना, कड़क, कसकर बुना कॉटन। स्कूल की शर्ट!" },
          { en: "**Cambric**: fine, light cotton. Petticoats, linings, kurtas.", hi: "**कैम्ब्रिक (Cambric)**: बारीक, हल्का कॉटन। पेटीकोट, अस्तर, कुर्ते।" },
          { en: "**Rayon**: soft and flowy. Printed kurtis and palazzos.", hi: "**रेयॉन (Rayon)**: मुलायम और बहने वाला। प्रिंटेड कुर्ती और प्लाज़ो।" },
          { en: "**Brocade**: woven with raised patterns, often with zari. Banarasi!", hi: "**ब्रोकेड (Brocade)**: उभरे डिज़ाइन वाली बुनाई, अक्सर ज़री के साथ। बनारसी!" }
        ] },
        { t: "tip", kind: "tip", text: {
          en: "Make a **swatch book**: collect a 5 cm piece of each fabric from the darzi's leftover box. Stick it, name it, and write how it feels.",
          hi: "एक **स्वैच बुक (Swatch book)** बनाओ: दर्ज़ी के बचे कपड़ों से हर फ़ैब्रिक का 5 cm टुकड़ा लो। चिपकाओ, नाम लिखो, और लिखो कि छूने में कैसा है।" } },
        { t: "terms", items: [
          { en: "Sheer", hi: "शीयर (पारदर्शी)", def: { en: "Thin enough to see through.", hi: "इतना पतला कि आर-पार दिखे।" } },
          { en: "Pile", hi: "पाइल (रोएं)", def: { en: "Raised fibres standing up from the surface, as in velvet.", hi: "सतह से उठे हुए रोएं, जैसे वेलवेट में।" } },
          { en: "Swatch", hi: "स्वैच", def: { en: "A small sample piece of fabric.", hi: "कपड़े का छोटा सैंपल टुकड़ा।" } },
          { en: "Brocade", hi: "ब्रोकेड", def: { en: "A rich fabric with woven raised patterns, often with metallic zari.", hi: "उभरे बुने डिज़ाइन वाला भारी फ़ैब्रिक, अक्सर ज़री के साथ।" } }
        ] },
        { t: "try", text: {
          en: "Start your swatch book today. Collect at least 6 fabrics from this lesson and label each one with its name and a one-word feel.",
          hi: "आज ही अपनी स्वैच बुक शुरू करो। इस लेसन के कम से कम 6 फ़ैब्रिक जमा करो और हर एक पर नाम और एक शब्द में उसका एहसास लिखो।" } }
      ]
    },

    /* ---------------------------------------------------------------- 6 */
    {
      id: "properties-care",
      title: { en: "Fabric properties & care", hi: "फ़ैब्रिक की खूबियाँ और देखभाल" },
      min: 7,
      blocks: [
        { t: "p", text: {
          en: "Choosing fabric is like casting an actor. A flowy anarkali needs a fabric that falls softly. A structured blazer needs one that stands firm.",
          hi: "फ़ैब्रिक चुनना किसी रोल के लिए एक्टर चुनने जैसा है। बहती हुई अनारकली को ऐसा कपड़ा चाहिए जो नरमी से गिरे। एक कड़क ब्लेज़र को ऐसा कपड़ा चाहिए जो सीधा खड़ा रहे।" } },
        { t: "cards", items: [
          { icon: "wave", title: { en: "Drape", hi: "ड्रेप" }, text: { en: "How the fabric hangs and falls in folds.", hi: "कपड़ा कैसे लटकता है और सिलवटों में गिरता है।" } },
          { icon: "scale", title: { en: "Weight (GSM)", hi: "वज़न (GSM)" }, text: { en: "Grams per square metre. Higher = heavier.", hi: "ग्राम प्रति वर्ग मीटर। ज़्यादा = भारी।" } },
          { icon: "layers", title: { en: "Stretch", hi: "स्ट्रेच" }, text: { en: "How much it pulls and springs back.", hi: "कितना खिंचता है और वापस आता है।" } },
          { icon: "leaf", title: { en: "Breathability", hi: "हवादारी" }, text: { en: "How easily air and sweat pass through.", hi: "हवा और पसीना कितनी आसानी से निकलते हैं।" } },
          { icon: "sparkle", title: { en: "Sheen", hi: "चमक (शीन)" }, text: { en: "How much light it reflects: matte to glossy.", hi: "कितनी रोशनी लौटाता है: फीका से चमकदार तक।" } },
          { icon: "drop", title: { en: "Absorbency", hi: "सोखने की ताक़त" }, text: { en: "How well it soaks up water and dye.", hi: "पानी और रंग को कितना अच्छा सोखता है।" } }
        ] },
        { t: "compare", items: [
          { title: { en: "Fluid drape", hi: "बहता हुआ ड्रेप" }, dg: "fabrics-drape", args: { type: "fluid" }, points: [
            { en: "Falls close in many soft folds", hi: "कई नरम सिलवटों में पास-पास गिरता है" },
            { en: "Chiffon, georgette, crepe, rayon", hi: "शिफॉन, जॉर्जेट, क्रेप, रेयॉन" }
          ] },
          { title: { en: "Stiff drape", hi: "कड़क ड्रेप" }, dg: "fabrics-drape", args: { type: "stiff" }, points: [
            { en: "Stands away from the body, holds a shape", hi: "शरीर से दूर खड़ा रहता है, आकार बनाए रखता है" },
            { en: "Organza, taffeta, denim, brocade", hi: "ऑर्गेंज़ा, टफ़ेटा, डेनिम, ब्रोकेड" }
          ] }
        ] },
        { t: "dg", name: "fabrics-gsm", caption: {
          en: "Approximate GSM. Ask for GSM when you buy fabric online or in bulk.",
          hi: "लगभग GSM। ऑनलाइन या थोक में कपड़ा ख़रीदते समय GSM ज़रूर पूछो।" } },
        { t: "h", text: { en: "The burn test", hi: "बर्न टेस्ट (जलाकर जांच)" } },
        { t: "p", text: {
          en: "Not sure if a fabric is pure silk or polyester? Designers burn a tiny thread. Natural fibres burn to soft ash. Synthetics **melt** into a hard bead.",
          hi: "पता नहीं कि कपड़ा असली सिल्क है या पॉलिएस्टर? डिज़ाइनर एक छोटा धागा जलाकर देखते हैं। प्राकृतिक फ़ाइबर नरम राख बनते हैं। सिंथेटिक **पिघलकर** सख़्त गोली बन जाते हैं।" } },
        { t: "table",
          head: [{ en: "Fibre", hi: "फ़ाइबर" }, { en: "Smell", hi: "गंध" }, { en: "What is left", hi: "क्या बचता है" }],
          rows: [
            [{ en: "Cotton, linen, viscose", hi: "कॉटन, लिनन, विस्कोस" }, { en: "Burning paper", hi: "जलता कागज़" }, { en: "Soft grey ash", hi: "नरम भूरी राख" }],
            [{ en: "Silk, wool", hi: "सिल्क, ऊन" }, { en: "Burning hair", hi: "जलते बाल" }, { en: "Crushable black ash", hi: "मसलने पर टूटने वाली काली राख" }],
            [{ en: "Polyester, nylon", hi: "पॉलिएस्टर, नायलॉन" }, { en: "Chemical, plastic", hi: "केमिकल, प्लास्टिक जैसी" }, { en: "Hard melted bead", hi: "सख़्त पिघली गोली" }]
          ] },
        { t: "tip", kind: "mistake", text: {
          en: "Only do the burn test with an adult nearby, over a steel plate or sink, with a few threads held in tweezers. Never near your face or other cloth.",
          hi: "बर्न टेस्ट सिर्फ़ किसी बड़े के साथ करो, स्टील की प्लेट या सिंक के ऊपर, चिमटी में कुछ धागे पकड़कर। कभी चेहरे या दूसरे कपड़े के पास नहीं।" } },
        { t: "h", text: { en: "Reading a care label", hi: "केयर लेबल पढ़ना" } },
        { t: "img", src: "assets/img/fabrics/care-label.jpg", caption: {
          en: "Look inside any garment, near the side seam or the neck. The symbols tell you how to wash it.",
          hi: "किसी भी कपड़े के अंदर, साइड सीम या गले के पास देखो। ये निशान बताते हैं कि इसे कैसे धोना है।" } },
        { t: "gallery", cols: 3, items: [
          { dg: "fabrics-care", args: { s: "wash" }, label: { en: "Machine wash 30°C", hi: "मशीन वॉश 30°C" } },
          { dg: "fabrics-care", args: { s: "hand" }, label: { en: "Hand wash only", hi: "सिर्फ़ हाथ से धोएं" } },
          { dg: "fabrics-care", args: { s: "nobleach" }, label: { en: "Do not bleach", hi: "ब्लीच न करें" } },
          { dg: "fabrics-care", args: { s: "tumble" }, label: { en: "Tumble dry, low heat", hi: "ड्रायर में, कम गर्मी" } },
          { dg: "fabrics-care", args: { s: "iron" }, label: { en: "Iron, low heat", hi: "प्रेस, कम गर्मी" },
            note: { en: "More dots = hotter iron", hi: "ज़्यादा बिंदु = ज़्यादा गरम प्रेस" } },
          { dg: "fabrics-care", args: { s: "dryclean" }, label: { en: "Dry clean", hi: "ड्राई क्लीन" } }
        ] },
        { t: "tip", kind: "remember", text: {
          en: "Tub = washing. Triangle = bleach. Square = drying. Iron = ironing. Circle = dry cleaning. A cross over any symbol means **don't**.",
          hi: "टब = धुलाई। त्रिकोण = ब्लीच। चौकोर = सुखाना। प्रेस = इस्त्री। गोला = ड्राई क्लीन। किसी भी निशान पर क्रॉस का मतलब है **मत करो**।" } },
        { t: "terms", items: [
          { en: "Drape", hi: "ड्रेप", def: { en: "The way a fabric hangs and falls.", hi: "कपड़ा जिस तरह लटकता और गिरता है।" } },
          { en: "GSM", hi: "जीएसएम", def: { en: "Grams per square metre: the weight of a fabric.", hi: "ग्राम प्रति वर्ग मीटर: फ़ैब्रिक का वज़न।" } },
          { en: "Hand (handle)", hi: "हैंड (हैंडल)", def: { en: "How a fabric feels when you touch it: soft, crisp, rough.", hi: "छूने पर कपड़ा कैसा लगता है: मुलायम, कड़क, खुरदरा।" } },
          { en: "Sheen", hi: "शीन (चमक)", def: { en: "The soft shine on a fabric's surface.", hi: "कपड़े की सतह की हल्की चमक।" } },
          { en: "Care label", hi: "केयर लेबल", def: { en: "The small tag with symbols that tells you how to wash a garment.", hi: "निशानों वाला छोटा टैग जो बताता है कि कपड़ा कैसे धोना है।" } }
        ] },
        { t: "try", text: {
          en: "Hold 3 dupattas (chiffon, cotton, silk) over your hand. Sketch how each one falls. Which one is the most fluid?",
          hi: "3 दुपट्टे (शिफॉन, कॉटन, सिल्क) अपने हाथ पर लटकाओ। स्केच करो कि हर एक कैसे गिरता है। सबसे ज़्यादा बहने वाला कौन सा है?" } }
      ]
    }
  ],

  quiz: [
    { q: { en: "What is the correct order?", hi: "सही क्रम कौन सा है?" },
      options: [
        { en: "Yarn → fibre → fabric", hi: "धागा → फ़ाइबर → फ़ैब्रिक" },
        { en: "Fibre → yarn → fabric", hi: "फ़ाइबर → धागा → फ़ैब्रिक" },
        { en: "Fabric → fibre → yarn", hi: "फ़ैब्रिक → फ़ाइबर → धागा" }
      ], answer: 1, dg: "fabrics-journey",
      why: { en: "Fibres are spun into yarn, and yarn is woven or knitted into fabric.", hi: "फ़ाइबर को कातकर धागा बनता है, और धागे को बुनकर या निट करके फ़ैब्रिक।" } },
    { q: { en: "Which fibre comes from an animal?", hi: "कौन सा फ़ाइबर जानवर से आता है?" },
      options: [{ en: "Linen", hi: "लिनन" }, { en: "Jute", hi: "जूट" }, { en: "Silk", hi: "सिल्क" }],
      answer: 2, src: "assets/img/fabrics/silk-cocoons.jpg",
      why: { en: "Silk comes from the silkworm's cocoon. Linen and jute come from plants.", hi: "सिल्क रेशम के कीड़े के कोकून से आता है। लिनन और जूट पौधों से आते हैं।" } },
    { q: { en: "Viscose (rayon) is made from…", hi: "विस्कोस (रेयॉन) किससे बनता है…" },
      options: [{ en: "Petroleum", hi: "पेट्रोलियम" }, { en: "Wood or plant pulp", hi: "लकड़ी या पौधे का गूदा" }, { en: "Sheep hair", hi: "भेड़ के बाल" }],
      answer: 1,
      why: { en: "Viscose is a regenerated fibre: plant pulp is dissolved and re-formed into fibre.", hi: "विस्कोस रीजनरेटेड फ़ाइबर है: पौधे के गूदे को घोलकर दोबारा फ़ाइबर बनाया जाता है।" } },
    { q: { en: "Which fibre gives leggings their stretch?", hi: "लेगिंग में खिंचाव किस फ़ाइबर से आता है?" },
      options: [{ en: "Spandex (Lycra)", hi: "स्पैन्डेक्स (लाइक्रा)" }, { en: "Linen", hi: "लिनन" }, { en: "Acrylic", hi: "एक्रेलिक" }],
      answer: 0,
      why: { en: "Spandex can stretch about five times its length and spring back.", hi: "स्पैन्डेक्स अपनी लंबाई से लगभग 5 गुना खिंचकर वापस आ सकता है।" } },
    { q: { en: "Which weave is this? It makes diagonal lines, as on denim.", hi: "ये कौन सी बुनाई है? इससे तिरछी लाइनें बनती हैं, जैसे डेनिम पर।" },
      options: [{ en: "Plain", hi: "प्लेन" }, { en: "Twill", hi: "ट्विल" }, { en: "Satin", hi: "सैटिन" }],
      answer: 1, dg: "fabrics-weave", args: { type: "twill" },
      why: { en: "In a twill, each row shifts one step, so the floats form diagonal lines.", hi: "ट्विल में हर लाइन एक कदम खिसकती है, इसलिए तिरछी लाइनें बनती हैं।" } },
    { q: { en: "The yarns running along the length of a woven fabric are the…", hi: "बुने कपड़े की लंबाई में चलने वाले धागे कहलाते हैं…" },
      options: [{ en: "Weft", hi: "बाना (वेफ़्ट)" }, { en: "Warp", hi: "ताना (वार्प)" }, { en: "Bias", hi: "बायस" }],
      answer: 1, dg: "fabrics-grain",
      why: { en: "Warp runs lengthwise, parallel to the selvedge. Weft runs across.", hi: "ताना लंबाई में, सेल्वेज के साथ-साथ चलता है। बाना चौड़ाई में चलता है।" } },
    { q: { en: "Why does a T-shirt stretch more than a shirt?", hi: "टी-शर्ट, शर्ट से ज़्यादा क्यों खिंचती है?" },
      options: [
        { en: "It is knitted from loops", hi: "ये फंदों से निट की गई है" },
        { en: "It is always polyester", hi: "ये हमेशा पॉलिएस्टर की होती है" },
        { en: "It has a selvedge", hi: "इसमें सेल्वेज होता है" }
      ], answer: 0, src: "assets/img/fabrics/knit-macro.jpg",
      why: { en: "Knit loops can open and close, so knitted fabric stretches.", hi: "निट के फंदे खुल और बंद हो सकते हैं, इसलिए निटेड कपड़ा खिंचता है।" } },
    { q: { en: "Sheer but stiff, it holds the volume of a lehenga. Which fabric?", hi: "पारदर्शी पर कड़क, लहंगे में फुलाव बनाए रखता है। कौन सा फ़ैब्रिक?" },
      options: [{ en: "Chiffon", hi: "शिफॉन" }, { en: "Organza", hi: "ऑर्गेंज़ा" }, { en: "Jersey", hi: "जर्सी" }],
      answer: 1, src: "assets/img/fabrics/organza.jpg",
      why: { en: "Organza is sheer like chiffon, but crisp, so it stands away from the body.", hi: "ऑर्गेंज़ा शिफॉन जैसा पारदर्शी है, पर कड़क है, इसलिए शरीर से दूर खड़ा रहता है।" } },
    { q: { en: "A thread melts into a hard bead when burnt. It is probably…", hi: "जलाने पर धागा पिघलकर सख़्त गोली बन गया। ये शायद है…" },
      options: [{ en: "Cotton", hi: "कॉटन" }, { en: "Silk", hi: "सिल्क" }, { en: "Polyester", hi: "पॉलिएस्टर" }],
      answer: 2,
      why: { en: "Synthetics like polyester melt. Natural fibres burn to ash.", hi: "पॉलिएस्टर जैसे सिंथेटिक पिघलते हैं। प्राकृतिक फ़ाइबर जलकर राख बनते हैं।" } },
    { q: { en: "What does this care symbol mean?", hi: "इस केयर निशान का मतलब क्या है?" },
      options: [{ en: "Do not bleach", hi: "ब्लीच न करें" }, { en: "Do not iron", hi: "प्रेस न करें" }, { en: "Do not wash", hi: "धोएं नहीं" }],
      answer: 0, dg: "fabrics-care", args: { s: "nobleach" },
      why: { en: "The triangle means bleach. A cross over it means don't.", hi: "त्रिकोण का मतलब ब्लीच है। उस पर क्रॉस का मतलब है मत करो।" } }
  ]
});
