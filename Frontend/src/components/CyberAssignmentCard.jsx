import { useState, useRef } from 'react';
import './CyberAssignmentCard.css';

function CyberAssignmentCard({ assignment, onSubmit, onUnsubmit, studentSubmission, isTeacher }) {
  const [submissionText, setSubmissionText] = useState('');
  const [submissionLink, setSubmissionLink] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleTextareaChange = (e) => {
    const textarea = e.target;
    setSubmissionText(textarea.value);
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  };

  const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const processFiles = async (files) => {
    const allowed = assignment.allowedFileTypes || ['.pdf', '.doc', '.docx', '.txt'];
    const processed = [];

    for (const file of files) {
      const ext = '.' + file.name.split('.').pop().toLowerCase();
      if (!allowed.includes(ext)) {
        alert(`File type ${ext} is not allowed. Allowed: ${allowed.join(', ')}`);
        continue;
      }
      if (file.size > 10 * 1024 * 1024) {
        alert(`${file.name} exceeds 10MB limit.`);
        continue;
      }
      const dataUrl = await readFileAsDataURL(file);
      processed.push({ name: file.name, url: dataUrl, size: file.size, type: file.type });
    }

    setUploadedFiles(prev => [...prev, ...processed]);
  };

  const handleFileChange = (e) => {
    processFiles(Array.from(e.target.files));
    e.target.value = '';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    processFiles(Array.from(e.dataTransfer.files));
  };

  const removeFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleAssignmentSubmit = (e) => {
    e.preventDefault();
    if (!submissionText && !submissionLink && uploadedFiles.length === 0) {
      alert('Please provide a solution — text, link, or file.');
      return;
    }
    if (onSubmit) {
      onSubmit({ text: submissionText, link: submissionLink, files: uploadedFiles });
    }
  };

  return (
    <div className="cyber-card-container">
      <div className="cyber-card">
        {/* Assignment Details */}
        <div className="cyber-card-face cyber-card-front">
          <div className="cyber-grid-bg"></div>
          <div className="cyber-card-content">
            {/* Header */}
            <div className="cyber-header">
              <div className="cyber-title-section">
                <h1 className="cyber-title">{assignment.title}</h1>
                <span className="cyber-tag">{assignment.category}</span>
              </div>
            </div>

            {/* Info Grid */}
            <div className="cyber-info-grid">
              <div className="cyber-info-item">
                <span className="info-icon">🏆</span>
                <div className="info-content">
                  <span className="info-label">Points</span>
                  <span className="info-value">{assignment.points}</span>
                </div>
              </div>
              <div className="cyber-info-item">
                <span className="info-icon">⏰</span>
                <div className="info-content">
                  <span className="info-label">Deadline</span>
                  <span className="info-value">{new Date(assignment.deadline).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="cyber-info-item">
                <span className="info-icon">👤</span>
                <div className="info-content">
                  <span className="info-label">Created By</span>
                  <span className="info-value">{assignment.createdBy}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="cyber-description">
              <h3 className="section-title">Mission Brief</h3>
              <p className="description-text">{assignment.description}</p>
            </div>

            {/* Submit Section */}
            {!isTeacher && !studentSubmission && (
              <div className="cyber-submit-section">
                <h3 className="section-title">Submit Your Work</h3>
                <form onSubmit={handleAssignmentSubmit}>
                  <div className="cyber-form-group">
                    <label className="cyber-label">Your Solution</label>
                    <textarea
                      className="cyber-textarea"
                      value={submissionText}
                      onChange={handleTextareaChange}
                      placeholder="Describe your solution or provide your answer..."
                      rows="4"
                    />
                  </div>
                  <div className="cyber-form-group">
                    <label className="cyber-label">Link (Optional)</label>
                    <input
                      type="url"
                      className="cyber-input"
                      value={submissionLink}
                      onChange={(e) => setSubmissionLink(e.target.value)}
                      placeholder="https://example.com/your-work"
                    />
                  </div>

                  {/* File Upload */}
                  <div className="cyber-form-group">
                    <label className="cyber-label">
                      Upload Files
                      <span className="cyber-label-hint">
                        {(assignment.allowedFileTypes || ['.pdf','.doc','.docx','.txt']).join(', ')} · max 10MB each
                      </span>
                    </label>
                    <div
                      className={`cyber-dropzone ${isDragging ? 'dragging' : ''}`}
                      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept={(assignment.allowedFileTypes || ['.pdf','.doc','.docx','.txt']).join(',')}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                      />
                      <span className="dropzone-icon">📁</span>
                      <span className="dropzone-text">
                        {isDragging ? 'Drop files here' : 'Click or drag files here'}
                      </span>
                    </div>

                    {uploadedFiles.length > 0 && (
                      <div className="cyber-file-list">
                        {uploadedFiles.map((file, i) => (
                          <div key={i} className="cyber-file-item">
                            <span className="file-icon">
                              {file.name.endsWith('.pdf') ? '📄' : '📝'}
                            </span>
                            <span className="file-name">{file.name}</span>
                            <span className="file-size">{formatSize(file.size)}</span>
                            <button
                              type="button"
                              className="file-remove"
                              onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                            >✕</button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <button type="submit" className="cyber-submit-btn">
                    <span className="btn-glow"></span>
                    <span className="btn-text">Deploy Solution</span>
                  </button>
                </form>
              </div>
            )}

            {/* Submission Status */}
            {!isTeacher && studentSubmission && (
              <div className="cyber-status-section">
                <div className="status-actions-row">
                  <div className="status-badge">✓ Submitted</div>

                  {studentSubmission.status === 'graded' ? (
                    <div className="grade-display">
                      <span className="grade-label">Grade:</span>
                      <span className="grade-value">{studentSubmission.grade}/{assignment.points}</span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="cyber-unsubmit-btn"
                      onClick={() => onUnsubmit && onUnsubmit(studentSubmission.id)}
                    >
                      Unsubmit
                    </button>
                  )}
                </div>

                {/* Submitted content */}
                <div className="submission-content">
                  <p className="submission-content-title">Your Submission</p>

                  {(studentSubmission.text || studentSubmission.textAnswer) && (
                    <div className="submission-field">
                      <span className="submission-field-label">Solution</span>
                      <p className="submission-field-value">
                        {studentSubmission.text || studentSubmission.textAnswer}
                      </p>
                    </div>
                  )}

                  {(studentSubmission.link || studentSubmission.linkAnswer) && (
                    <div className="submission-field">
                      <span className="submission-field-label">Link</span>
                      <a
                        href={studentSubmission.link || studentSubmission.linkAnswer}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="submission-link"
                      >
                        {studentSubmission.link || studentSubmission.linkAnswer}
                      </a>
                    </div>
                  )}

                  {studentSubmission.files?.length > 0 && (
                    <div className="submission-field">
                      <span className="submission-field-label">Files</span>
                      <div className="cyber-file-list">
                        {studentSubmission.files.map((f, i) => (
                          <div key={i} className="cyber-file-item">
                            <span className="file-icon">{f.name?.endsWith('.pdf') ? '📄' : '📝'}</span>
                            <span className="file-name">{f.name}</span>
                            {f.size && <span className="file-size">{formatSize(f.size)}</span>}
                            {f.url && (
                              <a
                                href={f.url}
                                download={f.name}
                                className="file-download-link"
                                onClick={(e) => e.stopPropagation()}
                              >
                                ↓
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {!studentSubmission.text && !studentSubmission.textAnswer &&
                   !studentSubmission.link && !studentSubmission.linkAnswer &&
                   (!studentSubmission.files || studentSubmission.files.length === 0) && (
                    <p className="submission-empty">No submission content available.</p>
                  )}
                </div>

                {studentSubmission.feedback && (
                  <div className="submission-feedback">
                    <span className="submission-field-label">Feedback</span>
                    <p className="submission-field-value">{studentSubmission.feedback}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CyberAssignmentCard;
