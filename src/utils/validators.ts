import type { ContactFormData, ContactFormErrors } from '@/types';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[\d\s\-+()]{7,20}$/;

export function validateContactForm(data: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!data.name.trim()) {
    errors.name = 'Введите ваше имя';
  } else if (data.name.trim().length < 2) {
    errors.name = 'Имя должно быть не менее 2 символов';
  }

  if (!data.phone.trim()) {
    errors.phone = 'Введите номер телефона';
  } else if (!PHONE_REGEX.test(data.phone.trim())) {
    errors.phone = 'Введите корректный номер телефона';
  }

  if (!data.email.trim()) {
    errors.email = 'Введите email';
  } else if (!EMAIL_REGEX.test(data.email.trim())) {
    errors.email = 'Введите корректный email';
  }

  if (!data.comment.trim()) {
    errors.comment = 'Опишите ваш запрос';
  } else if (data.comment.trim().length < 10) {
    errors.comment = 'Сообщение должно быть не менее 10 символов';
  }

  return errors;
}

export function hasErrors(errors: ContactFormErrors): boolean {
  return Object.keys(errors).length > 0;
}
