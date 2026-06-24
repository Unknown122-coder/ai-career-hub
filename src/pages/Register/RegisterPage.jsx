import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PersonIcon from '@mui/icons-material/PersonOutlined';
import EmailIcon from '@mui/icons-material/EmailOutlined';
import LockIcon from '@mui/icons-material/LockOutlined';
import { Input, Button } from '../../components';
import { useAuth } from '../../contexts';
import { useForm } from '../../hooks';
import { ROUTES } from '../../constants';

const validationRules = {
  name: { required: true, requiredMessage: 'Full name is required' },
  email: { required: true, email: true, requiredMessage: 'Email is required' },
  password: {
    required: true,
    minLength: 8,
    requiredMessage: 'Password is required',
  },
  confirmPassword: {
    required: true,
    match: 'password',
    matchMessage: 'Passwords do not match',
    requiredMessage: 'Please confirm your password',
  },
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const [serverError, setServerError] = useState('');

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm(
    { name: '', email: '', password: '', confirmPassword: '' },
    validationRules
  );

  const onSubmit = async (formValues) => {
    try {
      setServerError('');
      await registerUser(formValues);
      navigate(ROUTES.DASHBOARD);
    } catch (err) {
      setServerError(err.message || 'Registration failed');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <motion.div
          className="auth-form-wrapper"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="auth-brand">
            <span className="logo-icon">AI</span>
            <span>Career Hub</span>
          </div>

          <h2 className="auth-title">Create your account</h2>
          <p className="auth-subtitle">Start your AI-powered career journey today</p>

          {serverError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="badge badge-danger"
              style={{
                display: 'block',
                textAlign: 'center',
                padding: '12px',
                marginBottom: '24px',
                borderRadius: '12px',
                fontSize: '14px',
              }}
            >
              {serverError}
            </motion.div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(onSubmit);
            }}
            noValidate
          >
            <Input
              name="name"
              label="Full Name"
              placeholder="Alex Johnson"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.name}
              touched={touched.name}
              icon={PersonIcon}
              required
            />

            <Input
              name="email"
              type="email"
              label="Email"
              placeholder="you@example.com"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email}
              touched={touched.email}
              icon={EmailIcon}
              required
            />

            <Input
              name="password"
              type="password"
              label="Password"
              placeholder="••••••••"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.password}
              touched={touched.password}
              icon={LockIcon}
              helper="Must be at least 8 characters"
              required
            />

            <Input
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              placeholder="••••••••"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
              icon={LockIcon}
              required
            />

            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={isSubmitting}
              size="lg"
            >
              Create Account
            </Button>
          </form>

          <p className="auth-footer">
            Already have an account? <Link to={ROUTES.LOGIN}>Sign in</Link>
          </p>
        </motion.div>
      </div>

      <div className="auth-right">
        <div className="auth-right-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2>Your Career, Supercharged</h2>
            <p>
              Join thousands of students using AI to optimize resumes, track applications,
              and ace interviews at top companies.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
