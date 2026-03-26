import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ProfileDropdown from './ProfileDropdown';
import CyberLearnIcon from './CyberLearnIcon';

function Navbar() {
  const { isAuthenticated } = useAuth();

  return (
    <nav className="navbar">
      <div className="nav-content">
        <Link to="/" className="logo">
          <CyberLearnIcon size={32} />
          <span className="logo-text">CyberLearn</span>
        </Link>
        <ul className="nav-links">
          <li><Link to="/about">About</Link></li>
          <li><Link to="/ctf">CTF</Link></li>
          {isAuthenticated ? (
            <li>
              <ProfileDropdown />
            </li>
          ) : (
            <li><Link to="/auth">Login</Link></li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;