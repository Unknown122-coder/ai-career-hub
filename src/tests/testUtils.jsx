import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, ThemeProvider } from '../contexts';

/**
 * Render a component with all providers for testing
 */
export function renderWithProviders(ui, options = {}) {
  function Wrapper({ children }) {
    return (
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    );
  }

  return render(ui, { wrapper: Wrapper, ...options });
}

export * from '@testing-library/react';
export { renderWithProviders as render };
