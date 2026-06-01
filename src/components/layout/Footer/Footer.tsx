import React from 'react';
import { PERSONAL, SECTION_IDS } from '@/constants';
import './Footer.scss';

const SOCIAL_LINKS = [
  { label: 'GitHub', href: PERSONAL.github.url, icon: 'GH' },
  { label: 'Telegram', href: PERSONAL.telegram.url, icon: 'TG' },
  { label: 'LinkedIn', href: PERSONAL.linkedin.url, icon: 'LI' },
] as const;

export const Footer: React.FC = () => {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner container">
        <div className="footer__left">
          <a href={`#${SECTION_IDS.hero}`} className="footer__logo" aria-label="Вернуться на главную">
            <span className="footer__logo-mark">А</span>
            <span>Андрей</span>
          </a>
          <p className="footer__tagline">
            Строю продукты с душой и вниманием к деталям.
          </p>
        </div>

        <div className="footer__right">
          <nav aria-label="Социальные сети">
            <ul className="footer__social" role="list">
              {SOCIAL_LINKS.map(({ label, href, icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="footer__social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                  >
                    {icon}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="footer__bottom container">
        <p className="footer__copy">
          © {new Date().getFullYear()} Андрей. Все права защищены.
        </p>
        <p className="footer__built">
          Создано с React + TypeScript
        </p>
      </div>
    </footer>
  );
};
