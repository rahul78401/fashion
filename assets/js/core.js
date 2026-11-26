/* Core registries. Content files call FD.module(), FD.icon(), FD.diagram() and FD.glossary().
   Loaded before every other script. */
(function () {
  var FD = (window.FD = window.FD || {});
  FD.modules = FD.modules || [];
  FD.icons = FD.icons || {};
  FD.diagrams = FD.diagrams || {};
  FD.words = FD.words || [];
  FD.credits = FD.credits || [];
  FD.lang = FD.lang || "en";

  FD.module = function (m) { FD.modules.push(m); };
  FD.icon = function (name, svg) { FD.icons[name] = svg; };
  FD.diagram = function (name, def) { FD.diagrams[name] = def; };
  FD.glossary = function (items) { Array.prototype.push.apply(FD.words, items); };

  /* Pick the string for the current (or given) language from {en, hi}. */
  FD.tx = function (v, lang) {
    if (v == null) return "";
    if (typeof v === "string") return v;
    lang = lang || FD.lang;
    return v[lang] || v.en || "";
  };
})();
