import { Link, Routes, Route, useLocation } from 'react-router-dom';
import './NavigationMenu.css';

// Page Components
const HomePage = () => <div>Welcome to Home Page</div>;
const AboutPage = () => <div>About Us Page</div>;
const ProfilePage = () => <div>User Profile Page</div>;
const NotFoundPage = () => <div>404 - Page Not Found</div>;

const NavigationMenu = () => {
  const location = useLocation();

  const isActive = (path) => {
    // Handle both '/' and '/home' as home route
    if (path === '/' || path === '/home') {
      return location.pathname === '/' || location.pathname === '/home';
    }
    return location.pathname === path;
  };

  return (
    <div>
      <nav>
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', gap: '20px' }}>
          <li>
            <Link 
              to="/" 
              className={isActive('/') ? 'active' : ''}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/about" 
              className={isActive('/about') ? 'active' : ''}
            >
              About
            </Link>
          </li>
          <li>
            <Link 
              to="/profile" 
              className={isActive('/profile') ? 'active' : ''}
            >
              Profile
            </Link>
          </li>
        </ul>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default NavigationMenu;