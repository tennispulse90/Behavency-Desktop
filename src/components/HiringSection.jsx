import React from 'react'
import profile from '../assets/hiring/recruiter-profile.webp'
import './HiringSection.css'

/* "Also for hiring" — Hiring a manager? Check before you hire. */

const STEPS = [
  { n: '1', title: 'You invite the candidate', text: 'Their name and e-mail are enough. They receive a link.' },
  { n: '2', title: 'The candidate agrees and answers', text: 'They give consent and complete the profile online.' },
  { n: '3', title: 'You both get results', text: 'The candidate sees their own profile. You get a 4-page PDF for your decision.' },
]

export default function HiringSection() {
  return (
    <section className="hr-outer" id="hiring">
      <div className="hr">
        <div className="hr-left">
          <div className="hr-eyebrow"><span className="hr-dash" aria-hidden="true" />ALSO FOR HIRING</div>
          <h2 className="hr-title">Hiring a manager? <em>Check<br />before you hire.</em></h2>
          <p className="hr-lead">
            A wrong management hire is a risk you pay for long after the{' '}<br />
            interview. The same Managerial Behaviour Profile shows how a{' '}<br />
            candidate typically manages — before you decide.
          </p>
          <ol className="hr-steps">
            {STEPS.map((s) => (
              <li key={s.n} className="hr-step">
                <span className="hr-num" aria-hidden="true">{s.n}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="hr-right">
          <img className="hr-doc" src={profile} alt="Candidate profile: Elias T., Managerial Behaviour Profile results for six areas of everyday management practice" />
        </div>
      </div>
    </section>
  )
}
