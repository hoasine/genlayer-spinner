const LEFT =
  "M123.252 90.0859L77.1926 186.911L120.551 208.576L0 256L123.252 0V90.0859Z";
const RIGHT =
  "M148.983 90.0859L195.042 186.911L151.684 208.576L272.235 256L148.983 0V90.0859Z";
const DIAMOND =
  "M135.449 121.915L162.433 175.271L135.449 188.498L109.913 175.215L135.449 121.915Z";

const CX = 135.45;
const CY = 158;
const ORBIT_R = 42;

const MARK = `
<svg class="vo-spinner__mark" viewBox="-12 -8 297 272" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
  <path class="vo-spinner__wings" d="${LEFT}"/>
  <path class="vo-spinner__wings" d="${RIGHT}"/>
  <circle class="vo-spinner__orbit-ring" cx="${CX}" cy="${CY}" r="${ORBIT_R}"/>
  <path class="vo-spinner__diamond" d="${DIAMOND}"/>
  <circle class="vo-spinner__dot" data-dot="0" cx="${CX}" cy="${CY - ORBIT_R}" r="4"/>
  <circle class="vo-spinner__dot" data-dot="1" cx="${CX}" cy="${CY - ORBIT_R}" r="4"/>
  <circle class="vo-spinner__dot" data-dot="2" cx="${CX}" cy="${CY - ORBIT_R}" r="4"/>
</svg>
`;

const DEFAULT_ACCENT = "#ff6a33";

export const spinnerTiming = { orbitSec: 2.4, diamondSec: 2.4 };
export const spinnerTheme = { accent: DEFAULT_ACCENT };

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
  target.style.setProperty("--vo-accent", normalized);
  target.style.setProperty("--vo-accent-rgb", `${rgb.r}, ${rgb.g}, ${rgb.b}`);
  return normalized;
}

export function setSpinnerTiming({ orbitSec, diamondSec } = {}) {
  if (Number.isFinite(orbitSec) && orbitSec > 0) spinnerTiming.orbitSec = orbitSec;
  if (Number.isFinite(diamondSec) && diamondSec > 0) {
    spinnerTiming.diamondSec = diamondSec;
  }
  return { ...spinnerTiming };
}

export function setSpinnerAccent(hex) {
  const applied = applyAccentVars(document.documentElement, hex);
  if (!applied) return spinnerTheme.accent;
  spinnerTheme.accent = applied;
  document.querySelectorAll("[data-vo-spinner]").forEach((el) => {
    if (!el.getAttribute("data-accent")) applyAccentVars(el, applied);
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

function readTiming(el) {
  const orbitAttr = Number(el.getAttribute("data-orbit-sec"));
  const diamondAttr = Number(el.getAttribute("data-diamond-sec"));
  return {
    orbitSec:
      Number.isFinite(orbitAttr) && orbitAttr > 0
        ? orbitAttr
        : spinnerTiming.orbitSec,
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
  const diamond = el.querySelector(".vo-spinner__diamond");
  const wings = [...el.querySelectorAll(".vo-spinner__wings")];
  const dots = [0, 1, 2].map((i) => el.querySelector(`[data-dot="${i}"]`));
  const size = el.getBoundingClientRect().width || 48;
  const dotR = Math.max(2, size * 0.035);
  const rest = el.getAttribute("data-tone") === "on-dark" ? "f5f5f5" : "1a1a1a";
  const state = { cancelled: false, start: performance.now() };
  running.set(el, state);

  dots.forEach((d) => d && d.setAttribute("r", String(dotR)));

  const frame = (now) => {
    if (state.cancelled || !el.isConnected) {
      if (running.get(el) === state) running.delete(el);
      return;
    }

    const { orbitSec, diamondSec } = readTiming(el);
    const accent = readAccent(el).slice(1);
    const t = (now - state.start) / 1000;
    const spin = ((t % orbitSec) / orbitSec) * Math.PI * 2;

    // Quorum feel: pulse when dots align near top (phase ~ 0)
    const align = 0.5 + 0.5 * Math.cos(spin);
    const quorum = Math.pow(align, 2.2);

    dots.forEach((dot, i) => {
      if (!dot) return;
      const ang = spin + (i * Math.PI * 2) / 3 - Math.PI / 2;
      const x = CX + Math.cos(ang) * ORBIT_R;
      const y = CY + Math.sin(ang) * ORBIT_R;
      dot.setAttribute("cx", String(x));
      dot.setAttribute("cy", String(y));
      dot.style.opacity = String(0.55 + quorum * 0.45);
    });

    const pulse =
      0.15 +
      quorum * 0.85 * (0.55 + 0.45 * Math.sin((t / diamondSec) * Math.PI * 2));
    const wingFill = mixHex(rest, accent, pulse * 0.4);
    const diamondFill = mixHex(rest, accent, Math.min(1, pulse));
    wings.forEach((w) => {
      w.style.fill = wingFill;
    });
    if (diamond) diamond.style.fill = diamondFill;

    requestAnimationFrame(frame);
  };

  requestAnimationFrame(frame);
}

export function renderSpinner(el) {
  const size = el.getAttribute("data-size") || "md";
  const label = el.getAttribute("aria-label") || "Loading";
  stopSpinner(el);
  el.classList.add("vo-spinner");
  el.setAttribute("data-size", size);
  el.setAttribute("role", "status");
  el.setAttribute("aria-label", label);
  applyAccentVars(el, readAccent(el));
  el.innerHTML = MARK;
  requestAnimationFrame(() => animateSpinner(el));
}

export function remountAllSpinners() {
  document.querySelectorAll("[data-vo-spinner]").forEach(renderSpinner);
}

setSpinnerAccent(DEFAULT_ACCENT);
document.querySelectorAll("[data-vo-spinner]").forEach(renderSpinner);
window.orbitSpinner = {
  remountAllSpinners,
  setSpinnerTiming,
  setSpinnerAccent,
  spinnerTiming,
  spinnerTheme,
};
