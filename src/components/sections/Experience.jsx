import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiBriefcase, FiBookOpen, FiUser } from 'react-icons/fi'
import SectionHeader from '../ui/SectionHeader'
import SectionReveal from '../ui/SectionReveal'
import { experience } from '../../data/portfolio'

const typeIcon = { work: FiBriefcase, freelance: FiUser, education: FiBookOpen }
const typeLabel = { work: 'Work', freelance: 'Freelance', education: 'Education' }

function TimelineItem({ item, index, isLast }) {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="relative grid md:grid-cols-2 gap-8 md:gap-16 items-start"
    >
      {/* Desktop: alternating left/right */}
      {/* Left column content */}
      <div className={`${index % 2 === 0 ? 'md:text-right' : 'md:col-start-2'}`}>
        <div
          className={`glass-card rounded-3xl p-7 hover:scale-[1.01] transition-transform duration-200 ${
            index % 2 !== 0 ? 'md:col-start-2' : ''
          }`}
        >
          {/* Type badge */}
          <div className={`flex items-center gap-2 mb-4 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-xs font-medium"
              style={{ background: `${item.color}15`, color: item.color }}
            >
              {(() => { const Icon = typeIcon[item.type]; return <Icon size={12} /> })()}
              {typeLabel[item.type]}
            </span>
            <span className="font-mono text-xs text-muted">{item.duration}</span>
          </div>

          <h3 className="font-display font-semibold text-xl mb-1" style={{ color: 'var(--text)' }}>
            {item.title}
          </h3>
          <p className="font-body font-medium text-sm mb-1" style={{ color: item.color }}>
            {item.company}
          </p>
          <p className="font-mono text-xs text-muted mb-4">{item.period} · {item.location}</p>
          <p className="font-body text-sm text-muted leading-relaxed mb-5">{item.description}</p>

          {/* Highlights */}
          <ul className={`space-y-1.5 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
            {item.highlights.map(h => (
              <li key={h} className={`flex items-center gap-2 text-sm font-body text-muted ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: item.color }}
                />
                {h}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Center: timeline dot (hidden on mobile) */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 flex-col items-center" style={{ top: 28 }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
          className="w-12 h-12 rounded-full flex items-center justify-center z-10"
          style={{ background: item.color, boxShadow: `0 0 0 6px ${item.color}20` }}
        >
          {(() => { const Icon = typeIcon[item.type]; return <Icon size={18} color="#fff" /> })()}
        </motion.div>
        {!isLast && (
          <div className="w-0.5 mt-3" style={{ height: 120, background: 'var(--border)' }} />
        )}
      </div>

      {/* Right placeholder (for alternating layout) */}
      {index % 2 === 0 && <div className="hidden md:block" />}
    </motion.div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="section-padding" style={{ background: 'var(--bg)' }}>
      <div className="section-container">
        <SectionHeader
          label="Experience"
          title="My journey so far"
          subtitle="From academic projects to real-world internships and freelance work — here's where I've been."
          align="center"
        />

        {/* Timeline */}
        <div className="space-y-12 relative">
          {experience.map((item, i) => (
            <TimelineItem
              key={item.id}
              item={item}
              index={i}
              isLast={i === experience.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
