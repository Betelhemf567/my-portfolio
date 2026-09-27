import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// Hooks
import { useTheme } from './hooks/useTheme'
import { useCursor } from './hooks/useCursor'

// UI Components
import Navbar from './components/ui/Navbar'
import LoadingScreen from './components/ui/LoadingScreen'
import { ScrollProgressBar, BackToTop } from './components/ui/ScrollHelpers'

// Section Components
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import Experience from './components/sections/Experience'
import Testimonials from './components/sections/Testimonials'
import Contact from './components/sections/Contact'
import Footer from './components/sections/Footer'

export default function App() {
  const { isDark, toggle } = useTheme()
  const { cursorRef, ringRef } = useCursor()
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading (remove if not needed)
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1600)
    return () => clearTimeout(timer)
  }, [])

  // Show cursor divs after mount (desktop only)
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.matchMedia('(hover: none)').matches) {
      if (cursorRef.current) cursorRef.current.style.display = 'block'
      if (ringRef.current) ringRef.current.style.display = 'block'
    }
  }, [cursorRef, ringRef])

  return (
    <>
      {/* Custom cursor elements */}
      <div ref={cursorRef} className="custom-cursor" />
      <div ref={ringRef} className="custom-cursor-ring" />

      {/* Loading screen */}
      <LoadingScreen isLoading={isLoading} />

      {/* Main app — fades in after loading */}
      <AnimatePresence>
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Global UI chrome */}
            <ScrollProgressBar />
            <Navbar isDark={isDark} toggleTheme={toggle} />
            <BackToTop />

            {/* Page sections */}
            <main>
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Experience />
              <Testimonials />
              <Contact />
            </main>

            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
