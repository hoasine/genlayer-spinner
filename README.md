# GenLayer Spinner

<div align="center">

## Contest Entry · Design the GenLayer Spinner

| **GenLayer Spinner** |
|---|
| **Two Portal-ready loaders. Official mark stays fixed. Option A or B.** |

[![Live Demo](https://img.shields.io/badge/Live-genlayer--spinner--sigma.vercel.app-0f172a?style=for-the-badge&logo=vercel)](https://genlayer-spinner-sigma.vercel.app)
[![Mission](https://img.shields.io/badge/Mission-Design_the_GenLayer_Spinner-ff6a33?style=for-the-badge)](#overview)
[![Stack](https://img.shields.io/badge/Stack-HTML_+_CSS_+_JS-111827?style=for-the-badge)](#project-structure)
[![Mark](https://img.shields.io/badge/Mark-Portal_Official_SVG-1f6feb?style=for-the-badge)](#design-principles)
[![Options](https://img.shields.io/badge/Options-Neon_Edge_+_Validator_Orbit-0f172a?style=for-the-badge)](#contest-options)

</div>

---

## Overview

Contest entry for the **Design the GenLayer Spinner** mission.

Both concepts use the official GenLayer Portal mark — left wing, right wing, and center diamond — from [`genlayer-portal-logo.svg`](https://portal.genlayer.foundation/assets/genlayer-portal-logo.svg). Wings never rotate or distort. The demo page shows **Option A** and **Option B** side by side, with independent controls and a full-page Portal loading overlay.

**Author:** Hoa Tran Rom ([@hoasine](https://github.com/hoasine))

| | |
| --- | --- |
| **Live demo** | [https://genlayer-spinner-sigma.vercel.app](https://genlayer-spinner-sigma.vercel.app) |
| **X** | [https://x.com/HoaTranRom](https://x.com/HoaTranRom) |
| **Discord** | `tranduchoa2407` |
| **GitHub** | [https://github.com/hoasine/genlayer-spinner](https://github.com/hoasine/genlayer-spinner) |

## Contest Options

| Option | Name | Motion |
|--------|------|--------|
| **A** | Neon Edge Sweep | Both wings get a synchronized neon/glow edge streak; diamond soft-blinks |
| **B** | Validator Orbit | Three dots orbit the diamond; mark blooms when quorum aligns |

Each card supports:

- Live speed / accent controls
- Size gallery (`sm` · `md` · `lg` · `xl`)
- **Replay load** — full-page Portal loading overlay for that option

## Core Value Proposition

- **Brand-safe geometry:** official Portal paths only
- **No logo spin:** wings stay fixed
- **Two distinct stories:** edge consensus vs validator quorum
- **Production-shaped demo:** one page for reviewers to compare
- **Drop-in modules:** each option ships as CSS + JS

## Design Principles

1. Keep the mark intact — no rotation or fill distortion on the wings
2. Default accent stays Portal orange — `#FF6A33`
3. Glow / orbit strength scales with size so small marks stay crisp
4. Full-page load must feel like Portal, not a browser fullscreen trick
5. Reviewers can tune timing and color without leaving the page

## Project Structure

```text
index.html          # Contest demo (Option A + Option B)
neon/
  spinner.css       # Neon Edge Sweep styles
  spinner.js        # Neon Edge Sweep runtime
  mark.svg
orbit/
  spinner.css       # Validator Orbit styles
  spinner.js        # Validator Orbit runtime
  mark.svg
vercel.json
README.md
```

## Local Development

```bash
npx --yes serve .
```

Open the printed local URL. On first load, Option A plays as a full-page loading overlay; use **Replay load** on either card to replay.

### Drop-in · Option A (Neon Edge Sweep)

```html
<link rel="stylesheet" href="./neon/spinner.css" />
<span data-gl-spinner data-size="md" aria-label="Loading"></span>
<script type="module" src="./neon/spinner.js"></script>
```

### Drop-in · Option B (Validator Orbit)

```html
<link rel="stylesheet" href="./orbit/spinner.css" />
<span data-vo-spinner data-size="md" aria-label="Loading"></span>
<script type="module" src="./orbit/spinner.js"></script>
```

## Defaults

| Token | Value | Use |
|-------|-------|-----|
| Accent | `#FF6A33` | Neon / orbit / diamond peak |
| Void | `#1A1A1A` | Wings on light surfaces |
| Neon sweep | `4.2s` | Edge loop |
| Neon diamond | `1.55s` | Soft blink |
| Orbit period | `2.4s` | Dot revolution |
| Orbit pulse | `2.4s` | Quorum bloom |

## Links

- Live demo: [https://genlayer-spinner-sigma.vercel.app](https://genlayer-spinner-sigma.vercel.app)
- GitHub: [https://github.com/hoasine/genlayer-spinner](https://github.com/hoasine/genlayer-spinner)
- X: [https://x.com/HoaTranRom](https://x.com/HoaTranRom)
- Discord: `tranduchoa2407`
- Author: Hoa Tran Rom ([@hoasine](https://github.com/hoasine))

## Submission Copy

**Title:** GenLayer Spinner — Neon Edge & Validator Orbit

**Description:** Two Portal-native loaders built from the official mark. Option A sweeps both wing edges with soft neon glow while the diamond blinks. Option B sends three validator dots around the diamond until the mark blooms — loading as quorum, never as a spinning logo.

## Notes

- Wings are never rotated; motion is stroke dashoffset (A) or orbiting dots (B).
- Accent uses CSS variables so color changes apply live.
- Hard-refresh after local edits if assets are cached.
