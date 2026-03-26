import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClassrooms } from '../contexts/ClassroomContext';
import { useAuth } from '../contexts/AuthContext';
import apiService from '../api/apiService';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAutoResize } from '../hooks/useAutoResize';
import './Classrooms.css';

/* ─── ClassroomCard ─────────────────────────────────── */
function ClassroomCard({ classroom, studentCount, assignmentCount, onClick, isTeacherView }) {
  return (
    <div className="classroom-card" onClick={onClick} style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Shimmer overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.05) 50%, transparent 60%)",
          backgroundSize: "200% 100%",
          animation: "shimmer-move 3s linear infinite",
          pointerEvents: "none",
        }}
      />

      {/* Scanline */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          height: 60,
          background: "linear-gradient(180deg, transparent, rgba(255,255,255,.025), transparent)",
          animation: "scan-move 5s linear infinite",
          pointerEvents: "none",
        }}
      />

      <div className="classroom-header">
        <h3>{classroom.name}</h3>
        {isTeacherView
          ? <span className="classroom-code">{classroom.code}</span>
          : <span className="classroom-badge">Enrolled</span>
        }
      </div>

      <p className="classroom-description">
        {classroom.description || 'No description provided.'}
      </p>

      <div className="classroom-footer">
        {isTeacherView
          ? <span className="classroom-subject">📚 {classroom.subject}</span>
          : <span className="classroom-teacher">👨‍🏫 {classroom.teacherName}</span>
        }
        <span className="classroom-students">👥 {studentCount} students</span>
      </div>

      <div className="classroom-assignments">
        📝 {assignmentCount} assignments
      </div>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────── */
function Classrooms() {
  const navigate   = useNavigate();
  const { user }   = useAuth();
  const {
    isTeacher,
    getTeacherClassrooms,
    getStudentClassrooms,
    getClassroomStudents,
    createClassroom,
    joinClassroom,
    isLoading,
  } = useClassrooms();

  const [assignmentCounts, setAssignmentCounts] = useState({});

  const teacher          = isTeacher();
  const teacherClassrooms = teacher ? getTeacherClassrooms() : [];
  const studentClassrooms = getStudentClassrooms();
  const classrooms        = teacher ? teacherClassrooms : studentClassrooms;

  // Fetch assignment counts for all visible classrooms
  useEffect(() => {
    if (classrooms.length === 0) return;
    let cancelled = false;
    const fetchCounts = async () => {
      const entries = await Promise.all(
        classrooms.map(async (c) => {
          try {
            const data = await apiService.assignments.getByClassroom(c.id);
            return [c.id, Array.isArray(data) ? data.length : 0];
          } catch {
            return [c.id, 0];
          }
        })
      );
      if (!cancelled) setAssignmentCounts(Object.fromEntries(entries));
    };
    fetchCounts();
    return () => { cancelled = true; };
  }, [classrooms.length]); // re-run when classroom list changes
  const [showJoinModal,   setShowJoinModal]   = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [joinCode,        setJoinCode]        = useState('');
  const [joinError,       setJoinError]       = useState('');
  const [createError,     setCreateError]     = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    subject: 'Cybersecurity',
  });

  const classroomDescRef = useRef(null);
  useAutoResize(classroomDescRef, formData.description);

  /* ── Handlers ── */
  const handleCreateClassroom = async (e) => {
    e.preventDefault();
    setCreateError('');
    if (!formData.name.trim()) {
      setCreateError('Classroom name is required.');
      return;
    }
    try {
      const classroom = await createClassroom(formData);
      if (!classroom?.id) {
        setCreateError('Classroom created but ID is missing. Please refresh.');
        return;
      }
      setShowCreateModal(false);
      setFormData({ name: '', description: '', subject: 'Cybersecurity' });
      navigate(`/classrooms/${classroom.id}`);
    } catch (err) {
      setCreateError(err.message);
    }
  };

  const handleJoinClassroom = async (e) => {
    e.preventDefault();
    setJoinError('');
    if (!joinCode.trim()) {
      setJoinError('Please enter a classroom code.');
      return;
    }
    try {
      const classroom = await joinClassroom(joinCode);
      setShowJoinModal(false);
      setJoinCode('');
      navigate(`/classrooms/${classroom.id}`);
    } catch (err) {
      setJoinError(err.message);
    }
  };

  const closeCreate = () => { setShowCreateModal(false); setCreateError(''); };
  const closeJoin   = () => { setShowJoinModal(false);   setJoinError('');   };

  /* ── Loading ── */
  if (isLoading) {
    return (
      <div className="classrooms-page-wrapper">
        <Navbar />
        <div className="classrooms-container">
          <p style={{ color: 'var(--muted)', textAlign: 'center', marginTop: '4rem' }}>
            Loading classrooms…
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  /* ── Render ── */
  return (
    <div className="classrooms-page-wrapper">
      <Navbar />

      <div className="classrooms-container">

        {/* Header */}
        <div className="classrooms-header">
          <div className="header-content">
            <h1>Classrooms</h1>
            <p>{teacher ? 'Manage your classrooms' : 'Your enrolled classrooms'}</p>
          </div>

          <div className="header-actions">
            {teacher ? (
              <button className="cls-btn-primary" onClick={() => setShowCreateModal(true)}>
                + Create Classroom
              </button>
            ) : (
              <button className="cls-btn-primary" onClick={() => setShowJoinModal(true)}>
                + Join Classroom
              </button>
            )}
          </div>
        </div>

        {/* Grid */}
        <div className="classrooms-grid">
          {classrooms.length === 0 ? (
            <div className="empty-state">
              {teacher
                ? 'No classrooms yet. Create your first classroom!'
                : "You haven't joined any classrooms yet. Use a code to join!"}
            </div>
          ) : (
            classrooms.map((classroom) => (
              <ClassroomCard
                key={classroom.id}
                classroom={classroom}
                studentCount={getClassroomStudents(classroom.id).length}
                assignmentCount={assignmentCounts[classroom.id] ?? 0}
                isTeacherView={teacher}
                onClick={() => navigate(`/classrooms/${classroom.id}`)}
              />
            ))
          )}
        </div>
      </div>

      {/* ── Create Classroom Modal ── */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={closeCreate}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Create Classroom</h2>
            <form onSubmit={handleCreateClassroom}>
              <div className="form-group">
                <label>Classroom Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Cybersecurity 101"
                  autoFocus
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  ref={classroomDescRef}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of the classroom…"
                  rows="3"
                  style={{ overflowY: 'hidden', resize: 'none' }}
                />
              </div>

              <div className="form-group">
                <label>Subject</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                >
                  <option value="Cybersecurity">Cybersecurity</option>
                  <option value="Network Security">Network Security</option>
                  <option value="Cryptography">Cryptography</option>
                  <option value="OSINT">OSINT</option>
                  <option value="Reconnaissance">Reconnaissance</option>
                  <option value="General">General</option>
                </select>
              </div>

              {createError && (
                <p style={{ color: '#ff6b6b', fontSize: '0.82rem', marginBottom: '0.5rem' }}>
                  {createError}
                </p>
              )}

              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={closeCreate}>Cancel</button>
                <button type="submit" className="submit-btn">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Join Classroom Modal ── */}
      {showJoinModal && (
        <div className="modal-overlay" onClick={closeJoin}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Join Classroom</h2>
            <form onSubmit={handleJoinClassroom}>
              <div className="form-group">
                <label>Classroom Code *</label>
                <input
                  type="text"
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                  placeholder="XXXXXX"
                  maxLength="6"
                  autoFocus
                  style={{
                    fontFamily: "'Syne Mono', monospace",
                    letterSpacing: '0.2em',
                    fontSize: '1.1rem',
                    textAlign: 'center',
                  }}
                />
                <p className="modal-hint">Ask your teacher for the 6-character classroom code.</p>
              </div>

              {joinError && (
                <p style={{ color: '#ff6b6b', fontSize: '0.82rem', marginBottom: '0.5rem' }}>
                  {joinError}
                </p>
              )}

              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={closeJoin}>Cancel</button>
                <button type="submit" className="submit-btn">Join</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Classrooms;