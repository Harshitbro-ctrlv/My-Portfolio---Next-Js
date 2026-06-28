# Harshit Mishra — Portfolio

A premium, SaaS-inspired personal portfolio built with the latest Next.js stack. Features smooth scroll, a 3D hero element, live LeetCode stats, dark/light mode, a command palette, and a fully working contact form.

**Live →** [harshit-mishra-delta.vercel.app](https://harshit-mishra-delta.vercel.app)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 + DaisyUI 4 |
| Animation | Framer Motion 12 |
| 3D | React Three Fiber + Three.js |
| Smooth Scroll | Lenis |
| Icons | Heroicons + Lucide React |
| Email | Nodemailer (SMTP) |
| Validation | Zod |
| Linting / Format | ESLint + Prettier |

---

## Features

- **Dark / Light mode** — persists via `localStorage`, respects system preference on first load
- **3D animated hero** — torus knot rendered with React Three Fiber, dynamically imported (no SSR cost)
- **Command palette** — `Ctrl K` / `⌘ K` to jump to any section instantly
- **Live LeetCode stats** — fetches from the LeetCode API, auto-refreshes every 10 minutes with a static fallback
- **Working contact form** — validated with Zod, sends real email via SMTP (Nodemailer), honeypot spam protection
- **Scroll progress bar** — thin primary-colored bar at the top of the viewport
- **Fully responsive** — tested from 320 px to 1440 px; mobile-first Tailwind breakpoints throughout
- **SEO ready** — `robots.ts`, `sitemap.ts`, and full OpenGraph metadata in `layout.tsx`
- **Section-aware navbar** — active link highlights as you scroll using an Intersection Observer hook

---

## Project Structure

```
.
├── app/
│   ├── api/
│   │   ├── contact/        # POST handler — validates + sends email
│   │   └── leetcode/       # GET handler — proxies LeetCode GraphQL API
│   ├── globals.css         # Tailwind base + custom utility classes
│   ├── layout.tsx          # Root layout, fonts, SEO metadata
│   └── page.tsx            # Home page — assembles all sections
│
├── components/
│   ├── sections/
│   │   ├── hero.tsx        # Name, role, CTA buttons, stat cards, 3D orbit
│   │   ├── about.tsx       # Bio, location badge, achievement cards
│   │   ├── skills.tsx      # Skill groups + scrolling tech marquee
│   │   ├── timelines.tsx   # Experience & Education alternating timeline
│   │   ├── projects.tsx    # Project cards with image, tags, links
│   │   ├── certifications.tsx
│   │   ├── leetcode.tsx    # Live stats, progress bars, recent submissions
│   │   ├── contact.tsx     # Contact info + validated email form
│   │   └── testimonials.tsx
│   ├── ui/
│   │   ├── badge.tsx
│   │   ├── motion.tsx      # SectionHeading + Reveal wrapper components
│   │   └── timeline.tsx    # Reusable alternating timeline
│   ├── hero-orbit.tsx      # React Three Fiber canvas (dynamic import)
│   ├── navbar.tsx          # Sticky nav with mobile hamburger + theme toggle
│   ├── footer.tsx
│   └── site-shell.tsx      # Lenis, scroll progress, cursor dot, command palette
│
├── features/
│   └── command-palette/    # Ctrl K section-jump overlay
│
├── hooks/
│   └── use-active-section.ts   # Intersection Observer for nav highlighting
│
├── lib/
│   ├── profile.ts          # ← All your personal content lives here
│   ├── contact.ts          # Email sending logic
│   └── utils.ts            # cn() helper (clsx + tailwind-merge)
│
├── public/
│   ├── profile.jpeg        # Your photo
│   └── resume.pdf          # Your resume (linked from hero)
│
└── types/
    └── profile.ts          # TypeScript types for profile data
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm (or yarn / pnpm)

### Installation

```bash
git clone https://github.com/Harshitbro-ctrlv/My-Portfolio---Next-Js.git
cd My-Portfolio---Next-Js
npm install
```

### Environment Variables

Copy the example file and fill in your SMTP credentials:

```bash
cp .env.example .env.local
```

```env
SITE_URL=http://localhost:3000

# Where contact form emails are delivered
CONTACT_TO_EMAIL=you@example.com

# The "From" address shown in the email
CONTACT_FROM_EMAIL=portfolio@example.com

# SMTP server (Gmail example below)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-app-password   # Use an App Password, not your real Gmail password
```

> Without these values the contact form still validates correctly but returns a setup notice instead of actually sending email.

**Gmail tip:** Go to Google Account → Security → 2-Step Verification → App Passwords. Generate one for "Mail" and use it as `SMTP_PASS`.

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Customising Your Content

**Everything personal is in one file: `lib/profile.ts`.**

| Export | What it controls |
|---|---|
| `profile` | Name, role, bio, location, email, social links, college, resume path |
| `stats` | The three stat cards in the hero section |
| `navItems` | Navigation links in the navbar |
| `socialLinks` | Footer social icons |
| `skills` | Skill groups (Frontend, Backend, Database, etc.) |
| `experience` | Timeline entries under Experience |
| `education` | Timeline entries under Education |
| `projects` | Project cards — title, description, image, tech tags, links |
| `certifications` | Cert cards with issuer and date |
| `achievements` | Three bullet points in the About section |
| `leetcodeStats` | Fallback stats shown if the API is unreachable |

### Swap your photo

Replace `public/profile.jpeg` with your own image (keep the filename, or update `profile.avatar` in `lib/profile.ts`).

### Swap your resume

Replace `public/resume.pdf` with your own file.

---

## Deployment (Vercel)

1. Push this repo to GitHub.
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import the repo.
3. In **Environment Variables**, add all six variables from `.env.local`.
4. Set `SITE_URL` to your production domain (e.g. `https://harshitmishra.dev`).
5. Click **Deploy**.

Vercel auto-deploys on every push to `main`.

---

## Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Production build
npm run start      # Serve production build locally
npm run typecheck  # Type-check without emitting files
npm run lint       # ESLint
npm run format     # Prettier (formats all files in-place)
```

---

## Responsive Breakpoints

The layout uses Tailwind's default breakpoints:

| Breakpoint | Width | Key layout change |
|---|---|---|
| `default` | < 640 px | Single column, reduced padding |
| `sm` | ≥ 640 px | Full-size headings, wider section padding |
| `md` | ≥ 768 px | 2-column grids (skills, certs, contact form) |
| `lg` | ≥ 1024 px | Full 2-column hero, 3-column project grid |

---

## License

Personal portfolio — feel free to use as inspiration, but please swap out all personal content (name, photo, resume, project descriptions) before deploying your own version.
