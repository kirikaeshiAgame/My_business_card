import { useState, useCallback } from 'react';
import type { ContactFormData, ContactFormErrors, FormStatus } from '@/types';
import { validateContactForm, hasErrors } from '@/utils/validators';
import { API_ROUTES } from '@/constants';

const INITIAL_DATA: ContactFormData = {
  name: '',
  phone: '',
  email: '',
  comment: '',
};

export function useContactForm() {
  const [data, setData] = useState<ContactFormData>(INITIAL_DATA);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [touched, setTouched] = useState<Partial<Record<keyof ContactFormData, boolean>>>({});

  const handleChange = useCallback(
    (field: keyof ContactFormData, value: string) => {
      setData((prev) => ({ ...prev, [field]: value }));
      if (touched[field]) {
        const newData = { ...data, [field]: value };
        const newErrors = validateContactForm(newData);
        setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
      }
    },
    [data, touched]
  );

  const handleBlur = useCallback(
    (field: keyof ContactFormData) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      const fieldErrors = validateContactForm(data);
      setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }));
    },
    [data]
  );

  const setFieldValue = useCallback((field: keyof ContactFormData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const allTouched = Object.keys(INITIAL_DATA).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {} as Record<keyof ContactFormData, boolean>
      );
      setTouched(allTouched);

      const validationErrors = validateContactForm(data);
      setErrors(validationErrors);

      if (hasErrors(validationErrors)) return;

      setStatus('loading');

      try {
        const response = await fetch(API_ROUTES.contact, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error ?? 'Ошибка отправки');
        }

        setStatus('success');
        setData(INITIAL_DATA);
        setTouched({});
        setErrors({});
      } catch {
        setStatus('error');
      }
    },
    [data]
  );

  const resetStatus = useCallback(() => setStatus('idle'), []);

  return {
    data,
    errors,
    status,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    resetStatus,
  };
}
