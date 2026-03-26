import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import apiService from '../api/apiService';

const ClassroomContext = createContext();
const isDev = import.meta.env.DEV;

export const useClassrooms = () => {
  const context = useContext(ClassroomContext);
  if (!context) {
    throw new Error('useClassrooms must be used within a ClassroomProvider');
  }
  return context;
};

// Generate random classroom code
const generateClassroomCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

export const ClassroomProvider = ({ children }) => {
  const { user, isLoading: authLoading, csrfReady } = useAuth();
  const [classrooms, setClassrooms] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Wait for auth and CSRF to complete before loading classrooms
    if (authLoading || !csrfReady) return;
    
    if (user && classrooms.length === 0) {
      loadClassrooms();
    } else if (!user) {
      // No user, clear ALL state and stop loading
      setClassrooms([]);
      setEnrollments([]);
      setIsLoading(false);
    }
  }, [user, authLoading, csrfReady]);

  const loadClassrooms = async () => {
    try {
      const apiData = await apiService.classrooms.getAll();
      if (apiData && Array.isArray(apiData)) {
        setClassrooms(apiData);
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      if (isDev) console.warn('Classrooms API failed, using localStorage:', error.message);
      const savedClassrooms = localStorage.getItem('classrooms');
      if (savedClassrooms) setClassrooms(JSON.parse(savedClassrooms));
    }
    const savedEnrollments = localStorage.getItem('enrollments');
    if (savedEnrollments) setEnrollments(JSON.parse(savedEnrollments));
    setIsLoading(false);
  };

  const isTeacher = useCallback(() => {
    return user?.role === 'teacher' || user?.role === 'admin';
  }, [user?.role]);

  const createClassroom = useCallback(async (classroomData) => {
    try {
      const createdClassroom = await apiService.classrooms.create(classroomData);
      if (createdClassroom) {
        await loadClassrooms();
        return createdClassroom;
      } else {
        throw new Error('Invalid API response');
      }
    } catch (error) {
      if (isDev) console.warn('Create classroom fallback:', error.message);
      
      // Fallback to existing localStorage logic
      const teacherEmail = user?.email || `guest-teacher-${Date.now()}@demo.com`;
      const teacherName = user?.name || 'Guest Teacher';

      const code = generateClassroomCode();
      const newClassroom = {
        id: `class-${Date.now()}`,
        code,
        name: classroomData.name,
        description: classroomData.description,
        subject: classroomData.subject,
        teacherId: teacherEmail,
        teacherName: teacherName,
        createdAt: new Date().toISOString(),
      };
      
      const updated = [...classrooms, newClassroom];
      setClassrooms(updated);
      localStorage.setItem('classrooms', JSON.stringify(updated));
      return newClassroom;
    }
  }, [classrooms, user]);

  const joinClassroom = useCallback(async (code) => {
    try {
      const joinResult = await apiService.classrooms.join(code);
      if (joinResult && joinResult.classroom) {
        await loadClassrooms();
        return joinResult.classroom;
      } else {
        throw new Error('Invalid API response');
      }
    } catch (error) {
      if (isDev) console.warn('Join classroom fallback:', error.message);
      
      // Fallback to existing localStorage logic
      const studentEmail = user?.email || `guest-student-${Date.now()}@demo.com`;
      const studentName = user?.name || 'Guest Student';

      const classroom = classrooms.find(c => c.code === code.toUpperCase());
      if (!classroom) {
        throw new Error('Invalid classroom code');
      }

      // Check if already enrolled
      const alreadyEnrolled = enrollments.some(
        e => e.classroomId === classroom.id && e.studentEmail === studentEmail
      );

      if (alreadyEnrolled) {
        throw new Error('You are already enrolled in this classroom');
      }

      const newEnrollment = {
        id: `enroll-${Date.now()}`,
        classroomId: classroom.id,
        studentEmail: studentEmail,
        studentName: studentName,
        enrolledAt: new Date().toISOString()
      };

      const updated = [...enrollments, newEnrollment];
      setEnrollments(updated);
      localStorage.setItem('enrollments', JSON.stringify(updated));
      return classroom;
    }
  }, [classrooms, enrollments, user]);

  const leaveClassroom = useCallback(async (classroomId) => {
    try {
      await apiService.classrooms.leave(classroomId);
      await loadClassrooms();
      if (!user) return;
      const updatedEnrollments = enrollments.filter(
        e => !(e.classroomId === classroomId && e.studentEmail === user.email)
      );
      setEnrollments(updatedEnrollments);
      localStorage.setItem('enrollments', JSON.stringify(updatedEnrollments));
    } catch (error) {
      if (isDev) console.warn('Leave classroom fallback:', error.message);
      
      // Fallback to existing localStorage logic
      if (!user) return;

      const updated = enrollments.filter(
        e => !(e.classroomId === classroomId && e.studentEmail === user.email)
      );
      setEnrollments(updated);
      localStorage.setItem('enrollments', JSON.stringify(updated));
    }
  }, [classrooms, enrollments, user]);

  const deleteClassroom = useCallback(async (classroomId) => {
    try {
      await apiService.classrooms.delete(classroomId);
      await loadClassrooms();
      const savedEnrollments = localStorage.getItem('enrollments');
      if (savedEnrollments) {
        const filtered = JSON.parse(savedEnrollments).filter(e => e.classroomId !== classroomId);
        setEnrollments(filtered);
        localStorage.setItem('enrollments', JSON.stringify(filtered));
      }
    } catch (error) {
      if (isDev) console.warn('Delete classroom fallback:', error.message);
      
      // Fallback to existing localStorage logic
      if (!user || !isTeacher()) {
        throw new Error('Only teachers can delete classrooms');
      }

      // Remove classroom
      const updatedClassrooms = classrooms.filter(c => c.id !== classroomId);
      setClassrooms(updatedClassrooms);
      localStorage.setItem('classrooms', JSON.stringify(updatedClassrooms));

      // Remove all enrollments for this classroom
      const updatedEnrollments = enrollments.filter(e => e.classroomId !== classroomId);
      setEnrollments(updatedEnrollments);
      localStorage.setItem('enrollments', JSON.stringify(updatedEnrollments));
    }
  }, [classrooms, enrollments, user, isTeacher]);

  const getTeacherClassrooms = useCallback(() => {
    if (!user) return [];
    // Backend returns teacherId as teacher's email
    return classrooms.filter(c => 
      c.teacherId === user.email || c.teacherId === user.id?.toString()
    );
  }, [classrooms, user]);

  const getStudentClassrooms = useCallback(() => {
    if (!user) return [];
    
    // For backend-integrated users, filter classrooms by backend enrollment
    // Backend getClassrooms() already returns only enrolled classrooms for students
    return classrooms;
  }, [classrooms, user]);

  const getClassroomStudents = useCallback((classroomId) => {
    // Prefer students embedded in the classroom object (from API response)
    const classroom = classrooms.find(c => c.id?.toString() === classroomId?.toString());
    if (classroom?.students && classroom.students.length > 0) {
      return classroom.students;
    }
    // Fallback to localStorage enrollments
    return enrollments.filter(e => e.classroomId === classroomId);
  }, [classrooms, enrollments]);

  const getClassroomById = useCallback((classroomId) => {
    if (!classroomId) return null;
    return classrooms.find(c => c.id?.toString() === classroomId?.toString());
  }, [classrooms]);

  const isEnrolled = useCallback((classroomId) => {
    if (!user) return false;
    // For API-based users, the backend already returns only enrolled classrooms for students
    // so we check the classrooms list directly
    const inClassrooms = classrooms.some(c => c.id?.toString() === classroomId?.toString());
    if (inClassrooms && user.role === 'student') return true;
    // Fallback: check localStorage enrollments (used when API is unavailable)
    return enrollments.some(
      e => e.classroomId === classroomId && e.studentEmail === user.email
    );
  }, [classrooms, enrollments, user]);

  return (
    <ClassroomContext.Provider value={{
      classrooms,
      enrollments,
      isLoading,
      isTeacher,
      createClassroom,
      joinClassroom,
      leaveClassroom,
      deleteClassroom,
      getTeacherClassrooms,
      getStudentClassrooms,
      getClassroomStudents,
      getClassroomById,
      isEnrolled,
    }}>
      {children}
    </ClassroomContext.Provider>
  );
};
