import { useEffect } from 'react';

export default function useReveal(targetRef) {
  useEffect(() => {
    const root = targetRef?.current ?? document;
    const elements = root.querySelectorAll('.reveal:not(.is-visible)');
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [targetRef]);
}