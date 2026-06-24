import { AuthProvider, ThemeProvider } from './contexts';
import { AppRouter } from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/main.scss';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </ThemeProvider>
  );
}
