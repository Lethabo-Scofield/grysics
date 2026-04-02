# Grysics / Olyxee Landing Page

## Overview

A Next.js landing page for **Grysics**, an AI verification engine by Olyxee. The page showcases the product with animated sections, a terminal demo, code preview, and an early access email form.

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
    layout.tsx          - Root layout with global CSS import
    page.tsx            - Home page (links to Grysics product)
    globals.css         - Tailwind directives + grain effect
    products/
      grysics/
        layout.tsx      - Grysics product metadata layout
        page.tsx        - Full Grysics landing page
  components/
    header.tsx          - Shared site header with nav
    footer.tsx          - Shared site footer
public/
  images/
    grysics-logo.png    - Grysics product logo (placeholder)
```

## Configuration

- Dev server runs on port 5000 at `0.0.0.0` (required for Replit preview)
- `next.config.js` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration

## Development

```bash
npm run dev    # Start dev server on port 5000
npm run build  # Build for production
npm run start  # Start production server
```

## Deployment

Configured for autoscale deployment:
- Build: `npm run build`
- Run: `npm run start`
