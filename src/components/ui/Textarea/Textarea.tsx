import React from 'react';
import { FieldWrapper } from '@/components/ui/Field/FieldWrapper';
import './Textarea.scss';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  hint?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, id, className = '', ...rest }, ref) => {
    const textareaId = id ?? `textarea-${label.toLowerCase().replace(/\s+/g, '-')}`;

    return (
      <FieldWrapper
        fieldId={textareaId}
        label={label}
        required={rest.required}
        error={error}
        hint={hint}
        className={className}
      >
        <textarea
          ref={ref}
          id={textareaId}
          className="field__textarea"
          aria-invalid={Boolean(error)}
          aria-describedby={
            error ? `${textareaId}-error` : hint ? `${textareaId}-hint` : undefined
          }
          {...rest}
        />
      </FieldWrapper>
    );
  }
);

Textarea.displayName = 'Textarea';
