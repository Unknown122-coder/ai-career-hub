import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import EmailIcon from '@mui/icons-material/EmailOutlined';
import LockIcon from '@mui/icons-material/LockOutlined';
import { Input, Button } from '../../components';
import { useAuth } from '../../contexts';
import { useForm } from '../../hooks';
import { ROUTES } from '../../constants';

const validationRules = {
  email: { required: true, email: true, requiredMessage: 'Email is required' },
  password: {
    required: true,
    minLength: 6,
    requiredMessage: 'Password is required',
  },
};

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, error: authError, clearError } = useAuth();
  const [serverError, setServerError] = useState('');

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm({ email: '', password: '' }, validationRules);

  const onSubmit = async (formValues) => {
    try {
      setServerError('');
      clearError();
      await login(formValues);
      navigate(ROUTES.DASHBOARD);
    } catch (err) {
      setServerError(err.message || 'Login failed. Please try again.');
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

          <h2 className="auth-title">Welcome back</h2>
          <p className="auth-subtitle">Sign in to continue your career journey</p>

          {(serverError || authError) && (
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
              {serverError || authError}
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
              required
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
              <Link to={ROUTES.FORGOT_PASSWORD} style={{ fontSize: '14px', color: '#6366f1' }}>
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={isSubmitting}
              size="lg"
            >
              Sign In
            </Button>
          </form>

          <div className="auth-divider">or</div>

          <button className="auth-social-btn" type="button">
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <p className="auth-footer">
            Don&apos;t have an account? <Link to={ROUTES.REGISTER}>Sign up</Link>
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
            <h2>Accelerate Your Career</h2>
            <p>
              AI-powered resume analysis, smart job tracking, and interview preparation —
              everything you need to land your dream role.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
