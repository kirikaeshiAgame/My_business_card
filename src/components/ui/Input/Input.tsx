import React from 'react';
import { FieldWrapper } from '@/components/ui/Field/FieldWrapper';
import './Input.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, id, className = '', ...rest }, ref) => {
    const inputId = id ?? `input-${label.toLowerCase().replace(/\s+/g, '-')}`;

    return (
      <FieldWrapper
        fieldId={inputId}
        label={label}
        required={rest.required}
        error={error}
        hint={hint}
        className={className}
      >
        <div className="field__control">
          <input
            ref={ref}
            id={inputId}
            className="field__input"
            aria-invalid={Boolean(error)}
            aria-describedby={
              error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
            }
            {...rest}
          />
        </div>
      </FieldWrapper>
    );
  }
);

Input.displayName = 'Input';
