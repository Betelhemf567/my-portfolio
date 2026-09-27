# Alex Morgan — Portfolio

A production-ready personal portfolio website for a junior frontend web developer.
Built with **React + Tailwind CSS + Framer Motion**.

---

## 🚀 Quick Start

```bash
# 1. Extract the archive
tar -xzf portfolio-src.tar.gz
cd portfolio

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
# → Opens at http://localhost:5173
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── sections/       # Page sections (Hero, About, Skills, ...)
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── Experience.jsx
│   │   ├── Testimonials.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   └── ui/             # Reusable UI primitives
│       ├── Navbar.jsx
│       ├── LoadingScreen.jsx
│       ├── SectionReveal.jsx
│       ├── SectionHeader.jsx
│       ├── ScrollHelpers.jsx  (progress bar + back-to-top)
│       └── CustomCursor.jsx
├── hooks/
│   ├── useTheme.js
│   ├── useScrollProgress.js
│   └── useCursor.js
├── data/
│   └── portfolio.js    ← Edit this to personalize everything
├── App.jsx
├── main.jsx
└── index.css
```

---

## ✏️ Personalizing

**All content lives in `src/data/portfolio.js`** — edit it to update:

- Your name, role, email, location, social links
- Project cards (title, description, tech stack, URLs)
- Experience / education entries
- Testimonials
- Skills list and proficiency levels

To add a real photo, replace the avatar placeholder in `About.jsx` with an `<img>` tag.

---

## 🔌 Connecting the Contact Form

The form currently simulates submission. To make it real, pick one:

### Option A — Formspree (easiest, free tier)
1. Create account at https://formspree.io
2. Create a form and copy your endpoint ID
3. In `Contact.jsx`, replace the `await new Promise(...)` line with:
```js
await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(form),
})
```

### Option B — EmailJS
1. Install: `npm install @emailjs/browser`
2. Follow https://www.emailjs.com/docs/sdk/send/

---

## 🌐 Deploy to Vercel (recommended)

### Method 1: Vercel CLI
```bash
npm install -g vercel
vercel login
vercel --prod
```

### Method 2: GitHub + Vercel Dashboard
1. Push your code to a GitHub repository
2. Go to https://vercel.com/new
3. Import the repository
4. Framework: **Vite** (auto-detected)
5. Build command: `npm run build`
6. Output directory: `dist`
7. Click **Deploy** ✅

### Custom Domain
After deploying, go to your project settings on Vercel → Domains → add your domain.

---

## 🎨 Theming

CSS custom properties in `src/index.css` control the full color palette:

```css
:root {
  --accent: #E8855A;       /* Change this to your accent color */
  --bg: #FAFAF8;
  --bg-secondary: #F2F1EE;
  /* ... */
}

.dark {
  --bg: #0E0E0F;
  /* ... */
}
```

---

## ✨ Features

- **Dark / Light mode** with system preference detection + localStorage persistence
- **Loading screen** with animated logo
- **Scroll progress bar** at the top
- **Custom cursor** (desktop only, gracefully disabled on touch)
- **Back-to-top button**
- **Typing animation** in the hero
- **Section reveal animations** on scroll (via Framer Motion + IntersectionObserver)
- **Interactive project filtering** by category
- **Responsive** — mobile, tablet, and desktop
- **SEO meta tags** — Open Graph, Twitter Card, description, keywords
- **Glassmorphism cards** throughout

---

## 📦 Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| Vite | Build tool |
| Tailwind CSS | Utility styling |
| Framer Motion | Animations |
| react-type-animation | Typing effect in hero |
| react-icons | Icon set |
| react-intersection-observer | Scroll-triggered animations |

---

## 🏗️ Build for Production

```bash
npm run build
# Output in /dist — ready to upload anywhere
```
