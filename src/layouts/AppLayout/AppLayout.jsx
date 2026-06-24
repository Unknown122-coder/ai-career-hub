import { useState, useCallback } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';

const ROUTE_TITLES = {
  '/': 'Dashboard',
  '/resume': 'Resume Analyzer',
  '/jobs': 'Job Tracker',
  '/interview': 'AI Interview Prep',
  '/profile': 'Profile',
  '/settings': 'Settings',
};

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const title = ROUTE_TITLES[location.pathname] || 'AI Career Hub';

  const handleMenuClick = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const handleSidebarClose = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  return (
    <div className="app-layout">
      <Sidebar isOpen={sidebarOpen} onClose={handleSidebarClose} />
      <div className="main-content">
        <Navbar title={title} onMenuClick={handleMenuClick} />
        <main className="page-content" role="main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
