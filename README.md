# Harshit Mishra — Portfolio

A modern, responsive developer portfolio built with Next.js, TypeScript, and Tailwind CSS. It showcases my skills, experience, projects, certifications, and live LeetCode statistics.

🌐 **Live Demo:** [harshit-mishra-delta.vercel.app](https://harshit-mishra-delta.vercel.app)

## Features

- Responsive, mobile-friendly design
- Dark and light themes
- Smooth scrolling and animations
- Interactive command palette using `Ctrl/⌘ + K`
- Live LeetCode statistics
- Projects, skills, education, and experience sections
- Validated contact form with email delivery
- SEO metadata, sitemap, and robots configuration
- Accessibility and reduced-motion support

## Tech Stack

- **Framework:** Next.js 15
- **Language:** TypeScript
- **Frontend:** React 19
- **Styling:** Tailwind CSS and DaisyUI
- **Animations:** Framer Motion and Lenis
- **Validation:** Zod
- **Email:** Nodemailer
- **Icons:** Heroicons and Lucide React
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm

### Installation

```bash
git clone https://github.com/Harshitbro-ctrlv/My-Portfolio---Next-Js.git
cd My-Portfolio---Next-Js
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
SITE_URL=http://localhost:3000

SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_FROM_EMAIL=your-email@gmail.com
```

Use a Google App Password instead of your regular Gmail password.

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

```bash
npm run dev        # Start the development server
npm run build      # Create a production build
npm run start      # Start the production server
npm run typecheck  # Check TypeScript types
npm run lint       # Run ESLint
npm run format     # Format files with Prettier
```

## Project Structure

```text
├── app/                  # Pages, layouts, and API routes
├── components/           # Reusable UI and portfolio sections
├── features/             # Command palette
├── hooks/                # Custom React hooks
├── lib/                  # Profile data and utilities
├── public/               # Images, resume, and static assets
└── types/                # TypeScript definitions
```

## Customization

Most portfolio content is stored in:

```text
lib/profile.ts
```

Update this file to change your:

- Personal information
- Skills
- Projects
- Experience and education
- Certifications
- Social links
- LeetCode username

Replace these files to use your own photo and resume:

```text
public/profile.jpeg
public/resume.pdf
```

## Deployment

The easiest way to deploy this portfolio is with [Vercel](https://vercel.com):

1. Fork or push the repository to GitHub.
2. Import it into Vercel.
3. Add the required environment variables.
4. Deploy the project.

## Contact

**Harshit Mishra**

- [LinkedIn](https://www.linkedin.com/in/harshit-mishra-a9a8b6364/)
- [GitHub](https://github.com/Harshitbro-ctrlv)
- [LeetCode](https://leetcode.com/u/mish123_harshit/)
- Email: harshitmis9091@gmail.com

## License

This project is available for learning and inspiration. Please replace the personal information, photograph, resume, and project details before publishing your own version.
