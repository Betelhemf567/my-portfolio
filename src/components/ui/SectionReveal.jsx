import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

/**
 * Wraps children in a reveal animation triggered when the element enters the viewport.
 * @param {string} direction - 'up' | 'down' | 'left' | 'right' | 'none'
 * @param {number} delay - animation delay in seconds
 */
export default function SectionReveal({ children, direction = 'up', delay = 0, className = '', once = true }) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: once })

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
      x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.65,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
    >
      {children}
    </motion.div>
  )
}
