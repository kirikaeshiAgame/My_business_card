import { useState, useCallback } from 'react';
import { API_ROUTES } from '@/constants';

type AiStatus = 'idle' | 'loading' | 'success' | 'error';

export function useAiAssistant() {
  const [status, setStatus] = useState<AiStatus>('idle');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const generate = useCallback(async (userInput: string) => {
    if (!userInput.trim()) return;

    setStatus('loading');
    setError('');

    try {
      const response = await fetch(API_ROUTES.aiAssist, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userInput }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error ?? 'Не удалось получить ответ от AI');
      }

      const data = await response.json();
      setResult(data.message);
      setStatus('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка');
      setStatus('error');
    }
  }, []);

  const reset = useCallback(() => {
    setStatus('idle');
    setResult('');
    setError('');
  }, []);

  return { status, result, error, generate, reset };
}
