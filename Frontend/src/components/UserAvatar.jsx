import './UserAvatar.css';

function UserAvatar({ user, size = 32, showName = false }) {
  // Get initials from user name
  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  // Generate consistent color based on name
  const getAvatarColor = (name) => {
    if (!name) return '#2dd68f';
    const colors = [
      '#2dd68f', // green
      '#02a89a', // teal
      '#3b82f6', // blue
      '#8b5cf6', // purple
      '#ec4899', // pink
      '#f59e0b', // amber
    ];
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  const initials = getInitials(user?.name);
  const bgColor = getAvatarColor(user?.name);

  return (
    <div className="user-avatar-wrapper" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
      <div 
        className="user-avatar-circle"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${bgColor}, ${bgColor}dd)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontWeight: '600',
          fontSize: `${size * 0.4}px`,
          fontFamily: "'Space Grotesk', sans-serif",
          border: '2px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
          flexShrink: 0,
        }}
      >
        {initials}
      </div>
      {showName && user?.name && (
        <span className="user-avatar-name" style={{ color: 'var(--text, #e2e8f0)', fontWeight: '500' }}>
          {user.name}
        </span>
      )}
    </div>
  );
}

export default UserAvatar;
