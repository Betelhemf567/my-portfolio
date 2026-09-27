import SectionReveal from './SectionReveal'

/**
 * Consistent section header with label, title, and optional subtitle.
 */
export default function SectionHeader({ label, title, subtitle, align = 'left' }) {
  const alignClass = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  }[align]

  return (
    <div className={`max-w-2xl mb-16 ${alignClass}`}>
      <SectionReveal>
        <span className="section-label">{label}</span>
        <h2 className="section-title text-4xl md:text-5xl mt-3 mb-4 leading-tight">{title}</h2>
        {subtitle && (
          <p className="text-muted font-body text-base md:text-lg leading-relaxed">{subtitle}</p>
        )}
      </SectionReveal>
    </div>
  )
}
