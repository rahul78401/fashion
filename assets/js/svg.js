/* Small helpers for drawing diagrams as SVG strings.
   Style classes (defined in assets/css/app.css, they follow light/dark mode):
     ln  = outline stroke, no fill          fl  = garment/paper fill + outline
     gd  = dashed guide line (muted)       ac  = accent stroke     acf = accent fill
     sf  = soft tinted fill                tx  = text (ink)        tm  = small muted text
   Colour-theory diagrams may use literal hex fills - that is fine. */
(function () {
  var FD = window.FD;

  /* Wrap inner markup in an <svg>. Width/height come from CSS (100% wide). */
  FD.svg = function (w, h, inner, cls) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + w + " " + h + '" class="' + (cls || "") +
      '" role="img" aria-hidden="true">' + inner + "</svg>";
  };

  /* Escape text for use inside SVG/HTML. */
  FD.esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };

  /* <text> element. opt: {cls, anchor: "start"|"middle"|"end", size} */
  FD.text = function (x, y, str, opt) {
    opt = opt || {};
    return '<text x="' + x + '" y="' + y + '" class="' + (opt.cls || "tx") + '" text-anchor="' + (opt.anchor || "middle") +
      '"' + (opt.size ? ' font-size="' + opt.size + '"' : "") + ">" + FD.esc(str) + "</text>";
  };

  /* Draw `inner` and its mirror image around the vertical line x = cx (for symmetric garments). */
  FD.mirror = function (cx, inner) {
    return inner + '<g transform="translate(' + 2 * cx + ' 0) scale(-1 1)">' + inner + "</g>";
  };

  /* Pick text for a language from {en, hi} (or a plain string). */
  FD.t = function (v, lang) { return FD.tx(v, lang); };
})();
