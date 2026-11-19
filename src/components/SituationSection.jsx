import React, { useCallback, useEffect, useRef, useState } from 'react'
import lady from '../assets/situation/lady-purple.webp'
import ladyPlain from '../assets/situation/lady-plain.webp'
import './SituationSection.css'

/* "People are at the heart of performance" + the rotating "A reality for many HR teams" card.
   The purple scene (headline, wave, woman) stays still; only the white card rotates its question.
   - one question at a time, held long enough to read
   - the next one slides in from the right while the previous slides out to the left, softly blurred
   - dots, arrows and a "1 / 4" counter; rotation pauses on hover / focus and with reduced motion */

const QUESTIONS = [
  { topic: 'Team performance', lead: ['Why is this team'], accent: 'not performing?', support: ['Is it the manager, the team dynamics or', 'the organisation around them?'] },
  { topic: 'AI & transformation', lead: ['AI won’t fix a team'], accent: 'that doesn’t work.', support: ['Better technology doesn’t automatically', 'mean better teamwork.'] },
  { topic: 'Training impact', lead: ['We ran a training'], accent: 'programme last year.', support: ['Did it actually change anything?', 'Nobody knows.'] },
  { topic: 'Survey data', lead: ['We have survey data'], accent: 'from last quarter.', support: ['But it’s sitting in a spreadsheet.', 'Nothing happened.'] },
]

const HOLD_MS = 4900

export default function SituationSection({ id = 'situation', variant = 'wave' }) {
  const plain = variant === 'plain'
  const root = useRef(null)
  const [visible, setVisible] = useState(false)

  const [index, setIndex] = useState(0)
  const [prevIndex, setPrevIndex] = useState(null)
  const [dir, setDir] = useState(1)               // 1 = next (slides in from the right), -1 = back
  const [userPaused, setUserPaused] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(mq.matches)
    sync()
    if (mq.addEventListener) mq.addEventListener('change', sync)
    else mq.addListener(sync)
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', sync)
      else mq.removeListener(sync)
    }
  }, [])

  useEffect(() => {
    const el = root.current
    if (!el) return undefined
    let timer = null
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (timer) clearTimeout(timer)
          if (entry.isIntersecting) timer = setTimeout(() => setVisible(true), 150)
          else setVisible(false)
        })
      },
      { threshold: 0.25, rootMargin: '-5% 0px -15% 0px' }
    )
    observer.observe(el)
    return () => { if (timer) clearTimeout(timer); observer.disconnect() }
  }, [])

  const goTo = useCallback((next, direction) => {
    setIndex((current) => {
      if (next === current) return current
      setPrevIndex(current)
      setDir(direction)
      return next
    })
  }, [])

  const goNext = useCallback(() => goTo((index + 1) % QUESTIONS.length, 1), [goTo, index])
  const goPrev = useCallback(() => goTo((index - 1 + QUESTIONS.length) % QUESTIONS.length, -1), [goTo, index])

  // Automatic rotation: only while visible, not paused, not hovered, not reduced-motion
  const autoPlaying = visible && !userPaused && !hovering && !reduced
  useEffect(() => {
    if (!autoPlaying) return undefined
    const t = setTimeout(goNext, HOLD_MS)
    return () => clearTimeout(t)
  }, [autoPlaying, goNext, index])

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); goNext() }
    if (e.key === 'ArrowLeft') { e.preventDefault(); goPrev() }
  }

  const slidePos = (i) => {
    if (i === index) return 'active'
    if (i === prevIndex) return dir === 1 ? 'out-left' : 'out-right'
    return dir === 1 ? 'wait-right' : 'wait-left'
  }

  return (
    <section ref={root} className="sx-outer" id={id}>
      <div className={`sx ${plain ? 'sx--plain' : ''} ${visible ? 'is-visible' : ''}`} data-behavency>
      <img className="sx-lady" src={plain ? ladyPlain : lady} alt="A thoughtful woman resting her chin on her hand, seated at a laptop" />

      <svg className="sx-art" viewBox="0 0 1600 815" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id={`sxWave-${id}`} gradientUnits="userSpaceOnUse" x1="0" y1="640" x2="1000" y2="815">
            <stop offset="0" stopColor="#aa55cd" />
            <stop offset=".38" stopColor="#8a3bb0" />
            <stop offset=".75" stopColor="#7a31a2" />
            <stop offset="1" stopColor="#6e2b91" />
          </linearGradient>
          <linearGradient id={`sxLine-${id}`} gradientUnits="userSpaceOnUse" x1="303" y1="0" x2="594" y2="0">
            <stop offset="0" stopColor="#c59cf0" stopOpacity=".75" />
            <stop offset=".5" stopColor="#d6b5f6" />
            <stop offset="1" stopColor="#c59cf0" stopOpacity=".8" />
          </linearGradient>
        </defs>
        <path
          className="sx-wave"
          d="M0 662 C60 642 110 636 162 637 C420 641 520 790 800 802 C1050 812 1250 742 1380 712 C1470 691 1540 677 1600 672 L1600 815 L0 815 Z"
          fill={`url(#sxWave-${id})`}
        />
      </svg>

      <div className="sx-copy">
        <p className="sx-eyebrow">WHY NOW</p>
        <span className="sx-eyebar" aria-hidden="true" />
        <h2 className="sx-title">The risk you can <em>see</em>{' '}<br /><em>coming.</em></h2>
        <p className="sx-sub">
          When plans keep changing, line and mid-level{' '}<br />
          managers carry the weight. If they lose their{' '}<br />
          footing, teams lose direction — long before it{' '}<br />
          shows in the numbers.
        </p>
        <p className="sx-note">
          You can’t control the uncertainty. You can{' '}<br />
          control how ready your managers are.
        </p>
      </div>

      <div
        className="sx-card"
        role="group"
        aria-roledescription="carousel"
        aria-label="A reality for many HR teams"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onFocus={() => setHovering(true)}
        onBlur={() => setHovering(false)}
        onKeyDown={onKeyDown}
      >
        <div className="sx-card-head">
          <span className="sx-card-label">WARNING SIGN</span>
          <span className="sx-card-count" aria-hidden="true">{index + 1} / {QUESTIONS.length}</span>
        </div>

        <div className="sx-stage" aria-live={autoPlaying ? 'off' : 'polite'}>
          {QUESTIONS.map((q, i) => (
            <div
              key={q.accent}
              className={`sx-slide sx-slide--${slidePos(i)}`}
              aria-hidden={i !== index}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${QUESTIONS.length}: ${q.topic}`}
            >
              <p className="sx-q">
                {q.lead.map((line) => <span className="sx-lead" key={line}>{line}</span>)}
                <span className="sx-accent">{q.accent}</span>
              </p>
              <p className="sx-support">{q.support.map((line) => <span key={line}>{line}</span>)}</p>
            </div>
          ))}
        </div>

        <div className="sx-dots" role="tablist" aria-label="Choose a question">
          {QUESTIONS.map((q, i) => (
            <button
              key={q.accent}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Question ${i + 1} of ${QUESTIONS.length}`}
              className={`sx-dot ${i === index ? 'is-active' : ''}`}
              onClick={() => goTo(i, i > index ? 1 : -1)}
            />
          ))}
        </div>

        <div className="sx-buttons">
          <button type="button" className="sx-btn" aria-label="Previous question" onClick={goPrev}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.5 5.5L8 12l6.5 6.5" /></svg>
          </button>
          <button type="button" className="sx-btn sx-btn--next" aria-label="Next question" onClick={goNext}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.5 5.5L16 12l-6.5 6.5" /></svg>
          </button>
        </div>

        {/* Pause control for keyboard / screen-reader users: invisible until it receives focus */}
        {!reduced && (
          <button type="button" className="sx-pause" aria-pressed={userPaused} onClick={() => setUserPaused((p) => !p)}>
            {userPaused ? 'Resume rotation' : 'Pause rotation'}
          </button>
        )}
      </div>
      </div>
    </section>
  )
}
