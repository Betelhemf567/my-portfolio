import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionHeader from '../ui/SectionHeader'
import SectionReveal from '../ui/SectionReveal'
import { skills } from '../../data/portfolio'

const categories = ['All', 'Core', 'Frameworks', 'Tools']

/** Animated progress bar for each skill */
function SkillBar({ name, level, delay = 0 }) {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="font-body text-sm font-medium" style={{ color: 'var(--text)' }}>{name}</span>
        <span className="font-mono text-xs text-muted">{level}%</span>
      </div>
      <div
        className="h-1.5 rounded-full overflow-hidden"
        style={{ background: 'var(--border)' }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{
            background: 'linear-gradient(90deg, var(--accent), var(--accent-light))',
          }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
    </div>
  )
}

/** Skill card for the grid view */
function SkillCard({ name, level, icon, index }) {
  return (
    <SectionReveal delay={index * 0.05}>
      <motion.div
        whileHover={{ scale: 1.04, y: -4 }}
        className="glass-card rounded-2xl p-5 flex items-center gap-4 cursor-default"
      >
        <span className="text-2xl">{icon}</span>
        <div className="flex-1 min-w-0">
          <p className="font-body font-semibold text-sm mb-1.5" style={{ color: 'var(--text)' }}>
            {name}
          </p>
          <div
            className="h-1 rounded-full overflow-hidden"
            style={{ background: 'var(--border)' }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, var(--accent), var(--accent-light))' }}
              initial={{ width: 0 }}
              animate={{ width: `${level}%` }}
              transition={{ duration: 1, delay: index * 0.05 + 0.3, ease: 'easeOut' }}
            />
          </div>
        </div>
        <span className="font-mono text-xs text-muted shrink-0">{level}%</span>
      </motion.div>
    </SectionReveal>
  )
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? skills
    : skills.filter(s => s.category === activeCategory)

  return (
    <section id="skills" className="section-padding" style={{ background: 'var(--bg)' }}>
      <div className="section-container">
        <SectionHeader
          label="Skills"
          title="My technical toolkit"
          subtitle="Technologies I work with daily and the ones I'm actively leveling up."
        />

        {/* Category filter */}
        <SectionReveal className="flex flex-wrap gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-5 py-2 rounded-full font-mono text-xs font-medium tracking-wide transition-all duration-200"
              style={
                activeCategory === cat
                  ? { background: 'var(--accent)', color: '#fff', boxShadow: '0 4px 16px rgba(232,133,90,0.35)' }
                  : { background: 'var(--bg-secondary)', color: 'var(--text-muted)', border: '1px solid var(--border)' }
              }
            >
              {cat}
            </button>
          ))}
        </SectionReveal>

        {/* Skills grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {filtered.map((skill, i) => (
            <SkillCard key={skill.name} {...skill} index={i} />
          ))}
        </motion.div>

        {/* Extra row: brief proficiency breakdown */}
        <SectionReveal className="mt-16">
          <div
            className="glass-card rounded-3xl p-8 md:p-10 grid md:grid-cols-3 gap-8 text-center"
          >
            {[
              { level: 'Expert', range: '85–100%', skills: 'HTML, CSS, Responsive Design', color: '#E8855A' },
              { level: 'Proficient', range: '70–84%', skills: 'JavaScript, React, Tailwind, GitHub', color: '#6366F1' },
              { level: 'Learning', range: '50–69%', skills: 'TypeScript, Next.js, Figma', color: '#10B981' },
            ].map(({ level, range, skills: s, color }) => (
              <div key={level}>
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: `${color}18` }}
                >
                  <div className="w-3 h-3 rounded-full" style={{ background: color }} />
                </div>
                <h3 className="font-display font-semibold mb-1" style={{ color: 'var(--text)' }}>{level}</h3>
                <p className="font-mono text-xs text-muted mb-2">{range}</p>
                <p className="font-body text-sm text-muted">{s}</p>
              </div>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
