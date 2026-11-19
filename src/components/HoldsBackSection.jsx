import React, { useEffect, useRef, useState } from 'react'
import './HoldsBackSection.css'

/* "What holds managers back" — replaces the old "Not every problem is the manager's" section.
   Keeps id="two-gaps" so the menu link still works.
   A flow chart: managers answer → split into what is in their hands (left) and what holds them back (right),
   each branch ending in an outcome card. The flow builds row by row when it scrolls into view;
   without JavaScript, or with reduced motion, it is simply shown complete.
   The counts on the right ("28 of 42" etc.) are an example and stay labelled "example". */

const IN_HANDS = [
  { icon: 'i-target', label: 'Setting priorities' },
  { icon: 'i-check', label: 'Following through' },
  { icon: 'i-chat', label: 'A team that speaks up' },
]

const HOLDS_BACK = [
  { icon: 'i-layers', label: 'Too many priorities', faces: ['coral', 'teal', 'amber'], count: '28 of 42' },
  { icon: 'i-hourglass', label: 'Slow approvals', faces: ['blue', 'purple', 'coral'], count: '22 of 42' },
  { icon: 'i-lock', label: 'Decided without them', faces: ['amber', 'blue'], count: '17 of 42' },
]

function Icon({ id, size = 18, className }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <use href={`#${id}`} />
    </svg>
  )
}

export default function HoldsBackSection() {
  const root = useRef(null)
  const [armed, setArmed] = useState(false)   // hidden, waiting to build
  const [run, setRun] = useState(false)       // building / built

  useEffect(() => {
    const el = root.current
    if (!el) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return undefined
    // Already on screen when the page opens: just show it.
    const r = el.getBoundingClientRect()
    if (r.top < window.innerHeight * 0.75 && r.bottom > 0) return undefined
    setArmed(true)
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { setRun(true); io.disconnect() }
    }, { threshold: 0.2 })
    io.observe(el.querySelector('.hb-flow') || el)
    return () => io.disconnect()
  }, [])

  const step = (n) => ({ '--step': n })

  return (
    <>
      {/* Icons used by the flow (kept in the markup) */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <symbol id="i-list" viewBox="0 0 24 24"><rect x="8" y="2" width="8" height="4" rx="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="M12 11h4M12 16h4M8 11h.01M8 16h.01" /></symbol>
        <symbol id="i-target" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></symbol>
        <symbol id="i-check" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="m8.5 12 2.5 2.5 4.5-5" /></symbol>
        <symbol id="i-chat" viewBox="0 0 24 24"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /></symbol>
        <symbol id="i-layers" viewBox="0 0 24 24"><path d="m12 2 10 5-10 5L2 7z" /><path d="m2 17 10 5 10-5" /><path d="m2 12 10 5 10-5" /></symbol>
        <symbol id="i-hourglass" viewBox="0 0 24 24"><path d="M5 22h14M5 2h14M17 22v-4.2a2 2 0 0 0-.6-1.4L12 12l-4.4 4.4a2 2 0 0 0-.6 1.4V22M7 2v4.2a2 2 0 0 0 .6 1.4L12 12l4.4-4.4a2 2 0 0 0 .6-1.4V2" /></symbol>
        <symbol id="i-lock" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></symbol>
        <symbol id="i-sprout" viewBox="0 0 24 24"><path d="M7 20h10" /><path d="M12 20v-8" /><path d="M12 12c0-3.5 2.5-6 7-6 0 4-2.5 6-7 6Z" /><path d="M12 14c0-3-2-5-6-5 0 3.5 2 5 6 5Z" /></symbol>
        <symbol id="i-file" viewBox="0 0 24 24"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4M8 13h8M8 17h5" /></symbol>
      </svg>

      <section
        ref={root}
        className={`hb ${armed ? 'is-armed' : ''} ${run ? 'is-run' : ''}`}
        id="two-gaps"
        aria-label="What holds managers back"
      >
        <div className="hb-wrap">
          <p className="hb-eyebrow">What holds managers back</p>
          <h2 className="hb-title">Your managers know<br /> what slows them<br /> down. <em>Now you will too.</em></h2>
          <p className="hb-sub">
            Not everything is in a manager’s hands. Managers tell us what gets in the way of doing their job well.
            Seen across all of them, it gives you a picture your organisation doesn’t have today.
          </p>

          <div className="hb-flow">
            <div className="hb-start hb-step" style={step(0)}>
              <span className="hb-hex"><Icon id="i-list" size={18} /></span>
              <span className="hb-start-text"><b>Your managers answer</b><small>with their teams and the organisation</small></span>
              <span className="hb-faces" aria-label="42 managers">
                <span className="hb-face hb-face--blue">AK</span>
                <span className="hb-face hb-face--coral">MP</span>
                <span className="hb-face hb-face--teal">LS</span>
                <span className="hb-face hb-face--purple">DT</span>
                <span className="hb-face hb-face--more">+38</span>
              </span>
            </div>

            <div className="hb-line hb-line--live hb-step" style={{ ...step(1), height: 40 }} aria-hidden="true" />
            <div className="hb-diamond hb-step" style={step(1)} aria-hidden="true"><i /></div>
            <div className="hb-line hb-step" style={{ ...step(2), height: 14 }} aria-hidden="true" />
            <div className="hb-split hb-step" style={step(2)} aria-hidden="true" />

            <div className="hb-branches">
              {/* Left: in their hands */}
              <div className="hb-branch">
                <div className="hb-line hb-step" style={{ ...step(3), height: 26 }} aria-hidden="true" />
                <span className="hb-flag hb-flag--blue hb-step" style={step(3)}>In their hands</span>
                {IN_HANDS.map((r, i) => (
                  <React.Fragment key={r.label}>
                    <div className="hb-line hb-step" style={{ ...step(4 + i), height: 32 }} aria-hidden="true" />
                    <div className="hb-node hb-step" style={step(4 + i)}>
                      <span className="hb-ico hb-ico--blue"><Icon id={r.icon} /></span>
                      <span className="hb-label">{r.label}</span>
                    </div>
                  </React.Fragment>
                ))}
                <div className="hb-line hb-step" style={{ ...step(7), height: 38 }} aria-hidden="true" />
                <div className="hb-out hb-out--blue hb-step" style={step(7)}>
                  <span className="hb-out-ico hb-out-ico--blue"><Icon id="i-sprout" /></span>
                  <span className="hb-out-text"><b>Targeted development</b><small>in Build</small></span>
                </div>
              </div>

              {/* Right: what holds them back (example counts) */}
              <div className="hb-branch">
                <div className="hb-line hb-step" style={{ ...step(3), height: 26 }} aria-hidden="true" />
                <span className="hb-flag hb-flag--orange hb-step" style={step(3)}>What holds them back <span>· example</span></span>
                {HOLDS_BACK.map((r, i) => (
                  <React.Fragment key={r.label}>
                    <div className="hb-line hb-step" style={{ ...step(4 + i), height: 32 }} aria-hidden="true" />
                    <div className="hb-node hb-step" style={step(4 + i)}>
                      <span className="hb-ico hb-ico--orange"><Icon id={r.icon} /></span>
                      <span className="hb-label">{r.label}</span>
                      <span className="hb-mini" aria-hidden="true">
                        {r.faces.map((f, j) => <span key={j} className={`hb-dot hb-face--${f}`} />)}
                      </span>
                      <span className="hb-count">{r.count}</span>
                    </div>
                  </React.Fragment>
                ))}
                <div className="hb-line hb-step" style={{ ...step(7), height: 38 }} aria-hidden="true" />
                <div className="hb-out hb-out--orange hb-step" style={step(7)}>
                  <span className="hb-out-ico hb-out-ico--orange"><Icon id="i-file" /></span>
                  <span className="hb-out-text"><b>A report for leadership and HR</b><small>what most managers run into</small></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
