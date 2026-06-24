import { memo, useState } from 'react';
import { cn } from '../../utils';

/**
 * Reusable Input component with label, error, and icon support
 */
const Input = memo(function Input({
  id,
  name,
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
  icon: Icon,
  rightElement,
  helper,
  required = false,
  disabled = false,
  className = '',
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;
  const hasError = touched && error;

  return (
    <div className={cn('form-group', className)}>
      {label && (
        <label className="form-label" htmlFor={id || name}>
          {label}
          {required && <span style={{ color: '#ef4444', marginLeft: '2px' }}>*</span>}
        </label>
      )}

      <div className={cn(Icon && 'input-icon-wrapper')}>
        {Icon && (
          <span className="input-icon" aria-hidden="true">
            <Icon fontSize="small" />
          </span>
        )}

        <input
          id={id || name}
          name={name}
          type={inputType}
          className={cn('form-input', hasError && 'error')}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          required={required}
          aria-invalid={hasError ? 'true' : 'false'}
          aria-describedby={hasError ? `${name}-error` : undefined}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            tabIndex={-1}
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        )}

        {rightElement && !isPassword && rightElement}
      </div>

      {hasError && (
        <p className="form-error" id={`${name}-error`} role="alert">
          {error}
        </p>
      )}

      {helper && !hasError && <p className="form-helper">{helper}</p>}
    </div>
  );
});

export default Input;
