import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import UserAvatar from './UserAvatar';
import { ProfileIcon } from './ProfileIcon';
import { DashboardIcon } from './DashboardIcon';
import { ClassroomIcon } from './ClassroomIcon';
import { AssignmentIcon } from './AssignmentIcon';
import './ProfileDropdown.css';

function ProfileDropdown() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleSignOut = () => {
    logout();
    closeDropdown();
    navigate('/');
  };

  return (
    <div className="profile-dropdown-container" ref={dropdownRef}>
      <button 
        className="profile-avatar-button" 
        onClick={toggleDropdown}
        aria-label="Profile menu"
        aria-expanded={isOpen}
      >
        <UserAvatar user={user} size={32} />
        <svg 
          className={`dropdown-chevron ${isOpen ? 'open' : ''}`}
          width="12" 
          height="12" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isOpen && (
        <div className="profile-dropdown-menu">
          <Link to="/profile" className="dropdown-item" onClick={closeDropdown}>
            <span className="dropdown-icon-wrapper-profile">
              <ProfileIcon size={22} />
            </span>
            <span>Profile</span>
          </Link>

          <Link to="/dashboard" className="dropdown-item" onClick={closeDropdown}>
            <span className="dropdown-icon-wrapper icon-orange">
              <DashboardIcon size={18} />
            </span>
            <span>Dashboard</span>
          </Link>

          <Link to="/assignments" className="dropdown-item" onClick={closeDropdown}>
            <span className="dropdown-icon-wrapper icon-gray">
              <AssignmentIcon size={18} />
            </span>
            <span>Assignments</span>
          </Link>

          <Link to="/classrooms" className="dropdown-item" onClick={closeDropdown}>
            <span className="dropdown-icon-wrapper icon-blue">
              <ClassroomIcon size={18} />
            </span>
            <span>Classroom</span>
          </Link>

          <div className="dropdown-divider"></div>

          <button className="dropdown-item dropdown-signout" onClick={handleSignOut}>
            <svg className="dropdown-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileDropdown;
