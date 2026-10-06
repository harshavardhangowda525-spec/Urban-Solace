/* =========================================================
   Urban Solace — interactions & motion
   ========================================================= */
(() => {
  'use strict';

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const isSmall = () => window.innerWidth <= 720;
  const hasGSAP = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
  const motion = hasGSAP && !reduceMotion;

  const DIRECTIONS = 'https://www.google.com/maps/dir/?api=1&destination=Urban+Solace,+32+Annaswamy+Mudaliar+Rd,+Ulsoor,+Bengaluru,+Karnataka+560042';
  const img = (id, w = 900) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

  /* ---------- Image fallback ---------- */
  function guardImage(el) {
    const fail = () => { el.classList.add('is-broken'); el.parentElement && el.parentElement.classList.add('img-fallback'); };
    if (el.complete && el.naturalWidth === 0 && el.getAttribute('src')) fail();
    el.addEventListener('error', fail, { once: true });
  }
  $$('img').forEach(guardImage);

  /* ---------- Menu data (descriptions illustrative; no prices) ---------- */
  const MENU = {
    popular: [
      { n: 'Gobi Manchurian', d: 'Crispy cauliflower tossed in a glossy, tangy Indo-Chinese sauce — a guest favourite.', i: '1585937421612-70a008356fbe', veg: true, tag: 'Guest favourite', feature: true },
      { n: 'Spicy Basil Chicken', d: 'Chicken with fresh basil and a confident hit of chilli.', i: '1603133872878-684f208fb84b', veg: false, tag: 'Popular' },
      { n: 'Veggie Burger', d: 'A hearty veggie patty, fresh greens and house sauce in a soft bun.', i: '1520072959219-c595dc870360', veg: true, tag: 'Popular' },
      { n: 'Waffles', d: 'Golden, crisp-edged waffles — made for slow mornings and sweet cravings.', i: '1562376552-0d160a2f238d', veg: true, tag: 'Popular' },
      { n: 'Sizzling Brownie', d: 'Warm chocolate brownie arriving on a hot plate, sizzling at the table.', i: '1606313564200-e75d5e30476c', veg: true, tag: 'Signature' },
      { n: 'Iced Tea', d: 'Chilled, refreshing and perfect for a lakeside afternoon.', i: '1556679343-c7306c1976bc', veg: true, tag: 'Popular' }
    ],
    starters: [
      { n: 'Gobi Manchurian', d: 'Crispy cauliflower in a tangy Indo-Chinese glaze.', i: '1585937421612-70a008356fbe', veg: true, tag: 'Guest favourite', feature: true },
      { n: 'Fries & Dips', d: 'Golden fries with a selection of house dips.', i: '1573080496219-bb080dd4f877', veg: true, tag: 'Sharing' },
      { n: 'Chicken Starters', d: 'Comfort-style chicken bites, made for sharing.', i: '1567620832903-9fc6debc209f', veg: false, tag: 'Sharing' }
    ],
    mains: [
      { n: 'Spicy Basil Chicken', d: 'Chicken with fresh basil and a confident hit of chilli.', i: '1603133872878-684f208fb84b', veg: false, tag: 'Popular', feature: true },
      { n: 'Steaks', d: 'Hearty steak plates with classic sides.', i: '1600891964092-4316c288032e', veg: false, tag: 'American classic' },
      { n: 'Comfort Bowls', d: 'Generous, warming plates for an easy dinner.', i: '1546069901-ba9599a7e63c', veg: true, tag: 'Comfort' }
    ],
    burgers: [
      { n: 'Classic Burger', d: 'A juicy American-style burger with all the trimmings.', i: '1568901346375-23c9450c58cd', veg: false, tag: 'American classic', feature: true },
      { n: 'Veggie Burger', d: 'Hearty veggie patty, fresh greens and house sauce.', i: '1520072959219-c595dc870360', veg: true, tag: 'Popular' },
      { n: 'Sandwiches', d: 'Stacked café sandwiches, toasted and generously filled.', i: '1528735602780-2552fd46c7af', veg: true, tag: 'Café classic' }
    ],
    pasta: [
      { n: 'Pasta', d: 'Comforting bowls of pasta in rich, creamy or tomato-based sauces.', i: '1621996346565-e3dbc646d9a9', veg: true, tag: 'Comfort', feature: true },
      { n: 'Baked Pasta', d: 'Oven-baked and bubbling, made for sharing.', i: '1555949258-eb67b1ef0ceb', veg: true, tag: 'Sharing' },
      { n: 'Chicken Pasta', d: 'Pasta with tender chicken and a silky sauce.', i: '1563379926898-05f4575a45d8', veg: false, tag: 'Hearty' }
    ],
    salads: [
      { n: 'Garden Salad', d: 'Crisp greens and fresh vegetables with a bright dressing.', i: '1512621776951-a57141f2eefd', veg: true, tag: 'Fresh', feature: true },
      { n: 'Protein Salad', d: 'A fuller salad bowl with grilled toppings.', i: '1546069901-ba9599a7e63c', veg: false, tag: 'Wholesome' },
      { n: 'Seasonal Bowl', d: 'A lighter plate built around seasonal produce.', i: '1540189549336-e6e99c3679fe', veg: true, tag: 'Light' }
    ],
    desserts: [
      { n: 'Sizzling Brownie', d: 'Warm chocolate brownie, sizzling at the table.', i: '1606313564200-e75d5e30476c', veg: true, tag: 'Signature', feature: true },
      { n: 'Waffles', d: 'Golden, crisp-edged waffles with sweet toppings.', i: '1562376552-0d160a2f238d', veg: true, tag: 'Popular' },
      { n: 'Pancakes', d: 'Fluffy stacks for a slow, sweet treat.', i: '1567620905732-2d1ec7ab7445', veg: true, tag: 'Café classic' }
    ],
    drinks: [
      { n: 'Iced Tea', d: 'Chilled, refreshing and perfect by the lake.', i: '1556679343-c7306c1976bc', veg: true, tag: 'Popular', feature: true },
      { n: 'Coffee', d: 'Freshly brewed café coffee, hot or iced.', i: '1509042239860-f550ce710b93', veg: true, tag: 'Café classic' },
      { n: 'Shakes & Coolers', d: 'Thick shakes and fizzy coolers for warm evenings.', i: '1572490122747-3968b75cc699', veg: true, tag: 'Refreshing' }
    ]
  };

  const grid = $('#menuGrid');
  function cardHTML(it) {
    return `
      <article class="mcard${it.feature ? ' mcard--feature' : ''}" ${finePointer ? 'data-tilt' : ''}>
        <div class="mcard__img"><span class="mcard__tag">${it.tag}</span><img src="${img(it.i, it.feature ? 1200 : 800)}" alt="${it.n}" loading="lazy" /></div>
        <div class="mcard__body">
          <div class="mcard__row"><h3>${it.n}</h3><span class="mcard__price">₹ · Demo</span></div>
          <p><span class="mcard__veg${it.veg ? '' : ' mcard__veg--n'}" aria-label="${it.veg ? 'Vegetarian' : 'Non-vegetarian'}"></span>${it.d}</p>
        </div>
        <span class="mcard__glare" aria-hidden="true"></span>
      </article>`;
  }
  function renderMenu(cat) {
    grid.innerHTML = MENU[cat].map(cardHTML).join('');
    $$('img', grid).forEach(guardImage);
    if (finePointer && !reduceMotion) $$('[data-tilt]', grid).forEach(bindTilt);
  }

  /* Tabs + ink */
  const tabs = $$('.tabs button');
  const ink = $('.tabs__ink');
  function moveInk(btn) {
    if (!btn) return;
    ink.style.width = btn.offsetWidth + 'px';
    ink.style.transform = `translateX(${btn.offsetLeft}px)`;
  }
  let switching = false;
  tabs.forEach(btn => btn.addEventListener('click', () => {
    if (btn.classList.contains('is-active') || switching) return;
    tabs.forEach(b => { b.classList.toggle('is-active', b === btn); b.setAttribute('aria-selected', b === btn); });
    moveInk(btn);
    btn.scrollIntoView({ block: 'nearest', inline: 'center', behavior: reduceMotion ? 'auto' : 'smooth' });
    const cat = btn.dataset.cat;
    if (!motion) { renderMenu(cat); return; }
    switching = true;
    gsap.to(grid.children, {
      opacity: 0, y: -20, scale: .97, duration: .35, stagger: .04, ease: 'power2.in',
      onComplete() {
        grid.style.minHeight = grid.offsetHeight + 'px';
        renderMenu(cat);
        gsap.fromTo(grid.children,
          { opacity: 0, y: 40, rotateX: -8, scale: .98 },
          { opacity: 1, y: 0, rotateX: 0, scale: 1, duration: .9, stagger: .08, ease: 'expo.out',
            onComplete() { grid.style.minHeight = ''; switching = false; ScrollTrigger.refresh(); } });
      }
    });
  }));
  renderMenu('popular');
  requestAnimationFrame(() => moveInk($('.tabs button.is-active')));
  window.addEventListener('resize', () => moveInk($('.tabs button.is-active')));
  document.fonts && document.fonts.ready.then(() => moveInk($('.tabs button.is-active')));

  /* ---------- 3D tilt ---------- */
  function bindTilt(el) {
    const max = el.classList.contains('mcard--feature') ? 4 : 7;
    const glare = $('.mcard__glare', el);
    let raf = null;
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transition = 'transform .15s ease-out, box-shadow .6s';
        el.style.transform = `perspective(1000px) rotateY(${(px - .5) * max * 2}deg) rotateX(${(.5 - py) * max * 2}deg) translateZ(0)`;
        if (glare) { glare.style.setProperty('--gx', px * 100 + '%'); glare.style.setProperty('--gy', py * 100 + '%'); }
      });
    });
    el.addEventListener('pointerleave', () => {
      cancelAnimationFrame(raf);
      el.style.transition = 'transform .9s cubic-bezier(.22,.8,.2,1), box-shadow .6s';
      el.style.transform = '';
    });
  }
  if (finePointer && !reduceMotion) $$('.ecard[data-tilt]').forEach(bindTilt);

  /* ---------- Magnetic buttons ---------- */
  if (finePointer && !reduceMotion) {
    $$('[data-magnetic]').forEach(el => {
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${x * .25}px, ${y * .35}px)`;
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });
  }

  /* ---------- Smooth scroll (Lenis) ---------- */
  let lenis = null;
  if (!reduceMotion && typeof window.Lenis !== 'undefined' && finePointer) {
    lenis = new Lenis({ duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    if (hasGSAP) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(t => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const loop = t => { lenis.raf(t); requestAnimationFrame(loop); };
      requestAnimationFrame(loop);
    }
  }
  function scrollToTarget(target) {
    const el = typeof target === 'string' ? $(target) : target;
    if (!el) return;
    const offset = el.id === 'home' ? 0 : -70;
    if (lenis) lenis.scrollTo(el, { offset, duration: 1.6 });
    else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: reduceMotion ? 'auto' : 'smooth' });
  }

  /* ---------- Reservation modal ---------- */
  const modal = $('#modal');
  const form = $('#rform');
  let lastFocus = null;
  function lockScroll(on) { document.body.classList.toggle('is-locked', on); if (lenis) on ? lenis.stop() : lenis.start(); }
  function openModal() {
    lastFocus = document.activeElement;
    closeMobileMenu();
    $('.modal__form-wrap', modal).hidden = false;
    $('.modal__done', modal).hidden = true;
    const d = form.querySelector('[name=date]');
    const today = new Date(); today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
    d.min = today.toISOString().slice(0, 10);
    if (!d.value) d.value = d.min;
    modal.classList.add('is-open'); modal.setAttribute('aria-hidden', 'false');
    lockScroll(true);
    setTimeout(() => form.querySelector('[name=name]').focus(), 350);
  }
  function closeModal() {
    modal.classList.remove('is-open'); modal.setAttribute('aria-hidden', 'true');
    lockScroll(false);
    lastFocus && lastFocus.focus && lastFocus.focus();
  }
  $$('[data-reserve]').forEach(el => el.addEventListener('click', e => { e.preventDefault(); openModal(); }));
  $$('[data-close]', modal).forEach(el => el.addEventListener('click', closeModal));
  form.addEventListener('submit', e => {
    e.preventDefault();
    let ok = true;
    $$('input[required]', form).forEach(inp => {
      const bad = !inp.value.trim() || (inp.type === 'tel' && inp.value.replace(/\D/g, '').length < 8);
      inp.classList.toggle('is-invalid', bad); if (bad) ok = false;
    });
    if (!ok) { const first = $('.is-invalid', form); first && first.focus(); return; }
    $('.modal__form-wrap', modal).hidden = true;
    $('.modal__done', modal).hidden = false;
    form.reset();
  });

  /* ---------- Mobile menu ---------- */
  const burger = $('#burger');
  const mmenu = $('#mobileMenu');
  function closeMobileMenu() {
    if (!mmenu.classList.contains('is-open')) return;
    mmenu.classList.remove('is-open'); mmenu.setAttribute('aria-hidden', 'true');
    burger.setAttribute('aria-expanded', 'false'); burger.setAttribute('aria-label', 'Open menu');
    lockScroll(false);
  }
  burger.addEventListener('click', () => {
    const open = !mmenu.classList.contains('is-open');
    if (!open) return closeMobileMenu();
    mmenu.classList.add('is-open'); mmenu.setAttribute('aria-hidden', 'false');
    burger.setAttribute('aria-expanded', 'true'); burger.setAttribute('aria-label', 'Close menu');
    lockScroll(true);
  });

  /* Anchor links */
  $$('a[href^="#"]').forEach(a => {
    if (a.hasAttribute('data-reserve')) return;
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id.length < 2 || !$(id)) return;
      e.preventDefault();
      const wasOpen = mmenu.classList.contains('is-open');
      closeMobileMenu();
      setTimeout(() => scrollToTarget(id), wasOpen ? 350 : 0);
    });
  });

  /* ---------- Nav state, progress, floating CTAs ---------- */
  const nav = $('#nav');
  const bar = $('#progressBar');
  const floatCta = $('#floatCta');
  const mbar = $('#mbar');
  const hero = $('#home');
  const reserveSec = $('#reserve');
  function onScroll() {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    nav.classList.toggle('is-scrolled', y > 40);
    bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    const pastHero = y > hero.offsetHeight * .7;
    const r = reserveSec.getBoundingClientRect();
    const inCta = r.top < window.innerHeight * .6 && r.bottom > window.innerHeight * .4;
    floatCta.classList.toggle('is-visible', pastHero && !inCta);
    mbar.classList.toggle('is-visible', y > 120);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Active nav link */
  const navLinks = $$('.nav__links a');
  const sectionIO = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      navLinks.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + en.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  ['home', 'story', 'menu', 'events', 'gallery', 'reviews', 'contact'].forEach(id => { const s = document.getElementById(id); s && sectionIO.observe(s); });

  /* ---------- Gallery filter + lightbox ---------- */
  const gItems = $$('.gitem');
  $$('.filters button').forEach(btn => btn.addEventListener('click', () => {
    $$('.filters button').forEach(b => b.classList.toggle('is-active', b === btn));
    const f = btn.dataset.filter;
    const apply = () => gItems.forEach(it => it.classList.toggle('is-hidden', f !== 'all' && it.dataset.cat !== f));
    if (!motion) return apply();
    gsap.to('#masonry', { opacity: 0, y: 14, duration: .3, ease: 'power2.in', onComplete() {
      apply();
      const shown = gItems.filter(i => !i.classList.contains('is-hidden'));
      gsap.set('#masonry', { opacity: 1, y: 0 });
      gsap.fromTo(shown, { opacity: 0, y: 30, scale: .97 }, { opacity: 1, y: 0, scale: 1, duration: .8, stagger: .05, ease: 'expo.out', onComplete: () => ScrollTrigger.refresh() });
    } });
  }));

  const lb = $('#lightbox');
  const lbImg = $('.lightbox__img', lb);
  const lbCap = $('.lightbox__cap', lb);
  let lbIndex = 0;
  const visibleItems = () => gItems.filter(i => !i.classList.contains('is-hidden'));
  function setLb(item) {
    const src = $('img', item);
    lbImg.src = src.currentSrc.replace(/w=\d+/, 'w=1800') || src.src;
    lbImg.alt = src.alt;
    lbCap.textContent = `${src.alt} · ${item.dataset.cat.charAt(0).toUpperCase() + item.dataset.cat.slice(1)}`;
  }
  function openLb(item) {
    const list = visibleItems();
    lbIndex = list.indexOf(item);
    setLb(item);
    lb.classList.add('is-open'); lb.setAttribute('aria-hidden', 'false');
    lockScroll(true);
    if (motion) {
      const from = item.getBoundingClientRect();
      const run = () => {
        const to = lbImg.getBoundingClientRect();
        if (!to.width) return;
        gsap.fromTo(lbImg,
          { x: from.left + from.width / 2 - (to.left + to.width / 2), y: from.top + from.height / 2 - (to.top + to.height / 2), scale: from.width / to.width, opacity: .6 },
          { x: 0, y: 0, scale: 1, opacity: 1, duration: .85, ease: 'expo.out' });
      };
      lbImg.complete && lbImg.naturalWidth ? run() : lbImg.addEventListener('load', run, { once: true });
    }
    $('.lightbox__close', lb).focus();
  }
  function closeLb() {
    const done = () => { lb.classList.remove('is-open'); lb.setAttribute('aria-hidden', 'true'); lockScroll(false); if (window.gsap) gsap.set(lbImg, { clearProps: 'all' }); };
    if (motion) gsap.to(lbImg, { scale: .92, opacity: 0, duration: .35, ease: 'power2.in', onComplete: done });
    else done();
  }
  function stepLb(dir) {
    const list = visibleItems();
    lbIndex = (lbIndex + dir + list.length) % list.length;
    if (motion) {
      gsap.to(lbImg, { opacity: 0, x: -40 * dir, duration: .25, ease: 'power2.in', onComplete() {
        setLb(list[lbIndex]);
        gsap.fromTo(lbImg, { opacity: 0, x: 40 * dir }, { opacity: 1, x: 0, duration: .6, ease: 'expo.out' });
      } });
    } else setLb(list[lbIndex]);
  }
  gItems.forEach(it => {
    it.tabIndex = 0; it.setAttribute('role', 'button');
    it.addEventListener('click', () => openLb(it));
    it.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLb(it); } });
  });
  $('.lightbox__close', lb).addEventListener('click', closeLb);
  $('.lightbox__bg', lb).addEventListener('click', closeLb);
  $('.lightbox__prev', lb).addEventListener('click', () => stepLb(-1));
  $('.lightbox__next', lb).addEventListener('click', () => stepLb(1));
  let touchX = null;
  lb.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', e => { if (touchX === null) return; const dx = e.changedTouches[0].clientX - touchX; if (Math.abs(dx) > 50) stepLb(dx < 0 ? 1 : -1); touchX = null; });

  document.addEventListener('keydown', e => {
    if (lb.classList.contains('is-open')) {
      if (e.key === 'Escape') closeLb();
      if (e.key === 'ArrowRight') stepLb(1);
      if (e.key === 'ArrowLeft') stepLb(-1);
    } else if (modal.classList.contains('is-open') && e.key === 'Escape') closeModal();
    else if (mmenu.classList.contains('is-open') && e.key === 'Escape') closeMobileMenu();
  });

  /* ---------- Map ---------- */
  $('#mapLoad').addEventListener('click', () => {
    const f = document.createElement('iframe');
    f.src = 'https://www.google.com/maps?q=Urban+Solace,+32+Annaswamy+Mudaliar+Rd,+Ulsoor,+Bengaluru+560042&output=embed';
    f.title = 'Map showing Urban Solace, Ulsoor, Bengaluru';
    f.loading = 'lazy'; f.referrerPolicy = 'no-referrer-when-downgrade'; f.allowFullscreen = true;
    $('#map').appendChild(f);
    $('#mapLoad').remove();
  });
  $('.map__pin').addEventListener('click', () => window.open(DIRECTIONS, '_blank', 'noopener'));
  $('.map__pin').style.cursor = 'pointer';

  /* ---------- Reviews marquee (duplicate for seamless loop) ---------- */
  const track = $('#reviewTrack');
  if (!reduceMotion) track.innerHTML += track.innerHTML.replace(/<article /g, '<article aria-hidden="true" ');

  /* ---------- Year ---------- */
  $('#year').textContent = new Date().getFullYear();

  /* ---------- Ambient particles ---------- */
  const PRESETS = {
    hero:   { n: 34, color: '241,201,154', size: [0.6, 2.2], speed: .18, alpha: .55 },
    menu:   { n: 26, color: '211,154,94',  size: [0.6, 1.8], speed: .12, alpha: .35 },
    events: { n: 40, color: '241,201,154', size: [0.6, 2.4], speed: .22, alpha: .6 },
    lake:   { n: 30, color: '255,224,170', size: [0.8, 2.6], speed: .14, alpha: .75, glow: true },
    cta:    { n: 36, color: '241,201,154', size: [0.6, 2.2], speed: .16, alpha: .55 }
  };
  function ambient(canvas) {
    const p = PRESETS[canvas.dataset.ambient] || PRESETS.hero;
    const ctx = canvas.getContext('2d');
    let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 1.5), parts = [], running = false, raf = null;
    const resize = () => {
      w = canvas.offsetWidth; h = canvas.offsetHeight;
      canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const spawn = (anyY) => ({
      x: Math.random() * w, y: anyY ? Math.random() * h : h + 10,
      r: p.size[0] + Math.random() * (p.size[1] - p.size[0]),
      vx: (Math.random() - .5) * p.speed, vy: -(.2 + Math.random()) * p.speed,
      a: Math.random() * p.alpha, ph: Math.random() * Math.PI * 2
    });
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const q of parts) {
        q.x += q.vx + Math.sin(q.ph) * .15; q.y += q.vy; q.ph += .01;
        if (q.y < -10 || q.x < -10 || q.x > w + 10) Object.assign(q, spawn(false));
        const tw = p.glow ? (.5 + .5 * Math.sin(q.ph * 3)) : 1;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${p.color},${q.a * tw})`;
        if (p.glow) { ctx.shadowBlur = 12; ctx.shadowColor = `rgba(${p.color},.9)`; }
        ctx.arc(q.x, q.y, q.r, 0, Math.PI * 2); ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    resize();
    parts = Array.from({ length: p.n }, () => spawn(true));
    window.addEventListener('resize', resize);
    new IntersectionObserver(([en]) => {
      if (en.isIntersecting && !running) { running = true; tick(); }
      else if (!en.isIntersecting && running) { running = false; cancelAnimationFrame(raf); }
    }).observe(canvas);
  }
  if (!reduceMotion && !isSmall()) $$('canvas.ambient').forEach(ambient);
  else $$('canvas.ambient').forEach(c => c.remove());

  /* Pause CSS loops in events when offscreen */
  const eventsSec = $('#events');
  new IntersectionObserver(([en]) => eventsSec.classList.toggle('is-paused', !en.isIntersecting)).observe(eventsSec);

  /* =========================================================
     GSAP motion
     ========================================================= */
  const loader = $('#loader');

  if (!motion) {
    // No-motion path: everything visible, loader dismissed.
    const hide = () => loader.classList.add('is-done');
    if (document.readyState === 'complete') hide(); else window.addEventListener('load', hide);
    setTimeout(hide, 1200);
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: 'expo.out' });

  /* Split headings into masked words */
  $$('[data-split]').forEach(el => {
    const walk = node => {
      Array.from(node.childNodes).forEach(ch => {
        if (ch.nodeType === 3) {
          const frag = document.createDocumentFragment();
          ch.textContent.split(/(\s+)/).forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
            const w = document.createElement('span'); w.className = 'split-word';
            const inner = document.createElement('span'); inner.textContent = part;
            w.appendChild(inner); frag.appendChild(w);
          });
          node.replaceChild(frag, ch);
        } else if (ch.nodeType === 1 && ch.tagName !== 'BR') walk(ch);
      });
    };
    walk(el);
    gsap.from($$('.split-word > span', el), {
      yPercent: 115, rotate: 4, duration: 1.3, stagger: .06,
      scrollTrigger: { trigger: el, start: 'top 85%' }
    });
  });

  /* Fades */
  $$('[data-fade]').forEach(el => {
    gsap.from(el, { opacity: 0, y: 36, duration: 1.2, scrollTrigger: { trigger: el, start: 'top 88%' } });
  });
  $$('[data-stagger]').forEach(el => {
    gsap.from(el.children, { opacity: 0, y: 40, duration: 1.1, stagger: .12, scrollTrigger: { trigger: el, start: 'top 85%' } });
  });

  /* Mask image reveals */
  $$('.rimg').forEach(fig => {
    const im = $('img', fig);
    const tl = gsap.timeline({ scrollTrigger: { trigger: fig, start: 'top 85%' } });
    tl.fromTo(fig, { clipPath: 'inset(100% 0% 0% 0% round 22px)' }, { clipPath: 'inset(0% 0% 0% 0% round 22px)', duration: 1.6, ease: 'expo.inOut' });
    if (im) tl.fromTo(im, { scale: 1.35 }, { scale: 1, duration: 2, ease: 'expo.out' }, '<.2');
  });

  /* Parallax (desktop) */
  const mm = gsap.matchMedia();
  mm.add('(min-width: 721px)', () => {
    $$('[data-speed]').forEach(el => {
      const s = parseFloat(el.dataset.speed);
      gsap.to(el, { yPercent: -s, ease: 'none', scrollTrigger: { trigger: el.closest('section') || el, start: 'top bottom', end: 'bottom top', scrub: 1 } });
    });

    // Hero: image drifts & content lifts away
    gsap.to('.hero__img', { yPercent: 12, scale: 1.08, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to('.hero__content', { yPercent: -18, opacity: 0, ease: 'none', scrollTrigger: { trigger: '.hero', start: '30% top', end: 'bottom top', scrub: true } });
    gsap.to('.hero__chips', { y: -80, opacity: 0, ease: 'none', scrollTrigger: { trigger: '.hero', start: '20% top', end: '80% top', scrub: true } });

    // Lake layers at different depths
    gsap.fromTo('[data-lake="bg"]', { yPercent: -10, scale: 1.12 }, { yPercent: 10, scale: 1, ease: 'none', scrollTrigger: { trigger: '.lake', start: 'top bottom', end: 'bottom top', scrub: true } });
    gsap.fromTo('[data-lake="haze"]', { opacity: .7 }, { opacity: 1, ease: 'none', scrollTrigger: { trigger: '.lake', start: 'top bottom', end: 'bottom top', scrub: true } });
    gsap.fromTo('[data-lake="fg"]', { yPercent: 25 }, { yPercent: -6, ease: 'none', scrollTrigger: { trigger: '.lake', start: 'top bottom', end: 'bottom top', scrub: true } });
    gsap.fromTo('.lake__content', { y: 80 }, { y: -60, ease: 'none', scrollTrigger: { trigger: '.lake', start: 'top bottom', end: 'bottom top', scrub: true } });

    // CTA background drift
    gsap.fromTo('.cta__bg', { yPercent: -8 }, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: '.cta', start: 'top bottom', end: 'bottom top', scrub: true } });

    // Footer outline word slides
    gsap.fromTo('.footer__big', { xPercent: 8 }, { xPercent: -4, ease: 'none', scrollTrigger: { trigger: '.footer', start: 'top bottom', end: 'bottom bottom', scrub: true } });
  });

  /* Connector line draws in */
  $$('.connector').forEach(c => {
    gsap.fromTo($('path', c), { strokeDashoffset: 160 }, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: c, start: 'top 90%', end: 'bottom 50%', scrub: true } });
    gsap.from($('.connector__dot', c), { scale: 0, duration: .8, ease: 'back.out(3)', scrollTrigger: { trigger: c, start: 'bottom 60%' } });
  });

  /* Section-to-section soft transitions */
  ['.menu', '.events', '.reviews', '.contact'].forEach(sel => {
    const s = $(sel);
    s && gsap.fromTo(s, { clipPath: 'inset(4% 3% 0% 3% round 40px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none', scrollTrigger: { trigger: s, start: 'top bottom', end: 'top 35%', scrub: true } });
  });

  /* Menu: initial card reveal */
  gsap.from(grid.children, { opacity: 0, y: 60, rotateX: -10, duration: 1.2, stagger: .08, scrollTrigger: { trigger: grid, start: 'top 85%' } });

  /* Event cards */
  gsap.from('.ecard', { opacity: 0, y: 90, rotateY: -12, transformOrigin: 'left center', duration: 1.4, stagger: .13, scrollTrigger: { trigger: '.events__grid', start: 'top 85%' } });
  gsap.from('.eq i', { scaleY: 0, transformOrigin: 'bottom', duration: .8, stagger: .04, scrollTrigger: { trigger: '.eq', start: 'top 90%' } });

  /* Gallery items rise in */
  gsap.from('.gitem', { opacity: 0, y: 60, duration: 1.2, stagger: { each: .07, from: 'random' }, scrollTrigger: { trigger: '.masonry', start: 'top 85%' } });

  /* Review cards */
  gsap.from('.rcard', { opacity: 0, x: 80, duration: 1.2, stagger: .08, scrollTrigger: { trigger: '.marquee', start: 'top 90%' } });

  /* Rating counters */
  $$('.count').forEach(el => {
    const end = parseFloat(el.dataset.count), dec = parseInt(el.dataset.decimals, 10) || 0;
    const o = { v: 0 };
    el.textContent = (0).toFixed(dec);
    gsap.to(o, { v: end, duration: 2.4, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' },
      onUpdate: () => { el.textContent = dec ? o.v.toFixed(dec) : Math.round(o.v).toLocaleString('en-IN'); } });
  });
  gsap.from('.rating__stars i', { scale: 0, rotate: -90, duration: 1, stagger: .1, ease: 'back.out(2)', scrollTrigger: { trigger: '.rating__stars', start: 'top 88%' } });

  /* Service icons draw */
  $$('.svc .draw').forEach(p => {
    let len = 120;
    try { len = Math.ceil(p.getTotalLength()) + 2; } catch (e) { /* noop */ }
    gsap.fromTo(p, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 1.8, ease: 'power2.inOut', scrollTrigger: { trigger: '.services__grid', start: 'top 80%' }, onComplete: () => gsap.set(p, { clearProps: 'strokeDasharray,strokeDashoffset' }) });
  });

  /* Final CTA */
  const ctaTl = gsap.timeline({ scrollTrigger: { trigger: '.cta', start: 'top 65%' } });
  ctaTl
    .from('.cta__eyebrow', { opacity: 0, y: 20, duration: 1 })
    .from('.cta__title .w', { opacity: 0, yPercent: 60, rotateX: -60, filter: 'blur(12px)', transformOrigin: '50% 100%', duration: 1.6, stagger: .14 }, '<.1')
    .from('.cta__title', { letterSpacing: '0.04em', duration: 2.2, ease: 'expo.out' }, '<')
    .from('.cta__sub', { opacity: 0, y: 24, duration: 1.1 }, '-=1.2')
    .from('.cta__btns > *', { opacity: 0, y: 30, scale: .95, duration: 1.1, stagger: .12 }, '-=.9');

  /* Contact card */
  gsap.from('.contact__card li', { opacity: 0, x: -24, duration: 1, stagger: .08, scrollTrigger: { trigger: '.contact__card', start: 'top 80%' } });

  /* Footer columns */
  gsap.from('.footer__top > *', { opacity: 0, y: 40, duration: 1.2, stagger: .1, scrollTrigger: { trigger: '.footer', start: 'top 85%' } });

  /* ---------- Loader → hero intro ---------- */
  gsap.set('.hero__title .ln > span', { yPercent: 110 });
  gsap.set(['.hero__eyebrow', '.hero__sub', '.hero__ctas > *', '.hero__chips .chip', '.scroll-ind'], { opacity: 0, y: 24 });
  gsap.set('.hero__img', { scale: 1.25 });
  gsap.set('.nav', { yPercent: -100, opacity: 0 });
  loader.style.animation = 'none';

  const letters = $$('.loader__word span');
  const intro = gsap.timeline({ paused: true });
  intro
    .from(letters, { yPercent: 110, opacity: 0, duration: .9, stagger: .035, ease: 'expo.out' })
    .from('.loader__kn', { opacity: 0, y: 14, duration: .7 }, '-=.55')
    .to('.loader__bar i', { scaleX: 1, duration: .9, ease: 'power2.inOut' }, '-=.8')
    .to(letters, { yPercent: -110, opacity: 0, duration: .6, stagger: .015, ease: 'expo.in' }, '+=.05')
    .to(['.loader__kn', '.loader__bar'], { opacity: 0, duration: .4 }, '<')
    .to(loader, { clipPath: 'inset(0 0 100% 0)', duration: 1, ease: 'expo.inOut' }, '-=.25')
    .set(loader, { display: 'none' })
    // Hero
    .to('.hero__img', { scale: 1, duration: 2.6, ease: 'expo.out' }, '-=1.1')
    .to('.nav', { yPercent: 0, opacity: 1, duration: 1.2 }, '<.3')
    .to('.hero__eyebrow', { opacity: 1, y: 0, duration: 1.1 }, '<.1')
    .to('.hero__title .ln > span', { yPercent: 0, duration: 1.5, stagger: .14 }, '<.1')
    .to('.hero__sub', { opacity: 1, y: 0, duration: 1.2 }, '-=1')
    .to('.hero__ctas > *', { opacity: 1, y: 0, duration: 1.1, stagger: .1 }, '-=.9')
    .to('.hero__chips .chip', { opacity: 1, y: 0, duration: 1.1, stagger: .12, clearProps: 'transform' }, '-=.9')
    .to('.scroll-ind', { opacity: 1, y: 0, duration: 1 }, '-=.7');

  gsap.set(loader, { clipPath: 'inset(0 0 0% 0)' });
  let started = false;
  const start = () => { if (started) return; started = true; intro.play(); };
  // Start once fonts are ready (or quickly anyway), never wait on all images.
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => setTimeout(start, 150));
  setTimeout(start, 1500);

  window.addEventListener('load', () => ScrollTrigger.refresh());
})();
