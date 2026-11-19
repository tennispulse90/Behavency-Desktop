import React from 'react'
import { useInView } from 'react-intersection-observer'
import './WhyAreasMatter.css'

/* "Why these areas matter" — six research figures in a 3 × 2 grid, then the AI callout card.
   Normal page flow (no fixed canvas), so it reads well on phones too. */

const CARDS = [
  { label: 'Clarity & Alignment', stat: '4.9×', body: 'Teams that line their work up with clear, visible goals are 4.9 times more likely to meet deadlines.', src: 'Atlassian, State of Teams 2025' },
  { label: 'Trust & Inclusion', stat: '3%', post: 'vs 12%', body: 'Where people feel safe to speak up, 3% are likely to quit within a year. Where they feel least safe, 12% are.', src: 'BCG, 2024' },
  { label: 'Focus & Prioritization', stat: '4.6×', body: 'Teams that have a way to identify their top-priority work are 4.6 times more likely to be productive.', src: 'Atlassian, State of Teams 2024' },
  { label: 'Execution & Accountability', stat: '3×', body: 'Managers whose leaders hold everyone responsible for great performance are three times as likely to be engaged (51% vs 17%).', src: 'Gallup, 2026' },
  { label: 'Collaboration & Influence', stat: '39%', body: 'Teams could raise their productivity by 39% on average if they improved how they collaborate.', src: 'i4cp, 2024' },
  { label: 'Learning & Adaptability', stat: '2×', body: 'Organisations that prioritise developing people’s capabilities are twice as likely to have better financial and business results.', src: 'Deloitte, Global Human Capital Trends 2025' },
]

/* Big figure: the "×" is drawn lighter, as in the design */
function Stat({ value, post }) {
  const times = value.endsWith('×')
  return (
    <p className="wm-stat">
      {times ? value.slice(0, -1) : value}
      {times && <span className="wm-times">×</span>}
      {post && <span className="wm-post">{post}</span>}
    </p>
  )
}

function Source({ children }) {
  return <p className="wm-src"><span>{children}<b aria-hidden="true">↗</b></span></p>
}

export default function WhyAreasMatter() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className={`wm${inView ? ' is-in' : ''}`} id="why-areas-matter" ref={ref} aria-label="Why these areas matter">
      <div className="wm-wrap">
        <p className="wm-eyebrow"><i aria-hidden="true" />WHY THESE AREAS MATTER</p>
        <h2 className="wm-title">When these areas improve, <em>results follow.</em></h2>
        <p className="wm-sub">Each area in our model is linked to results a business can see: performance, productivity and profit.</p>

        <div className="wm-grid">
          {CARDS.map((k, i) => (
            <div className="wm-card" key={k.label} style={{ '--i': i }}>
              <p className="wm-label">{k.label}</p>
              <Stat value={k.stat} post={k.post} />
              <p className="wm-body">{k.body}</p>
              <Source>{k.src}</Source>
            </div>
          ))}
        </div>

        <div className="wm-ai">
          <p className="wm-ai-label">And AI won’t build them for you</p>
          <p className="wm-ai-stat">42%</p>
          <p className="wm-ai-body">of people who received low-effort, AI-generated work from a colleague said they trust that colleague less.</p>
          <span className="wm-ai-rule" aria-hidden="true" />
          <Source>BetterUp Labs &amp; Stanford Social Media Lab, Harvard Business Review, 2025</Source>
        </div>
      </div>
    </section>
  )
}
