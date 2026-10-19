// Shared scroll engine for the concepts: pinned-hero progress, the big glass with
// sloshing liquid (reacts to the pointer and to tilting) + pouring stream, scroll
// reveals and the bag counter.
(() => {
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const span = (p, a, b) => clamp((p - a) / (b - a));
  const ease = t => t * t * (3 - 2 * t);
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.documentElement.classList.add('js');

  // 0 → 1 while a tall section with a sticky child is pinned
  function pinned(el) {
    const r = el.getBoundingClientRect(), d = r.height - innerHeight;
    return d > 0 ? clamp(-r.top / d) : 0;
  }

  // 0 when the element enters at the bottom of the viewport, 1 when it leaves at the top
  function through(el) {
    const r = el.getBoundingClientRect();
    return clamp((innerHeight - r.top) / (innerHeight + r.height));
  }

  function onScroll(fn) {
    let queued = false;
    const run = () => { queued = false; fn(); };
    const request = () => { if (!queued) { queued = true; requestAnimationFrame(run); } };
    addEventListener('scroll', request, { passive: true });
    addEventListener('resize', request);
    run();
  }

  // Animates one glass every frame. Everything marked [data-glass]/[data-clip] rotates
  // around the rig origin; the liquid is a wavy path that stays level, sloshes on a
  // spring when the pointer moves or the glass tilts, and drops to the lip once the lip
  // dips below the fill line. Coordinates are in the rig's local units.
  //   c = { host, rig(p, tilt) → transform, lip:[x,y], rest, max, tilt:[p0,p1], dry:[p0,p1],
  //         width, length, sway, wave, onFrame(state) }
  // Returns a setter for the scroll progress.
  function glass(root, c) {
    const parts = $$('[data-glass],[data-clip]', root), liquid = $('[data-liquid]', root);
    const stream = $('[data-stream]', root), rig = $('[data-rig]', root);
    const dir = Math.sign(c.max), X = 340, sway = c.sway ?? 7, wave = c.wave ?? 3;
    const tiltAt = p => ease(span(p, c.tilt[0], c.tilt[1]));
    const lipAt = a => {
      const r = a * Math.PI / 180, cs = Math.cos(r), sn = Math.sin(r);
      return [c.lip[0] * cs - c.lip[1] * sn, c.lip[0] * sn + c.lip[1] * cs];
    };
    let start = 1;
    for (let i = 0; i <= 400; i++) {
      if (lipAt(c.max * tiltAt(i / 400))[1] > c.rest) { start = i / 400; break; }
    }
    const s = { p: 0, hover: 0, target: 0, slope: 0, v: 0, energy: 0, a: 0 };

    c.host.addEventListener('pointermove', e => {
      const r = c.host.getBoundingClientRect();
      s.target = ((e.clientX - r.left) / r.width - .5) * 2;
      s.v += clamp(e.movementX || 0, -40, 40) * .0007;
      s.energy = Math.min(1, s.energy + (Math.abs(e.movementX || 0) + Math.abs(e.movementY || 0)) * .004);
    });
    c.host.addEventListener('pointerleave', () => { s.target = 0; });

    function draw(now) {
      const t = now / 1000, p = s.p, tilt = tiltAt(p);
      s.hover += (s.target - s.hover) * .07;
      const a = c.max * tilt + s.hover * sway * (1 - tilt);
      s.v += (s.a - a) * .006 - s.slope * .05;
      s.v *= .93;
      s.slope = clamp(s.slope + s.v, -.4, .4);
      s.energy = Math.min(1, s.energy * .975 + Math.abs(a - s.a) * .04);
      s.a = a;

      const [lx, ly] = lipAt(a), surface = Math.max(c.rest, ly);
      const slope = s.slope * (ly > c.rest ? .3 : 1), amp = wave * (.7 + s.energy * 3.5);
      rig.setAttribute('transform', c.rig(p, tilt));
      parts.forEach(el => el.setAttribute('transform', `rotate(${a})`));
      let d = `M${-X} 2000`;
      for (let x = -X; x <= X; x += 17) {
        d += `L${x} ${(surface + slope * x + amp * (Math.sin(x * .03 + t * 2.3) + .5 * Math.sin(x * .055 - t * 3.4))).toFixed(1)}`;
      }
      liquid.setAttribute('d', `${d}L${X} 2000Z`);

      const grow = span(p, start, start + .16);
      stream.setAttribute('d', `M${lx} ${ly}q${dir * 26} 2 ${dir * 30} 60v${c.length * grow}`);
      stream.setAttribute('stroke-width', c.width * Math.min(1, grow * 4) * (1 - span(p, c.dry[0], c.dry[1])));
      if (c.onFrame) c.onFrame({ p, t, a, tilt, lx, ly, surface, slope, x: lx + dir * 30 });
    }
    function loop(now) {
      if (root.getBoundingClientRect().bottom > 0) draw(now);
      requestAnimationFrame(loop);
    }
    if (reduced) draw(0); else requestAnimationFrame(loop);
    return p => { s.p = p; };
  }

  function reveal() {
    let pending = $$('[data-reveal]');
    onScroll(() => {
      pending = pending.filter(el => {
        if (el.getBoundingClientRect().top > innerHeight * .9) return true;
        el.classList.add('in');
        return false;
      });
    });
  }

  // delegated, so it also covers buttons rendered later by shop.js
  function bag() {
    const out = $('[data-bag]');
    let n = 0;
    document.addEventListener('click', e => {
      const btn = e.target.closest('[data-add]');
      if (!btn || btn.disabled) return;
      n += +(btn.dataset.qty || 1);
      if (out) {
        out.textContent = n;
        out.parentElement.classList.remove('bump');
        void out.offsetWidth;
        out.parentElement.classList.add('bump');
      }
      const label = btn.textContent;
      btn.textContent = btn.dataset.done || 'Añadido ✓';
      btn.disabled = true;
      setTimeout(() => { btn.textContent = label; btn.disabled = false; }, 1100);
    });
  }

  window.Pour = { clamp, span, ease, $, $$, reduced, pinned, through, onScroll, glass };
  addEventListener('DOMContentLoaded', () => { reveal(); bag(); });
})();
