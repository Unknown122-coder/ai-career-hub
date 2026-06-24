import { useState, useCallback } from 'react';
import { isValidEmail } from '../utils';

/**
 * Custom hook for form handling with validation
 */
const useForm = (initialValues = {}, validationRules = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = useCallback(
    (fieldValues = values) => {
      const newErrors = {};

      Object.keys(validationRules).forEach((field) => {
        const rules = validationRules[field];
        const value = fieldValues[field];

        if (rules.required && (!value || value.toString().trim() === '')) {
          newErrors[field] = rules.requiredMessage || `${field} is required`;
          return;
        }

        if (rules.email && value && !isValidEmail(value)) {
          newErrors[field] = 'Please enter a valid email';
          return;
        }

        if (rules.minLength && value && value.length < rules.minLength) {
          newErrors[field] = `Must be at least ${rules.minLength} characters`;
          return;
        }

        if (rules.match && value !== fieldValues[rules.match]) {
          newErrors[field] = rules.matchMessage || 'Fields do not match';
          return;
        }

        if (rules.custom && value) {
          const error = rules.custom(value, fieldValues);
          if (error) {
            newErrors[field] = error;
          }
        }
      });

      return newErrors;
    },
    [values, validationRules]
  );

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    setValues((prev) => ({ ...prev, [name]: fieldValue }));

    // Clear error on change
    setErrors((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }, []);

  const handleBlur = useCallback(
    (e) => {
      const { name } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));

      // Validate single field
      const fieldErrors = validate({ ...values });
      if (fieldErrors[name]) {
        setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] }));
      }
    },
    [values, validate]
  );

  const handleSubmit = useCallback(
    async (onSubmit) => {
      const validationErrors = validate();
      setErrors(validationErrors);
      setTouched(
        Object.keys(validationRules).reduce((acc, key) => ({ ...acc, [key]: true }), {})
      );

      if (Object.keys(validationErrors).length === 0) {
        setIsSubmitting(true);
        try {
          await onSubmit(values);
        } catch (error) {
          if (error.errors) {
            setErrors(error.errors);
          }
        } finally {
          setIsSubmitting(false);
        }
      }
    },
    [values, validate, validationRules]
  );

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  const setFieldValue = useCallback((name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFieldValue,
    setErrors,
  };
};

export default useForm;
