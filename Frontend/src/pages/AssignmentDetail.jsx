import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAssignments } from '../contexts/AssignmentContext';
import { useAuth } from '../contexts/AuthContext';
import apiService from '../api/apiService';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import UserAvatar from '../components/UserAvatar';
import CyberAssignmentCard from '../components/CyberAssignmentCard';
import './AssignmentDetail.css';

function AssignmentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, isTeacher: authIsTeacher } = useAuth();
  const { 
    assignments, 
    isTeacher, 
    submitAssignment,
    unsubmitAssignment,
    getStudentSubmission,
  } = useAssignments();

  const [freshSubmissions, setFreshSubmissions] = useState(null);
  const [submissionsLoading, setSubmissionsLoading] = useState(true);

  const assignment = assignments && assignments.length > 0 
    ? assignments.find(a => a.id?.toString() === id) 
    : null;
  const studentSubmission = getStudentSubmission(id);
  const userIsTeacher = isTeacher() || (authIsTeacher && authIsTeacher());

  // Fetch submissions from API on mount (teachers only)
  useEffect(() => {
    if (!userIsTeacher) return;
    const fetchSubmissions = async () => {
      setSubmissionsLoading(true);
      try {
        console.log('📋 Fetching submissions for assignment:', id);
        const data = await apiService.submissions.getByAssignment(id);
        console.log('📋 Submissions response:', data);
        if (data && Array.isArray(data)) {
          setFreshSubmissions(data);
        } else {
          setFreshSubmissions([]);
        }
      } catch (err) {
        console.error('❌ Failed to fetch submissions:', err?.message, err?.response?.data);
        setFreshSubmissions([]);
      } finally {
        setSubmissionsLoading(false);
      }
    };
    fetchSubmissions();
    const handleFocus = () => fetchSubmissions();
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [id, userIsTeacher]);

  const allSubmissions = userIsTeacher ? (freshSubmissions ?? []) : [];

  if (!assignment) {
    return (
      <>
        <Navbar />
        <div className="assignment-detail-container">
          <p style={{ color: 'white', textAlign: 'center' }}>Assignment not found</p>
        </div>
        <Footer />
      </>
    );
  }

  const handleCyberUnsubmit = async (submissionId) => {
    if (!window.confirm('Are you sure you want to unsubmit? You can resubmit after.')) return;
    try {
      await unsubmitAssignment(submissionId);
    } catch (error) {
      alert(error.message || 'Failed to unsubmit.');
    }
  };

  const handleCyberSubmit = async (submissionData) => {
    try {
      await submitAssignment(id, submissionData);
    } catch (error) {
      console.error('Submission error:', error);
      alert(error.message || 'Failed to submit assignment. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      
      <div className="assignment-detail-container">
        <button className="back-button" onClick={() => navigate('/assignments')}>
          ← Back to Assignments
        </button>

        {/* New Cyber Card Component */}
        <CyberAssignmentCard 
          assignment={assignment}
          onSubmit={handleCyberSubmit}
          onUnsubmit={handleCyberUnsubmit}
          studentSubmission={studentSubmission}
          isTeacher={userIsTeacher}
        />

        {/* Teacher Submissions Section */}
        {userIsTeacher && (
          <div className="submission-section">
            <h2>Student Submissions ({allSubmissions.length})</h2>
            {submissionsLoading ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>
                Loading submissions...
              </div>
            ) : allSubmissions.length === 0 ? (
              <div style={{ 
                padding: '2rem', 
                textAlign: 'center', 
                color: 'rgba(255,255,255,0.7)',
                background: 'rgba(0,0,0,0.2)',
                borderRadius: '12px'
              }}>
                <p>No submissions yet.</p>
              </div>
            ) : (
              <div className="submissions-list">
                {allSubmissions.map(submission => (
                  <div 
                    key={submission.id} 
                    className="submission-item"
                    onClick={() => navigate(`/assignments/${id}/grade/${submission.id}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="submission-header">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <UserAvatar 
                          user={{ name: submission.studentName, email: submission.studentEmail }} 
                          size={40} 
                        />
                        <span className="student-name">{submission.studentName}</span>
                      </div>
                      <span className={`status-badge ${submission.status}`}>
                        {submission.status === 'graded' 
                          ? `Graded: ${submission.grade}/${assignment.points}`
                          : 'Pending Review'
                        }
                      </span>
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', marginLeft: '52px' }}>
                      Submitted: {new Date(submission.submittedAt).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      
      <Footer />
    </>
  );
}

export default AssignmentDetail;
