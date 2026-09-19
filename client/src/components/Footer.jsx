import './footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__mark">SB</span>
          <p>
            Designed & built by <strong>Samuel Binogma</strong> — React on the
            front, Node + MongoDB on the back, vanilla CSS for the soul.
          </p>
        </div>

        <ul className="footer__nav">
          <li><a href="#about">About</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#projects">Work</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        <div className="footer__social">
          <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub">GitHub</a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn">LinkedIn</a>
          <a href="https://x.com/mci_tuga" target="_blank" rel="noreferrer" aria-label="X">X</a>
        </div>
      </div>

      <div className="container footer__bottom">
        <span>© {year} Samuel Binogma. All rights reserved.</span>
        <span className="footer__made">Made with ☕ and the MERN stack</span>
      </div>
    </footer>
  );
}