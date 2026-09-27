import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi'
import { personal } from '../../data/portfolio'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar({ isDark, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMobileOpen(false)
    const target = document.querySelector(href)
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className={`mx-auto max-w-6xl px-6 md:px-10 lg:px-16 ${
          scrolled ? 'glass-card rounded-2xl py-3 mx-4 md:mx-8' : ''
        }`}>
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, '#hero')}
              className="flex items-center gap-2.5 group"
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-display font-bold text-base transition-transform duration-300 group-hover:rotate-6"
                style={{ background: 'var(--accent)' }}
              >
                {personal.firstName[0]}
              </div>
              <span className="font-mono text-sm font-medium hidden sm:block" style={{ color: 'var(--text)' }}>
                {personal.name}
              </span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="animated-underline font-body text-sm font-medium text-muted hover:text-accent transition-colors duration-200"
                  style={{ '--tw-text-opacity': 1 }}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)' }}
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isDark ? 'sun' : 'moon'}
                    initial={{ rotate: -30, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 30, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {isDark ? <FiSun size={16} /> : <FiMoon size={16} />}
                  </motion.div>
                </AnimatePresence>
              </button>

              {/* CTA */}
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="btn-primary text-sm hidden md:block"
              >
                Hire Me
              </a>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: 'var(--bg-secondary)', color: 'var(--text)' }}
              >
                {mobileOpen ? <FiX size={18} /> : <FiMenu size={18} />}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 md:hidden glass-card"
            style={{ backdropFilter: 'blur(24px)' }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="font-display text-3xl font-semibold hover:text-accent transition-colors duration-200"
                  style={{ color: 'var(--text)' }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.06 }}
                className="btn-primary mt-4"
              >
                Hire Me
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
