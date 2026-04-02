# Grysics — AI Verification Engine Landing Page

## Overview

A standalone single-page Next.js landing page for **Grysics** (by Olyxee), an AI verification engine targeting AI app owners and builders. Features problem-driven messaging, full-screen hero, animated terminal demo, use case cards, performance benchmarks, comparison section, and early access email signup. Fully mobile responsive with anchor-based navigation.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Package Manager**: npm
- **Node Version**: 20

## Project Structure

```
src/
  app/
    layout.tsx          - Root layout with full SEO metadata (OG, Twitter, JSON-LD)
    page.tsx            - Main landing page (all sections, single-page)
    globals.css         - Tailwind directives, smooth scroll, antialiasing
  components/
    header.tsx          - Scroll-aware fixed header (transparent → white on scroll)
    footer.tsx          - Footer with logo and anchor navigation
public/
  images/
    grysics-logo.png    - Product logo (transparent bg, also used as favicon)
    bg.png              - Hero background image
  favicon.png           - Favicon
next.config.js          - Next.js config (standalone output, unoptimized images)
tailwind.config.ts      - Tailwind CSS config
tsconfig.json           - TypeScript config
postcss.config.js       - PostCSS config
```

## Page Sections (in order)

1. **Hero** — "Your AI works in the lab. Will it work in production?" Full-screen bg image, early access badge, email signup (dark variant)
2. **Problem section** — Dark bg, 3 stats cards showing the cost of unverified AI (73% accuracy drop, 4.2h detection time, $1.7M cost)
3. **Terminal demo** — "One command. Complete confidence." with animated terminal verification output
4. **Built for AI teams** — 6 use case cards targeting specific audiences (startups, growth teams, edge/IoT, enterprise, ML engineers, SaaS builders)
5. **`#features`** — "Every model type. Every device." 8-category grid (CV, NLP, GenAI, Audio, Video, Recommendation, Medical, Autonomous)
6. **SDK / Code preview** — "Three lines. Full verification." with Python code preview and CI/CD integration tags
7. **`#how-it-works`** — 3-step process (Connect, Verify, Ship)
8. **`#performance`** — Speed benchmarks with animated counters and comparison bars
9. **Six failures** — 6 failure types Grysics catches (accuracy, latency, memory, NaN, conversion, bottlenecks)
10. **Without vs With Grysics** — Dark bg, side-by-side comparison (red/green)
11. **`#early-access`** — "Your users deserve AI that actually works" CTA with email signup (light variant)

## Design Details

- **Header**: 72px tall, transparent with white text on hero, white/blurred with dark text on scroll. Pill-shaped nav group. Animated mobile menu.
- **Hero**: `min-h-[100svh]`, bg image with `bg-black/60` overlay. White text. Status badge with green pulse dot.
- **Dark sections**: `bg-neutral-950` with white text (problem stats, comparison)
- **Light sections**: White or `bg-neutral-50/50` backgrounds
- **EarlyAccessForm**: `variant="dark"` (hero) and `variant="light"` (bottom CTA)
- **Mobile**: All headings start at `text-2xl`, sections use `py-16`, `px-5` padding. Grids stack on mobile.

## Development

```bash
npm run dev    # Start dev server on port 5000 (0.0.0.0)
npm run build  # Build for production (includes standalone copy)
npm run start  # Start production server on port 5000
```

## Deployment

- **Replit**: Autoscale deployment. Build: `npm run build`. Run: `PORT=5000 HOSTNAME=0.0.0.0 node .next/standalone/server.js`. Build script copies public/ and .next/static/ into standalone output.
- **next.config.js**: `output: 'standalone'`, `images: { unoptimized: true }`
- **SEO**: Full metadata in `layout.tsx` — metadataBase, keywords, OG tags, Twitter card, JSON-LD SoftwareApplication schema. Canonical URL: `https://grysics.com`.
