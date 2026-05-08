import * as React from 'react';

const LOAD_STAGGER = 320;
const LOAD_DURATION = 1600;

const LAYERS = [0.1, 0.2, 0.3, 0.45, 0.5, 0.6, 0.75, 1.0].map((opacity, i) => ({
  offset: i * LOAD_STAGGER,
  opacity
}));

const HOLE_SOFTNESS = 28;
const LOAD_START_FACTOR = 1.6;
const CARD_REVEAL_DURATION = 700;
const SHRINK_DURATION = 500;

const TOTAL_LOAD = LAYERS[LAYERS.length - 1].offset + LOAD_DURATION;

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const loadInitialMask =
  'radial-gradient(circle at 50% 50%, transparent 200vmax, black 200vmax)';
const fullCoverMask =
  'radial-gradient(circle at 50% 50%, transparent 0px, black 1px)';

const buildMask = (
  cxPercent: string,
  cyPercent: string,
  r1: number,
  r2: number
) =>
  `radial-gradient(circle at ${cxPercent}% ${cyPercent}%, transparent ${r1}px, black ${r2}px)`;

const writeMask = (
  el: HTMLElement | null,
  x: number,
  y: number,
  radius: number,
  vw: number,
  vh: number
) => {
  if (!el) return;
  const cx = ((x / vw) * 100).toFixed(2);
  const cy = ((y / vh) * 100).toFixed(2);
  const r1 = Math.max(0, radius - HOLE_SOFTNESS);
  const r2 = Math.max(radius, 1);
  const mask = buildMask(cx, cy, r1, r2);
  el.style.maskImage = mask;
  el.style.setProperty('-webkit-mask-image', mask);
};

export const Backdrop: React.FC = () => {
  const loadLayerRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const holeRef = React.useRef<HTMLDivElement | null>(null);
  // While the load mask is still expanding, the dark veil hides the gallery
  // but tiles below remain clickable. Lock them out until interactive mode.
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let raf = 0;
    const loadStart = performance.now();
    let switched = false;

    let lastTileEl: HTMLElement | null = null;
    let cardAnimStart = 0;
    let cardAnimFromR = 0;
    let shrinkStart = 0;
    let shrinkFromR = 0;
    let prevMouseInside = false;
    let mouseEventAfterLoad = false;

    let displayX = window.innerWidth / 2;
    let displayY = window.innerHeight / 2;
    let displayR = 0;

    const mouse = {
      inside: false,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    };

    const markPostLoadEvent = () => {
      if (performance.now() - loadStart > TOTAL_LOAD) {
        mouseEventAfterLoad = true;
      }
    };

    const handleMove = (e: MouseEvent) => {
      mouse.inside = true;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      markPostLoadEvent();
    };
    const handleEnter = () => {
      mouse.inside = true;
      markPostLoadEvent();
    };
    const handleLeave = () => {
      mouse.inside = false;
    };

    const root = document.documentElement;
    window.addEventListener('mousemove', handleMove);
    root.addEventListener('mouseenter', handleEnter);
    root.addEventListener('mouseleave', handleLeave);

    const findNearestTile = (mx: number, my: number): HTMLElement | null => {
      const tiles = document.querySelectorAll<HTMLElement>(
        '[data-gallery-tile]'
      );
      let best: HTMLElement | null = null;
      let bestDist = Infinity;
      for (let i = 0; i < tiles.length; i++) {
        const r = tiles[i].getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const d = Math.hypot(cx - mx, cy - my);
        if (d < bestDist) {
          bestDist = d;
          best = tiles[i];
        }
      }
      return best;
    };

    const tickLoad = (elapsed: number, vw: number, vh: number) => {
      const startR = Math.max(vw, vh) * LOAD_START_FACTOR;
      for (let i = 0; i < LAYERS.length; i++) {
        const layerElapsed = elapsed - LAYERS[i].offset;
        let r: number;
        if (layerElapsed < 0) {
          r = startR;
        } else {
          const t = Math.min(1, layerElapsed / LOAD_DURATION);
          r = startR + (0 - startR) * easeOutCubic(t);
        }
        writeMask(loadLayerRefs.current[i], vw / 2, vh / 2, r, vw, vh);
      }
    };

    const switchToInteractive = () => {
      for (let i = 0; i < LAYERS.length; i++) {
        const el = loadLayerRefs.current[i];
        if (el) el.style.opacity = '0';
      }
      if (holeRef.current) holeRef.current.style.opacity = '1';
      switched = true;
      setLoading(false);
    };

    const tickHole = (now: number, vw: number, vh: number) => {
      if (mouse.inside && mouseEventAfterLoad) {
        if (!prevMouseInside) lastTileEl = null;
        prevMouseInside = true;

        const tile = findNearestTile(mouse.x, mouse.y);
        if (tile && tile !== lastTileEl) {
          lastTileEl = tile;
          cardAnimStart = now;
          cardAnimFromR = 0;
        }

        if (lastTileEl) {
          const rect = lastTileEl.getBoundingClientRect();
          const finalR = Math.max(rect.width, rect.height);
          displayX = rect.left + rect.width / 2;
          displayY = rect.top + rect.height / 2;

          const t = Math.min(1, (now - cardAnimStart) / CARD_REVEAL_DURATION);
          displayR =
            cardAnimFromR + (finalR - cardAnimFromR) * easeOutCubic(t);
        }
      } else {
        if (prevMouseInside) {
          shrinkStart = now;
          shrinkFromR = displayR;
        }
        prevMouseInside = false;
        lastTileEl = null;

        const t = Math.min(1, (now - shrinkStart) / SHRINK_DURATION);
        displayR = shrinkFromR + (0 - shrinkFromR) * easeOutCubic(t);
      }
      writeMask(holeRef.current, displayX, displayY, displayR, vw, vh);
    };

    const tick = (now: number) => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const elapsed = now - loadStart;

      if (elapsed < TOTAL_LOAD) {
        tickLoad(elapsed, vw, vh);
      } else {
        if (!switched) switchToInteractive();
        tickHole(now, vw, vh);
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', handleMove);
      root.removeEventListener('mouseenter', handleEnter);
      root.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <>
      {loading && (
        <style>{`[data-gallery-tile]{pointer-events:none}`}</style>
      )}
      {LAYERS.map((cfg, i) => (
        <div
          key={`load-${i}`}
          ref={el => {
            loadLayerRefs.current[i] = el;
          }}
          aria-hidden
          className="fixed inset-0 pointer-events-none"
          style={{
            zIndex: i,
            backgroundColor: `rgba(0,0,0,${cfg.opacity})`,
            maskImage: loadInitialMask,
            WebkitMaskImage: loadInitialMask
          }}
        />
      ))}
      <div
        ref={holeRef}
        aria-hidden
        className="fixed inset-0 pointer-events-none bg-black"
        style={{
          zIndex: LAYERS.length,
          opacity: 0,
          maskImage: fullCoverMask,
          WebkitMaskImage: fullCoverMask
        }}
      />
    </>
  );
};
