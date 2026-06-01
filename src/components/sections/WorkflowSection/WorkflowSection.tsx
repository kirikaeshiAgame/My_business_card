import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import type { WorkflowStep } from '@/types';
import './WorkflowSection.scss';

const STEPS: WorkflowStep[] = [
  {
    number: '01',
    icon: '🔍',
    title: 'Исследование',
    description:
      'Изучаю бизнес-задачу, целевую аудиторию и конкурентов. Формирую чёткое понимание ожидаемого результата до написания первой строки кода.',
  },
  {
    number: '02',
    icon: '📐',
    title: 'Проектирование',
    description:
      'Определяю архитектуру, выбираю стек, описываю API. Использую AI для генерации черновиков и быстрой итерации по решениям.',
  },
  {
    number: '03',
    icon: '⚡',
    title: 'Разработка',
    description:
      'Пишу чистый, типизированный код по принципам SRP и DRY. Применяю AI-ассистентов (Grok, Claude) для ускорения рутинных задач.',
  },
  {
    number: '04',
    icon: '🧪',
    title: 'Тестирование',
    description:
      'Тестирую функциональность и edge-кейсы. Проверяю производительность, доступность (a11y) и кросс-браузерную совместимость.',
  },
  {
    number: '05',
    icon: '🚀',
    title: 'Деплой',
    description:
      'Настраиваю CI/CD, деплою на продакшен. Настраиваю мониторинг и остаюсь на связи после запуска для оперативного фикса.',
  },
];

const AI_TOOLS = [
  { name: 'Claude', desc: 'Архитектурные решения и код-ревью' },
  { name: 'Grok', desc: 'Ускорение написания кода' },
  { name: 'OpenRouter', desc: 'AI-фичи в продукте' },
  { name: 'ChatGPT', desc: 'Брейншторм и документация' },
];

export const WorkflowSection: React.FC = () => {
  const sectionRef = useScrollAnimation<HTMLElement>();

  return (
    <section
      id="workflow"
      className="workflow section"
      ref={sectionRef}
      aria-labelledby="workflow-title"
    >
      <div className="container">
        <div className="section__header">
          <p className="section__label animate-up">
            <span aria-hidden="true">⚙️</span>
            Процесс
          </p>
          <h2 id="workflow-title" className="section__title animate-up delay-1">
            Как я работаю
          </h2>
          <p className="section__subtitle animate-up delay-2">
            Прозрачный процесс от задачи до результата. Без лишней бюрократии,
            с фокусом на качество и сроки.
          </p>
        </div>

        <ol className="workflow__steps" aria-label="Этапы разработки">
          {STEPS.map((step, i) => (
            <li
              key={step.number}
              className={`workflow__step animate-up delay-${i + 1}`}
            >
              <div className="workflow__step-number" aria-hidden="true">
                {step.number}
              </div>
              <div className="workflow__step-content">
                <div className="workflow__step-header">
                  <span className="workflow__step-icon" aria-hidden="true">
                    {step.icon}
                  </span>
                  <h3 className="workflow__step-title">{step.title}</h3>
                </div>
                <p className="workflow__step-desc">{step.description}</p>
              </div>
              {i < STEPS.length - 1 && (
                <div className="workflow__step-connector" aria-hidden="true" />
              )}
            </li>
          ))}
        </ol>

        <div className="workflow__ai animate-up delay-3">
          <div className="workflow__ai-badge" aria-hidden="true">
            ✨ AI-first подход
          </div>
          <h3 className="workflow__ai-title">
            Использую AI как умный инструмент
          </h3>
          <p className="workflow__ai-desc">
            AI не заменяет экспертизу — он усиливает её. Я использую AI-инструменты
            осмысленно: для ускорения рутины, генерации вариантов решений и
            код-ревью. Финальное решение всегда остаётся за мной.
          </p>
          <ul className="workflow__ai-tools" role="list">
            {AI_TOOLS.map(({ name, desc }) => (
              <li key={name} className="workflow__ai-tool">
                <span className="workflow__ai-tool-name">{name}</span>
                <span className="workflow__ai-tool-desc">{desc}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
