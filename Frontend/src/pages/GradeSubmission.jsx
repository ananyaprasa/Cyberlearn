import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAssignments } from '../contexts/AssignmentContext';
import apiService from '../api/apiService';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './GradeSubmission.css';

function GradeSubmission() {
  const { assignmentId, submissionId } = useParams();
  const navigate = useNavigate();
  const { isTeacher } = useAssignments();

  const [submission, setSubmission] = useState(null);
  const [assignment, setAssignment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [grade, setGrade] = useState('');
  const [feedback, setFeedback] = useState('');
  const [saving, setSaving] = useState(false);
  const feedbackRef = useRef(null);

  useEffect(() => {
    const load = async () => {
      try {
        const [subs, assign] = await Promise.all([
          apiService.submissions.getByAssignment(assignmentId),
          apiService.assignments.getById(assignmentId)
        ]);
        const found = subs?.find(s => s.id?.toString() === submissionId);
        if (found) {
          setSubmission(found);
          setGrade(found.grade ?? '');
          setFeedback(found.feedback ?? '');
        }
        if (assign) setAssignment(assign);
      } catch (err) {
        console.error('Failed to load submission:', err);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [assignmentId, submissionId]);

  // Auto-resize feedback textarea
  const autoResize = useCallback((el) => {
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
  }, []);

  useEffect(() => {
    if (feedbackRef.current) autoResize(feedbackRef.current);
  }, [feedback, autoResize]);

  const handleSubmitGrade = async (e) => {
    e.preventDefault();
    if (grade === '' && !feedback) {
      alert('Please enter a grade or feedback');
      return;
    }
    setSaving(true);
    try {
      await apiService.submissions.grade(submissionId, {
        grade: grade !== '' ? parseInt(grade) : null,
        feedback
      });
      navigate(`/assignments/${assignmentId}`);
    } catch (err) {
      alert('Failed to submit grade: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const hasContent = submission?.text || submission?.link || submission?.files?.length > 0;

  if (!isTeacher()) {
    return (
      <>
        <Navbar />
        <div className="grade-page-wrapper">
          <div className="grade-container" style={{ textAlign: 'center', paddingTop: '80px' }}>
            <h2 style={{ color: '#ef4444' }}>Access Denied</h2>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="grade-page-wrapper">
          <div className="grade-container">
            <div className="loading-container">
              <p>Loading submission...</p>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!submission) {
    return (
      <>
        <Navbar />
        <div className="grade-page-wrapper">
          <div className="grade-container">
            <button className="back-btn" onClick={() => navigate(`/assignments/${assignmentId}`)}>
              ← Back to Assignment
            </button>
            <p style={{ color: '#94a3b8', marginTop: '40px' }}>Submission not found.</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const maxPoints = assignment?.points || 100;

  return (
    <>
      <Navbar />
      <div className="grade-page-wrapper">
        <div className="grade-container">
          <button className="back-btn" onClick={() => navigate(`/assignments/${assignmentId}`)}>
            ← Back to Assignment
          </button>

          {/* Page title */}
          <div className="grade-page-header">
            <h1 className="grade-page-title">Grade Submission</h1>
            {assignment && <p className="grade-page-subtitle">{assignment.title}</p>}
          </div>

          <div className="grade-layout">
            {/* Left column — student info + submission */}
            <div className="grade-left">

              {/* Student card */}
              <div className="grade-panel">
                <div className="grade-panel-label">Student</div>
                <div className="student-info">
                  <div className="student-avatar">
                    {(submission.studentName || '?')[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="student-name">{submission.studentName || 'Unknown'}</div>
                    <div className="student-email">{submission.studentEmail}</div>
                    <div className="student-meta">
                      Submitted: {new Date(submission.submittedAt).toLocaleString()}
                    </div>
                  </div>
                </div>
                {submission.status === 'graded' && (
                  <div className="already-graded-badge">
                    ✓ Previously graded: {submission.grade}/{maxPoints}
                  </div>
                )}
              </div>

              {/* Submission content */}
              <div className="grade-panel">
                <div className="grade-panel-label">Submission</div>

                {!hasContent && (
                  <div className="no-content">
                    <span className="no-content-icon">📭</span>
                    <span>No content submitted.</span>
                  </div>
                )}

                {submission.text && (
                  <div className="content-block">
                    <div className="content-block-label">✏️ Text Answer</div>
                    <div className="content-text">{submission.text}</div>
                  </div>
                )}

                {submission.link && (
                  <div className="content-block">
                    <div className="content-block-label">🔗 Link</div>
                    <a
                      href={submission.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="content-link"
                    >
                      {submission.link}
                    </a>
                  </div>
                )}

                {submission.files?.length > 0 && (
                  <div className="content-block">
                    <div className="content-block-label">📎 Files ({submission.files.length})</div>
                    <div className="file-list">
                      {submission.files.map((f, i) => (
                        <div key={i} className="file-item">
                          <span className="file-icon">
                            {f.name?.endsWith('.pdf') ? '📄' : '📝'}
                          </span>
                          <span className="file-name">{f.name}</span>
                          {f.url && (
                            <a href={f.url} download={f.name} className="file-download">
                              ↓ Download
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right column — grading form */}
            <div className="grade-right">
              <div className="grade-panel grade-form-panel">
                <div className="grade-panel-label">
                  {submission.status === 'graded' ? 'Update Grade' : 'Grade Submission'}
                </div>

                <form onSubmit={handleSubmitGrade}>
                  {/* Grade input */}
                  <div className="form-group">
                    <label className="form-label">
                      Grade
                      <span className="form-label-hint">out of {maxPoints}</span>
                    </label>
                    <div className="grade-input-wrapper">
                      <input
                        type="number"
                        min="0"
                        max={maxPoints}
                        value={grade}
                        onChange={e => setGrade(e.target.value)}
                        className="grade-input"
                        placeholder="0"
                      />
                      <span className="grade-input-suffix">/ {maxPoints}</span>
                    </div>
                    {grade !== '' && (
                      <div className="grade-progress">
                        <div
                          className="grade-progress-bar"
                          style={{ width: `${Math.min(100, (parseInt(grade) / maxPoints) * 100)}%` }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Feedback textarea */}
                  <div className="form-group">
                    <label className="form-label">
                      Feedback
                      <span className="form-label-hint">optional</span>
                    </label>
                    <textarea
                      ref={feedbackRef}
                      value={feedback}
                      onChange={e => {
                        setFeedback(e.target.value);
                        autoResize(e.target);
                      }}
                      className="feedback-textarea"
                      placeholder="Write feedback for the student..."
                      rows={3}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={saving}
                    className={`submit-grade-btn ${saving ? 'saving' : ''}`}
                  >
                    {saving ? 'Saving...' : submission.status === 'graded' ? 'Update Grade' : 'Submit Grade'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default GradeSubmission;
