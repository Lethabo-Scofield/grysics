# Grysics — Verify Physical AI Before Deployment

## Overview

A single-page Next.js landing page for **Grysics** (by Olyxee), an AI verification engine for physical AI. Features a full-screen hero with background image, serif typography, dark sections, orange primary accent, grain texture overlay, and a waitlist-focused CTA. Fully mobile responsive.

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
    layout.tsx          - Root layout with SEO metadata
    page.tsx            - Main landing page (all sections)
    globals.css         - Tailwind directives, grain texture, reduced-motion, safe-area
  components/
    header.tsx          - Scroll-aware fixed header (transparent → white on scroll)
    footer.tsx          - Footer with logo and nav (Docs, Contact, Olyxee)
public/
  images/
    grysics-logo.png    - Product logo
    bg.png              - Hero background image
  favicon.png           - Favicon
next.config.js          - Next.js config (standalone output, unoptimized images)
tailwind.config.ts      - Tailwind config with serif font + orange primary color
```

## Page Sections

1. **Hero** — Full-screen bg image, serif heading "Verify physical AI before deployment.", subtext, email waitlist form, "Sign in" link
2. **Pipeline** — Dark bg, 4-step visual: Model → Simulation → Validation → Deployment
3. **Value** — White bg, 3 short points: Catch failures early, Test under constraints, Reduce real-world risk
4. **Status** — Dark bg, "In development. Early access soon." with orange pulse
5. **CTA** — White bg, "Be the first to verify." with waitlist form (light variant)
6. **Footer** — Docs, Contact, Olyxee links

## Design System

- **Hero**: Background image with dark overlay, white serif text, grain texture
- **Dark sections**: `bg-neutral-950` with white text (pipeline, status)
- **Light sections**: White background
- **Primary color**: Orange (`#F97316`)
- **Typography**: Georgia serif for headings, system sans for body
- **Animations**: Subtle fade-up, respects `prefers-reduced-motion`
- **Mobile**: Fully responsive, safe area insets, 44px+ touch targets

## Development

```bash
npm run dev    # Start dev server on port 5000 (0.0.0.0)
npm run build  # Build for production
npm run start  # Start production server on port 5000
```

## Deployment

- **Replit**: Autoscale deployment. Build: `npm run build`. Run: `PORT=5000 HOSTNAME=0.0.0.0 node .next/standalone/server.js`.
- **next.config.js**: `output: 'standalone'`, `images: { unoptimized: true }`
