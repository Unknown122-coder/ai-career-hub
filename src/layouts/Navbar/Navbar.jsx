import { memo } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import DarkModeIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeIcon from '@mui/icons-material/LightModeOutlined';
import { useTheme } from '../../contexts';

const Navbar = memo(function Navbar({ title, onMenuClick }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="navbar" role="banner">
      <div className="navbar-left">
        <button
          className="navbar-toggle"
          onClick={onMenuClick}
          aria-label="Toggle sidebar menu"
        >
          <MenuIcon />
        </button>
        <h1 className="navbar-title">{title}</h1>
      </div>

      <div className="navbar-right">
        {/* Search */}
        <div className="navbar-search">
          <SearchIcon className="search-icon" fontSize="small" />
          <input
            className="search-input"
            type="search"
            placeholder="Search anything..."
            aria-label="Search"
          />
          <span className="search-shortcut">⌘K</span>
        </div>

        {/* Theme toggle */}
        <button
          className="navbar-icon-btn"
          onClick={toggleTheme}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          id="theme-toggle"
        >
          {isDark ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
        </button>

        {/* Notifications */}
        <button className="navbar-icon-btn" aria-label="Notifications" id="notifications-btn">
          <NotificationsNoneIcon fontSize="small" />
          <span className="badge-dot" />
        </button>
      </div>
    </header>
  );
});

export default Navbar;
