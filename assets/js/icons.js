/* Line icons (24x24, stroke = currentColor). Use by name: { icon: "scissors" }.
   FD.iconSvg(name) returns the full <svg>. */
(function () {
  var I = {
    /* sewing & making */
    needle: '<path d="M3.5 20.5 17 7"/><path d="M15.5 5.5 18 3a2.1 2.1 0 0 1 3 3l-2.5 2.5"/><path d="M7 21c3 0 4-3 7-3s4 2 4 2"/>',
    thread: '<rect x="6" y="3" width="12" height="3" rx="1"/><rect x="6" y="18" width="12" height="3" rx="1"/><path d="M8 6v12M16 6v12M8 9l8 2.5M8 13l8 2.5"/>',
    scissors: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.1 8.1 20 20M8.1 15.9 20 4"/>',
    tape: '<circle cx="9" cy="12" r="6"/><circle cx="9" cy="12" r="2"/><path d="M15 12h6v4h-6"/><path d="M17.5 12v2M19.5 12v2"/>',
    pencil: '<path d="M16.5 3.5l4 4L8 20H4v-4L16.5 3.5z"/><path d="M13.5 6.5l4 4"/>',
    brush: '<path d="M18.4 2.6a2 2 0 0 1 3 3L12 15l-3-3 9.4-9.4z"/><path d="M9 12c-2 0-4 1.5-4 4 0 1.5-1 3-3 3 2.5 2 7 2 8.5-.5A3.5 3.5 0 0 0 12 15"/>',
    palette: '<path d="M12 3a9 9 0 0 0 0 18c1.1 0 1.5-.8 1.5-1.6 0-1.1-.9-1.4-.9-2.4 0-.9.7-1.5 1.6-1.5H16a5 5 0 0 0 5-5c0-4.1-4-7.5-9-7.5z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10" cy="7" r="1"/><circle cx="15" cy="7.5" r="1"/>',
    hanger: '<path d="M12 9V7.3c1.2-.8 2-1.3 2-2.3a2 2 0 1 0-4 0"/><path d="M12 9 3 15.5c-.9.7-.4 2.5.8 2.5h16.4c1.2 0 1.7-1.8.8-2.5L12 9z"/>',
    dress: '<path d="M9 2v3l-1 4 1.5 3L5 21h14l-4.5-9L16 9l-1-4V2"/><path d="M9.5 12h5"/>',
    shirt: '<path d="M8 3 3 6l2 4 2-1v12h10V9l2 1 2-4-5-3c0 1.7-1.3 3-4 3S8 4.7 8 3z"/>',
    fabric: '<path d="M4 4h16v12c-2 0-2 3-4 3s-2-3-4-3-2 3-4 3-2-3-4-3V4z"/><path d="M4 8h16"/>',
    button: '<circle cx="12" cy="12" r="9"/><circle cx="10" cy="10" r="1"/><circle cx="14" cy="10" r="1"/><circle cx="10" cy="14" r="1"/><circle cx="14" cy="14" r="1"/>',
    pin: '<circle cx="7" cy="7" r="3"/><path d="M9.2 9.2 20 20"/>',
    pushpin: '<path d="M9 3h6l-1 6 4 4H6l4-4-1-6z"/><path d="M12 13v8"/>',
    ruler: '<path d="M3 17 17 3l4 4L7 21l-4-4z"/><path d="M7 13l2 2M10 10l2 2M13 7l2 2"/>',
    iron: '<path d="M2 18h19v-4a5 5 0 0 0-5-5H7.5C4.5 9 2 13.5 2 18z"/><path d="M9 9V6h8"/>',
    machine: '<path d="M3 20h18"/><path d="M5 20v-4h13V8a3 3 0 0 0-3-3H7a2 2 0 0 0-2 2v2h10"/><path d="M15 16v-3"/><path d="M8 9v4"/>',
    /* ideas & style */
    sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z"/><path d="M19 15l.7 1.8 1.8.7-1.8.7L19 20l-.7-1.8-1.8-.7 1.8-.7L19 15z"/>',
    heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
    star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3z"/>',
    eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    book: '<path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H20v15H5.5A1.5 1.5 0 0 0 4 19.5v-15z"/><path d="M4 19.5A1.5 1.5 0 0 0 5.5 21H20"/>',
    camera: '<path d="M3 8a2 2 0 0 1 2-2h2l2-2h6l2 2h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8z"/><circle cx="12" cy="13" r="4"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z"/>',
    leaf: '<path d="M20 4C10 4 4 9 4 17c0 1 .2 2 .5 3 8 0 15.5-4.5 15.5-16z"/><path d="M4.5 20C8 14 12 11 16 9"/>',
    trend: '<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
    store: '<path d="M4 10v10h16V10"/><path d="M3 4h18l-1 6H4L3 4z"/><path d="M10 20v-5h4v5"/>',
    crown: '<path d="M3 8l4 4 5-7 5 7 4-4-2 11H5L3 8z"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/><path d="M3 13h18"/>',
    bulb: '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/>',
    layers: '<path d="M12 3l9 4.5-9 4.5-9-4.5L12 3z"/><path d="M3 12l9 4.5 9-4.5"/><path d="M3 16.5 12 21l9-4.5"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    drop: '<path d="M12 3s7 7.5 7 12a7 7 0 0 1-14 0c0-4.5 7-12 7-12z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    flower: '<circle cx="12" cy="12" r="2.5"/><path d="M12 9.5C10 6 10.5 3 12 3s2 3 0 6.5zM14.5 12c3.5-2 6.5-1.5 6.5 0s-3 2-6.5 0zM12 14.5c2 3.5 1.5 6.5 0 6.5s-2-3 0-6.5zM9.5 12C6 14 3 13.5 3 12s3-2 6.5 0z"/>',
    gem: '<path d="M6 3h12l3 6-9 12L3 9l3-6z"/><path d="M3 9h18"/><path d="M12 21 8.5 9 10 3M12 21l3.5-12L14 3"/>',
    shoe: '<path d="M3 17c0-3 1-7 2-9 3 0 5 4 9 5l5 1.5c1.5.4 2 1.5 2 2.5v2H3z"/><path d="M5 17v3"/>',
    bag: '<path d="M5 8h14l-1 13H6L5 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
    scale: '<path d="M12 3v18M7 21h10M4 7h16"/><path d="M4 7l-2.5 6a2.5 2.5 0 0 0 5 0L4 7zM20 7l-2.5 6a2.5 2.5 0 0 0 5 0L20 7z"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    wave: '<path d="M2 8c2.5 0 2.5-3 5-3s2.5 3 5 3 2.5-3 5-3 2.5 3 5 3"/><path d="M2 14c2.5 0 2.5-3 5-3s2.5 3 5 3 2.5-3 5-3 2.5 3 5 3"/><path d="M2 20c2.5 0 2.5-3 5-3s2.5 3 5 3 2.5-3 5-3 2.5 3 5 3"/>',
    shapes: '<circle cx="7.5" cy="7.5" r="4.5"/><rect x="13" y="13" width="8" height="8" rx="1"/><path d="M17 3l4 7h-8l4-7z"/>',
    recycle: '<path d="M21 12a9 9 0 0 1-15.5 6.3"/><path d="M3 12A9 9 0 0 1 18.5 5.7"/><path d="M18.5 2v3.7h-3.7M5.5 22v-3.7h3.7"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    chat: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-4.8A8 8 0 1 1 21 12z"/>',
    award: '<circle cx="12" cy="9" r="6"/><path d="M8.5 14 7 22l5-3 5 3-1.5-8"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    check: '<path d="M4 12.5l5 5L20 6.5"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 7.5v.5"/>',
    alert: '<path d="M12 3 2 20h20L12 3z"/><path d="M12 10v4"/><path d="M12 17v.5"/>',
    /* app UI */
    home: '<path d="M3 11 12 3l9 8"/><path d="M5 10v10h14V10"/>',
    learn: '<path d="M2 5c3-1.5 7-1.5 10 0 3-1.5 7-1.5 10 0v14c-3-1.5-7-1.5-10 0-3-1.5-7-1.5-10 0V5z"/><path d="M12 5v14"/>',
    words: '<path d="M3 19 8 5l5 14M4.8 14h6.4"/><path d="M14.5 12.8c.6-.6 1.4-.8 2.5-.8 2 0 3 1 3 3v4"/><path d="M20 16.2c-.9-.3-1.9-.4-3-.3-1.5.2-3 .8-3 2.2 0 1.2 1 1.9 2.2 1.9 1.6 0 3.8-1 3.8-3.5"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    back: '<path d="M15 5l-7 7 7 7"/>',
    next: '<path d="M9 5l7 7-7 7"/>',
    arrow: '<path d="M4 12h16M14 6l6 6-6 6"/>',
    retry: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>',
    play: '<path d="M7 4v16l13-8L7 4z"/>',
    zoom: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5M11 8v6M8 11h6"/>'
  };
  var FD = window.FD;
  for (var k in I) FD.icons[k] = I[k];
  FD.iconSvg = function (name, cls) {
    var inner = FD.icons[name] || FD.icons.sparkle;
    return '<svg class="ic ' + (cls || "") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + inner + "</svg>";
  };
})();
