import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssignments } from '../contexts/AssignmentContext';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import OptimizedBackground from '../components/OptimizedBackground';
import './AssignmentDetail.css';

function AssignmentDebug() {
  const navigate = useNavigate();
  const { assignments, submissions, isTeacher } = useAssignments();
  const { user } = useAuth();
  const [showData, setShowData] = useState(false);

  const clearAllData = () => {
    if (window.confirm('Clear all assignments and submissions? This cannot be undone.')) {
      localStorage.removeItem('assignments');
      localStorage.removeItem('submissions');
      window.location.reload();
    }
  };

  const addSampleAssignments = () => {
    const samples = [
      {
        id: `assign-${Date.now()}-1`,
        title: 'SQL Injection Analysis',
        description: 'Analyze the provided web application and identify SQL injection vulnerabilities. Document your findings and provide remediation steps.',
        category: 'Network Security',
        points: 150,
        deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        createdBy: user?.email || 'teacher@cyberlearn.com',
        createdAt: new Date().toISOString(),
        attachments: [],
        allowedFileTypes: ['.pdf', '.doc', '.docx', '.txt'],
        allowLinks: true
      },
      {
        id: `assign-${Date.now()}-2`,
        title: 'Cryptography Challenge',
        description: 'Decrypt the provided cipher text using various cryptographic techniques. Show your work and explain the method used.',
        category: 'Cryptography',
        points: 200,
        deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
        createdBy: user?.email || 'teacher@cyberlearn.com',
        createdAt: new Date().toISOString(),
        attachments: [],
        allowedFileTypes: ['.pdf', '.txt', '.py'],
        allowLinks: true
      },
      {
        id: `assign-${Date.now()}-3`,
        title: 'OSINT Investigation',
        description: 'Conduct an OSINT investigation on the provided target. Use only legal and ethical methods. Document all sources and findings.',
        category: 'OSINT',
        points: 175,
        deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        createdBy: user?.email || 'teacher@cyberlearn.com',
        createdAt: new Date().toISOString(),
        attachments: [],
        allowedFileTypes: ['.pdf', '.doc', '.docx'],
        allowLinks: true
      }
    ];

    const existing = JSON.parse(localStorage.getItem('assignments') || '[]');
    const updated = [...existing, ...samples];
    localStorage.setItem('assignments', JSON.stringify(updated));
    alert('Added 3 sample assignments!');
    window.location.reload();
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <OptimizedBackground colors={['#006200', '#004e00', '#9a9a59']} type="waterPlane" />
      
      <Navbar />
      
      <div className="assignment-detail-container">
        <button className="back-button" onClick={() => navigate('/assignments')}>
          ← Back to Assignments
        </button>

        <div className="assignment-detail-card">
          <h1>🛠️ Assignment System Debug</h1>
          
          <div style={{ marginTop: '30px' }}>
            <h3>Current User Info</h3>
            <div style={{ 
              background: 'rgba(0, 0, 0, 0.2)', 
              padding: '20px', 
              borderRadius: '12px',
              marginBottom: '20px'
            }}>
              <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '10px' }}>
                <strong>Email:</strong> {user?.email || 'Not logged in'}
              </p>
              <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '10px' }}>
                <strong>Name:</strong> {user?.name || 'N/A'}
              </p>
              <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '10px' }}>
                <strong>Role:</strong> {user?.role ? (
                  user.role === 'teacher' ? '👨‍🏫 Teacher' : 
                  user.role === 'admin' ? '👨‍💼 Admin' : 
                  '👨‍🎓 Student'
                ) : 'N/A'}
              </p>
              <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '10px' }}>
                <strong>Authenticated:</strong> {user ? '✅ Yes' : '❌ No'}
              </p>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', marginTop: '15px' }}>
                💡 Tip: You must be logged in to use assignments
              </p>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', marginTop: '10px' }}>
                🔐 Register with role: Student, Teacher, or Admin
              </p>
              {!user && (
                <button
                  onClick={() => navigate('/auth')}
                  style={{
                    marginTop: '15px',
                    padding: '12px 24px',
                    background: 'linear-gradient(135deg, #2dd68f, #02a89a)',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Go to Login
                </button>
              )}
            </div>

            <h3>System Stats</h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '15px',
              marginBottom: '30px'
            }}>
              <div style={{ 
                background: 'rgba(45, 214, 143, 0.1)', 
                border: '1px solid rgba(45, 214, 143, 0.3)',
                padding: '20px', 
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '2rem', fontWeight: '700', color: '#2dd68f' }}>
                  {assignments.length}
                </div>
                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
                  Total Assignments
                </div>
              </div>
              <div style={{ 
                background: 'rgba(255, 165, 0, 0.1)', 
                border: '1px solid rgba(255, 165, 0, 0.3)',
                padding: '20px', 
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '2rem', fontWeight: '700', color: '#ffa500' }}>
                  {submissions.length}
                </div>
                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
                  Total Submissions
                </div>
              </div>
            </div>

            <h3>Quick Actions</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <button
                onClick={addSampleAssignments}
                style={{
                  padding: '15px',
                  background: 'linear-gradient(135deg, #2dd68f, #02a89a)',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                ➕ Add 3 Sample Assignments
              </button>

              <button
                onClick={() => setShowData(!showData)}
                style={{
                  padding: '15px',
                  background: 'rgba(255, 165, 0, 0.2)',
                  border: '1px solid rgba(255, 165, 0, 0.3)',
                  borderRadius: '8px',
                  color: '#ffa500',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                {showData ? '👁️ Hide' : '👁️ Show'} Raw Data
              </button>

              <button
                onClick={clearAllData}
                style={{
                  padding: '15px',
                  background: 'rgba(255, 68, 68, 0.2)',
                  border: '1px solid rgba(255, 68, 68, 0.3)',
                  borderRadius: '8px',
                  color: '#ff4444',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                🗑️ Clear All Data
              </button>
            </div>

            {showData && (
              <div style={{ marginTop: '30px' }}>
                <h3>Raw Data</h3>
                <div style={{ 
                  background: 'rgba(0, 0, 0, 0.3)', 
                  padding: '20px', 
                  borderRadius: '12px',
                  maxHeight: '400px',
                  overflow: 'auto'
                }}>
                  <h4 style={{ color: '#2dd68f', marginBottom: '10px' }}>Assignments:</h4>
                  <pre style={{ 
                    color: 'rgba(255,255,255,0.8)', 
                    fontSize: '0.85rem',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word'
                  }}>
                    {JSON.stringify(assignments, null, 2)}
                  </pre>
                  
                  <h4 style={{ color: '#ffa500', marginTop: '20px', marginBottom: '10px' }}>Submissions:</h4>
                  <pre style={{ 
                    color: 'rgba(255,255,255,0.8)', 
                    fontSize: '0.85rem',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word'
                  }}>
                    {JSON.stringify(submissions, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default AssignmentDebug;
