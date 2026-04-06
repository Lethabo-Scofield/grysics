# Grysics — Verify Physical AI Before Deployment

## Overview

A single-page Next.js landing site for **Grysics** (by Olyxee), an AI verification engine. All content lives on the landing page (`/`), with a separate demo booking page (`/demo`).

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
    layout.tsx              - Root layout with SEO metadata, JSON-LD structured data, viewport config
    page.tsx                - Landing page (hero + how it works + LLM ecosystem + verification + coverage + benchmarks + why it matters + waitlist CTA)
    demo/
      page.tsx              - Server component with per-page metadata, imports content.tsx
      content.tsx           - Client component with demo booking UI
    sitemap.ts              - Dynamic sitemap.xml generation (2 pages)
    robots.ts               - Dynamic robots.txt generation
    globals.css             - Tailwind directives, grain texture, reduced-motion, safe-area, mobile input zoom fix
    api/
      waitlist/route.ts     - POST /api/waitlist — stores waitlist signups
      demo/route.ts         - POST /api/demo — stores demo requests
  components/
    header.tsx              - Scroll-aware header (transparent on home hero, solid when scrolled/other pages)
    footer.tsx              - Footer with nav links and company email
    shared.tsx              - Shared components: fade, ArchitectureDiagram, VerificationTerminal, CoverageGraph, LLMNetworkDiagram, BenchmarkChart, WaitlistForm, DemoForm
public/
  images/
    grysics-logo.png        - Product logo
    bg.png                  - Hero background image
    logos/                  - LLM brand logos (openai.png, anthropic.png, google.svg, meta.svg, mistral.png, microsoft.png, cohere.png, falcon.png)
  favicon.png               - Favicon
data/                       - Form submissions (gitignored)
next.config.js              - Next.js config (standalone output, unoptimized images)
tailwind.config.ts          - Tailwind config with serif font + orange primary color
```

## Pages

### `/` — Landing Page
- Hero with background image, headline, waitlist form
- How it works: architecture diagram + stats grid
- LLM Ecosystem: 8 LLM logos (GPT-4o, Claude 3.5, Gemini, Llama 3, Mistral, Phi-3, Cohere, Falcon) in flexbox layout around Grysics center
- Live verification: terminal animation + check list
- Coverage: animated bar chart (8 AI categories)
- Benchmarks: before/after comparison chart
- Why it matters: 3 stat cards
- CTA: waitlist form + Book a Demo link

### `/demo` — Book a Demo
- Two-column layout: value props + demo form
- Form: name, email, company, AI type dropdown
- "Prefer email?" fallback to scofield@olyxee.com

## SEO

- **Root layout**: Title template, description, keywords, OG/Twitter cards, JSON-LD SoftwareApplication schema
- **Per-page metadata**: Demo page exports its own Metadata with title, description, keywords, canonical URL, OG/Twitter
- **Sitemap**: Auto-generated at `/sitemap.xml` with 2 pages
- **Robots.txt**: Auto-generated at `/robots.txt`, allows all crawlers, disallows `/api/`

## Navigation

- **Header**: Logo, "Sign in" (mailto), "Book Demo" (link to /demo)
- **Footer**: Book a Demo, Contact (mailto), Olyxee (external)
- Header adapts: transparent on home hero, solid white when scrolled or on other pages

## Functional Buttons & Forms

- **Join (Waitlist)**: POSTs to `/api/waitlist`, stores in `data/waitlist.json`
- **Request Demo**: POSTs to `/api/demo`, stores in `data/demo-requests.json`
- **Sign in**: Opens mailto to scofield@olyxee.com
- **Contact**: mailto to scofield@olyxee.com

## Design System

- **Primary color**: Orange (`#F97316`)
- **Typography**: Georgia serif for headings, system sans for body
- **Dark sections**: `bg-neutral-950` with white text
- **Animations**: Reduced-motion aware via `MotionConfig` + `useReducedMotion`
- **Mobile**: Fully responsive with `100svh` hero, safe area insets, 44px+ touch targets, no zoom on input focus (16px base), overflow-x-auto on diagrams
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
