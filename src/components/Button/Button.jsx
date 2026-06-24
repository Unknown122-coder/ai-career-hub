import { memo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils';

/**
 * Reusable Button component with variants, sizes, and loading state
 */
const Button = memo(function Button({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  loading = false,
  disabled = false,
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  onClick,
  ...props
}) {
  const variantClass = `btn-${variant}`;
  const sizeClass = size !== 'md' ? `btn-${size}` : '';

  return (
    <motion.button
      type={type}
      className={cn('btn', variantClass, sizeClass, fullWidth && 'w-100', className)}
      onClick={onClick}
      disabled={disabled || loading}
      whileTap={{ scale: 0.97 }}
      {...props}
    >
      {loading ? (
        <>
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          />
          <span>Loading...</span>
        </>
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon fontSize="small" />}
          {children}
          {Icon && iconPosition === 'right' && <Icon fontSize="small" />}
        </>
      )}
    </motion.button>
  );
});

export default Button;
