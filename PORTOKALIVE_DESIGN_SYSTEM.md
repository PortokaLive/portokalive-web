# PortokaLive Design System

> Light-first creator platform · Eternal Flame rebirth · 2026

---

## Principles

1. **Content is hero** — thumbnails, live badges, creator identity first.
2. **Light by default** — professional SaaS, not Bootstrap admin template.
3. **Creator-centric** — profiles, categories, discovery patterns from Twitch/Spotify.
4. **Honest states** — demo content labeled; never fake-live without badge.

---

## Color

| Token | Value | Usage |
|-------|-------|--------|
| `--bg` | `#f8fafc` | Page background |
| `--bg-card` | `#ffffff` | Cards, header |
| `--text` | `#0f172a` | Primary text |
| `--muted` | `#64748b` | Secondary |
| `--accent` | `#ea580c` | Portoka orange — CTAs, brand |
| `--accent-soft` | `#ffedd5` | Badges, chips |
| `--live` | `#dc2626` | LIVE pill |
| `--border` | `#e2e8f0` | Dividers |

**Avoid:** default Bootstrap blues, dark gradients, `#0a0a0a` rebirth-era landing.

---

## Typography

- **Family:** Inter, system-ui
- **Hero:** clamp(2rem, 5vw, 3rem) / 800
- **Card title:** 1.05rem / 600
- **Meta:** 0.8rem / muted

---

## Components

| Component | Rules |
|-----------|--------|
| **Buttons** | 10px radius, 600 weight; primary orange on white |
| **Creator cards** | 14px radius, thumb + body, hover lift |
| **Live pill** | Red, 0.7rem, top-left on thumb |
| **Filter chips** | Pill shape; active = accent-soft fill |
| **Stats row** | 4-up grid, centered numbers |

---

## Bootstrap CRA app (legacy `src/`)

When migrating React app:

- Override `$primary` to `#ea580c`
- Custom card shadows — remove default `.card` border
- Replace `container-fluid` admin layouts with max-width content columns
- Use discovery grid pattern from `site/discover.html`

---

## File map

| File | Role |
|------|------|
| `site/styles.css` | Landing + discover tokens |
| `site/discover.html` | Discovery reference layout |
| `site/demo-data.js` | Demo catalog |
