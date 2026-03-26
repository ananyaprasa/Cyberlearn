import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useClassrooms } from "../contexts/ClassroomContext";
import { useAuth } from "../contexts/AuthContext";
import apiService from "../api/apiService";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import UserAvatar from "../components/UserAvatar";
import "./ClassroomDetail.css";

/* ─── Assignments Tab ────────────────────────────────── */
function AssignmentsTab({ assignments, isOwner, onNavigate, classroomId }) {
  if (assignments.length === 0) {
    return (
      <div className="empty-state">
        <p>No assignments yet</p>
        {isOwner && (
          <button className="create-btn" onClick={() => onNavigate(`/assignments/create?classroomId=${classroomId}`)}>
            + Create First Assignment
          </button>
        )}
      </div>
    );
  }
  return (
    <div className="assignments-list">
      {isOwner && (
        <button className="create-btn" onClick={() => onNavigate(`/assignments/create?classroomId=${classroomId}`)} style={{ marginBottom: "1.5rem" }}>
          + Add Assignment to Classroom
        </button>
      )}
      {assignments.map((a) => (
        <div key={a.id} className="assignment-item" onClick={() => onNavigate(`/assignments/${a.id}`)}>
          <div className="assignment-header">
            <h3>{a.title}</h3>
            <span className="assignment-points">🏆 {a.points} pts</span>
          </div>
          <p className="assignment-desc">{a.description}</p>
          <div className="assignment-meta">
            <span className="category-badge">{a.category}</span>
            <span className="deadline">⏰ Due: {new Date(a.deadline).toLocaleDateString()}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Students Tab ───────────────────────────────────── */
function StudentsTab({ students, isOwner }) {
  if (students.length === 0) {
    return (
      <div className="empty-state">
        <p>No students enrolled yet</p>
        {isOwner && <p style={{ fontSize: "0.85rem", color: "var(--muted)", marginTop: 0 }}>Share the classroom code with students to let them join.</p>}
      </div>
    );
  }
  return (
    <div className="students-list">
      {students.map((student) => (
        <div key={student.id} className="student-item">
          <UserAvatar user={{ name: student.studentName, email: student.studentEmail }} size={48} />
          <div className="student-info">
            <div className="student-name">{student.studentName}</div>
            <div className="student-email">{student.studentEmail}</div>
          </div>
          <div className="student-date">
            {student.enrolledAt && !isNaN(new Date(student.enrolledAt))
              ? `Joined ${new Date(student.enrolledAt).toLocaleDateString()}`
              : ''}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Study Materials Tab ────────────────────────────── */
function StudyMaterialsTab({ classroomId, isOwner }) {
  const [materials,   setMaterials]   = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState("");
  const [uploading,   setUploading]   = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [title,       setTitle]       = useState("");
  const [file,        setFile]        = useState(null);
  const [deletingId,  setDeletingId]  = useState(null);
  const fileInputRef = useRef(null);

  const fetchMaterials = async () => {
    try {
      setError("");
      const data = await apiService.materials.getByClassroom(classroomId);
      setMaterials(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Failed to load materials");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMaterials(); }, [classroomId]);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    if (selected.type !== "application/pdf") {
      setUploadError("Only PDF files are allowed");
      e.target.value = "";
      return;
    }
    setUploadError("");
    setFile(selected);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!title.trim()) { setUploadError("Title is required"); return; }
    if (!file)          { setUploadError("Please select a PDF file"); return; }

    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("file", file);

    setUploading(true);
    setUploadError("");
    try {
      const created = await apiService.materials.upload(classroomId, formData);
      setMaterials((prev) => [created, ...prev]);
      setTitle("");
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      setUploadError(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (materialId) => {
    if (!window.confirm("Delete this material? This cannot be undone.")) return;
    setDeletingId(materialId);
    try {
      await apiService.materials.delete(materialId);
      setMaterials((prev) => prev.filter((m) => m.id !== materialId));
    } catch (err) {
      alert(err.message || "Failed to delete material");
    } finally {
      setDeletingId(null);
    }
  };

  const formatSize = (bytes) => {
    if (!bytes) return "";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="materials-tab">
      {isOwner && (
        <form className="material-upload-form" onSubmit={handleUpload}>
          <div className="upload-fields">
            <input
              className="material-title-input"
              type="text"
              placeholder="Material title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={uploading}
            />
            <label className="file-pick-btn">
              {file ? file.name : "📎 Choose PDF"}
              <input ref={fileInputRef} type="file" accept="application/pdf" onChange={handleFileChange} disabled={uploading} style={{ display: "none" }} />
            </label>
            <button className="upload-btn" type="submit" disabled={uploading}>
              {uploading ? "Uploading..." : "⬆ Upload"}
            </button>
          </div>
          {uploadError && <p className="material-error">{uploadError}</p>}
        </form>
      )}

      {loading ? (
        <p className="material-status">Loading materials...</p>
      ) : error ? (
        <p className="material-error">{error}</p>
      ) : materials.length === 0 ? (
        <div className="empty-state">
          <p>No study materials yet</p>
          {isOwner && <p style={{ fontSize: "0.85rem", color: "var(--muted)", marginTop: 0 }}>Upload a PDF above to get started.</p>}
        </div>
      ) : (
        <div className="materials-list">
          {materials.map((m) => (
            <div key={m.id} className="material-item">
              <div className="material-icon">📄</div>
              <div className="material-info">
                <div className="material-title">{m.title}</div>
                <div className="material-meta">
                  {m.originalName}{m.fileSize ? ` · ${formatSize(m.fileSize)}` : ""} · {new Date(m.uploadedAt).toLocaleDateString()}
                </div>
              </div>
              <div className="material-actions">
                <a className="material-download-btn" href={m.fileUrl} target="_blank" rel="noopener noreferrer" download={m.originalName}>
                  ⬇ Download
                </a>
                {isOwner && (
                  <button className="material-delete-btn" onClick={() => handleDelete(m.id)} disabled={deletingId === m.id}>
                    {deletingId === m.id ? "..." : "🗑"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────── */
function ClassroomDetail() {
  const { id }       = useParams();
  const navigate     = useNavigate();
  const { user }     = useAuth();
  const { classrooms, getClassroomById, getClassroomStudents, isTeacher, isEnrolled, leaveClassroom, deleteClassroom } = useClassrooms();

  const [activeTab,         setActiveTab]         = useState("assignments");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [freshClassroom,    setFreshClassroom]    = useState(null);
  const [freshAssignments,  setFreshAssignments]  = useState(null);
  const [dataLoading,       setDataLoading]       = useState(true);

  useEffect(() => {
    let cancelled = false;
    setFreshClassroom(null);
    setFreshAssignments(null);
    setDataLoading(true);

    const fetchData = async () => {
      try {
        const [classroomData, assignmentData] = await Promise.all([
          apiService.classrooms.getById(id),
          apiService.assignments.getByClassroom(id),
        ]);
        if (cancelled) return;
        if (classroomData) setFreshClassroom(classroomData);
        setFreshAssignments(Array.isArray(assignmentData) ? assignmentData : []);
      } catch {
        if (!cancelled) setFreshAssignments([]);
      } finally {
        if (!cancelled) setDataLoading(false);
      }
    };

    fetchData();
    return () => { cancelled = true; };
  }, [id]);

  const classroom            = freshClassroom || (classrooms?.length > 0 ? getClassroomById(id) : null);
  const students             = freshClassroom?.students || getClassroomStudents(id);
  const classroomAssignments = freshAssignments ?? [];

  if (dataLoading) {
    return (
      <div className="classroom-detail-page-wrapper">
        <Navbar />
        <div className="classroom-detail-container" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
          <p style={{ color: "var(--muted)" }}>Loading classroom...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!classroom) {
    return (
      <div className="classroom-detail-page-wrapper">
        <Navbar />
        <div className="classroom-detail-container">
          <p style={{ color: "var(--muted)", textAlign: "center", marginTop: "4rem" }}>Classroom not found.</p>
        </div>
        <Footer />
      </div>
    );
  }

  const isOwner   = isTeacher() && classroom.teacherId === user?.email;
  const isStudent = !isTeacher() && isEnrolled(id);

  const handleLeave = () => {
    if (window.confirm("Are you sure you want to leave this classroom?")) {
      leaveClassroom(id);
      navigate("/classrooms");
    }
  };

  const handleDelete = () => {
    deleteClassroom(id);
    navigate("/classrooms");
  };

  return (
    <div className="classroom-detail-page-wrapper">
      <Navbar />
      <div className="classroom-detail-container">
        <button className="back-button" onClick={() => navigate("/classrooms")}>← Back to Classrooms</button>

        <div className="classroom-detail-header">
          <div className="header-left">
            <h1>{classroom.name}</h1>
            <div className="classroom-meta">
              <span>📚 {classroom.subject}</span>
              <span>👨‍🏫 {classroom.teacherName}</span>
              <span>👥 {students.length} students</span>
            </div>
            {classroom.description && <p className="classroom-desc">{classroom.description}</p>}
          </div>
          <div className="header-right">
            <div className="classroom-code-display">
              <span className="code-label">Class Code</span>
              <span className="code-value">{classroom.code}</span>
            </div>
            {isOwner   && <button className="delete-btn" onClick={() => setShowDeleteConfirm(true)}>🗑️ Delete Classroom</button>}
            {isStudent && <button className="leave-btn"  onClick={handleLeave}>🚪 Leave Classroom</button>}
          </div>
        </div>

        <div className="classroom-tabs">
          <button className={`tab ${activeTab === "assignments" ? "active" : ""}`} onClick={() => setActiveTab("assignments")}>
            📝 Assignments ({classroomAssignments.length})
          </button>
          <button className={`tab ${activeTab === "materials" ? "active" : ""}`} onClick={() => setActiveTab("materials")}>
            📚 Study Materials
          </button>
          <button className={`tab ${activeTab === "students" ? "active" : ""}`} onClick={() => setActiveTab("students")}>
            👥 Students ({students.length})
          </button>
        </div>

        <div className="tab-content">
          {activeTab === "assignments" && (
            <AssignmentsTab assignments={classroomAssignments} isOwner={isOwner} onNavigate={navigate} classroomId={id} />
          )}
          {activeTab === "materials" && (
            <StudyMaterialsTab classroomId={id} isOwner={isOwner} />
          )}
          {activeTab === "students" && (
            <StudentsTab students={students} isOwner={isOwner} />
          )}
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="modal-overlay" onClick={() => setShowDeleteConfirm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Delete Classroom?</h2>
            <p>This will permanently delete <strong style={{ color: "var(--text)" }}>{classroom.name}</strong> and remove all enrolled students. This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
              <button className="delete-confirm-btn" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default ClassroomDetail;
