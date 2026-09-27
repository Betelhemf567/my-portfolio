import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowUp } from 'react-icons/fi'
import { useScrollProgress } from '../../hooks/useScrollProgress'

/** Thin progress bar at the very top of the viewport */
export function ScrollProgressBar() {
  const progress = useScrollProgress()

  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX: progress / 100, transformOrigin: 'left' }}
    />
  )
}

/** Floating back-to-top button that appears after scrolling down */
export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg"
          style={{ background: 'var(--accent)', boxShadow: '0 4px 20px rgba(232,133,90,0.4)' }}
          aria-label="Back to top"
        >
          <FiArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
