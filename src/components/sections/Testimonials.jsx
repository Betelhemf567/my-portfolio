import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import SectionHeader from '../ui/SectionHeader'
import SectionReveal from '../ui/SectionReveal'
import { testimonials } from '../../data/portfolio'

function Avatar({ name, bg, initials }) {
  return (
    <div
      className="w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-white text-base shrink-0"
      style={{ background: bg }}
    >
      {initials}
    </div>
  )
}

function QuoteMark() {
  return (
    <svg width="32" height="24" viewBox="0 0 32 24" fill="none" className="mb-4 opacity-20" style={{ color: 'var(--accent)' }}>
      <path d="M0 24V14.4C0 10.56 0.96 7.36 2.88 4.8C4.88 2.24 7.84 0.64 11.76 0L13.44 3.12C11.2 3.6 9.44 4.68 8.16 6.36C6.88 8.04 6.24 10 6.24 12.24H12V24H0ZM20 24V14.4C20 10.56 20.96 7.36 22.88 4.8C24.88 2.24 27.84 0.64 31.76 0L33.44 3.12C31.2 3.6 29.44 4.68 28.16 6.36C26.88 8.04 26.24 10 26.24 12.24H32V24H20Z" fill="currentColor"/>
    </svg>
  )
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  const navigate = (dir) => {
    setDirection(dir)
    setCurrent(prev => (prev + dir + testimonials.length) % testimonials.length)
  }

  const t = testimonials[current]

  return (
    <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="section-container">
        <SectionHeader
          label="Testimonials"
          title="What people say"
          subtitle="Kind words from colleagues, clients, and mentors."
          align="center"
        />

        {/* Featured testimonial (large) */}
        <SectionReveal className="max-w-3xl mx-auto mb-12">
          <div
            className="relative glass-card rounded-3xl p-10 md:p-12 overflow-hidden"
          >
            {/* Background accent */}
            <div
              className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
              style={{
                background: `radial-gradient(circle, ${t.avatarBg}10 0%, transparent 70%)`,
                transform: 'translate(30%, -30%)',
              }}
            />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -direction * 40 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              >
                <QuoteMark />
                <p
                  className="font-display text-xl md:text-2xl leading-relaxed mb-8 italic"
                  style={{ color: 'var(--text)' }}
                >
                  "{t.text}"
                </p>
                <div className="flex items-center gap-4">
                  <Avatar name={t.name} bg={t.avatarBg} initials={t.avatar} />
                  <div>
                    <p className="font-body font-semibold" style={{ color: 'var(--text)' }}>{t.name}</p>
                    <p className="font-mono text-xs text-muted">{t.role} · {t.company}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center gap-4 mt-8 pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
              {/* Dots */}
              <div className="flex gap-2 flex-1">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
                    className="h-1.5 rounded-full transition-all duration-300"
                    style={{
                      width: i === current ? 24 : 8,
                      background: i === current ? 'var(--accent)' : 'var(--border)',
                    }}
                  />
                ))}
              </div>
              {/* Arrows */}
              <div className="flex gap-2">
                {[[-1, FiChevronLeft], [1, FiChevronRight]].map(([dir, Icon]) => (
                  <motion.button
                    key={dir}
                    onClick={() => navigate(dir)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200"
                    style={{ background: 'var(--bg)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}
                  >
                    <Icon size={18} />
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* All testimonials as small cards */}
        <div className="grid sm:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <SectionReveal key={t.id} delay={i * 0.1}>
              <motion.button
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
                whileHover={{ scale: 1.02, y: -2 }}
                className={`w-full text-left glass-card rounded-2xl p-5 transition-all duration-200 ${
                  i === current ? 'ring-1' : ''
                }`}
                style={i === current ? { '--tw-ring-color': 'var(--accent)' } : {}}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Avatar name={t.name} bg={t.avatarBg} initials={t.avatar} />
                  <div>
                    <p className="font-body font-semibold text-sm" style={{ color: 'var(--text)' }}>{t.name}</p>
                    <p className="font-mono text-xs text-muted">{t.company}</p>
                  </div>
                </div>
                <p className="font-body text-sm text-muted leading-relaxed line-clamp-3">"{t.text}"</p>
              </motion.button>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
