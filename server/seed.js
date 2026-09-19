import 'dotenv/config';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import Project from './models/Project.js';
import Skill from './models/Skill.js';

const projects = [
  {
    title: 'Nova Commerce',
    description:
      'A full-featured MERN e-commerce platform with cart, checkout, and Stripe payments.',
    longDescription:
      'Built with React, Redux Toolkit, Node.js, Express and MongoDB. Features JWT auth, product reviews, search & pagination, order history and a Stripe-powered checkout flow all wrapped in a polished, responsive UI.',
    stack: ['React', 'Redux', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
    liveUrl: 'https://example.com/nova-commerce',
    repoUrl: 'https://github.com/yourname/nova-commerce',
    featured: true,
    category: 'Full Stack',
  },
  {
    title: 'Moodboard',
    description:
      'A visual collaboration app for designers to collect, tag and share inspiration.',
    longDescription:
      'Drag-and-drop boards, real-time sync via Socket.io and a smart auto-tagging engine. Handles thousands of images with Cloudinary delivery and lazy-loaded masonry layouts.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io'],
    liveUrl: 'https://example.com/moodboard',
    repoUrl: 'https://github.com/yourname/moodboard',
    featured: false,
    category: 'Web App',
  },
  {
    title: 'Taskly',
    description:
      'A minimal, blazing-fast task manager with kanban boards and analytics.',
    longDescription:
      'Kanban drag-and-drop, progress heatmaps, and weekly productivity insight generated from user activity logs. Offline-first with IndexedDB fallback.',
    stack: ['React', 'Express', 'MongoDB', 'dnd-kit'],
    liveUrl: 'https://example.com/taskly',
    repoUrl: 'https://github.com/yourname/taskly',
    featured: false,
    category: 'Productivity',
  },
  {
    title: 'DevSphere API',
    description:
      'A REST API toolkit for developers with rate limiting, docs and key management.',
    longDescription:
      'Production-grade Express API with JWT auth, role-based access, swagger docs, request validation and usage analytics dashboard.',
    stack: ['Node.js', 'Express', 'MongoDB', 'JWT'],
    liveUrl: '',
    repoUrl: 'https://github.com/yourname/devsphere-api',
    featured: false,
    category: 'API',
  },
];

const skills = [
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

const run = async () => {
  await connectDB();
  await Project.deleteMany();
  await Skill.deleteMany();
  await Project.insertMany(projects);
  await Skill.insertMany(skills);
  console.log(`Seeded ${projects.length} projects and ${skills.length} skills.`);
  await mongoose.connection.close();
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});