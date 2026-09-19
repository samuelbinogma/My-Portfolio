const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function request(path, options = {}) {
  let res;
  try {
    res = await fetch(`${API_URL}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });
  } catch {
    const error = new Error('Cannot reach the API server');
    error.code = 'NETWORK';
    throw error;
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Request failed (${res.status})`);
  }
  return res.json();
}

export const fetchProjects = () => request('/projects');
export const fetchSkills = () => request('/skills');
export const sendMessage = (payload) =>
  request('/messages', { method: 'POST', body: JSON.stringify(payload) });