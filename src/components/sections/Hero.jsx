import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { FiGithub, FiLinkedin, FiTwitter, FiArrowDown, FiDownload } from 'react-icons/fi'
import { personal } from '../../data/portfolio'

/* ─── Animated canvas: particle field + aurora blobs ─── */
function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let W, H

    const PARTICLE_COUNT = 90
    const particles = []

    class Particle {
      constructor() { this.reset(true) }
      reset(initial = false) {
        this.x = Math.random() * W
        this.y = initial ? Math.random() * H : H + 10
        this.size = Math.random() * 1.8 + 0.4
        this.speedY = -(Math.random() * 0.5 + 0.2)
        this.speedX = (Math.random() - 0.5) * 0.3
        this.opacity = Math.random() * 0.5 + 0.1
        this.hue = Math.random() > 0.6 ? 22 : 240
      }
      update() {
        this.x += this.speedX
        this.y += this.speedY
        this.opacity -= 0.0008
        if (this.y < -10 || this.opacity <= 0) this.reset()
      }
      draw() {
        ctx.save()
        ctx.globalAlpha = this.opacity
        ctx.fillStyle = `hsl(${this.hue}, 85%, 70%)`
        ctx.shadowColor = `hsl(${this.hue}, 85%, 70%)`
        ctx.shadowBlur = 6
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    const blobs = [
      { x: 0.75, y: 0.25, r: 0.38, hue: 22,  speed: 0.0007 },
      { x: 0.15, y: 0.65, r: 0.30, hue: 240, speed: 0.0009 },
      { x: 0.55, y: 0.80, r: 0.25, hue: 160, speed: 0.0006 },
    ]
    let tick = 0

    const resize = () => {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle())

    const isDark = () => document.documentElement.classList.contains('dark')

    const draw = () => {
      tick++
      ctx.clearRect(0, 0, W, H)

      blobs.forEach(b => {
        const cx = W * (b.x + Math.sin(tick * b.speed) * 0.06)
        const cy = H * (b.y + Math.cos(tick * b.speed * 0.7) * 0.05)
        const r  = Math.min(W, H) * b.r
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
        const alpha = isDark() ? '0.13' : '0.07'
        grad.addColorStop(0, `hsla(${b.hue},80%,65%,${alpha})`)
        grad.addColorStop(1, 'hsla(0,0%,0%,0)')
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, W, H)
      })

      particles.forEach(p => { p.update(); p.draw() })

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx*dx + dy*dy)
          if (dist < 90) {
            ctx.save()
            ctx.globalAlpha = (1 - dist / 90) * 0.08
            ctx.strokeStyle = isDark() ? '#E8855A' : '#C9663D'
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
            ctx.restore()
          }
        }
      }

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  )
}

function AnimatedGrid() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hero-grid" width="56" height="56" patternUnits="userSpaceOnUse">
            <path d="M 56 0 L 0 0 0 56" fill="none" stroke="currentColor" strokeWidth="0.4" />
          </pattern>
          <radialGradient id="grid-fade" cx="30%" cy="50%" r="60%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="70%" stopColor="white" stopOpacity="1" />
          </radialGradient>
          <mask id="grid-mask">
            <rect width="100%" height="100%" fill="url(#grid-fade)" />
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#hero-grid)"
          className="text-gray-400 dark:text-gray-700 opacity-25"
          mask="url(#grid-mask)"
        />
      </svg>
    </div>
  )
}

function FloatingBadge({ label, x, y, delay }) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
      transition={{
        opacity: { delay, duration: 0.5 },
        scale:   { delay, duration: 0.5, type: 'spring' },
        y:       { delay, duration: 3.5 + delay * 0.5, repeat: Infinity, ease: 'easeInOut' },
      }}
    >
      <div
        className="glass-card rounded-xl px-3 py-1.5 font-mono text-xs font-medium"
        style={{ color: 'var(--text-muted)', whiteSpace: 'nowrap' }}
      >
        {label}
      </div>
    </motion.div>
  )
}

function GlowOrb({ style }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{ filter: 'blur(80px)', ...style }}
    />
  )
}

export default function Hero() {
  const scrollToAbout = () =>
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.5 } },
  }
  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'var(--bg)' }}
    >
      {/* Canvas particles + aurora */}
      <ParticleCanvas />

      {/* Grid overlay */}
      <AnimatedGrid />

      {/* Glow orbs */}
      <GlowOrb style={{ width: 500, height: 500, background: 'radial-gradient(circle, rgba(232,133,90,0.18) 0%, transparent 70%)', top: '-12%', right: '-6%' }} />
      <GlowOrb style={{ width: 380, height: 380, background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)', bottom: '5%', left: '-8%' }} />
      <GlowOrb style={{ width: 260, height: 260, background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)', top: '55%', right: '20%' }} />

      {/* Floating tech badges — desktop only */}
      <div className="hidden lg:block">
        <FloatingBadge label="⚛️  React"       x="70%" y="17%" delay={1.2} />
        <FloatingBadge label="💨 Tailwind CSS" x="76%" y="38%" delay={1.5} />
        <FloatingBadge label="🟡 JavaScript"   x="63%" y="60%" delay={1.8} />
        <FloatingBadge label="🔗 Git & GitHub" x="78%" y="74%" delay={2.0} />
        <FloatingBadge label="▲  Next.js"      x="58%" y="27%" delay={2.3} />
      </div>

      {/* Rotating accent rings */}
      <div className="absolute right-16 top-1/2 -translate-y-1/2 hidden xl:block pointer-events-none">
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            className="absolute rounded-full border"
            style={{
              width:  200 + i * 90,
              height: 200 + i * 90,
              top:  -(100 + i * 45),
              left: -(100 + i * 45),
              borderColor: `rgba(232,133,90,${0.14 - i * 0.04})`,
            }}
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 20 + i * 8, repeat: Infinity, ease: 'linear' }}
          >
            {/* Small dot on the ring */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
              style={{ background: `rgba(232,133,90,${0.6 - i * 0.15})` }}
            />
          </motion.div>
        ))}
      </div>

      {/* ── Main content ── */}
      <div className="section-container relative z-10 pt-28 pb-20">
        <motion.div variants={container} initial="hidden" animate="visible" className="max-w-3xl">

          {/* Status badge */}
          <motion.div variants={item} className="mb-8">
            <motion.span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs font-medium border"
              style={{ background: 'rgba(232,133,90,0.08)', borderColor: 'rgba(232,133,90,0.25)', color: 'var(--accent)' }}
              whileHover={{ scale: 1.04 }}
            >
              <motion.span
                className="w-2 h-2 rounded-full bg-green-400"
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              Available for new opportunities
            </motion.span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={item}
            className="font-display font-bold leading-[1.05] mb-4"
            style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', color: 'var(--text)' }}
          >
            Hi, I&apos;m{' '}
            <span className="relative inline-block">
              <span className="text-gradient">{personal.firstName}</span>
              <motion.span
                className="absolute -bottom-1 left-0 h-1 rounded-full"
                style={{ background: 'linear-gradient(90deg, var(--accent), transparent)' }}
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 1.2, duration: 0.8, ease: 'easeOut' }}
              />
            </span>
            <span className="text-gradient">.</span>
          </motion.h1>

          {/* Typing animation */}
          <motion.div
            variants={item}
            className="font-display text-xl md:text-2xl mb-6 font-medium"
            style={{ color: 'var(--text-muted)' }}
          >
            I{' '}
            <TypeAnimation
              sequence={[
                'build beautiful web experiences.', 2200,
                'turn designs into pixel-perfect code.', 2000,
                'craft interactive, animated UIs.', 2000,
                'love clean, blazing-fast interfaces.', 2200,
              ]}
              wrapper="span"
              speed={52}
              repeat={Infinity}
              style={{ color: 'var(--accent)', fontStyle: 'italic' }}
            />
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={item}
            className="font-body text-base md:text-lg leading-relaxed max-w-xl mb-10 text-muted"
          >
            Junior Frontend Web Developer — obsessing over pixels, performance,
            and experiences that users actually love.
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={item} className="flex flex-wrap gap-4 mb-12">
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: '0 12px 32px rgba(232,133,90,0.55)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary flex items-center gap-2"
            >
              View My Work
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >→</motion.span>
            </motion.button>
            <motion.a
              href={personal.cvUrl}
              download
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="btn-ghost flex items-center gap-2"
            >
              <FiDownload size={16} />
              Download CV
            </motion.a>
          </motion.div>

          {/* Social links */}
          <motion.div variants={item} className="flex items-center gap-4">
            <span className="font-mono text-xs tracking-widest uppercase text-muted hidden sm:block">
              Find me on
            </span>
            <div className="flex gap-3">
              {[
                { icon: FiGithub,   href: personal.socialLinks.github,   label: 'GitHub' },
                { icon: FiLinkedin, href: personal.socialLinks.linkedin,  label: 'LinkedIn' },
                { icon: FiTwitter,  href: personal.socialLinks.twitter,   label: 'Twitter' },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.18, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-11 h-11 rounded-full flex items-center justify-center border transition-colors duration-200 hover:border-accent hover:text-accent"
                  style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
                >
                  <Icon size={19} />
                </motion.a>
              ))}
            </div>
          </motion.div>

        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted hover:text-accent transition-colors duration-200"
        aria-label="Scroll down"
      >
        <span className="font-mono text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FiArrowDown size={18} />
        </motion.div>
      </motion.button>
    </section>
  )
}
