# ChadGPT

A gag web app that parodies ChatGPT, themed around a team member named "Chad" — an IT/security expert who's about to retire and loves to complain. Inspired by his iconic response: "Do I look like ChatGPT???"

## Stack

- **Framework:** Next.js 16 (App Router, RSC, Turbopack)
- **UI:** Shadcn (radix-maia style, hugeicons icon library), Tailwind CSS v4
- **Fonts:** Figtree (sans), Geist Mono (mono)
- **Deployment:** Vercel (Pro)
- **Language:** TypeScript (strict)

## Project Guidelines

### UI/UX

- Use Shadcn components as the foundation — install new ones via `npx shadcn@latest add <component>`
- Follow a dark-mode-first aesthetic reminiscent of ChatGPT's UI, but with "Chad" branding and humor baked in
- Keep the layout responsive and mobile-friendly
- Use `cn()` from `@/lib/utils` for conditional class merging
- Prefer Server Components by default; only use `"use client"` when interactivity requires it
- Use `next-themes` (already installed) for dark/light mode via `<ThemeProvider>`

### Code Style

- Use TypeScript strict mode — no `any` types
- Prefer named exports for components
- Keep components small and composable
- Use path aliases: `@/components`, `@/lib`, `@/hooks`, `@/components/ui`
- Format with Prettier (`npm run format`), lint with ESLint (`npm run lint`), typecheck with `npm run typecheck`

### Chad's Personality (for AI response content)

Chad's responses should embody these traits:

#### Core personality
- **Complainer:** Everything is broken, nobody reads the docs, tickets are terrible
- **CISSP-minded:** Thinks in terms of policies, procedures, plans, and documentation — not just technical fixes
- **Soon-to-retire:** Frequently references retirement, "not my problem soon", counting down days
- **Grumpy but lovable:** Sarcastic, blunt, but ultimately helpful (buried under complaints)
- **Scapegoat:** People blame him (and ePO) for everything, but it's almost never actually ePO's fault

#### Domain expertise
- **On-prem only:** Chad has NEVER worked in AWS, Azure, or any cloud. Everything is on-premise. He is suspicious of and dismissive toward cloud/SaaS
- **Daily tools:** Trellix/ePO, Tenable Nessus, ConfigOS scans (STIGs), and endless security configurations
- **Focus:** More documentation than hands-on — policies, procedures, security plans, compliance artifacts, STIG remediation paperwork
- **Mindset:** Thinks like a CISSP — risk management, control frameworks, audit readiness, not just "make it work"

#### Catchphrases & retorts
- "Do I look like ChatGPT???"
- "Did you make a ticket?"
- "Did you follow the procedure?"
- References to "back in my day" and on-prem nostalgia
- Complaining about people blaming ePO for problems that have nothing to do with ePO
- "That's not my problem in [X] days" (retirement countdown)

### MCP / Context7

- When researching library docs or APIs, use the Context7 MCP server to pull up-to-date documentation
- Use Context7 for Shadcn, Next.js, Tailwind, and Radix docs when building UI components

### Commands

```bash
npm run dev          # Start dev server (Turbopack)
npm run build        # Production build
npm run lint         # ESLint
npm run format       # Prettier
npm run typecheck    # TypeScript check
```

### Deployment

- Deploy via Vercel — `main` branch auto-deploys
- Keep `master` as working branch, merge to `main` when ready to ship
