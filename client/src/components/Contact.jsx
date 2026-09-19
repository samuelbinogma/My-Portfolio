import { useRef, useState } from 'react';
import { sendMessage } from '../api';
import useReveal from '../hooks/useReveal';
import './contact.css';

const CHANNELS = [
  { icon: '✉️', label: 'Email', value: 'sbinogma41@gmail.com', href: 'mailto:sbinogma41@gmail.com' },
  { icon: '💬', label: 'LinkedIn', value: '/in/samuel-binogma', href: 'https://www.linkedin.com/in/samuel-binogma-68969720b' },
  { icon: '🐙', label: 'GitHub', value: '@samuelbinogma', href: 'https://github.com/samuelbinogma' },
];

const initialState = { name: '', email: '', subject: '', message: '' };
const validEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

export default function Contact() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error | offline
  const ref = useRef(null);
  useReveal(ref);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (form.name.trim().length < 2) next.name = 'Please enter your name.';
    if (!validEmail(form.email)) next.email = 'That email doesn’t look right.';
    if (form.message.trim().length < 10) next.message = 'Tell me a little more (10+ chars).';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate() || status === 'sending') return;

    setStatus('sending');
    try {
      await sendMessage(form);
      setStatus('success');
      setForm(initialState);
    } catch (err) {
      setStatus(err.code === 'NETWORK' ? 'offline' : 'error');
    }
  };

  return (
    <section id="contact" ref={ref}>
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">Contact</span>
          <h2>
            Let&apos;s build something <span className="text-gradient">great</span>
          </h2>
          <p>
            Have a project in mind or just want to say hi? Drop me a line — I usually
            reply within a day.
          </p>
        </div>

        <div className="contact__grid">
          <div className="contact__info reveal">
            <h3>Reach out through</h3>
            <ul className="contact__channels">
              {CHANNELS.map((ch) => (
                <li key={ch.label}>
                  <a href={ch.href} target="_blank" rel="noreferrer" className="contact__channel">
                    <span className="contact__channel-icon">{ch.icon}</span>
                    <span>
                      <small>{ch.label}</small>
                      <strong>{ch.value}</strong>
                    </span>
                    <span className="contact__channel-arrow">↗</span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="contact__card-note">
              <span>📍</span>
              <p>
                Based in <strong>Accra,Ghana</strong> — working with clients worldwide, all
                time zones friendly.
              </p>
            </div>
          </div>

          <form className="contact__form reveal" onSubmit={handleSubmit} noValidate>
            <div className="contact__row">
              <div className="field">
                <label htmlFor="c-name">Name</label>
                <input
                  id="c-name"
                  name="name"
                  type="text"
                  placeholder="Jane Doe"
                  value={form.name}
                  onChange={handleChange}
                  aria-invalid={!!errors.name}
                />
                {errors.name && <span className="field__error">{errors.name}</span>}
              </div>
              <div className="field">
                <label htmlFor="c-email">Email</label>
                <input
                  id="c-email"
                  name="email"
                  type="email"
                  placeholder="jane@company.com"
                  value={form.email}
                  onChange={handleChange}
                  aria-invalid={!!errors.email}
                />
                {errors.email && <span className="field__error">{errors.email}</span>}
              </div>
            </div>

            <div className="field">
              <label htmlFor="c-subject">Subject</label>
              <input
                id="c-subject"
                name="subject"
                type="text"
                placeholder="Project inquiry"
                value={form.subject}
                onChange={handleChange}
              />
            </div>

            <div className="field">
              <label htmlFor="c-message">Message</label>
              <textarea
                id="c-message"
                name="message"
                rows="5"
                placeholder="Tell me about your project…"
                value={form.message}
                onChange={handleChange}
                aria-invalid={!!errors.message}
              />
              {errors.message && <span className="field__error">{errors.message}</span>}
            </div>

            <button
              type="submit"
              className="btn btn--primary contact__submit"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Sending…' : 'Send message'}
            </button>

            {status === 'success' && (
              <p className="contact__status contact__status--ok">
                ✓ Message sent! I'll get back to you soon.
              </p>
            )}
            {status === 'offline' && (
              <p className="contact__status contact__status--err">
                ✕ The backend is offline. Start it with{' '}
                <code className="contact__code">npm run dev</code> inside{' '}
                <code className="contact__code">server/</code>, or{' '}
                <a href="mailto:sbinogma41@gmail.com">email me directly</a>.
              </p>
            )}
            {status === 'error' && (
              <p className="contact__status contact__status--err">
                ✕ The server couldn't accept the message.{' '}
                <a href="mailto:sbinogma41@gmail.com">Email me directly</a> instead.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}