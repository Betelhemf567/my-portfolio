import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiCode, FiHeart, FiTarget, FiZap } from 'react-icons/fi'
import SectionHeader from '../ui/SectionHeader'
import SectionReveal from '../ui/SectionReveal'
import { personal } from '../../data/portfolio'

const highlights = [
  {
    icon: FiCode,
    label: 'Clean Code',
    desc: 'I write readable, maintainable code that teams love to work with.',
  },
  {
    icon: FiZap,
    label: 'Performance First',
    desc: 'Every millisecond counts. I optimize for speed without sacrificing UX.',
  },
  {
    icon: FiHeart,
    label: 'Detail Obsessed',
    desc: 'The micro-interactions and subtle touches that make interfaces feel alive.',
  },
  {
    icon: FiTarget,
    label: 'Goal Oriented',
    desc: 'I ship fast, iterate faster, and always keep the user outcome in mind.',
  },
]

const stats = [
  { value: '2+', label: 'Years of coding' },
  { value: '8+', label: 'Projects shipped' },
  { value: '8+', label: 'Happy clients' },
  { value: '94', label: 'Avg. Lighthouse score' },
]

export default function About() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="about" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="section-container">
        <SectionHeader
          label="About Me"
          title="The developer behind the code"
          subtitle="A little bit about who I am, what drives me, and where I'm headed."
        />

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image placeholder + stats */}
          <SectionReveal direction="right">
            <div className="relative">
              {/* Photo card */}
              <div
                className="relative rounded-3xl overflow-hidden aspect-[4/5] max-w-sm mx-auto lg:mx-0"
                style={{ background: 'var(--bg)', boxShadow: 'var(--shadow-lg)' }}
              >
                {/* Placeholder avatar */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-40 h-40 rounded-full flex items-center justify-center font-display text-7xl font-bold text-white"
                    style={{ background: 'linear-gradient(135deg, var(--accent), #F4B28A)' }}
                  >
                    {personal.firstName[0]}
                  </div>
                </div>

                {/* Decorative label */}
                <div
                  className="absolute bottom-6 left-6 right-6 glass-card rounded-2xl p-4"
                >
                  <p className="font-mono text-xs text-muted mb-1">Based in</p>
                  <p className="font-body font-semibold" style={{ color: 'var(--text)' }}>
                    {personal.location} 🌉
                  </p>
                </div>
              </div>

              {/* Floating experience badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 glass-card rounded-2xl p-4 hidden sm:block"
              >
                <p className="font-mono text-xs text-muted">Experience</p>
                <p className="font-display text-2xl font-bold mt-0.5" style={{ color: 'var(--accent)' }}>2+ yrs</p>
              </motion.div>
            </div>
          </SectionReveal>

          {/* Right: Bio + highlights */}
          <SectionReveal direction="left">
            <div>
              <p className="font-body text-base leading-relaxed mb-6 text-muted">
                {personal.bio}
              </p>
              <p className="font-body text-base leading-relaxed mb-10 text-muted">
                {personal.bioLong.split('\n\n')[1]?.trim() || ''}
              </p>

              {/* Highlights grid */}
              <div className="grid grid-cols-2 gap-4 mb-10">
                {highlights.map(({ icon: Icon, label, desc }, i) => (
                  <SectionReveal key={label} delay={i * 0.1}>
                    <div
                      className="glass-card rounded-2xl p-4 hover:scale-[1.02] transition-transform duration-200"
                    >
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                        style={{ background: 'rgba(232,133,90,0.12)', color: 'var(--accent)' }}
                      >
                        <Icon size={18} />
                      </div>
                      <p className="font-body font-semibold text-sm mb-1" style={{ color: 'var(--text)' }}>
                        {label}
                      </p>
                      <p className="font-body text-xs text-muted leading-relaxed">{desc}</p>
                    </div>
                  </SectionReveal>
                ))}
              </div>

              {/* Stats row */}
              <div
                ref={ref}
                className="grid grid-cols-4 gap-4 pt-8 border-t"
                style={{ borderColor: 'var(--border)' }}
              >
                {stats.map(({ value, label }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="text-center"
                  >
                    <p className="font-display text-2xl md:text-3xl font-bold text-gradient">{value}</p>
                    <p className="font-mono text-[10px] text-muted mt-1 leading-tight">{label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
