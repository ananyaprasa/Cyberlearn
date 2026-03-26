import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssignments } from '../contexts/AssignmentContext';
import { useAuth } from '../contexts/AuthContext';
import { useClassrooms } from '../contexts/ClassroomContext';
import apiService from '../api/apiService';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AssignmentIcon } from '../components/AssignmentIcon';
import { TotalAssignmentsIcon } from '../components/stats/TotalAssignmentsIcon';
import { TotalSubmissionsIcon } from '../components/stats/TotalSubmissionsIcon';
import { PendingGradingIcon } from '../components/stats/PendingGradingIcon';
import { GradedIcon } from '../components/stats/GradedIcon';
import './Assignments.css';

function Assignments() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { assignments, submissions, isTeacher, getStudentSubmission, getStudentStats, isLoading, deleteAssignment } = useAssignments();
  const { isLoading: classroomsLoading, getClassroomById, getStudentClassrooms, getTeacherClassrooms } = useClassrooms();
  const [filter, setFilter] = useState('all');
  const [allTeacherSubmissions, setAllTeacherSubmissions] = useState([]);

  // Fetch all submissions for teacher's assignments from API
  const fetchTeacherSubmissions = async () => {
    if (!isTeacher()) return;
    try {
      const teacherClassroomIds = getTeacherClassrooms().map(c => c.id?.toString());
      const teacherAssignments = assignments.filter(a =>
        (a.classroomId && teacherClassroomIds.includes(a.classroomId?.toString()))
        || a.createdBy === user?.email
      );
      const results = await Promise.all(
        teacherAssignments.map(a =>
          apiService.submissions.getByAssignment(a.id).catch(() => [])
        )
      );
      setAllTeacherSubmissions(results.flat());
    } catch {
      // keep empty
    }
  };

  useEffect(() => {
    if (!isLoading && assignments.length > 0) fetchTeacherSubmissions();
  }, [assignments, isLoading]);

  // Re-fetch when tab regains focus so "Needs Grading" stays fresh
  useEffect(() => {
    const onFocus = () => {
      if (!isLoading && assignments.length > 0) fetchTeacherSubmissions();
    };
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, [assignments, isLoading]);

  // Teacher stats — computed from live API submissions
  const getTeacherStats = () => {
    const teacherClassrooms = getTeacherClassrooms();
    const teacherClassroomIds = teacherClassrooms.map(c => c.id?.toString());

    const teacherAssignments = (assignments || []).filter(assignment => {
      const ownsClassroom = assignment.classroomId && teacherClassroomIds.includes(assignment.classroomId?.toString());
      const createdByTeacher = assignment.createdBy === user?.email;
      return ownsClassroom || createdByTeacher;
    });

    const totalAssignments = teacherAssignments.length;
    const totalSubmissions = allTeacherSubmissions.length;
    const gradedSubmissions = allTeacherSubmissions.filter(s => s.status === 'graded').length;
    const pendingGrading = allTeacherSubmissions.filter(s => s.status === 'submitted').length;

    return { totalAssignments, totalSubmissions, gradedSubmissions, pendingGrading };
  };

  // Get difficulty level for assignment (can be extended to come from backend)
  const getDifficulty = (assignment) => {
    // This would come from backend in real implementation
    // For now, determine by points
    if (assignment.points <= 50) return 'easy';
    if (assignment.points <= 100) return 'medium';
    return 'hard';
  };

  if (isLoading || classroomsLoading) {
    return (
      <div className="assignments-page-wrapper">
        <Navbar />
        <div className="assignments-container">
          <div className="loading-container">
            <p>Loading assignments...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const getTimeRemaining = (deadline) => {
    if (!deadline) return { text: 'No deadline', color: '#7a9e92' };
    const now = new Date();
    const end = new Date(deadline);
    if (isNaN(end.getTime())) return { text: 'No deadline', color: '#7a9e92' };
    const diff = end - now;
    if (diff < 0) return { text: 'Overdue', color: '#ff4444' };
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    if (days > 7) return { text: `${days} days left`, color: '#2dd68f' };
    if (days > 2) return { text: `${days} days left`, color: '#ffa500' };
    return { text: `${days}d ${hours}h left`, color: '#ff4444' };
  };

  const filteredAssignments = (assignments || []).filter(assignment => {
    // For students, only show assignments from their enrolled classrooms
    if (!isTeacher()) {
      const studentClassrooms = getStudentClassrooms();
      const studentClassroomIds = studentClassrooms.map(c => c.id?.toString());
      const assignmentClassroomId = assignment.classroomId?.toString();

      if (!assignmentClassroomId || !studentClassroomIds.includes(assignmentClassroomId)) {
        return false;
      }
    }

    // For teachers, show assignments from their own classrooms OR assignments they created
    if (isTeacher()) {
      const teacherClassrooms = getTeacherClassrooms();
      const teacherClassroomIds = teacherClassrooms.map(c => c.id?.toString());
      const assignmentClassroomId = assignment.classroomId?.toString();

      const ownsClassroom = assignmentClassroomId && teacherClassroomIds.includes(assignmentClassroomId);
      const createdByTeacher = assignment.createdBy === user?.email;

      if (!ownsClassroom && !createdByTeacher) {
        return false;
      }
    }
    
    // Apply status filters for students
    if (!isTeacher()) {
      if (filter === 'all') return true;
      
      if (filter === 'pending') {
        const submission = getStudentSubmission(assignment.id);
        return !submission;
      }
      
      if (filter === 'submitted') {
        const submission = getStudentSubmission(assignment.id);
        return submission && submission.status === 'submitted';
      }
      
      if (filter === 'graded') {
        const submission = getStudentSubmission(assignment.id);
        return submission && submission.status === 'graded';
      }
      
      if (filter === 'overdue') {
        const deadline = new Date(assignment.deadline);
        const submission = getStudentSubmission(assignment.id);
        return deadline < new Date() && (!submission || submission.status !== 'graded');
      }
    }
    
    // Apply filters for teachers
    if (isTeacher()) {
      if (filter === 'all') return true;
      
      if (filter === 'needsGrading') {
        // Check if this assignment has any ungraded submissions using live API data
        const hasUngraded = allTeacherSubmissions.some(
          s => s.assignmentId?.toString() === assignment.id?.toString() && s.status === 'submitted'
        );
        return hasUngraded;
      }

      if (filter === 'graded') {
        // Assignments where at least one submission is graded and none are pending
        const subs = allTeacherSubmissions.filter(
          s => s.assignmentId?.toString() === assignment.id?.toString()
        );
        return subs.length > 0 && subs.every(s => s.status === 'graded');
      }
      
      if (filter === 'active') {
        const deadline = new Date(assignment.deadline);
        return deadline >= new Date();
      }
      
      if (filter === 'closed') {
        const deadline = new Date(assignment.deadline);
        return deadline < new Date();
      }
      
      if (filter === 'recent') {
        const createdAt = new Date(assignment.createdAt);
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        return createdAt >= sevenDaysAgo;
      }
    }
    
    return true;
  });

  // Compute stats based on assignments visible to this student
  const stats = getStudentStats(!isTeacher() ? filteredAssignments : undefined);
  const teacherStats = isTeacher() ? getTeacherStats() : null;

  return (
    <div className="assignments-page-wrapper">
      <Navbar />
      
      <div className="assignments-container">
        {/* Page Header */}
        <div className="page-header-section">
          <div className="header-main">
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '10px' }}>
              <AssignmentIcon size={64} />
              <h1 className="page-title" style={{ margin: 0 }}>Assignments</h1>
            </div>
            <p className="page-subtitle">Time to flex your cybersecurity muscles.</p>
          </div>
          
          <div className="header-actions">
            {isTeacher() && (
              <button 
                className="btn-primary"
                onClick={() => navigate('/assignments/create')}
              >
                + Create Assignment
              </button>
            )}
          </div>
        </div>

        {/* Stats Overview Section */}
        {!isTeacher() && (
          <div className="stats-overview">
            <div className="stat-card">
              <div className="shimmer-overlay"></div>
              <div className="scan-bar"></div>
              <div className="stat-icon"><TotalAssignmentsIcon size={70} /></div>
              <div className="stat-content">
                <div className="stat-value">{stats.submitted}</div>
                <div className="stat-label">Submitted</div>
              </div>
              <div className="bottom-bar"></div>
            </div>
            <div className="stat-card stat-card-success">
              <div className="shimmer-overlay"></div>
              <div className="scan-bar"></div>
              <div className="stat-icon"><GradedIcon size={70} /></div>
              <div className="stat-content">
                <div className="stat-value">{stats.graded}</div>
                <div className="stat-label">Graded</div>
              </div>
              <div className="bottom-bar"></div>
            </div>
            <div className="stat-card stat-card-warning">
              <div className="shimmer-overlay"></div>
              <div className="scan-bar"></div>
              <div className="stat-icon"><PendingGradingIcon size={70} /></div>
              <div className="stat-content">
                <div className="stat-value">{stats.pending}</div>
                <div className="stat-label">Pending</div>
              </div>
              <div className="bottom-bar"></div>
            </div>
            <div className="stat-card">
              <div className="shimmer-overlay"></div>
              <div className="scan-bar"></div>
              <div className="stat-icon"><TotalSubmissionsIcon size={70} /></div>
              <div className="stat-content">
                <div className="stat-value">{stats.totalPoints}</div>
                <div className="stat-label">Total Points</div>
              </div>
              <div className="bottom-bar"></div>
            </div>
          </div>
        )}
        
        {isTeacher() && teacherStats && (
          <div className="stats-overview">
            <div className="stat-card">
              <div className="shimmer-overlay"></div>
              <div className="scan-bar"></div>
              <div className="stat-icon"><TotalAssignmentsIcon size={70} /></div>
              <div className="stat-content">
                <div className="stat-value">{teacherStats.totalAssignments}</div>
                <div className="stat-label">Total Assignments</div>
              </div>
              <div className="bottom-bar"></div>
            </div>
            <div className="stat-card">
              <div className="shimmer-overlay"></div>
              <div className="scan-bar"></div>
              <div className="stat-icon"><TotalSubmissionsIcon size={70} /></div>
              <div className="stat-content">
                <div className="stat-value">{teacherStats.totalSubmissions}</div>
                <div className="stat-label">Total Submissions</div>
              </div>
              <div className="bottom-bar"></div>
            </div>
            <div className="stat-card stat-card-warning">
              <div className="shimmer-overlay"></div>
              <div className="scan-bar"></div>
              <div className="stat-icon"><PendingGradingIcon size={70} /></div>
              <div className="stat-content">
                <div className="stat-value">{teacherStats.pendingGrading}</div>
                <div className="stat-label">Pending Grading</div>
              </div>
              <div className="bottom-bar"></div>
            </div>
            <div className="stat-card stat-card-success">
              <div className="shimmer-overlay"></div>
              <div className="scan-bar"></div>
              <div className="stat-icon"><GradedIcon size={70} /></div>
              <div className="stat-content">
                <div className="stat-value">{teacherStats.gradedSubmissions}</div>
                <div className="stat-label">Graded</div>
              </div>
              <div className="bottom-bar"></div>
            </div>
          </div>
        )}

        {/* Upcoming Deadlines Calendar */}
        {!isTeacher() && filteredAssignments.length > 0 && (() => {
          const pendingDeadlines = filteredAssignments
            .filter(a => {
              if (!a.deadline || isNaN(new Date(a.deadline).getTime())) return false;
              return !getStudentSubmission(a.id);
            })
            .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
            .slice(0, 5);

          return (
            <div className="deadline-calendar">
              <div className="calendar-header">
                <h2 className="calendar-title">📅 Upcoming Deadlines</h2>
                <p className="calendar-subtitle">Stay on track with your assignments</p>
              </div>
              <div className="calendar-timeline">
                {pendingDeadlines.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted, #6b7f7d)', fontSize: '0.95rem' }}>
                    No pending deadlines 🎉
                  </div>
                ) : (
                  pendingDeadlines.map(assignment => {
                    const timeInfo = getTimeRemaining(assignment.deadline);
                    const deadline = new Date(assignment.deadline);
                    const isOverdue = deadline < new Date();
                    const classroom = getClassroomById(assignment.classroomId);

                    return (
                      <div
                        key={assignment.id}
                        className={`timeline-item ${isOverdue ? 'overdue' : ''}`}
                        onClick={() => navigate(`/assignments/${assignment.id}`)}
                      >
                        <div className="timeline-date">
                          <div className="date-day">{deadline.getDate()}</div>
                          <div className="date-month">{deadline.toLocaleDateString('en-US', { month: 'short' })}</div>
                        </div>
                        <div className="timeline-connector">
                          <div className="connector-dot"></div>
                          <div className="connector-line"></div>
                        </div>
                        <div className="timeline-content">
                          <div className="timeline-header">
                            <h3 className="timeline-title">{assignment.title}</h3>
                          </div>
                          <div className="timeline-meta">
                            {classroom && (
                              <span className="timeline-classroom">🏫 {classroom.name}</span>
                            )}
                            <span className="timeline-category">{assignment.category}</span>
                            <span className="timeline-points">🏆 {assignment.points} pts</span>
                            <span className="timeline-time" style={{ color: timeInfo.color }}>
                              {timeInfo.text}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })()}

        {/* Controls Section */}
        <div className="controls-section">
          <div className="controls-left">
            <div className="search-bar">
              <input 
                type="text" 
                className="search-input"
                placeholder="🔍 Search assignments..."
              />
            </div>
            
            <div className="filter-pills">
              <button className={`filter-pill ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
                All
              </button>
              {!isTeacher() && (
                <>
                  <button className={`filter-pill ${filter === 'pending' ? 'active' : ''}`} onClick={() => setFilter('pending')}>
                    Pending
                  </button>
                  <button className={`filter-pill ${filter === 'submitted' ? 'active' : ''}`} onClick={() => setFilter('submitted')}>
                    Submitted
                  </button>
                  <button className={`filter-pill ${filter === 'graded' ? 'active' : ''}`} onClick={() => setFilter('graded')}>
                    Graded
                  </button>
                  <button className={`filter-pill ${filter === 'overdue' ? 'active' : ''}`} onClick={() => setFilter('overdue')}>
                    Overdue
                  </button>
                </>
              )}
              {isTeacher() && (
                <>
                  <button className={`filter-pill ${filter === 'needsGrading' ? 'active' : ''}`} onClick={() => setFilter('needsGrading')}>
                    Needs Grading
                  </button>
                  <button className={`filter-pill ${filter === 'graded' ? 'active' : ''}`} onClick={() => setFilter('graded')}>
                    Graded
                  </button>
                  <button className={`filter-pill ${filter === 'active' ? 'active' : ''}`} onClick={() => setFilter('active')}>
                    Active
                  </button>
                  <button className={`filter-pill ${filter === 'closed' ? 'active' : ''}`} onClick={() => setFilter('closed')}>
                    Closed
                  </button>
                  <button className={`filter-pill ${filter === 'recent' ? 'active' : ''}`} onClick={() => setFilter('recent')}>
                    Recent
                  </button>
                </>
              )}
            </div>
          </div>
          
          <div className="controls-right">
            <div className="sort-dropdown">
              <select className="sort-select">
                <option value="dueDate">Due Date</option>
                <option value="difficulty">Difficulty</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
          </div>
        </div>

        {/* Assignment Cards */}
        <div className="assignments-grid">
          {filteredAssignments.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon"><AssignmentIcon size={64} /></div>
              {!isTeacher() && getStudentClassrooms().length === 0 ? (
                <>
                  <p className="empty-message">You're not enrolled in any classroom yet.</p>
                  <p className="empty-hint">Join a classroom first to see your assignments.</p>
                  <button className="card-action-btn" style={{ marginTop: '16px' }} onClick={() => navigate('/classrooms')}>
                    Browse Classrooms
                  </button>
                </>
              ) : (
                <>
                  <p className="empty-message">No assignments found.</p>
                  <p className="empty-hint">Your cybersecurity missions will appear here once assigned.</p>
                </>
              )}
            </div>
          ) : (
            filteredAssignments.map(assignment => {
              const timeInfo = getTimeRemaining(assignment.deadline);
              const submission = getStudentSubmission(assignment.id);
              const difficulty = getDifficulty(assignment);
              const classroom = getClassroomById(assignment.classroomId);
              
              return (
                <div 
                  key={assignment.id} 
                  className="assignment-card"
                  onClick={() => navigate(`/assignments/${assignment.id}`)}
                >
                  {/* Card Header */}
                  <div className="card-header">
                    <div className="card-title-row">
                      <h3 className="card-title">{assignment.title}</h3>
                      {!isTeacher() && submission && (
                        <div className="card-status">
                          {submission.status === 'submitted' && (
                            <span className="status-badge status-submitted">Submitted</span>
                          )}
                          {submission.status === 'graded' && (
                            <span className="status-badge status-graded">Graded</span>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div className="card-tags">
                      {classroom && (
                        <span className="tag tag-classroom" title={`Classroom: ${classroom.name}`}>
                          🏫 {classroom.name}
                        </span>
                      )}
                      <span className="tag tag-category">{assignment.category}</span>
                      <span className={`tag tag-difficulty tag-${difficulty}`}>
                        {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="card-body">
                    <p className="card-description">{assignment.description}</p>
                  </div>

                  {/* Card Footer */}
                  <div className="card-footer">
                    <div className="card-meta">
                      <div className="meta-item">
                        <span className="meta-icon">🏆</span>
                        <span className="meta-value">{assignment.points} pts</span>
                      </div>
                      <div className="meta-item">
                        <span className="meta-icon">⏰</span>
                        <span 
                          className="meta-value"
                          style={{ color: timeInfo.color }}
                        >
                          {timeInfo.text}
                        </span>
                      </div>
                    </div>

                    {/* Teacher Info */}
                    {isTeacher() && (
                      <div className="teacher-info">
                        {(() => {
                          const subs = allTeacherSubmissions.filter(
                            s => s.assignmentId?.toString() === assignment.id?.toString()
                          );
                          const gradedCount = subs.filter(s => s.status === 'graded').length;
                          const pendingCount = subs.filter(s => s.status === 'submitted').length;
                          return (
                            <>
                              <span className="teacher-stat">
                                📝 {subs.length} submission{subs.length !== 1 ? 's' : ''}
                              </span>
                              {pendingCount > 0 && (
                                <span className="teacher-stat teacher-stat-pending">
                                  ⏳ {pendingCount} need grading
                                </span>
                              )}
                              {gradedCount > 0 && (
                                <span className="teacher-stat teacher-stat-graded">
                                  ✓ {gradedCount} graded
                                </span>
                              )}
                            </>
                          );
                        })()}
                      </div>
                    )}

                    {/* Student Grade Info */}
                    {!isTeacher() && submission && submission.status === 'graded' && (
                      <div className="grade-info">
                        <span className="grade-label">Your Grade:</span>
                        <span className="grade-value">{submission.grade}/{assignment.points}</span>
                      </div>
                    )}

                    {/* Action Buttons */}
                    {isTeacher() ? (
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button 
                          className="card-action-btn" 
                          style={{ flex: 1 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/assignments/${assignment.id}`);
                          }}
                        >
                          View Details
                        </button>
                        <button 
                          className="card-action-btn"
                          style={{ 
                            flex: 0,
                            background: '#dc2626',
                            borderColor: '#dc2626',
                            padding: '8px 16px'
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (window.confirm(`Delete "${assignment.title}"? This cannot be undone.`)) {
                              deleteAssignment(assignment.id);
                            }
                          }}
                        >
                          🗑️
                        </button>
                      </div>
                    ) : (
                      <button className="card-action-btn">
                        {submission ? 'View Submission' : 'Start Assignment'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default Assignments;
