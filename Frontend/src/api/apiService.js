import axiosInstance, { handleApiResponse, handleApiError, setCsrfToken } from './axiosInstance';

// ================= CSRF INITIALIZATION =================
export const initializeCsrf = async () => {
  try {
    const response = await axiosInstance.get('/csrf-token');
    const data = handleApiResponse(response);
    setCsrfToken(data.csrfToken);
    return data.csrfToken;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// ================= CSRF API =================
export const csrfApi = {
  // Get CSRF token
  getToken: async () => {
    try {
      const response = await axiosInstance.get('/csrf-token');
      const data = handleApiResponse(response);
      // Automatically set the token for future requests
      setCsrfToken(data.csrfToken);
      return data.csrfToken;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }
};

// ================= CONTENT API =================
export const contentApi = {
  // Get content by category
  getByCategory: async (category) => {
    try {
      const response = await axiosInstance.get(`/content?category=${encodeURIComponent(category)}`);
      return handleApiResponse(response);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Get content by ID
  getById: async (id) => {
    try {
      const response = await axiosInstance.get(`/content/${id}`);
      return handleApiResponse(response);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Get all content (with optional params)
  getAll: async (params = '') => {
    try {
      const response = await axiosInstance.get(`/content${params}`);
      return handleApiResponse(response);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }
};

// ================= ASSIGNMENTS API =================
export const assignmentsApi = {
  // Get assignments for a specific classroom
  getByClassroom: async (classroomId) => {
    try {
      const response = await axiosInstance.get(`/assignments/classroom/${classroomId}`);
      return handleApiResponse(response);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Get all assignments
  getAll: async (classroomId = null) => {
    try {
      const params = classroomId ? `?classroomId=${classroomId}` : '';
      const response = await axiosInstance.get(`/assignments${params}`);
      return handleApiResponse(response);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Get assignment by ID
  getById: async (id) => {
    try {
      const response = await axiosInstance.get(`/assignments/${id}`);
      return handleApiResponse(response);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Create new assignment
  create: async (assignmentData) => {
    try {
      const response = await axiosInstance.post('/assignments', assignmentData);
      return handleApiResponse(response);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Update assignment
  update: async (id, updates) => {
    try {
      const response = await axiosInstance.put(`/assignments/${id}`, updates);
      return handleApiResponse(response);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Delete assignment
  delete: async (id) => {
    try {
      const response = await axiosInstance.delete(`/assignments/${id}`);
      return handleApiResponse(response);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }
};

// ================= SUBMISSIONS API =================
export const submissionsApi = {
  // Create submission
  create: async (submissionData) => {
    try {
      const response = await axiosInstance.post('/submissions', submissionData);
      return handleApiResponse(response);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Get submissions for assignment
  getByAssignment: async (assignmentId) => {
    try {
      const response = await axiosInstance.get(`/submissions?assignment=${assignmentId}`);
      return handleApiResponse(response);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Get student submissions
  getByStudent: async (userId) => {
    try {
      const response = await axiosInstance.get(`/submissions/student/${userId}`);
      return handleApiResponse(response);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Grade submission
  grade: async (submissionId, gradeData) => {
    try {
      const response = await axiosInstance.put(`/submissions/${submissionId}/grade`, gradeData);
      return handleApiResponse(response);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Delete submission (unsubmit)
  delete: async (submissionId) => {
    try {
      const response = await axiosInstance.delete(`/submissions/${submissionId}`);
      return handleApiResponse(response);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }
};

// ================= CLASSROOMS API =================
export const classroomsApi = {
  // Get all classrooms
  getAll: async () => {
    try {
      const response = await axiosInstance.get('/classrooms');
      return handleApiResponse(response);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Get single classroom by ID
  getById: async (classroomId) => {
    try {
      const response = await axiosInstance.get(`/classrooms/${classroomId}`);
      return handleApiResponse(response);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Create classroom
  create: async (classroomData) => {
    try {
      const response = await axiosInstance.post('/classrooms', classroomData);
      return handleApiResponse(response);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Join classroom
  join: async (code) => {
    try {
      const response = await axiosInstance.post('/classrooms/join', { code });
      return handleApiResponse(response);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Leave classroom
  leave: async (classroomId) => {
    try {
      const response = await axiosInstance.delete(`/classrooms/${classroomId}/leave`);
      return handleApiResponse(response);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Delete classroom
  delete: async (classroomId) => {
    try {
      const response = await axiosInstance.delete(`/classrooms/${classroomId}`);
      return handleApiResponse(response);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }
};

// ================= USERS API =================
export const usersApi = {
  // Get user profile
  getProfile: async () => {
    try {
      const response = await axiosInstance.get('/users/profile');
      return handleApiResponse(response);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Update user profile
  updateProfile: async (profileData) => {
    try {
      const response = await axiosInstance.put('/users/profile', profileData);
      return handleApiResponse(response);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Get user stats
  getStats: async () => {
    try {
      const response = await axiosInstance.get('/users/stats');
      return handleApiResponse(response);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Change password
  changePassword: async (currentPassword, newPassword) => {
    try {
      const response = await axiosInstance.put('/users/change-password', { currentPassword, newPassword });
      return handleApiResponse(response);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Delete account
  deleteAccount: async () => {
    try {
      const response = await axiosInstance.delete('/users/account');
      return handleApiResponse(response);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }
};

// ================= AUTH API =================
export const authApi = {
  // Login
  login: async (credentials) => {
    try {
      const response = await axiosInstance.post('/auth/login', credentials);
      return handleApiResponse(response);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Register
  register: async (userData) => {
    try {
      const response = await axiosInstance.post('/auth/register', userData);
      return handleApiResponse(response);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Logout
  logout: async () => {
    try {
      const response = await axiosInstance.post('/auth/logout');
      return handleApiResponse(response);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Verify token and get current user
  verifyToken: async () => {
    try {
      const response = await axiosInstance.get('/auth/me');
      return handleApiResponse(response);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }
};

// ================= STUDY MATERIALS API =================
export const materialsApi = {
  getByClassroom: async (classroomId) => {
    try {
      const response = await axiosInstance.get(`/classrooms/${classroomId}/materials`);
      return handleApiResponse(response);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  upload: async (classroomId, formData) => {
    try {
      // Do NOT set Content-Type manually — axios must set it with the correct boundary
      const response = await axiosInstance.post(
        `/classrooms/${classroomId}/materials`,
        formData
      );
      return handleApiResponse(response);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  delete: async (materialId) => {
    try {
      const response = await axiosInstance.delete(`/materials/${materialId}`);
      return handleApiResponse(response);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },
};

// ================= EXPORT ALL APIs =================
export default {
  initializeCsrf,
  csrf: csrfApi,
  content: contentApi,
  assignments: assignmentsApi,
  submissions: submissionsApi,
  classrooms: classroomsApi,
  materials: materialsApi,
  users: usersApi,
  auth: authApi
};