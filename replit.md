# Grysics — Verify Physical AI Before Deployment

## Overview

A single-page Next.js landing page for **Grysics** (by Olyxee), an AI verification engine. Covers all AI types with priority on Conversational AI, RAG systems, Autonomous Agents, and Generative AI. Features a full-screen hero with background image, serif typography, dark sections, orange primary accent, grain texture overlay, custom animated diagrams, and a waitlist-focused CTA. Fully mobile responsive.

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

1. **Hero** — Full-screen bg image, "Verify your AI before it ships.", waitlist form
2. **How it works** — Dark bg, animated architecture diagram (Your AI → Grysics → Test Suite → Report → Deploy) with stats grid
3. **Live verification** — White bg, two-column: check descriptions + animated terminal showing a live verification report
4. **Coverage** — Dark bg, animated horizontal bar chart showing coverage across 8 AI categories (4 priority highlighted)
5. **Why it matters** — White bg, 3 stat cards with large numbers (73% hallucinate, 4.2h detection, 68% edge case failures)
6. **Book a Demo** — White bg, two-column layout with value props + demo request form
7. **Status + Waitlist** — White bg, "In development. Early access soon." with waitlist form
8. **Footer** — Docs, Contact, Olyxee links

## Custom Diagram Components

- **ArchitectureDiagram**: SVG flow diagram with animated node connections (step-by-step reveal on scroll)
- **VerificationTerminal**: Fake terminal that types out a live verification report line by line
- **CoverageGraph**: Animated horizontal bar chart showing verification coverage per AI category

## Design System

- **Hero**: Background image with dark overlay, white serif text, grain texture
- **Dark sections**: `bg-neutral-950` with white text
- **Light sections**: White background
- **Primary color**: Orange (`#F97316`)
- **Typography**: Georgia serif for headings, system sans for body
- **Animations**: Subtle fade-up, animated diagrams, respects `prefers-reduced-motion`
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
