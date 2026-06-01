import React from 'react';
import { Badge } from '@/components/ui/Badge/Badge';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import type { SkillGroup } from '@/types';
import './AboutSection.scss';

const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'Frontend',
    skills: ['React', 'TypeScript', 'Next.js', 'SCSS/CSS', 'Vite'],
  },
  {
    category: 'Backend',
    skills: ['Node.js', 'Express', 'PostgreSQL', 'Prisma', 'REST / GraphQL'],
  },
  {
    category: 'DevOps & Tools',
    skills: ['Docker', 'Git', 'Linux', 'Nginx', 'CI/CD'],
  },
  {
    category: 'AI & Инструменты',
    skills: ['OpenRouter', 'Prompt Engineering', 'Grok', 'Claude'],
  },
];

const STATS = [
  { value: '4+', label: 'лет в разработке' },
  { value: '30+', label: 'проектов сдано' },
  { value: '100%', label: 'TypeScript' },
  { value: '∞', label: 'стремление к росту' },
] as const;

export const AboutSection: React.FC = () => {
  const sectionRef = useScrollAnimation<HTMLElement>();

  return (
    <section id="about" className="about section" ref={sectionRef} aria-labelledby="about-title">
      <div className="container">
        <div className="section__header">
          <p className="section__label animate-up">
            <span aria-hidden="true">👤</span>
            Обо мне
          </p>
          <h2 id="about-title" className="section__title animate-up delay-1">
            Кто я и чем занимаюсь
          </h2>
          <p className="section__subtitle animate-up delay-2">
            Fullstack и мобильный разработчик с фокусом на качество, производительность и UX.
            Создаю веб-приложения и мобильные приложения — от красивого интерфейса до надёжного бэкенда.
          </p>
        </div>

        <div className="about__layout">
          <div className="about__bio animate-up delay-1">
            <div className="about__avatar" aria-hidden="true">
              <span className="about__avatar-letter">А</span>
              <div className="about__avatar-ring" />
            </div>
            <div className="about__bio-text">
              <p>
                Привет! Я Андрей — fullstack и мобильный разработчик с опытом более{' '}
                <strong>4 лет</strong>. Создаю современные веб-приложения и мобильные
                приложения: от архитектуры и backend API до пиксельно точного UI.
              </p>
              <p>
                Веб-стек — <strong>React + TypeScript</strong> на фронтенде и{' '}
                <strong>Node.js + PostgreSQL</strong> на бэкенде. В мобильной разработке
                работаю с <strong>Flutter</strong>, в том числе интегрирую нейросети
                прямо в приложение. Активно использую AI-инструменты в работе.
              </p>
              <p>
                Мне важны не только технические решения, но и конечный продукт —
                чтобы пользователи получали удовольствие от работы с приложением,
                а бизнес — измеримый результат.
              </p>
            </div>
          </div>

          <div className="about__stats animate-up delay-2">
            {STATS.map(({ value, label }) => (
              <div key={label} className="about__stat">
                <span className="about__stat-value">{value}</span>
                <span className="about__stat-label">{label}</span>
              </div>
            ))}
          </div>

          <div className="about__skills animate-up delay-3">
            <h3 className="about__skills-title">Технологический стек</h3>
            <div className="about__skill-groups">
              {SKILL_GROUPS.map(({ category, skills }) => (
                <div key={category} className="about__skill-group">
                  <span className="about__skill-category">{category}</span>
                  <div className="about__skill-list">
                    {skills.map((skill) => (
                      <Badge key={skill} variant="default">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
