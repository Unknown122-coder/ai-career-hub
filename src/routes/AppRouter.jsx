import { lazy, Suspense } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import { useAuth } from '../contexts';
import { ROUTES } from '../constants';
import { AppLayout } from '../layouts';

// Lazy-loaded pages for code splitting
const LoginPage = lazy(() => import('../pages/Login'));
const RegisterPage = lazy(() => import('../pages/Register'));
const ForgotPasswordPage = lazy(() => import('../pages/ForgotPassword'));
const DashboardPage = lazy(() => import('../pages/Dashboard'));
const ResumePage = lazy(() => import('../pages/Resume'));
const JobsPage = lazy(() => import('../pages/Jobs'));
const InterviewPage = lazy(() => import('../pages/Interview'));
const ProfilePage = lazy(() => import('../pages/Profile'));
const SettingsPage = lazy(() => import('../pages/Settings'));

/**
 * Loading fallback
 */
function PageLoader() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
      }}
    >
      <div
        className="spinner-border"
        style={{ width: 40, height: 40, color: '#6366f1' }}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

/**
 * Route guard — redirects to login if not authenticated
 */
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
}

/**
 * Guest route — redirects to dashboard if already authenticated
 */
function GuestRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
}

const router = createBrowserRouter([
  // Auth routes (no sidebar)
  {
    path: ROUTES.LOGIN,
    element: (
      <GuestRoute>
        <LoginPage />
      </GuestRoute>
    ),
  },
  {
    path: ROUTES.REGISTER,
    element: (
      <GuestRoute>
        <RegisterPage />
      </GuestRoute>
    ),
  },
  {
    path: ROUTES.FORGOT_PASSWORD,
    element: (
      <GuestRoute>
        <ForgotPasswordPage />
      </GuestRoute>
    ),
  },

  // App routes (with sidebar layout)
  {
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: ROUTES.DASHBOARD, element: <DashboardPage /> },
      { path: ROUTES.RESUME, element: <ResumePage /> },
      { path: ROUTES.JOBS, element: <JobsPage /> },
      { path: ROUTES.INTERVIEW, element: <InterviewPage /> },
      { path: ROUTES.PROFILE, element: <ProfilePage /> },
      { path: ROUTES.SETTINGS, element: <SettingsPage /> },
    ],
  },

  // Catch-all
  { path: '*', element: <Navigate to={ROUTES.DASHBOARD} replace /> },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
