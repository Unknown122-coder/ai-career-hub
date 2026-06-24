import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from './testUtils';
import StatCard from '../components/StatCard/StatCard';

describe('StatCard (Dashboard Card)', () => {
  const defaultProps = {
    icon: '📊',
    value: '47',
    label: 'Total Applications',
    change: 12,
    changeType: 'positive',
  };

  it('renders the value and label', () => {
    render(<StatCard {...defaultProps} />);

    expect(screen.getByText('47')).toBeInTheDocument();
    expect(screen.getByText('Total Applications')).toBeInTheDocument();
  });

  it('displays positive change indicator', () => {
    render(<StatCard {...defaultProps} />);

    expect(screen.getByText(/\+12/)).toBeInTheDocument();
  });

  it('displays negative change indicator', () => {
    render(<StatCard {...defaultProps} change={-5} changeType="negative" />);

    expect(screen.getByText(/-5/)).toBeInTheDocument();
  });

  it('renders without change when not provided', () => {
    render(<StatCard icon="📊" value="10" label="Test" />);

    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
