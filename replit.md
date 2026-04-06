# Grysics — Verify Physical AI Before Deployment

## Overview

A multi-page Next.js site for **Grysics** (by Olyxee), an AI verification engine. The landing page is streamlined to essentials (hero + stats + waitlist). Detailed content lives on dedicated pages: `/how-it-works` and `/demo`.

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
    page.tsx                - Landing page (hero + stats + waitlist CTA)
    how-it-works/
      page.tsx              - Server component with per-page metadata, imports content.tsx
      content.tsx           - Client component with all how-it-works UI
    demo/
      page.tsx              - Server component with per-page metadata, imports content.tsx
      content.tsx           - Client component with demo booking UI
    sitemap.ts              - Dynamic sitemap.xml generation (3 pages)
    robots.ts               - Dynamic robots.txt generation
    globals.css             - Tailwind directives, grain texture, reduced-motion, safe-area, mobile input zoom fix
    api/
      waitlist/route.ts     - POST /api/waitlist — stores waitlist signups
      demo/route.ts         - POST /api/demo — stores demo requests
  components/
    header.tsx              - Scroll-aware header, page-aware (transparent on dark pages, solid on light)
    footer.tsx              - Footer with nav links and company email
    shared.tsx              - Shared components: fade, ArchitectureDiagram, VerificationTerminal, CoverageGraph, LLMNetworkDiagram, BenchmarkChart, WaitlistForm, DemoForm
public/
  images/
    grysics-logo.png        - Product logo
    bg.png                  - Hero background image
  favicon.png               - Favicon
data/                       - Form submissions (gitignored)
next.config.js              - Next.js config (standalone output, unoptimized images)
tailwind.config.ts          - Tailwind config with serif font + orange primary color
```

## Pages

### `/` — Landing Page
- Hero with background image, headline, waitlist form
- Stats overview (< 3min, 12+ checks, 99.9% success, 0 missed)
- "See how it works" link to /how-it-works
- Status + second waitlist CTA
- "Book a Demo" link to /demo

### `/how-it-works` — How It Works
- Architecture diagram (animated SVG flow)
- Stats grid
- LLM Network diagram (8 LLMs in two rows around Grysics: GPT-4o, Claude 3.5, Gemini, Llama 3 / Mistral, Phi-3, Cohere, Falcon — color-coded by frontier/open/enterprise, flexbox layout with real brand logos)
- Live verification terminal (animated typing)
- Coverage graph (animated bar chart, 8 AI categories)
- Benchmarking chart (before/after comparison: hallucination rate, accuracy, edge cases, regression catch, response time, deploy confidence)
- Why it matters (3 stat cards)
- Waitlist CTA + Book Demo link

### `/demo` — Book a Demo
- Two-column layout: value props + demo form
- Form: name, email, company, AI type dropdown
- "Prefer email?" fallback to scofield@olyxee.com

## SEO

- **Root layout**: Title template, description, keywords, OG/Twitter cards, JSON-LD SoftwareApplication schema
- **Per-page metadata**: Each sub-page (how-it-works, demo) exports its own Metadata with title, description, keywords, canonical URL, OG/Twitter
- **Sitemap**: Auto-generated at `/sitemap.xml` with all 3 pages, priorities, and change frequencies
- **Robots.txt**: Auto-generated at `/robots.txt`, allows all crawlers, disallows `/api/`
- **Page structure**: Sub-pages use server component wrappers (page.tsx) that export metadata, importing client content components (content.tsx)

## Navigation

- **Header**: Logo, "How it works" (link), "Sign in" (mailto), "Book Demo" (link to /demo)
- **Footer**: How it works, Book a Demo, Contact (mailto), Olyxee (external)
- Header adapts: transparent on dark-hero pages (/, /how-it-works), solid white on light pages (/demo)

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
