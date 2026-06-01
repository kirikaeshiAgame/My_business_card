import React from 'react';
import { Button } from '@/components/ui/Button/Button';
import { Input } from '@/components/ui/Input/Input';
import { Textarea } from '@/components/ui/Textarea/Textarea';
import { AiAssistant } from '@/components/features/AiAssistant/AiAssistant';
import { useContactForm } from '@/hooks/useForm';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { PERSONAL, SECTION_IDS } from '@/constants';
import './ContactSection.scss';

const CONTACT_INFO = [
  {
    icon: '✉️',
    label: 'Email',
    value: PERSONAL.email,
    href: `mailto:${PERSONAL.email}`,
  },
  {
    icon: '💬',
    label: 'Telegram',
    value: PERSONAL.telegram.handle,
    href: PERSONAL.telegram.url,
  },
  {
    icon: '🌐',
    label: 'GitHub',
    value: PERSONAL.github.label,
    href: PERSONAL.github.url,
  },
] as const;

export const ContactSection: React.FC = () => {
  const sectionRef = useScrollAnimation<HTMLElement>();
  const { data, errors, status, handleChange, handleBlur, handleSubmit, setFieldValue, resetStatus } =
    useContactForm();

  return (
    <section
      id={SECTION_IDS.contact}
      className="contact section"
      ref={sectionRef}
      aria-labelledby="contact-title"
    >
      <div className="container">
        <div className="section__header">
          <p className="section__label animate-up">
            <span aria-hidden="true">📬</span>
            Контакты
          </p>
          <h2 id="contact-title" className="section__title animate-up delay-1">
            Давайте работать вместе
          </h2>
          <p className="section__subtitle animate-up delay-2">
            Есть проект? Хотите обсудить идею? Напишите — отвечу в течение дня.
          </p>
        </div>

        <div className="contact__layout">
          {/* ── Left: info ── */}
          <div className="contact__info animate-up delay-2">
            <div className="contact__info-card">
              <h3 className="contact__info-title">Контактная информация</h3>
              <ul className="contact__info-list" role="list">
                {CONTACT_INFO.map(({ icon, label, value, href }) => (
                  <li key={label} className="contact__info-item">
                    <span className="contact__info-icon" aria-hidden="true">
                      {icon}
                    </span>
                    <div>
                      <span className="contact__info-label">{label}</span>
                      <a
                        href={href}
                        className="contact__info-value"
                        target={href.startsWith('http') ? '_blank' : undefined}
                        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        {value}
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="contact__availability">
              <div className="contact__availability-dot" aria-hidden="true" />
              <div>
                <span className="contact__availability-status">Открыт к новым проектам</span>
                <span className="contact__availability-note">
                  Обычно отвечаю в течение 24 часов
                </span>
              </div>
            </div>
          </div>

          {/* ── Right: form ── */}
          <div className="contact__form-wrap animate-up delay-3">
            {status === 'success' ? (
              <div className="contact__success" role="alert" aria-live="polite">
                <div className="contact__success-icon" aria-hidden="true">✓</div>
                <h3 className="contact__success-title">Сообщение отправлено!</h3>
                <p className="contact__success-text">
                  Спасибо! Я получил ваше сообщение и отвечу в ближайшее время.
                </p>
                <Button variant="secondary" onClick={resetStatus}>
                  Отправить ещё
                </Button>
              </div>
            ) : (
              <form
                className="contact__form"
                onSubmit={handleSubmit}
                noValidate
                aria-label="Форма обратной связи"
              >
                <div className="contact__form-header">
                  <h3 className="contact__form-title">Написать сообщение</h3>
                  <AiAssistant
                    currentComment={data.comment}
                    onApply={(text) => setFieldValue('comment', text)}
                  />
                </div>

                {status === 'error' && (
                  <div className="contact__form-error" role="alert" aria-live="polite">
                    <span aria-hidden="true">⚠️</span>
                    Не удалось отправить сообщение. Попробуйте ещё раз или напишите напрямую.
                  </div>
                )}

                <div className="contact__form-row">
                  <Input
                    label="Имя"
                    type="text"
                    placeholder="Иван Иванов"
                    value={data.name}
                    error={errors.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    onBlur={() => handleBlur('name')}
                    required
                    autoComplete="name"
                  />
                  <Input
                    label="Телефон"
                    type="tel"
                    placeholder="+7 999 123-45-67"
                    value={data.phone}
                    error={errors.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    onBlur={() => handleBlur('phone')}
                    required
                    autoComplete="tel"
                  />
                </div>

                <Input
                  label="Email"
                  type="email"
                  placeholder="ivan@example.com"
                  value={data.email}
                  error={errors.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  required
                  autoComplete="email"
                />

                <Textarea
                  label="Сообщение"
                  placeholder="Расскажите о вашем проекте, задаче или вопросе..."
                  value={data.comment}
                  error={errors.comment}
                  onChange={(e) => handleChange('comment', e.target.value)}
                  onBlur={() => handleBlur('comment')}
                  required
                  rows={5}
                />

                <Button
                  type="submit"
                  size="lg"
                  fullWidth
                  isLoading={status === 'loading'}
                  rightIcon={
                    status !== 'loading' && (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M1 8h14M9 2l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )
                  }
                >
                  {status === 'loading' ? 'Отправляем...' : 'Отправить сообщение'}
                </Button>

                <p className="contact__form-note">
                  Нажимая кнопку, вы соглашаетесь на обработку персональных данных.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
