import { useState, useEffect, useRef } from 'react'

export function useCursor() {
  const cursorRef = useRef(null)
  const ringRef = useRef(null)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    // Only enable on non-touch devices
    if (window.matchMedia('(hover: none)').matches) return

    const cursor = cursorRef.current
    const ring = ringRef.current
    if (!cursor || !ring) return

    let mouseX = 0, mouseY = 0
    let ringX = 0, ringY = 0
    let animFrame

    const moveCursor = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      cursor.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px)`
    }

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      ring.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`
      animFrame = requestAnimationFrame(animateRing)
    }

    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, [data-cursor="pointer"]')) {
        setIsHovering(true)
        cursor.style.transform += ' scale(1.5)'
        ring.style.width = '56px'
        ring.style.height = '56px'
      }
    }

    const handleMouseOut = (e) => {
      if (e.target.closest('a, button, [data-cursor="pointer"]')) {
        setIsHovering(false)
        ring.style.width = '36px'
        ring.style.height = '36px'
      }
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mouseout', handleMouseOut)
    animFrame = requestAnimationFrame(animateRing)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mouseout', handleMouseOut)
      cancelAnimationFrame(animFrame)
    }
  }, [])

  return { cursorRef, ringRef, isHovering }
}
