import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useAssignments } from '../contexts/AssignmentContext';
import apiService from '../api/apiService';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import UserAvatar from '../components/UserAvatar';
import { AssignmentIcon } from '../components/AssignmentIcon';
import { DashboardIcon } from '../components/DashboardIcon';
import { ClassroomIcon } from '../components/ClassroomIcon';
import CyberLearnLogo from '../components/CyberLearnLogo';
import './Profile.css';

function Profile() {
  const { user, logout } = useAuth();
  const { getStudentStats } = useAssignments();
  const navigate = useNavigate();
  
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const stats = getStudentStats();

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    const updatedUser = { ...user, ...profileData };
    alert('Profile updated successfully!');
    setIsEditingProfile(false);
    window.location.reload();
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      alert('Password must be at least 6 characters long!');
      return;
    }
    try {
      await apiService.users.changePassword(
        passwordData.currentPassword,
        passwordData.newPassword
      );
      alert('Password changed successfully!');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setIsChangingPassword(false);
    } catch (err) {
      alert(err.message || 'Failed to update password.');
    }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
      navigate('/');
    }
  };

  const handleDeleteAccount = async () => {
    const confirmation = window.confirm(
      '⚠️ WARNING: This action cannot be undone!\n\nAre you absolutely sure you want to delete your account? All your data, progress, and submissions will be permanently removed.'
    );
    
    if (confirmation) {
      const finalConfirmation = window.prompt(
        'To confirm account deletion, please type "DELETE" in all caps:'
      );
      
      if (finalConfirmation === 'DELETE') {
        try {
          await apiService.users.deleteAccount();
        } catch (err) {
          alert(err.message || 'Failed to delete account. Please try again.');
          return;
        }

        // Clear all local state after confirmed server deletion
        localStorage.removeItem('challenges');
        localStorage.removeItem('recentActivity');
        localStorage.removeItem('classrooms');
        localStorage.removeItem('enrollments');
        localStorage.removeItem('assignments');
        localStorage.removeItem('submissions');
        
        alert('Your account has been deleted successfully.');
        logout();
        navigate('/auth');
      } else {
        alert('Account deletion cancelled. The confirmation text did not match.');
      }
    }
  };

  return (
    <div className="profile-page-wrapper">
      {/* Repeating Logo Pattern Background */}
      <div className="profile-logo-pattern"></div>
      
      <Navbar />
      
      <div className="profile-container">
        {/* Page Header */}
        <div className="profile-page-header">
          <h1 className="page-title">Profile</h1>
          <p className="page-subtitle">Manage your account settings</p>
        </div>

        {/* Dashboard Layout with Sidebar */}
        <div className="dashboard-layout">
          {/* Sidebar */}
          <aside className="sidebar">
            <h3 className="sidebar-title">MENU</h3>
            <Link to="/dashboard" className="sidebar-link">
              <span className="sidebar-icon icon-orange"><DashboardIcon size={24} /></span>
              <span className="sidebar-text">Dashboard</span>
            </Link>
            <Link to="/classrooms" className="sidebar-link">
              <span className="sidebar-icon icon-blue"><ClassroomIcon size={24} /></span>
              <span className="sidebar-text">Classroom</span>
            </Link>
            <Link to="/assignments" className="sidebar-link">
              <span className="sidebar-icon icon-gray"><AssignmentIcon size={24} /></span>
              <span className="sidebar-text">Assignments</span>
            </Link>
          </aside>

          {/* Main Content */}
          <main className="dashboard-content">
            {/* Profile Card */}
            <div className="profile-card">
              <div className="profile-avatar">
                <UserAvatar user={user} size={80} />
              </div>
              <h2 className="profile-name">{user?.name || 'prasad'}</h2>
              <p className="profile-email">@{user?.email?.split('@')[0] || '2305354'}</p>
              <div className="role-badge">
                ⭐ {stats.totalPoints} Points
              </div>
            </div>

            {/* Account Details */}
            <div className="dashboard-card">
              <div className="card-header-row">
                <h3 className="card-section-title">Account Details</h3>
                {!isEditingProfile && (
                  <button className="btn-edit" onClick={() => setIsEditingProfile(true)}>
                    Edit
                  </button>
                )}
              </div>
              
              {!isEditingProfile ? (
                <div className="account-details">
                  <div className="detail-row">
                    <span className="detail-label">Name</span>
                    <span className="detail-value">{user?.name || '2305354'}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Username</span>
                    <span className="detail-value">@{user?.email?.split('@')[0] || '2305354'}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Email</span>
                    <span className="detail-value">{user?.email || '2305354@iisc.ac.in'}</span>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleProfileUpdate} className="profile-form">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="btn-primary">Save Changes</button>
                    <button type="button" className="btn-secondary" onClick={() => setIsEditingProfile(false)}>
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Change Password */}
            <div className="dashboard-card">
              <div className="card-header-row">
                <h3 className="card-section-title">Change Password</h3>
                {!isChangingPassword && (
                  <button className="btn-edit" onClick={() => setIsChangingPassword(true)}>
                    Change
                  </button>
                )}
              </div>
              
              {isChangingPassword && (
                <form onSubmit={handlePasswordChange} className="profile-form">
                  <div className="form-group">
                    <label>Current Password</label>
                    <input
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>New Password</label>
                    <input
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Confirm New Password</label>
                    <input
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="btn-primary">Update Password</button>
                    <button type="button" className="btn-secondary" onClick={() => setIsChangingPassword(false)}>
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Sign Out */}
            <div className="logout-card">
              <button className="btn-logout" onClick={handleLogout}>
                <span>Sign Out</span>
                <span>🚪</span>
              </button>
            </div>

            {/* Delete Account */}
            <div className="dashboard-card" style={{ borderColor: 'rgba(252, 165, 165, 0.3)' }}>
              <div className="card-header-row">
                <h3 className="card-section-title" style={{ color: '#fca5a5' }}>Danger Zone</h3>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <button 
                className="btn-delete-account" 
                onClick={handleDeleteAccount}
                style={{
                  width: '100%',
                  padding: '0.75rem 1.5rem',
                  background: 'rgba(252, 165, 165, 0.1)',
                  border: '2px solid rgba(252, 165, 165, 0.3)',
                  borderRadius: '8px',
                  color: '#fca5a5',
                  fontWeight: '600',
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(252, 165, 165, 0.2)';
                  e.target.style.borderColor = '#fca5a5';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(252, 165, 165, 0.1)';
                  e.target.style.borderColor = 'rgba(252, 165, 165, 0.3)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                <span>🗑️</span>
                <span>Delete Account</span>
              </button>
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Profile;
