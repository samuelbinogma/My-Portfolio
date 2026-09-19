import { useEffect, useState } from 'react';
import './navbar.css';

const LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Work' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      let current = 'home';
      for (const link of LINKS) {
        const el = document.getElementById(link.id);
        if (el && el.getBoundingClientRect().top <= 140) current = link.id;
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('no-scroll', open);
  }, [open]);

  const handleLink = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner container">
        <button
          type="button"
          className="nav__brand"
          onClick={() => handleLink('home')}
          aria-label="Back to top"
        >
          <span className="nav__mark">SB</span>
          <span className="nav__name">Samuel Binogma</span>
        </button>

        <nav className={`nav__links ${open ? 'is-open' : ''}`} aria-label="Primary">
          {LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              className={`nav__link ${active === link.id ? 'is-active' : ''}`}
              onClick={() => handleLink(link.id)}
            >
              {link.label}
            </button>
          ))}

          <button
            type="button"
            className="nav__cta"
            onClick={() => handleLink('contact')}
          >
            Let's talk
          </button>
        </nav>

        <button
          type="button"
          className={`nav__burger ${open ? 'is-open' : ''}`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}