# GenLayer Spinner

Portal-ready loading spinner for the **Design the GenLayer Spinner** mission.

Uses the official GenLayer Portal mark (left wing, right wing, center diamond) from [`genlayer-portal-logo.svg`](https://portal.genlayer.foundation/assets/genlayer-portal-logo.svg). Wings stay fixed — they never rotate or distort. An accent streak sweeps both wing edges with soft neon glow, while the diamond gently blinks between mark color and accent.

## Live demo

**https://genlayer-spinner-sigma.vercel.app**

| Asset | Path |
| --- | --- |
| Demo page | [`index.html`](./index.html) |
| Styles | [`spinner.css`](./spinner.css) |
| Runtime | [`spinner.js`](./spinner.js) |
| Mark preview | [`mark.svg`](./mark.svg) |

## Features

- Official Portal geometry (wings + diamond only)
- Synchronized edge sweep on both wings (neon + soft glow, no white core)
- Soft diamond blink (black/light ↔ accent)
- Size tokens: `sm` · `md` · `lg` · `xl`
- Dark surface support via `data-tone="on-dark"`
- Live timing & accent controls on the demo page
- Programmatic API: `setSpinnerTiming` · `setSpinnerAccent`

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

Serve locally:

```bash
npx --yes serve .
```

Then open the printed local URL (or open `index.html` directly).

## Options

### Markup attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `data-size` | `sm` `md` `lg` `xl` | `md` | 24 / 48 / 72 / 128 px |
| `data-tone` | `on-dark` | — | Light mark for dark backgrounds |
| `data-sweep-sec` | number (seconds) | `4.2` | Edge sweep loop duration |
| `data-diamond-sec` | number (seconds) | `1.55` | Diamond blink period |
| `data-accent` | `#rrggbb` | `#ff8b61` | Accent for streak + diamond |

### JavaScript API

```js
import {
  renderSpinner,
  remountAllSpinners,
  setSpinnerTiming,
  setSpinnerAccent,
} from "./spinner.js";

setSpinnerTiming({ sweepSec: 4.2, diamondSec: 1.55 });
setSpinnerAccent("#ff8b61");

// Or remount after DOM changes
remountAllSpinners();
```

Globals are also available on `window` when the demo page loads the module:

- `window.setSpinnerTiming`
- `window.setSpinnerAccent`
- `window.remountAllSpinners`

## Defaults

| Token | Value | Use |
| --- | --- | --- |
| Accent | `#FF8B61` | Edge neon/glow + diamond peak |
| Void | `#1A1A1A` | Wings (light surfaces) |
| On dark | `#F5F5F5` | Wings on dark surfaces |
| Sweep | `4.2s` | Full edge loop |
| Diamond | `1.55s` | Soft blink period |

Glow strength scales with size so small spinners stay crisp.

## Project layout

```text
genlayer-spinner/
├── index.html      # Demo: preview, setup, size gallery
├── spinner.css     # Spinner styles + size/glow tokens
├── spinner.js      # SVG mark + animation + public API
├── mark.svg        # Static mark asset
├── vercel.json     # Static deploy config
└── README.md
```

## Deploy

Already linked to Vercel. Redeploy from the project root:

```bash
npx vercel --prod
```

GitHub: [hoasine/genlayer-spinner](https://github.com/hoasine/genlayer-spinner)

## Notes

- Wings are never rotated; motion is stroke dashoffset along the wing paths.
- Accent glow uses CSS variables (`--gl-accent`, `--gl-accent-rgb`) so color changes apply live.
- Prefer a hard refresh after local edits if the browser caches `spinner.js` / `spinner.css`.
