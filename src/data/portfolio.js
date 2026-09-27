// ============================================================
// PORTFOLIO DATA — Edit this file to personalize your portfolio
// ============================================================

export const personal = {
  name: 'Betelhem Chelebo',
  firstName: 'Betelhem',
  role: 'Frontend Web Developer',
  email: 'betelhem.chelebo@email.com',
  phone: '+1 (555) 234-5678',
  location: 'San Francisco, CA',
  cvUrl: '/Betelhem_Chelebo_CV.pdf',
  taglines: [
    'I build beautiful web experiences.',
    'I turn designs into code.',
    'I craft interactive UIs.',
    'I love clean, fast interfaces.',
  ],
  bio: `I'm a passionate junior frontend developer who believes that great code and great design go hand in hand. 
  With a strong foundation in modern web technologies, I focus on building interfaces that are not only visually 
  compelling but also accessible, performant, and delightful to use.`,
  bioLong: `My journey into web development started during my last year of university, when I built my first React app — 
  a simple todo list that somehow spiraled into a full productivity suite. That spark turned into an obsession. 
  I've spent the past two years honing my skills, contributing to open-source projects, completing internships, 
  and freelancing for small businesses.

  I care deeply about the details — the micro-interactions, the loading states, the perfect hover effect. I believe 
  that the web should be a beautiful place, and I want to help make it that way, one component at a time.`,
  socialLinks: {
    github: 'https://github.com/Betelhemf567',
    linkedin: 'https://www.linkedin.com/in/betelhem-feleke-b034a1322',
    twitter: 'https://twitter.com/betelhem_dev',
    dribbble: 'https://dribbble.com/betelhem',
  },
}

export const skills = [
  { name: 'HTML5', level: 95, category: 'Core', icon: '🔴' },
  { name: 'CSS3', level: 90, category: 'Core', icon: '🔵' },
  { name: 'JavaScript', level: 85, category: 'Core', icon: '🟡' },
  { name: 'React', level: 82, category: 'Frameworks', icon: '⚛️' },
  { name: 'Tailwind CSS', level: 88, category: 'Frameworks', icon: '💨' },
  { name: 'Git', level: 80, category: 'Tools', icon: '🔗' },
  { name: 'GitHub', level: 82, category: 'Tools', icon: '🐙' },
  { name: 'REST APIs', level: 75, category: 'Tools', icon: '🔌' },
  { name: 'Responsive Design', level: 92, category: 'Core', icon: '📱' },
  { name: 'Figma', level: 70, category: 'Tools', icon: '🎨' },
  { name: 'TypeScript', level: 65, category: 'Frameworks', icon: '🔷' },
  { name: 'Next.js', level: 60, category: 'Frameworks', icon: '▲' },
]

export const projects = [
  {
    id: 1,
    title: 'Job Listing Platform',
    description:
      'A full-featured job board where companies can post listings and candidates can filter, save, and apply to roles. Features real-time search, advanced filtering, and a clean two-column layout.',
    tags: ['React', 'Tailwind CSS', 'REST API', 'JavaScript'],
    category: 'Web App',
    liveUrl: 'https://jobboard-demo.vercel.app',
    githubUrl: 'https://github.com/Betelhemf567/job-listing-platform',
    featured: true,
    gradient: 'from-blue-500/20 to-indigo-500/20',
    accentColor: '#6366F1',
    image: null,
  },
  {
    id: 2,
    title: 'Paradise Nursery Store',
    description:
      'An e-commerce storefront for a plant nursery with a shopping cart, product filtering by category, responsive grid layout, and smooth animations throughout the shopping experience.',
    tags: ['React', 'CSS Modules', 'Context API', 'Vite'],
    category: 'E-commerce',
    liveUrl: 'https://paradise-nursery.vercel.app',
    githubUrl: 'https://github.com/Betelhemf567/paradise-nursery',
    featured: true,
    gradient: 'from-green-500/20 to-emerald-500/20',
    accentColor: '#10B981',
    image: null,
  },
  {
    id: 3,
    title: 'Productivity Tracker',
    description:
      'A Pomodoro-style productivity app with task management, time tracking, streak counters, and data visualization. Syncs to localStorage and visualizes weekly progress with charts.',
    tags: ['React', 'Recharts', 'Tailwind CSS', 'localStorage'],
    category: 'Productivity',
    liveUrl: 'https://productivity-tracker.vercel.app',
    githubUrl: 'https://github.com/Betelhemf567/productivity-tracker',
    featured: false,
    gradient: 'from-orange-500/20 to-red-500/20',
    accentColor: '#F59E0B',
    image: null,
  },
  {
    id: 4,
    title: 'Analytics Dashboard',
    description:
      'A responsive admin dashboard with KPI cards, interactive charts, data tables, and a collapsible sidebar. Built with mock data and a dark-first design system.',
    tags: ['React', 'Recharts', 'Tailwind CSS', 'Vite'],
    category: 'Dashboard',
    liveUrl: 'https://analytics-dashboard.vercel.app',
    githubUrl: 'https://github.com/Betelhemf567/dashboard-project',
    featured: false,
    gradient: 'from-purple-500/20 to-pink-500/20',
    accentColor: '#A855F7',
    image: null,
  },
]

export const experience = [
  {
    id: 1,
    type: 'work',
    title: 'Frontend Developer Intern',
    company: 'TechSpark Agency',
    location: 'San Francisco, CA (Hybrid)',
    period: 'Jun 2024 – Dec 2024',
    duration: '6 months',
    description:
      "Worked alongside the product team to rebuild the company's client portal using React and Tailwind CSS, reducing load time by 40%. Contributed to a component library and participated in daily stand-ups and sprint reviews.",
    highlights: [
      'Rebuilt client portal from jQuery to React',
      'Improved Lighthouse score from 62 to 94',
      'Shipped 3 major features end-to-end',
      'Co-authored internal component library docs',
    ],
    color: '#E8855A',
  },
  {
    id: 2,
    type: 'freelance',
    title: 'Freelance Web Developer',
    company: 'Self-Employed',
    location: 'Remote',
    period: 'Jan 2024 – Present',
    duration: 'Ongoing',
    description:
      'Designing and developing websites for small businesses and solopreneurs. Projects span landing pages, portfolio sites, and light e-commerce. All delivered mobile-first with strong SEO fundamentals.',
    highlights: [
      '8+ clients served',
      'Avg. 98/100 PageSpeed score',
      'Figma-to-code delivery',
      'Ongoing maintenance contracts',
    ],
    color: '#6366F1',
  },
  {
    id: 3,
    type: 'education',
    title: 'B.Sc. Computer Science',
    company: 'University of California, Berkeley',
    location: 'Berkeley, CA',
    period: 'Sep 2020 – May 2024',
    duration: '4 years',
    description:
      'Graduated with a focus on web technologies and human-computer interaction. Senior capstone project was a collaborative real-time whiteboard app built with React and WebSockets.',
    highlights: [
      'GPA: 3.7 / 4.0',
      'HCI Specialization',
      'Capstone: Real-time Whiteboard App',
      "Dean's List — 3 semesters",
    ],
    color: '#10B981',
  },
]

export const testimonials = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Product Manager',
    company: 'TechSpark Agency',
    avatar: 'SC',
    avatarBg: '#6366F1',
    text: "Alex joined us as an intern but delivered like a mid-level developer. The portal rebuild was technically solid and the UX improvements were real — users loved it. I'd hire Alex full-time without hesitation.",
  },
  {
    id: 2,
    name: 'Marcus Johnson',
    role: 'Founder',
    company: 'GreenLeaf Nursery',
    avatar: 'MJ',
    avatarBg: '#10B981',
    text: "Alex built our online store from scratch in three weeks. It's beautiful, fast, and our customers compliment it regularly. The attention to detail — especially on mobile — was outstanding. Truly exceeded expectations.",
  },
  {
    id: 3,
    name: 'Dr. Priya Nair',
    role: 'Senior Lecturer, CS Dept.',
    company: 'UC Berkeley',
    avatar: 'PN',
    avatarBg: '#E8855A',
    text: "Alex was one of the most engaged students in my HCI course. The capstone project — a real-time collaborative whiteboard — was technically impressive and beautifully designed. A natural frontend developer.",
  },
]
