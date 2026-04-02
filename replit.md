# Grysics — AI Verification Engine Landing Page

## Overview

A standalone single-page Next.js landing page for **Grysics** (by Olyxee), an AI verification engine. Features full-screen hero with background image, animated terminal demo, performance benchmarks, and early access email signup. Fully mobile responsive with anchor-based navigation.

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
    grysics-logo.png    - Product logo (also used as favicon)
    bg.png              - Hero background image
  favicon.png           - Favicon
next.config.js          - Next.js config (unoptimized images, no standalone output)
tailwind.config.ts      - Tailwind CSS config
tsconfig.json           - TypeScript config
postcss.config.js       - PostCSS config
```

## Page Sections

Single-page with anchor navigation:
- Hero — Full-screen bg image with dark overlay, white text, email signup (dark variant)
- Terminal demo animation (auto-typing effect)
- `#features` — Model & device support grid (8 categories)
- SDK / code preview section
- `#performance` — Speed benchmarks with animated counters and comparison bars
- `#how-it-works` — 3-step process (Upload, Verify, Ship)
- What Grysics catches — 6 failure categories
- `#early-access` — CTA with email signup (light variant)

## Design Details

- **Header**: 72px tall, transparent with white text on hero, white/blurred with dark text on scroll. Pill-shaped nav group. Animated mobile menu with Framer Motion.
- **Hero**: `min-h-[100svh]`, bg image with `bg-black/60` overlay. White text. `EarlyAccessForm` with `variant="dark"`.
- **Bottom CTA**: White background, `EarlyAccessForm` with `variant="light"` (dark button, bordered input).
- **Mobile**: All headings start at `text-2xl`, sections use `py-16`, `px-5` padding. Feature grid stacks to 1-col on mobile, 2-col on sm. Terminal font scales down to `text-[10px]`.

## Development

```bash
npm run dev    # Start dev server on port 5000 (0.0.0.0)
npm run build  # Build for production
npm run start  # Start production server on port 5000
```

## Deployment

- **Vercel**: Ready for deployment. No `output: 'standalone'` — uses Vercel-native build. `images: { unoptimized: true }`.
- **Replit**: Configured for autoscale deployment with `npm run build` + `npm run start`.
- **SEO**: Full metadata in `layout.tsx` — keywords, OG tags, Twitter card, JSON-LD SoftwareApplication schema. Canonical URL: `https://grysics.com`.
