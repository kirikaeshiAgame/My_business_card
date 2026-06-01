import React, { useState } from 'react';
import { Button } from '@/components/ui/Button/Button';
import { useAiAssistant } from '@/hooks/useAiAssistant';
import './AiAssistant.scss';

interface AiAssistantProps {
  currentComment: string;
  onApply: (text: string) => void;
}

export const AiAssistant: React.FC<AiAssistantProps> = ({ currentComment, onApply }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userInput, setUserInput] = useState('');
  const { status, result, error, generate, reset } = useAiAssistant();

  const handleOpen = () => {
    setIsOpen(true);
    if (currentComment.trim()) {
      setUserInput(currentComment);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setUserInput('');
    reset();
  };

  const handleGenerate = () => {
    generate(userInput);
  };

  const handleApply = () => {
    onApply(result);
    handleClose();
  };

  return (
    <div className="ai-assistant">
      <button
        type="button"
        className="ai-assistant__trigger"
        onClick={handleOpen}
        aria-expanded={isOpen}
        aria-controls="ai-assistant-panel"
        title="Открыть AI-помощника для формулировки сообщения"
      >
        <span className="ai-assistant__trigger-icon" aria-hidden="true">✨</span>
        <span>AI помощник</span>
      </button>

      {isOpen && (
        <div
          className="ai-assistant__panel"
          id="ai-assistant-panel"
          role="dialog"
          aria-modal="true"
          aria-label="AI помощник для формулировки сообщения"
        >
          <div className="ai-assistant__overlay" onClick={handleClose} aria-hidden="true" />
          <div className="ai-assistant__content">
            <div className="ai-assistant__header">
              <div className="ai-assistant__header-left">
                <div className="ai-assistant__ai-badge" aria-hidden="true">✨</div>
                <div>
                  <h4 className="ai-assistant__title">AI помощник</h4>
                  <p className="ai-assistant__subtitle">
                    Опишите задачу — AI сформулирует профессиональное сообщение
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="ai-assistant__close"
                onClick={handleClose}
                aria-label="Закрыть AI помощника"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M1 1l14 14M15 1L1 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="ai-assistant__body">
              <div className="ai-assistant__input-group">
                <label htmlFor="ai-input" className="ai-assistant__label">
                  Опишите вашу задачу или проблему (своими словами)
                </label>
                <textarea
                  id="ai-input"
                  className="ai-assistant__textarea"
                  placeholder="Например: нужен сайт для ресторана, чтобы там было меню и форма бронирования столика..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  rows={4}
                  disabled={status === 'loading'}
                />
              </div>

              <Button
                type="button"
                variant="secondary"
                size="md"
                fullWidth
                isLoading={status === 'loading'}
                onClick={handleGenerate}
                disabled={!userInput.trim()}
                leftIcon={
                  status !== 'loading' && (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M7 1v2M7 11v2M1 7h2M11 7h2M2.929 2.929l1.414 1.414M9.657 9.657l1.414 1.414M2.929 11.071l1.414-1.414M9.657 4.343l1.414-1.414" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  )
                }
              >
                {status === 'loading' ? 'Генерирую...' : 'Сгенерировать'}
              </Button>

              {error && (
                <div className="ai-assistant__error" role="alert">
                  <span aria-hidden="true">⚠️</span>
                  {error}
                </div>
              )}

              {status === 'success' && result && (
                <div className="ai-assistant__result" aria-live="polite">
                  <div className="ai-assistant__result-header">
                    <span className="ai-assistant__result-label">Готово! Вот ваше сообщение:</span>
                  </div>
                  <div className="ai-assistant__result-text">{result}</div>
                  <div className="ai-assistant__result-actions">
                    <Button
                      type="button"
                      size="sm"
                      onClick={handleApply}
                      leftIcon={
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                          <path d="M1 6l4 4 6-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      }
                    >
                      Вставить в форму
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => { reset(); setUserInput(''); }}
                    >
                      Попробовать снова
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
