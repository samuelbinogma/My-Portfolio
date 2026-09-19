import { useRef } from 'react';
import useReveal from '../hooks/useReveal';
import './about.css';

const HIGHLIGHTS = [
  { icon: '🎯', title: 'Product-minded', text: 'I build features that solve real problems, not just look good.' },
  { icon: '⚡', title: 'Performance-obsessed', text: 'Sub-second loads, a tiny bundle and buttery interactions.' },
  { icon: '🔒', title: 'Security-aware', text: 'Solid auth, validated inputs and hardened APIs out of the box.' },
];

export default function About() {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <section id="about" ref={ref}>
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">About me</span>
          <h2>
            Turning ideas into <span className="text-gradient">shipped products</span>
          </h2>
        </div>

        <div className="about__grid">
          <div className="about__bio reveal">
            <p>
              Hey there — I’m <strong>Samuel Binogma</strong>. I’m still in the learning process as a full-stack developer. I design, build, and debug my own products, using AI to move faster without handing the thinking over to it.
            </p>
            <p>
              My bread and butter is the <strong>MERN stack</strong> — MongoDB,
              Express, React and Node.js — and I sweat the details: clean APIs, sane
              data models, accessible UIs and animations that feel alive.
            </p>
          </div>

          <div className="about__side reveal">
            <div className="about__card">
              <div className="about__card-top">
                <span className="about__avatar">👨‍💻</span>
                <div>
                  <h3>Samuel Binogma</h3>
                  <p>Full-Stack Developer / MERN</p>
                </div>
              </div>
              <ul className="about__meta">
                <li>
                  <span>Location</span>
                  <strong>Remote · Worldwide</strong>
                </li>
                <li>
                  <span>Experience</span>
                  <strong>1+ years</strong>
                </li>
                <li>
                  <span>Focus</span>
                  <strong>React · Node · MongoDB</strong>
                </li>
                <li>
                  <span>Status</span>
                  <strong className="text-ok">● Open to work</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="about__highlights">
          {HIGHLIGHTS.map((item) => (
            <article key={item.title} className="about__hl reveal">
              <span className="about__hl-icon">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}