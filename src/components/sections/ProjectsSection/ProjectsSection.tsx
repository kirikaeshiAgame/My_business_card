import React from 'react';
import { Badge } from '@/components/ui/Badge/Badge';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import type { Project } from '@/types';
import './ProjectsSection.scss';

const PROJECTS: Project[] = [
  {
    id: 'flutter-rubert',
    title: 'Flutter AI Text Assistant',
    description:
      'Мобильное приложение на Flutter со встроенной нейросетью RuBERT. Помогает пользователю разбираться с текстом: анализ, классификация и умные подсказки. Нейронка работает полностью офлайн, без внешних API.',
    stack: ['Flutter', 'Dart', 'RuBERT', 'TensorFlow Lite'],
    tag: 'Mobile / AI',
    imageGradient: 'linear-gradient(135deg, #0EA5E9 0%, #6366F1 100%)',
  },
  {
    id: 'react-production',
    title: 'Оптимизатор производственного плана',
    description:
      'React-приложение для оптимизации производственного плана предприятия. Визуализация загрузки цехов, расчёт оптимальных маршрутов и автоматическое перераспределение задач между участками.',
    stack: ['React', 'TypeScript', 'D3.js', 'Algorithms'],
    tag: 'Production / Analytics',
    imageGradient: 'linear-gradient(135deg, #059669 0%, #0D9488 100%)',
  },
  {
    id: 'angular-alchemist',
    title: 'Симулятор Алхимика',
    description:
      'Angular-игра-симулятор с математическим алгоритмом поиска максимального вхождения под капотом. Игровая оболочка алхимика превращает изучение алгоритмов в увлекательный процесс.',
    stack: ['Angular', 'TypeScript', 'RxJS', 'Algorithms'],
    tag: 'Game / Algorithms',
    imageGradient: 'linear-gradient(135deg, #EA580C 0%, #DC2626 100%)',
  },
  {
    id: 'api-names',
    title: 'API Practice — Загрузка имён',
    description:
      'Проект для практики работы с REST API. Подгрузка имён с внешнего сервиса, фильтрация, пагинация и обработка ошибок — чистая работа с асинхронными данными без лишних зависимостей.',
    stack: ['JavaScript', 'REST API', 'Fetch', 'HTML/CSS'],
    tag: 'API / Practice',
    imageGradient: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)',
  },
];

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => (
  <article
    className={`project-card animate-up delay-${index + 1}`}
    aria-labelledby={`project-${project.id}-title`}
  >
    <div
      className="project-card__image"
      style={{ background: project.imageGradient }}
      aria-hidden="true"
    >
      <div className="project-card__image-overlay">
        <span className="project-card__tag">{project.tag}</span>
      </div>
      <div className="project-card__mockup" aria-hidden="true">
        <div className="project-card__mockup-bar" />
        <div className="project-card__mockup-bar" style={{ width: '60%' }} />
        <div className="project-card__mockup-bar" style={{ width: '80%' }} />
      </div>
    </div>

    <div className="project-card__body">
      <h3 id={`project-${project.id}-title`} className="project-card__title">
        {project.title}
      </h3>
      <p className="project-card__desc">{project.description}</p>

      <div className="project-card__stack" aria-label="Стек технологий">
        {project.stack.map((tech) => (
          <Badge key={tech} variant="accent">
            {tech}
          </Badge>
        ))}
      </div>
    </div>
  </article>
);

export const ProjectsSection: React.FC = () => {
  const sectionRef = useScrollAnimation<HTMLElement>();

  return (
    <section
      id="projects"
      className="projects section"
      ref={sectionRef}
      aria-labelledby="projects-title"
    >
      <div className="container">
        <div className="section__header">
          <p className="section__label animate-up">
            <span aria-hidden="true">🗂️</span>
            Кейсы
          </p>
          <h2 id="projects-title" className="section__title animate-up delay-1">
            Избранные проекты
          </h2>
          <p className="section__subtitle animate-up delay-2">
            Несколько работ, которые отражают мой подход к разработке.
            От MVP до enterprise-решений.
          </p>
        </div>

        <div className="projects__grid">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
