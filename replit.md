# Grysics — Verify Physical AI Before Deployment

## Overview

A single-page Next.js landing page for **Grysics** (by Olyxee), an AI verification engine. Covers all AI types with priority on Conversational AI, RAG systems, Autonomous Agents, and Generative AI. Features a full-screen hero with background image, serif typography, dark sections, orange primary accent, grain texture overlay, and a waitlist-focused CTA. Fully mobile responsive.

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

1. **Hero** — Full-screen bg image, "Verify your AI before it ships.", subtext about chatbots/agents/RAG/genAI, waitlist form
2. **What we cover** — Dark bg, 4 priority categories (Conversational AI, RAG, Agents, Generative AI) highlighted with orange, plus 8 more categories as pills
3. **Process** — White bg, 4-step flow: Build → Verify → Validate → Deploy
4. **Why it matters** — Dark bg, 3 failure types: Hallucinations, Silent regressions, Edge case failures
5. **Book a Demo** — White bg, two-column layout with value props + demo request form (name, email, company, AI type dropdown)
6. **Status + Waitlist** — White bg, "In development. Early access soon." with waitlist form
7. **Footer** — Docs, Contact, Olyxee links

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
