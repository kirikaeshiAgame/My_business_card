import React from 'react';

interface FieldWrapperProps {
  fieldId: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}

export const FieldWrapper: React.FC<FieldWrapperProps> = ({
  fieldId,
  label,
  required,
  error,
  hint,
  className = '',
  children,
}) => {
  const hasError = Boolean(error);

  return (
    <div className={`field ${hasError ? 'field--error' : ''} ${className}`.trim()}>
      <label className="field__label" htmlFor={fieldId}>
        {label}
        {required && (
          <span className="field__required" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {hasError && (
        <p id={`${fieldId}-error`} className="field__error" role="alert">
          {error}
        </p>
      )}
      {hint && !hasError && (
        <p id={`${fieldId}-hint`} className="field__hint">
          {hint}
        </p>
      )}
    </div>
  );
};
