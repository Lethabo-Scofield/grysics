# Grysics — AI Execution System

## Overview

A single-page Next.js landing site for **Grysics** (by Olyxee), an AI execution system that turns business goals into completed real-world operations. Positioned for business leaders, managers, and decision-makers in finance, HR, compliance, and reporting. The system is coming soon — this landing page introduces the product and collects demo requests. Separate demo booking page at `/demo`.

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
    page.tsx                - Landing page (hero + problem + solution + how it works + live execution + use cases + benefits + differentiation + trust + CTA)
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
    fade.ts                 - Shared fade animation variant
    waitlist-form.tsx       - WaitlistForm component (legacy, may still be used)
    header.tsx              - Scroll-aware header (transparent on home hero, solid when scrolled/other pages)
    footer.tsx              - Footer with nav links and company email
    shared.tsx              - DemoForm component (used on demo page)
    hero-background.tsx     - Hero background with sunset image + dark overlays + animated glow elements
    diagrams/
      architecture-diagram.tsx - 4-step animated how-it-works flow (Define goal → Plan → Execute → Deliver)
      verification-terminal.tsx - Animated terminal showing live execution simulation
      benchmark-chart.tsx   - Manual vs Grysics performance comparison chart
      coverage-graph.tsx    - Operations coverage bar chart (legacy)
      llm-network-diagram.tsx - LLM network diagram (legacy, no longer on homepage)
public/
  images/
    grysics-logo.png        - Product logo
    bg.png                  - Hero background image (sunset)
    logos/                  - LLM brand logos (legacy)
  favicon.png               - Favicon
data/                       - Form submissions (gitignored)
next.config.js              - Next.js config (standalone output, unoptimized images)
tailwind.config.ts          - Tailwind config with serif font + orange primary color
```

## Pages

### `/` — Landing Page
- Hero with sunset background image, "Coming soon" badge, headline ("Turn business goals into completed work."), Request Demo + See How It Works CTAs
- Problem section: "Business operations are still manual and fragmented" with pain point cards
- Solution section: "Grysics executes business operations for you" — dark bg, outcome-focused messaging
- How it works: 4-step animated flow (Define goal → Plan → Execute → Deliver results)
- Live execution: terminal simulation showing step-by-step goal execution
- Use cases: Finance, Compliance, HR Operations, Enterprise Reporting cards
- Key benefits: 5 benefit items (no manual workflows, existing systems, reduced workload, accurate outputs, audit trail)
- Differentiation: "Beyond dashboards and automation tools" with benchmark chart
- Trust & control: 4 cards (traceability, recorded transformations, approval workflows, enterprise-grade)
- CTA: "Give it a goal. Get it done." with Request a Demo button

### `/demo` — Request a Demo
- Two-column layout: value props + demo form
- Form: name, email, company, operations type dropdown
- "Prefer email?" fallback to scofield@olyxee.com

## SEO

- **Root layout**: Title template, description, keywords, OG/Twitter cards, JSON-LD SoftwareApplication schema
- **Per-page metadata**: Demo page exports its own Metadata with title, description, keywords, canonical URL, OG/Twitter
- **Sitemap**: Auto-generated at `/sitemap.xml` with 2 pages
- **Robots.txt**: Auto-generated at `/robots.txt`, allows all crawlers, disallows `/api/`

## Navigation

- **Header**: Logo, "Request Demo" (link to /demo)
- **Footer**: Request a Demo, Contact (mailto), Olyxee (external)
- Header adapts: transparent on home hero, solid white when scrolled or on other pages

## Functional Buttons & Forms

- **Request Demo (hero)**: Links to `/demo` page
- **See How It Works**: Smooth scroll to `#how-it-works` section
- **Request Demo (demo page)**: POSTs to `/api/demo`, stores in `data/demo-requests.json`
- **Contact**: mailto to scofield@olyxee.com

## Design System

- **Primary color**: Orange (`#F97316`)
- **Typography**: Georgia serif for headings, system sans for body
- **Dark sections**: `bg-neutral-950` with white text
- **Animations**: Reduced-motion aware via `MotionConfig` + `useReducedMotion`
- **Mobile**: Fully responsive with `100svh` hero, safe area insets, 44px+ touch targets, no zoom on input focus (16px base)
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
