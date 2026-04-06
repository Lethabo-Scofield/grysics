# Grysics — Verify Physical AI Before Deployment

## Overview

A minimal, single-page Next.js landing page for **Grysics** (by Olyxee). Apple-inspired design with extreme simplicity — white background, orange primary accent, thin typography, generous whitespace. Single action: join the waitlist.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion (subtle fades only)
- **Package Manager**: npm
- **Node Version**: 20

## Project Structure

```
src/
  app/
    layout.tsx          - Root layout with SEO metadata
    page.tsx            - Main landing page (all sections)
    globals.css         - Tailwind directives, reduced-motion, safe-area
  components/
    header.tsx          - Fixed header (Grysics + Sign in)
    footer.tsx          - Footer (Docs, Contact, Olyxee)
public/
  images/
    grysics-logo.png    - Product logo
    bg.png              - (Legacy, no longer used)
  favicon.png           - Favicon
next.config.js          - Next.js config (standalone output)
tailwind.config.ts      - Tailwind config with orange primary color
```

## Page Sections

1. **Hero** — "Verify physical AI before deployment." + subtext + email waitlist + sign in
2. **Divider**
3. **Pipeline** — 4-step visual: Model → Simulation → Validation → Deployment
4. **Value** — 3 short points: Catch failures early, Test under constraints, Reduce real-world risk
5. **Status** — "In development. Early access soon."
6. **Footer** — Docs, Contact, Olyxee

## Design System

- **Background**: Pure white
- **Text**: Dark grey/near black (`neutral-900`)
- **Secondary text**: Mid grey (`neutral-500`)
- **Primary**: Orange (`#F97316`) with light/dark variants
- **Buttons**: Rounded (`rounded-xl`), soft
- **Input**: Thin border, orange focus glow
- **Animations**: Very subtle fade only, respects `prefers-reduced-motion`
- **Spacing**: Generous margins, high whitespace
- **Mobile**: Fully responsive, safe area insets for notched phones

## Development

```bash
npm run dev    # Start dev server on port 5000 (0.0.0.0)
npm run build  # Build for production
npm run start  # Start production server on port 5000
```

## Deployment

- **Replit**: Autoscale deployment. Build: `npm run build`. Run: `PORT=5000 HOSTNAME=0.0.0.0 node .next/standalone/server.js`.
- **next.config.js**: `output: 'standalone'`, `images: { unoptimized: true }`
