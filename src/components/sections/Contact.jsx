import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiMapPin, FiGithub, FiLinkedin, FiTwitter, FiSend, FiDownload, FiCheck } from 'react-icons/fi'
import SectionHeader from '../ui/SectionHeader'
import SectionReveal from '../ui/SectionReveal'
import { personal } from '../../data/portfolio'

const socialLinks = [
  { icon: FiGithub, href: personal.socialLinks.github, label: 'GitHub' },
  { icon: FiLinkedin, href: personal.socialLinks.linkedin, label: 'LinkedIn' },
  { icon: FiTwitter, href: personal.socialLinks.twitter, label: 'Twitter' },
]

function ContactInfo() {
  return (
    <div className="space-y-5">
      {[
        { icon: FiMail, label: 'Email', value: personal.email, href: `mailto:${personal.email}` },
        { icon: FiMapPin, label: 'Location', value: personal.location, href: null },
      ].map(({ icon: Icon, label, value, href }) => (
        <div key={label} className="flex items-center gap-4">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: 'rgba(232,133,90,0.1)', color: 'var(--accent)' }}
          >
            <Icon size={18} />
          </div>
          <div>
            <p className="font-mono text-xs text-muted mb-0.5">{label}</p>
            {href ? (
              <a href={href} className="font-body font-medium text-sm hover:text-accent transition-colors" style={{ color: 'var(--text)' }}>
                {value}
              </a>
            ) : (
              <p className="font-body font-medium text-sm" style={{ color: 'var(--text)' }}>{value}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

/** Simple form field component */
function Field({ label, name, type = 'text', value, onChange, placeholder, textarea = false, required = true }) {
  return (
    <div>
      <label className="block font-mono text-xs text-muted mb-2 tracking-wide">{label}</label>
      {textarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows={5}
          className="w-full rounded-2xl px-5 py-4 font-body text-sm resize-none transition-all duration-200 outline-none"
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            color: 'var(--text)',
          }}
          onFocus={e => e.target.style.borderColor = 'var(--accent)'}
          onBlur={e => e.target.style.borderColor = 'var(--border)'}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="w-full rounded-2xl px-5 py-4 font-body text-sm transition-all duration-200 outline-none"
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            color: 'var(--text)',
          }}
          onFocus={e => e.target.style.borderColor = 'var(--accent)'}
          onBlur={e => e.target.style.borderColor = 'var(--border)'}
        />
      )}
    </div>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    // Simulate form submission — replace with your preferred service:
    // Formspree: fetch('https://formspree.io/f/YOUR_ID', { method: 'POST', ... })
    // EmailJS, Resend, etc.
    await new Promise(r => setTimeout(r, 1200))
    setStatus('success')
    setForm({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setStatus('idle'), 4000)
  }

  return (
    <section id="contact" className="section-padding" style={{ background: 'var(--bg)' }}>
      <div className="section-container">
        <SectionHeader
          label="Contact"
          title="Let's work together"
          subtitle="I'm actively looking for my next opportunity. Whether you have a project in mind or just want to say hi — my inbox is always open."
        />

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left: info */}
          <SectionReveal direction="right" className="lg:col-span-2">
            <div className="space-y-8">
              {/* Availability card */}
              <div
                className="glass-card rounded-3xl p-7"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-slow" />
                  <span className="font-mono text-xs text-muted tracking-wide uppercase">Available Now</span>
                </div>
                <h3 className="font-display font-semibold text-xl mb-2" style={{ color: 'var(--text)' }}>
                  Open to roles &amp; projects
                </h3>
                <p className="font-body text-sm text-muted mb-5 leading-relaxed">
                  I'm looking for junior frontend roles and also happy to take on freelance projects.
                  Response time is usually under 24 hours.
                </p>
                <a
                  href={personal.cvUrl}
                  download
                  className="btn-ghost text-sm flex items-center justify-center gap-2 w-full"
                >
                  <FiDownload size={15} />
                  Download CV
                </a>
              </div>

              {/* Contact details */}
              <div className="glass-card rounded-3xl p-7">
                <h4 className="font-mono text-xs text-muted uppercase tracking-widest mb-5">Direct contact</h4>
                <ContactInfo />
              </div>

              {/* Social links */}
              <div className="flex gap-3">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 glass-card rounded-2xl py-3 flex flex-col items-center gap-1 transition-colors duration-200 hover:text-accent"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    <Icon size={20} />
                    <span className="font-mono text-[10px]">{label}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </SectionReveal>

          {/* Right: form */}
          <SectionReveal direction="left" className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="glass-card rounded-3xl p-8 md:p-10 space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Your Name" name="name" value={form.name} onChange={handleChange} placeholder="Jane Smith" />
                <Field label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} placeholder="jane@company.com" />
              </div>
              <Field label="Subject" name="subject" value={form.subject} onChange={handleChange} placeholder="Let's build something together..." />
              <Field label="Message" name="message" value={form.message} onChange={handleChange} placeholder="Tell me about your project or opportunity..." textarea />

              <motion.button
                type="submit"
                disabled={status === 'sending' || status === 'success'}
                whileHover={status === 'idle' ? { scale: 1.01 } : {}}
                whileTap={status === 'idle' ? { scale: 0.99 } : {}}
                className="w-full btn-primary flex items-center justify-center gap-2 py-4 text-sm relative overflow-hidden"
              >
                {status === 'idle' && (
                  <>
                    <FiSend size={16} />
                    Send Message
                  </>
                )}
                {status === 'sending' && (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    />
                    Sending…
                  </>
                )}
                {status === 'success' && (
                  <>
                    <FiCheck size={16} />
                    Message Sent! I'll reply soon.
                  </>
                )}
              </motion.button>

              <p className="font-mono text-xs text-center text-muted">
                💬 Average response time: under 24 hours
              </p>
            </form>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
