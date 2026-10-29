/* Capturr — "Look closer." gallery.
   Justified rows (every photo keeps its own shape), filters, a full-screen viewer
   that opens from the grid, and a loupe you hold to see the detail. No dependencies. */
(function () {
  'use strict';

  var section = document.querySelector('.gal');
  if (!section) return;
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canHover = !(window.matchMedia && window.matchMedia('(hover: none)').matches);
  var IMG = 'assets/img/gallery/';

  // ---------- content ----------
  function P(id, cat, a, file, title, place, gear, alt) {
    return { id: id, kind: 'photo', cat: cat, a: a, t: IMG + file + '-t.jpg', b: IMG + file + '.jpg', title: title, place: place, gear: gear, alt: alt };
  }
  var photos = [
    P('sara', 'P', 0.75, 'portrait-sara', 'Sara', 'Cliffs near Brela', '85mm · f/1.8 · 1/1000 · ISO 100', 'Woman in a camel coat and felt hat on a coastal cliff'),
    P('promenade', 'L', 1.5, 'lifestyle-promenade', 'Evening walk', 'Promenade, Opatija', '35mm · f/2.8 · 1/500 · ISO 200', 'Family walking along a seaside promenade at golden hour, the father carrying his son on his shoulders'),
    P('perfume', 'B', 0.75, 'brand-perfume', 'Amber', 'Fragrance launch', '100mm macro · f/11 · 1/125 · ISO 100', 'Amber perfume bottle on travertine stone'),
    P('ivan', 'P', 0.75, 'portrait-ivan', 'Ivan', 'Studio, Zagreb', '85mm · f/2.8 · 1/125 · ISO 100', 'Black-and-white portrait of an older man with a white beard'),
    P('ceramics', 'B', 1.5, 'brand-ceramics', 'Glaze study', 'Tableware collection', '50mm · f/5.6 · 1/500 · ISO 100', 'Sage and cream ceramic tableware on linen in hard sunlight with olive leaf shadows'),
    P('winter', 'L', 0.75, 'lifestyle-winter', 'Winter walk', 'Ljubljana', '50mm · f/1.8 · 1/320 · ISO 400', 'Couple embracing on a winter street'),
    P('dora', 'P', 1.5, 'portrait-dora', 'Dora', 'Studio, Zagreb', '50mm · f/2.8 · 1/125 · ISO 200', 'Woman in a sage green suit seated on a stool against a painted canvas backdrop'),
    P('watch', 'B', 0.75, 'brand-watch', 'Green dial', 'Watch catalogue', '100mm macro · f/5.6 · 1/160 · ISO 100', 'Steel watch with a green dial on a wrist'),
    P('kitchen', 'L', 1.5, 'lifestyle-kitchen', 'Kitchen dance', 'At home, Rijeka', '35mm · f/1.8 · 1/125 · ISO 1600', 'Couple laughing and dancing in a sunlit kitchen'),
    P('ema', 'P', 0.75, 'portrait-ema', 'Ema', 'Studio, Zagreb', '100mm · f/2.8 · 1/200 · ISO 100', 'Close-up portrait of a red-haired woman with freckles'),
    P('sneaker', 'B', 0.75, 'brand-sneaker', 'Leather sneaker', 'Footwear campaign', '100mm macro · f/8 · 1/125 · ISO 100', 'White leather sneaker on a slate-blue backdrop'),
    P('ante', 'P', 1.5, 'portrait-ante', 'Ante', 'Harbour, Komiža', '50mm · f/2 · 1/250 · ISO 800', 'Older fisherman in a navy sweater on a harbour quay at dawn'),
    P('zlatni', 'L', 0.75, 'lifestyle-zlatni-rat', 'Morning swim', 'Zlatni Rat, Brač', 'Drone · 24mm · f/2.8 · 1/1000', 'Aerial view of turquoise waves on a white pebble beach'),
    P('fashion', 'B', 1.5, 'brand-fashion', 'Red', 'Fashion editorial', '50mm · f/4 · 1/200 · ISO 100', 'Studio fashion shoot of a woman in a red shirt beside potted plants'),
    P('lea', 'P', 0.75, 'portrait-lea', 'Lea', 'Studio, Zagreb', '50mm · f/2 · 1/200 · ISO 200', 'Black-and-white portrait of a laughing woman with curly hair'),
    P('brunch', 'L', 0.75, 'lifestyle-brunch', 'Sunday brunch', 'Botanical café, Zagreb', '35mm · f/2.8 · 1/200 · ISO 400', 'Plant-filled conservatory café in soft light'),
    P('styling', 'B', 1.5, 'brand-styling', 'On set', 'Ceramics studio campaign', '35mm · f/4 · 1/125 · ISO 400', 'Stylist arranging ceramic vases for a product shoot'),
    P('nika', 'P', 0.75, 'portrait-nika', 'Nika', 'At home, Samobor', '35mm · f/1.8 · 1/250 · ISO 400', 'Woman in a cream sweater by a window, eyes closed'),
    P('sofa', 'L', 1.5, 'lifestyle-sofa', 'Ten years', 'Anniversary session, studio', '35mm · f/2.8 · 1/160 · ISO 200', 'Couple laughing on a vintage sofa in a sunlit studio'),
    P('skincare', 'B', 0.75, 'brand-skincare', 'Morning ritual', 'Skincare line', '100mm macro · f/8 · 1/160 · ISO 100', 'Dropper bottle and jar on wet stone with eucalyptus'),
    P('mia', 'P', 0.75, 'portrait-mia', 'Mia', 'Studio, Zagreb', '85mm · f/2 · 1/160 · ISO 200', 'Woman in a striped coat with her hands raised to her face'),
    P('dinner', 'L', 0.75, 'lifestyle-dinner', 'Dinner with friends', 'Terrace, Vis', '35mm · f/1.4 · 1/125 · ISO 1600', 'Friends sharing an outdoor dinner by candlelight'),
    P('headphones', 'B', 0.75, 'brand-headphones', 'Sage', 'Audio product launch', '85mm · f/8 · 1/125 · ISO 100', 'Sage-green headphones on a concrete plinth'),
    P('tomislav', 'P', 1.5, 'portrait-tomislav', 'Tomislav', 'Business portrait, studio', '35mm · f/5.6 · 1/125 · ISO 100', 'Man in a stone-coloured suit posing on a box in a white studio'),
    P('rain', 'L', 0.75, 'lifestyle-rain', 'Flowers for Saturday', 'Upper Town, Zagreb', '50mm · f/2 · 1/250 · ISO 800', 'Woman carrying white flowers along a rainy street'),
    P('barista', 'B', 0.75, 'brand-barista', 'Latte art', 'Café menu shoot', '50mm · f/2.8 · 1/250 · ISO 400', 'Barista pouring latte art into a grey ceramic cup'),
    P('marin', 'P', 0.75, 'portrait-marin', 'Marin', 'Studio, Zagreb', '85mm · f/4 · 1/160 · ISO 100', 'Man in a charcoal turtleneck against a slate-blue backdrop'),
    P('chair', 'B', 0.75, 'brand-chair', 'Oak lounge chair', 'Furniture lookbook', '35mm · f/8 · 1/60 · ISO 200', 'Oak lounge chair in a plaster-walled room')
  ];
  var SESSION = { P: 'Portrait session', L: 'Lifestyle session', B: 'Brand shoot' };
  var counts = { A: photos.length };
  ['P', 'L', 'B'].forEach(function (c) { counts[c] = photos.filter(function (p) { return p.cat === c; }).length; });
  var notes = {
    P: { id: 'txP', kind: 'text', kick: 'Portraits · ' + counts.P + ' photos', body: "Portraits you'll actually use. On your website, your book cover, your mum's fridge." },
    L: { id: 'txL', kind: 'text', kick: 'Lifestyle · ' + counts.L + ' photos', body: 'Your family the way it really is on a Sunday morning. Messy hair included.' },
    B: { id: 'txB', kind: 'text', kick: 'Brand · ' + counts.B + ' photos', body: 'Product and team photos you can use on your site, your socials and your next pitch deck.' }
  };
  var reviews = {
    P: { id: 'rvP', kind: 'quote', body: 'CAPTURR made me forget the camera was there. Every portrait feels like me on my best day.', by: 'Sample review — Portrait session' },
    L: { id: 'rvL', kind: 'quote', body: 'CAPTURR exceeded my expectations with their personalized and creative approach.', by: 'Lifestyle session client' },
    B: { id: 'rvB', kind: 'quote', body: 'CAPTURR gave our brand a visual voice. The images now do the selling for us.', by: 'Sample review — Brand campaign' }
  };
  var byId = {};
  photos.forEach(function (p) { byId[p.id] = p; });
  ['P', 'L', 'B'].forEach(function (c) { byId[notes[c].id] = notes[c]; byId[reviews[c].id] = reviews[c]; });
  var items = photos.concat([notes.P, notes.L, notes.B, reviews.P, reviews.L, reviews.B]);
  var ids = photos.map(function (p) { return p.id; });
  var orderAll = ids.slice(0, 4).concat(['rvP'], ids.slice(4, 12), ['rvL'], ids.slice(12, 20), ['rvB'], ids.slice(20));

  function listFor(f) {
    if (f === 'A') return orderAll.map(function (id) { return byId[id]; });
    var ph = photos.filter(function (p) { return p.cat === f; });
    return [notes[f]].concat(ph.slice(0, 4), [reviews[f]], ph.slice(4));
  }
  function photoList() { return listFor(s.gf).filter(function (it) { return it.kind === 'photo'; }); }
  function pad2(n) { return (n < 10 ? '0' : '') + n; }

  // ---------- elements ----------
  var grid = $('.gal-grid', section), cursor = $('.gcur', section), fil = $('.gal-filters', section);
  var filters = $$('.gf', fil), shownEl = $('[data-gshown]', section), totalEl = $('[data-gtotal]', section);
  var moreBtn = $('.gal-more', section), moreLabel = $('[data-glabel]', section), pill = $('.gh-pill', section);
  var view = $('.gv', section), stage = $('.gv-stage', view), loupe = $('.loupe', view), strip = $('.gv-strip', view);
  var vCount = $('.gv-count', view), vN = $('.gv-n', view), vOf = $('.gv-of', view), vCat = $('.gv-cat', view);
  var vInfo = $('.gv-info', view), vMeta = $('.gv-meta', view), vT = $('.gv-t', view), vP = $('.gv-p', view), vG = $('.gv-g', view);
  var vHint = $('[data-ghint]', view);
  if (vHint) vHint.textContent = canHover ? 'Click and hold to look closer' : 'Press and hold to look closer';

  // one element per item, kept for the life of the page so filters can glide them around
  var tileEl = {};
  items.forEach(function (it) {
    var el;
    if (it.kind === 'photo') {
      el = document.createElement('button');
      el.type = 'button';
      el.className = 'gt out';
      el.setAttribute('data-gi', it.id);
      el.setAttribute('aria-label', 'Open photo: ' + it.title + ', ' + it.place);
      el.innerHTML = '<span class="gt-ph"><img loading="lazy" decoding="async" alt=""></span>' +
        '<span class="gt-cap" aria-hidden="true"><span class="gt-no"></span><span class="gt-tx"><span class="gt-tt"></span><span class="gt-pl"></span></span><span class="gt-gear"></span></span>';
      var im = $('img', el);
      im.src = it.t; im.alt = it.alt;
      $('.gt-tt', el).textContent = it.title;
      $('.gt-pl', el).textContent = it.place;
      $('.gt-gear', el).textContent = it.gear.split(' · ').slice(0, 2).join(' · ');
      el.addEventListener('click', function () { openPhoto(it.id); });
      el.addEventListener('mouseenter', function () {
        if (!canHover) return;
        clearTimeout(hotT);
        if (s.hot !== it.id) set({ hot: it.id, ck: s.ck + 1 });
      });
      el.addEventListener('mouseleave', function () {
        clearTimeout(hotT);
        hotT = setTimeout(function () { if (s.hot) set({ hot: '' }); }, 90);
      });
    } else if (it.kind === 'text') {
      el = document.createElement('div');
      el.className = 'gtx out';
      el.innerHTML = '<p class="gtx-k"></p><p class="gtx-t"></p>';
      $('.gtx-k', el).textContent = it.kick;
      $('.gtx-t', el).textContent = it.body;
    } else {
      el = document.createElement('figure');
      el.className = 'gqt out';
      el.innerHTML = '<span class="gq-m" aria-hidden="true">“</span><blockquote></blockquote><figcaption></figcaption>';
      $('blockquote', el).textContent = it.body;
      $('figcaption', el).textContent = it.by;
    }
    grid.insertBefore(el, cursor);
    tileEl[it.id] = el;
  });

  // ---------- state ----------
  var s = { seen: false, vis: false, gf: 'A', more: false, gw: grid.getBoundingClientRect().width || 1224, hot: '', ck: 0,
    vOpen: false, vClosing: false, vFlip: false, vIdx: 0, vPrev: -1, vDir: 1, vTick: 0, loupe: false, flyId: '',
    pi: 0, piPrev: -1, piTick: 0 };
  var hotT = 0, holdT = 0, flipT = 0, closeT = 0, queued = false, lastPos = {}, listKey = '', pillKey = '';
  function set(patch) {
    for (var k in patch) s[k] = patch[k];
    if (!queued) { queued = true; Promise.resolve().then(function () { queued = false; render(); }); }
  }
  function cls(el, name) { if (el && el.getAttribute('class') !== name) el.setAttribute('class', name); }

  // ---------- justified rows ----------
  function justify(list, W, gap, targets, mob) {
    var pos = {}, rows = [], y = 0, row = [], sumA = 0;
    function asp(it) { return it.kind === 'photo' ? it.a : (it.kind === 'text' ? (mob ? 2 : 0.82) : (mob ? 1.45 : 1.08)); }
    function flush(h) {
      var x = 0;
      row.forEach(function (it, j) {
        var w = j === row.length - 1 ? Math.max(0, W - x) : asp(it) * h;
        if (row.isLast) w = asp(it) * h;
        pos[it.id] = { x: x, y: y, w: w, h: h, row: rows.length, col: j };
        x += w + gap;
      });
      rows.push(y + h);
      y += h + gap;
      row = []; sumA = 0;
    }
    list.forEach(function (it) {
      if (mob && it.kind !== 'photo') {
        if (row.length) {
          var t0 = targets[rows.length % targets.length], h0 = (W - gap * (row.length - 1)) / sumA;
          if (h0 > t0 * 1.3) { row.isLast = true; h0 = t0; }
          flush(h0);
        }
        row.push(it); sumA = asp(it);
        flush(W / sumA);
        return;
      }
      var t = targets[rows.length % targets.length];
      row.push(it); sumA += asp(it);
      var h = (W - gap * (row.length - 1)) / sumA;
      if (h > t) return;
      if (row.length > 1) {
        var prevA = sumA - asp(it), hPrev = (W - gap * (row.length - 2)) / prevA;
        if (Math.abs(hPrev - t) < Math.abs(h - t) && hPrev < t * 1.4) {
          row.pop(); flush(hPrev);
          row.push(it); sumA = asp(it);
          var h1 = W / sumA;
          if (h1 <= targets[rows.length % targets.length]) flush(h1);
          return;
        }
      }
      flush(h);
    });
    if (row.length) {
      var tl = targets[rows.length % targets.length], hl = (W - gap * (row.length - 1)) / sumA;
      if (hl > tl * 1.3) { row.isLast = true; hl = tl; }
      flush(hl);
    }
    return { pos: pos, rows: rows };
  }

  // ---------- render ----------
  function render() {
    var W = Math.max(260, s.gw || 1224), mob = W < 600, tab = !mob && W < 1000;
    var gap = mob ? 10 : (tab ? 16 : 20);
    var targets = mob ? [196, 232, 180, 214] : (tab ? [300, 256, 320, 276] : [400, 330, 430, 350]);
    var maxRows = mob ? 4 : 3;
    var list = listFor(s.gf), L = justify(list, W, gap, targets, mob);
    var rowsShown = s.more ? L.rows.length : Math.min(maxRows, L.rows.length);
    grid.style.height = (rowsShown ? L.rows[rowsShown - 1] : 0).toFixed(1) + 'px';
    var n = 0, shown = 0;
    list.forEach(function (it) {
      if (it.kind !== 'photo') return;
      n++;
      $('.gt-no', tileEl[it.id]).textContent = pad2(n);
      var p = L.pos[it.id];
      if (p && p.row < rowsShown) shown++;
    });
    items.forEach(function (it) {
      var el = tileEl[it.id], p = L.pos[it.id], vis = !!p && p.row < rowsShown;
      if (p) lastPos[it.id] = p;
      var q = p || lastPos[it.id] || { x: 0, y: 0, w: 280, h: 360, row: 0, col: 0 };
      var rr = q.row >= maxRows ? q.row - maxRows : q.row;
      var base = it.kind === 'photo' ? 'gt' : (it.kind === 'text' ? 'gtx' : 'gqt');
      el.style.transform = 'translate(' + q.x.toFixed(1) + 'px, ' + q.y.toFixed(1) + 'px)';
      el.style.width = q.w.toFixed(1) + 'px';
      el.style.height = q.h.toFixed(1) + 'px';
      el.style.setProperty('--d', (rr * 0.1 + q.col * 0.07).toFixed(2) + 's');
      cls(el, [base, vis ? 'in' : 'out', s.hot === it.id ? 'hot' : '', s.flyId === it.id ? 'fly' : ''].filter(Boolean).join(' '));
      if (it.kind === 'photo') el.disabled = !vis; else el.setAttribute('aria-hidden', String(!vis));
    });
    shownEl.textContent = shown;
    totalEl.textContent = counts[s.gf];
    var noun = { A: 'photos', P: 'portraits', L: 'lifestyle photos', B: 'brand photos' }[s.gf];
    moreBtn.hidden = L.rows.length <= maxRows;
    moreLabel.textContent = s.more ? 'Show fewer' : 'Show all ' + counts[s.gf] + ' ' + noun;
    moreBtn.classList.toggle('more-on', s.more);
    moreBtn.setAttribute('aria-expanded', String(s.more));
    filters.forEach(function (b) {
      var on = b.getAttribute('data-f') === s.gf;
      b.classList.toggle('on', on);
      b.setAttribute('aria-pressed', String(on));
    });
    section.classList.toggle('vopen', s.vOpen);
    grid.classList.toggle('hovering', !!s.hot);
    cls(cursor, ['gcur', s.hot ? 'on' : '', 'k' + (s.ck % 2)].filter(Boolean).join(' '));

    // viewer content follows the current filter
    var vList = photoList(), nv = vList.length, vi = Math.min(s.vIdx, Math.max(0, nv - 1));
    var key = s.gf;
    if (key !== listKey) {
      listKey = key;
      stage.querySelectorAll('.gs').forEach(function (f) { f.remove(); });
      strip.innerHTML = '';
      vList.forEach(function (p, i) {
        var f = document.createElement('figure');
        f.className = 'gs';
        f.setAttribute('data-vi', p.id);
        var im = document.createElement('img');
        im.alt = p.alt; im.draggable = false; im.src = p.t;
        im.style.setProperty('--a', p.a);
        f.appendChild(im);
        stage.insertBefore(f, loupe);
        var b = document.createElement('button');
        b.type = 'button'; b.className = 'gst';
        b.setAttribute('aria-label', 'Photo ' + (i + 1) + ': ' + p.title);
        b.style.setProperty('--a', p.a);
        b.innerHTML = '<img alt="" loading="lazy" decoding="async">';
        $('img', b).src = p.t;
        b.addEventListener('click', function () { go(i); });
        strip.appendChild(b);
      });
    }
    var slides = $$('.gs', stage), thumbs = $$('.gst', strip);
    slides.forEach(function (f, i) {
      var d = Math.abs(i - vi), near = s.vOpen && (d <= 1 || d === nv - 1 || i === s.vPrev);
      var im = f.firstChild, want = near ? vList[i].b : vList[i].t;
      if (near && im.getAttribute('src') !== want) im.src = want;
      cls(f, i === vi ? 'gs on' : (i === s.vPrev ? 'gs leave' : 'gs'));
    });
    thumbs.forEach(function (b, i) { b.classList.toggle('on', i === vi); });
    var cur = vList[vi] || photos[0], k = 'k' + (s.vTick % 2);
    cls(view, ['gv', s.vOpen ? 'open' : '', s.vClosing ? 'closing' : '', s.vFlip ? 'flip' : '', s.loupe ? 'zoom' : ''].filter(Boolean).join(' '));
    view.setAttribute('aria-hidden', String(!s.vOpen));
    stage.style.setProperty('--dir', s.vDir);
    cls(vCount, 'gv-count ' + k); cls(vInfo, 'gv-info ' + k); cls(vMeta, 'gv-meta ' + k);
    vN.textContent = pad2(vi + 1);
    vOf.textContent = ' / ' + pad2(nv);
    vCat.textContent = SESSION[cur.cat];
    vT.textContent = cur.title; vP.textContent = cur.place; vG.textContent = cur.gear;

    // the photo inside the headline
    var pills = vList.filter(function (p) { return p.a > 1; }).concat(vList.filter(function (p) { return p.a <= 1; })).slice(0, 6);
    if (pillKey !== key) {
      pillKey = key;
      pill.innerHTML = '';
      pills.forEach(function (p) { var im = document.createElement('img'); im.alt = ''; im.src = p.t; pill.appendChild(im); });
    }
    var pn = pills.length || 1, pOn = s.pi % pn, pPrev = s.piPrev < 0 ? -1 : s.piPrev % pn;
    $$('img', pill).forEach(function (im, i) {
      cls(im, i === pOn ? (s.piPrev < 0 ? 'on first' : 'on') : (i === pPrev ? 'leave' : ''));
    });
  }

  // ---------- filters, show all ----------
  function placeU() {
    var on = $('.gf.on', fil);
    if (!on) return;
    var br = fil.getBoundingClientRect(), r = on.getBoundingClientRect();
    fil.style.setProperty('--ux', (r.left - br.left + fil.scrollLeft).toFixed(1) + 'px');
    fil.style.setProperty('--uw', r.width.toFixed(1) + 'px');
  }
  filters.forEach(function (b) {
    b.addEventListener('click', function () {
      var f = b.getAttribute('data-f');
      if (f === s.gf) return;
      set({ gf: f, hot: '', pi: 0, piPrev: -1, piTick: s.piTick + 1 });
      Promise.resolve().then(function () { requestAnimationFrame(placeU); });
    });
  });
  moreBtn.addEventListener('click', function () { set({ more: !s.more }); });

  // ---------- hover focus + viewfinder cursor ----------
  grid.addEventListener('mousemove', function (e) {
    if (!canHover) return;
    var r = grid.getBoundingClientRect();
    cursor.style.setProperty('--cx', (e.clientX - r.left).toFixed(1) + 'px');
    cursor.style.setProperty('--cy', (e.clientY - r.top).toFixed(1) + 'px');
  });
  grid.addEventListener('mouseleave', function () { clearTimeout(hotT); if (s.hot) set({ hot: '' }); });

  // ---------- viewer ----------
  function curImg() { return $('.gs.on img', stage); }
  function lockScroll(on) { document.documentElement.style.overflow = on ? 'hidden' : ''; }
  var flipFrom = null;
  function openPhoto(id) {
    var list = photoList(), i = -1;
    list.forEach(function (p, j) { if (p.id === id) i = j; });
    if (i < 0) return;
    var tile = $('[data-gi="' + id + '"] img', grid);
    flipFrom = tile ? tile.getBoundingClientRect() : null;
    clearTimeout(closeT);
    lockScroll(true);
    set({ vOpen: true, vClosing: false, vFlip: true, vIdx: i, vPrev: -1, vDir: 1, vTick: s.vTick + 1, loupe: false, flyId: id, hot: '' });
    Promise.resolve().then(function () { requestAnimationFrame(function () { requestAnimationFrame(flipIn); }); });
  }
  function flipIn() {
    var img = curImg(), r0 = flipFrom;
    try { view.focus({ preventScroll: true }); } catch (err) { view.focus(); }
    centerStrip(false);
    if (img && r0 && r0.width && !reduce) {
      var r1 = img.getBoundingClientRect();
      img.style.transition = 'none';
      img.style.transformOrigin = '0 0';
      img.style.transform = 'translate(' + (r0.left - r1.left).toFixed(1) + 'px,' + (r0.top - r1.top).toFixed(1) + 'px) scale(' + (r0.width / r1.width).toFixed(4) + ',' + (r0.height / r1.height).toFixed(4) + ')';
      img.getBoundingClientRect();
      img.style.transition = 'transform 1s cubic-bezier(.76,0,.24,1)';
      img.style.transform = '';
    }
    clearTimeout(flipT);
    flipT = setTimeout(function () {
      if (img) { img.style.transition = ''; img.style.transformOrigin = ''; }
      set({ vFlip: false, flyId: '' });
    }, 1050);
  }
  function closeViewer() {
    if (!s.vOpen || s.vClosing) return;
    var list = photoList(), cur = list[s.vIdx], img = curImg();
    var tile = cur && $('.gt.in[data-gi="' + cur.id + '"] img', grid);
    var vh = window.innerHeight || 800, vw = window.innerWidth || 1200;
    function finish() {
      lockScroll(false);
      set({ vOpen: false, vClosing: false, vFlip: false, loupe: false, flyId: '' });
      requestAnimationFrame(function () {
        if (img) { img.style.transition = ''; img.style.transform = ''; img.style.transformOrigin = ''; img.style.opacity = ''; }
      });
      if (tileEl[cur.id]) { try { tileEl[cur.id].focus({ preventScroll: true }); } catch (err) {} }
    }
    clearTimeout(flipT);
    if (img && tile && !reduce) {
      var r0 = img.getBoundingClientRect(), r1 = tile.getBoundingClientRect();
      if (r1.bottom > 0 && r1.top < vh && r1.right > 0 && r1.left < vw && r0.width) {
        set({ vClosing: true, loupe: false, flyId: cur.id });
        img.style.transformOrigin = '0 0';
        img.style.transition = 'transform .85s cubic-bezier(.76,0,.24,1)';
        img.style.transform = 'translate(' + (r1.left - r0.left).toFixed(1) + 'px,' + (r1.top - r0.top).toFixed(1) + 'px) scale(' + (r1.width / r0.width).toFixed(4) + ',' + (r1.height / r0.height).toFixed(4) + ')';
        closeT = setTimeout(finish, 870);
        return;
      }
    }
    set({ vClosing: true, loupe: false });
    if (img) { img.style.transition = 'opacity .45s ease, transform .6s cubic-bezier(.19,1,.22,1)'; img.style.opacity = '0'; img.style.transform = 'scale(.96)'; }
    closeT = setTimeout(finish, 480);
  }
  function go(i, dir) {
    if (i === s.vIdx || s.vClosing) return;
    set({ vPrev: s.vIdx, vIdx: i, vDir: dir || (i > s.vIdx ? 1 : -1), vTick: s.vTick + 1, loupe: false, vFlip: false });
    Promise.resolve().then(function () { centerStrip(true); });
  }
  function step(d) {
    if (!s.vOpen || s.vClosing) return;
    var n = photoList().length;
    go((s.vIdx + d + n) % n, d);
  }
  function centerStrip(smooth) {
    requestAnimationFrame(function () {
      var on = $('.gst.on', strip);
      if (!on) return;
      var left = on.offsetLeft - (strip.clientWidth - on.offsetWidth) / 2;
      try { strip.scrollTo({ left: left, behavior: smooth ? 'smooth' : 'auto' }); } catch (err) { strip.scrollLeft = left; }
    });
  }
  $('.gv-x', view).addEventListener('click', closeViewer);
  $('.gv-arr.next', view).addEventListener('click', function () { step(1); });
  $('.gv-arr.prev', view).addEventListener('click', function () { step(-1); });
  view.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
    else if (e.key === 'Escape') { e.preventDefault(); closeViewer(); }
  });

  // ---------- the loupe: hold to look closer; swipe on touch ----------
  var pd = null, lastPt = null;
  function loupeAt(cx, cy, touch) {
    var img = curImg();
    if (!img) return;
    var r = img.getBoundingClientRect(), sr = stage.getBoundingClientRect();
    var Z = 2.2, R = (loupe.offsetWidth || 250) / 2;
    var px = Math.max(0, Math.min(r.width, cx - r.left)), py = Math.max(0, Math.min(r.height, cy - r.top));
    loupe.style.setProperty('--lx', (cx - sr.left).toFixed(1) + 'px');
    loupe.style.setProperty('--ly', (cy - sr.top - (touch ? R + 36 : 0)).toFixed(1) + 'px');
    var src = img.currentSrc || img.src;
    if (loupe.getAttribute('data-src') !== src) { loupe.style.backgroundImage = 'url("' + src + '")'; loupe.setAttribute('data-src', src); }
    loupe.style.backgroundSize = (r.width * Z).toFixed(1) + 'px ' + (r.height * Z).toFixed(1) + 'px';
    loupe.style.backgroundPosition = (R - px * Z).toFixed(1) + 'px ' + (R - py * Z).toFixed(1) + 'px';
  }
  function loupeStart(x, y, touch) { set({ loupe: true }); loupeAt(x, y, touch); }
  stage.addEventListener('pointerdown', function (e) {
    if (e.button !== undefined && e.button !== 0) return;
    var img = curImg();
    if (!img) return;
    var r = img.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) return;
    pd = { x: e.clientX, y: e.clientY, touch: e.pointerType !== 'mouse' };
    lastPt = { x: e.clientX, y: e.clientY };
    try { stage.setPointerCapture(e.pointerId); } catch (err) {}
    clearTimeout(holdT);
    if (!pd.touch) loupeStart(e.clientX, e.clientY, false);
    else holdT = setTimeout(function () { if (pd) loupeStart(lastPt.x, lastPt.y, true); }, 260);
  });
  stage.addEventListener('pointermove', function (e) {
    lastPt = { x: e.clientX, y: e.clientY };
    if (s.loupe) { loupeAt(e.clientX, e.clientY, e.pointerType !== 'mouse'); return; }
    if (pd && Math.abs(e.clientX - pd.x) + Math.abs(e.clientY - pd.y) > 12) clearTimeout(holdT);
  });
  function up(e) {
    clearTimeout(holdT);
    var p = pd;
    pd = null;
    if (s.loupe) { set({ loupe: false }); return; }
    if (p && p.touch) {
      var dx = e.clientX - p.x, dy = e.clientY - p.y;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.2) step(dx < 0 ? 1 : -1);
    }
  }
  stage.addEventListener('pointerup', up);
  stage.addEventListener('pointercancel', up);

  // ---------- start ----------
  if (typeof ResizeObserver === 'function') {
    new ResizeObserver(function (en) {
      var w = en[0].contentRect.width;
      if (w > 0 && Math.abs(w - s.gw) > 0.5) set({ gw: w });
      placeU();
    }).observe(grid);
  }
  if (typeof IntersectionObserver === 'function') {
    new IntersectionObserver(function (en) { en.forEach(function (e) { s.vis = e.isIntersecting; }); }, { threshold: [0, 0.05] }).observe(section);
  } else {
    s.vis = true;
  }
  if (!reduce) {
    setInterval(function () {
      if (!s.vis || s.vOpen) return;
      set({ piPrev: s.pi, pi: s.pi + 1, piTick: s.piTick + 1 });
    }, 2800);
  }
  render();
  placeU();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(placeU);
  window.addEventListener('resize', placeU, { passive: true });
})();
