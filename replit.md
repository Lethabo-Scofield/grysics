# Grysics — Verify Physical AI Before Deployment

## Overview

A single-page Next.js landing page for **Grysics** (by Olyxee), an AI verification engine. Covers all AI types with priority on Conversational AI, RAG systems, Autonomous Agents, and Generative AI. Features a full-screen hero with background image, serif typography, dark sections, orange primary accent, grain texture overlay, custom animated diagrams, functional forms, and a waitlist-focused CTA. Fully mobile responsive.

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
    page.tsx            - Main landing page (all sections + diagram components)
    globals.css         - Tailwind directives, grain texture, reduced-motion, safe-area
    api/
      waitlist/route.ts - POST /api/waitlist — stores waitlist signups to data/waitlist.json
      demo/route.ts     - POST /api/demo — stores demo requests to data/demo-requests.json
  components/
    header.tsx          - Scroll-aware fixed header (transparent → white on scroll)
    footer.tsx          - Footer with logo, nav links, and company email
public/
  images/
    grysics-logo.png    - Product logo
    bg.png              - Hero background image
  favicon.png           - Favicon
data/                   - Form submissions (gitignored)
  waitlist.json         - Waitlist email entries
  demo-requests.json    - Demo booking requests
next.config.js          - Next.js config (standalone output, unoptimized images)
tailwind.config.ts      - Tailwind config with serif font + orange primary color
```

## Functional Buttons & Forms

- **Join (Waitlist)**: POSTs email to `/api/waitlist`, stores in `data/waitlist.json`, shows success + optional "What are you building?" follow-up
- **Book Demo**: Header button scrolls to #book-demo section. Form POSTs name/email/company/useCase to `/api/demo`, stores in `data/demo-requests.json`
- **Sign in**: Opens mailto to scofield@olyxee.com (no auth system yet)
- **Footer Contact**: Links to scofield@olyxee.com
- **Footer Olyxee**: Links to https://olyxee.com (external)

## Page Sections

1. **Hero** — Full-screen bg image, "Verify your AI before it ships.", waitlist form
2. **How it works** — Dark bg, animated architecture diagram with stats grid
3. **Live verification** — White bg, two-column: check descriptions + animated terminal
4. **Coverage** — Dark bg, animated horizontal bar chart showing 8 AI categories
5. **Why it matters** — White bg, 3 stat cards with large numbers
6. **Book a Demo** — White bg, two-column layout with value props + demo request form
7. **Status + Waitlist** — White bg, "In development. Early access soon." with waitlist form
8. **Footer** — Docs, Contact (mailto), Olyxee (external), company email

## Custom Diagram Components

- **ArchitectureDiagram**: SVG flow diagram with animated node connections
- **VerificationTerminal**: Fake terminal that types out a live verification report
- **CoverageGraph**: Animated horizontal bar chart showing verification coverage

## Design System

- **Hero**: Background image with dark overlay, white serif text, grain texture
- **Dark sections**: `bg-neutral-950` with white text
- **Light sections**: White background
- **Primary color**: Orange (`#F97316`)
- **Typography**: Georgia serif for headings, system sans for body
- **Animations**: Subtle fade-up, animated diagrams, respects `prefers-reduced-motion`
- **Mobile**: Fully responsive, safe area insets, 44px+ touch targets
- **Company email**: scofield@olyxee.com

## Development

```bash
npm run dev    # Start dev server on port 5000 (0.0.0.0)
npm run build  # Build for production
npm run start  # Start production server on port 5000
```

## Deployment

- **Replit**: Autoscale deployment. Build: `npm run build`. Run: `PORT=5000 HOSTNAME=0.0.0.0 node .next/standalone/server.js`.
- **next.config.js**: `output: 'standalone'`, `images: { unoptimized: true }`
