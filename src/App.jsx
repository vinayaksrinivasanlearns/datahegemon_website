import { useState, useEffect, useRef } from 'react'

const APP_URL = 'https://app.datahegemon.co.in'
const EMAIL = 'info@datahegemon.co.in'

// Fade-in on scroll hook
function useFadeIn() {
  const ref = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) entry.target.classList.add('visible')
    }, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return ref
}

const icon = (d) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{d}</svg>
)

const ICONS = {
  bank: icon(<><path d="M3 10l9-6 9 6" /><path d="M5 10v8M9 10v8M15 10v8M19 10v8" /><path d="M3 20h18" /></>),
  proof: icon(<><rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="9" cy="11" r="2" /><path d="M21 17l-5-5-8 7" /></>),
  receipt: icon(<><path d="M6 2h12v20l-3-2-3 2-3-2-3 2z" /><path d="M9 7h6M9 11h6M9 15h4" /></>),
  bell: icon(<><path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 01-3.4 0" /></>),
  join: icon(<><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><path d="M14 14h3v3h-3zM20 14v.01M14 20h.01M17 20h4v-3" /></>),
  fee: icon(<><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>),
  chart: icon(<><path d="M18 20V10" /><path d="M12 20V4" /><path d="M6 20v-6" /></>),
  support: icon(<><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></>),
  shield: icon(<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></>),
  upload: icon(<><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></>),
  check: icon(<><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></>),
  send: icon(<><path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4 20-7z" /></>),
  fix: icon(<><path d="M14.7 6.3a4 4 0 00-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 005.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z" /></>),
  noc: icon(<><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6" /><path d="M9 15l2 2 4-4" /></>),
}

const FEATURES = [
  { i: ICONS.bank, t: 'Bank statement matching', d: 'Upload the statement as PDF, Excel or CSV. Payments are matched to flats using UPI notes, UTR numbers and residents’ payment proofs. Rows that need a look are marked in yellow.' },
  { i: ICONS.proof, t: 'Payment proof on WhatsApp', d: 'Residents tap “I’ve paid” and send a screenshot, a PDF receipt or just the UTR. Every admin sees it next to what the bank statement shows.' },
  { i: ICONS.receipt, t: 'Numbered PDF receipts', d: 'Once you confirm the finalized Excel, receipts are numbered and sent to each payer on WhatsApp. Old receipts can be downloaded any time.' },
  { i: ICONS.fix, t: 'Fix a receipt', d: 'A payment on the wrong flat, in the wrong month, with the wrong amount, or not a dues payment at all. The receipt is cancelled with the reason, a corrected one is made, and the resident is told.' },
  { i: ICONS.bell, t: 'Reminders & unpaid notices', d: 'A short reminder for flats that still owe, or a payment reminder PDF for dues a month or more overdue. Download all notices to print.' },
  { i: ICONS.join, t: 'QR join with admin approval', d: 'Residents scan the society QR and send JOIN. A new number just sends its name and flat, and the admin approves it as owner or tenant.' },
  { i: ICONS.noc, t: 'NOC on WhatsApp', d: 'Selling or moving out? A resident with no dues requests a No Objection Certificate; the admin issues a numbered NOC PDF, with a slip for security, straight to their WhatsApp.' },
  { i: ICONS.fee, t: 'Late fees, your society’s rules', d: 'Grace months, a fixed fee, a monthly fee, a percentage or slabs, with an optional cap. Changes apply from a chosen month, never backwards.' },
  { i: ICONS.chart, t: 'Dashboard & reports', d: 'Collected, pending and every flat’s status in one picture. Maintenance dues, unpaid list and no-dues receipts as Excel or PDF.' },
  { i: ICONS.support, t: 'Built-in support', d: 'Residents and admins send SUPPORT with a message or a screenshot and get a ticket number back on WhatsApp.' },
]

const STEPS = [
  { i: ICONS.upload, t: 'Upload the bank statement', d: 'Send the month’s statement to the bot. It reads it and matches payment proofs.' },
  { i: ICONS.chart, t: 'Check maintenance dues', d: 'See who paid and who hasn’t. Download the Excel, check the yellow rows, correct if needed.' },
  { i: ICONS.check, t: 'Import & confirm', d: 'Send the finalized Excel back. Check the summary and tap Confirm. Receipts are made.' },
  { i: ICONS.send, t: 'Send receipts & reminders', d: 'Payers get their receipt PDF. Flats that owe get a reminder or a notice.' },
]

// End-to-end flow, from setup to receipts. who: 'admin' | 'resident' | 'system'
const FLOW = [
  { phase: 'Once: setting up', items: [
    { who: 'admin', t: 'Society is set up', d: 'We create the society. The committee fills the setup Excel: flats, maintenance amount, opening balance and residents’ mobile numbers.' },
    { who: 'system', t: 'QR codes are made', d: 'A Resident QR for the notice board and an Admin QR for the committee. Scanning opens WhatsApp with JOIN <code> ready to send.' },
    { who: 'admin', t: 'Residents change in the same Excel', d: 'Later, tap Update setup Excel to get today’s setup, add or remove residents, owners or tenants, and send it back. Every change is listed before Confirm.' },
  { who: 'resident', t: 'Residents join', d: 'Numbers already on the list are linked to their flat at once. A new number sends just its name and flat number.' },
    { who: 'admin', t: 'Admin approves new numbers', d: 'Every admin gets the request with the name, flat and the last digits of the mobile. Approve as owner or tenant, or reject.' },
  ] },
  { phase: 'Every month: collecting', items: [
    { who: 'resident', t: 'Resident checks the balance', d: 'Sends hi and sees each flat, the month and the balance due, with I’ve paid, Receipts and More (NOC, Support) buttons.' },
    { who: 'resident', t: 'Resident pays and sends proof', d: 'Pays the society directly by UPI or bank transfer, then sends a screenshot, PDF or the UTR, with an optional note.' },
    { who: 'admin', t: 'Treasurer uploads the bank statement', d: 'PDF, Excel or CSV from net banking. Several files are fine; a payment in two files is counted once.' },
    { who: 'system', t: 'Payments are matched', d: 'Credits are matched to flats using UPI notes, UTR numbers in the proofs and payers seen before. The result is Maintenance_dues.xlsx, with rows to check in yellow.' },
    { who: 'admin', t: 'Committee checks and confirms', d: 'Corrects the yellow rows, adds cash payments and sends the finalized Excel back. Nothing is saved until Confirm.' },
    { who: 'system', t: 'Receipts are numbered', d: 'Each payment gets its own receipt number that is never reused, with late fee, arrears and this month shown separately.' },
  ] },
  { phase: 'Every month: closing', items: [
    { who: 'admin', t: 'Send receipts', d: 'One tap sends every payer their receipt PDF on WhatsApp, with a summary of who got it.' },
    { who: 'admin', t: 'Remind unpaid flats', d: 'A short reminder, or a payment reminder PDF for dues a month or more overdue. Late fees are added by the society’s rule.' },
    { who: 'resident', t: 'Residents get receipts and reminders', d: 'Receipts arrive on their own. Old ones are under Receipts. If a proof did not match, the resident is asked to send it again.' },
  ] },
  { phase: 'Any time', items: [
    { who: 'admin', t: 'Fix a receipt', d: 'Recorded on the wrong flat, month or amount? Menu → Fix a receipt shows each flat’s balance before → after. On Confirm the receipt is cancelled (kept, with the reason) and a corrected one is made; later months follow.' },
    { who: 'system', t: 'The resident is told', d: 'If the cancelled receipt had reached them, the resident hears it was cancelled and why, and gets the corrected receipt at once.' },
    { who: 'resident', t: 'Resident requests an NOC', d: 'Selling the flat or moving out: More → Request NOC. Only a flat with no dues can ask; owners for resale or vacating, tenants for vacating.' },
    { who: 'admin', t: 'Admin issues the NOC', d: 'Every admin gets the request with the flat and its dues. Issue NOC makes a numbered PDF: the resident gets it on WhatsApp, with a slip to give security on the day they leave.' },
  ] },
]

// Number the steps 1..N across all phases
FLOW.flatMap((p) => p.items).forEach((it, i) => { it.n = i + 1 })

const WHO = {
  resident: { label: 'Resident', emoji: '🏠' },
  admin: { label: 'Committee', emoji: '📋' },
  system: { label: 'System', emoji: '⚙️' },
}

const VIDEOS = {
  resident: {
    label: 'For residents',
    short: { src: '/videos/resident-guide-short.mp4', label: 'Quick tour' },
    full: { src: '/videos/resident-guide-full.mp4', label: 'Full guide' },
    blurb: 'Join with the society QR, check your balance, send payment proof, get receipts, request an NOC and ask for help.',
  },
  admin: {
    label: 'For committee admins',
    short: { src: '/videos/admin-guide-short.mp4', label: 'Quick tour' },
    full: { src: '/videos/admin-guide-full.mp4', label: 'Full guide' },
    blurb: 'The monthly cycle: upload the bank statement, check dues, import the finalized Excel, send receipts and remind unpaid flats. Plus fixing a receipt and issuing NOCs.',
  },
}

const GUIDES = {
  resident: { label: 'Resident steps', src: '/guides/resident-steps.html' },
  admin: { label: 'Admin steps', src: '/guides/admin-steps.html' },
}

// Small WhatsApp-style phone used in the hero
const HeroPhone = () => (
  <div className="hp-phone float-slow" aria-hidden="true">
    <div className="hp-screen">
      <div className="hp-head">
        <div className="hp-avatar">🏢</div>
        <div><b>Apartment Management System</b><span>Business account</span></div>
      </div>
      <div className="hp-chat">
        <div className="hp-chip">Today</div>
        <div className="hp-row me"><div className="hp-bubble">hi<span className="hp-meta">09:15 <i>✓✓</i></span></div></div>
        <div className="hp-row bot">
          <div className="hp-bubble">
            👋 Hi <b>Ravi</b>!<br /><br />🏢 <b>Green Valley Apartments</b><br />🏠 Flat A-102 · Oct-2026<br />💰 Balance due: <b>₹3,100</b>
            <span className="hp-meta">09:15</span>
          </div>
          <div className="hp-btns"><div>💸 I&apos;ve paid</div><div>🧾 Receipts</div><div>📋 More</div></div>
        </div>
        <div className="hp-row bot">
          <div className="hp-bubble">
            <div className="hp-doc"><div className="hp-pdf">PDF</div><div><b>GV-2026-10-0001.pdf</b><span>1 page · PDF</span></div></div>
            🧾 Receipt GV/2026/10/0001<br />Thank you for your payment!
            <span className="hp-meta">18:41</span>
          </div>
        </div>
      </div>
    </div>
  </div>
)

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [videoWho, setVideoWho] = useState('resident')
  const [videoLen, setVideoLen] = useState('short')
  const [guide, setGuide] = useState('resident')
  const [form, setForm] = useState({ 'bot-field': '', name: '', email: '', phone: '', society: '', message: '' })
  const [sendState, setSendState] = useState('idle') // idle | sending | sent | error

  const residentsRef = useFadeIn()
  const featuresRef = useFadeIn()
  const stepsRef = useFadeIn()
  const flowRef = useFadeIn()
  const videosRef = useFadeIn()
  const guideRef = useFadeIn()
  const trustRef = useFadeIn()
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

  const video = VIDEOS[videoWho][videoLen]

  // Netlify Forms: the hidden <form name="contact"> in index.html registers the fields at deploy
  // time; submissions are emailed to info@datahegemon.co.in (Netlify → Forms → notifications).
  const sendForm = async (e) => {
    e.preventDefault()
    setSendState('sending')
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ 'form-name': 'contact', ...form }).toString(),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setSendState('sent')
    } catch {
      setSendState('error')
    }
  }
  const field = (k) => ({ value: form[k], onChange: (e) => setForm({ ...form, [k]: e.target.value }) })

  return (
    <>
      {/* Navbar */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <a className="navbar-logo" onClick={() => scrollTo('hero')}>
            <img src="/logo-icon.png" alt="" />
            <span>DataHegemon</span>
          </a>
          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <a onClick={() => scrollTo('features')}>Features</a>
            <a onClick={() => scrollTo('how-it-works')}>How It Works</a>
            <a onClick={() => scrollTo('flow')}>Full Flow</a>
            <a onClick={() => scrollTo('videos')}>Videos</a>
            <a onClick={() => scrollTo('guide')}>Try the Guide</a>
            <a onClick={() => scrollTo('contact')}>Contact</a>
            <a href={`${APP_URL}/portal/login`} className="btn-nav">Admin Login</a>
          </div>
          <button className="nav-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span></span><span></span><span></span>
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
              Apartment Management System
            </div>
            <h1>
              Maintenance dues, <span className="highlight">receipts &amp; reminders</span> on WhatsApp
            </h1>
            <p>
              Stop matching UPI payments to flats by hand and writing receipts. Upload the bank
              statement, check, and send receipts and reminders, all inside WhatsApp.
              No app for residents to install.
            </p>
            <div className="hero-buttons">
              <button className="btn-primary" onClick={() => scrollTo('contact')}>
                Get it for your society
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10h12m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <button className="btn-secondary" onClick={() => scrollTo('videos')}>
                ▶ Watch the video
              </button>
            </div>
          </div>
          <div className="hero-visual">
            <HeroPhone />
          </div>
        </div>
      </section>

      {/* Facts bar */}
      <section className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            <div className="stat"><span className="stat-number">0 apps</span><span className="stat-label">Residents just use WhatsApp</span></div>
            <div className="stat-divider"></div>
            <div className="stat"><span className="stat-number">3 taps</span><span className="stat-label">Statement → check → receipts</span></div>
            <div className="stat-divider"></div>
            <div className="stat"><span className="stat-number">PDF</span><span className="stat-label">Numbered receipts for every payment</span></div>
          </div>
        </div>
      </section>

      {/* Residents and admins */}
      <section className="section fade-section" id="who" ref={residentsRef}>
        <div className="container">
          <div className="section-header">
            <h2>One WhatsApp number for the whole society</h2>
            <p>Residents and the committee use the same chat. Each sees only what is theirs.</p>
            <div className="section-divider"></div>
          </div>
          <div className="comm-grid">
            <div className="comm-card">
              <div className="who-emoji">🏠</div>
              <h3>For residents</h3>
              <ul>
                <li>Scan the society QR and send JOIN to link your flat</li>
                <li>Send <b>hi</b> any time to see your balance for the month</li>
                <li>Tap I&apos;ve paid and send a screenshot, PDF or the UTR number</li>
                <li>Get your receipt PDF on WhatsApp, and download old ones</li>
                <li>Selling or moving out? Tap More → Request NOC; the NOC PDF comes on WhatsApp</li>
                <li>More → Support if anything goes wrong</li>
              </ul>
            </div>
            <div className="comm-card">
              <div className="who-emoji">📋</div>
              <h3>For the committee</h3>
              <ul>
                <li>Send ADMIN for the dashboard: collected, pending, every flat</li>
                <li>Upload the bank statement; payments are matched for you</li>
                <li>Import the checked Excel and send all receipts in one tap</li>
                <li>Remind unpaid flats, or send overdue notices as PDF</li>
                <li>Fix a receipt recorded on the wrong flat, month or amount</li>
                <li>Issue NOCs to residents who sell or move out</li>
                <li>Add or remove residents and flats in the setup Excel, and approve new numbers</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section section-alt fade-section" id="features" ref={featuresRef}>
        <div className="container">
          <div className="section-header">
            <h2>Features</h2>
            <p>Everything a society needs to collect maintenance without the paperwork</p>
            <div className="section-divider"></div>
          </div>
          <div className="services-grid features-grid">
            {FEATURES.map((f) => (
              <div className="service-card" key={f.t}>
                <div className="about-feature-icon feature-icon">{f.i}</div>
                <h3>{f.t}</h3>
                <p>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section fade-section" id="how-it-works" ref={stepsRef}>
        <div className="container">
          <div className="section-header">
            <h2>How a month works</h2>
            <p>The committee&apos;s monthly work, in four steps</p>
            <div className="section-divider"></div>
          </div>
          <div className="steps">
            <div className="steps-line"></div>
            {STEPS.map((s) => (
              <div className="step" key={s.t}>
                <div className="step-number">{s.i}</div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full flow */}
      <section className="section section-alt fade-section" id="flow" ref={flowRef}>
        <div className="container">
          <div className="section-header">
            <h2>How the system works</h2>
            <p>The full flow, from setting up a society to receipts, and who does each step</p>
            <div className="section-divider"></div>
          </div>
          <div className="flow-legend">
            {Object.entries(WHO).map(([k, w]) => (
              <span key={k} className={`flow-who ${k}`}>{w.emoji} {w.label}</span>
            ))}
          </div>
          <div className="flow">
            {FLOW.map((p) => (
              <div className="flow-phase" key={p.phase}>
                <h3 className="flow-phase-title">{p.phase}</h3>
                <ol className="flow-list">
                  {p.items.map((it) => (
                    <li className={`flow-item ${it.who}`} key={it.t}>
                      <div className="flow-num">{it.n}</div>
                      <div className="flow-body">
                        <span className={`flow-who ${it.who}`}>{WHO[it.who].emoji} {WHO[it.who].label}</span>
                        <h4>{it.t}</h4>
                        <p>{it.d}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
          <p className="flow-note">
            The society keeps collecting money its own way. The system never takes payments, and a
            screenshot alone never marks a flat as paid: only the committee&apos;s confirmed Excel does.
          </p>
        </div>
      </section>

      {/* Videos */}
      <section className="section fade-section" id="videos" ref={videosRef}>
        <div className="container">
          <div className="section-header">
            <h2>See it in action</h2>
            <p>Short video guides for residents and committee admins</p>
            <div className="section-divider"></div>
          </div>
          <div className="tabs" role="tablist">
            {Object.entries(VIDEOS).map(([k, v]) => (
              <button key={k} role="tab" aria-selected={videoWho === k}
                className={`tab ${videoWho === k ? 'on' : ''}`} onClick={() => setVideoWho(k)}>{v.label}</button>
            ))}
          </div>
          <div className="video-card">
            <video key={video.src} src={video.src} controls preload="metadata" playsInline className="video" />
            <div className="video-foot">
              <p>{VIDEOS[videoWho].blurb}</p>
              <div className="seg">
                {['short', 'full'].map((len) => (
                  <button key={len} className={videoLen === len ? 'on' : ''} onClick={() => setVideoLen(len)}>
                    {VIDEOS[videoWho][len].label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive guide */}
      <section className="section section-alt fade-section" id="guide" ref={guideRef}>
        <div className="container">
          <div className="section-header">
            <h2>Try the step-by-step guide</h2>
            <p>Click through the real WhatsApp screens. Use the arrows at the bottom right.</p>
            <div className="section-divider"></div>
          </div>
          <div className="tabs" role="tablist">
            {Object.entries(GUIDES).map(([k, g]) => (
              <button key={k} role="tab" aria-selected={guide === k}
                className={`tab ${guide === k ? 'on' : ''}`} onClick={() => setGuide(k)}>{g.label}</button>
            ))}
          </div>
          <div className="guide-frame">
            <iframe key={guide} src={GUIDES[guide].src} title={GUIDES[guide].label} loading="lazy" />
          </div>
          <p className="guide-open">
            <a href={GUIDES[guide].src} target="_blank" rel="noopener noreferrer">Open full screen ↗</a>
          </p>
        </div>
      </section>

      {/* Privacy & trust */}
      <section className="section fade-section" id="trust" ref={trustRef}>
        <div className="container">
          <div className="section-header">
            <h2>Safe for your residents</h2>
            <div className="section-divider"></div>
          </div>
          <div className="about-features trust-grid">
            {[
              { t: 'Official WhatsApp Business API', d: 'Messages go through Meta’s official Cloud API, from one verified business number.' },
              { t: 'Each resident sees only their flat', d: 'Never another flat, owner or tenant. Admins see only their own society.' },
              { t: 'Only the committee lets people in', d: 'A number not on the society’s list can join only after an admin approves it as owner or tenant.' },
              { t: 'Records you can rely on', d: 'A receipt is never edited or its number reused: a wrong one is cancelled, kept with its reason, and replaced. A screenshot alone never marks a flat as paid.' },
            ].map((f) => (
              <div className="about-feature" key={f.t}>
                <div className="about-feature-icon">{ICONS.shield}</div>
                <div><h4>{f.t}</h4><p>{f.d}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="section section-alt fade-section" id="contact" ref={contactRef}>
        <div className="container">
          <div className="section-header">
            <h2>Contact Us</h2>
            <p>Want this for your apartment? Tell us about your society.</p>
            <div className="section-divider"></div>
          </div>
          <div className="contact-content">
            <div className="contact-info">
              <h3>Let&apos;s set up your society</h3>
              <p>
                Write to us and we&apos;ll show you a demo, set up your flats and residents,
                and get your committee started.
              </p>
              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-item-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#2D7A4B" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                  </div>
                  <div>
                    <span>Email</span><br />
                    <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-item-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#2D7A4B" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                  </div>
                  <div>
                    <span>Location</span><br />
                    <span>India</span>
                  </div>
                </div>
              </div>
            </div>
            {sendState === 'sent' ? (
              <div className="contact-form form-sent" role="status">
                <div className="form-sent-icon">✓</div>
                <h3>Message sent</h3>
                <p>
                  Thanks{form.name ? `, ${form.name.split(' ')[0]}` : ''}! We&apos;ll reply to {form.email}.
                  For anything urgent, write to <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
                </p>
              </div>
            ) : (
            <form className="contact-form" name="contact" method="POST" data-netlify="true"
              netlify-honeypot="bot-field" onSubmit={sendForm}>
              <h3>Send us a message</h3>
              <p hidden><label>Leave this empty: <input name="bot-field" tabIndex={-1} autoComplete="off" {...field('bot-field')} /></label></p>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="f-name">Your Name</label>
                  <input id="f-name" name="name" type="text" autoComplete="name" placeholder="Enter your name" required {...field('name')} />
                </div>
                <div className="form-group">
                  <label htmlFor="f-phone">Phone</label>
                  <input id="f-phone" name="phone" type="tel" autoComplete="tel" placeholder="Mobile number" {...field('phone')} />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="f-email">Email</label>
                <input id="f-email" name="email" type="email" autoComplete="email" placeholder="So we can reply" required {...field('email')} />
              </div>
              <div className="form-group">
                <label htmlFor="f-soc">Society / Apartment</label>
                <input id="f-soc" name="society" type="text" placeholder="Society name and number of flats" {...field('society')} />
              </div>
              <div className="form-group">
                <label htmlFor="f-msg">Message</label>
                <textarea id="f-msg" name="message" placeholder="Tell us what you need..." required {...field('message')}></textarea>
              </div>
              <button className="btn-primary" type="submit" disabled={sendState === 'sending'}>
                {sendState === 'sending' ? 'Sending…' : 'Send Message'}
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10h12m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              {sendState === 'error' ? (
                <p className="form-note form-error" role="alert">
                  Sorry, that didn&apos;t go through. Please try again, or write to <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
                </p>
              ) : (
                <p className="form-note">Your message comes straight to our inbox. Prefer email? <a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
              )}
            </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-logo">
                <img src="/logo-icon.png" alt="" />
                <span>DataHegemon</span>
              </div>
              <p>
                Apartment Management System: maintenance dues, receipts and
                reminders for housing societies, on WhatsApp.
              </p>
            </div>
            <div>
              <h4>Product</h4>
              <ul>
                <li><a onClick={() => scrollTo('features')}>Features</a></li>
                <li><a onClick={() => scrollTo('how-it-works')}>How It Works</a></li>
                <li><a onClick={() => scrollTo('flow')}>Full Flow</a></li>
                <li><a onClick={() => scrollTo('videos')}>Videos</a></li>
                <li><a onClick={() => scrollTo('guide')}>Step-by-step Guide</a></li>
              </ul>
            </div>
            <div>
              <h4>Company</h4>
              <ul>
                <li><a href={`${APP_URL}/portal/login`}>Admin Login</a></li>
                <li><a href={`${APP_URL}/privacy`}>Privacy Policy</a></li>
                <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>&copy; 2026 DataHegemon. All rights reserved.</span>
            <div className="footer-badges">
              <span className="badge">Made in India</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
