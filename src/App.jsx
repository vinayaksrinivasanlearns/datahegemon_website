import { useState, useEffect, useRef } from 'react'

// Animated counter hook
function useCounter(end, duration = 2000) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const start = 0
        const startTime = performance.now()
        const animate = (now) => {
          const elapsed = now - startTime
          const progress = Math.min(elapsed / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setCount(Math.floor(start + (end - start) * eased))
          if (progress < 1) requestAnimationFrame(animate)
        }
        requestAnimationFrame(animate)
      }
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end, duration])

  return [count, ref]
}

// Fade-in on scroll hook
function useFadeIn() {
  const ref = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    }, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return ref
}

// SVG Illustrations
const HeroSVG = () => (
  <svg viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="hero-svg">
    {/* Dashboard mockup */}
    <rect x="50" y="40" width="400" height="280" rx="16" fill="white" stroke="#A8D5AB" strokeWidth="2" className="float-slow" />
    <rect x="50" y="40" width="400" height="50" rx="16" fill="url(#heroGrad)" />
    <rect x="50" y="74" width="400" height="16" fill="url(#heroGrad)" />
    <circle cx="80" cy="65" r="8" fill="#fff" opacity="0.5" />
    <circle cx="105" cy="65" r="8" fill="#fff" opacity="0.3" />
    <circle cx="130" cy="65" r="8" fill="#fff" opacity="0.2" />
    <text x="200" y="70" fill="white" fontSize="14" fontWeight="700" textAnchor="middle" fontFamily="Inter, sans-serif">DataHegemon Dashboard</text>
    {/* Chart bars */}
    <rect x="80" y="220" width="40" height="70" rx="4" fill="#A8D5AB" className="bar bar-1" />
    <rect x="140" y="180" width="40" height="110" rx="4" fill="#7BC67E" className="bar bar-2" />
    <rect x="200" y="150" width="40" height="140" rx="4" fill="#4CAF50" className="bar bar-3" />
    <rect x="260" y="130" width="40" height="160" rx="4" fill="#2D7A4B" className="bar bar-4" />
    <rect x="320" y="110" width="40" height="180" rx="4" fill="#1A4D2E" className="bar bar-5" />
    {/* Line chart overlay */}
    <polyline points="100,210 160,170 220,145 280,120 340,100" stroke="#4CAF50" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" className="draw-line" />
    <circle cx="100" cy="210" r="5" fill="#4CAF50" className="pulse-dot" />
    <circle cx="160" cy="170" r="5" fill="#4CAF50" className="pulse-dot" style={{animationDelay: '0.2s'}} />
    <circle cx="220" cy="145" r="5" fill="#4CAF50" className="pulse-dot" style={{animationDelay: '0.4s'}} />
    <circle cx="280" cy="120" r="5" fill="#4CAF50" className="pulse-dot" style={{animationDelay: '0.6s'}} />
    <circle cx="340" cy="100" r="5" fill="#4CAF50" className="pulse-dot" style={{animationDelay: '0.8s'}} />
    {/* Arrow up indicator */}
    <g transform="translate(380, 100)" className="float">
      <rect x="-20" y="-20" width="60" height="30" rx="8" fill="#E8F5E9" />
      <text x="10" y="-1" fill="#2D7A4B" fontSize="12" fontWeight="700" textAnchor="middle">+24%</text>
    </g>
    {/* Rupee floating icons */}
    <g className="float" style={{animationDelay: '0s'}}>
      <circle cx="430" cy="180" r="20" fill="#E8F5E9" />
      <text x="430" y="186" fill="#2D7A4B" fontSize="16" fontWeight="700" textAnchor="middle">&#8377;</text>
    </g>
    <g className="float" style={{animationDelay: '1s'}}>
      <circle cx="30" cy="150" r="16" fill="#E8F5E9" />
      <text x="30" y="155" fill="#2D7A4B" fontSize="13" fontWeight="700" textAnchor="middle">&#8377;</text>
    </g>
    {/* SMS notification popup */}
    <g transform="translate(350, 200)" className="float-slow">
      <rect x="0" y="0" width="100" height="60" rx="10" fill="white" filter="url(#shadow)" />
      <rect x="8" y="8" width="30" height="30" rx="8" fill="#E8F5E9" />
      <text x="23" y="28" fill="#2D7A4B" fontSize="14" textAnchor="middle">&#9993;</text>
      <rect x="46" y="12" width="46" height="6" rx="3" fill="#A8D5AB" />
      <rect x="46" y="24" width="32" height="6" rx="3" fill="#E8F5E9" />
      <text x="50" y="52" fill="#4CAF50" fontSize="9" fontWeight="600">SMS Sent!</text>
    </g>
    <defs>
      <linearGradient id="heroGrad" x1="50" y1="40" x2="450" y2="40">
        <stop offset="0%" stopColor="#2D7A4B" />
        <stop offset="100%" stopColor="#4CAF50" />
      </linearGradient>
      <filter id="shadow" x="-10%" y="-10%" width="130%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#1A4D2E" floodOpacity="0.1" />
      </filter>
    </defs>
  </svg>
)

const ServiceIcons = {
  receivables: (
    <svg viewBox="0 0 56 56" fill="none" className="service-svg">
      <rect width="56" height="56" rx="14" fill="url(#svcGrad)" />
      <path d="M18 38V22l10-6 10 6v16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M24 38v-8h8v8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="28" cy="26" r="3" stroke="white" strokeWidth="2" />
      <defs><linearGradient id="svcGrad" x1="0" y1="0" x2="56" y2="56"><stop stopColor="#2D7A4B" /><stop offset="1" stopColor="#4CAF50" /></linearGradient></defs>
    </svg>
  ),
  sms: (
    <svg viewBox="0 0 56 56" fill="none" className="service-svg">
      <rect width="56" height="56" rx="14" fill="url(#svcGrad2)" />
      <rect x="16" y="14" width="24" height="28" rx="4" stroke="white" strokeWidth="2" />
      <line x1="22" y1="20" x2="34" y2="20" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <line x1="22" y1="26" x2="30" y2="26" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <circle cx="28" cy="36" r="2" fill="white" />
      <path d="M36 22l6-4v16l-6-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <defs><linearGradient id="svcGrad2" x1="0" y1="0" x2="56" y2="56"><stop stopColor="#2D7A4B" /><stop offset="1" stopColor="#4CAF50" /></linearGradient></defs>
    </svg>
  ),
  voice: (
    <svg viewBox="0 0 56 56" fill="none" className="service-svg">
      <rect width="56" height="56" rx="14" fill="url(#svcGrad3)" />
      <path d="M20 24c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <path d="M24 24c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <circle cx="28" cy="24" r="2" fill="white" />
      <path d="M28 26v6" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <path d="M22 32h12l2 8H20l2-8z" stroke="white" strokeWidth="2" strokeLinejoin="round" />
      <defs><linearGradient id="svcGrad3" x1="0" y1="0" x2="56" y2="56"><stop stopColor="#2D7A4B" /><stop offset="1" stopColor="#4CAF50" /></linearGradient></defs>
    </svg>
  ),
  payables: (
    <svg viewBox="0 0 56 56" fill="none" className="service-svg">
      <rect width="56" height="56" rx="14" fill="url(#svcGrad4)" />
      <rect x="14" y="18" width="28" height="20" rx="3" stroke="white" strokeWidth="2" />
      <path d="M14 26h28" stroke="white" strokeWidth="2" />
      <circle cx="28" cy="32" r="3" stroke="white" strokeWidth="1.5" />
      <text x="28" y="35" fill="white" fontSize="6" fontWeight="700" textAnchor="middle">&#8377;</text>
      <path d="M20 18v-4h16v4" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <defs><linearGradient id="svcGrad4" x1="0" y1="0" x2="56" y2="56"><stop stopColor="#2D7A4B" /><stop offset="1" stopColor="#4CAF50" /></linearGradient></defs>
    </svg>
  ),
  analytics: (
    <svg viewBox="0 0 56 56" fill="none" className="service-svg">
      <rect width="56" height="56" rx="14" fill="url(#svcGrad5)" />
      <rect x="16" y="32" width="6" height="10" rx="1" fill="white" opacity="0.6" />
      <rect x="25" y="24" width="6" height="18" rx="1" fill="white" opacity="0.8" />
      <rect x="34" y="16" width="6" height="26" rx="1" fill="white" />
      <polyline points="18,28 28,20 37,14" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
      <polygon points="37,10 41,14 37,16" fill="white" />
      <defs><linearGradient id="svcGrad5" x1="0" y1="0" x2="56" y2="56"><stop stopColor="#2D7A4B" /><stop offset="1" stopColor="#4CAF50" /></linearGradient></defs>
    </svg>
  ),
  import: (
    <svg viewBox="0 0 56 56" fill="none" className="service-svg">
      <rect width="56" height="56" rx="14" fill="url(#svcGrad6)" />
      <path d="M20 14h10l8 8v20a2 2 0 01-2 2H20a2 2 0 01-2-2V16a2 2 0 012-2z" stroke="white" strokeWidth="2" />
      <path d="M30 14v8h8" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <path d="M24 28h8M24 33h6" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <path d="M28 38v6m0 0l-3-3m3 3l3-3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0" />
      <defs><linearGradient id="svcGrad6" x1="0" y1="0" x2="56" y2="56"><stop stopColor="#2D7A4B" /><stop offset="1" stopColor="#4CAF50" /></linearGradient></defs>
    </svg>
  ),
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const [msmeCount, msmeRef] = useCounter(500, 2000)
  const [smsCount, smsRef] = useCounter(10000, 2500)
  const [collectionCount, collectionRef] = useCounter(95, 1800)

  const aboutRef = useFadeIn()
  const servicesRef = useFadeIn()
  const stepsRef = useFadeIn()
  const commRef = useFadeIn()
  const contactRef = useFadeIn()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <>
      {/* Navbar */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="navbar-logo">
            <img src="/logo-icon.png" alt="DataHegemon" />
            <span>DataHegemon</span>
          </div>
          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <a onClick={() => scrollTo('about')}>About</a>
            <a onClick={() => scrollTo('services')}>Services</a>
            <a onClick={() => scrollTo('how-it-works')}>How It Works</a>
            <a onClick={() => scrollTo('communication')}>Channels</a>
            <a onClick={() => scrollTo('contact')} className="btn-nav">Contact Us</a>
          </div>
          <button className="nav-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span className={menuOpen ? 'open' : ''}></span>
            <span className={menuOpen ? 'open' : ''}></span>
            <span className={menuOpen ? 'open' : ''}></span>
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero" id="hero">
        <div className="hero-bg-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-dot"></span>
              B2B Fintech for Indian MSMEs
            </div>
            <h1>
              Smart <span className="highlight">Receivables &<br />Payables</span> Tracker<br />for Your Business
            </h1>
            <p>
              DataHegemon helps Micro, Small & Medium Enterprises manage trade credit,
              track outstanding payments, and send automated reminders — so you get paid faster.
            </p>
            <div className="hero-buttons">
              <button className="btn-primary" onClick={() => scrollTo('contact')}>
                Get Started
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10h12m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <button className="btn-secondary" onClick={() => scrollTo('how-it-works')}>
                How It Works
              </button>
            </div>
          </div>
          <div className="hero-visual">
            <HeroSVG />
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            <div className="stat" ref={msmeRef}>
              <span className="stat-number">{msmeCount}+</span>
              <span className="stat-label">MSMEs Served</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat" ref={smsRef}>
              <span className="stat-number">{smsCount.toLocaleString()}+</span>
              <span className="stat-label">Reminders Sent</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat" ref={collectionRef}>
              <span className="stat-number">{collectionCount}%</span>
              <span className="stat-label">Collection Rate</span>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="section fade-section" id="about" ref={aboutRef}>
        <div className="container">
          <div className="section-header">
            <h2>About Us</h2>
            <div className="section-divider"></div>
          </div>
          <div className="about-grid">
            <div className="about-text">
              <h3>Empowering Indian MSMEs with Smarter Financial Management</h3>
              <p>
                DataHegemon is a B2B fintech platform that helps Micro, Small & Medium
                Enterprises (MSMEs) manage their trade credit and receivables efficiently.
              </p>
              <p>
                We understand the challenges Indian businesses face with delayed payments
                and manual tracking. Our platform automates the entire receivables and
                payables workflow — from data import to payment collection.
              </p>
            </div>
            <div className="about-features">
              {[
                { icon: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>, title: 'Receivables & Payables Tracking', desc: 'Track every rupee owed to you and by you in one dashboard' },
                { icon: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>, title: 'Automated SMS Reminders', desc: 'Send payment reminders automatically for outstanding dues' },
                { icon: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.12.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.58 2.81.7A2 2 0 0122 16.92z"/></svg>, title: 'Voice Call Reminders', desc: 'Automated voice calls for payment collection' },
                { icon: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/><path d="M12 18v-6"/><path d="M9 15h6"/></svg>, title: 'Excel & Tally Import', desc: 'Import data from Tally, Zoho, Vyapar, or Excel in seconds' },
                { icon: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg>, title: 'Business Dashboard', desc: 'Visual overview of pending payments, aging reports, and cash flow' },
              ].map((f, i) => (
                <div className="about-feature" key={i} style={{animationDelay: `${i * 0.1}s`}}>
                  <div className="about-feature-icon">{f.icon}</div>
                  <div>
                    <h4>{f.title}</h4>
                    <p>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section section-alt fade-section" id="services" ref={servicesRef}>
        <div className="container">
          <div className="section-header">
            <h2>Our Services</h2>
            <p>Everything you need to manage your business finances</p>
            <div className="section-divider"></div>
          </div>
          <div className="services-grid">
            {[
              { svg: ServiceIcons.receivables, title: 'Receivables Management', desc: 'Track money owed to your business by customers for goods and services sold on credit. Never lose track of a pending payment again.' },
              { svg: ServiceIcons.sms, title: 'Payment Reminder SMS', desc: 'Automated SMS reminders to customers about pending payments for goods purchased on trade credit. Available in Hindi and English.' },
              { svg: ServiceIcons.voice, title: 'Voice Call Reminders', desc: 'Automated voice call reminders to customers for payment collection of outstanding dues. Personalized with amount and due date.' },
              { svg: ServiceIcons.payables, title: 'Payables Tracking', desc: 'Track money your business owes to suppliers and vendors. Stay on top of your obligations and maintain healthy vendor relationships.' },
              { svg: ServiceIcons.analytics, title: 'Business Analytics', desc: 'Dashboard showing aging reports, overdue payments, and cash flow insights to help you make informed financial decisions.' },
              { svg: ServiceIcons.import, title: 'Easy Data Import', desc: 'Import data seamlessly from Tally, Zoho Books, Vyapar, or plain Excel/CSV files. Auto-detection of column mappings saves time.' },
            ].map((s, i) => (
              <div className="service-card" key={i} style={{animationDelay: `${i * 0.1}s`}}>
                <div className="service-icon-wrap">{s.svg}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section fade-section" id="how-it-works" ref={stepsRef}>
        <div className="container">
          <div className="section-header">
            <h2>How It Works</h2>
            <p>Get started in 4 simple steps</p>
            <div className="section-divider"></div>
          </div>
          <div className="steps">
            <div className="steps-line"></div>
            {[
              { num: '1', icon: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>, title: 'Upload Data', desc: 'Upload your customer/supplier data from Excel, Tally, Zoho, or Vyapar' },
              { num: '2', icon: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>, title: 'Track Invoices', desc: 'System automatically tracks invoices, due dates, and overdue payments' },
              { num: '3', icon: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>, title: 'Send Reminders', desc: 'Automated SMS and voice call reminders sent for pending payments' },
              { num: '4', icon: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>, title: 'Track & Collect', desc: 'Monitor payment status on your dashboard and track collections' },
            ].map((s, i) => (
              <div className="step" key={i} style={{animationDelay: `${i * 0.15}s`}}>
                <div className="step-number">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Communication Channels */}
      <section className="section section-alt fade-section" id="communication" ref={commRef}>
        <div className="container">
          <div className="section-header">
            <h2>Communication Channels</h2>
            <p>Multiple ways to reach your customers for payment collection</p>
            <div className="section-divider"></div>
          </div>
          <div className="comm-grid">
            <div className="comm-card">
              <div className="comm-icon-wrap">
                <svg viewBox="0 0 48 48" fill="none">
                  <rect width="48" height="48" rx="12" fill="url(#commG1)" />
                  <rect x="12" y="8" width="24" height="32" rx="4" stroke="white" strokeWidth="2" />
                  <circle cx="24" cy="34" r="2" fill="white" />
                  <line x1="18" y1="14" x2="30" y2="14" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <line x1="18" y1="19" x2="26" y2="19" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <defs><linearGradient id="commG1" x1="0" y1="0" x2="48" y2="48"><stop stopColor="#2D7A4B" /><stop offset="1" stopColor="#4CAF50" /></linearGradient></defs>
                </svg>
              </div>
              <h3>SMS Reminders</h3>
              <ul>
                <li>Payment due reminders for goods/services supplied on credit</li>
                <li>Overdue payment notifications with amount and due date</li>
                <li>Invoice confirmations and payment acknowledgements</li>
                <li>Available in Hindi and English</li>
              </ul>
            </div>
            <div className="comm-card">
              <div className="comm-icon-wrap">
                <svg viewBox="0 0 48 48" fill="none">
                  <rect width="48" height="48" rx="12" fill="url(#commG2)" />
                  <path d="M34 29.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 0116.11 13h3a2 2 0 012 1.72c.12.96.36 1.9.7 2.81a2 2 0 01-.45 2.11l-1.27 1.27a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.58 2.81.7A2 2 0 0134 29.92z" stroke="white" strokeWidth="2" />
                  <defs><linearGradient id="commG2" x1="0" y1="0" x2="48" y2="48"><stop stopColor="#2D7A4B" /><stop offset="1" stopColor="#4CAF50" /></linearGradient></defs>
                </svg>
              </div>
              <h3>Voice Call Reminders</h3>
              <ul>
                <li>Automated voice calls for payment collection</li>
                <li>Personalized payment reminders with amount and due date</li>
                <li>Follow-up calls for overdue payments</li>
                <li>Professional and courteous automated messaging</li>
              </ul>
            </div>
          </div>
          <div className="comm-note">
            All communications are sent only to registered business customers
            who have existing trade relationships with our clients.
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="section fade-section" id="contact" ref={contactRef}>
        <div className="container">
          <div className="section-header">
            <h2>Contact Us</h2>
            <p>Get in touch to start managing your receivables smarter</p>
            <div className="section-divider"></div>
          </div>
          <div className="contact-content">
            <div className="contact-info">
              <h3>Let's Talk Business</h3>
              <p>
                Ready to streamline your receivables and payables management?
                Reach out to us and we'll help you get started.
              </p>
              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-item-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#2D7A4B" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  </div>
                  <div>
                    <span>Email</span><br />
                    <a href="mailto:info@datahegemon.co.in">info@datahegemon.co.in</a>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-item-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#2D7A4B" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
                  </div>
                  <div>
                    <span>Website</span><br />
                    <a href="https://datahegemon.co.in" target="_blank" rel="noopener noreferrer">www.datahegemon.co.in</a>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-item-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#2D7A4B" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <div>
                    <span>Location</span><br />
                    <span>India</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="contact-form">
              <h3>Send us a message</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Your Name</label>
                  <input type="text" placeholder="Enter your name" />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" placeholder="Enter your email" />
                </div>
              </div>
              <div className="form-group">
                <label>Business Name</label>
                <input type="text" placeholder="Your company name" />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea placeholder="Tell us about your business needs..."></textarea>
              </div>
              <button className="btn-primary">
                Send Message
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10h12m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-logo">
                <img src="/logo-icon.png" alt="DataHegemon" />
                <span>DataHegemon</span>
              </div>
              <p>
                B2B fintech platform helping Indian MSMEs manage
                trade credit, receivables, and payment collections efficiently.
              </p>
            </div>
            <div>
              <h4>Quick Links</h4>
              <ul>
                <li><a onClick={() => scrollTo('about')}>About Us</a></li>
                <li><a onClick={() => scrollTo('services')}>Services</a></li>
                <li><a onClick={() => scrollTo('how-it-works')}>How It Works</a></li>
                <li><a onClick={() => scrollTo('contact')}>Contact</a></li>
              </ul>
            </div>
            <div>
              <h4>Services</h4>
              <ul>
                <li><a onClick={() => scrollTo('services')}>Receivables Management</a></li>
                <li><a onClick={() => scrollTo('services')}>SMS Reminders</a></li>
                <li><a onClick={() => scrollTo('services')}>Voice Call Reminders</a></li>
                <li><a onClick={() => scrollTo('services')}>Business Analytics</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>&copy; 2026 DataHegemon. All rights reserved.</span>
            <div className="footer-badges">
              <span className="badge">Registered Business</span>
              <span className="badge">MSME</span>
              <span className="badge">Made in India</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
