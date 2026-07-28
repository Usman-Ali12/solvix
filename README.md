# Solvix — Marketing Website

Production-ready Next.js 14 (App Router) site for Solvix, built with
TypeScript, Tailwind CSS, and Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Project structure

```
app/
  layout.tsx        Root layout — fonts, SEO metadata, structured data, theme provider
  globals.css        Design tokens (light/dark CSS variables) & base styles
  page.tsx           Home
  services/page.tsx  Services
  portfolio/page.tsx Portfolio
  about/page.tsx     About
  contact/page.tsx   Contact
  previews/page.tsx        Live preview gallery (6 niche templates)
  previews/[slug]/page.tsx Full clickable preview site per niche
  dashboard/page.tsx Client portal (demo data)
  admin/page.tsx     Internal admin + dispatch board (demo data)
  sitemap.ts          Auto-generated sitemap.xml
  robots.ts           Auto-generated robots.txt

lib/
  templates.ts        Content for each of the 6 preview sites — edit here
                       to add a new niche or change copy/stats/testimonials

components/
  Navbar.tsx, Footer.tsx, Button.tsx, SignalTrace.tsx, HeroMedia.tsx
  ServiceCard.tsx, PortfolioCard.tsx, TestimonialCard.tsx
  FAQ.tsx, CTASection.tsx, ContactForm.tsx, ChatWidget.tsx
  ThemeProvider.tsx, ThemeToggle.tsx
  dashboard/DashboardShell.tsx, StatCard.tsx, Badge.tsx, KanbanBoard.tsx, TrendChart.tsx
```

## Dashboards (/dashboard and /admin)

Both are fully built UIs running on **demo/mock data** — there's no auth, no
database, and no real backend wired up yet. Treat them as a working
prototype of the final product, not a finished internal tool.

- **`/dashboard`** — what a Solvix client would see: their leads, upcoming
  appointments, automation status, and billing. Sidebar tabs are local state
  (no routing), so it feels instant but isn't deep-linkable yet.
- **`/admin`** — what you and your sales lead would use day to day: MRR,
  a sales pipeline board, and the dispatch board for the CSR/dispatch
  service (jobs move New → Assigned → En Route → In Progress → Completed).

**Before either is real:**
1. Add authentication (NextAuth, Clerk, or Supabase Auth are common choices)
   so `/dashboard` and `/admin` aren't publicly reachable.
2. Replace the hardcoded arrays at the top of each page with real data —
   likely a database (Postgres/Supabase) plus API routes.
3. Wire the Kanban boards to real drag-and-drop (e.g. `@dnd-kit/core`) once
   jobs/deals need to move between columns interactively.
4. Connect the dispatch board to whatever is actually taking the calls (the
   AI CSR service) so "New" jobs appear automatically.


## Design system

Defined in `tailwind.config.js` and `app/globals.css`:

- **Colors** — `void` (charcoal bg), `paper` (white/off-white), `signal`
  (primary blue), `circuit` (cyan accent), `slate` (muted text/lines).
- **Type** — Space Grotesk (display), Inter (body), JetBrains Mono
  (labels/data), loaded via `next/font/google` in `app/layout.tsx`.
- **Signature motif** — `SignalTrace.tsx`, an animated circuit-line SVG used
  in the hero and section dividers to represent automation flow.

## Live preview sites (/previews)

Six real, clickable one-page sites — one per niche (field service, dental,
fitness, real estate, legal, restaurant) — built from a single content file
(`lib/templates.ts`). Meant for exactly one job: on a sales call, send the
prospect a link, let them click through a site close to their business, then
close with "we customize this for you in days."

To add a 7th niche: add one object to the `templates` array in
`lib/templates.ts`. The gallery card and the full preview page both render
from that array automatically — no new files needed.

## Logo & loading screen

- **`components/Logo.tsx`** — the infinity-to-arrow mark, rebuilt as an SVG
  component (not the raster PNG) so it stays crisp at any size and can drive
  the fill animation. It's a close hand-vectorized approximation of the
  provided logo, not a pixel-perfect trace — if you have the original vector
  file (AI/EPS/SVG) from whoever designed it, swap the paths in `Logo.tsx`
  for an exact match.
- **`app/icon.svg`** — the favicon, auto-detected by Next.js.
- **`components/LoadingScreen.tsx`** — shown once per full page load (not on
  in-app navigation). The mark "fills" bottom-to-top over ~1.5s using a CSS
  `clip-path` animation, then fades out. Respects
  `prefers-reduced-motion` by shortening to a near-instant fade instead.

## UX / polish pass

- **`app/pricing/page.tsx`** — Starter / Growth / Pro plan cards, a
  highlighted Dispatch Pro card for field-service clients, a feature
  comparison table, and pricing FAQs. Linked from nav, footer, and the
  command palette. Prices are placeholders — edit the `plans` and
  `dispatchPlan` arrays directly in that file.
- **`components/ScrollReveal.tsx`** — fade-up-on-scroll wrapper, applied
  across Home, Services, Portfolio, About, and Pricing. Respects
  `prefers-reduced-motion`.
- **`components/Counter.tsx`** — animates the homepage stat numbers
  (4,182 visitors, 3.2x, etc.) counting up when scrolled into view, then
  re-applies the original formatting (%, x, commas, <, +).
- **`components/CommandPalette.tsx`** — press `⌘K` / `Ctrl+K` anywhere to
  jump to any page or preview site instantly. There's also a visible ⌘K
  button in the desktop nav. Add new pages to the `staticEntries` array to
  make them searchable.
- **`app/not-found.tsx`** — branded 404 page instead of the Next.js default,
  with a way back home and a nudge toward the command palette.
- **`components/BackToTop.tsx`** + **`components/ScrollProgress.tsx`** — a
  thin gradient progress bar under the navbar, and a back-to-top button that
  appears after scrolling past one viewport height.
- **`components/TestimonialCarousel.tsx`** — replaces the static 3-card
  testimonial grid on the homepage with a swipeable, auto-advancing
  carousel (6s interval, pauses interaction resets the timer).
- **`components/StickyMobileCTA.tsx`** — a persistent "Book a free
  consultation" bar pinned to the bottom of the screen on mobile only,
  appearing after the hero is scrolled past.
- **`components/Toast.tsx`** — a toast notification system (`useToast()`
  hook) wired into the contact form's submit confirmation. Use
  `const { showToast } = useToast()` then `showToast("message", "success" | "error" | "info")`
  anywhere else you want a non-blocking confirmation.

## Before going live

1. **Content**: replace placeholder testimonials, portfolio project images,
   and copy in `about/page.tsx` with real client info.
2. **Chatbot**: `ChatWidget.tsx` currently returns canned replies from
   `getReply()`. Wire this to a real AI backend (e.g. an API route calling
   the Anthropic or OpenAI API) to make it live.
3. **Contact form**: `ContactForm.tsx` simulates submission. Connect it to
   an email service (Resend, SendGrid) or a backend API route.
4. **Images**: swap the gradient placeholders in `PortfolioCard` for real
   project screenshots (use `next/image` for optimization).
5. **Maps**: replace the placeholder block in `contact/page.tsx` with a real
   Google Maps embed or `<iframe>`.
6. **Metadata**: update `siteUrl`, social links, and the WhatsApp number
   (`wa.me/...`) across `app/layout.tsx`, `Footer.tsx`, and `contact/page.tsx`.
7. **Deploy**: this project deploys cleanly to Vercel — `vercel deploy` or
   connect the repo in the Vercel dashboard.

## Notes

- Respects `prefers-reduced-motion`.
- Visible keyboard focus states throughout.
- Fully responsive from 360px up.
- `npm run build` has been verified to compile and prerender all routes
  successfully.
