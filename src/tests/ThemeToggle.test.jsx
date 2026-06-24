import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from './testUtils';
import SettingsPage from '../pages/Settings/SettingsPage';

describe('ThemeToggle (Settings)', () => {
  it('renders theme selector with light and dark options', () => {
    render(<SettingsPage />);

    expect(screen.getByText('Light')).toBeInTheDocument();
    expect(screen.getByText('Dark')).toBeInTheDocument();
  });

  it('renders the Appearance section title', () => {
    render(<SettingsPage />);

    expect(screen.getByText('Appearance')).toBeInTheDocument();
  });

  it('allows clicking theme options', async () => {
    const user = userEvent.setup();
    render(<SettingsPage />);

    const darkOption = screen.getByLabelText(/dark theme/i);
    await user.click(darkOption);

    // Theme should now be dark — the dark option should be active
    expect(darkOption.classList.contains('active')).toBe(true);
  });

  it('renders notification toggles', () => {
    render(<SettingsPage />);

    expect(screen.getByText('Email Notifications')).toBeInTheDocument();
    expect(screen.getByText('Push Notifications')).toBeInTheDocument();
    expect(screen.getByText('Job Alerts')).toBeInTheDocument();
  });

  it('renders security section', () => {
    render(<SettingsPage />);

    expect(screen.getByText('Security')).toBeInTheDocument();
    expect(screen.getByText('Two-Factor Authentication')).toBeInTheDocument();
  });
});
