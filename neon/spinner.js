const LEFT =
  "M123.252 90.0859L77.1926 186.911L120.551 208.576L0 256L123.252 0V90.0859Z";
const RIGHT =
  "M148.983 90.0859L195.042 186.911L151.684 208.576L272.235 256L148.983 0V90.0859Z";
const DIAMOND =
  "M135.449 121.915L162.433 175.271L135.449 188.498L109.913 175.215L135.449 121.915Z";

const MARK = `
<svg class="gl-spinner__mark" viewBox="-12 -8 297 272" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
  <path class="gl-spinner__wings" d="${LEFT}"/>
  <path class="gl-spinner__wings" d="${RIGHT}"/>
  <path class="gl-spinner__diamond" d="${DIAMOND}"/>
  <path class="gl-spinner__sweep-glow" data-sweep="left-glow" d="${LEFT}"/>
  <path class="gl-spinner__sweep" data-sweep="left" d="${LEFT}"/>
  <path class="gl-spinner__sweep-glow" data-sweep="right-glow" d="${RIGHT}"/>
  <path class="gl-spinner__sweep" data-sweep="right" d="${RIGHT}"/>
</svg>
`;

const DEFAULT_ACCENT = "#ff6a33";

/** Global defaults — change live via setSpinnerTiming / setSpinnerAccent. */
export const spinnerTiming = {
  sweepSec: 4.2,
  diamondSec: 1.55,
};

export const spinnerTheme = {
  accent: DEFAULT_ACCENT,
};

function normalizeHex(hex) {
  if (typeof hex !== "string") return null;
  let h = hex.trim().toLowerCase();
  if (!h.startsWith("#")) h = `#${h}`;
  if (/^#[0-9a-f]{3}$/.test(h)) {
    h = `#${h[1]}${h[1]}${h[2]}${h[2]}${h[3]}${h[3]}`;
  }
  return /^#[0-9a-f]{6}$/.test(h) ? h : null;
}

function hexToRgb(hex) {
  const h = normalizeHex(hex);
  if (!h) return null;
  return {
    r: parseInt(h.slice(1, 3), 16),
    g: parseInt(h.slice(3, 5), 16),
    b: parseInt(h.slice(5, 7), 16),
  };
}

function applyAccentVars(target, hex) {
  const normalized = normalizeHex(hex);
  const rgb = hexToRgb(normalized);
  if (!normalized || !rgb || !target) return null;
  target.style.setProperty("--gl-accent", normalized);
  target.style.setProperty("--gl-accent-rgb", `${rgb.r}, ${rgb.g}, ${rgb.b}`);
  return normalized;
}

export function setSpinnerTiming({ sweepSec, diamondSec } = {}) {
  if (Number.isFinite(sweepSec) && sweepSec > 0) {
    spinnerTiming.sweepSec = sweepSec;
  }
  if (Number.isFinite(diamondSec) && diamondSec > 0) {
    spinnerTiming.diamondSec = diamondSec;
  }
  return { ...spinnerTiming };
}

export function setSpinnerAccent(hex) {
  const applied = applyAccentVars(document.documentElement, hex);
  if (!applied) return spinnerTheme.accent;
  spinnerTheme.accent = applied;
  document.querySelectorAll("[data-gl-spinner]").forEach((el) => {
    if (!el.getAttribute("data-accent")) {
      applyAccentVars(el, applied);
    }
  });
  return applied;
}

const running = new WeakMap();

function mixHex(a, b, t) {
  const p = Math.min(1, Math.max(0, t));
  const ah = a.match(/\w\w/g).map((x) => parseInt(x, 16));
  const bh = b.match(/\w\w/g).map((x) => parseInt(x, 16));
  return `#${ah
    .map((v, i) => Math.round(v + (bh[i] - v) * p).toString(16).padStart(2, "0"))
    .join("")}`;
}

function easeInOut(x) {
  return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
}

function prepareSweep(path, dashLen) {
  const len = path.getTotalLength();
  path.style.strokeDasharray = `${dashLen} ${len}`;
  path.style.strokeDashoffset = String(len);
  return len;
}

function setSweep(path, len, dashLen, progress) {
  const p = ((progress % 1) + 1) % 1;
  path.style.strokeDashoffset = String(len - p * (len + dashLen));
}

function softBlink(t, period = 2.15) {
  const sec = Math.max(0.05, period);
  return 0.5 - 0.5 * Math.cos(((t % sec) / sec) * Math.PI * 2);
}

function readTiming(el) {
  const sweepAttr = Number(el.getAttribute("data-sweep-sec"));
  const diamondAttr = Number(el.getAttribute("data-diamond-sec"));
  return {
    sweepSec:
      Number.isFinite(sweepAttr) && sweepAttr > 0
        ? sweepAttr
        : spinnerTiming.sweepSec,
    diamondSec:
      Number.isFinite(diamondAttr) && diamondAttr > 0
        ? diamondAttr
        : spinnerTiming.diamondSec,
  };
}

function readAccent(el) {
  return (
    normalizeHex(el.getAttribute("data-accent")) ||
    spinnerTheme.accent ||
    DEFAULT_ACCENT
  );
}

function stopSpinner(el) {
  const prev = running.get(el);
  if (prev) prev.cancelled = true;
}

function animateSpinner(el) {
  stopSpinner(el);

  const diamond = el.querySelector(".gl-spinner__diamond");
  const left = el.querySelector('[data-sweep="left"]');
  const right = el.querySelector('[data-sweep="right"]');
  const leftGlow = el.querySelector('[data-sweep="left-glow"]');
  const rightGlow = el.querySelector('[data-sweep="right-glow"]');

  const size = el.getBoundingClientRect().width || 48;
  const dashLen = size * 0.36;
  const glowDash = dashLen * 1.12;

  const lenL = prepareSweep(left, dashLen);
  const lenR = prepareSweep(right, dashLen);
  prepareSweep(leftGlow, glowDash);
  prepareSweep(rightGlow, glowDash);

  const rest = el.getAttribute("data-tone") === "on-dark" ? "f5f5f5" : "1a1a1a";
  const state = { cancelled: false, start: performance.now() };
  running.set(el, state);

  const frame = (now) => {
    if (state.cancelled || !el.isConnected) {
      if (running.get(el) === state) running.delete(el);
      return;
    }
    const { sweepSec, diamondSec } = readTiming(el);
    const accent = readAccent(el).slice(1);
    const t = (now - state.start) / 1000;
    const raw = (t % sweepSec) / sweepSec;
    const wingP = easeInOut(raw);

    setSweep(leftGlow, lenL, glowDash, wingP);
    setSweep(rightGlow, lenR, glowDash, wingP);
    setSweep(left, lenL, dashLen, wingP);
    setSweep(right, lenR, dashLen, wingP);

    if (diamond) {
      diamond.style.fill = mixHex(rest, accent, softBlink(t, diamondSec));
    }

    requestAnimationFrame(frame);
  };

  requestAnimationFrame(frame);
}

export function renderSpinner(el) {
  const size = el.getAttribute("data-size") || "md";
  const label = el.getAttribute("aria-label") || "Loading";
  stopSpinner(el);
  el.classList.add("gl-spinner");
  el.setAttribute("data-size", size);
  el.setAttribute("role", "status");
  el.setAttribute("aria-label", label);
  applyAccentVars(el, readAccent(el));
  el.innerHTML = MARK;
  requestAnimationFrame(() => animateSpinner(el));
}

export function remountAllSpinners() {
  document.querySelectorAll("[data-gl-spinner]").forEach(renderSpinner);
}

setSpinnerAccent(DEFAULT_ACCENT);
document.querySelectorAll("[data-gl-spinner]").forEach(renderSpinner);
window.neonSpinner = {
  remountAllSpinners,
  setSpinnerTiming,
  setSpinnerAccent,
  spinnerTiming,
  spinnerTheme,
};
