import { ref, type Ref } from 'vue';

const PALETTE: { rgb: [number, number, number]; threshold: number }[] = [
  { rgb: [210, 194, 130], threshold: 0.38 },
  { rgb: [110, 124,  46], threshold: 0.66 },
  { rgb: [144, 158, 168], threshold: 0.86 },
  { rgb: [ 58,  72,  24], threshold: 0.93 },
  { rgb: [ 38,  36,  58], threshold: 1.00 },
];

const DEFAULT_SEED = 4271;
const PIXEL_SIZE = 4;
const FX = 0.095;
const FY = 0.115;
const W1X = 3.2;
const W1Y = 2.0;
const W2X = 3.2;
const W2Y = 2.0;
const AMPS = [0.52, 0.28, 0.13, 0.07];
const GW = 256;
const GH = 256;

function lcg(s: number): number {
  return ((s * 1664525 + 1013904223) >>> 0);
}

function buildGrid(seed: number): Float32Array {
  const g = new Float32Array(GW * GH);
  let s = seed;
  for (let i = 0; i < g.length; i++) {
    s = lcg(s);
    g[i] = (s >>> 0) / 4294967295;
  }
  return g;
}

function smoothstep(t: number): number {
  return t * t * (3 - 2 * t);
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function vnoise(x: number, y: number, g: Float32Array): number {
  const ix = Math.floor(x) & (GW - 1);
  const iy = Math.floor(y) & (GH - 1);
  const fx = x - Math.floor(x);
  const fy = y - Math.floor(y);
  const ix1 = (ix + 1) & (GW - 1);
  const iy1 = (iy + 1) & (GH - 1);
  return lerp(
    lerp(g[iy * GW + ix], g[iy * GW + ix1], smoothstep(fx)),
    lerp(g[iy1 * GW + ix], g[iy1 * GW + ix1], smoothstep(fx)),
    smoothstep(fy),
  );
}

function fbm(x: number, y: number, grids: Float32Array[]): number {
  let v = 0;
  for (let i = 0; i < AMPS.length; i++) {
    v += AMPS[i] * vnoise(x * (1 << i), y * (1 << i), grids[i]);
  }
  return v;
}

function pickColor(t: number): [number, number, number] {
  for (const e of PALETTE) {
    if (t <= e.threshold) return e.rgb;
  }
  return PALETTE[PALETTE.length - 1].rgb;
}

function generateCamo(w: number, h: number, seed: number): string {
  let s = seed;
  function ns(): number { s = lcg(s); return s; }

  const mainG  = [ns(), ns(), ns(), ns()].map(buildGrid);
  const w1xG   = [ns(), ns(), ns(), ns()].map(buildGrid);
  const w1yG   = [ns(), ns(), ns(), ns()].map(buildGrid);
  const w2xG   = [ns(), ns(), ns(), ns()].map(buildGrid);
  const w2yG   = [ns(), ns(), ns(), ns()].map(buildGrid);
  const edgeG  = buildGrid(ns());
  const microG = buildGrid(ns());

  const lw = Math.ceil(w / PIXEL_SIZE);
  const lh = Math.ceil(h / PIXEL_SIZE);

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;
  const imgData = ctx.createImageData(w, h);
  const data = imgData.data;

  for (let ly = 0; ly < lh; ly++) {
    for (let lx = 0; lx < lw; lx++) {
      const nx = lx * FX;
      const ny = ly * FY;

      const wx1 = nx + W1X * fbm(nx, ny, w1xG);
      const wy1 = ny + W1Y * fbm(nx, ny, w1yG);

      const wx2 = wx1 + W2X * fbm(wx1, wy1, w2xG);
      const wy2 = wy1 + W2Y * fbm(wx1, wy1, w2yG);

      let n = fbm(wx2, wy2, mainG);

      // Ragged pixel edges at color boundaries
      const edgeN  = vnoise(nx * 8,  ny * 8,  edgeG);
      const microN = vnoise(nx * 12, ny * 12, microG);
      if (edgeN > 0.72 && microN > 0.58) {
        n = Math.max(0, Math.min(1, n + (microN - 0.58) * 0.15));
      }

      const [r, g, b] = pickColor(n);

      // Paint PIXEL_SIZE × PIXEL_SIZE block
      for (let dy = 0; dy < PIXEL_SIZE; dy++) {
        const py = ly * PIXEL_SIZE + dy;
        if (py >= h) break;
        for (let dx = 0; dx < PIXEL_SIZE; dx++) {
          const px = lx * PIXEL_SIZE + dx;
          if (px >= w) break;
          const idx = (py * w + px) * 4;
          data[idx]     = r;
          data[idx + 1] = g;
          data[idx + 2] = b;
          data[idx + 3] = 255;
        }
      }
    }
  }

  ctx.putImageData(imgData, 0, 0);
  return canvas.toDataURL('image/png');
}

export function useCamoBackground(defaultSeed = DEFAULT_SEED): {
  camoDataUrl: Ref<string>;
  init: (el: HTMLElement) => void;
  destroy: () => void;
} {
  const camoDataUrl = ref('');
  let containerEl: HTMLElement | null = null;
  let resizeObserver: ResizeObserver | null = null;

  function generate(): void {
    if (!containerEl) return;
    const w = containerEl.offsetWidth  || window.innerWidth;
    const h = containerEl.offsetHeight || window.innerHeight;
    camoDataUrl.value = generateCamo(w, h, defaultSeed);
  }

  function init(el: HTMLElement): void {
    containerEl = el;
    generate();
    resizeObserver = new ResizeObserver(() => generate());
    resizeObserver.observe(el);
  }

  function destroy(): void {
    resizeObserver?.disconnect();
    resizeObserver = null;
    containerEl = null;
  }

  return { camoDataUrl, init, destroy };
}
