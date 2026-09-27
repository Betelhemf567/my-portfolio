import { useCursor } from '../../hooks/useCursor'

/** Custom cursor — only renders on devices with hover support (not touch) */
export default function CustomCursor() {
  const { cursorRef, ringRef } = useCursor()

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" style={{ display: 'none' }} />
      <div ref={ringRef} className="custom-cursor-ring" style={{ display: 'none' }} />
    </>
  )
}

// Show cursors only on non-touch devices
if (typeof window !== 'undefined' && !window.matchMedia('(hover: none)').matches) {
  document.addEventListener('DOMContentLoaded', () => {
    const cursors = document.querySelectorAll('.custom-cursor, .custom-cursor-ring')
    cursors.forEach(el => el.style.display = 'block')
  })
}
