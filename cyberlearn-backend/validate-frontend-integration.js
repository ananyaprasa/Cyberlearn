// Frontend-Backend Integration Validation
import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:5000';

// Frontend Expected Data Structures (from context analysis)
const FRONTEND_EXPECTATIONS = {
  assignment: {
    id: 'string',
    title: 'string',
    description: 'string',
    category: 'string',
    points: 'number',
    deadline: 'string', // ISO date
    createdBy: 'string', // email
    createdAt: 'string', // ISO date
    attachments: 'array',
    allowedFileTypes: 'array',
    allowLinks: 'boolean',
    classroomId: 'string|null'
  },
  classroom: {
    id: 'string',
    code: 'string', // 6 char join code
    name: 'string',
    description: 'string',
    subject: 'string',
    teacherId: 'string', // email
    teacherName: 'string',
    createdAt: 'string', // ISO date
    assignments: 'array'
  },
  submission: {
    id: 'string',
    assignmentId: 'string',
    studentEmail: 'string',
    studentName: 'string',
    submittedAt: 'string', // ISO date
    status: 'string', // 'submitted', 'graded'
    grade: 'number|null',
    feedback: 'string|null',
    text: 'string', // NOT textAnswer
    link: 'string', // NOT linkAnswer
    files: 'array'
  },
  content: {
    // List response expects: response.data (array)
    // Detail response expects: direct object with content field
    title: 'string',
    difficulty: 'string',
    category: 'string',
    content: 'string', // NOT markdownContent
    description: 'string'
  },
  user: {
    id: 'string',
    name: 'string',
    email: 'string',
    role: 'string',
    enrolledClasses: 'array'
  }
};

async function makeRequest(method, url, body = null, headers = {}) {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };
    
    if (body) {
      options.body = JSON.stringify(body);
    }
    
    const response = await fetch(url, options);
    const data = await response.json();
    
    return { status: response.status, data, success: response.ok };
  } catch (error) {
    return { error: error.message, success: false };
  }
}

function validateResponseShape(actual, expected, path = '') {
  const issues = [];
  
  if (actual === null || actual === undefined) {
    issues.push(`${path}: Value is null/undefined`);
    return issues;
  }
  
  for (const [key, expectedType] of Object.entries(expected)) {
    const fullPath = path ? `${path}.${key}` : key;
    const actualValue = actual[key];
    
    if (actualValue === undefined) {
      issues.push(`${fullPath}: Missing required field`);
      continue;
    }
    
    if (expectedType.includes('|null') && actualValue === null) {
      continue; // null is allowed
    }
    
    const baseType = expectedType.replace('|null', '');
    const actualType = Array.isArray(actualValue) ? 'array' : typeof actualValue;
    
    if (baseType !== actualType) {
      issues.push(`${fullPath}: Expected ${expectedType}, got ${actualType} (${actualValue})`);
    }
  }
  
  return issues;
}

async function validateFrontendIntegration() {
  console.log('🔍 FRONTEND-BACKEND INTEGRATION VALIDATION\n');
  
  const issues = [];
  
  // Setup: Create test users and data
  console.log('=== SETUP: Creating test data ===');
  
  // Create teacher
  const teacherResult = await makeRequest('POST', `${BASE_URL}/api/auth/register`, {
    name: 'Integration Teacher',
    email: 'integration.teacher@test.com',
    password: 'password123'
  });
  
  const teacherLogin = await makeRequest('POST', `${BASE_URL}/api/auth/login`, {
    email: 'integration.teacher@test.com',
    password: 'password123'
  });
  
  const teacherToken = teacherLogin.data?.data?.token;
  
  // Create student
  const studentResult = await makeRequest('POST', `${BASE_URL}/api/auth/register`, {
    name: 'Integration Student',
    email: 'integration.student@test.com',
    password: 'password123'
  });
  
  const studentLogin = await makeRequest('POST', `${BASE_URL}/api/auth/login`, {
    email: 'integration.student@test.com',
    password: 'password123'
  });
  
  const studentToken = studentLogin.data?.data?.token;
  
  console.log('✅ Test users created\\n');
  
  // VALIDATION 1: CONTENT API
  console.log('=== VALIDATION 1: CONTENT API ===');
  
  // Test content list (frontend expects: response.data as array)
  const contentList = await makeRequest('GET', `${BASE_URL}/api/content`);
  console.log('Content List Response Structure:');
  console.log('- Status:', contentList.status);
  console.log('- Has success field:', 'success' in contentList.data);
  console.log('- Has data field:', 'data' in contentList.data);
  console.log('- data is array:', Array.isArray(contentList.data?.data));
  
  if (contentList.success) {
    // Frontend expects: response.data (direct array)
    // Backend now returns: { success: true, data: [...] }
    if (!Array.isArray(contentList.data.data)) {
      issues.push('CONTENT LIST: Frontend expects response.data as array, backend returns non-array');
    }
  }
  
  // Test content detail (frontend expects: direct object with content field)
  if (contentList.data?.data?.length > 0) {
    const firstContentId = contentList.data.data[0]._id;
    const contentDetail = await makeRequest('GET', `${BASE_URL}/api/content/${firstContentId}`);
    
    console.log('Content Detail Response Structure:');
    console.log('- Status:', contentDetail.status);
    console.log('- Has success field:', 'success' in contentDetail.data);
    console.log('- Has data field:', 'data' in contentDetail.data);
    
    if (contentDetail.success) {
      // Frontend expects: direct object (not wrapped)
      // Backend now returns: direct object
      const contentData = contentDetail.data;
      const contentIssues = validateResponseShape(contentData, FRONTEND_EXPECTATIONS.content, 'content');
      issues.push(...contentIssues.map(issue => `CONTENT DETAIL: ${issue}`));
      
      // Check critical field mapping
      if (contentData.content === undefined) {
        issues.push('CONTENT DETAIL: Missing "content" field (frontend expects this, not markdownContent)');
      }
    }
  }
  
  // VALIDATION 2: ASSIGNMENT API
  console.log('\\n=== VALIDATION 2: ASSIGNMENT API ===');
  
  // Create assignment
  const assignmentResult = await makeRequest('POST', `${BASE_URL}/api/assignments`, {
    title: 'Integration Test Assignment',
    description: 'Testing integration',
    category: 'Network Security',
    points: 100,
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
  }, {
    'Authorization': `Bearer ${teacherToken}`
  });
  
  if (assignmentResult.success) {
    const assignmentData = assignmentResult.data.data;
    const assignmentIssues = validateResponseShape(assignmentData, FRONTEND_EXPECTATIONS.assignment, 'assignment');
    issues.push(...assignmentIssues.map(issue => `ASSIGNMENT CREATE: ${issue}`));
  }
  
  // Get assignments list
  const assignmentsList = await makeRequest('GET', `${BASE_URL}/api/assignments`, null, {
    'Authorization': `Bearer ${teacherToken}`
  });
  
  console.log('Assignments List Response Structure:');
  console.log('- Status:', assignmentsList.status);
  console.log('- Has success field:', 'success' in assignmentsList.data);
  console.log('- Has data field:', 'data' in assignmentsList.data);
  console.log('- data is array:', Array.isArray(assignmentsList.data?.data));
  
  if (assignmentsList.success) {
    // Frontend expects: direct array access
    if (!Array.isArray(assignmentsList.data.data)) {
      issues.push('ASSIGNMENTS LIST: Frontend expects direct array, backend returns non-array');
    } else if (assignmentsList.data.data.length > 0) {
      const firstAssignment = assignmentsList.data.data[0];
      const assignmentIssues = validateResponseShape(firstAssignment, FRONTEND_EXPECTATIONS.assignment, 'assignment');
      issues.push(...assignmentIssues.map(issue => `ASSIGNMENTS LIST: ${issue}`));
    }
  }
  
  // VALIDATION 3: CLASSROOM API
  console.log('\\n=== VALIDATION 3: CLASSROOM API ===');
  
  // Create classroom
  const classroomResult = await makeRequest('POST', `${BASE_URL}/api/classrooms`, {
    name: 'Integration Test Classroom',
    description: 'Testing integration',
    subject: 'Cybersecurity'
  }, {
    'Authorization': `Bearer ${teacherToken}`
  });
  
  if (classroomResult.success) {
    const classroomData = classroomResult.data.data;
    const classroomIssues = validateResponseShape(classroomData, FRONTEND_EXPECTATIONS.classroom, 'classroom');
    issues.push(...classroomIssues.map(issue => `CLASSROOM CREATE: ${issue}`));
    
    // Check critical fields
    if (!classroomData.code || classroomData.code.length !== 6) {
      issues.push('CLASSROOM CREATE: Join code must be exactly 6 characters');
    }
  }
  
  // Get classrooms list
  const classroomsList = await makeRequest('GET', `${BASE_URL}/api/classrooms`, null, {
    'Authorization': `Bearer ${teacherToken}`
  });
  
  if (classroomsList.success && Array.isArray(classroomsList.data.data)) {
    if (classroomsList.data.data.length > 0) {
      const firstClassroom = classroomsList.data.data[0];
      const classroomIssues = validateResponseShape(firstClassroom, FRONTEND_EXPECTATIONS.classroom, 'classroom');
      issues.push(...classroomIssues.map(issue => `CLASSROOMS LIST: ${issue}`));
    }
  }
  
  // VALIDATION 4: SUBMISSION API
  console.log('\\n=== VALIDATION 4: SUBMISSION API ===');
  
  if (assignmentResult.success) {
    const assignmentId = assignmentResult.data.data.id;
    
    // Create submission
    const submissionResult = await makeRequest('POST', `${BASE_URL}/api/submissions`, {
      assignmentId: assignmentId,
      textAnswer: 'Integration test submission',
      linkAnswer: 'https://example.com/test',
      files: []
    }, {
      'Authorization': `Bearer ${studentToken}`
    });
    
    if (submissionResult.success) {
      const submissionData = submissionResult.data.data;
      const submissionIssues = validateResponseShape(submissionData, FRONTEND_EXPECTATIONS.submission, 'submission');
      issues.push(...submissionIssues.map(issue => `SUBMISSION CREATE: ${issue}`));
      
      // Check critical field mapping
      if (submissionData.textAnswer && !submissionData.text) {
        issues.push('SUBMISSION CREATE: Frontend expects "text" field, backend returns "textAnswer"');
      }
      if (submissionData.linkAnswer && !submissionData.link) {
        issues.push('SUBMISSION CREATE: Frontend expects "link" field, backend returns "linkAnswer"');
      }
    }
    
    // Get submissions for assignment
    const submissionsList = await makeRequest('GET', `${BASE_URL}/api/submissions?assignment=${assignmentId}`, null, {
      'Authorization': `Bearer ${teacherToken}`
    });
    
    if (submissionsList.success && Array.isArray(submissionsList.data.data)) {
      if (submissionsList.data.data.length > 0) {
        const firstSubmission = submissionsList.data.data[0];
        const submissionIssues = validateResponseShape(firstSubmission, FRONTEND_EXPECTATIONS.submission, 'submission');
        issues.push(...submissionIssues.map(issue => `SUBMISSIONS LIST: ${issue}`));
      }
    }
  }
  
  // VALIDATION 5: USER API
  console.log('\\n=== VALIDATION 5: USER API ===');
  
  const userProfile = await makeRequest('GET', `${BASE_URL}/api/users/profile`, null, {
    'Authorization': `Bearer ${teacherToken}`
  });
  
  if (userProfile.success) {
    const userData = userProfile.data.data;
    const userIssues = validateResponseShape(userData, FRONTEND_EXPECTATIONS.user, 'user');
    issues.push(...userIssues.map(issue => `USER PROFILE: ${issue}`));
  }
  
  // FINAL REPORT
  console.log('\\n🎯 INTEGRATION VALIDATION RESULTS');
  console.log('=====================================');
  
  if (issues.length === 0) {
    console.log('✅ ALL VALIDATIONS PASSED - Frontend integration ready!');
  } else {
    console.log(`❌ FOUND ${issues.length} INTEGRATION ISSUES:\\n`);
    issues.forEach((issue, index) => {
      console.log(`${index + 1}. ${issue}`);
    });
  }
  
  return issues;
}

// Run validation
validateFrontendIntegration().catch(console.error);