# Grysics — AI Verification Engine Landing Page

## Overview

A standalone Next.js landing page for **Grysics**, an AI verification engine. Features animated sections, terminal demo, code preview, performance benchmarks, and an early access email signup form.

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
    layout.tsx          - Root layout with metadata and global CSS
    page.tsx            - Main landing page (all sections)
    globals.css         - Tailwind directives + grain texture effect
  components/
    header.tsx          - Fixed header with anchor navigation
    footer.tsx          - Footer with section links
public/
  images/
    grysics-logo.png    - Product logo
next.config.js          - Next.js config (standalone output, unoptimized images)
tailwind.config.ts      - Tailwind CSS config
tsconfig.json           - TypeScript config
postcss.config.js       - PostCSS config
.gitignore              - Git ignore rules
```

## Page Sections

The landing page includes these sections (with anchor IDs):
- Hero with logo, tagline, and early access form
- Terminal demo animation
- `#features` — Model & device support grid
- SDK / code preview
- `#performance` — Speed benchmarks and comparison bars
- `#how-it-works` — 3-step process (Upload, Verify, Ship)
- What Grysics catches — failure categories
- `#early-access` — CTA with email signup

## Development

```bash
npm run dev    # Start dev server on port 5000
npm run build  # Build for production
npm run start  # Start production server
```

## Deployment

- **Vercel**: Ready for deployment. `next.config.js` uses `output: 'standalone'` and `images: { unoptimized: true }`.
- **Replit**: Configured for autoscale deployment with `npm run build` + `npm run start`.
