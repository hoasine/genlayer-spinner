# GenLayer Spinner

Portal loading spinner for the **Design the GenLayer Spinner** mission.

The mark is cropped from the official Portal logo (`genlayer-portal-logo.svg`): two wings + inner diamond. Wings stay still. The diamond pulses in Portal orange. A square ticks around the mark (quorum orbit). The whole logo is never rotated.

## Live

https://genlayer-spinner-sigma.vercel.app

The page opens on a full-page loading state, then shows the spinner in button, card, and size examples.

## Use

```html
<link rel="stylesheet" href="./spinner.css" />
<span data-gl-spinner data-size="md" aria-label="Loading"></span>
<script type="module" src="./spinner.js"></script>
```

Sizes: `sm` 24px · `md` 48px · `lg` 72px · `xl` 128px  
Dark surfaces: `data-tone="on-dark"`

## Palette

| Token | Hex | Use |
|-------|-----|-----|
| Portal orange | `#FF6A33` | diamond + orbit |
| Peach wash | `#FFF4EC` | page / overlay |
| Void | `#1A1A1A` | wings |

## Local

Open `index.html` or:

```bash
npx --yes serve .
```
