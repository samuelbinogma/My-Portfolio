import { useEffect, useRef, useState } from 'react';
import { fetchProjects } from '../api';
import useReveal from '../hooks/useReveal';
import './projects.css';

const FALLBACK = [
  {
    title: 'Nova Commerce',
    description: 'A full-featured MERN e-commerce platform with cart, checkout, and Stripe payments.',
    longDescription:
      'Built with React, Redux Toolkit, Node.js, Express and MongoDB. JWT auth, reviews, search & pagination and a Stripe checkout wrapped in a polished UI.',
    stack: ['React', 'Redux', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
    liveUrl: '#',
    repoUrl: '#',
    featured: true,
    category: 'Full Stack',
  },
  {
    title: 'Moodboard',
    description: 'A visual collaboration app for designers to collect, tag and share inspiration.',
    longDescription:
      'Drag-and-drop boards, real-time sync via Socket.io and an auto-tagging engine. Handles thousands of images with Cloudinary delivery.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io'],
    liveUrl: '#',
    repoUrl: '#',
    featured: false,
    category: 'Web App',
  },
  {
    title: 'Taskly',
    description: 'A minimal, blazing-fast task manager with kanban boards and analytics.',
    longDescription:
      'Kanban drag-and-drop, progress heatmaps, and weekly productivity insights generated from user activity logs. Offline-first with IndexedDB.',
    stack: ['React', 'Express', 'MongoDB', 'dnd-kit'],
    liveUrl: '#',
    repoUrl: '#',
    featured: false,
    category: 'Productivity',
  },
  {
    title: 'DevSphere API',
    description: 'A REST API toolkit for developers with rate limiting, docs and key management.',
    longDescription:
      'Production-grade Express API with JWT auth, role-based access, swagger docs, request validation and a usage analytics dashboard.',
    stack: ['Node.js', 'Express', 'MongoDB', 'JWT'],
    liveUrl: '',
    repoUrl: '#',
    featured: false,
    category: 'API',
  },
];

const COVERS = [
  'linear-gradient(135deg, #35798d, #bcd7d6)',
  'linear-gradient(135deg, #6fa3b7, #dce8e2)',
  'linear-gradient(135deg, #3f7384, #b8d5cf)',
  'linear-gradient(135deg, #7fb1c0, #c9a76a)',
];

const monogram = (title) => title.replace(/[^a-z0-9]/gi, '').slice(0, 2).toUpperCase();

export default function Projects() {
  const [projects, setProjects] = useState(null);
  const [offline, setOffline] = useState(false);
  const ref = useRef(null);
  useReveal(ref, [projects]);

  useEffect(() => {
    let mounted = true;
    fetchProjects()
      .then((data) => {
        if (mounted) setProjects(data);
      })
      .catch(() => {
        if (mounted) {
          setProjects(FALLBACK);
          setOffline(true);
        }
      });
    return () => {
      mounted = false;
    };
  }, []);

  const list = projects ?? FALLBACK;

  return (
    <section id="projects" ref={ref}>
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">Selected work</span>
          <h2>
            Projects I'm <span className="text-gradient">proud of</span>
          </h2>
          <p>
            Real products, real users — each one an exercise in craft, scale and
            clean architecture.
            {offline && (
              <em className="skills__notice"> (showing sample data — start the API to go live)</em>
            )}
          </p>
        </div>

        <div className="projects__grid">
          {list.map((project, i) => (
            <article
              key={project._id ?? project.title}
              className={`project-card reveal ${project.featured ? 'project-card--featured' : ''}`}
              style={{ '--delay': `${i * 80}ms` }}
            >
              <div
                className="project-card__cover"
                style={{ '--cover': COVERS[i % COVERS.length] }}
              >
                <span className="project-card__monogram">{monogram(project.title)}</span>
                {project.featured && <span className="project-card__pin">★ Featured</span>}
                <div className="project-card__veil" />
              </div>

              <div className="project-card__body">
                <div className="project-card__head">
                  <span className="project-card__cat">{project.category}</span>
                  <h3>{project.title}</h3>
                </div>

                <p className="project-card__desc">{project.description}</p>

                <div className="project-card__tags">
                  {project.stack.slice(0, 5).map((tech) => (
                    <span key={tech} className="chip">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="project-card__links">
                  {project.liveUrl && (
                    <a
                      className="project-card__link"
                      href={project.liveUrl === '#' ? undefined : project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => project.liveUrl === '#' && e.preventDefault()}
                    >
                      Live demo ↗
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      className="project-card__link project-card__link--gh"
                      href={project.repoUrl === '#' ? undefined : project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => project.repoUrl === '#' && e.preventDefault()}
                    >
                      Source code ↗
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}