# GenLayer Spinner

Portal loading spinner for the **Design the GenLayer Spinner** mission.

Built from the official GenLayer Portal mark — left wing, right wing, and center diamond — sourced from [`genlayer-portal-logo.svg`](https://portal.genlayer.foundation/assets/genlayer-portal-logo.svg). Wings stay fixed (never rotate or distort). An accent streak sweeps both wing edges with soft neon glow, while the diamond gently blinks between the mark color and the accent.

**Author:** Hoa Tran Rom ([@hoasine](https://github.com/hoasine))

| | |
| --- | --- |
| **X** | [https://x.com/HoaTranRom](https://x.com/HoaTranRom) |
| **Discord** | `tranduchoa2407` |
| **GitHub** | [https://github.com/hoasine](https://github.com/hoasine) |
| **Live demo** | [https://genlayer-spinner-sigma.vercel.app](https://genlayer-spinner-sigma.vercel.app) |

---

## Features

- Official Portal geometry (wings + diamond only)
- Synchronized edge sweep on both wings (neon + soft glow, no white core)
- Soft diamond blink (mark color ↔ accent)
- Size tokens: `sm` · `md` · `lg` · `xl`
- Dark surfaces via `data-tone="on-dark"`
- Live timing and accent controls on the demo page
- Public API: `setSpinnerTiming` · `setSpinnerAccent`

## Quick start

```html
<link rel="stylesheet" href="./spinner.css" />

<span
  data-gl-spinner
  data-size="md"
  aria-label="Loading"
></span>

<script type="module" src="./spinner.js"></script>
```

Run locally:

```bash
npx --yes serve .
```

Open the printed local URL, or open `index.html` directly.

## Options

### Markup attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `data-size` | `sm` `md` `lg` `xl` | `md` | 24 / 48 / 72 / 128 px |
| `data-tone` | `on-dark` | — | Light mark for dark backgrounds |
| `data-sweep-sec` | number (seconds) | `4.2` | Edge sweep loop duration |
| `data-diamond-sec` | number (seconds) | `1.55` | Diamond blink period |
| `data-accent` | `#rrggbb` | `#ff6a33` | Accent for streak + diamond |

### JavaScript API

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

When loaded as a module on the demo page, the same helpers are available on `window`:

- `window.setSpinnerTiming`
- `window.setSpinnerAccent`
- `window.remountAllSpinners`

## Defaults

| Token | Value | Use |
| --- | --- | --- |
| Accent | `#FF6A33` | Edge neon/glow + diamond peak |
| Void | `#1A1A1A` | Wings on light surfaces |
| On dark | `#F5F5F5` | Wings on dark surfaces |
| Sweep | `4.2s` | Full edge loop |
| Diamond | `1.55s` | Soft blink period |

Glow strength scales with spinner size so small marks stay crisp.

## Project layout

```text
genlayer-spinner/
├── index.html      # Demo: preview, setup, examples
├── spinner.css     # Styles + size/glow tokens
├── spinner.js      # SVG mark, animation, public API
├── mark.svg        # Static mark asset
├── vercel.json     # Static deploy config
└── README.md
```

| Asset | Path |
| --- | --- |
| Demo page | [`index.html`](./index.html) |
| Styles | [`spinner.css`](./spinner.css) |
| Runtime | [`spinner.js`](./spinner.js) |
| Mark | [`mark.svg`](./mark.svg) |

## Deploy

Repository: [hoasine/genlayer-spinner](https://github.com/hoasine/genlayer-spinner)

```bash
npx vercel --prod
```

## Notes

- Wings are never rotated; motion uses stroke `dashoffset` along the wing paths.
- Accent color is driven by CSS variables (`--gl-accent`, `--gl-accent-rgb`) so updates apply live.
- After local edits, hard-refresh if the browser caches `spinner.js` / `spinner.css`.
