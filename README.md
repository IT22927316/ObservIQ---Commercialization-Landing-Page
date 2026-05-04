# ObservIQ – Commercialization Landing Page

A modern, interactive landing page for **ObservIQ**, a Smart Observability Middleware solution designed to transform raw observability data into meaningful system insights. This project showcases the research, development, and commercialization of an intelligent observability platform built by the ObservIQ research team at SLIIT.

## Overview

ObservIQ addresses a critical gap in observability: while modern systems generate abundant metrics, logs, and alerts, engineers still struggle to interpret what these signals mean across complex systems. This landing page presents the solution's research foundation, team expertise, and commercial potential.

## Key Features

- **Interactive Hero Section** – Compelling introduction to the Smart Observability Middleware
- **Research Documentation** – Comprehensive sections on literature survey, research gaps, problems, and objectives
- **Product Showcase** – Visual demonstration of ObservIQ's capabilities
- **Team Profiles** – Highlights of core contributors and their specialized roles
- **Milestones & Progress** – Timeline of development achievements
- **Resource Library** – Access to research documents and presentation slides
- **Contact Integration** – EmailJS-powered contact form for inquiries
- **Responsive Design** – Fully optimized for desktop and mobile devices
- **Smooth Animations** – Advanced animations powered by Framer Motion and GSAP

## Tech Stack

- **Framework:** Next.js 16.2.4 with React 19.2.4
- **Styling:** TailwindCSS 4 with PostCSS
- **Animation:** Framer Motion 12.38.0 & GSAP 3.15.0
- **Charts:** Recharts 3.8.1
- **Email Service:** EmailJS for form submissions
- **Language:** TypeScript 5
- **Linting:** ESLint 9

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Available Scripts

```bash
npm run dev      # Start development server with hot reload
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint code quality checks
```

## Project Structure

```
├── app/
│   ├── components/          # Reusable UI components
│   ├── sections/            # Page sections (Hero, About, Domain, etc.)
│   ├── lib/                 # Utility functions and animations
│   ├── literature-survey/   # Research documentation pages
│   ├── methodology/
│   ├── research-gap/
│   ├── research-objectives/
│   ├── research-problem/
│   ├── technologies-used/
│   ├── layout.tsx           # Root layout component
│   ├── page.tsx             # Homepage
│   └── globals.css          # Global styles
├── public/
│   └── images/              # Static assets and images
├── next.config.ts           # Next.js configuration
├── tailwind.config.ts       # TailwindCSS configuration
└── package.json             # Project dependencies
```

## Development Workflow

The application follows a modular architecture with:

- **Sections** – Independent page sections with isolated animations
- **Components** – Reusable UI elements (Navbar, Footer, Container)
- **Utilities** – Animation presets and helper functions in `lib/animations.ts`

### Adding New Sections

Create a new file in `app/sections/` and import it into `app/page.tsx`:

```typescript
import YourNewSection from "./sections/YourNewSection";

// Add to the main page component
<YourNewSection />
```

## Contact & Support

For inquiries about ObservIQ or the commercialization opportunity:

- Use the contact form on the landing page
- Email the team directly through the Contact section
- Connect with team members via LinkedIn (links available on the About page)

## Team

ObservIQ is developed by a dedicated research team at Sri Lanka Institute of Information Technology (SLIIT):

- **Rusiru De Silva** – Metric & Signal Discovery Lead
- **Nimasha Piyumini** – Log Structure & Enrichment Lead
- **Nayanahari Kusalanjani** – Adaptive Alert Tuning Lead
- **Yomith Gamage** – Lead Researcher & Project Coordinator

## License

This project is proprietary and confidential. All rights reserved.
