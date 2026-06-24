import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from './testUtils';
import LoginPage from '../pages/Login/LoginPage';

// Mock react-router-dom navigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('LoginPage', () => {
  it('renders login form with email and password fields', () => {
    render(<LoginPage />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('displays brand name', () => {
    render(<LoginPage />);

    expect(screen.getByText('Career Hub')).toBeInTheDocument();
  });

  it('shows validation errors for empty submission', async () => {
    const user = userEvent.setup();
    render(<LoginPage />);

    const submitBtn = screen.getByRole('button', { name: /sign in/i });
    await user.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    });
  });

  it('shows error for invalid email format', async () => {
    const user = userEvent.setup();
    render(<LoginPage />);

    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, 'invalid-email');
    await user.tab(); // trigger blur

    await waitFor(() => {
      expect(screen.getByText(/valid email/i)).toBeInTheDocument();
    });
  });

  it('has a link to register page', () => {
    render(<LoginPage />);

    expect(screen.getByText(/sign up/i)).toHaveAttribute('href', '/register');
  });

  it('has a link to forgot password page', () => {
    render(<LoginPage />);

    expect(screen.getByText(/forgot password/i)).toHaveAttribute('href', '/forgot-password');
  });

  it('has a Google sign-in button', () => {
    render(<LoginPage />);

    expect(screen.getByText(/continue with google/i)).toBeInTheDocument();
  });
});
