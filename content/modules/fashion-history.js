/* Module 12 - Fashion History & Designers */
(function () {
  function P(d, cls) { return '<path d="' + d + '" class="' + (cls || "ln") + '"/>'; }
  function L(x1, y1, x2, y2, cls) { return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" class="' + (cls || "ln") + '"/>'; }
  function C(x, y, r, cls) { return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" class="' + (cls || "ln") + '"/>'; }

  /* legs + shoes from the hem (y) down to the floor (164) */
  function legs(y, boots) {
    var s = P("M46 " + y + " L46 162 L41 164 M54 " + y + " L54 162 L59 164", "ln");
    if (boots) s += '<rect x="42" y="138" width="7" height="26" rx="2" class="fl"/><rect x="51" y="138" width="7" height="26" rx="2" class="fl"/>';
    return s;
  }
  function arms(x, y0, x1, y1) { return FD.mirror(50, P("M" + x + " " + y0 + " L" + x1 + " " + y1, "ln")); }

  /* One silhouette per era, drawn in a 100 x 170 box */
  var ERA = {
    "1900s": function () {
      return P("M30 7 Q50 -3 70 7 Q50 11 30 7 Z", "sf") + arms(61, 34, 68, 92) +
        FD.mirror(50, P("M50 22 L55 22 L56 30 L62 33 Q71 41 66 51 L57 60 Q64 66 66 80 Q72 120 82 160 L50 160", "fl")) +
        P("M45 22 L55 22", "ac") + P("M43 60 L57 60", "ac");
    },
    "1920s": function () {
      return arms(61, 33, 64, 90) + legs(108) +
        FD.mirror(50, P("M50 28 L56 26 L61 31 L63 62 L64 108 L50 108", "fl")) +
        P("M36 74 L64 74", "ac") + P("M54 74 L58 86", "ac") + P("M41 14 Q41 2 50 2 Q59 2 59 14 L63 16 L37 16 Z", "sf");
    },
    "1930s": function () {
      return arms(61, 33, 64, 92) +
        FD.mirror(50, P("M50 32 L56 27 L62 31 Q64 42 60 52 L57 60 Q63 70 62 82 Q59 118 60 140 Q64 154 72 162 L50 162", "fl")) +
        P("M40 64 L58 92 M42 96 L60 124 M42 128 L60 156", "gd");
    },
    "1940s": function () {
      return arms(66, 33, 66, 90) + legs(112) +
        FD.mirror(50, P("M50 30 L56 26 L67 30 L66 38 Q63 50 58 62 L60 70 L66 112 L50 112", "fl")) +
        P("M42 62 L58 62", "ac") + P("M50 30 L50 62", "ln") + P("M39 8 L61 8 L58 2 L44 2 Z", "sf");
    },
    "1950s": function () {
      return arms(61, 34, 64, 86) + legs(122) +
        FD.mirror(50, P("M50 32 L56 27 L61 32 Q63 44 56 60 Q66 64 74 84 Q84 110 84 120 Q68 125 50 125", "fl")) +
        P("M44 60 L56 60", "ac") + P("M50 64 Q48 96 40 123 M50 64 Q52 96 60 123 M44 64 Q36 96 24 120 M56 64 Q64 96 76 120", "gd");
    },
    "1960s": function () {
      return arms(61, 32, 63, 88) + legs(92, true) +
        FD.mirror(50, P("M50 26 L56 25 L61 31 L63 40 L67 92 L50 92", "fl")) +
        P("M37 64 L63 64", "gd") + P("M40 14 Q40 3 50 3 Q60 3 60 14 L61 20 L39 20 Z", "sf");
    },
    "1970s": function () {
      return arms(60, 32, 66, 90) +
        FD.mirror(50, P("M50 30 L56 27 L60 31 L58 60 L50 60", "fl")) +
        FD.mirror(50, P("M50 60 L59 60 L62 76 L59 116 L69 162 L52 162 L53 116 L50 86", "fl")) +
        P("M40 60 L60 60", "ac") + P("M41 14 Q38 32 34 40 M59 14 Q62 32 66 40", "ln");
    },
    "1980s": function () {
      return arms(71, 33, 70, 92) + legs(110) +
        FD.mirror(50, P("M50 30 L56 27 L72 31 L70 44 Q62 54 58 62 Q64 70 64 76 L59 78 L60 110 L50 110", "fl")) +
        FD.mirror(50, P("M50 30 L56 27 M50 30 L56 56 L50 62", "ln")) + P("M50 62 L50 78", "ln") + C(50, 68, 1.5, "acf");
    },
    "1990s": function () {
      return arms(57, 30, 63, 90) + legs(134) +
        FD.mirror(50, P("M56 27 L57 41", "ln")) +
        FD.mirror(50, P("M50 44 Q55 38 58 41 Q59 52 57 62 Q61 74 60 92 L61 134 L50 134", "fl"));
    },
    "2000s": function () {
      return arms(60, 31, 64, 90) +
        P("M42 56 L41 70 M58 56 L59 70", "ln") +
        FD.mirror(50, P("M50 28 L56 26 L60 31 L59 56 L50 56", "fl")) +
        FD.mirror(50, P("M50 70 L60 70 L62 80 L59 116 L66 162 L53 162 L52 116 L50 88", "fl")) +
        P("M41 70 L59 70", "ac") + P("M48 58 Q50 61 52 58", "ln");
    },
    "2010s": function () {
      return P("M40 18 Q40 4 50 4 Q60 4 60 18 L58 24 L42 24 Z", "sf") +
        FD.mirror(50, P("M50 26 L56 25 L64 32 L72 84 L66 86 L62 50 L63 86 L50 86", "fl")) +
        FD.mirror(50, P("M50 86 L62 86 L58 120 L56 154 L51 154 L51 120 L50 98", "fl")) +
        FD.mirror(50, P("M50 154 L58 154 L60 162 L46 163 Z", "acf")) + P("M42 64 L58 64", "gd") + P("M50 26 L50 40", "ln");
    }
  };
  function figure(era) {
    return (ERA[era] || ERA["1920s"])() + C(50, 13, 8, "ln") + P("M47 21 L47 26 M53 21 L53 26", "ln");
  }

  FD.diagram("fashion-history-silhouette", function (a, lang) {
    return FD.svg(100, 170, figure(a.era || "1920s"));
  });

  /* All the silhouettes in a row - the big picture */
  FD.diagram("fashion-history-overview", function (a, lang) {
    var eras = a.eras || ["1900s", "1920s", "1930s", "1940s", "1950s", "1960s", "1970s", "1980s", "1990s", "2000s", "2010s"];
    var perRow = 6, w = 56, s = "";
    eras.forEach(function (e, i) {
      var r = Math.floor(i / perRow), c = i % perRow;
      var x = c * w + (r ? w / 2 : 0), y = r * 118;
      s += '<g transform="translate(' + x + " " + y + ') scale(0.56)">' + figure(e) + "</g>";
      s += FD.text(x + 28, y + 108, e, { cls: "tx", size: 10 });
    });
    return FD.svg(336, 236, s);
  });

  /* How hemlines went up and down */
  FD.diagram("fashion-history-hemlines", function (a, lang) {
    var levels = [
      { y: 30, t: { en: "Floor", hi: "ज़मीन" } },
      { y: 58, t: { en: "Ankle", hi: "टखना" } },
      { y: 86, t: { en: "Mid-calf", hi: "पिंडली" } },
      { y: 114, t: { en: "Knee", hi: "घुटना" } },
      { y: 142, t: { en: "Thigh", hi: "जांघ" } }
    ];
    var pts = [["1900", 0], ["1910", 1], ["1920s", 3], ["1930s", 2], ["1940s", 3], ["1950s", 2], ["1960s", 4], ["1970s", 2], ["1980s", 3]];
    var s = "", x0 = 62, dx = 31;
    levels.forEach(function (l) {
      s += L(x0 - 6, l.y, x0 + dx * (pts.length - 1) + 6, l.y, "gd");
      s += FD.text(x0 - 10, l.y + 3, FD.tx(l.t, lang), { cls: "tm", size: 9, anchor: "end" });
    });
    var d = "";
    pts.forEach(function (p, i) { d += (i ? " L" : "M") + (x0 + i * dx) + " " + levels[p[1]].y; });
    s += P(d, "ac");
    pts.forEach(function (p, i) {
      var x = x0 + i * dx;
      s += C(x, levels[p[1]].y, 3.5, "acf");
      s += FD.text(x, 166, p[0], { cls: "tm", size: 8 });
    });
    s += FD.text(170, 14, FD.tx({ en: "Typical day-dress hemline", hi: "आम दिन की ड्रेस की हेमलाइन" }, lang), { cls: "tx", size: 10 });
    return FD.svg(330, 176, s);
  });
})();

FD.module({
  "id": "fashion-history",
  "num": 12,
  "level": "basic",
  "title": {
    "en": "Fashion History & Designers",
    "hi": "फ़ैशन का इतिहास और डिज़ाइनर"
  },
  "tagline": {
    "en": "From corsets to crop tops: how fashion changed, and the designers who changed it",
    "hi": "कॉर्सेट से क्रॉप टॉप तक: फ़ैशन कैसे बदला, और किन डिज़ाइनरों ने उसे बदला"
  },
  "cover": "assets/img/fashion-history/cover.jpg",
  "learn": [
    {
      "en": "Place each decade's silhouette on a timeline",
      "hi": "हर दशक की सिल्हूट को टाइमलाइन पर पहचानना"
    },
    {
      "en": "Know why events like war, cinema and youth culture changed clothes",
      "hi": "समझना कि युद्ध, सिनेमा और युवा संस्कृति ने कपड़े कैसे बदले"
    },
    {
      "en": "Recognise 6 global designers and what each one changed",
      "hi": "6 वैश्विक डिज़ाइनरों को पहचानना और जानना कि हर एक ने क्या बदला"
    },
    {
      "en": "Know the key Indian designers, NIFT and Lakme Fashion Week",
      "hi": "मुख्य भारतीय डिज़ाइनर, NIFT और लैक्मे फ़ैशन वीक को जानना"
    }
  ],
  "lessons": [
    {
      "id": "why-history",
      "title": {
        "en": "Why Study Fashion History?",
        "hi": "फ़ैशन का इतिहास क्यों पढ़ें?"
      },
      "min": 5,
      "blocks": [
        {
          "t": "p",
          "text": {
            "en": "Fashion is never brand new. A 'trending' bell-bottom is a 1970s idea. A designer who knows history can **borrow smartly** instead of copying by accident.",
            "hi": "फ़ैशन कभी पूरी तरह नया नहीं होता। 'ट्रेंडिंग' बेल-बॉटम 1970 के दशक का आइडिया है। जो डिज़ाइनर इतिहास जानता है, वो **समझदारी से उधार** ले सकता है, गलती से कॉपी नहीं करता।"
          }
        },
        {
          "t": "dg",
          "name": "fashion-history-overview",
          "caption": {
            "en": "The big picture: one silhouette for each era.",
            "hi": "पूरी तस्वीर: हर दौर की एक सिल्हूट।"
          }
        },
        {
          "t": "cards",
          "items": [
            {
              "icon": "bulb",
              "title": {
                "en": "Get ideas",
                "hi": "आइडिया मिलते हैं"
              },
              "text": {
                "en": "Old garments, prints and shapes are a free idea bank.",
                "hi": "पुराने कपड़े, प्रिंट और आकार आइडिया का मुफ़्त बैंक हैं।"
              }
            },
            {
              "icon": "eye",
              "title": {
                "en": "Read trends",
                "hi": "ट्रेंड समझते हैं"
              },
              "text": {
                "en": "Trends come back in cycles, about every 20 to 30 years.",
                "hi": "ट्रेंड चक्र में लौटते हैं, लगभग हर 20 से 30 साल में।"
              }
            },
            {
              "icon": "globe",
              "title": {
                "en": "Understand why",
                "hi": "वजह समझते हैं"
              },
              "text": {
                "en": "Wars, money, films and music all shape what people wear.",
                "hi": "युद्ध, पैसा, फ़िल्में और संगीत सब पहनावे को आकार देते हैं।"
              }
            },
            {
              "icon": "award",
              "title": {
                "en": "Speak the language",
                "hi": "भाषा आती है"
              },
              "text": {
                "en": "Clients and teachers expect you to know the famous names.",
                "hi": "क्लाइंट और टीचर उम्मीद करते हैं कि तुम मशहूर नाम जानती हो।"
              }
            }
          ]
        },
        {
          "t": "dg",
          "name": "fashion-history-hemlines",
          "caption": {
            "en": "Hemlines rise and fall with the mood of each decade.",
            "hi": "हर दशक के मूड के साथ हेमलाइन ऊपर-नीचे होती रही।"
          }
        },
        {
          "t": "timeline",
          "items": [
            {
              "when": "1900s",
              "title": {
                "en": "Corsets and long skirts",
                "hi": "कॉर्सेट और लंबे स्कर्ट"
              }
            },
            {
              "when": "1920s",
              "title": {
                "en": "Freedom: short, loose dresses",
                "hi": "आज़ादी: छोटी, ढीली ड्रेस"
              }
            },
            {
              "when": "1940s",
              "title": {
                "en": "War: simple and practical",
                "hi": "युद्ध: सादा और काम का"
              }
            },
            {
              "when": "1950s",
              "title": {
                "en": "Glamour: tiny waist, full skirt",
                "hi": "ग्लैमर: पतली कमर, घेरदार स्कर्ट"
              }
            },
            {
              "when": "1960s",
              "title": {
                "en": "Youth: the mini skirt",
                "hi": "युवा: मिनी स्कर्ट"
              }
            },
            {
              "when": "1970s",
              "title": {
                "en": "Boho, disco and flares",
                "hi": "बोहो, डिस्को और फ़्लेयर"
              }
            },
            {
              "when": "1980s",
              "title": {
                "en": "Power dressing",
                "hi": "पावर ड्रेसिंग"
              }
            },
            {
              "when": "1990s",
              "title": {
                "en": "Minimal and grunge",
                "hi": "मिनिमल और ग्रंज"
              }
            },
            {
              "when": "2000s",
              "title": {
                "en": "Y2K and fast fashion",
                "hi": "Y2K और फ़ास्ट फ़ैशन"
              }
            },
            {
              "when": "2010s+",
              "title": {
                "en": "Athleisure and sustainability",
                "hi": "एथलेज़र और टिकाऊ फ़ैशन"
              }
            }
          ]
        },
        {
          "t": "tip",
          "kind": "remember",
          "text": {
            "en": "A **silhouette** is the outer shape of an outfit, like its shadow. Each decade has its own famous silhouette.",
            "hi": "**सिल्हूट (Silhouette)** यानी आउटफ़िट का बाहरी आकार, जैसे उसकी परछाई। हर दशक की अपनी मशहूर सिल्हूट होती है।"
          }
        },
        {
          "t": "terms",
          "items": [
            {
              "en": "Silhouette",
              "hi": "सिल्हूट",
              "def": {
                "en": "The outer shape of a garment or outfit.",
                "hi": "कपड़े या आउटफ़िट का बाहरी आकार।"
              }
            },
            {
              "en": "Hemline",
              "hi": "हेमलाइन",
              "def": {
                "en": "The bottom edge of a skirt or dress, and how high it falls.",
                "hi": "स्कर्ट या ड्रेस का निचला किनारा, और वो कितना ऊपर है।"
              }
            },
            {
              "en": "Trend cycle",
              "hi": "ट्रेंड साइकल",
              "def": {
                "en": "The way old styles return after some decades.",
                "hi": "पुराने स्टाइल का कुछ दशकों बाद लौटना।"
              }
            },
            {
              "en": "Era",
              "hi": "दौर",
              "def": {
                "en": "A period of time with a shared look, like the 1920s.",
                "hi": "एक समय जिसका अपना लुक होता है, जैसे 1920 का दशक।"
              }
            }
          ]
        },
        {
          "t": "try",
          "text": {
            "en": "Ask an older family member for photos from their youth. Which decade is it? Note the silhouette, hemline and colours.",
            "hi": "घर के किसी बड़े से उनकी जवानी की फ़ोटो मांगो। ये कौन सा दशक है? सिल्हूट, हेमलाइन और रंग लिखो।"
          }
        }
      ]
    },
    {
      "id": "1900s-1940s",
      "title": {
        "en": "1900s to 1940s",
        "hi": "1900 से 1940 का दौर"
      },
      "min": 6,
      "blocks": [
        {
          "t": "p",
          "text": {
            "en": "These four decades went from tight corsets to loose flapper dresses, then to silky gowns and wartime rules. Women's lives changed fast, and so did their clothes.",
            "hi": "इन चार दशकों में टाइट कॉर्सेट से ढीली फ़्लैपर ड्रेस, फिर सिल्की गाउन और युद्ध के नियमों तक का सफ़र हुआ। महिलाओं की ज़िंदगी तेज़ी से बदली, और कपड़े भी।"
          }
        },
        {
          "t": "gallery",
          "cols": 2,
          "items": [
            {
              "dg": "fashion-history-silhouette",
              "args": {
                "era": "1900s"
              },
              "label": {
                "en": "1900s",
                "hi": "1900 का दशक"
              },
              "note": {
                "en": "S-bend corset, floor-length skirt",
                "hi": "S-बेंड कॉर्सेट, ज़मीन तक स्कर्ट"
              }
            },
            {
              "dg": "fashion-history-silhouette",
              "args": {
                "era": "1920s"
              },
              "label": {
                "en": "1920s",
                "hi": "1920 का दशक"
              },
              "note": {
                "en": "Straight, dropped waist",
                "hi": "सीधी ड्रेस, नीची कमर"
              }
            },
            {
              "dg": "fashion-history-silhouette",
              "args": {
                "era": "1930s"
              },
              "label": {
                "en": "1930s",
                "hi": "1930 का दशक"
              },
              "note": {
                "en": "Bias-cut, body skimming",
                "hi": "बायस कट, शरीर पर बहता"
              }
            },
            {
              "dg": "fashion-history-silhouette",
              "args": {
                "era": "1940s"
              },
              "label": {
                "en": "1940s",
                "hi": "1940 का दशक"
              },
              "note": {
                "en": "Square shoulders, knee length",
                "hi": "चौकोर कंधे, घुटने तक"
              }
            }
          ]
        },
        {
          "t": "timeline",
          "items": [
            {
              "when": "1900s",
              "src": "assets/img/fashion-history/edwardian-dress.jpg",
              "title": {
                "en": "Edwardian S-bend",
                "hi": "एडवर्डियन S-बेंड"
              },
              "text": {
                "en": "A tight corset pushed the chest forward and the hips back, making an S shape. Skirts touched the floor and hats were huge.",
                "hi": "टाइट कॉर्सेट सीने को आगे और कूल्हों को पीछे धकेलता था, जिससे S आकार बनता था। स्कर्ट ज़मीन छूती थी और हैट बहुत बड़े होते थे।"
              }
            },
            {
              "when": "1910s",
              "title": {
                "en": "Poiret frees the body",
                "hi": "प्वारे ने शरीर को आज़ाद किया"
              },
              "text": {
                "en": "Paul Poiret designed high-waisted, corset-free dresses, and even harem pants.",
                "hi": "पॉल प्वारे ने ऊंची कमर वाली, बिना कॉर्सेट की ड्रेस और हरम पैंट तक डिज़ाइन कीं।"
              }
            },
            {
              "when": "1920s",
              "src": "assets/img/fashion-history/flapper-1920s.jpg",
              "title": {
                "en": "The flapper",
                "hi": "फ़्लैपर"
              },
              "text": {
                "en": "Loose, straight dresses with a low waist. Hemlines rose to the knee by about 1926. Short bobbed hair and cloche hats finished the look.",
                "hi": "नीची कमर वाली ढीली, सीधी ड्रेस। लगभग 1926 तक हेमलाइन घुटने तक आ गई। छोटे बॉब बाल और क्लोश हैट से लुक पूरा होता था।"
              }
            },
            {
              "when": "1926",
              "title": {
                "en": "The little black dress",
                "hi": "लिटिल ब्लैक ड्रेस"
              },
              "text": {
                "en": "Coco Chanel made a simple black dress a wardrobe essential.",
                "hi": "कोको शैनल ने एक सादी काली ड्रेस को हर अलमारी की ज़रूरत बना दिया।"
              }
            },
            {
              "when": "1930s",
              "src": "assets/img/fashion-history/vionnet-gown.jpg",
              "title": {
                "en": "Bias-cut glamour",
                "hi": "बायस-कट ग्लैमर"
              },
              "text": {
                "en": "Madeleine Vionnet cut fabric on the bias (diagonally), so it stretched and hugged the body. Think Hollywood evening gowns.",
                "hi": "मैडलीन वियोने ने कपड़े को बायस (तिरछा) काटा, जिससे वो खिंचकर शरीर पर फ़िट होता था। हॉलीवुड के इवनिंग गाउन सोचो।"
              }
            },
            {
              "when": "1937",
              "title": {
                "en": "Schiaparelli's surrealism",
                "hi": "शियापरेली का सरियलिज़्म"
              },
              "text": {
                "en": "Elsa Schiaparelli worked with the artist Dali on the famous lobster dress and made 'shocking pink' famous.",
                "hi": "एल्सा शियापरेली ने कलाकार डाली के साथ मशहूर लॉबस्टर ड्रेस बनाई और 'शॉकिंग पिंक' रंग को मशहूर किया।"
              }
            },
            {
              "when": "1940s",
              "src": "assets/img/fashion-history/utility-1940s.jpg",
              "title": {
                "en": "Wartime utility",
                "hi": "युद्ध का दौर: उपयोगी कपड़े"
              },
              "text": {
                "en": "World War II meant rationing. In Britain the Utility scheme (1941) limited cloth, buttons and trims. Skirts got shorter and shoulders squarer.",
                "hi": "दूसरे विश्व युद्ध में कपड़ों की राशनिंग हुई। ब्रिटेन में यूटिलिटी योजना (1941) ने कपड़े, बटन और ट्रिम सीमित कर दिए। स्कर्ट छोटे और कंधे चौकोर हो गए।"
              }
            }
          ]
        },
        {
          "t": "tip",
          "kind": "fact",
          "text": {
            "en": "In World War II, many women started wearing trousers for factory work. After the war, trousers stayed in wardrobes.",
            "hi": "दूसरे विश्व युद्ध में कई महिलाओं ने फ़ैक्टरी के काम के लिए पैंट पहननी शुरू की। युद्ध के बाद भी पैंट अलमारियों में बनी रही।"
          }
        },
        {
          "t": "terms",
          "items": [
            {
              "en": "Corset",
              "hi": "कॉर्सेट",
              "def": {
                "en": "A stiff, tight undergarment that shapes the waist.",
                "hi": "कमर को आकार देने वाला सख़्त, टाइट अंदर का कपड़ा।"
              }
            },
            {
              "en": "Bias cut",
              "hi": "बायस कट",
              "def": {
                "en": "Cutting fabric diagonally so it drapes and stretches.",
                "hi": "कपड़े को तिरछा काटना ताकि वो बहता और खिंचता है।"
              }
            },
            {
              "en": "Flapper",
              "hi": "फ़्लैपर",
              "def": {
                "en": "A young, fashionable woman of the 1920s.",
                "hi": "1920 के दशक की युवा, फ़ैशनेबल लड़की।"
              }
            },
            {
              "en": "Rationing",
              "hi": "राशनिंग",
              "def": {
                "en": "Limits on how much cloth people could buy in wartime.",
                "hi": "युद्ध में लोग कितना कपड़ा खरीद सकते हैं, इस पर सीमा।"
              }
            }
          ]
        },
        {
          "t": "try",
          "text": {
            "en": "Sketch the 1920s flapper dress. Then redesign it as a modern kurta with a dropped waist.",
            "hi": "1920 की फ़्लैपर ड्रेस का स्केच बनाओ। फिर उसे नीची कमर वाले आधुनिक कुर्ते के रूप में दोबारा डिज़ाइन करो।"
          }
        }
      ]
    },
    {
      "id": "1950s-1970s",
      "title": {
        "en": "1950s to 1970s",
        "hi": "1950 से 1970 का दौर"
      },
      "min": 6,
      "blocks": [
        {
          "t": "p",
          "text": {
            "en": "After the war, people wanted beauty again. Then the young took over: miniskirts, space helmets, flower power and glitter.",
            "hi": "युद्ध के बाद लोग फिर से सुंदरता चाहते थे। फिर युवाओं ने कमान संभाली: मिनी स्कर्ट, स्पेस हेलमेट, फ़्लावर पावर और चमक-दमक।"
          }
        },
        {
          "t": "gallery",
          "cols": 3,
          "items": [
            {
              "dg": "fashion-history-silhouette",
              "args": {
                "era": "1950s"
              },
              "label": {
                "en": "1950s",
                "hi": "1950 का दशक"
              }
            },
            {
              "dg": "fashion-history-silhouette",
              "args": {
                "era": "1960s"
              },
              "label": {
                "en": "1960s",
                "hi": "1960 का दशक"
              }
            },
            {
              "dg": "fashion-history-silhouette",
              "args": {
                "era": "1970s"
              },
              "label": {
                "en": "1970s",
                "hi": "1970 का दशक"
              }
            }
          ]
        },
        {
          "t": "timeline",
          "items": [
            {
              "when": "1947",
              "src": "assets/img/fashion-history/dior-new-look.jpg",
              "title": {
                "en": "Dior's New Look",
                "hi": "डियोर का न्यू लुक"
              },
              "text": {
                "en": "Christian Dior showed soft shoulders, a tiny waist and a very full skirt. After years of war cloth shortage, it felt like luxury. A journalist called it a 'new look'.",
                "hi": "क्रिश्चियन डियोर ने नरम कंधे, पतली कमर और बहुत घेरदार स्कर्ट दिखाई। युद्ध में कपड़े की कमी के बाद ये लग्ज़री जैसा लगा। एक पत्रकार ने इसे 'न्यू लुक' कहा।"
              }
            },
            {
              "when": "1950s",
              "title": {
                "en": "Teens and jeans",
                "hi": "टीनएजर और जीन्स"
              },
              "text": {
                "en": "For the first time, teenagers had their own style: jeans, leather jackets, poodle skirts.",
                "hi": "पहली बार टीनएजर्स का अपना स्टाइल बना: जीन्स, लेदर जैकेट, पूडल स्कर्ट।"
              }
            },
            {
              "when": "1960s",
              "src": "assets/img/fashion-history/mary-quant.jpg",
              "title": {
                "en": "Mod and the mini",
                "hi": "मॉड और मिनी"
              },
              "text": {
                "en": "In London, Mary Quant made the miniskirt famous. Bold geometric prints, shift dresses and short bob haircuts defined 'mod' style.",
                "hi": "लंदन में मैरी क्वांट ने मिनी स्कर्ट को मशहूर किया। बोल्ड ज्यामितीय प्रिंट, शिफ़्ट ड्रेस और छोटे बॉब कट ने 'मॉड' स्टाइल बनाया।"
              }
            },
            {
              "when": "1960s",
              "src": "assets/img/fashion-history/space-age-1960s.jpg",
              "title": {
                "en": "Space age",
                "hi": "स्पेस एज"
              },
              "text": {
                "en": "Courreges, Pierre Cardin and Paco Rabanne dreamed of the future: white boots, metal discs, plastic, clean shapes.",
                "hi": "कुरेज़, पियरे कार्दें और पाको रबान ने भविष्य के सपने बुने: सफ़ेद बूट, धातु की चकतियां, प्लास्टिक, साफ़ आकार।"
              }
            },
            {
              "when": "1970s",
              "src": "assets/img/fashion-history/hippie-1970s.jpg",
              "title": {
                "en": "Boho and hippie",
                "hi": "बोहो और हिप्पी"
              },
              "text": {
                "en": "Flowing maxi dresses, embroidery, tie-dye and fringes. Many ideas came from Indian crafts, like block prints and kurtas.",
                "hi": "लहराती मैक्सी ड्रेस, कढ़ाई, टाई-डाई और झालर। कई आइडिया भारतीय हस्तकला से आए, जैसे ब्लॉक प्रिंट और कुर्ते।"
              }
            },
            {
              "when": "1970s",
              "src": "assets/img/fashion-history/bell-bottoms.jpg",
              "title": {
                "en": "Bell-bottoms",
                "hi": "बेल-बॉटम"
              },
              "text": {
                "en": "Trousers fitted at the thigh and flared at the hem. They were worn by everyone, in Hollywood and in Bollywood.",
                "hi": "जांघ पर फ़िट और नीचे से फैली पैंट। इन्हें हर कोई पहनता था, हॉलीवुड और बॉलीवुड दोनों में।"
              }
            },
            {
              "when": "1970s",
              "src": "assets/img/fashion-history/disco-1970s.jpg",
              "title": {
                "en": "Disco glam",
                "hi": "डिस्को ग्लैम"
              },
              "text": {
                "en": "Shiny fabrics, jumpsuits and the wrap dress (Diane von Furstenberg, 1974) for dancing all night.",
                "hi": "रात भर नाचने के लिए चमकीले कपड़े, जम्पसूट और रैप ड्रेस (डायन वॉन फ़र्स्टनबर्ग, 1974)।"
              }
            }
          ]
        },
        {
          "t": "tip",
          "kind": "fact",
          "text": {
            "en": "Yves Saint Laurent's 1965 Mondrian dress turned an artist's grid painting into a dress. Art and fashion have been friends ever since.",
            "hi": "इव सां लोरां की 1965 की मॉन्ड्रियान ड्रेस ने एक कलाकार की ग्रिड पेंटिंग को ड्रेस बना दिया। तब से कला और फ़ैशन दोस्त हैं।"
          }
        },
        {
          "t": "terms",
          "items": [
            {
              "en": "New Look",
              "hi": "न्यू लुक",
              "def": {
                "en": "Dior's 1947 style: tiny waist and full skirt.",
                "hi": "डियोर का 1947 का स्टाइल: पतली कमर और घेरदार स्कर्ट।"
              }
            },
            {
              "en": "Mod",
              "hi": "मॉड",
              "def": {
                "en": "A 1960s London youth style with geometric prints and short hems.",
                "hi": "1960 के लंदन का युवा स्टाइल, ज्यामितीय प्रिंट और छोटी हेम के साथ।"
              }
            },
            {
              "en": "Shift dress",
              "hi": "शिफ़्ट ड्रेस",
              "def": {
                "en": "A straight dress that skims the body without a waist seam.",
                "hi": "सीधी ड्रेस जो बिना कमर की सिलाई के शरीर पर सरकती है।"
              }
            },
            {
              "en": "Bell-bottoms",
              "hi": "बेल-बॉटम",
              "def": {
                "en": "Trousers that flare out below the knee.",
                "hi": "घुटने के नीचे से फैलने वाली पैंट।"
              }
            }
          ]
        },
        {
          "t": "try",
          "text": {
            "en": "Make a 3-panel mood board: one 1950s, one 1960s, one 1970s look. Note one thing you'd borrow from each.",
            "hi": "3 हिस्सों का मूड बोर्ड बनाओ: एक 1950, एक 1960, एक 1970 का लुक। हर एक से एक चीज़ लिखो जो तुम उधार लोगी।"
          }
        }
      ]
    },
    {
      "id": "1980s-today",
      "title": {
        "en": "1980s to Today",
        "hi": "1980 से आज तक"
      },
      "min": 6,
      "blocks": [
        {
          "t": "p",
          "text": {
            "en": "The last forty years moved fast: shoulder pads, grunge, low-rise jeans, then cheap clothes made quickly, then a push for clothes that last.",
            "hi": "पिछले चालीस साल तेज़ी से बदले: शोल्डर पैड, ग्रंज, लो-राइज़ जीन्स, फिर जल्दी बनने वाले सस्ते कपड़े, और अब टिकाऊ कपड़ों की मांग।"
          }
        },
        {
          "t": "gallery",
          "cols": 3,
          "items": [
            {
              "dg": "fashion-history-silhouette",
              "args": {
                "era": "1980s"
              },
              "label": {
                "en": "1980s",
                "hi": "1980 का दशक"
              }
            },
            {
              "dg": "fashion-history-silhouette",
              "args": {
                "era": "1990s"
              },
              "label": {
                "en": "1990s",
                "hi": "1990 का दशक"
              }
            },
            {
              "dg": "fashion-history-silhouette",
              "args": {
                "era": "2000s"
              },
              "label": {
                "en": "2000s",
                "hi": "2000 का दशक"
              }
            }
          ]
        },
        {
          "t": "timeline",
          "items": [
            {
              "when": "1980s",
              "title": {
                "en": "Power dressing",
                "hi": "पावर ड्रेसिंग"
              },
              "text": {
                "en": "As more women entered offices, suits with big shoulder pads gave a strong, confident look. Giorgio Armani's soft tailoring became famous.",
                "hi": "जैसे-जैसे ज़्यादा महिलाएं ऑफ़िस में आईं, बड़े शोल्डर पैड वाले सूट ने मज़बूत, आत्मविश्वासी लुक दिया। जॉर्जियो अरमानी की नरम टेलरिंग मशहूर हुई।"
              }
            },
            {
              "when": "1990s",
              "src": "assets/img/fashion-history/grunge-1990s.jpg",
              "title": {
                "en": "Minimalism and grunge",
                "hi": "मिनिमलिज़्म और ग्रंज"
              },
              "text": {
                "en": "Two opposite moods: clean, simple slip dresses and neutral colours, and messy grunge with flannel shirts, ripped jeans and boots.",
                "hi": "दो उल्टे मूड: साफ़, सादी स्लिप ड्रेस और न्यूट्रल रंग, और बिखरा हुआ ग्रंज जिसमें फ़्लानेल शर्ट, फटी जीन्स और बूट।"
              }
            },
            {
              "when": "2000s",
              "title": {
                "en": "Y2K",
                "hi": "वाई2के (Y2K)"
              },
              "text": {
                "en": "Low-rise jeans, crop tops, butterfly clips, metallic and tiny bags. Y2K came back strongly in the 2020s.",
                "hi": "लो-राइज़ जीन्स, क्रॉप टॉप, बटरफ़्लाई क्लिप, मेटैलिक चीज़ें और छोटे बैग। Y2K 2020 के दशक में ज़ोर से लौटा।"
              }
            },
            {
              "when": "2000s",
              "src": "assets/img/fashion-history/fast-fashion-store.jpg",
              "title": {
                "en": "Fast fashion",
                "hi": "फ़ास्ट फ़ैशन"
              },
              "text": {
                "en": "Brands like Zara and H&M copied runway looks and put them in shops within weeks, at low prices.",
                "hi": "ज़ारा और H&M जैसे ब्रांड रनवे के लुक कॉपी करके कुछ हफ़्तों में, कम दाम पर दुकानों में रख देते थे।"
              }
            },
            {
              "when": "2010s",
              "title": {
                "en": "Athleisure",
                "hi": "एथलेज़र"
              },
              "text": {
                "en": "Leggings, hoodies and sneakers became everyday clothes, not only gym clothes.",
                "hi": "लेगिंग्स, हूडी और स्नीकर्स सिर्फ़ जिम के नहीं, रोज़ के कपड़े बन गए।"
              }
            },
            {
              "when": "2013",
              "title": {
                "en": "Rana Plaza",
                "hi": "राना प्लाज़ा"
              },
              "text": {
                "en": "A garment factory building collapsed in Bangladesh and over 1,100 workers died. The world began asking who makes our clothes.",
                "hi": "बांग्लादेश में एक गारमेंट फ़ैक्टरी की इमारत गिर गई और 1,100 से ज़्यादा मज़दूर मारे गए। दुनिया पूछने लगी कि हमारे कपड़े कौन बनाता है।"
              }
            },
            {
              "when": "2020s",
              "title": {
                "en": "Sustainability",
                "hi": "टिकाऊ फ़ैशन"
              },
              "text": {
                "en": "Thrifting, resale, upcycling, handloom revival and 'buy less, buy better' are now part of fashion.",
                "hi": "थ्रिफ़्टिंग, रीसेल, अपसाइक्लिंग, हैंडलूम की वापसी और 'कम खरीदो, अच्छा खरीदो' अब फ़ैशन का हिस्सा हैं।"
              }
            }
          ]
        },
        {
          "t": "compare",
          "items": [
            {
              "title": {
                "en": "Fast fashion",
                "hi": "फ़ास्ट फ़ैशन"
              },
              "points": [
                {
                  "en": "Trendy, cheap, made in weeks",
                  "hi": "ट्रेंडी, सस्ता, हफ़्तों में तैयार"
                },
                {
                  "en": "Clothes are thrown away quickly",
                  "hi": "कपड़े जल्दी फेंक दिए जाते हैं"
                }
              ]
            },
            {
              "title": {
                "en": "Slow / sustainable",
                "hi": "स्लो / टिकाऊ"
              },
              "points": [
                {
                  "en": "Fewer, better, longer-lasting pieces",
                  "hi": "कम, बेहतर, ज़्यादा चलने वाले कपड़े"
                },
                {
                  "en": "Fair pay and care for materials",
                  "hi": "सही मज़दूरी और सामग्री की परवाह"
                }
              ]
            }
          ]
        },
        {
          "t": "tip",
          "kind": "tip",
          "text": {
            "en": "As a designer, ask 'will this still be worn in 5 years?' It is the best question for a sustainable collection.",
            "hi": "डिज़ाइनर के तौर पर पूछो 'क्या ये 5 साल बाद भी पहना जाएगा?' टिकाऊ कलेक्शन के लिए ये सबसे अच्छा सवाल है।"
          }
        },
        {
          "t": "terms",
          "items": [
            {
              "en": "Power dressing",
              "hi": "पावर ड्रेसिंग",
              "def": {
                "en": "Strong, tailored work clothes with padded shoulders.",
                "hi": "पैड वाले कंधों के साथ मज़बूत, टेलर्ड ऑफ़िस कपड़े।"
              }
            },
            {
              "en": "Fast fashion",
              "hi": "फ़ास्ट फ़ैशन",
              "def": {
                "en": "Cheap clothes copied from trends and made very quickly.",
                "hi": "ट्रेंड से कॉपी किए, बहुत जल्दी बने सस्ते कपड़े।"
              }
            },
            {
              "en": "Athleisure",
              "hi": "एथलेज़र",
              "def": {
                "en": "Sports-style clothes worn as everyday fashion.",
                "hi": "खेल वाले स्टाइल के कपड़े जो रोज़ के फ़ैशन में पहने जाते हैं।"
              }
            },
            {
              "en": "Upcycling",
              "hi": "अपसाइक्लिंग",
              "def": {
                "en": "Turning old clothes into something new and better.",
                "hi": "पुराने कपड़ों को कुछ नया और बेहतर बनाना।"
              }
            }
          ]
        },
        {
          "t": "try",
          "text": {
            "en": "Upcycle one old garment. Even a sketch is fine: how would you turn old jeans into something new?",
            "hi": "एक पुराना कपड़ा अपसाइकल करो। स्केच भी चलेगा: पुरानी जीन्स को तुम क्या नया बनाओगी?"
          }
        }
      ]
    },
    {
      "id": "global-designers",
      "title": {
        "en": "Global Designers to Know",
        "hi": "जानने लायक वैश्विक डिज़ाइनर"
      },
      "min": 7,
      "blocks": [
        {
          "t": "p",
          "text": {
            "en": "These designers did not just make nice clothes. Each one changed **how people dress**. Learn what they changed and you can talk about them with confidence.",
            "hi": "इन डिज़ाइनरों ने सिर्फ़ सुंदर कपड़े नहीं बनाए। हर एक ने **लोगों के पहनने का तरीका** बदला। उन्होंने क्या बदला ये सीख लो, फिर तुम आत्मविश्वास से बात कर सकोगी।"
          }
        },
        {
          "t": "cards",
          "items": [
            {
              "src": "assets/img/fashion-history/chanel.jpg",
              "title": {
                "en": "Coco Chanel (France)",
                "hi": "कोको शैनल (फ़्रांस)"
              },
              "text": {
                "en": "Freed women from corsets. Used comfortable jersey fabric. Gave us the little black dress, the tweed suit and the quilted bag.",
                "hi": "महिलाओं को कॉर्सेट से आज़ाद किया। आरामदायक जर्सी कपड़ा इस्तेमाल किया। हमें लिटिल ब्लैक ड्रेस, ट्वीड सूट और क्विल्टेड बैग दिया।"
              }
            },
            {
              "src": "assets/img/fashion-history/dior.jpg",
              "title": {
                "en": "Christian Dior (France)",
                "hi": "क्रिश्चियन डियोर (फ़्रांस)"
              },
              "text": {
                "en": "Launched the New Look in 1947 and brought romance and luxury back to Paris after the war.",
                "hi": "1947 में न्यू लुक लाया और युद्ध के बाद पेरिस में रोमांस और लग्ज़री लौटाई।"
              }
            },
            {
              "src": "assets/img/fashion-history/ysl.jpg",
              "title": {
                "en": "Yves Saint Laurent (France)",
                "hi": "इव सां लोरां (फ़्रांस)"
              },
              "text": {
                "en": "Gave women the tuxedo suit (Le Smoking, 1966) and the Mondrian dress. Opened Rive Gauche, a ready-to-wear line for everyone.",
                "hi": "महिलाओं को टक्सीडो सूट (ले स्मोकिंग, 1966) और मॉन्ड्रियान ड्रेस दी। रीव गोश खोला, जो सबके लिए रेडी-टू-वियर लाइन थी।"
              }
            },
            {
              "title": {
                "en": "Giorgio Armani (Italy)",
                "hi": "जॉर्जियो अरमानी (इटली)"
              },
              "text": {
                "en": "Started his label in 1975. Removed stiff padding from jackets, creating a soft, relaxed, elegant suit.",
                "hi": "1975 में अपना लेबल शुरू किया। जैकेट से सख़्त पैडिंग हटाई और नरम, आरामदायक, सुरुचिपूर्ण सूट बनाया।"
              },
              "icon": "user"
            },
            {
              "src": "assets/img/fashion-history/mcqueen.jpg",
              "title": {
                "en": "Alexander McQueen (UK)",
                "hi": "एलेक्ज़ेंडर मैक्वीन (यूके)"
              },
              "text": {
                "en": "Trained on Savile Row tailoring, then made dramatic, dark and emotional runway shows. Known for the low-rise 'bumster' trousers.",
                "hi": "सेविल रो की टेलरिंग सीखी, फिर नाटकीय, गहरे और भावनात्मक रनवे शो किए। लो-राइज़ 'बमस्टर' पैंट के लिए मशहूर।"
              }
            },
            {
              "title": {
                "en": "Vivienne Westwood (UK)",
                "hi": "विविएन वेस्टवुड (यूके)"
              },
              "text": {
                "en": "Brought punk from the street to the catwalk in the 1970s, and later mixed history, tartan and activism.",
                "hi": "1970 के दशक में पंक को सड़क से कैटवॉक तक लाईं, और बाद में इतिहास, टार्टन और एक्टिविज़्म को मिलाया।"
              },
              "icon": "user"
            }
          ]
        },
        {
          "t": "dg",
          "name": "fashion-history-silhouette",
          "args": {
            "era": "1950s"
          },
          "caption": {
            "en": "The New Look shape: soft shoulders, tiny waist, full skirt.",
            "hi": "न्यू लुक का आकार: नरम कंधे, पतली कमर, घेरदार स्कर्ट।"
          }
        },
        {
          "t": "quote",
          "text": {
            "en": "Fashions fade, style is eternal.",
            "hi": "फ़ैशन मिट जाते हैं, स्टाइल हमेशा रहता है।"
          },
          "by": "Yves Saint Laurent"
        },
        {
          "t": "quote",
          "text": {
            "en": "Simplicity is the keynote of all true elegance.",
            "hi": "सादगी ही हर सच्ची शालीनता की कुंजी है।"
          },
          "by": "Coco Chanel"
        },
        {
          "t": "table",
          "head": [
            {
              "en": "Designer",
              "hi": "डिज़ाइनर"
            },
            {
              "en": "Famous for",
              "hi": "किसके लिए मशहूर"
            }
          ],
          "rows": [
            [
              "Chanel",
              {
                "en": "Little black dress, tweed suit",
                "hi": "लिटिल ब्लैक ड्रेस, ट्वीड सूट"
              }
            ],
            [
              "Dior",
              {
                "en": "New Look (1947)",
                "hi": "न्यू लुक (1947)"
              }
            ],
            [
              "YSL",
              {
                "en": "Le Smoking, Mondrian dress",
                "hi": "ले स्मोकिंग, मॉन्ड्रियान ड्रेस"
              }
            ],
            [
              "Armani",
              {
                "en": "Soft tailoring",
                "hi": "नरम टेलरिंग"
              }
            ],
            [
              "McQueen",
              {
                "en": "Dramatic shows, sharp tailoring",
                "hi": "नाटकीय शो, तीखी टेलरिंग"
              }
            ],
            [
              "Westwood",
              {
                "en": "Punk",
                "hi": "पंक"
              }
            ]
          ]
        },
        {
          "t": "tip",
          "kind": "tip",
          "text": {
            "en": "Other names to look up: Cristobal Balenciaga (sculptural shapes), Elsa Schiaparelli (surreal ideas), Rei Kawakubo of Comme des Garcons (avant-garde) and Karl Lagerfeld (Chanel's creative head from 1983 to 2019).",
            "hi": "और नाम ढूंढो: क्रिस्टोबल बालेंसियागा (मूर्ति जैसे आकार), एल्सा शियापरेली (अजीब-अनोखे आइडिया), कमे दे गार्सोन की रेई कावाकुबो (अवां-गार्द) और कार्ल लेगरफ़ील्ड (1983 से 2019 तक शैनल के क्रिएटिव हेड)।"
          }
        },
        {
          "t": "terms",
          "items": [
            {
              "en": "Haute couture",
              "hi": "ओट कुतुर",
              "def": {
                "en": "Hand-made, made-to-measure luxury fashion from Paris.",
                "hi": "पेरिस का हाथ से बना, नाप से सिला लग्ज़री फ़ैशन।"
              }
            },
            {
              "en": "Ready-to-wear",
              "hi": "रेडी-टू-वियर",
              "def": {
                "en": "Clothes made in standard sizes and sold in shops.",
                "hi": "स्टैंडर्ड साइज़ में बने और दुकानों में बिकने वाले कपड़े।"
              }
            },
            {
              "en": "Fashion house",
              "hi": "फ़ैशन हाउस",
              "def": {
                "en": "A company that designs and sells fashion under a name.",
                "hi": "एक नाम के तहत फ़ैशन डिज़ाइन करके बेचने वाली कंपनी।"
              }
            },
            {
              "en": "Avant-garde",
              "hi": "अवां-गार्द",
              "def": {
                "en": "Very new, experimental and ahead of its time.",
                "hi": "बिल्कुल नया, प्रयोग वाला और अपने समय से आगे।"
              }
            }
          ]
        },
        {
          "t": "try",
          "text": {
            "en": "Pick one designer. Find 3 of their looks online and write one line on what makes each look 'theirs'.",
            "hi": "एक डिज़ाइनर चुनो। उनके 3 लुक ऑनलाइन ढूंढो और हर लुक के लिए एक लाइन लिखो कि वो 'उनका' क्यों लगता है।"
          }
        }
      ]
    },
    {
      "id": "indian-fashion",
      "title": {
        "en": "Indian Fashion Story and Designers",
        "hi": "भारतीय फ़ैशन की कहानी और डिज़ाइनर"
      },
      "min": 8,
      "blocks": [
        {
          "t": "p",
          "text": {
            "en": "Indian fashion has two roots: **centuries of craft** (weaving, block printing, embroidery) and **Bollywood**, which showed the whole country what to wear next.",
            "hi": "भारतीय फ़ैशन की दो जड़ें हैं: **सदियों पुरानी हस्तकला** (बुनाई, ब्लॉक प्रिंट, कढ़ाई) और **बॉलीवुड**, जिसने पूरे देश को दिखाया कि अगला फ़ैशन क्या है।"
          }
        },
        {
          "t": "timeline",
          "items": [
            {
              "when": "1950s-60s",
              "title": {
                "en": "Saree and the screen",
                "hi": "साड़ी और सिनेमा"
              },
              "text": {
                "en": "Heroines made chiffon sarees, tight churidar-kurtas and big hairdos famous. The local darzi copied them for everyone.",
                "hi": "हीरोइनों ने शिफ़ॉन साड़ी, टाइट चूड़ीदार-कुर्ते और बड़े हेयरस्टाइल मशहूर किए। लोकल दर्ज़ी ने सबके लिए उन्हें कॉपी किया।"
              }
            },
            {
              "when": "1960s",
              "title": {
                "en": "Ritu Kumar begins",
                "hi": "ऋतु कुमार की शुरुआत"
              },
              "text": {
                "en": "Ritu Kumar started a small block-printing workshop in Kolkata and grew it into a national label.",
                "hi": "ऋतु कुमार ने कोलकाता में छोटी ब्लॉक-प्रिंटिंग वर्कशॉप शुरू की और उसे राष्ट्रीय लेबल बना दिया।"
              }
            },
            {
              "when": "1970s",
              "title": {
                "en": "Bell-bottoms and polka dots",
                "hi": "बेल-बॉटम और पोल्का डॉट्स"
              },
              "text": {
                "en": "Film stars wore flares, short kurtas and bold prints, just like the West.",
                "hi": "फ़िल्म स्टार्स ने पश्चिम की तरह फ़्लेयर, छोटे कुर्ते और बोल्ड प्रिंट पहने।"
              }
            },
            {
              "when": "1983",
              "title": {
                "en": "India's first costume Oscar",
                "hi": "भारत का पहला कॉस्ट्यूम ऑस्कर"
              },
              "text": {
                "en": "Bhanu Athaiya won an Oscar for the costumes of the film Gandhi.",
                "hi": "भानु अथैया ने फ़िल्म गांधी के कॉस्ट्यूम के लिए ऑस्कर जीता।"
              }
            },
            {
              "when": "1986",
              "title": {
                "en": "NIFT is founded",
                "hi": "NIFT की स्थापना"
              },
              "text": {
                "en": "The National Institute of Fashion Technology opened in New Delhi. It trains designers all over India.",
                "hi": "नेशनल इंस्टिट्यूट ऑफ़ फ़ैशन टेक्नोलॉजी नई दिल्ली में शुरू हुआ। ये पूरे भारत में डिज़ाइनर तैयार करता है।"
              }
            },
            {
              "when": "1990s",
              "title": {
                "en": "The designer era",
                "hi": "डिज़ाइनर दौर"
              },
              "text": {
                "en": "Boutiques like Ensemble (1987) and designers for films, like Manish Malhotra, made designer wear a real aspiration.",
                "hi": "एन्सेम्बल (1987) जैसे बुटीक और फ़िल्मों के डिज़ाइनर, जैसे मनीष मल्होत्रा, ने डिज़ाइनर कपड़ों को एक चाहत बना दिया।"
              }
            },
            {
              "when": "1999",
              "src": "assets/img/fashion-history/lakme-fashion-week.jpg",
              "title": {
                "en": "Lakme Fashion Week",
                "hi": "लैक्मे फ़ैशन वीक"
              },
              "text": {
                "en": "India's big runway event began in Mumbai and gave new designers a stage. India Fashion Week by the FDCI followed in Delhi.",
                "hi": "भारत का बड़ा रनवे इवेंट मुंबई में शुरू हुआ और नए डिज़ाइनरों को मंच दिया। फिर दिल्ली में FDCI का इंडिया फ़ैशन वीक आया।"
              }
            },
            {
              "when": "2010s+",
              "title": {
                "en": "Handloom and online brands",
                "hi": "हैंडलूम और ऑनलाइन ब्रांड"
              },
              "text": {
                "en": "Handloom revival, Instagram brands and conscious fashion are growing, with young designers selling directly to customers.",
                "hi": "हैंडलूम की वापसी, इंस्टाग्राम ब्रांड और सोच-समझकर बना फ़ैशन बढ़ रहा है, और युवा डिज़ाइनर सीधे ग्राहकों को बेच रहे हैं।"
              }
            }
          ]
        },
        {
          "t": "h",
          "text": {
            "en": "Designers to know",
            "hi": "जानने लायक डिज़ाइनर"
          }
        },
        {
          "t": "cards",
          "items": [
            {
              "title": {
                "en": "Ritu Kumar",
                "hi": "ऋतु कुमार"
              },
              "text": {
                "en": "A pioneer of hand block printing and zari embroidery. Known for reviving old Indian textiles in modern clothes.",
                "hi": "हाथ से ब्लॉक प्रिंट और ज़री कढ़ाई की अग्रणी। पुराने भारतीय कपड़ों को आधुनिक कपड़ों में लौटाने के लिए मशहूर।"
              },
              "icon": "user"
            },
            {
              "title": {
                "en": "Manish Malhotra",
                "hi": "मनीष मल्होत्रा"
              },
              "text": {
                "en": "Bollywood's best-known costume designer, famous for glamorous sarees and lehengas. Started his own label in 2005.",
                "hi": "बॉलीवुड के सबसे मशहूर कॉस्ट्यूम डिज़ाइनर, ग्लैमरस साड़ी और लहंगों के लिए जाने जाते हैं। 2005 में अपना लेबल शुरू किया।"
              },
              "icon": "user"
            },
            {
              "src": "assets/img/fashion-history/sabyasachi.jpg",
              "title": {
                "en": "Sabyasachi Mukherjee",
                "hi": "सब्यसाची मुखर्जी"
              },
              "text": {
                "en": "A NIFT graduate from Kolkata. His label began in 1999. Known for heritage textiles, rich colours and bridal wear.",
                "hi": "कोलकाता के NIFT ग्रेजुएट। उनका लेबल 1999 में शुरू हुआ। विरासत के कपड़ों, गहरे रंगों और ब्राइडल वियर के लिए मशहूर।"
              }
            },
            {
              "title": {
                "en": "Tarun Tahiliani",
                "hi": "तरुण ताहिलियानी"
              },
              "text": {
                "en": "Co-founded Ensemble, India's first multi-designer store. Famous for draping and 'Indian couture' that mixes Western cuts with Indian craft.",
                "hi": "एन्सेम्बल के सह-संस्थापक, भारत का पहला मल्टी-डिज़ाइनर स्टोर। ड्रेपिंग और 'इंडियन कुतुर' के लिए मशहूर, जो पश्चिमी कट को भारतीय कारीगरी से मिलाता है।"
              },
              "icon": "user"
            },
            {
              "title": {
                "en": "Anita Dongre",
                "hi": "अनीता डोंगरे"
              },
              "text": {
                "en": "Built a large brand since 1995, and now works with rural craftswomen on a sustainable line called Grassroot.",
                "hi": "1995 से बड़ा ब्रांड बनाया, और अब ग्रामीण कारीगर महिलाओं के साथ 'ग्रासरूट' नाम की टिकाऊ लाइन पर काम करती हैं।"
              },
              "icon": "user"
            },
            {
              "title": {
                "en": "Rohit Bal",
                "hi": "रोहित बल"
              },
              "text": {
                "en": "Kashmir-rooted designer known for lotus and peacock motifs, velvet and a very dramatic, royal look.",
                "hi": "कश्मीर से जुड़े डिज़ाइनर, कमल और मोर के मोटिफ़, मखमल और बहुत नाटकीय, शाही लुक के लिए मशहूर।"
              },
              "icon": "user"
            },
            {
              "title": {
                "en": "Masaba Gupta",
                "hi": "मसाबा गुप्ता"
              },
              "text": {
                "en": "Started House of Masaba in 2009. Known for fun, quirky prints and a young, playful take on sarees.",
                "hi": "2009 में हाउस ऑफ़ मसाबा शुरू किया। मज़ेदार, अनोखे प्रिंट और साड़ी पर युवा, चंचल अंदाज़ के लिए मशहूर।"
              },
              "icon": "user"
            },
            {
              "title": {
                "en": "Manish Arora",
                "hi": "मनीष अरोड़ा"
              },
              "text": {
                "en": "Known for neon colours, bold Indian-pop prints and shows at Paris Fashion Week.",
                "hi": "नियॉन रंगों, बोल्ड इंडियन-पॉप प्रिंट और पेरिस फ़ैशन वीक के शो के लिए मशहूर।"
              },
              "icon": "user"
            }
          ]
        },
        {
          "t": "tip",
          "kind": "tip",
          "text": {
            "en": "Notice the pattern: the best Indian designers take **a craft** (block print, zari, ikat) and give it **a modern shape**. That is a design strategy you can use too.",
            "hi": "पैटर्न देखो: सबसे अच्छे भारतीय डिज़ाइनर **एक हस्तकला** (ब्लॉक प्रिंट, ज़री, इकत) लेते हैं और उसे **आधुनिक आकार** देते हैं। ये एक डिज़ाइन रणनीति है जो तुम भी अपना सकती हो।"
          }
        },
        {
          "t": "terms",
          "items": [
            {
              "en": "NIFT",
              "hi": "निफ़्ट",
              "def": {
                "en": "National Institute of Fashion Technology, with campuses across India.",
                "hi": "नेशनल इंस्टिट्यूट ऑफ़ फ़ैशन टेक्नोलॉजी, जिसके कैंपस पूरे भारत में हैं।"
              }
            },
            {
              "en": "Fashion week",
              "hi": "फ़ैशन वीक",
              "def": {
                "en": "A week of runway shows where designers present new collections.",
                "hi": "रनवे शो का हफ़्ता, जहां डिज़ाइनर नए कलेक्शन दिखाते हैं।"
              }
            },
            {
              "en": "Costume designer",
              "hi": "कॉस्ट्यूम डिज़ाइनर",
              "def": {
                "en": "A person who designs clothes for films and plays.",
                "hi": "फ़िल्मों और नाटकों के लिए कपड़े डिज़ाइन करने वाला व्यक्ति।"
              }
            },
            {
              "en": "Label",
              "hi": "लेबल",
              "def": {
                "en": "A designer's own brand name.",
                "hi": "डिज़ाइनर का अपना ब्रांड नाम।"
              }
            }
          ]
        },
        {
          "t": "try",
          "text": {
            "en": "Choose one Indian designer. Write 3 lines: their signature craft, their favourite colours and one garment you love.",
            "hi": "एक भारतीय डिज़ाइनर चुनो। 3 लाइन लिखो: उनकी खास कारीगरी, पसंदीदा रंग और एक कपड़ा जो तुम्हें पसंद है।"
          }
        }
      ]
    }
  ],
  "quiz": [
    {
      "q": {
        "en": "Which era is known for the S-bend corset silhouette?",
        "hi": "S-बेंड कॉर्सेट सिल्हूट किस दौर की पहचान है?"
      },
      "options": [
        {
          "en": "1900s (Edwardian)",
          "hi": "1900 का दशक (एडवर्डियन)"
        },
        {
          "en": "1960s",
          "hi": "1960 का दशक"
        },
        {
          "en": "1990s",
          "hi": "1990 का दशक"
        }
      ],
      "answer": 0,
      "why": {
        "en": "The Edwardian corset pushed the chest forward and hips back, making an S shape.",
        "hi": "एडवर्डियन कॉर्सेट सीने को आगे और कूल्हों को पीछे धकेलता था, जिससे S आकार बनता था।"
      },
      "dg": "fashion-history-silhouette",
      "args": {
        "era": "1900s"
      }
    },
    {
      "q": {
        "en": "What did 1920s flapper dresses look like?",
        "hi": "1920 की फ़्लैपर ड्रेस कैसी दिखती थी?"
      },
      "options": [
        {
          "en": "Tight at the waist, huge skirt",
          "hi": "कमर पर टाइट, बहुत बड़ा स्कर्ट"
        },
        {
          "en": "Straight and loose with a low waist",
          "hi": "सीधी और ढीली, नीची कमर के साथ"
        },
        {
          "en": "Very long with a train",
          "hi": "बहुत लंबी, पीछे ट्रेन के साथ"
        }
      ],
      "answer": 1,
      "why": {
        "en": "The flapper look was loose, straight and had a dropped waist.",
        "hi": "फ़्लैपर लुक ढीला, सीधा और नीची कमर वाला था।"
      },
      "dg": "fashion-history-silhouette",
      "args": {
        "era": "1920s"
      }
    },
    {
      "q": {
        "en": "Who made the bias cut famous in the 1930s?",
        "hi": "1930 के दशक में बायस कट को किसने मशहूर किया?"
      },
      "options": [
        {
          "en": "Madeleine Vionnet",
          "hi": "मैडलीन वियोने"
        },
        {
          "en": "Mary Quant",
          "hi": "मैरी क्वांट"
        },
        {
          "en": "Giorgio Armani",
          "hi": "जॉर्जियो अरमानी"
        }
      ],
      "answer": 0,
      "why": {
        "en": "Vionnet cut fabric diagonally so gowns clung and flowed.",
        "hi": "वियोने ने कपड़ा तिरछा काटा ताकि गाउन शरीर पर चिपकते और बहते थे।"
      }
    },
    {
      "q": {
        "en": "In which year did Dior launch the New Look?",
        "hi": "डियोर ने न्यू लुक किस साल लॉन्च किया?"
      },
      "options": [
        {
          "en": "1927",
          "hi": "1927 में"
        },
        {
          "en": "1947",
          "hi": "1947 में"
        },
        {
          "en": "1967",
          "hi": "1967 में"
        }
      ],
      "answer": 1,
      "why": {
        "en": "The New Look arrived in 1947 with a tiny waist and a full skirt.",
        "hi": "न्यू लुक 1947 में पतली कमर और घेरदार स्कर्ट के साथ आया।"
      },
      "dg": "fashion-history-silhouette",
      "args": {
        "era": "1950s"
      }
    },
    {
      "q": {
        "en": "Which designer is linked with popularising the miniskirt in 1960s London?",
        "hi": "1960 के लंदन में मिनी स्कर्ट को लोकप्रिय बनाने से कौन जुड़ा है?"
      },
      "options": [
        {
          "en": "Mary Quant",
          "hi": "मैरी क्वांट"
        },
        {
          "en": "Coco Chanel",
          "hi": "कोको शैनल"
        },
        {
          "en": "Vivienne Westwood",
          "hi": "विविएन वेस्टवुड"
        }
      ],
      "answer": 0,
      "why": {
        "en": "Mary Quant's London shop made the mini a youth symbol.",
        "hi": "मैरी क्वांट की लंदन की दुकान ने मिनी को युवाओं का प्रतीक बना दिया।"
      }
    },
    {
      "q": {
        "en": "What was the main idea of 1980s power dressing?",
        "hi": "1980 की पावर ड्रेसिंग का मुख्य आइडिया क्या था?"
      },
      "options": [
        {
          "en": "Strong tailored suits with shoulder pads",
          "hi": "शोल्डर पैड वाले मज़बूत टेलर्ड सूट"
        },
        {
          "en": "Floaty hippie dresses",
          "hi": "लहराती हिप्पी ड्रेस"
        },
        {
          "en": "Paper dresses",
          "hi": "कागज़ की ड्रेस"
        }
      ],
      "answer": 0,
      "why": {
        "en": "As women moved into offices, padded suits gave a strong, confident look.",
        "hi": "जैसे महिलाएं ऑफ़िस में गईं, पैड वाले सूट ने मज़बूत, आत्मविश्वासी लुक दिया।"
      },
      "dg": "fashion-history-silhouette",
      "args": {
        "era": "1980s"
      }
    },
    {
      "q": {
        "en": "Which designer is famous for the little black dress?",
        "hi": "लिटिल ब्लैक ड्रेस के लिए कौन मशहूर है?"
      },
      "options": [
        {
          "en": "Alexander McQueen",
          "hi": "एलेक्ज़ेंडर मैक्वीन"
        },
        {
          "en": "Coco Chanel",
          "hi": "कोको शैनल"
        },
        {
          "en": "Christian Dior",
          "hi": "क्रिश्चियन डियोर"
        }
      ],
      "answer": 1,
      "why": {
        "en": "Chanel made the simple black dress an essential in 1926.",
        "hi": "शैनल ने 1926 में सादी काली ड्रेस को ज़रूरी बना दिया।"
      }
    },
    {
      "q": {
        "en": "Which designer introduced the women's tuxedo 'Le Smoking' in 1966?",
        "hi": "1966 में महिलाओं का टक्सीडो 'ले स्मोकिंग' किसने पेश किया?"
      },
      "options": [
        {
          "en": "Yves Saint Laurent",
          "hi": "इव सां लोरां"
        },
        {
          "en": "Armani",
          "hi": "अरमानी"
        },
        {
          "en": "Manish Arora",
          "hi": "मनीष अरोड़ा"
        }
      ],
      "answer": 0,
      "why": {
        "en": "YSL's Le Smoking put women in a tuxedo suit.",
        "hi": "YSL के ले स्मोकिंग ने महिलाओं को टक्सीडो सूट पहनाया।"
      }
    },
    {
      "q": {
        "en": "Which institute, founded in 1986, trains fashion designers across India?",
        "hi": "1986 में बना कौन सा संस्थान पूरे भारत में फ़ैशन डिज़ाइनर तैयार करता है?"
      },
      "options": [
        {
          "en": "NIFT",
          "hi": "निफ़्ट (NIFT)"
        },
        {
          "en": "FDCI",
          "hi": "एफ़डीसीआई (FDCI)"
        },
        {
          "en": "Ensemble",
          "hi": "एन्सेम्बल"
        }
      ],
      "answer": 0,
      "why": {
        "en": "NIFT, the National Institute of Fashion Technology, started in New Delhi.",
        "hi": "NIFT यानी नेशनल इंस्टिट्यूट ऑफ़ फ़ैशन टेक्नोलॉजी नई दिल्ली में शुरू हुआ।"
      }
    },
    {
      "q": {
        "en": "Which Indian designer started with hand block printing in Kolkata?",
        "hi": "किस भारतीय डिज़ाइनर ने कोलकाता में हाथ की ब्लॉक प्रिंटिंग से शुरुआत की?"
      },
      "options": [
        {
          "en": "Ritu Kumar",
          "hi": "ऋतु कुमार"
        },
        {
          "en": "Masaba Gupta",
          "hi": "मसाबा गुप्ता"
        },
        {
          "en": "Rohit Bal",
          "hi": "रोहित बल"
        }
      ],
      "answer": 0,
      "why": {
        "en": "Ritu Kumar began with a small block-printing workshop in the 1960s.",
        "hi": "ऋतु कुमार ने 1960 के दशक में छोटी ब्लॉक-प्रिंटिंग वर्कशॉप से शुरुआत की।"
      }
    }
  ]
});
