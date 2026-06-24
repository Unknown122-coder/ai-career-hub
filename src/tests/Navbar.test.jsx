import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from './testUtils';
import Navbar from '../layouts/Navbar/Navbar';

describe('Navbar', () => {
  const defaultProps = {
    title: 'Dashboard',
    onMenuClick: vi.fn(),
  };

  it('renders the page title', () => {
    render(<Navbar {...defaultProps} />);

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('has a theme toggle button', () => {
    render(<Navbar {...defaultProps} />);

    expect(screen.getByLabelText(/switch to dark mode/i)).toBeInTheDocument();
  });

  it('has a notifications button', () => {
    render(<Navbar {...defaultProps} />);

    expect(screen.getByLabelText(/notifications/i)).toBeInTheDocument();
  });

  it('has a search input', () => {
    render(<Navbar {...defaultProps} />);

    expect(screen.getByLabelText(/search/i)).toBeInTheDocument();
  });

  it('calls onMenuClick when toggle button is clicked', async () => {
    const user = userEvent.setup();
    render(<Navbar {...defaultProps} />);

    const menuBtn = screen.getByLabelText(/toggle sidebar/i);
    await user.click(menuBtn);

    expect(defaultProps.onMenuClick).toHaveBeenCalledTimes(1);
  });
});
