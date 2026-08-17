# GenLayer Spinner

<div align="center">

## Portal Loading Mark for GenLayer

| **GenLayer Spinner** |
|---|
| **Official Portal wings stay fixed. Neon edge sweep + soft diamond blink.** |

[![Live Demo](https://img.shields.io/badge/Live-genlayer--spinner--sigma.vercel.app-0f172a?style=for-the-badge&logo=vercel)](https://genlayer-spinner-sigma.vercel.app)
[![Mission](https://img.shields.io/badge/Mission-Design_the_GenLayer_Spinner-ff6a33?style=for-the-badge)](#overview)
[![Stack](https://img.shields.io/badge/Stack-HTML_+_CSS_+_JS-111827?style=for-the-badge)](#project-structure)
[![Mark](https://img.shields.io/badge/Mark-Portal_Official_SVG-1f6feb?style=for-the-badge)](#design-principles)

</div>

---

## Overview

GenLayer Spinner is a Portal-ready loading component for the **Design the GenLayer Spinner** mission.

It uses the official GenLayer Portal mark — left wing, right wing, and center diamond — cropped from [`genlayer-portal-logo.svg`](https://portal.genlayer.foundation/assets/genlayer-portal-logo.svg). Wings never rotate or distort. Motion is limited to:

1. A synchronized accent streak sweeping both wing edges (neon + soft glow)
2. A soft diamond blink between mark color and Portal orange

## Core Value Proposition

- **Brand-safe geometry:** official Portal paths only
- **No logo spin:** wings stay fixed; motion is stroke-based
- **Readable at every size:** glow scales down for `sm` / `md`
- **Configurable live:** speed and accent can be tuned on the demo page
- **Drop-in usage:** one CSS file + one JS module + a `data-gl-spinner` host

## Design Principles

1. **Keep the mark intact** — no rotation, skew, or fill distortion on the wings
2. **Accent stays Portal orange by default** — `#FF6A33`
3. **Edge sweep loops seamlessly** — soft ease-in-out, no pause between cycles
4. **Diamond blink stays gentle** — black/light ↔ accent
5. **Small sizes stay crisp** — blur/halo tokens scale with `data-size`

## Animation Flow

1. Mount host: `<span data-gl-spinner …>`
2. Inject official SVG mark (wings + diamond + sweep strokes)
3. Animate both wing edges with dashoffset (glow layer + neon layer)
4. Soft-blink the diamond on its own period
5. Optionally override timing/accent via attributes or `setSpinner*` helpers

## Markup API

| Attribute | Values | Default | Description |
|-----------|--------|---------|-------------|
| `data-size` | `sm` `md` `lg` `xl` | `md` | 24 / 48 / 72 / 128 px |
| `data-tone` | `on-dark` | — | Light mark for dark surfaces |
| `data-sweep-sec` | number (seconds) | `4.2` | Edge sweep loop duration |
| `data-diamond-sec` | number (seconds) | `1.55` | Diamond blink period |
| `data-accent` | `#rrggbb` | `#ff6a33` | Accent for streak + diamond |

## JavaScript API

```js
import {
  renderSpinner,
  remountAllSpinners,
  setSpinnerTiming,
  setSpinnerAccent,
} from "./spinner.js";

setSpinnerTiming({ sweepSec: 4.2, diamondSec: 1.55 });
setSpinnerAccent("#ff6a33");
remountAllSpinners();
```

Globals on the demo page:

- `window.setSpinnerTiming`
- `window.setSpinnerAccent`
- `window.remountAllSpinners`

## Defaults

| Token | Value | Use |
|-------|-------|-----|
| Accent | `#FF6A33` | Edge neon/glow + diamond peak |
| Void | `#1A1A1A` | Wings on light surfaces |
| On dark | `#F5F5F5` | Wings on dark surfaces |
| Sweep | `4.2s` | Full edge loop |
| Diamond | `1.55s` | Soft blink period |

## Project Structure

```text
index.html      # Demo: preview, setup, examples
spinner.css     # Styles + size/glow tokens
spinner.js      # SVG mark, animation, public API
mark.svg        # Static mark asset
vercel.json     # Static deploy config
README.md
```

## Local Development

```bash
npx --yes serve .
```

Open the printed local URL, or open `index.html` directly.

### Drop-in snippet

```html
<link rel="stylesheet" href="./spinner.css" />

<span
  data-gl-spinner
  data-size="md"
  aria-label="Loading"
></span>

<script type="module" src="./spinner.js"></script>
```

## Links

- Live demo: [https://genlayer-spinner-sigma.vercel.app](https://genlayer-spinner-sigma.vercel.app)
- GitHub: [https://github.com/hoasine/genlayer-spinner](https://github.com/hoasine/genlayer-spinner)
- X: [https://x.com/HoaTranRom](https://x.com/HoaTranRom)
- Discord: `tranduchoa2407`
- Author: Hoa Tran Rom ([@hoasine](https://github.com/hoasine))

## Notes

- Wings are never rotated; motion uses stroke `dashoffset` along the wing paths.
- Accent color is driven by CSS variables (`--gl-accent`, `--gl-accent-rgb`) so updates apply live.
- After local edits, hard-refresh if the browser caches `spinner.js` / `spinner.css`.
