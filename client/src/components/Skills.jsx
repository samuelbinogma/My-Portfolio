import { useEffect, useRef, useState } from 'react';
import { fetchSkills } from '../api';
import useReveal from '../hooks/useReveal';
import './skills.css';

const FALLBACK = [
  { name: 'React', level: 92, category: 'Frontend', icon: '⚛️' },
  { name: 'JavaScript (ES2024)', level: 90, category: 'Frontend', icon: '📜' },
  { name: 'TypeScript', level: 84, category: 'Frontend', icon: '🔷' },
  { name: 'CSS / Animations', level: 88, category: 'Frontend', icon: '🎨' },
  { name: 'Node.js', level: 90, category: 'Backend', icon: '🟢' },
  { name: 'Express', level: 87, category: 'Backend', icon: '🚂' },
  { name: 'MongoDB', level: 85, category: 'Backend', icon: '🍃' },
  { name: 'REST APIs', level: 89, category: 'Backend', icon: '🔗' },
  { name: 'Git & CI/CD', level: 82, category: 'Tools', icon: '🐙' },
  { name: 'Docker', level: 74, category: 'Tools', icon: '🐳' },
];

export default function Skills() {
  const [skills, setSkills] = useState(null);
  const [offline, setOffline] = useState(false);
  const ref = useRef(null);
  useReveal(ref, [skills]);

  useEffect(() => {
    let mounted = true;
    fetchSkills()
      .then((data) => {
        if (mounted) setSkills(data);
      })
      .catch(() => {
        if (mounted) {
          setSkills(FALLBACK);
          setOffline(true);
        }
      });
    return () => {
      mounted = false;
    };
  }, []);

  const groups = ['Frontend', 'Backend', 'Tools'].map((cat) => ({
    cat,
    items: (skills ?? FALLBACK).filter((s) => s.category === cat),
  }));

  return (
    <section id="skills" ref={ref}>
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">Skills</span>
          <h2>
            The <span className="text-gradient">toolkit</span> I reach for daily
          </h2>
          <p>
            A focused stack, deep rather than wide — every project gets the right
            tool for the job.
            {offline && (
              <em className="skills__notice"> (showing sample data — start the API to go live)</em>
            )}
          </p>
        </div>

        <div className="skills__groups">
          {groups.map(
            (group) =>
              group.items.length > 0 && (
                <div key={group.cat} className="skills__group reveal">
                  <h3 className="skills__group-title">
                    {group.cat}
                    <span>{group.items.length}</span>
                  </h3>
                  <div className="skills__list">
                    {group.items.map((skill) => (
                      <div key={skill.name} className="skill">
                        <div className="skill__head">
                          <span className="skill__name">
                            <i className="skill__icon">{skill.icon || '▸'}</i>
                            {skill.name}
                          </span>
                          <span className="skill__level">{skill.level}%</span>
                        </div>
                        <div
                          className="skill__track"
                          role="progressbar"
                          aria-valuenow={skill.level}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <span
                            className="skill__fill"
                            style={{ '--level': `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </section>
  );
}