import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import LightModeIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeIcon from '@mui/icons-material/DarkModeOutlined';
import { Button } from '../../components';
import { useTheme } from '../../contexts';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    jobAlerts: true,
    interviewReminders: true,
    weeklyReport: false,
    marketing: false,
  });

  const toggleNotification = useCallback((key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  return (
    <div className="settings-page">
      {/* Theme Settings */}
      <motion.div
        className="settings-section"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="settings-section-title">Appearance</h3>
        <p className="settings-section-desc">Choose how AI Career Hub looks to you</p>

        <div className="theme-selector">
          <div
            className={`theme-option ${theme === 'light' ? 'active' : ''}`}
            onClick={() => setTheme('light')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setTheme('light')}
            aria-label="Light theme"
          >
            <div
              className="theme-preview"
              style={{ background: '#f8fafc', border: '2px solid #e2e8f0' }}
            >
              <LightModeIcon style={{ color: '#f59e0b' }} />
            </div>
            <p className="theme-name">Light</p>
          </div>

          <div
            className={`theme-option ${theme === 'dark' ? 'active' : ''}`}
            onClick={() => setTheme('dark')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setTheme('dark')}
            aria-label="Dark theme"
          >
            <div
              className="theme-preview"
              style={{ background: '#0a0a0f', border: '2px solid #1e293b' }}
            >
              <DarkModeIcon style={{ color: '#818cf8' }} />
            </div>
            <p className="theme-name">Dark</p>
          </div>
        </div>
      </motion.div>

      {/* Notification Settings */}
      <motion.div
        className="settings-section"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h3 className="settings-section-title">Notifications</h3>
        <p className="settings-section-desc">Manage how you receive notifications</p>

        {[
          { key: 'email', label: 'Email Notifications', desc: 'Receive updates via email' },
          { key: 'push', label: 'Push Notifications', desc: 'Browser push notifications' },
          { key: 'jobAlerts', label: 'Job Alerts', desc: 'Get notified about new job matches' },
          {
            key: 'interviewReminders',
            label: 'Interview Reminders',
            desc: 'Reminders before upcoming interviews',
          },
          {
            key: 'weeklyReport',
            label: 'Weekly Report',
            desc: 'Receive a weekly summary of your progress',
          },
          { key: 'marketing', label: 'Marketing Emails', desc: 'Tips, features, and product updates' },
        ].map((item) => (
          <div className="setting-item" key={item.key}>
            <div className="setting-info">
              <p className="setting-label">{item.label}</p>
              <p className="setting-desc">{item.desc}</p>
            </div>
            <label className="toggle-switch" aria-label={item.label}>
              <input
                type="checkbox"
                checked={notifications[item.key]}
                onChange={() => toggleNotification(item.key)}
              />
              <span className="toggle-slider" />
            </label>
          </div>
        ))}
      </motion.div>

      {/* Security */}
      <motion.div
        className="settings-section"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="settings-section-title">Security</h3>
        <p className="settings-section-desc">Manage your account security settings</p>

        <div className="security-item">
          <div className="security-info">
            <p className="security-label">Password</p>
            <p className="security-value">Last changed 30 days ago</p>
          </div>
          <Button variant="secondary" size="sm">
            Change
          </Button>
        </div>

        <div className="security-item">
          <div className="security-info">
            <p className="security-label">Two-Factor Authentication</p>
            <p className="security-value">Not enabled</p>
          </div>
          <Button variant="secondary" size="sm">
            Enable
          </Button>
        </div>

        <div className="security-item">
          <div className="security-info">
            <p className="security-label">Active Sessions</p>
            <p className="security-value">1 active session</p>
          </div>
          <Button variant="ghost" size="sm">
            View
          </Button>
        </div>

        <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
          <Button variant="danger" size="sm">
            Delete Account
          </Button>
          <p className="text-muted text-xs" style={{ marginTop: 8 }}>
            This action is irreversible and will permanently delete all your data.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
