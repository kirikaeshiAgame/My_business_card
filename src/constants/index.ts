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
  email: 'andrey@example.com',
  telegram: {
    handle: '@andrey_dev',
    url: 'https://t.me/andrey_dev',
  },
  github: {
    label: 'github.com/andrey-dev',
    url: 'https://github.com/andrey-dev',
  },
  linkedin: {
    url: 'https://linkedin.com/in/andrey-dev',
  },
} as const;
