# AI Career Hub

🚀 **[Live Demo](https://unknown122-coder.github.io/ai-career-hub/)**

A production-grade SaaS frontend application helping students manage their career journey — built with React 19, Vite, Material UI, Chart.js, and SCSS.

![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-8-purple?style=flat-square&logo=vite)
![MUI](https://img.shields.io/badge/Material_UI-9-007FFF?style=flat-square&logo=mui)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-7952B3?style=flat-square&logo=bootstrap)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## Features

| Module | Description |
|---|---|
| **Authentication** | Login, Register, Forgot Password with form validation |
| **Dashboard** | Stats, Chart.js charts (line, doughnut, bar), profile completion, activities |
| **Resume Analyzer** | Drag & drop upload, ATS score ring, keyword analysis, suggestions |
| **Job Tracker** | Kanban board with 6 columns, drag-and-drop cards, add/delete |
| **AI Interview Prep** | Chat interface with typing animation, suggested questions |
| **Profile** | Editable personal details, skills management, experience/education |
| **Settings** | Dark/Light theme toggle (persisted), notification preferences, security |

## Tech Stack

- **Framework**: React 19 + Vite 8
- **Language**: JavaScript (ES2022+)
- **Routing**: React Router DOM v7
- **Styling**: SCSS (7-1 architecture), Bootstrap 5, Material UI v9
- **State**: Context API + useReducer
- **Charts**: Chart.js + react-chartjs-2
- **Animations**: Framer Motion
- **Drag & Drop**: @hello-pangea/dnd
- **HTTP**: Axios (centralized instance)
- **Testing**: Vitest + React Testing Library

## Getting Started

### Prerequisites

- **Node.js** >= 18
- **npm** >= 9

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/ai-career-hub.git
cd ai-career-hub

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |
| `npm run test` | Run tests in watch mode |
| `npm run test:run` | Run tests once |
| `npm run test:coverage` | Run tests with coverage |
| `npm run lint` | Lint with ESLint |

## Project Structure

```
src/
├── assets/              # Static assets
├── components/          # Reusable UI components
│   ├── Button/
│   ├── Input/
│   ├── ResumeUpload/
│   └── StatCard/
├── constants/           # App-wide constants
├── contexts/            # Context API (Auth, Theme)
├── hooks/               # Custom hooks (useForm, useLocalStorage)
├── layouts/             # Layout shells
│   ├── AppLayout/
│   ├── Navbar/
│   └── Sidebar/
├── pages/               # Route-level pages
│   ├── Dashboard/
│   ├── ForgotPassword/
│   ├── Interview/
│   ├── Jobs/
│   ├── Login/
│   ├── Profile/
│   ├── Register/
│   ├── Resume/
│   └── Settings/
├── routes/              # Router configuration
├── scss/                # SCSS architecture (7-1 pattern)
│   ├── abstracts/       # Variables, mixins, functions
│   ├── base/            # Reset, typography
│   ├── components/      # Buttons, cards, forms
│   ├── layouts/         # Sidebar, navbar styles
│   ├── pages/           # Page-specific styles
│   └── main.scss        # Entry point
├── services/            # API layer (Axios)
├── tests/               # Test files
└── utils/               # Utility functions
```

## SCSS Architecture

Uses the **7-1 pattern** for scalable styling:

- `abstracts/` — Design tokens (colors, spacing, typography, breakpoints)
- `base/` — CSS reset and typography system
- `components/` — Buttons, cards, forms component styles
- `layouts/` — Sidebar, navbar structural styles
- `pages/` — Page-specific styles
- `main.scss` — Master entry point with theming CSS custom properties

## API Layer

Centralized Axios instance with:
- Token injection via request interceptor
- 401 auto-redirect
- Error normalization
- Mock services for all features (no backend required)

## Testing

```bash
# Run all tests
npm run test:run

# Watch mode
npm run test
```

Tests cover:
- Login form validation
- Dashboard stat cards
- Resume upload component
- Navbar rendering
- Theme toggle functionality

## Deployment (Vercel)

### One-Click Deploy

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Vercel auto-detects Vite — no configuration needed
4. Deploy!

### Manual Deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Build
npm run build

# Deploy
vercel --prod
```

The `vercel.json` handles SPA routing automatically.

### Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

## Performance

- **Code Splitting**: All pages are lazy-loaded
- **Chunk Splitting**: Vendor, UI, Charts, and Motion separated
- **React.memo**: Applied to all reusable components
- **useCallback/useMemo**: Optimized expensive operations
- **CSS Custom Properties**: Efficient theme switching without re-render

## Accessibility

- ARIA labels on all interactive elements
- Keyboard navigation support
- Semantic HTML throughout
- Focus-visible indicators
- Screen reader announcements

## License

MIT
