# API Migration Examples

## Overview
This document shows how to migrate from localStorage-based contexts to API-based contexts using the new centralized API layer.

## Migration Pattern

### Before: localStorage-based Context
```javascript
// OLD: AssignmentContext.jsx
const [assignments, setAssignments] = useState([]);

useEffect(() => {
  const savedAssignments = localStorage.getItem('assignments');
  if (savedAssignments) {
    setAssignments(JSON.parse(savedAssignments));
  }
}, []);

const createAssignment = (assignmentData) => {
  const newAssignment = {
    ...assignmentData,
    id: `assign-${Date.now()}`,
    createdBy: user.email,
    createdAt: new Date().toISOString()
  };
  
  const updated = [...assignments, newAssignment];
  setAssignments(updated);
  localStorage.setItem('assignments', JSON.stringify(updated));
  return newAssignment;
};
```

### After: API-based Context
```javascript
// NEW: AssignmentContext.jsx
import apiService from '../api/apiService';

const [assignments, setAssignments] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

// Load assignments from API
useEffect(() => {
  const loadAssignments = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.assignments.getAll();
      setAssignments(data);
    } catch (error) {
      setError(error.message);
      console.error('Failed to load assignments:', error);
    } finally {
      setLoading(false);
    }
  };

  loadAssignments();
}, []);

const createAssignment = async (assignmentData) => {
  try {
    const newAssignment = await apiService.assignments.create(assignmentData);
    setAssignments(prev => [...prev, newAssignment]);
    return newAssignment;
  } catch (error) {
    setError(error.message);
    throw error;
  }
};
```

## Complete Context Migration Examples

### 1. Assignment Context Migration

```javascript
// NEW: AssignmentContext.jsx
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import apiService from '../api/apiService';

const AssignmentContext = createContext();

export const useAssignments = () => {
  const context = useContext(AssignmentContext);
  if (!context) {
    throw new Error('useAssignments must be used within an AssignmentProvider');
  }
  return context;
};

export const AssignmentProvider = ({ children }) => {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load assignments from API
  useEffect(() => {
    const loadAssignments = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await apiService.assignments.getAll();
        setAssignments(data);
      } catch (error) {
        setError(error.message);
        console.error('Failed to load assignments:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadAssignments();
    }
  }, [user]);

  const createAssignment = async (assignmentData, classroomId = null) => {
    try {
      const data = {
        ...assignmentData,
        classroomId
      };
      const newAssignment = await apiService.assignments.create(data);
      setAssignments(prev => [...prev, newAssignment]);
      return newAssignment;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const updateAssignment = async (id, updates) => {
    try {
      const updatedAssignment = await apiService.assignments.update(id, updates);
      setAssignments(prev => 
        prev.map(a => a.id === id ? updatedAssignment : a)
      );
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const deleteAssignment = async (id) => {
    try {
      await apiService.assignments.delete(id);
      setAssignments(prev => prev.filter(a => a.id !== id));
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const submitAssignment = async (assignmentId, submissionData) => {
    try {
      const data = {
        assignmentId,
        ...submissionData
      };
      const newSubmission = await apiService.submissions.create(data);
      setSubmissions(prev => [...prev, newSubmission]);
      return newSubmission;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const gradeSubmission = async (submissionId, grade, feedback) => {
    try {
      const updatedSubmission = await apiService.submissions.grade(submissionId, {
        grade,
        feedback
      });
      setSubmissions(prev =>
        prev.map(s => s.id === submissionId ? updatedSubmission : s)
      );
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const getSubmissionsForAssignment = useCallback(async (assignmentId) => {
    try {
      const data = await apiService.submissions.getByAssignment(assignmentId);
      return data;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }, []);

  return (
    <AssignmentContext.Provider value={{
      assignments,
      submissions,
      loading,
      error,
      createAssignment,
      updateAssignment,
      deleteAssignment,
      submitAssignment,
      gradeSubmission,
      getSubmissionsForAssignment
    }}>
      {children}
    </AssignmentContext.Provider>
  );
};
```

### 2. Classroom Context Migration

```javascript
// NEW: ClassroomContext.jsx
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import apiService from '../api/apiService';

const ClassroomContext = createContext();

export const useClassrooms = () => {
  const context = useContext(ClassroomContext);
  if (!context) {
    throw new Error('useClassrooms must be used within a ClassroomProvider');
  }
  return context;
};

export const ClassroomProvider = ({ children }) => {
  const { user } = useAuth();
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load classrooms from API
  useEffect(() => {
    const loadClassrooms = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await apiService.classrooms.getAll();
        setClassrooms(data);
      } catch (error) {
        setError(error.message);
        console.error('Failed to load classrooms:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadClassrooms();
    }
  }, [user]);

  const createClassroom = async (classroomData) => {
    try {
      const newClassroom = await apiService.classrooms.create(classroomData);
      setClassrooms(prev => [...prev, newClassroom]);
      return newClassroom;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const joinClassroom = async (code) => {
    try {
      const result = await apiService.classrooms.join(code);
      // Reload classrooms to get updated list
      const data = await apiService.classrooms.getAll();
      setClassrooms(data);
      return result.classroom;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const leaveClassroom = async (classroomId) => {
    try {
      await apiService.classrooms.leave(classroomId);
      // Reload classrooms to get updated list
      const data = await apiService.classrooms.getAll();
      setClassrooms(data);
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const deleteClassroom = async (classroomId) => {
    try {
      await apiService.classrooms.delete(classroomId);
      setClassrooms(prev => prev.filter(c => c.id !== classroomId));
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  return (
    <ClassroomContext.Provider value={{
      classrooms,
      loading,
      error,
      createClassroom,
      joinClassroom,
      leaveClassroom,
      deleteClassroom
    }}>
      {children}
    </ClassroomContext.Provider>
  );
};
```

### 3. Auth Context Migration

```javascript
// NEW: AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import apiService from '../api/apiService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setIsLoading(true);
        
        // Check for existing token
        const token = localStorage.getItem('authToken') || 
                      localStorage.getItem('googleToken');
        
        if (token) {
          try {
            // Verify token with backend
            const userData = await apiService.auth.verifyToken();
            setUser(userData);
            localStorage.setItem('isLoggedIn', 'true');
          } catch (error) {
            // Token invalid, clear it
            localStorage.removeItem('authToken');
            localStorage.removeItem('googleToken');
            localStorage.removeItem('user');
            localStorage.removeItem('isLoggedIn');
          }
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials) => {
    try {
      setError(null);
      const response = await apiService.auth.login(credentials);
      
      setUser(response.user);
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('isLoggedIn', 'true');
      
      return response.user;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      const response = await apiService.auth.register(userData);
      
      setUser(response.user);
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('isLoggedIn', 'true');
      
      return response.user;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await apiService.auth.logout();
    } catch (error) {
      // Continue with logout even if API call fails
      console.error('Logout API error:', error);
    } finally {
      setUser(null);
      localStorage.removeItem('authToken');
      localStorage.removeItem('googleToken');
      localStorage.removeItem('user');
      localStorage.removeItem('isLoggedIn');
    }
  };

  const updateProfile = async (profileData) => {
    try {
      setError(null);
      const updatedUser = await apiService.users.updateProfile(profileData);
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const getUserStats = async () => {
    try {
      const stats = await apiService.users.getStats();
      return stats;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const value = {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
    updateProfile,
    getUserStats,
    isAuthenticated: !!user,
    isTeacher: () => user?.role === 'teacher' || user?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
```

## Key Migration Points

### 1. Error Handling
- Add `error` state to contexts
- Use try-catch blocks for all API calls
- Display user-friendly error messages

### 2. Loading States
- Add `loading` state to contexts
- Show loading indicators during API calls
- Handle loading states in components

### 3. Async Operations
- All context methods become async
- Components need to handle promises
- Use async/await pattern consistently

### 4. Data Synchronization
- Remove localStorage dependencies
- Rely on backend as single source of truth
- Reload data after mutations when needed

### 5. Authentication Integration
- Use JWT tokens for API authentication
- Handle token expiration gracefully
- Integrate with backend user management

## Component Usage Changes

### Before (localStorage):
```javascript
const { createAssignment } = useAssignments();

const handleCreate = () => {
  const newAssignment = createAssignment(data); // Synchronous
  console.log('Created:', newAssignment);
};
```

### After (API):
```javascript
const { createAssignment, loading, error } = useAssignments();

const handleCreate = async () => {
  try {
    const newAssignment = await createAssignment(data); // Async
    console.log('Created:', newAssignment);
  } catch (error) {
    console.error('Failed to create:', error.message);
  }
};

// In JSX:
if (loading) return <div>Loading...</div>;
if (error) return <div>Error: {error}</div>;
```

This migration pattern ensures a smooth transition from localStorage to API-based data management while maintaining the existing UI structure.