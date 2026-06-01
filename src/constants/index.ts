export const SECTION_IDS = {
  hero: 'hero',
  about: 'about',
  workflow: 'workflow',
  projects: 'projects',
  contact: 'contact',
} as const;

const API_BASE = import.meta.env.VITE_API_URL ?? '';

export const API_ROUTES = {
  contact: `${API_BASE}/api/contact`,
  aiAssist: `${API_BASE}/api/ai/assist`,
} as const;

export const PERSONAL = {
  name: 'Андрей',
  email: 'mail@mail.ru',
  telegram: {
    handle: '@Tg',
    url: 'https://t.me/Tg',
  },
  github: {
    label: 'github.com',
    url: 'https://github.com',
  },
  linkedin: {
    url: 'https://linkedin.com/in/andrey-dev',
  },
} as const;
