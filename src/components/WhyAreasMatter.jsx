import React from 'react'
import { useInView } from 'react-intersection-observer'
import './WhyAreasMatter.css'

/* "Why these areas matter" — exact copy of the supplied design.
   Laid out on a 1600 × 860 design canvas that scales as one piece: u(n) = n × (canvas width / 1600). */

const u = (n) => `calc(${n} * var(--u))`
const box = (x, y, w, h, extra = {}) => ({ left: u(x), top: u(y), ...(w != null ? { width: u(w) } : null), ...(h != null ? { height: u(h) } : null), ...extra })
const fs = (size, lh, extra = {}) => ({ fontSize: u(size), lineHeight: lh ? u(lh) : 1, ...extra })

const COLS = [136, 620, 1068]
/* stat: [pre, big, post] — pre and post are the small serif words around the big number */
const CARDS = [
  { c: 0, r: 0, label: 'Clarity & Alignment', stat: ['up to ', '7.6%', ''], body: ['higher yearly stock returns at companies', 'where people feel purpose and', 'management gives clear direction.'], src: 'Wharton, Columbia & Harvard Business School' },
  { c: 1, r: 0, label: 'Trust & Inclusion', stat: ['', '17%', ''], body: ['more likely to say they are high-', 'performing — teams with inclusive', 'leaders, compared with others.'], src: 'Deloitte, in Harvard Business Review' },
  { c: 2, r: 0, label: 'Focus & Priorities', stat: ['', '25', ' points'], body: ['higher in the performance ranking for', 'people who focus on fewer priorities', 'and say no to the rest.'], src: 'Morten Hansen, UC Berkeley' },
  { c: 0, r: 1, label: 'Execution & Accountability', stat: ['', '68', ' of 70'], body: ['studies found productivity gains when', 'organisations managed by clear objectives.'], src: 'Journal of Applied Psychology' },
  { c: 1, r: 1, label: 'Collaboration & Influence', stat: ['', '39%', ''], body: ['higher team productivity, on average,', 'could be reached if teams improved', 'collaboration.'], src: 'i4cp & Rob Cross' },
  { c: 2, r: 1, label: 'Learning & Adaptation', stat: ['', '25%', ''], body: ['higher profit margins at companies with', 'the most learning-agile executives,', 'compared with peers.'], src: 'Korn Ferry' },
]
/* y positions (design px) of the first row and of the second row */
const ROW = [
  { label: 267, stat: 301, body: 383, link: 481 },
  { label: 555, stat: 592, body: 672, link: 773 },
]

export default function WhyAreasMatter() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className={`wm${inView ? ' is-in' : ''}`} id="why-areas-matter" ref={ref} aria-label="Why these areas matter">
      <div className="wm-canvas" style={{ '--u': 'calc(100cqw / 1600)' }}>
        <div className="wm-eyebrow" style={box(136, 24, 600, 22)}>
          <i style={{ width: u(36) }} />
          <span style={fs(20, 22)}>WHY THESE AREAS MATTER</span>
        </div>

        <h2 className="wm-title" style={box(136, 62, null, null, fs(72, 84))}>
          When these areas improve, <em>results follow.</em>
        </h2>

        <p className="wm-sub" style={box(136, 148, 1100, null, { fontSize: '0.9458vw', lineHeight: 1.5 })}>
          Each area in our model is linked to results a business can see: performance,<br />
          productivity and profit.
        </p>

        <span className="wm-rule wm-rule--v" style={box(579, 268, 1.4, 552)} />
        <span className="wm-rule wm-rule--v" style={box(1026, 268, 1.4, 552)} />
        <span className="wm-rule" style={box(136, 537, 1352, 1.4)} />

        {CARDS.map((k) => {
          const x = COLS[k.c]
          const y = ROW[k.r]
          const body = k.r === 1 && k.c === 0 ? y.body + 3 : y.body
          return (
            <div className="wm-card" key={k.label}>
              <p className="wm-label" style={box(x, y.label, 460, null, { fontSize: 'calc(0.9458vw + 0.5px)', lineHeight: 1.3 })}>{k.label}</p>
              <p className="wm-stat" style={box(x, y.stat, 470, null, fs(72, 80))}>
                {k.stat[0] && <span className="wm-pre" style={fs(37, 38)}>{k.stat[0]}</span>}
                {k.stat[1]}
                {k.stat[2] && <span className="wm-post" style={fs(k.stat[2] === ' of 70' ? 45 : 38, 42)}>{k.stat[2]}</span>}
              </p>
              <p className="wm-body" style={box(x, body, 470, null, { fontSize: 'calc(0.9458vw - 1.5px)', lineHeight: 1.47 })}>
                {k.body.map((l, i) => <React.Fragment key={l}>{l}{i < k.body.length - 1 && <br />}</React.Fragment>)}
              </p>
              <p className="wm-link" style={box(x, y.link, 470, null, { fontSize: 'calc(0.9458vw - 3px)', lineHeight: 1.4 })}><span>{k.src} <b aria-hidden="true">↗</b></span></p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
