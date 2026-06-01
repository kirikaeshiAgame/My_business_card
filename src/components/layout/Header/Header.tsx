import React from 'react';
import { useHeader } from '@/hooks/useHeader';
import { SECTION_IDS } from '@/constants';
import './Header.scss';

const NAV_LINKS = [
  { href: `#${SECTION_IDS.about}`, label: 'Обо мне' },
  { href: `#${SECTION_IDS.workflow}`, label: 'Как работаю' },
  { href: `#${SECTION_IDS.projects}`, label: 'Проекты' },
  { href: `#${SECTION_IDS.contact}`, label: 'Контакты' },
] as const;

export const Header: React.FC = () => {
  const { isScrolled, isMobileOpen, activeSection, toggleMobile, closeMobile } = useHeader();

  return (
    <header
      className={`header ${isScrolled ? 'header--scrolled' : ''} ${isMobileOpen ? 'header--open' : ''}`}
      role="banner"
    >
      <div className="header__inner container">
        <a href={`#${SECTION_IDS.hero}`} className="header__logo" aria-label="Андрей — на главную">
          <span className="header__logo-mark">А</span>
          <span className="header__logo-text">Андрей</span>
        </a>

        <nav className="header__nav" aria-label="Основная навигация">
          <ul className="header__nav-list" role="list">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className={`header__nav-link ${activeSection === href.slice(1) ? 'header__nav-link--active' : ''}`}
                  onClick={closeMobile}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a href={`#${SECTION_IDS.contact}`} className="header__cta" onClick={closeMobile}>
          Связаться
        </a>

        <button
          className={`header__burger ${isMobileOpen ? 'header__burger--open' : ''}`}
          onClick={toggleMobile}
          aria-expanded={isMobileOpen}
          aria-controls="mobile-menu"
          aria-label={isMobileOpen ? 'Закрыть меню' : 'Открыть меню'}
        >
          <span className="header__burger-line" />
          <span className="header__burger-line" />
          <span className="header__burger-line" />
        </button>
      </div>

      {isMobileOpen && (
        <div
          id="mobile-menu"
          className="header__mobile"
          role="dialog"
          aria-modal="true"
          aria-label="Навигационное меню"
        >
          <nav aria-label="Мобильная навигация">
            <ul className="header__mobile-list" role="list">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="header__mobile-link"
                    onClick={closeMobile}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a href={`#${SECTION_IDS.contact}`} className="header__mobile-cta" onClick={closeMobile}>
            Связаться со мной
          </a>
        </div>
      )}
    </header>
  );
};
