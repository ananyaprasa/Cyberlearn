import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAssignments } from '../contexts/AssignmentContext';
import { useClassrooms } from '../contexts/ClassroomContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import OptimizedBackground from '../components/OptimizedBackground';
import { useAutoResize } from '../hooks/useAutoResize';
import './AssignmentDetail.css';

function CreateAssignment() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const classroomIdFromUrl = searchParams.get('classroomId');
  
  const { createAssignment, isTeacher } = useAssignments();
  const { getTeacherClassrooms } = useClassrooms();
  const teacherClassrooms = getTeacherClassrooms() || [];
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Network Security',
    points: 100,
    deadline: '',
    allowLinks: true,
    allowedFileTypes: ['.pdf', '.doc', '.docx', '.txt'],
    classroomId: classroomIdFromUrl || (teacherClassrooms.length > 0 ? teacherClassrooms[0].id : '')
  });

  const descriptionRef = useRef(null);
  useAutoResize(descriptionRef, formData.description);

  if (!isTeacher()) {
    navigate('/assignments');
    return null;
  }

  if (teacherClassrooms.length === 0) {
    return (
      <div style={{ position: 'relative', minHeight: '100vh' }}>
        <OptimizedBackground colors={['#006200', '#004e00', '#9a9a59']} type="waterPlane" />
        <Navbar />
        <div className="assignment-detail-container">
          <button className="back-button" onClick={() => navigate('/classrooms')}>
            ← Back to Classrooms
          </button>
          <div className="submission-section">
            <h2>No Classrooms Found</h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '20px' }}>
              You need to create a classroom before you can create assignments.
            </p>
            <button 
              className="submit-button"
              onClick={() => navigate('/classrooms')}
            >
              Go to Classrooms
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.deadline) {
      alert('Please fill in all required fields');
      return;
    }

    if (!formData.classroomId) {
      alert('Please select a classroom');
      return;
    }

    const classroomId = formData.classroomId;
    const { classroomId: _, ...assignmentData } = formData;
    
    try {
      const newAssignment = await createAssignment(assignmentData, classroomId);
      if (newAssignment?.id) {
        alert('Assignment created successfully!');
        navigate(`/classrooms/${classroomId}`);
      }
    } catch (err) {
      alert('Failed to create assignment: ' + err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <OptimizedBackground colors={['#006200', '#004e00', '#9a9a59']} type="waterPlane" />
      
      <Navbar />
      
      <div className="assignment-detail-container">
        <button className="back-button" onClick={() => navigate('/assignments')}>
          ← Back to Assignments
        </button>

        <div className="submission-section">
          <h2>Create New Assignment</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Assignment title"
                required
              />
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea
                ref={descriptionRef}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Detailed assignment description and instructions..."
                required
                style={{ overflowY: 'hidden', resize: 'none' }}
              />
            </div>

            <div className="form-group">
              <label>Classroom *</label>
              <select
                name="classroomId"
                value={formData.classroomId}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'rgba(0, 0, 0, 0.3)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  color: 'white',
                  fontFamily: 'inherit'
                }}
              >
                {teacherClassrooms.map(classroom => (
                  <option key={classroom.id} value={classroom.id}>
                    {classroom.name}
                  </option>
                ))}
              </select>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', marginTop: '5px' }}>
                Select which classroom this assignment is for
              </p>
            </div>

            <div className="form-group">
              <label>Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'rgba(0, 0, 0, 0.3)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  color: 'white',
                  fontFamily: 'inherit'
                }}
              >
                <option value="Network Security">Network Security</option>
                <option value="Cryptography">Cryptography</option>
                <option value="OSINT">OSINT</option>
                <option value="Reconnaissance">Reconnaissance</option>
                <option value="General">General</option>
              </select>
            </div>

            <div className="form-group">
              <label>Points *</label>
              <input
                type="number"
                name="points"
                value={formData.points}
                onChange={handleChange}
                min="1"
                max="1000"
                required
              />
            </div>

            <div className="form-group">
              <label>Deadline *</label>
              <input
                type="datetime-local"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'rgba(0, 0, 0, 0.3)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  color: 'white',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  name="allowLinks"
                  checked={formData.allowLinks}
                  onChange={handleChange}
                  style={{ width: 'auto' }}
                />
                Allow students to submit links
              </label>
            </div>

            <div className="form-group">
              <label>Allowed File Types</label>
              <input
                type="text"
                value={formData.allowedFileTypes.join(', ')}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  allowedFileTypes: e.target.value.split(',').map(s => s.trim())
                }))}
                placeholder=".pdf, .doc, .docx, .txt"
              />
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', marginTop: '5px' }}>
                Separate file extensions with commas
              </p>
            </div>

            <button type="submit" className="submit-button">
              Create Assignment
            </button>
          </form>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default CreateAssignment;
