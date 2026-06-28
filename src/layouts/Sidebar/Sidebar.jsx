import { memo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardIcon from '@mui/icons-material/DashboardOutlined';
import DescriptionIcon from '@mui/icons-material/DescriptionOutlined';
import WorkIcon from '@mui/icons-material/WorkOutlineOutlined';
import ChatIcon from '@mui/icons-material/ChatOutlined';
import PersonIcon from '@mui/icons-material/PersonOutlined';
import SettingsIcon from '@mui/icons-material/SettingsOutlined';
import LogoutIcon from '@mui/icons-material/LogoutOutlined';
import { useAuth } from '../../contexts';
import { ROUTES } from '../../constants';
import { getInitials } from '../../utils';

const NAV_ITEMS = [
  {
    section: 'Main',
    items: [
      { path: ROUTES.DASHBOARD, label: 'Dashboard', icon: DashboardIcon },
      { path: ROUTES.RESUME, label: 'Resume Analyzer', icon: DescriptionIcon },
      { path: ROUTES.JOBS, label: 'Job Tracker', icon: WorkIcon },
      { path: ROUTES.INTERVIEW, label: 'AI Interview Prep', icon: ChatIcon },
    ],
  },
  {
    section: 'Account',
    items: [
      { path: ROUTES.PROFILE, label: 'Profile', icon: PersonIcon },
      { path: ROUTES.SETTINGS, label: 'Settings', icon: SettingsIcon },
    ],
  },
];

const Sidebar = memo(function Sidebar({ isOpen, onClose }) {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="sidebar-overlay visible"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <aside
        className={`sidebar ${isOpen ? 'open' : ''}`}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Brand */}
        <div className="sidebar-brand">
          <div className="sidebar-logo">
            <span className="logo-icon">AI</span>
            <span>Career Hub</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {NAV_ITEMS.map((section) => (
            <div className="sidebar-section" key={section.section}>
              <p className="sidebar-section-title">{section.section}</p>
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={`sidebar-link ${isActive ? 'active' : ''}`}
                    onClick={onClose}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span className="sidebar-link-icon">
                      <Icon fontSize="small" />
                    </span>
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          <div className="sidebar-profile">
            <div className="sidebar-avatar">
              {getInitials(user?.displayName || user?.email?.split('@')[0] || 'User')}
            </div>
            <div className="sidebar-profile-info">
              <p className="name">{user?.displayName || user?.email?.split('@')[0] || 'User'}</p>
              <p className="email">{user?.email || 'user@example.com'}</p>
            </div>
          </div>
          <button
            className="sidebar-link"
            onClick={logout}
            style={{ marginTop: '8px', width: '100%' }}
            aria-label="Sign out"
          >
            <span className="sidebar-link-icon">
              <LogoutIcon fontSize="small" />
            </span>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
});

export default Sidebar;
