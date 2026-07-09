// Coreografia scroll della pagina "Festa della Bruna".
// Un solo requestAnimationFrame guida tutte le meccaniche; il markup resta
// leggibile senza JS (layout verticale statico) e con prefers-reduced-motion
// la pagina parte direttamente scura, senza animazioni.

const WHITE = [245, 245, 245];
const BLACK = [26, 26, 26];

function clamp01(v: number): number {
  return Math.min(1, Math.max(0, v));
}

function ease(t: number): number {
  return t * t * (3 - 2 * t);
}

function mix(a: number[], b: number[], t: number): string {
  return `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * t)).join(',')})`;
}

function progress(el: HTMLElement, vh: number): number {
  const r = el.getBoundingClientRect();
  return clamp01(-r.top / (r.height - vh));
}

export function initBruna(): void {
  const root = document.querySelector<HTMLElement>('[data-bruna-root]');
  if (!root) return;

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    root.style.setProperty('--bruna-bg', mix(WHITE, BLACK, 1));
    root.style.setProperty('--bruna-fg', mix(BLACK, WHITE, 1));
    return;
  }

  root.setAttribute('data-anim', '');

  // global.css imposta scroll-behavior: smooth sull'html: ogni scrollTo del
  // tween avvierebbe una animazione smooth del browser, interrotta 60 volte
  // al secondo → moto a gradini. Su questa pagina lo scroll programmato deve
  // essere istantaneo (l'easing lo facciamo noi).
  document.documentElement.style.scrollBehavior = 'auto';

  const siteHeader = document.querySelector<HTMLElement>('body > header');
  const openingBlock = document.querySelector<HTMLElement>('[data-bruna-opening]');
  const scrollHint = document.querySelector<HTMLElement>('[data-bruna-hint]');
  const ride = document.querySelector<HTMLElement>('[data-ride]');
  const rideScenes = Array.from(
    document.querySelectorAll<HTMLElement>('[data-ride-scene]')
  );
  const ribbon = document.querySelector<HTMLElement>('[data-ribbon]');
  const ribbonTrack = document.querySelector<HTMLElement>('[data-ribbon-track]');
  const diorama = document.querySelector<HTMLElement>('[data-diorama]');
  const dioLayers = Array.from(
    document.querySelectorAll<HTMLElement>('[data-dio-depth]')
  );
  const strazzo = document.querySelector<HTMLElement>('[data-strazzo]');
  const strazzoCart = document.querySelector<HTMLElement>('[data-strazzo-cart]');
  const strazzoCartImg = strazzoCart?.querySelector('img') ?? null;
  const strazzoPieces = Array.from(
    document.querySelectorAll<HTMLElement>('[data-strazzo-piece]')
  );
  const strazzoCaptions = Array.from(
    document.querySelectorAll<HTMLElement>('[data-strazzo-caption]')
  );

  // Brandelli: poligoni irregolari con bordi da strappo.
  // [clip-path, direzione x, direzione y, rotazione]
  const SHARDS: [string, number, number, number][] = [
    ['polygon(0% 0%, 34% 0%, 28% 18%, 36% 35%, 22% 52%, 0% 46%)', -1.1, -0.7, -38],
    ['polygon(34% 0%, 68% 0%, 62% 14%, 70% 30%, 52% 42%, 36% 35%, 28% 18%)', 0.15, -1.3, 14],
    ['polygon(68% 0%, 100% 0%, 100% 38%, 82% 46%, 70% 30%, 62% 14%)', 1.2, -0.8, 42],
    ['polygon(0% 46%, 22% 52%, 36% 35%, 52% 42%, 46% 66%, 24% 78%, 0% 72%)', -1.4, 0.1, -24],
    ['polygon(52% 42%, 70% 30%, 82% 46%, 78% 64%, 58% 72%, 46% 66%)', 0.4, 0.35, 8],
    ['polygon(82% 46%, 100% 38%, 100% 74%, 84% 82%, 78% 64%)', 1.5, 0.3, 30],
    ['polygon(0% 72%, 24% 78%, 46% 66%, 58% 72%, 52% 100%, 0% 100%)', -0.9, 1.2, -18],
    ['polygon(58% 72%, 78% 64%, 84% 82%, 100% 74%, 100% 100%, 52% 100%)', 1.0, 1.3, 26],
  ];

  let shards: HTMLElement[] = [];
  if (strazzoCart && strazzoCartImg) {
    const url = strazzoCartImg.currentSrc || strazzoCartImg.src;
    shards = SHARDS.map((s) => {
      const d = document.createElement('div');
      d.setAttribute('data-shard', '');
      d.style.backgroundImage = `url(${url})`;
      d.style.clipPath = s[0];
      strazzoCart.appendChild(d);
      return d;
    });
  }

  let vh = innerHeight;
  addEventListener('resize', () => {
    vh = innerHeight;
  });

  // Pre-decodifica le foto delle scene: senza, il browser decodifica al
  // primo paint (cioè a metà transizione) e l'hitch si vede come uno snap.
  document
    .querySelectorAll<HTMLImageElement>(
      '[data-ride-scene] img, [data-strazzo] img, [data-diorama] img'
    )
    .forEach((img) => {
      img.loading = 'eager';
      const decode = () => img.decode().catch(() => {});
      if (img.complete) decode();
      else img.addEventListener('load', decode, { once: true });
    });

  // ── Checkpoint del dark ride ──────────────────────────────────────────────
  // Nel tratto tra il blocco titolo e le scene, wheel e swipe vengono
  // intercettati al primo input: la pagina parte SUBITO verso il checkpoint
  // successivo (scena presentata a dimensione piena), senza attese e senza
  // stati intermedi. Oltre l'ultima scena lo scroll torna nativo. Scrollbar
  // e tastiera restano nativi: per loro c'è uno snap di riserva a fine
  // scorrimento.
  if (ride && rideScenes.length) {
    const n = rideScenes.length;
    let tweening = false;
    let cooldownUntil = 0;
    let touchY0: number | null = null;

    const checkpoints = (): number[] => {
      const rect = ride.getBoundingClientRect();
      const top = rect.top + scrollY;
      const span = rect.height - vh;
      const pts = [0];
      for (let i = 0; i < n; i++) {
        // Scena i "presentata": t = 0.5 → progresso (i + 0.5) / n.
        pts.push(top + ((i + 0.5) / n) * span);
      }
      return pts;
    };

    const tween = (from: number, to: number): void => {
      tweening = true;
      const dur = Math.min(1000, Math.max(450, Math.abs(to - from) * 0.8));
      const t0 = performance.now();
      // Safari ignora il preventDefault durante la fase di momentum del
      // trackpad: l'inerzia nativa continua sotto il tween. La fase di
      // tenuta inchioda la pagina sul checkpoint finché l'inerzia non è
      // esaurita, altrimenti a fine tween la pagina deriverebbe oltre e il
      // rientro si vedrebbe come uno snap.
      const holdUntil = t0 + dur + 400;
      const step = (now: number): void => {
        const k = clamp01((now - t0) / dur);
        scrollTo({ top: from + (to - from) * ease(k), behavior: 'instant' });
        if (now < holdUntil) {
          requestAnimationFrame(step);
        } else {
          tweening = false;
          lastY = scrollY;
          cooldownUntil = performance.now() + 150;
        }
      };
      requestAnimationFrame(step);
    };

    // true se l'evento è stato gestito (e va bloccato), false se lo scroll
    // deve restare nativo (fuori zona).
    const steer = (dir: 1 | -1): boolean => {
      const pts = checkpoints();
      const last = pts[pts.length - 1];
      if (scrollY >= last - 2 && dir > 0) return false; // esce verso il basso
      if (scrollY > last + 2) return false; // sotto la zona

      if (!tweening && performance.now() >= cooldownUntil) {
        const target =
          dir > 0
            ? pts.find((p) => p > scrollY + 10)
            : [...pts].reverse().find((p) => p < scrollY - 10);
        if (target !== undefined) tween(scrollY, target);
      }
      return true;
    };

    addEventListener(
      'wheel',
      (e) => {
        if (e.ctrlKey) return; // pinch-zoom
        if (steer(e.deltaY > 0 ? 1 : -1)) e.preventDefault();
      },
      { passive: false }
    );

    addEventListener(
      'touchstart',
      (e) => {
        touchY0 = e.touches[0].clientY;
      },
      { passive: true }
    );

    addEventListener(
      'touchmove',
      (e) => {
        if (touchY0 === null) return;
        const dy = touchY0 - e.touches[0].clientY; // >0 = scorre in giù
        const pts = checkpoints();
        const last = pts[pts.length - 1];
        if (scrollY >= last - 2 && dy > 0) return;
        if (scrollY > last + 2) return;
        e.preventDefault();
        if (Math.abs(dy) < 24) return; // soglia anti-tocco involontario
        if (steer(dy > 0 ? 1 : -1)) touchY0 = null; // un gesto, un checkpoint
      },
      { passive: false }
    );

    // Riserva per scrollbar/tastiera: se lo scroll nativo si ferma a metà
    // di un segmento, riallinea al checkpoint più vicino nella direzione
    // del movimento.
    let lastY = scrollY;
    let dirS = 1;
    let idleTimer: ReturnType<typeof setTimeout>;
    addEventListener(
      'scroll',
      () => {
        if (tweening) return;
        dirS = scrollY > lastY ? 1 : scrollY < lastY ? -1 : dirS;
        lastY = scrollY;
        clearTimeout(idleTimer);
        idleTimer = setTimeout(() => {
          if (tweening) return;
          const pts = checkpoints();
          const y = scrollY;
          if (y <= pts[0] + 1 || y >= pts[pts.length - 1] - 1) return;
          let i = 0;
          while (i < pts.length - 2 && y >= pts[i + 1]) i++;
          const frac = (y - pts[i]) / (pts[i + 1] - pts[i]);
          if (frac < 0.03 || frac > 0.97) return;
          tween(y, dirS > 0 ? pts[i + 1] : pts[i]);
        }, 120);
      },
      { passive: true }
    );
  }

  let mx = 0;
  let my = 0;
  if (matchMedia('(pointer: fine)').matches) {
    addEventListener('pointermove', (e) => {
      mx = e.clientX / innerWidth - 0.5;
      my = e.clientY / innerHeight - 0.5;
    });
  }

  function frame(): void {
    // Apertura: bianco → buio. Parte da bianco pieno a scroll 0 (la prima
    // scena è già parzialmente visibile) e si completa quando lo stage del
    // dark ride aggancia la cima del viewport (prima scena centrata).
    if (ride) {
      const top = ride.getBoundingClientRect().top;
      const p = clamp01(scrollY / Math.max(1, top + scrollY));
      const openP = ease(p);
      root!.style.setProperty('--bruna-bg', mix(WHITE, BLACK, openP));
      root!.style.setProperty('--bruna-fg', mix(BLACK, WHITE, openP));

      // Header del sito e blocco titolo svaniscono entrando nel buio;
      // tornando in cima riappaiono (tutto è funzione del progresso).
      const fade = String(1 - ease(clamp01((p - 0.25) / 0.6)));
      [siteHeader, openingBlock].forEach((el) => {
        if (!el) return;
        el.style.opacity = fade;
        el.style.pointerEvents = Number(fade) < 0.05 ? 'none' : '';
      });

      // L'invito a scorrere ha esaurito il suo compito appena si parte:
      // sparisce subito, all'inizio della prima transizione.
      if (scrollHint) {
        scrollHint.style.opacity = String(1 - ease(clamp01(p / 0.2)));
      }

      // Dark ride: ogni scena ha una finestra di progresso.
      const q = progress(ride, vh);
      const n = rideScenes.length;
      rideScenes.forEach((scene, i) => {
        const t = q * n - i;
        const img = scene.querySelector('img');
        if (t < -0.35 || t > 1.45) {
          scene.style.opacity = '0';
          return;
        }
        // Curve smussate (ease) e sovrapposte: l'entrante guida ed è piena
        // a t=0.3; l'uscente resta piena fino a t=0.8 e sparisce a t=1.3,
        // quando l'entrante ha già preso la scena. Il prodotto delle due
        // curve non lascia mai cali di luminosità né partenze a gradino.
        const fadeIn = i === 0 ? 1 : ease(clamp01((t + 0.35) / 0.65));
        const fadeOut = i === n - 1 ? 1 : 1 - ease(clamp01((t - 0.8) / 0.5));
        scene.style.opacity = String(fadeIn * fadeOut);
        scene.style.zIndex = String(10 + i);
        if (img) {
          // La prima scena parte sollevata (il capolino vicino al titolo) ma
          // si ricentra già durante la discesa nel buio: la crescita di scala
          // avviene sempre ancorata al centro, come per le altre scene.
          const lift = i === 0 ? (1 - openP) * -0.18 * vh : 0;
          // La scala evolve anche a t negativo (mentre la scena sta ancora
          // apparendo): così la foto entrante si muove insieme all'uscita
          // della precedente, senza il "due step" attesa-poi-crescita.
          const grow = i === 0 ? Math.max(0, t) : Math.max(-0.35, t);
          img.style.transform = `translateY(${lift}px) scale(${
            0.72 + 0.55 * grow
          })`;
        }
      });
    }

    // Nastro orizzontale: progresso verticale → traslazione del nastro.
    if (ribbon && ribbonTrack) {
      const q = progress(ribbon, vh);
      const max = ribbonTrack.scrollWidth - ribbon.clientWidth;
      ribbonTrack.style.transform = `translateX(${-q * max}px)`;
    }

    // Diorama: piani a velocità diverse + tilt col mouse su desktop.
    if (diorama) {
      const d = progress(diorama, vh) - 0.5;
      dioLayers.forEach((layer) => {
        const depth = parseFloat(layer.dataset.dioDepth || '0');
        layer.style.transform = `translate3d(${mx * -depth * 55}px, ${
          d * -depth * 240 + my * -depth * 40
        }px, 0)`;
      });
    }

    // Strazzo: il carro trema, si strappa, sotto emerge il mosaico.
    if (strazzo && shards.length) {
      const p = progress(strazzo, vh);
      const zoom = 1 + 0.06 * clamp01(p / 0.3);
      const shake =
        p > 0.22 && p < 0.34 ? Math.sin(p * 900) * 5 * ((p - 0.22) / 0.12) : 0;
      const tear = ease(clamp01((p - 0.3) / 0.4));

      shards.forEach((shard, i) => {
        const s = SHARDS[i];
        const dist = tear * tear * 900;
        shard.style.transform = `translate(${shake + s[1] * dist}px, ${
          s[2] * dist + tear * 150
        }px) rotate(${s[3] * tear}deg) scale(${zoom})`;
        shard.style.opacity = String(1 - ease(clamp01((p - 0.55) / 0.25)));
      });

      strazzoPieces.forEach((piece, i) => {
        const t = ease(clamp01((p - 0.5 - i * 0.07) / 0.18));
        piece.style.opacity = String(t);
        piece.style.transform = `scale(${0.94 + 0.06 * t})`;
      });

      const phase = p < 0.3 ? 0 : p < 0.62 ? 1 : 2;
      strazzoCaptions.forEach((cap, i) => {
        cap.toggleAttribute('data-active', i === phase);
      });
    }

    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}
