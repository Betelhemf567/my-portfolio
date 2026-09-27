import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiGithub, FiExternalLink, FiStar } from 'react-icons/fi'
import SectionHeader from '../ui/SectionHeader'
import SectionReveal from '../ui/SectionReveal'
import { projects } from '../../data/portfolio'

const categories = ['All', 'Web App', 'E-commerce', 'Productivity', 'Dashboard']

/** Visual placeholder for project image */
function ProjectImagePlaceholder({ gradient, title, accentColor }) {
  const initial = title.split(' ').map(w => w[0]).join('').slice(0, 2)
  return (
    <div
      className={`w-full h-48 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center relative overflow-hidden`}
    >
      {/* Background pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 200 200">
        <defs>
          <pattern id={`p-${initial}`} width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="1" fill={accentColor} />
          </pattern>
        </defs>
        <rect width="200" height="200" fill={`url(#p-${initial})`} />
      </svg>
      <span
        className="font-display font-bold text-5xl relative z-10"
        style={{ color: accentColor, opacity: 0.6 }}
      >
        {initial}
      </span>
    </div>
  )
}

function ProjectCard({ project, index }) {
  return (
    <SectionReveal delay={index * 0.1}>
      <motion.article
        whileHover={{ y: -6 }}
        transition={{ duration: 0.25 }}
        className="glass-card rounded-3xl overflow-hidden flex flex-col h-full group"
      >
        {/* Image area */}
        <div className="p-5 pb-0">
          <ProjectImagePlaceholder {...project} />
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                {project.featured && (
                  <span
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-mono text-[10px] font-medium"
                    style={{ background: 'rgba(232,133,90,0.12)', color: 'var(--accent)' }}
                  >
                    <FiStar size={10} />
                    Featured
                  </span>
                )}
                <span
                  className="px-2 py-0.5 rounded-full font-mono text-[10px]"
                  style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)' }}
                >
                  {project.category}
                </span>
              </div>
              <h3
                className="font-display font-semibold text-lg leading-tight"
                style={{ color: 'var(--text)' }}
              >
                {project.title}
              </h3>
            </div>
          </div>

          <p className="font-body text-sm text-muted leading-relaxed mb-5 flex-1">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-5">
            {project.tags.map(tag => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full font-mono text-xs"
                style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 btn-primary text-center text-sm py-2.5 flex items-center justify-center gap-2"
            >
              <FiExternalLink size={14} />
              Live Demo
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost text-sm py-2.5 px-4 flex items-center justify-center gap-2"
            >
              <FiGithub size={14} />
              Code
            </a>
          </div>
        </div>
      </motion.article>
    </SectionReveal>
  )
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter)

  return (
    <section id="projects" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="section-container">
        <SectionHeader
          label="Projects"
          title="Things I've built"
          subtitle="A selection of projects that showcase my skills, creativity, and problem-solving approach."
        />

        {/* Filters */}
        <SectionReveal className="flex flex-wrap gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className="px-5 py-2 rounded-full font-mono text-xs font-medium tracking-wide transition-all duration-200"
              style={
                activeFilter === cat
                  ? { background: 'var(--accent)', color: '#fff', boxShadow: '0 4px 16px rgba(232,133,90,0.35)' }
                  : { background: 'var(--bg)', color: 'var(--text-muted)', border: '1px solid var(--border)' }
              }
            >
              {cat}
            </button>
          ))}
        </SectionReveal>

        {/* Project grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6"
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <SectionReveal className="mt-16 text-center">
          <p className="text-muted mb-6 font-body">
            These are just the highlights — more projects live on GitHub.
          </p>
          <a
            href="https://github.com/alexmorgan"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost inline-flex items-center gap-2"
          >
            <FiGithub size={18} />
            View all on GitHub
          </a>
        </SectionReveal>
      </div>
    </section>
  )
}
