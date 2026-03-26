import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import apiService from '../api/apiService';

const AssignmentContext = createContext();
const isDev = import.meta.env.DEV;

export const useAssignments = () => {
  const context = useContext(AssignmentContext);
  if (!context) {
    throw new Error('useAssignments must be used within an AssignmentProvider');
  }
  return context;
};

const initialAssignments = [
  {
    id: 'assign-1',
    title: 'Network Security Analysis',
    description: 'Analyze the provided network traffic and identify potential security vulnerabilities.',
    category: 'Network Security',
    points: 100,
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
    createdBy: 'teacher@cyberlearn.com',
    createdAt: new Date().toISOString(),
    attachments: [],
    allowedFileTypes: ['.pdf', '.doc', '.docx', '.txt'],
    allowLinks: true
  }
];

export const AssignmentProvider = ({ children }) => {
  const { user, isLoading: authLoading, csrfReady } = useAuth();
  const [assignments, setAssignments] = useState([]);
  // Initialize submissions from localStorage immediately to avoid flash,
  // but always overwrite with fresh API data once loaded
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Get or create persistent guest email for testing
  const [guestEmail] = useState(() => {
    const saved = localStorage.getItem('guestEmail');
    if (saved) return saved;
    const newGuestEmail = `guest-${Date.now()}@demo.com`;
    localStorage.setItem('guestEmail', newGuestEmail);
    return newGuestEmail;
  });

  const loadAssignments = useCallback(async () => {
    // Don't load if auth is still loading or CSRF not ready
    if (authLoading || !csrfReady) return;
    
    try {
      const apiData = await apiService.assignments.getAll();
      if (apiData && Array.isArray(apiData)) {
        setAssignments(apiData);
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      if (isDev) console.warn('Assignments API failed, using localStorage:', error.message);
      const savedAssignments = localStorage.getItem('assignments');
      if (savedAssignments) {
        setAssignments(JSON.parse(savedAssignments));
      } else {
        setAssignments(initialAssignments);
        localStorage.setItem('assignments', JSON.stringify(initialAssignments));
      }
    }

    try {
      if (user) {
        const userId = user.id || user._id;
        const apiSubmissions = await apiService.submissions.getByStudent(userId);
        if (apiSubmissions && Array.isArray(apiSubmissions)) {
          setSubmissions(apiSubmissions);
          localStorage.setItem('submissions', JSON.stringify(apiSubmissions));
        } else {
          throw new Error('Invalid submissions response');
        }
      } else {
        throw new Error('No user');
      }
    } catch (submissionError) {
      if (isDev) console.warn('Submissions API failed:', submissionError.message);
      setSubmissions([]);
    }
    
    setIsLoading(false);
  }, [user, authLoading, csrfReady]);

  useEffect(() => {
    // Wait for auth and CSRF to complete before loading assignments
    if (!authLoading && csrfReady) {
      if (user) {
        loadAssignments();
      } else {
        // No user, clear ALL state
        setAssignments([]);
        setSubmissions([]);
        setIsLoading(false);
      }
    }
  }, [loadAssignments, authLoading, csrfReady, user]);

  const getCurrentUserEmail = useCallback(() => {
    return user?.email || guestEmail;
  }, [user?.email, guestEmail]);

  const getCurrentUserName = useCallback(() => {
    return user?.name || 'Guest User';
  }, [user?.name]);

  const isTeacher = () => {
    return user?.role === 'teacher' || user?.role === 'admin';
  };

  const createAssignment = async (assignmentData, classroomId = null) => {
    try {
      const apiData = { ...assignmentData, classroomId };
      delete apiData.classroom;
      const createdAssignment = await apiService.assignments.create(apiData);
      if (createdAssignment) {
        setAssignments(prev => [...prev, createdAssignment]);
        return createdAssignment;
      } else {
        throw new Error('Invalid API response');
      }
    } catch (error) {
      if (isDev) console.warn('Create assignment fallback:', error.message);
      
      // Fallback to existing localStorage logic
      const newAssignment = {
        ...assignmentData,
        id: `assign-${Date.now()}`,
        createdBy: user.email,
        createdAt: new Date().toISOString(),
        classroomId: classroomId // null for general assignments, classroomId for classroom-specific
      };
      
      const updated = [...assignments, newAssignment];
      setAssignments(updated);
      localStorage.setItem('assignments', JSON.stringify(updated));
      return newAssignment;
    }
  };

  const updateAssignment = async (id, updates) => {
    try {
      const updatedAssignment = await apiService.assignments.update(id, updates);
      if (updatedAssignment) {
        setAssignments(prev => prev.map(a => a.id === id ? updatedAssignment : a));
      } else {
        throw new Error('Invalid API response');
      }
    } catch (error) {
      if (isDev) console.warn('Update assignment fallback:', error.message);
      
      // Fallback to existing localStorage logic
      const updated = assignments.map(a => 
        a.id === id ? { ...a, ...updates } : a
      );
      setAssignments(updated);
      localStorage.setItem('assignments', JSON.stringify(updated));
    }
  };

  const deleteAssignment = async (id) => {
    try {
      await apiService.assignments.delete(id);
      setAssignments(prev => prev.filter(a => a.id !== id));
    } catch (error) {
      if (isDev) console.warn('Delete assignment fallback:', error.message);
      
      // Fallback to existing localStorage logic
      const updated = assignments.filter(a => a.id !== id);
      setAssignments(updated);
      localStorage.setItem('assignments', JSON.stringify(updated));
    }
  };

  const submitAssignment = async (assignmentId, submissionData) => {
    const studentEmail = getCurrentUserEmail();
    const studentName = getCurrentUserName();

    try {
      const apiData = {
        assignment: assignmentId,
        studentEmail,
        studentName,
        textAnswer: submissionData.text || submissionData.textAnswer,
        linkAnswer: submissionData.link || submissionData.linkAnswer,
        ...submissionData
      };
      const createdSubmission = await apiService.submissions.create(apiData);
      if (createdSubmission) {
        const updated = [...submissions, createdSubmission];
        setSubmissions(updated);
        localStorage.setItem('submissions', JSON.stringify(updated));
        return createdSubmission;
      } else {
        throw new Error('Invalid API response');
      }
    } catch (error) {
      if (isDev) console.warn('Submit assignment fallback:', error.message);
      
      // Fallback to existing localStorage logic
      const newSubmission = {
        id: `sub-${Date.now()}`,
        assignmentId,
        studentEmail,
        studentName,
        submittedAt: new Date().toISOString(),
        ...submissionData,
        status: 'submitted',
        grade: null,
        feedback: null
      };
      
      const updated = [...submissions, newSubmission];
      setSubmissions(updated);
      localStorage.setItem('submissions', JSON.stringify(updated));
      return newSubmission;
    }
  };

  const unsubmitAssignment = async (submissionId) => {
    try {
      await apiService.submissions.delete(submissionId);
      const updated = submissions.filter(s => s.id?.toString() !== submissionId?.toString());
      setSubmissions(updated);
      localStorage.setItem('submissions', JSON.stringify(updated));
    } catch (error) {
      // Fallback: remove from local state
      const updated = submissions.filter(s => s.id?.toString() !== submissionId?.toString());
      setSubmissions(updated);
      localStorage.setItem('submissions', JSON.stringify(updated));
      throw error; // re-throw so UI can show the error message (e.g. "already graded")
    }
  };

  const gradeSubmission = async (submissionId, grade, feedback) => {
    try {
      const gradedSubmission = await apiService.submissions.grade(submissionId, { grade, feedback });
      if (gradedSubmission) {
        const updated = submissions.map(s => s.id === submissionId ? gradedSubmission : s);
        setSubmissions(updated);
        localStorage.setItem('submissions', JSON.stringify(updated));
      } else {
        throw new Error('Invalid API response');
      }
    } catch (error) {
      if (isDev) console.warn('Grade submission fallback:', error.message);
      
      // Fallback to existing localStorage logic
      const updated = submissions.map(s => 
        s.id === submissionId 
          ? { ...s, grade, feedback, status: 'graded', gradedAt: new Date().toISOString() }
          : s
      );
      setSubmissions(updated);
      localStorage.setItem('submissions', JSON.stringify(updated));
    }
  };

  const getSubmissionsForAssignment = useCallback((assignmentId) => {
    return submissions.filter(s => 
      String(s.assignmentId) === String(assignmentId) || 
      String(s.assignment) === String(assignmentId)
    );
  }, [submissions]);

  const getSubmissionsForClassroom = useCallback((classroomId, enrollments) => {
    // Get all assignments for this classroom
    const classroomAssignmentIds = assignments
      .filter(a => a.classroomId === classroomId)
      .map(a => a.id);
    
    // Get student emails enrolled in this classroom
    const enrolledStudentEmails = enrollments
      .filter(e => e.classroomId === classroomId)
      .map(e => e.studentEmail);
    
    // Return submissions for classroom assignments from enrolled students
    return submissions.filter(s => 
      classroomAssignmentIds.includes(s.assignmentId) &&
      enrolledStudentEmails.includes(s.studentEmail)
    );
  }, [submissions, assignments]);

  const getStudentSubmission = useCallback((assignmentId) => {
    const studentEmail = getCurrentUserEmail();
    return submissions.find(
      s => (String(s.assignmentId) === String(assignmentId) || 
            String(s.assignment) === String(assignmentId)) && 
           s.studentEmail === studentEmail
    );
  }, [submissions, getCurrentUserEmail]);

  const getStudentStats = useCallback((visibleAssignments) => {
    const studentEmail = getCurrentUserEmail();
    const studentSubmissions = submissions.filter(s => s.studentEmail === studentEmail);
    const submittedIds = new Set(studentSubmissions.map(s => s.assignmentId?.toString()));

    // Use visibleAssignments (already filtered to student's classrooms) if provided
    const base = visibleAssignments || assignments;
    const pending = base.filter(a => !submittedIds.has(a.id?.toString())).length;
    const graded = studentSubmissions.filter(s => s.status === 'graded');
    const totalPoints = graded.reduce((sum, s) => sum + (s.grade || 0), 0);

    return {
      submitted: studentSubmissions.length,
      graded: graded.length,
      pending,
      totalPoints
    };
  }, [submissions, assignments, getCurrentUserEmail]);

  const getAssignmentsByClassroom = useCallback((classroomId) => {
    return assignments.filter(a => String(a.classroomId) === String(classroomId));
  }, [assignments]);

  const getGeneralAssignments = useCallback(() => {
    return assignments.filter(a => !a.classroomId);
  }, [assignments]);

  return (
    <AssignmentContext.Provider value={{
      assignments,
      submissions,
      isLoading,
      isTeacher,
      createAssignment,
      updateAssignment,
      deleteAssignment,
      submitAssignment,
      unsubmitAssignment,
      gradeSubmission,
      getSubmissionsForAssignment,
      getSubmissionsForClassroom,
      getStudentSubmission,
      getStudentStats,
      getAssignmentsByClassroom,
      getGeneralAssignments,
      refreshAssignments: loadAssignments
    }}>
      {children}
    </AssignmentContext.Provider>
  );
};
