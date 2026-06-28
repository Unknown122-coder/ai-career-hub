import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import EmailIcon from '@mui/icons-material/EmailOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircleOutlined';
import { Input, Button } from '../../components';
import { useForm } from '../../hooks';
import { useAuth } from '../../contexts';
import { ROUTES } from '../../constants';

const validationRules = {
  email: { required: true, email: true, requiredMessage: 'Email is required' },
};

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState('');

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm({ email: '' }, validationRules);

  const { resetPassword } = useAuth();
  
  const onSubmit = async (formValues) => {
    try {
      setServerError('');
      await resetPassword(formValues.email);
      setSent(true);
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        setServerError('No user found with this email.');
      } else {
        setServerError(err.message || 'Something went wrong');
      }
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

          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ textAlign: 'center' }}
            >
              <CheckCircleIcon
                style={{ fontSize: 64, color: '#10b981', marginBottom: 16 }}
              />
              <h2 className="auth-title">Check your email</h2>
              <p className="auth-subtitle" style={{ marginBottom: 32 }}>
                We&apos;ve sent a password reset link to <strong>{values.email}</strong>
              </p>
              <Link to={ROUTES.LOGIN}>
                <Button variant="secondary" fullWidth>
                  Back to Sign In
                </Button>
              </Link>
            </motion.div>
          ) : (
            <>
              <h2 className="auth-title">Forgot password?</h2>
              <p className="auth-subtitle">
                No worries! Enter your email and we&apos;ll send you a reset link.
              </p>

              {serverError && (
                <div
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
                </div>
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

                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  loading={isSubmitting}
                  size="lg"
                >
                  Send Reset Link
                </Button>
              </form>

              <p className="auth-footer">
                Remember your password? <Link to={ROUTES.LOGIN}>Sign in</Link>
              </p>
            </>
          )}
        </motion.div>
      </div>

      <div className="auth-right">
        <div className="auth-right-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2>Secure Access</h2>
            <p>
              Your security is our priority. We&apos;ll help you regain access to your
              account in just a few steps.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
