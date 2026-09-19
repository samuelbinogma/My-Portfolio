import { useEffect, useRef, useState } from 'react';
import './hero.css';

const ROLES = ['Full-Stack Developer', 'MERN Specialist', 'UI Engineer'];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [typing, setTyping] = useState('');
  const sectionRef = useRef(null);

  useEffect(() => {
    let char = 0;
    let deleting = false;
    let timer;

    const tick = () => {
      const word = ROLES[roleIndex];
      if (!deleting) {
        char += 1;
        setTyping(word.slice(0, char));
        if (char === word.length) {
          deleting = true;
          timer = setTimeout(tick, 2100);
          return;
        }
      } else {
        char -= 1;
        setTyping(word.slice(0, char));
        if (char === 0) {
          deleting = false;
          setRoleIndex((i) => (i + 1) % ROLES.length);
          return;
        }
      }
      timer = setTimeout(tick, deleting ? 46 : 92);
    };

    timer = setTimeout(tick, 400);
    return () => clearTimeout(timer);
  }, [roleIndex]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero section-hero" ref={sectionRef}>
      <div className="container hero__grid">
        <div className="hero__copy">
          <span className="hero__badge reveal is-visible">
            <span className="hero__dot" /> Available for freelance work
          </span>

          <h1 className="hero__title reveal is-visible">
            Building <span className="text-gradient">digital</span> experiences that
            people <span className="hero__under">remember</span>.
          </h1>

          <p className="hero__typed reveal is-visible">
            I&apos;m a <span className="hero__role">{typing}</span>
            <span className="hero__caret" />
          </p>

          <p className="hero__desc reveal is-visible">
            I turn bold ideas into fast, accessible and beautifully engineered web
            products with the MERN stack — from pixel to database.
          </p>

          <div className="hero__actions reveal is-visible">
            <button type="button" className="btn btn--primary" onClick={() => scrollTo('projects')}>
              View my work
            </button>
            <button type="button" className="btn btn--ghost" onClick={() => scrollTo('contact')}>
              Get in touch
            </button>
          </div>

          <ul className="hero__stats reveal is-visible">
            <li>
              <strong>1+</strong>
              <span>Years building</span>
            </li>
            <li>
              <strong>3+</strong>
              <span>Projects shipped</span>
            </li>
          </ul>
        </div>

        <div className="hero__visual reveal is-visible">
          <div className="hero__card">
            <div className="hero__card-top">
              <span className="hero__card-dots">
                <i />
                <i />
                <i />
              </span>
              <span className="hero__card-tag">terminal — samuel</span>
            </div>
            <pre className="hero__code">
              <code>
                <span className="c-dim">$ </span>
                <span className="c-key">npm run</span> build:portfolio
                <span className="c-dim">...</span>
                {'\n'}
                <span className="c-ok">✓</span> compiled <span className="c-num">24</span> components
                {'\n'}
                <span className="c-ok">✓</span> optimized <span className="c-num">0</span> blocking fetches
                {'\n'}
                <span className="c-ok">✓</span> deployed in <span className="c-grad">48ms</span>
                {'\n\n'}
                <span className="c-grad">✨ portfolio ready</span>
              </code>
            </pre>
          </div>

          <div className="hero__float hero__float--1">⚛️</div>
          <div className="hero__float hero__float--2">🍃</div>
          <div className="hero__float hero__float--3">🚀</div>
        </div>
      </div>

      <button
        type="button"
        className="hero__scroll"
        onClick={() => scrollTo('about')}
        aria-label="Scroll to about section"
      >
        <span className="hero__mouse">
          <i />
        </span>
        <span className="hero__scroll-text">scroll</span>
      </button>
    </section>
  );
}