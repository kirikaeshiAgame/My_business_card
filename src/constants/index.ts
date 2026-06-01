export const SECTION_IDS = {
  hero: 'hero',
  about: 'about',
  workflow: 'workflow',
  projects: 'projects',
  contact: 'contact',
} as const;

export const API_ROUTES = {
  contact: '/api/contact',
  aiAssist: '/api/ai/assist',
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
