import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading, csrfReady } = useAuth();

  if (isLoading || !csrfReady) {
    return (
      <div className="loading-container" style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #0B0F2A 0%, #2F7F6F 100%)',
        color: 'white',
        fontSize: '1.2rem'
      }}>
        {isLoading ? 'Loading...' : 'Initializing security...'}
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;