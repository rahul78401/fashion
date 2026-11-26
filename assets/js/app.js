/* App: hash router, page rendering, language switch, progress (localStorage), quiz, glossary, photo viewer. */
(function () {
  "use strict";
  var FD = window.FD;
  var esc = FD.esc;
  var $ = function (id) { return document.getElementById(id); };
  var view = $("view"), bar = $("bar"), barL = $("barL"), readbar = $("readbar"), tabs = $("tabs");
  var lb = $("lb"), lbImg = $("lbImg"), lbCap = $("lbCap");

  /* ---------- storage (never required: the site works without it) ---------- */
  function load(k, d) { try { var v = localStorage.getItem("atelier." + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } }
  function save(k, v) { try { localStorage.setItem("atelier." + k, JSON.stringify(v)); } catch (e) { /* private mode */ } }
  var S = { done: load("done", {}), quiz: load("quiz", {}), tasks: load("tasks", {}), last: load("last", null) };
  FD.lang = load("lang", "en") === "hi" ? "hi" : "en";

  /* ---------- interface text ---------- */
  var UI = {
    en: {
      gm: "Good morning, Khushi", ga: "Good afternoon, Khushi", ge: "Good evening, Khushi",
      sub: "Ready to learn something beautiful today?",
      cont: "Continue", start: "Start here", allDone: "You finished every lesson! ✿",
      progress: "Your progress", lessonsDone: "{a} of {b} lessons done", streak: "{n} days in a row",
      wotd: "Word of the day", path: "Your learning path", nMods: "{n} modules · basic to intermediate",
      module: "Module", lessons: "{n} lessons", min: "{n} min", minRead: "{n} min read",
      basic: "Basic", intermediate: "Intermediate", youLearn: "You will learn",
      lessonOf: "Lesson {a} of {b}", quizT: "Test yourself", quizS: "{n} questions", best: "Best score {s}/{n}",
      doneNext: "Done! Next lesson", doneQuiz: "Done! Take the quiz", finish: "Done! Back to module",
      nextL: "Next lesson", toQuiz: "Take the quiz", backMod: "Back to module", completed: "Completed",
      prev: "Previous", next: "Next", back: "Back", nextMod: "Next module",
      tip: "Tip", remember: "Remember", mistake: "Common mistake", fact: "Fun fact",
      tryThis: "Try this", markTask: "I did it", taskDone: "Done!", keyWords: "Key words",
      qOf: "Question {a} of {b}", right: "Correct!", wrong: "Not quite", nextQ: "Next question", seeScore: "See my score",
      tryAgain: "Try again", r1: "Brilliant! You really know this. ✿", r2: "Good job! Read the lessons once more and try again.",
      r3: "No worries — revise the lessons and you will get it.",
      learn: "Learn", practice: "Practice", words: "Words",
      practiceSub: "Quizzes and sketchbook tasks to make it stick.", mix: "Mixed quiz", mixSub: "10 random questions from all modules",
      quizzes: "Module quizzes", noQuiz: "New", tasks: "Sketchbook tasks", tasksSub: "{a} of {b} done",
      wordsSub: "{n} fashion words in English and Hindi", search: "Search a word…", noWords: "No words found.",
      credits: "Photo credits", creditsSub: "Photos come from Wikimedia Commons and Openverse and are used here only for personal study. Thank you to every photographer!",
      photo: "Photo", source: "Source", madeFor: "Made with love for Khushi", install: "Install on phone",
      notFound: "Page not found", goHome: "Go home", soon: "Lessons are on their way."
    },
    hi: {
      gm: "सुप्रभात, खुशी", ga: "नमस्ते, खुशी", ge: "शुभ संध्या, खुशी",
      sub: "आज कुछ सुंदर सीखने के लिए तैयार हो?",
      cont: "आगे पढ़ो", start: "यहाँ से शुरू करो", allDone: "तुमने सारे लेसन पूरे कर लिए! ✿",
      progress: "तुम्हारी प्रगति", lessonsDone: "{b} में से {a} लेसन पूरे", streak: "लगातार {n} दिन",
      wotd: "आज का शब्द", path: "तुम्हारा लर्निंग पाथ", nMods: "{n} मॉड्यूल · बेसिक से इंटरमीडिएट",
      module: "मॉड्यूल", lessons: "{n} लेसन", min: "{n} मिनट", minRead: "{n} मिनट",
      basic: "बेसिक", intermediate: "इंटरमीडिएट", youLearn: "तुम सीखोगी",
      lessonOf: "लेसन {a} / {b}", quizT: "खुद को परखो", quizS: "{n} सवाल", best: "बेस्ट स्कोर {s}/{n}",
      doneNext: "हो गया! अगला लेसन", doneQuiz: "हो गया! अब क्विज़", finish: "हो गया! मॉड्यूल पर वापस",
      nextL: "अगला लेसन", toQuiz: "क्विज़ दो", backMod: "मॉड्यूल पर वापस", completed: "पूरा हुआ",
      prev: "पिछला", next: "अगला", back: "वापस", nextMod: "अगला मॉड्यूल",
      tip: "टिप", remember: "याद रखो", mistake: "आम गलती", fact: "मज़ेदार बात",
      tryThis: "खुद करके देखो", markTask: "मैंने कर लिया", taskDone: "हो गया!", keyWords: "ज़रूरी शब्द",
      qOf: "सवाल {a} / {b}", right: "सही जवाब!", wrong: "सही नहीं", nextQ: "अगला सवाल", seeScore: "मेरा स्कोर देखो",
      tryAgain: "फिर से करो", r1: "शानदार! तुम्हें ये अच्छे से आता है। ✿", r2: "बढ़िया! लेसन एक बार और पढ़ो और फिर कोशिश करो।",
      r3: "कोई बात नहीं — लेसन दोहराओ, तुम कर लोगी।",
      learn: "सीखो", practice: "प्रैक्टिस", words: "शब्द",
      practiceSub: "क्विज़ और स्केचबुक टास्क — ताकि सब याद रहे।", mix: "मिक्स क्विज़", mixSub: "सारे मॉड्यूल से 10 रैंडम सवाल",
      quizzes: "मॉड्यूल क्विज़", noQuiz: "नया", tasks: "स्केचबुक टास्क", tasksSub: "{b} में से {a} पूरे",
      wordsSub: "{n} फैशन शब्द, इंग्लिश और हिंदी में", search: "कोई शब्द ढूंढो…", noWords: "कोई शब्द नहीं मिला।",
      credits: "फ़ोटो क्रेडिट", creditsSub: "फ़ोटो Wikimedia Commons और Openverse से ली गई हैं और यहाँ सिर्फ़ पढ़ाई के लिए हैं। सभी फ़ोटोग्राफ़र्स का शुक्रिया!",
      photo: "फ़ोटो", source: "सोर्स", madeFor: "खुशी के लिए प्यार से बनाया गया", install: "फ़ोन पर इंस्टॉल करो",
      notFound: "पेज नहीं मिला", goHome: "होम पर जाओ", soon: "लेसन जल्द आ रहे हैं।"
    }
  };
  function ui(k, vars) {
    var s = (UI[FD.lang] && UI[FD.lang][k]) || UI.en[k] || k;
    return vars ? s.replace(/\{(\w+)\}/g, function (_, n) { return vars[n]; }) : s;
  }
  function tx(v) { return FD.tx(v); }
  function fmt(v) { return esc(tx(v)).replace(/\*\*([^*]+?)\*\*/g, "<strong>$1</strong>"); }
  function plain(v) { return tx(v).replace(/\*\*/g, ""); }
  function ic(n, c) { return FD.iconSvg(n, c); }
  function two(n) { return n < 10 ? "0" + n : "" + n; }
  function today() { var d = new Date(); return Math.floor((d.getTime() - d.getTimezoneOffset() * 60000) / 86400000); }

  /* ---------- data ---------- */
  var mods = FD.modules.slice().sort(function (a, b) { return a.num - b.num; });
  var byId = {};
  mods.forEach(function (m) { byId[m.id] = m; m.lessons = m.lessons || []; m.quiz = m.quiz || []; });
  var credits = {};
  (FD.credits || []).forEach(function (c) { credits[c.file] = c; });

  var words = [], tasks = [];
  (function index() {
    var seen = {};
    function addWord(w, m, l) {
      var k = String(w.en || "").toLowerCase().trim();
      if (!k || seen[k]) return;
      seen[k] = 1;
      words.push({ en: w.en, hi: w.hi, def: w.def, m: m, l: l });
    }
    mods.forEach(function (m) {
      m.lessons.forEach(function (l) {
        (l.blocks || []).forEach(function (b, i) {
          if (b.t === "terms") (b.items || []).forEach(function (w) { addWord(w, m, l); });
          if (b.t === "try") tasks.push({ key: m.id + "/" + l.id + "/" + i, text: b.text, m: m, l: l });
        });
      });
    });
    (FD.words || []).forEach(function (w) { addWord(w, null, null); });
    words.sort(function (a, b) { return String(a.en).localeCompare(String(b.en), "en", { sensitivity: "base" }); });
  })();

  function doneCount(m) {
    var n = 0;
    m.lessons.forEach(function (l) { if (S.done[m.id + "/" + l.id]) n++; });
    return n;
  }

  /* ---------- media ---------- */
  function smOf(src) { return src.replace(/\.jpg$/, ".sm.jpg"); }
  function pic(src, alt, sizes, eager) {
    var c = credits[src];
    var a = ' alt="' + esc(alt || "") + '"' + (eager ? ' fetchpriority="high"' : ' loading="lazy"') +
      ' decoding="async" data-full="' + esc(src) + '"';
    if (c && c.w && c.h) {
      var r = Math.min(1, 480 / c.w, 600 / c.h), sw = Math.round(c.w * r);
      a += ' width="' + c.w + '" height="' + c.h + '"';
      if (sw < c.w) return '<img src="' + smOf(src) + '" srcset="' + smOf(src) + " " + sw + "w, " + src + " " + c.w + 'w" sizes="' + (sizes || "100vw") + '"' + a + ">";
    }
    return '<img src="' + src + '"' + a + ">";
  }
  function dg(name, args) {
    var f = FD.diagrams[name];
    if (!f) return "";
    try { return typeof f === "function" ? f(args || {}, FD.lang) : f; }
    catch (e) { if (window.console) console.warn("diagram " + name, e); return ""; }
  }
  function media(it, sizes, alt) {
    if (it.src) return '<div class="im">' + pic(it.src, alt, sizes) + "</div>";
    if (it.dg) return '<div class="im svg">' + dg(it.dg, it.args) + "</div>";
    return "";
  }

  /* ---------- lesson blocks ---------- */
  var TIPICON = { tip: "bulb", remember: "pushpin", mistake: "alert", fact: "sparkle" };
  function block(b, ctx) {
    var items = b.items || [];
    switch (b.t) {
      case "p": return "<p>" + fmt(b.text) + "</p>";
      case "h": return "<h3>" + fmt(b.text) + "</h3>";
      case "img":
        return '<figure class="fig">' + pic(b.src, plain(b.caption), "(min-width: 760px) 720px, 100vw") +
          (b.caption ? "<figcaption>" + fmt(b.caption) + "</figcaption>" : "") + "</figure>";
      case "gallery": {
        var c3 = b.cols === 3;
        return '<div class="gal' + (c3 ? " c3" : "") + '">' + items.map(function (it) {
          return '<figure class="gi">' + media(it, c3 ? "(min-width: 760px) 180px, 33vw" : "(min-width: 760px) 240px, 50vw", plain(it.label)) +
            "<figcaption><b>" + fmt(it.label) + "</b>" + (it.note ? "<small>" + fmt(it.note) + "</small>" : "") + "</figcaption></figure>";
        }).join("") + "</div>";
      }
      case "list": {
        var st = b.style || "dot", tag = st === "num" ? "ol" : "ul";
        return "<" + tag + ' class="ul ' + st + '">' + items.map(function (x) { return "<li>" + fmt(x) + "</li>"; }).join("") + "</" + tag + ">";
      }
      case "cards": {
        var one = items.some(function (it) { return plain(it.text).length > 120; });
        return '<div class="cards' + (one ? " one" : "") + '">' + items.map(function (it) {
          var hasIm = it.src || it.dg;
          return '<div class="card' + (hasIm ? " im-card" : "") + '">' +
            (hasIm ? media(it, one ? "112px" : "(min-width: 760px) 240px, 50vw", plain(it.title)) : it.icon ? '<span class="ico">' + ic(it.icon) + "</span>" : "") +
            '<div class="body"><h4>' + fmt(it.title) + "</h4>" + (it.text ? "<p>" + fmt(it.text) + "</p>" : "") + "</div></div>";
        }).join("") + "</div>";
      }
      case "compare":
        return '<div class="cmp">' + items.map(function (it) {
          return '<div class="side">' + media(it, "(min-width: 760px) 350px, 50vw", plain(it.title)) + '<div class="body"><h4>' + fmt(it.title) + "</h4><ul>" +
            (it.points || []).map(function (p) { return "<li>" + fmt(p) + "</li>"; }).join("") + "</ul></div></div>";
        }).join("") + '<span class="vs" aria-hidden="true">vs</span></div>';
      case "steps":
        return '<ol class="steps">' + items.map(function (it) {
          return "<li><h4>" + fmt(it.title) + "</h4>" + (it.text ? "<p>" + fmt(it.text) + "</p>" : "") + media(it, "(min-width: 760px) 660px, 90vw", plain(it.title)) + "</li>";
        }).join("") + "</ol>";
      case "tip": {
        var k = TIPICON[b.kind] ? b.kind : "tip";
        return '<aside class="call k-' + k + '">' + ic(TIPICON[k]) + '<div><b class="kk">' + esc(ui(k)) + "</b><p>" + fmt(b.text) + "</p></div></aside>";
      }
      case "try": {
        var tk = ctx.m.id + "/" + ctx.l.id + "/" + ctx.i, on = !!S.tasks[tk];
        return '<aside class="try"><div class="hd">' + ic("pencil") + esc(ui("tryThis")) + "</div><p>" + fmt(b.text) + "</p>" +
          '<button type="button" class="tbtn' + (on ? " on" : "") + '" data-act="task" data-k="' + tk + '" aria-pressed="' + on + '">' + ic("check") +
          '<span class="tl-l">' + esc(ui(on ? "taskDone" : "markTask")) + "</span></button></aside>";
      }
      case "terms":
        return '<section class="terms"><div class="hd">' + ic("book") + esc(ui("keyWords")) + "</div><dl>" + items.map(function (w) {
          return '<div class="row"><dt>' + esc(w.en) + ' <span lang="hi">' + esc(w.hi) + "</span></dt><dd>" + fmt(w.def) + "</dd></div>";
        }).join("") + "</dl></section>";
      case "dg":
        return '<figure class="dg"><div class="box">' + dg(b.name, b.args) + "</div>" + (b.caption ? "<figcaption>" + fmt(b.caption) + "</figcaption>" : "") + "</figure>";
      case "swatches":
        return '<figure class="sw"><div class="cc">' + items.map(function (s) {
          return '<div class="s"><span class="c" style="background:' + esc(s.c) + '"></span>' + (s.label ? "<b>" + fmt(s.label) + "</b>" : "") + "<small>" + esc(s.c) + "</small></div>";
        }).join("") + "</div>" + (b.caption ? "<figcaption>" + fmt(b.caption) + "</figcaption>" : "") + "</figure>";
      case "table":
        return '<div class="tbl"><table><thead><tr>' + (b.head || []).map(function (c) { return "<th>" + fmt(c) + "</th>"; }).join("") + "</tr></thead><tbody>" +
          (b.rows || []).map(function (r) { return "<tr>" + r.map(function (c) { return "<td>" + fmt(c) + "</td>"; }).join("") + "</tr>"; }).join("") + "</tbody></table></div>";
      case "timeline":
        return '<ol class="tl">' + items.map(function (it) {
          return '<li><span class="when">' + esc(tx(it.when)) + "</span><h4>" + fmt(it.title) + "</h4>" + (it.text ? "<p>" + fmt(it.text) + "</p>" : "") +
            media(it, "(min-width: 760px) 640px, 85vw", plain(it.title)) + "</li>";
        }).join("") + "</ol>";
      case "quote":
        return '<blockquote class="quote"><p>' + fmt(b.text) + "</p>" + (b.by ? "<cite>— " + esc(tx(b.by)) + "</cite>" : "") + "</blockquote>";
    }
    return "";
  }

  /* ---------- top bar & tabs ---------- */
  var readMode = false;
  function setBar(o) {
    o = o || {};
    barL.innerHTML = o.back
      ? '<a class="back" href="' + o.back + '" data-act="back" aria-label="' + esc(ui("back")) + '">' + ic("back") + '</a><span class="crumb">' + esc(o.label || "") + "</span>"
      : '<a class="brand" href="#/">Khushi\'s <em>Atelier</em></a>';
    readMode = !!o.read;
    readbar.hidden = !readMode;
    readbar.style.width = "0";
  }
  function renderTabs(active) {
    tabs.innerHTML = [["learn", "#/", "learn"], ["practice", "#/practice", "pencil"], ["words", "#/words", "words"]].map(function (t) {
      return '<a href="' + t[1] + '"' + (active === t[0] ? ' class="on" aria-current="page"' : "") + ">" + ic(t[2]) + "<span>" + esc(ui(t[0])) + "</span></a>";
    }).join("");
  }
  function langButtons() {
    var bs = document.querySelectorAll(".lang button");
    for (var i = 0; i < bs.length; i++) {
      var on = bs[i].getAttribute("data-l") === FD.lang;
      bs[i].className = on ? "on" : "";
      bs[i].setAttribute("aria-pressed", on ? "true" : "false");
    }
  }
  function title(t) { document.title = (t ? t + " · " : "") + "Khushi's Atelier"; }

  /* ---------- pages ---------- */
  function nextUp() {
    if (S.last && !S.done[S.last]) {
      var p = S.last.split("/"), m = byId[p[0]];
      var l = m && m.lessons.filter(function (x) { return x.id === p[1]; })[0];
      if (l) return { m: m, l: l };
    }
    var start = 0;
    if (S.last) { var mi = mods.indexOf(byId[S.last.split("/")[0]]); if (mi > 0) start = mi; }
    for (var k = 0; k < mods.length; k++) {
      var mm = mods[(start + k) % mods.length];
      for (var j = 0; j < mm.lessons.length; j++) if (!S.done[mm.id + "/" + mm.lessons[j].id]) return { m: mm, l: mm.lessons[j] };
    }
    return null;
  }
  function streak() {
    var days = {};
    Object.keys(S.done).forEach(function (k) { days[S.done[k]] = 1; });
    var t = today(), n = 0;
    if (!days[t]) t--;
    while (days[t]) { n++; t--; }
    return n;
  }
  function modCard(m) {
    var n = m.lessons.length, d = doneCount(m);
    return '<a class="mcard" href="#/m/' + m.id + '"><div class="ph">' + pic(m.cover, "", "(min-width: 1000px) 260px, (min-width: 700px) 33vw, 50vw") +
      '<span class="num">' + two(m.num) + "</span>" + (n && d === n ? '<span class="okb">' + ic("check") + "</span>" : "") + "</div>" +
      "<h3>" + fmt(m.title) + '</h3><div class="meta">' + esc(ui("lessons", { n: n })) + " · " + esc(ui(m.level)) + "</div>" +
      (d ? '<div class="bar-p"><i style="width:' + Math.round(d * 100 / n) + '%"></i></div>' : "") + "</a>";
  }
  function footer() {
    return '<footer class="foot"><p>' + ic("heart") + esc(ui("madeFor")) + '</p><p><a href="#/credits">' + esc(ui("credits")) + "</a></p>" +
      '<button type="button" id="install" class="pill" data-act="install"' + (installEvt ? "" : " hidden") + ">" + ic("sparkle") + esc(ui("install")) + "</button></footer>";
  }

  function home() {
    title("");
    setBar(null);
    view.className = "wide";
    if (!mods.length) { view.innerHTML = '<div class="empty"><h1>Khushi\'s Atelier</h1><p>' + esc(ui("soon")) + "</p></div>"; return; }
    var h = new Date().getHours();
    var tot = 0, nd = 0;
    mods.forEach(function (m) { tot += m.lessons.length; nd += doneCount(m); });
    var out = '<section class="hello"><h1>' + esc(ui(h < 12 ? "gm" : h < 17 ? "ga" : "ge")) + "</h1><p>" + esc(ui("sub")) + "</p></section>";
    out += '<div class="homegrid">';
    var nx = nextUp();
    out += nx
      ? '<a class="continue" href="#/m/' + nx.m.id + "/" + nx.l.id + '">' + pic(nx.m.cover, "", "68px") + '<span class="c-t"><span class="kicker">' +
        esc(ui(nd || S.last ? "cont" : "start")) + " · " + esc(ui("module")) + " " + nx.m.num + "</span><b>" + fmt(nx.l.title) + "</b><small>" + fmt(nx.m.title) +
        '</small></span><span class="go">' + ic("arrow") + "</span></a>"
      : '<div class="continue all">' + esc(ui("allDone")) + "</div>";
    var sk = streak();
    out += '<div class="prog"><div class="row"><b>' + esc(ui("progress")) + "</b><span>" + esc(ui("lessonsDone", { a: nd, b: tot })) + '</span></div><div class="bar-p"><i style="width:' +
      (tot ? Math.round(nd * 100 / tot) : 0) + '%"></i></div>' + (sk > 1 ? '<span class="streak">' + ic("sparkle") + esc(ui("streak", { n: sk })) + "</span>" : "") + "</div>";
    if (words.length) {
      var w = words[today() % words.length];
      out += '<a class="wotd" href="' + (w.m ? "#/m/" + w.m.id + "/" + w.l.id : "#/words") + '"><span class="kicker">' + esc(ui("wotd")) + '</span><div class="w">' + esc(w.en) +
        '<span lang="hi">' + esc(w.hi) + "</span></div><p>" + fmt(w.def) + "</p></a>";
    }
    out += "</div>";
    out += '<div class="sec-h"><h2>' + esc(ui("path")) + "</h2><span>" + esc(ui("nMods", { n: mods.length })) + '</span></div><div class="grid">' + mods.map(modCard).join("") + "</div>";
    out += footer();
    view.innerHTML = out;
  }

  function modulePage(m) {
    title(tx(m.title));
    setBar({ back: "#/", label: ui("learn") });
    var mins = 0, d = doneCount(m), n = m.lessons.length;
    m.lessons.forEach(function (l) { mins += l.min || 5; });
    var out = '<div class="hero">' + pic(m.cover, plain(m.title), "(min-width: 760px) 720px, 100vw", true) + "</div>";
    out += '<header class="mhead"><div class="kicker">' + esc(ui("module")) + " " + two(m.num) + " · " + esc(ui(m.level)) + "</div><h1>" + fmt(m.title) + '</h1><p class="tag">' + fmt(m.tagline) +
      '</p><div class="chips"><span class="chip">' + ic("learn") + esc(ui("lessons", { n: n })) + '</span><span class="chip">' + ic("clock") + esc(ui("min", { n: mins })) + "</span>" +
      (m.quiz.length ? '<span class="chip">' + ic("award") + esc(ui("quizS", { n: m.quiz.length })) + "</span>" : "") + "</div>" +
      (d ? '<div class="mprog"><div class="bar-p"><i style="width:' + Math.round(d * 100 / n) + '%"></i></div><span>' + d + "/" + n + "</span></div>" : "") + "</header>";
    if (m.learn && m.learn.length) out += '<section class="learnbox"><h2>' + esc(ui("youLearn")) + '</h2><ul class="ul check">' + m.learn.map(function (x) { return "<li>" + fmt(x) + "</li>"; }).join("") + "</ul></section>";
    out += '<ol class="lessons">' + m.lessons.map(function (l, i) {
      var isDone = !!S.done[m.id + "/" + l.id];
      return '<li class="' + (isDone ? "done" : "") + '"><a href="#/m/' + m.id + "/" + l.id + '"><span class="n">' + (isDone ? ic("check") : i + 1) + '</span><span class="tt"><b>' + fmt(l.title) +
        "</b><small>" + esc(ui("min", { n: l.min || 5 })) + "</small></span>" + ic("next", "chev") + "</a></li>";
    }).join("") + "</ol>";
    if (m.quiz.length) {
      var b = S.quiz[m.id];
      out += '<a class="quizcard" href="#/m/' + m.id + '/quiz"><span class="qi">' + ic("award") + "</span><span><b>" + esc(ui("quizT")) + "</b><small>" +
        esc(b ? ui("best", { s: b.s, n: b.n }) : ui("quizS", { n: m.quiz.length })) + "</small></span>" + ic("arrow") + "</a>";
    }
    var nm = mods[mods.indexOf(m) + 1];
    if (nm) out += '<a class="nextmod" href="#/m/' + nm.id + '">' + pic(nm.cover, "", "56px") + "<span><small>" + esc(ui("nextMod")) + "</small><b>" + fmt(nm.title) + "</b></span>" + ic("arrow") + "</a>";
    view.innerHTML = out;
  }

  function lessonPage(m, l) {
    var i = m.lessons.indexOf(l), n = m.lessons.length, k = m.id + "/" + l.id, isDone = !!S.done[k];
    S.last = k; save("last", k);
    title(tx(l.title));
    setBar({ back: "#/m/" + m.id, label: tx(m.title), read: true });
    var out = '<header class="lhead"><div class="dots">' + m.lessons.map(function (x, j) {
      return '<i class="' + (j === i ? "cur" : S.done[m.id + "/" + x.id] ? "on" : "") + '"></i>';
    }).join("") + '</div><div class="kicker">' + esc(ui("lessonOf", { a: i + 1, b: n })) + "</div><h1>" + fmt(l.title) + '</h1><div class="lmeta">' + ic("clock") +
      esc(ui("minRead", { n: l.min || 5 })) + (isDone ? '<span class="okchip">' + ic("check") + esc(ui("completed")) + "</span>" : "") + "</div></header>";
    out += '<article class="prose">' + (l.blocks || []).map(function (b, bi) { return block(b, { m: m, l: l, i: bi }); }).join("") + "</article>";
    var nl = m.lessons[i + 1], pl = m.lessons[i - 1];
    var href = nl ? "#/m/" + m.id + "/" + nl.id : m.quiz.length ? "#/m/" + m.id + "/quiz" : "#/m/" + m.id;
    var label = isDone ? (nl ? "nextL" : m.quiz.length ? "toQuiz" : "backMod") : (nl ? "doneNext" : m.quiz.length ? "doneQuiz" : "finish");
    out += '<div class="lfoot"><a class="btn" data-act="done" data-k="' + k + '" href="' + href + '">' + (isDone ? "" : ic("check")) + esc(ui(label)) + ic("arrow") + "</a>";
    out += '<div class="pn">' + (pl ? '<a href="#/m/' + m.id + "/" + pl.id + '"><small>' + ic("back") + esc(ui("prev")) + "</small>" + fmt(pl.title) + "</a>" : "") +
      (nl ? '<a class="r" href="#/m/' + m.id + "/" + nl.id + '"><small>' + esc(ui("next")) + ic("next") + "</small>" + fmt(nl.title) + "</a>" : "") + "</div></div>";
    view.innerHTML = out;
  }

  /* ---------- quiz ---------- */
  var Q = null;
  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function newQuiz(m) {
    var src = [];
    if (m) m.quiz.forEach(function (q) { src.push({ q: q, m: m }); });
    else { mods.forEach(function (mm) { mm.quiz.forEach(function (q) { src.push({ q: q, m: mm }); }); }); src = shuffle(src).slice(0, 10); }
    Q = {
      id: m ? m.id : "mix", m: m, i: 0, score: 0, picked: -1, end: false,
      items: src.map(function (x) {
        return { q: x.q, m: x.m, opts: shuffle(x.q.options.map(function (o, j) { return { t: o, ok: j === x.q.answer }; })) };
      })
    };
  }
  function quizPage(m) {
    if (!Q || Q.id !== (m ? m.id : "mix")) newQuiz(m);
    title(ui("quizT"));
    setBar(m ? { back: "#/m/" + m.id, label: tx(m.title) } : { back: "#/practice", label: ui("practice") });
    renderQuiz();
  }
  function renderQuiz() {
    var out, n = Q.items.length;
    if (!n) { view.innerHTML = '<div class="empty">' + esc(ui("soon")) + "</div>"; return; }
    if (Q.end) {
      var pct = Math.round(Q.score * 100 / n);
      out = '<div class="result"><div class="kicker">' + esc(Q.m ? tx(Q.m.title) : ui("mix")) + '</div><div class="ring" style="--p:' + pct + ';margin-top:18px"><span>' + Q.score + "<small>/ " + n + "</small></span></div>" +
        "<h2>" + esc(ui(pct >= 80 ? "r1" : pct >= 50 ? "r2" : "r3")) + '</h2><div class="acts"><button type="button" class="btn" data-act="qagain">' + ic("retry") + esc(ui("tryAgain")) + "</button>" +
        (Q.m ? '<a class="btn ghost" href="#/m/' + Q.m.id + '">' + esc(ui("backMod")) + "</a>" : '<a class="btn ghost" href="#/practice">' + esc(ui("practice")) + "</a>") + "</div></div>";
    } else {
      var it = Q.items[Q.i], answered = Q.picked >= 0;
      out = '<div class="qz"><div class="qtop"><span>' + esc(ui("qOf", { a: Q.i + 1, b: n })) + '</span><div class="bar-p"><i style="width:' + Math.round((Q.i + (answered ? 1 : 0)) * 100 / n) + '%"></i></div></div>';
      if (!Q.m) out += '<div class="kicker" style="margin-top:14px">' + fmt(it.m.title) + "</div>";
      if (it.q.src) out += '<figure class="qim">' + pic(it.q.src, "", "(min-width: 760px) 720px, 100vw") + "</figure>";
      if (it.q.dg) out += '<div class="qim svg">' + dg(it.q.dg, it.q.args) + "</div>";
      out += "<h2>" + fmt(it.q.q) + '</h2><div class="opts">' + it.opts.map(function (o, j) {
        var cls = answered ? (o.ok ? " ok" : j === Q.picked ? " bad" : " dim") : "";
        var mark = answered && o.ok ? ic("check") : answered && j === Q.picked ? ic("x") : "ABCD".charAt(j);
        return '<button type="button" class="opt' + cls + '" data-act="pick" data-j="' + j + '"' + (answered ? " disabled" : "") + '><span class="l">' + mark + "</span><span>" + fmt(o.t) + "</span></button>";
      }).join("") + "</div>";
      if (answered) {
        var right = it.opts[Q.picked].ok;
        out += '<div class="why ' + (right ? "good" : "nope") + '" id="why"><b>' + esc(ui(right ? "right" : "wrong")) + "</b><p>" + fmt(it.q.why) + "</p></div>" +
          '<button type="button" class="btn" data-act="qnext">' + esc(ui(Q.i + 1 < n ? "nextQ" : "seeScore")) + ic("arrow") + "</button>";
      }
      out += "</div>";
    }
    view.innerHTML = out;
  }

  /* ---------- practice, words, credits ---------- */
  function practice() {
    title(ui("practice"));
    setBar(null);
    var out = '<header class="phead"><h1>' + esc(ui("practice")) + "</h1><p>" + esc(ui("practiceSub")) + "</p></header>";
    out += '<a class="mix" href="#/practice/mix"><span class="mi">' + ic("sparkle") + "</span><span><b>" + esc(ui("mix")) + "</b><small>" + esc(ui("mixSub")) + "</small></span>" + ic("arrow") + "</a>";
    out += '<div class="sec-h"><h2>' + esc(ui("quizzes")) + '</h2></div><div class="qlist">' + mods.filter(function (m) { return m.quiz.length; }).map(function (m) {
      var b = S.quiz[m.id];
      return '<a href="#/m/' + m.id + '/quiz">' + pic(m.cover, "", "50px") + "<span><b>" + fmt(m.title) + "</b><small>" + esc(ui("quizS", { n: m.quiz.length })) + "</small></span>" +
        '<span class="score' + (b ? (b.s / b.n >= 0.8 ? " hi" : "") : " none") + '">' + (b ? b.s + "/" + b.n : esc(ui("noQuiz"))) + "</span></a>";
    }).join("") + "</div>";
    var nd = tasks.filter(function (t) { return S.tasks[t.key]; }).length;
    out += '<div class="sec-h"><h2>' + esc(ui("tasks")) + "</h2><span>" + esc(ui("tasksSub", { a: nd, b: tasks.length })) + "</span></div>";
    mods.forEach(function (m) {
      var ts = tasks.filter(function (t) { return t.m === m; });
      if (!ts.length) return;
      out += '<h3 class="tgroup">' + fmt(m.title) + "</h3>" + ts.map(function (t) {
        var on = !!S.tasks[t.key];
        return '<div class="task' + (on ? " on" : "") + '"><button type="button" class="box" data-act="task" data-k="' + t.key + '" aria-pressed="' + on + '" aria-label="' + esc(ui("markTask")) + '">' + ic("check") +
          "</button><div><p>" + fmt(t.text) + '</p><a href="#/m/' + m.id + "/" + t.l.id + '">' + fmt(t.l.title) + " →</a></div></div>";
      }).join("");
    });
    view.innerHTML = out;
  }

  var wordQuery = "";
  function wordsPage() {
    title(ui("words"));
    setBar(null);
    view.innerHTML = '<header class="phead"><h1>' + esc(ui("words")) + "</h1><p>" + esc(ui("wordsSub", { n: words.length })) + '</p></header><div class="search">' + ic("search") +
      '<input type="search" id="q" autocomplete="off" spellcheck="false" placeholder="' + esc(ui("search")) + '" aria-label="' + esc(ui("search")) + '"></div><div id="wl"></div>';
    var q = $("q");
    q.value = wordQuery;
    q.addEventListener("input", function () { wordQuery = q.value; renderWords(); });
    renderWords();
  }
  function renderWords() {
    var s = wordQuery.trim().toLowerCase(), cur = "", out = "";
    words.forEach(function (w) {
      if (s && (w.en + " " + w.hi + " " + plain(w.def)).toLowerCase().indexOf(s) < 0) return;
      var L = String(w.en).charAt(0).toUpperCase();
      if (!s && L !== cur) { cur = L; out += '<div class="letter">' + esc(L) + "</div>"; }
      out += '<div class="word"><b>' + esc(w.en) + '</b><span class="hiw" lang="hi">' + esc(w.hi) + "</span><p>" + fmt(w.def) + "</p>" +
        (w.m ? '<a href="#/m/' + w.m.id + "/" + w.l.id + '">' + fmt(w.m.title) + " · " + fmt(w.l.title) + "</a>" : "") + "</div>";
    });
    $("wl").innerHTML = out || '<p class="empty">' + esc(ui("noWords")) + "</p>";
  }

  function creditsPage() {
    title(ui("credits"));
    setBar({ back: "#/", label: ui("learn") });
    var groups = {}, order = [];
    (FD.credits || []).forEach(function (c) {
      var g = c.file.split("/")[2];
      if (!groups[g]) { groups[g] = []; order.push(g); }
      groups[g].push(c);
    });
    order.sort(function (a, b) { return (byId[a] ? byId[a].num : 99) - (byId[b] ? byId[b].num : 99); });
    view.innerHTML = '<div class="credits"><header class="phead"><h1>' + esc(ui("credits")) + "</h1><p>" + esc(ui("creditsSub")) + "</p></header>" + order.map(function (g) {
      return "<h3>" + (byId[g] ? fmt(byId[g].title) : esc(g)) + '</h3><ul class="cred">' + groups[g].map(function (c) {
        return '<li><img src="' + esc(smOf(c.file)) + '" alt="" loading="lazy"><div><b>' + esc(c.title || c.file) + "</b><small>" + esc([c.author, c.license].filter(Boolean).join(" · ")) +
          (c.source ? ' · <a href="' + esc(c.source) + '" target="_blank" rel="noopener">' + esc(ui("source")) + "</a>" : "") + "</small></div></li>";
      }).join("") + "</ul>";
    }).join("") + "</div>";
  }

  function notFound() {
    title("");
    setBar({ back: "#/", label: ui("learn") });
    view.innerHTML = '<div class="empty"><h1>' + esc(ui("notFound")) + '</h1><a class="btn" href="#/">' + esc(ui("goHome")) + "</a></div>";
  }

  /* ---------- router ---------- */
  var cur = null, prev = null, navClick = false, mem = {};
  function routeKey() { return location.hash && location.hash !== "#" ? location.hash : "#/"; }
  function render() {
    var p = routeKey().replace(/^#\/?/, "").split("/").filter(Boolean), tab = "learn";
    view.className = "";
    if (!p.length) home();
    else if (p[0] === "m" && byId[p[1]]) {
      var m = byId[p[1]];
      if (!p[2]) modulePage(m);
      else if (p[2] === "quiz") quizPage(m);
      else {
        var l = m.lessons.filter(function (x) { return x.id === p[2]; })[0];
        if (l) lessonPage(m, l); else notFound();
      }
    } else if (p[0] === "practice") { tab = "practice"; if (p[1] === "mix") quizPage(null); else practice(); }
    else if (p[0] === "words") { tab = "words"; wordsPage(); }
    else if (p[0] === "credits") creditsPage();
    else notFound();
    renderTabs(tab);
    document.documentElement.lang = FD.lang;
    langButtons();
  }
  function animate() { view.classList.remove("in"); void view.offsetWidth; view.classList.add("in"); }
  function onHash() {
    if (lbOpen) closeLB(true);
    if (cur) mem[cur] = window.scrollY;
    prev = cur;
    cur = routeKey();
    if (Q && cur.indexOf("/quiz") < 0 && cur !== "#/practice/mix") Q = null;
    render();
    animate();
    window.scrollTo(0, navClick ? 0 : mem[cur] || 0);
    navClick = false;
  }
  function setLang(l) {
    if (l === FD.lang) return;
    var root = document.documentElement, max = Math.max(1, root.scrollHeight - innerHeight), r = window.scrollY / max;
    FD.lang = l;
    save("lang", l);
    render();
    window.scrollTo(0, r * Math.max(0, root.scrollHeight - innerHeight));
  }

  /* ---------- actions ---------- */
  function setTask(k, on) {
    if (on) S.tasks[k] = today(); else delete S.tasks[k];
    save("tasks", S.tasks);
    var els = document.querySelectorAll('[data-act="task"][data-k="' + k + '"]');
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      el.classList.toggle("on", on);
      el.setAttribute("aria-pressed", on ? "true" : "false");
      var lab = el.querySelector(".tl-l");
      if (lab) lab.textContent = ui(on ? "taskDone" : "markTask");
      var row = el.closest(".task");
      if (row) row.classList.toggle("on", on);
    }
  }
  var actions = {
    lang: function (el) { setLang(el.getAttribute("data-l")); },
    back: function (el, e) { if (prev && prev === el.getAttribute("href")) { e.preventDefault(); history.back(); } },
    done: function (el) { var k = el.getAttribute("data-k"); if (!S.done[k]) { S.done[k] = today(); save("done", S.done); } },
    task: function (el) { var k = el.getAttribute("data-k"); setTask(k, !S.tasks[k]); },
    pick: function (el) {
      if (!Q || Q.picked >= 0) return;
      Q.picked = +el.getAttribute("data-j");
      if (Q.items[Q.i].opts[Q.picked].ok) Q.score++;
      renderQuiz();
      var w = $("why");
      if (w && w.getBoundingClientRect().bottom > innerHeight - 90) w.scrollIntoView({ behavior: "smooth", block: "center" });
    },
    qnext: function () {
      Q.i++;
      Q.picked = -1;
      if (Q.i >= Q.items.length) {
        Q.end = true;
        if (Q.m) {
          var b = S.quiz[Q.m.id];
          if (!b || Q.score >= b.s) { S.quiz[Q.m.id] = { s: Q.score, n: Q.items.length }; save("quiz", S.quiz); }
        }
      }
      renderQuiz();
      animate();
      window.scrollTo(0, 0);
    },
    qagain: function () { newQuiz(Q.m); renderQuiz(); animate(); window.scrollTo(0, 0); },
    install: function () {
      if (!installEvt) return;
      installEvt.prompt();
      installEvt = null;
      var b = $("install");
      if (b) b.hidden = true;
    },
    lbclose: function () { closeLB(false); }
  };
  document.addEventListener("click", function (e) {
    var t = e.target;
    var a = t.closest && t.closest('a[href^="#"]');
    if (a) navClick = true;
    var act = t.closest && t.closest("[data-act]");
    if (act && actions[act.getAttribute("data-act")]) actions[act.getAttribute("data-act")](act, e);
    if (e.defaultPrevented) navClick = false;
    var im = t.closest && t.closest("img[data-full]");
    if (im && !a && !lbOpen) openLB(im);
    else if (lbOpen && !t.closest(".cr a")) closeLB(false);
  });

  /* ---------- photo viewer ---------- */
  var lbOpen = false;
  function openLB(img) {
    var src = img.getAttribute("data-full"), c = credits[src] || {};
    lbImg.src = src;
    lbImg.alt = img.alt || "";
    var cr = [c.author ? ui("photo") + ": " + c.author : "", c.license || ""].filter(Boolean).join(" · ");
    lbCap.innerHTML = (img.alt ? esc(img.alt) : "") + '<span class="cr">' + esc(cr) + (c.source ? (cr ? " · " : "") + '<a href="' + esc(c.source) + '" target="_blank" rel="noopener">' + esc(ui("source")) + "</a>" : "") + "</span>";
    lb.classList.add("on");
    document.body.classList.add("noscroll");
    lbOpen = true;
    try { history.pushState({ lb: 1 }, ""); } catch (e) { /* file:// in some browsers */ }
  }
  function closeLB(fromHistory) {
    if (!lbOpen) return;
    lbOpen = false;
    lb.classList.remove("on");
    document.body.classList.remove("noscroll");
    lbImg.removeAttribute("src");
    if (!fromHistory && history.state && history.state.lb) history.back();
  }
  window.addEventListener("popstate", function () { if (lbOpen) closeLB(true); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && lbOpen) closeLB(false); });

  /* hide any photo that fails to load (keeps layout clean) */
  document.addEventListener("error", function (e) {
    var t = e.target;
    if (t && t.tagName === "IMG" && t !== lbImg) { var box = t.closest(".gi, .fig, .im, .ph") || t; box.classList.add("broken"); }
  }, true);

  window.addEventListener("scroll", function () {
    var y = window.scrollY;
    bar.classList.toggle("scrolled", y > 4);
    if (readMode) {
      var h = document.documentElement.scrollHeight - innerHeight;
      readbar.style.width = (h > 0 ? Math.min(100, y * 100 / h) : 0) + "%";
    }
  }, { passive: true });

  /* ---------- install as an app (Android/Chrome) + offline cache ---------- */
  var installEvt = null;
  window.addEventListener("beforeinstallprompt", function (e) {
    e.preventDefault();
    installEvt = e;
    var b = $("install");
    if (b) b.hidden = false;
  });
  if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) {
    window.addEventListener("load", function () { navigator.serviceWorker.register("sw.js").catch(function () {}); });
  }

  /* ---------- start ---------- */
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  window.addEventListener("hashchange", onHash);
  cur = routeKey();
  render();
})();
