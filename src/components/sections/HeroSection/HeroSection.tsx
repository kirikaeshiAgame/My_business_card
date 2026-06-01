import React from 'react';
import { Button } from '@/components/ui/Button/Button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { scrollToSection } from '@/utils/scroll';
import { SECTION_IDS } from '@/constants';
import './HeroSection.scss';

const TECH_TAGS = [
  'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'Next.js',
];

export const HeroSection: React.FC = () => {
  const sectionRef = useScrollAnimation<HTMLElement>({ threshold: 0, rootMargin: '0px' });

  return (
    <section id={SECTION_IDS.hero} className="hero" ref={sectionRef} aria-label="Главный блок">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__bg-orb hero__bg-orb--1" />
        <div className="hero__bg-orb hero__bg-orb--2" />
        <div className="hero__bg-grid" />
      </div>

      <div className="hero__inner container">
        <div className="hero__content">
          <div className="hero__greeting animate-up">
            <span className="hero__greeting-dot" aria-hidden="true" />
            <span>Привет, я Андрей</span>
          </div>

          <h1 className="hero__title animate-up delay-1">
            Fullstack{' '}
            <span className="hero__title-accent">разработчик</span>
            <br />
            строящий продукты
            <br />
            <span className="hero__title-accent">с душой</span>
          </h1>

          <p className="hero__subtitle animate-up delay-2">
            Создаю современные веб-приложения от идеи до продакшена.
            Ценю чистый код, продуманный UX и результат, которым гордятся.
          </p>

          <div className="hero__actions animate-up delay-3">
            <Button
              size="lg"
              rightIcon={
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
              onClick={() => scrollToSection(SECTION_IDS.projects)}
            >
              Посмотреть работы
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection(SECTION_IDS.contact)}
            >
              Связаться
            </Button>
          </div>

          <div className="hero__tags animate-up delay-4" aria-label="Технологии">
            {TECH_TAGS.map((tag) => (
              <span key={tag} className="hero__tag">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="hero__visual animate-in delay-3" aria-hidden="true">
          <div className="hero__card hero__card--code">
            <div className="hero__card-header">
              <span className="hero__card-dot" />
              <span className="hero__card-dot" />
              <span className="hero__card-dot" />
              <span className="hero__card-title">portfolio.ts</span>
            </div>
            <pre className="hero__card-code">
              <code>
                <span className="hero__code-keyword">const</span>
                {' '}
                <span className="hero__code-var">andrey</span>
                {' = {\n  '}
                <span className="hero__code-key">role</span>
                {': '}
                <span className="hero__code-string">'Fullstack Dev'</span>
                {',\n  '}
                <span className="hero__code-key">exp</span>
                {': '}
                <span className="hero__code-number">4</span>
                {' '}
                <span className="hero__code-comment">{'// лет'}</span>
                {',\n  '}
                <span className="hero__code-key">aiFirst</span>
                {': '}
                <span className="hero__code-bool">true</span>
                {',\n  '}
                <span className="hero__code-key">open</span>
                {': '}
                <span className="hero__code-bool">true</span>
                {'\n}'}
              </code>
            </pre>
          </div>

          <div className="hero__stat hero__stat--1">
            <span className="hero__stat-value">30+</span>
            <span className="hero__stat-label">проектов</span>
          </div>
          <div className="hero__stat hero__stat--2">
            <span className="hero__stat-value">4</span>
            <span className="hero__stat-label">года опыта</span>
          </div>
        </div>
      </div>

      <div className="hero__scroll-hint animate-in delay-5" aria-hidden="true">
        <div className="hero__scroll-mouse">
          <div className="hero__scroll-wheel" />
        </div>
        <span>Скролл</span>
      </div>
    </section>
  );
};
