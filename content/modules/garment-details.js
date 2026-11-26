/* Module 5 - Garment Details. The flat sketches (flat-*) and garment-hemlines / garment-waistlines live in assets/js/flats.js */
(function () {
  function G(dg, type, en, hi, nen, nhi) {
    var it = { dg: dg, args: { type: type }, label: { en: en, hi: hi } };
    if (nen) it.note = { en: nen, hi: nhi };
    return it;
  }

  FD.module({
    id: "garment-details",
    num: 5,
    level: "basic",
    title: { en: "Garment Details", hi: "गारमेंट डिटेल्स" },
    tagline: { en: "Necklines, collars, sleeves, skirts and more: the vocabulary of clothes", hi: "नेकलाइन, कॉलर, स्लीव, स्कर्ट और भी बहुत कुछ: कपड़ों की अपनी भाषा" },
    cover: "assets/img/garment-details/cover.jpg",
    learn: [
      { en: "Name the 5 basic dress silhouettes (A, H, X, Y, O)", hi: "ड्रेस के 5 बेसिक सिल्हूट (A, H, X, Y, O) पहचानना" },
      { en: "Recognise 12 necklines, 9 collars and 12 sleeves", hi: "12 नेकलाइन, 9 कॉलर और 12 स्लीव पहचानना" },
      { en: "Tell skirt and trouser styles apart at a glance", hi: "स्कर्ट और ट्राउज़र के स्टाइल एक नज़र में पहचानना" },
      { en: "Use the right words for waistlines and hem lengths", hi: "वेस्टलाइन और हेम की लंबाई के सही नाम बोलना" }
    ],
    lessons: [
      /* ---------------- 1. Silhouettes ---------------- */
      {
        id: "silhouettes",
        title: { en: "Silhouettes: the outer shape", hi: "सिल्हूट: बाहरी आकार" },
        min: 6,
        blocks: [
          { t: "p", text: {
            en: "A **silhouette** is the outer shape of an outfit, like its shadow on a wall. Before anyone sees colour or embroidery, they see this shape.",
            hi: "**सिल्हूट (Silhouette)** यानी आउटफिट का बाहरी आकार, जैसे दीवार पर उसकी परछाई। रंग या कढ़ाई से पहले लोग यही आकार देखते हैं।" } },
          { t: "p", text: {
            en: "Designers often name the basic shapes after **letters**. Look at each one and trace the letter in your mind.",
            hi: "डिज़ाइनर बेसिक आकारों को अक्सर **अंग्रेज़ी अक्षरों** के नाम से बुलाते हैं। हर एक को देखो और मन में वो अक्षर बनाओ।" } },
          { t: "gallery", cols: 3, items: [
            G("flat-dress", "a", "A-line", "ए-लाइन", "Narrow top, wide hem", "ऊपर पतला, नीचे चौड़ा"),
            G("flat-dress", "h", "H-line", "एच-लाइन", "Straight, no waist", "सीधा, कमर नहीं"),
            G("flat-dress", "x", "X-line", "एक्स-लाइन", "Fitted waist", "कमर पर फिट"),
            G("flat-dress", "y", "Y-line", "वाई-लाइन", "Wide shoulders, slim skirt", "चौड़े कंधे, पतली स्कर्ट"),
            G("flat-dress", "o", "O-line", "ओ-लाइन", "Round, cocoon", "गोल, कोकून जैसा"),
            G("flat-dress", "trapeze", "Trapeze", "ट्रपीज़", "Flares from the shoulder", "कंधे से ही फैलता है")
          ] },
          { t: "tip", kind: "remember", text: {
            en: "Most Indian kurtas are **A-line** or **H-line**. An Anarkali is a dramatic **X-line**: fitted at the waist, then a big flare.",
            hi: "ज़्यादातर कुर्ते **ए-लाइन** या **एच-लाइन** होते हैं। अनारकली एक ड्रामैटिक **एक्स-लाइन** है: कमर पर फिट, फिर बड़ा घेरा।" } },
          { t: "h", text: { en: "Famous dress styles", hi: "मशहूर ड्रेस स्टाइल" } },
          { t: "gallery", cols: 3, items: [
            G("flat-dress", "sheath", "Sheath", "शीथ", "Follows the body closely", "शरीर के साथ-साथ"),
            G("flat-dress", "empire", "Empire", "एम्पायर", "Waist just under the bust", "कमर बस्ट के ठीक नीचे"),
            G("flat-dress", "mermaid", "Mermaid", "मरमेड", "Flares at the knee", "घुटने पर फैलता है"),
            G("flat-dress", "ballgown", "Ball gown", "बॉल गाउन", "Fitted top, huge skirt", "फिट ऊपर, बहुत बड़ी स्कर्ट"),
            G("flat-dress", "wrap", "Wrap", "रैप", "Wraps and ties at the side", "लपेटकर साइड में बांधते हैं"),
            G("flat-dress", "shirtdress", "Shirt dress", "शर्ट ड्रेस", "A long shirt with a belt", "बेल्ट वाली लंबी शर्ट")
          ] },
          { t: "img", src: "assets/img/garment-details/ball-gown.jpg", caption: {
            en: "A 19th-century ball gown: a tiny fitted waist and a skirt held out by a hoop underneath.",
            hi: "19वीं सदी का बॉल गाउन: बहुत पतली फिट कमर और नीचे घेरे (हूप) से फैली हुई स्कर्ट।" } },
          { t: "terms", items: [
            { en: "Silhouette", hi: "सिल्हूट", def: { en: "The outer shape of a garment, like its shadow.", hi: "कपड़े का बाहरी आकार, उसकी परछाई जैसा।" } },
            { en: "A-line", hi: "ए-लाइन", def: { en: "Narrow at the top, gently wider at the hem, like the letter A.", hi: "ऊपर पतला, नीचे धीरे-धीरे चौड़ा, अक्षर A जैसा।" } },
            { en: "Fit and flare", hi: "फिट एंड फ्लेयर", def: { en: "Fitted on the body, then flaring out (an X-line).", hi: "शरीर पर फिट, फिर नीचे फैला हुआ (एक्स-लाइन)।" } },
            { en: "Empire line", hi: "एम्पायर लाइन", def: { en: "A seam just under the bust, with the skirt falling from there.", hi: "बस्ट के ठीक नीचे सिलाई, और वहीं से स्कर्ट गिरती है।" } }
          ] },
          { t: "try", text: {
            en: "Watch one Bollywood song. Pause on 3 outfits and write which silhouette each one is (A, H, X, Y or O).",
            hi: "कोई एक बॉलीवुड गाना देखो। 3 आउटफिट पर रोककर लिखो कि हर एक कौन सा सिल्हूट है (A, H, X, Y या O)।" } }
        ]
      },

      /* ---------------- 2. Necklines ---------------- */
      {
        id: "necklines",
        title: { en: "Necklines", hi: "नेकलाइन" },
        min: 5,
        blocks: [
          { t: "p", text: {
            en: "The **neckline** is the edge of a garment around your neck. It frames the face, so people notice it first.",
            hi: "**नेकलाइन (Neckline)** यानी कपड़े का वो किनारा जो गले के आसपास होता है। ये चेहरे को फ्रेम करती है, इसलिए सबसे पहले दिखती है।" } },
          { t: "gallery", cols: 3, items: [
            G("flat-neckline", "round", "Round", "राउंड"),
            G("flat-neckline", "scoop", "Scoop", "स्कूप", "Deeper and wider", "ज़्यादा गहरी, चौड़ी"),
            G("flat-neckline", "v", "V-neck", "वी-नेक"),
            G("flat-neckline", "square", "Square", "स्क्वेयर"),
            G("flat-neckline", "sweetheart", "Sweetheart", "स्वीटहार्ट", "Shaped like a heart top", "दिल के ऊपरी हिस्से जैसी"),
            G("flat-neckline", "boat", "Boat neck", "बोट नेक", "Wide, along the collarbone", "चौड़ी, कॉलरबोन के साथ-साथ")
          ] },
          { t: "gallery", cols: 3, items: [
            G("flat-neckline", "offshoulder", "Off-shoulder", "ऑफ़-शोल्डर"),
            G("flat-neckline", "halter", "Halter", "हॉल्टर", "Ties behind the neck", "गर्दन के पीछे बंधती है"),
            G("flat-neckline", "high", "High neck", "हाई नेक"),
            G("flat-neckline", "cowl", "Cowl", "काउल", "Soft folds that drape", "मुलायम लटकती सिलवटें"),
            G("flat-neckline", "keyhole", "Keyhole", "कीहोल", "A small opening", "एक छोटा सा कट"),
            G("flat-neckline", "oneshoulder", "One-shoulder", "वन-शोल्डर")
          ] },
          { t: "tip", kind: "tip", text: {
            en: "A **V-neck** makes the neck look longer: lovely for round faces. A **boat neck** makes shoulders look wider: great with saree blouses.",
            hi: "**वी-नेक** से गर्दन लंबी दिखती है: गोल चेहरे पर बहुत अच्छी लगती है। **बोट नेक** से कंधे चौड़े दिखते हैं: साड़ी ब्लाउज़ में बढ़िया।" } },
          { t: "tip", kind: "fact", text: {
            en: "Blouse necklines have desi names too: **paan** (betel-leaf) neck, **U-neck**, and the deep back with **dori** (tie strings).",
            hi: "ब्लाउज़ की नेकलाइन के देसी नाम भी होते हैं: **पान** नेक, **यू-नेक**, और **डोरी** वाला गहरा बैक।" } },
          { t: "terms", items: [
            { en: "Neckline", hi: "नेकलाइन", def: { en: "The shape of the garment's edge around the neck.", hi: "गले के आसपास कपड़े के किनारे का आकार।" } },
            { en: "Sweetheart neckline", hi: "स्वीटहार्ट नेकलाइन", def: { en: "A neckline with two curves, like the top of a heart.", hi: "दो गोलाइयों वाली नेकलाइन, दिल के ऊपरी हिस्से जैसी।" } },
            { en: "Halter", hi: "हॉल्टर", def: { en: "Straps that go around or tie behind the neck, leaving shoulders bare.", hi: "गर्दन के पीछे बंधने वाली स्ट्रैप, कंधे खुले रहते हैं।" } },
            { en: "Cowl neck", hi: "काउल नेक", def: { en: "Extra fabric at the neck that falls in soft folds.", hi: "गले पर एक्स्ट्रा कपड़ा जो मुलायम सिलवटों में गिरता है।" } }
          ] },
          { t: "try", text: {
            en: "Open your wardrobe. Find 3 different necklines and sketch each one in 1 minute. Write its name below.",
            hi: "अपनी अलमारी खोलो। 3 अलग नेकलाइन ढूंढो और हर एक का 1 मिनट में स्केच बनाओ। नीचे उसका नाम लिखो।" } }
        ]
      },

      /* ---------------- 3. Collars ---------------- */
      {
        id: "collars",
        title: { en: "Collars", hi: "कॉलर" },
        min: 5,
        blocks: [
          { t: "p", text: {
            en: "A **collar** is a separate piece of fabric sewn to the neckline. It can stand up, fold down, or lie flat on the shoulders.",
            hi: "**कॉलर (Collar)** कपड़े का अलग टुकड़ा है जो नेकलाइन पर सिला जाता है। ये खड़ा रह सकता है, मुड़ सकता है, या कंधों पर सपाट रह सकता है।" } },
          { t: "gallery", cols: 3, items: [
            G("flat-collar", "shirt", "Shirt collar", "शर्ट कॉलर", "Has a stand + fall", "स्टैंड + फ़ॉल"),
            G("flat-collar", "mandarin", "Mandarin", "मैंडरिन", "Only a stand: Nehru jacket", "सिर्फ़ स्टैंड: नेहरू जैकेट"),
            G("flat-collar", "peterpan", "Peter Pan", "पीटर पैन", "Flat with round ends", "सपाट, गोल कोने"),
            G("flat-collar", "shawl", "Shawl", "शॉल", "One smooth rolled curve", "एक लंबी मुड़ी गोलाई"),
            G("flat-collar", "notched", "Notched", "नॉच्ड", "Blazer collar with a V-cut", "ब्लेज़र कॉलर, V-कट के साथ"),
            G("flat-collar", "sailor", "Sailor", "सेलर", "Square flap at the back", "पीछे चौकोर फ़्लैप"),
            G("flat-collar", "bow", "Bow", "बो", "Ties into a bow", "बो में बंधता है"),
            G("flat-collar", "ruffle", "Ruffle", "रफ़ल"),
            G("flat-collar", "polo", "Polo", "पोलो", "Knit collar + buttons", "निट कॉलर + बटन")
          ] },
          { t: "img", src: "assets/img/garment-details/peter-pan-collar.jpg", caption: {
            en: "A white Peter Pan collar: flat, rounded, and sweet. It instantly makes an outfit look young.",
            hi: "सफ़ेद पीटर पैन कॉलर: सपाट, गोल और प्यारा। इससे आउटफिट तुरंत यंग लगता है।" } },
          { t: "tip", kind: "remember", text: {
            en: "A shirt collar has two parts: the **stand** (goes around the neck) and the **fall** (folds over it). A mandarin collar is just the stand.",
            hi: "शर्ट कॉलर के दो हिस्से होते हैं: **स्टैंड** (गर्दन के चारों ओर) और **फ़ॉल** (उसके ऊपर मुड़ा हुआ)। मैंडरिन कॉलर में सिर्फ़ स्टैंड होता है।" } },
          { t: "terms", items: [
            { en: "Collar stand", hi: "कॉलर स्टैंड", def: { en: "The upright band of a collar that goes around the neck.", hi: "कॉलर की खड़ी पट्टी जो गर्दन के चारों ओर जाती है।" } },
            { en: "Mandarin collar", hi: "मैंडरिन कॉलर", def: { en: "A short stand-up collar with no fold. Also called a band or Nehru collar.", hi: "छोटा खड़ा कॉलर, बिना मोड़ के। इसे बैंड या नेहरू कॉलर भी कहते हैं।" } },
            { en: "Peter Pan collar", hi: "पीटर पैन कॉलर", def: { en: "A flat collar with rounded ends.", hi: "गोल कोनों वाला सपाट कॉलर।" } },
            { en: "Lapel", hi: "लैपल", def: { en: "The folded-back front part of a blazer collar.", hi: "ब्लेज़र कॉलर का आगे का पीछे मुड़ा हुआ हिस्सा।" } }
          ] },
          { t: "try", text: {
            en: "Sketch the same simple kurta 3 times, each with a different collar: mandarin, shirt and Peter Pan. Which one do you like best?",
            hi: "एक ही सादा कुर्ता 3 बार बनाओ, हर बार अलग कॉलर के साथ: मैंडरिन, शर्ट और पीटर पैन। तुम्हें कौन सा सबसे अच्छा लगा?" } }
        ]
      },

      /* ---------------- 4. Sleeves ---------------- */
      {
        id: "sleeves",
        title: { en: "Sleeves", hi: "स्लीव (आस्तीन)" },
        min: 6,
        blocks: [
          { t: "p", text: {
            en: "**Sleeves** change the whole mood of a garment. A puff sleeve feels romantic, a cap sleeve feels neat, a bell sleeve feels boho.",
            hi: "**स्लीव (Sleeve)** यानी आस्तीन, पूरे कपड़े का मूड बदल देती है। पफ़ स्लीव रोमांटिक लगती है, कैप स्लीव साफ़-सुथरी, और बेल स्लीव बोहो।" } },
          { t: "gallery", cols: 3, items: [
            G("flat-sleeve", "sleeveless", "Sleeveless", "स्लीवलेस"),
            G("flat-sleeve", "cap", "Cap", "कैप", "Just covers the shoulder", "बस कंधा ढकती है"),
            G("flat-sleeve", "short", "Short", "शॉर्ट"),
            G("flat-sleeve", "puff", "Puff", "पफ़", "Gathered, rounded", "चुन्नट वाली, फूली हुई"),
            G("flat-sleeve", "flutter", "Flutter", "फ़्लटर", "Soft, wavy, loose", "मुलायम, लहरदार"),
            G("flat-sleeve", "threequarter", "Three-quarter", "थ्री-क्वार्टर", "Ends below the elbow", "कोहनी के नीचे तक")
          ] },
          { t: "gallery", cols: 3, items: [
            G("flat-sleeve", "full", "Full", "फ़ुल"),
            G("flat-sleeve", "bell", "Bell", "बेल", "Flares at the wrist", "कलाई पर फैलती है"),
            G("flat-sleeve", "bishop", "Bishop", "बिशप", "Full, gathered into a cuff", "चौड़ी, कफ़ में इकट्ठी"),
            G("flat-sleeve", "raglan", "Raglan", "रैगलन", "Seam runs to the neck", "सिलाई गले तक जाती है"),
            G("flat-sleeve", "kimono", "Kimono", "किमोनो", "Cut in one with the body", "बॉडी के साथ एक ही टुकड़ा"),
            G("flat-sleeve", "coldshoulder", "Cold-shoulder", "कोल्ड-शोल्डर", "Cut-out at the shoulder", "कंधे पर कट")
          ] },
          { t: "compare", items: [
            { title: { en: "1830s: gigot sleeves", hi: "1830 का दशक: जिगो स्लीव" }, src: "assets/img/garment-details/gigot-sleeves.jpg", points: [
              { en: "Huge at the top, tight at the wrist", hi: "ऊपर बहुत बड़ी, कलाई पर टाइट" },
              { en: "Also called leg-of-mutton", hi: "इसे लेग-ऑफ़-मटन भी कहते हैं" } ] },
            { title: { en: "1890s: puff sleeves", hi: "1890 का दशक: पफ़ स्लीव" }, src: "assets/img/garment-details/puff-sleeves-1890s.jpg", points: [
              { en: "Big puffs came back 60 years later", hi: "60 साल बाद बड़े पफ़ फिर लौटे" },
              { en: "Fashion repeats itself!", hi: "फ़ैशन खुद को दोहराता है!" } ] }
          ] },
          { t: "tip", kind: "mistake", text: {
            en: "Raglan and kimono sleeves have **no armhole seam** at the shoulder. Don't draw a shoulder seam on them in your flats.",
            hi: "रैगलन और किमोनो स्लीव में कंधे पर **आर्महोल की सिलाई नहीं** होती। अपने फ़्लैट स्केच में उन पर कंधे की सिलाई मत बनाना।" } },
          { t: "terms", items: [
            { en: "Armhole", hi: "आर्महोल", def: { en: "The opening in a garment where the sleeve is attached.", hi: "कपड़े का वो हिस्सा जहाँ स्लीव जुड़ती है।" } },
            { en: "Cuff", hi: "कफ़", def: { en: "A band at the end of a sleeve, around the wrist.", hi: "स्लीव के सिरे पर कलाई के चारों ओर की पट्टी।" } },
            { en: "Raglan sleeve", hi: "रैगलन स्लीव", def: { en: "A sleeve whose seam runs diagonally from the underarm to the neck.", hi: "ऐसी स्लीव जिसकी सिलाई बगल से तिरछी गले तक जाती है।" } },
            { en: "Puff sleeve", hi: "पफ़ स्लीव", def: { en: "A short sleeve gathered at the top and/or bottom so it puffs out.", hi: "छोटी स्लीव जो ऊपर या नीचे चुन्नट से फूली हुई रहती है।" } }
          ] },
          { t: "try", text: {
            en: "Draw one simple blouse 4 times with 4 sleeves: cap, puff, bell and three-quarter. Notice how the mood changes.",
            hi: "एक सादा ब्लाउज़ 4 बार बनाओ, 4 स्लीव के साथ: कैप, पफ़, बेल और थ्री-क्वार्टर। देखो मूड कैसे बदलता है।" } }
        ]
      },

      /* ---------------- 5. Skirts ---------------- */
      {
        id: "skirts",
        title: { en: "Skirts", hi: "स्कर्ट" },
        min: 5,
        blocks: [
          { t: "p", text: {
            en: "Every skirt is about **how much fabric** there is at the hem, and **how** it is controlled: pleats, gathers or flare.",
            hi: "हर स्कर्ट दो बातों पर टिकी है: हेम पर **कितना कपड़ा** है, और उसे **कैसे** संभाला गया है: प्लीट, चुन्नट या फ़्लेयर।" } },
          { t: "gallery", cols: 3, items: [
            G("flat-skirt", "straight", "Straight", "स्ट्रेट"),
            G("flat-skirt", "pencil", "Pencil", "पेंसिल", "Narrows at the knee", "घुटने पर पतली"),
            G("flat-skirt", "aline", "A-line", "ए-लाइन"),
            G("flat-skirt", "flared", "Flared / circle", "फ़्लेयर्ड / सर्कल", "Full circle of fabric", "पूरे गोल घेरे का कपड़ा"),
            G("flat-skirt", "pleated", "Pleated", "प्लीटेड", "Folded pleats", "तह वाली प्लीट"),
            G("flat-skirt", "gathered", "Gathered", "गैदर्ड", "Like a lehenga or ghagra", "लहंगे या घाघरे जैसी")
          ] },
          { t: "gallery", cols: 3, items: [
            G("flat-skirt", "wrap", "Wrap", "रैप"),
            G("flat-skirt", "tiered", "Tiered", "टियर्ड", "Layers of frills", "फ़्रिल की परतें"),
            G("flat-skirt", "mermaid", "Mermaid", "मरमेड"),
            G("flat-skirt", "tulip", "Tulip", "ट्यूलिप", "Overlapping petals", "पंखुड़ियों जैसी परतें"),
            G("flat-skirt", "highlow", "High-low", "हाई-लो", "Short front, long back", "आगे छोटी, पीछे लंबी"),
            G("flat-skirt", "bubble", "Bubble", "बबल", "Hem tucked under", "हेम अंदर मुड़ा हुआ")
          ] },
          { t: "compare", items: [
            { title: { en: "Pleats", hi: "प्लीट" }, dg: "flat-skirt", args: { type: "pleated" }, points: [
              { en: "Fabric **folded** in neat, pressed lines", hi: "कपड़ा सीधी, प्रेस की हुई लाइनों में **मोड़ा** जाता है" },
              { en: "Crisp, sharp, school-uniform look", hi: "करारा, साफ़, स्कूल यूनिफ़ॉर्म जैसा लुक" } ] },
            { title: { en: "Gathers", hi: "चुन्नट (गैदर)" }, dg: "flat-skirt", args: { type: "gathered" }, points: [
              { en: "Fabric **pulled** together on a thread", hi: "कपड़ा धागे पर **खींचकर** इकट्ठा किया जाता है" },
              { en: "Soft, full, puffy look", hi: "मुलायम, भरा हुआ, फूला लुक" } ] }
          ] },
          { t: "tip", kind: "fact", text: {
            en: "A lehenga is usually a **gathered** or **kalidar** skirt. Kalis are triangle panels: more kalis means a bigger flare.",
            hi: "लहंगा आमतौर पर **गैदर्ड** या **कलीदार** स्कर्ट होता है। कली यानी तिकोने टुकड़े: जितनी ज़्यादा कलियाँ, उतना बड़ा घेरा।" } },
          { t: "terms", items: [
            { en: "Pleat", hi: "प्लीट", def: { en: "A fold of fabric, pressed or stitched in place.", hi: "कपड़े की तह, जो प्रेस या सिलाई से टिकी रहती है।" } },
            { en: "Gathers", hi: "गैदर (चुन्नट)", def: { en: "Small soft folds made by pulling fabric along a thread.", hi: "धागे पर कपड़ा खींचकर बनी छोटी मुलायम सिलवटें।" } },
            { en: "Flare", hi: "फ़्लेयर", def: { en: "How much a garment widens towards the hem.", hi: "कपड़ा नीचे हेम की तरफ़ कितना चौड़ा होता है।" } },
            { en: "Kali", hi: "कली", def: { en: "A triangular panel used to add flare in kurtas and lehengas.", hi: "तिकोना टुकड़ा जो कुर्ते और लहंगे में घेरा बढ़ाता है।" } }
          ] },
          { t: "try", text: {
            en: "Take a dupatta. Make it into a skirt shape twice: once with pleats, once with gathers. Click a photo of both and compare.",
            hi: "एक दुपट्टा लो। उसे दो बार स्कर्ट का आकार दो: एक बार प्लीट से, एक बार चुन्नट से। दोनों की फ़ोटो लेकर तुलना करो।" } }
        ]
      },

      /* ---------------- 6. Trousers ---------------- */
      {
        id: "trousers",
        title: { en: "Trousers & pants", hi: "ट्राउज़र और पैंट" },
        min: 4,
        blocks: [
          { t: "p", text: {
            en: "Trousers are named mostly by the **leg shape**: how wide they are at the knee and at the ankle.",
            hi: "ट्राउज़र के नाम ज़्यादातर **पैर के आकार** से रखे जाते हैं: घुटने और टखने पर वो कितने चौड़े हैं।" } },
          { t: "gallery", cols: 3, items: [
            G("flat-trouser", "straight", "Straight", "स्ट्रेट"),
            G("flat-trouser", "skinny", "Skinny", "स्किनी", "Tight all the way", "पूरी तरह टाइट"),
            G("flat-trouser", "cigarette", "Cigarette", "सिगरेट", "Slim, ends at the ankle", "पतली, टखने तक"),
            G("flat-trouser", "bootcut", "Bootcut", "बूटकट", "Slight flare at the hem", "नीचे हल्का फैलाव"),
            G("flat-trouser", "flared", "Flared / bell-bottom", "फ़्लेयर्ड / बेल-बॉटम"),
            G("flat-trouser", "wideleg", "Wide-leg / palazzo", "वाइड-लेग / प्लाज़ो")
          ] },
          { t: "gallery", cols: 3, items: [
            G("flat-trouser", "harem", "Harem / dhoti", "हरेम / धोती", "Low, droopy crotch", "नीचे लटकता हिस्सा"),
            G("flat-trouser", "culottes", "Culottes", "कुलॉट्स", "Wide, cut at mid-calf", "चौड़ी, पिंडली तक"),
            G("flat-trouser", "joggers", "Joggers", "जॉगर्स", "Elastic at the ankle", "टखने पर इलास्टिक")
          ] },
          { t: "tip", kind: "tip", text: {
            en: "Indian bottoms map onto these: **churidar** = skinny with extra length, **salwar/patiala** = harem, **palazzo** = wide-leg.",
            hi: "देसी बॉटम्स भी इन्हीं से मिलते हैं: **चूड़ीदार** = लंबाई वाला स्किनी, **सलवार/पटियाला** = हरेम, **प्लाज़ो** = वाइड-लेग।" } },
          { t: "terms", items: [
            { en: "Inseam", hi: "इनसीम", def: { en: "The inner leg seam, from crotch to hem.", hi: "पैर की अंदर वाली सिलाई, क्रॉच से हेम तक।" } },
            { en: "Rise", hi: "राइज़", def: { en: "The distance from the crotch to the waistband: low, mid or high rise.", hi: "क्रॉच से वेस्टबैंड तक की दूरी: लो, मिड या हाई राइज़।" } },
            { en: "Palazzo", hi: "प्लाज़ो", def: { en: "Very wide, flowing trousers.", hi: "बहुत चौड़े, लहराते ट्राउज़र।" } }
          ] },
          { t: "try", text: {
            en: "Look at 5 people in your college or market. Note down the trouser style each one wears. Which is most common?",
            hi: "कॉलेज या बाज़ार में 5 लोगों को देखो। हर एक का ट्राउज़र स्टाइल लिखो। सबसे आम कौन सा है?" } }
        ]
      },

      /* ---------------- 7. Waistlines & lengths ---------------- */
      {
        id: "waistlines-lengths",
        title: { en: "Waistlines & hem lengths", hi: "वेस्टलाइन और हेम की लंबाई" },
        min: 4,
        blocks: [
          { t: "p", text: {
            en: "Where you place the **waistline** and where you stop the **hem** changes the proportions of the body.",
            hi: "**वेस्टलाइन** कहाँ रखी है और **हेम** कहाँ खत्म होता है, इससे शरीर का अनुपात (Proportion) बदल जाता है।" } },
          { t: "dg", name: "garment-waistlines", caption: {
            en: "Empire (under the bust), natural (the narrowest part), dropped (at the hips).",
            hi: "एम्पायर (बस्ट के नीचे), नैचुरल (सबसे पतला हिस्सा), ड्रॉप्ड (हिप्स पर)।" } },
          { t: "img", src: "assets/img/garment-details/empire-waist.jpg", caption: {
            en: "An empire-waist dress from around 1810. The high waist makes the legs look very long.",
            hi: "लगभग 1810 की एम्पायर-वेस्ट ड्रेस। ऊँची कमर से पैर बहुत लंबे दिखते हैं।" } },
          { t: "dg", name: "garment-hemlines", caption: {
            en: "The standard hem lengths, from mini to floor.",
            hi: "हेम की आम लंबाइयाँ, मिनी से फ़्लोर तक।" } },
          { t: "tip", kind: "remember", text: {
            en: "**Midi** ends mid-calf. **Maxi** ends at the ankle. **Floor-length** touches the floor (like most lehengas and gowns).",
            hi: "**मिडी** पिंडली के बीच तक। **मैक्सी** टखने तक। **फ़्लोर-लेंथ** ज़मीन छूती है (जैसे ज़्यादातर लहंगे और गाउन)।" } },
          { t: "terms", items: [
            { en: "Hemline", hi: "हेमलाइन", def: { en: "The bottom edge of a garment and its height on the body.", hi: "कपड़े का निचला किनारा और शरीर पर उसकी ऊँचाई।" } },
            { en: "Dropped waist", hi: "ड्रॉप्ड वेस्ट", def: { en: "A waist seam placed low, near the hips. Popular in the 1920s.", hi: "नीचे हिप्स के पास कमर की सिलाई। 1920 के दशक में बहुत चलन में थी।" } },
            { en: "Midi", hi: "मिडी", def: { en: "A length that ends around the middle of the calf.", hi: "पिंडली के बीच तक की लंबाई।" } }
          ] },
          { t: "try", text: {
            en: "Draw the same A-line dress 3 times: knee length, midi and maxi. Which length looks most elegant to you?",
            hi: "एक ही ए-लाइन ड्रेस 3 बार बनाओ: घुटने तक, मिडी और मैक्सी। तुम्हें कौन सी लंबाई सबसे सुंदर लगती है?" } }
        ]
      }
    ],
    quiz: [
      { q: { en: "Which silhouette is this?", hi: "ये कौन सा सिल्हूट है?" }, dg: "flat-dress", args: { type: "a" },
        options: [{ en: "A-line", hi: "ए-लाइन" }, { en: "H-line", hi: "एच-लाइन" }, { en: "Y-line", hi: "वाई-लाइन" }], answer: 0,
        why: { en: "Narrow at the top and wider at the hem, like the letter A.", hi: "ऊपर पतला और नीचे चौड़ा, अक्षर A जैसा।" } },
      { q: { en: "An empire waist sits…", hi: "एम्पायर वेस्ट कहाँ होती है?" },
        options: [{ en: "At the hips", hi: "हिप्स पर" }, { en: "Just under the bust", hi: "बस्ट के ठीक नीचे" }, { en: "At the natural waist", hi: "नैचुरल कमर पर" }], answer: 1,
        why: { en: "Empire = high waist, right under the bust.", hi: "एम्पायर = ऊँची कमर, बस्ट के ठीक नीचे।" } },
      { q: { en: "Which neckline is this?", hi: "ये कौन सी नेकलाइन है?" }, dg: "flat-neckline", args: { type: "sweetheart" },
        options: [{ en: "Scoop", hi: "स्कूप" }, { en: "Sweetheart", hi: "स्वीटहार्ट" }, { en: "Cowl", hi: "काउल" }], answer: 1,
        why: { en: "Two curves meeting in the middle, like the top of a heart.", hi: "बीच में मिलती दो गोलाइयाँ, दिल के ऊपरी हिस्से जैसी।" } },
      { q: { en: "A Nehru jacket has which collar?", hi: "नेहरू जैकेट में कौन सा कॉलर होता है?" },
        options: [{ en: "Mandarin", hi: "मैंडरिन" }, { en: "Peter Pan", hi: "पीटर पैन" }, { en: "Notched", hi: "नॉच्ड" }], answer: 0,
        why: { en: "A short standing band with no fold: the mandarin collar.", hi: "बिना मोड़ की छोटी खड़ी पट्टी: मैंडरिन कॉलर।" } },
      { q: { en: "Which sleeve is this?", hi: "ये कौन सी स्लीव है?" }, dg: "flat-sleeve", args: { type: "bell" },
        options: [{ en: "Bishop", hi: "बिशप" }, { en: "Puff", hi: "पफ़" }, { en: "Bell", hi: "बेल" }], answer: 2,
        why: { en: "It flares open at the wrist with no cuff.", hi: "ये कलाई पर बिना कफ़ के खुलकर फैलती है।" } },
      { q: { en: "Which sleeve has a seam running from the underarm up to the neck?", hi: "किस स्लीव की सिलाई बगल से गले तक जाती है?" },
        options: [{ en: "Cap", hi: "कैप" }, { en: "Raglan", hi: "रैगलन" }, { en: "Flutter", hi: "फ़्लटर" }], answer: 1,
        why: { en: "Raglan sleeves have a diagonal seam to the neck, common in sweatshirts.", hi: "रैगलन स्लीव में गले तक तिरछी सिलाई होती है, स्वेटशर्ट में आम है।" } },
      { q: { en: "Fabric pulled together on a thread to make soft folds is called…", hi: "धागे पर खींचकर बनी मुलायम सिलवटों को क्या कहते हैं?" },
        options: [{ en: "Pleats", hi: "प्लीट" }, { en: "Darts", hi: "डार्ट" }, { en: "Gathers", hi: "गैदर (चुन्नट)" }], answer: 2,
        why: { en: "Gathers are pulled; pleats are folded.", hi: "गैदर खींचे जाते हैं; प्लीट मोड़ी जाती हैं।" } },
      { q: { en: "Which skirt is this?", hi: "ये कौन सी स्कर्ट है?" }, dg: "flat-skirt", args: { type: "mermaid" },
        options: [{ en: "Mermaid", hi: "मरमेड" }, { en: "Tulip", hi: "ट्यूलिप" }, { en: "Pencil", hi: "पेंसिल" }], answer: 0,
        why: { en: "Fitted down to the knee, then it flares like a fish tail.", hi: "घुटने तक फिट, फिर मछली की पूँछ जैसी फैलती है।" } },
      { q: { en: "A palazzo is which trouser style?", hi: "प्लाज़ो कौन सा ट्राउज़र स्टाइल है?" },
        options: [{ en: "Skinny", hi: "स्किनी" }, { en: "Wide-leg", hi: "वाइड-लेग" }, { en: "Bootcut", hi: "बूटकट" }], answer: 1,
        why: { en: "Palazzos are very wide and flowing from hip to hem.", hi: "प्लाज़ो हिप से हेम तक बहुत चौड़े और लहराते हैं।" } },
      { q: { en: "A hem that ends at the middle of the calf is…", hi: "पिंडली के बीच तक खत्म होने वाला हेम क्या कहलाता है?" },
        options: [{ en: "Mini", hi: "मिनी" }, { en: "Maxi", hi: "मैक्सी" }, { en: "Midi", hi: "मिडी" }], answer: 2,
        why: { en: "Midi = middle of the calf. Maxi goes down to the ankle.", hi: "मिडी = पिंडली का बीच। मैक्सी टखने तक जाती है।" } }
    ]
  });
})();
