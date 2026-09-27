import { FiGithub, FiLinkedin, FiTwitter, FiHeart } from 'react-icons/fi'
import { personal } from '../../data/portfolio'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="py-10 border-t"
      style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}
    >
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-display font-bold text-sm"
              style={{ background: 'var(--accent)' }}
            >
              {personal.firstName[0]}
            </div>
            <span className="font-mono text-sm font-medium" style={{ color: 'var(--text)' }}>
              {personal.name}
            </span>
          </div>

          {/* Copyright */}
          <p className="font-body text-sm text-muted flex items-center gap-1.5">
            Built with <FiHeart size={14} style={{ color: 'var(--accent)' }} /> in {year}
          </p>

          {/* Social */}
          <div className="flex gap-4">
            {[
              { icon: FiGithub, href: personal.socialLinks.github },
              { icon: FiLinkedin, href: personal.socialLinks.linkedin },
              { icon: FiTwitter, href: personal.socialLinks.twitter },
            ].map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-accent transition-colors duration-200"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
