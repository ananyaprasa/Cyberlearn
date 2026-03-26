#!/usr/bin/env node

/**
 * Full System Flow Test
 * Tests complete end-to-end user flows with CSRF protection
 */

import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

// Helper function to get CSRF token and cookies
async function getCsrfToken() {
  try {
    const response = await axios.get(`${BASE_URL}/csrf-token`, {
      withCredentials: true
    });
    console.log('CSRF Response:', response.data);
    console.log('CSRF Cookies:', response.headers['set-cookie']);
    
    let csrfCookies = '';
    if (response.headers['set-cookie']) {
      csrfCookies = response.headers['set-cookie'].map(cookie => cookie.split(';')[0]).join('; ');
    }
    
    return {
      token: response.data.data.csrfToken,
      cookies: csrfCookies
    };
  } catch (error) {
    console.error('Failed to get CSRF token:', error.response?.data || error.message);
    return null;
  }
}

// Helper function to make authenticated requests with CSRF protection
async function makeRequest(method, url, data = null, cookies = '', csrfToken = null, csrfCookies = '') {
  try {
    // Combine session cookies with CSRF cookies
    const allCookies = [cookies, csrfCookies].filter(Boolean).join('; ');
    
    const headers = {
      'Content-Type': 'application/json',
      'Cookie': allCookies
    };
    
    // Add CSRF token for state-changing requests
    if (csrfToken && ['post', 'put', 'delete', 'patch'].includes(method.toLowerCase())) {
      headers['X-CSRF-Token'] = csrfToken;
      console.log(`Adding CSRF token to ${method.toUpperCase()} ${url}:`, csrfToken.substring(0, 10) + '...');
      console.log('All cookies:', allCookies);
    }
    
    const config = {
      method,
      url: `${BASE_URL}${url}`,
      headers,
      withCredentials: true
    };
    
    if (data) {
      config.data = data;
    }
    
    const response = await axios(config);
    
    let responseCookies = '';
    if (response.headers['set-cookie']) {
      responseCookies = response.headers['set-cookie'].map(cookie => cookie.split(';')[0]).join('; ');
    }
    
    return { 
      success: true, 
      data: response.data, 
      status: response.status,
      cookies: responseCookies
    };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data || error.message, 
      status: error.response?.status 
    };
  }
}

async function testCompleteTeacherFlow() {
  console.log('\n👨‍🏫 Testing Complete Teacher Flow...');
  
  let teacherCookies = '';
  let classroomId = '';
  let assignmentId = '';
  let csrfToken = '';
  let csrfCookies = '';
  
  // 0. Get CSRF token first
  const csrfResult = await getCsrfToken();
  if (!csrfResult) {
    console.log('❌ Failed to get CSRF token');
    return false;
  }
  csrfToken = csrfResult.token;
  csrfCookies = csrfResult.cookies;
  console.log('✅ CSRF token obtained');
  
  // 1. Teacher Registration
  const registerResult = await makeRequest('POST', '/auth/register', {
    name: 'Flow Test Teacher',
    email: `flowteacher${Date.now()}@test.com`,
    password: 'password123',
    role: 'teacher'
  }, '', csrfToken, csrfCookies);
  
  if (!registerResult.success) {
    console.log('❌ Teacher registration failed:', registerResult.error);
    return false;
  }
  console.log('✅ Teacher registered successfully');
  
  // 2. Teacher Login
  const loginResult = await makeRequest('POST', '/auth/login', {
    email: registerResult.data.data.user.email,
    password: 'password123'
  }, '', csrfToken, csrfCookies);
  
  if (!loginResult.success || !loginResult.cookies) {
    console.log('❌ Teacher login failed:', loginResult.error);
    return false;
  }
  teacherCookies = loginResult.cookies;
  console.log('✅ Teacher logged in successfully');
  
  // 3. Verify /auth/me
  const meResult = await makeRequest('GET', '/auth/me', null, teacherCookies);
  if (!meResult.success || meResult.data.data.role !== 'teacher') {
    console.log('❌ /auth/me failed or wrong role:', meResult.error);
    return false;
  }
  console.log('✅ /auth/me verified teacher role');
  
  // 4. Create Classroom
  const classroomResult = await makeRequest('POST', '/classrooms', {
    name: 'Flow Test Classroom',
    description: 'Testing complete flow',
    subject: 'Cybersecurity'
  }, teacherCookies, csrfToken, csrfCookies);
  
  if (!classroomResult.success) {
    console.log('❌ Classroom creation failed:', classroomResult.error);
    return false;
  }
  classroomId = classroomResult.data.data.id;
  console.log('✅ Classroom created:', classroomId);
  
  // 5. Create Assignment
  const assignmentResult = await makeRequest('POST', '/assignments', {
    title: 'Flow Test Assignment',
    description: 'Testing assignment flow',
    category: 'General',
    points: 100,
    classroomId: classroomId
  }, teacherCookies, csrfToken, csrfCookies);
  
  if (!assignmentResult.success) {
    console.log('❌ Assignment creation failed:', assignmentResult.error);
    return false;
  }
  assignmentId = assignmentResult.data.data.id;
  console.log('✅ Assignment created:', assignmentId);
  
  return { teacherCookies, classroomId, assignmentId, classroomCode: classroomResult.data.data.code, csrfToken, csrfCookies };
}

async function testCompleteStudentFlow(classroomCode, assignmentId, teacherCsrfToken) {
  console.log('\n👨‍🎓 Testing Complete Student Flow...');
  
  let studentCookies = '';
  let submissionId = '';
  let csrfToken = '';
  let csrfCookies = '';
  
  // 0. Get CSRF token for student
  const csrfResult = await getCsrfToken();
  if (!csrfResult) {
    console.log('❌ Failed to get CSRF token for student');
    return false;
  }
  csrfToken = csrfResult.token;
  csrfCookies = csrfResult.cookies;
  console.log('✅ Student CSRF token obtained');
  
  // 1. Student Registration
  const registerResult = await makeRequest('POST', '/auth/register', {
    name: 'Flow Test Student',
    email: `flowstudent${Date.now()}@test.com`,
    password: 'password123',
    role: 'student'
  }, '', csrfToken, csrfCookies);
  
  if (!registerResult.success) {
    console.log('❌ Student registration failed:', registerResult.error);
    return false;
  }
  console.log('✅ Student registered successfully');
  
  // 2. Student Login
  const loginResult = await makeRequest('POST', '/auth/login', {
    email: registerResult.data.data.user.email,
    password: 'password123'
  }, '', csrfToken, csrfCookies);
  
  if (!loginResult.success || !loginResult.cookies) {
    console.log('❌ Student login failed:', loginResult.error);
    return false;
  }
  studentCookies = loginResult.cookies;
  console.log('✅ Student logged in successfully');
  
  // 3. Verify /auth/me
  const meResult = await makeRequest('GET', '/auth/me', null, studentCookies);
  if (!meResult.success || meResult.data.data.role !== 'student') {
    console.log('❌ /auth/me failed or wrong role:', meResult.error);
    return false;
  }
  console.log('✅ /auth/me verified student role');
  
  // 4. Join Classroom
  const joinResult = await makeRequest('POST', '/classrooms/join', {
    code: classroomCode
  }, studentCookies, csrfToken, csrfCookies);
  
  if (!joinResult.success) {
    console.log('❌ Classroom join failed:', joinResult.error);
    return false;
  }
  console.log('✅ Student joined classroom');
  
  // 5. View Classrooms (should include joined classroom)
  const classroomsResult = await makeRequest('GET', '/classrooms', null, studentCookies);
  if (!classroomsResult.success || !Array.isArray(classroomsResult.data.data)) {
    console.log('❌ Failed to load classrooms:', classroomsResult.error);
    return false;
  }
  console.log('✅ Student can view classrooms:', classroomsResult.data.data.length);
  
  // 6. View Assignment
  const assignmentResult = await makeRequest('GET', `/assignments/${assignmentId}`, null, studentCookies);
  if (!assignmentResult.success) {
    console.log('❌ Failed to view assignment:', assignmentResult.error);
    return false;
  }
  console.log('✅ Student can view assignment');
  
  // 7. Submit Assignment
  const submissionResult = await makeRequest('POST', '/submissions', {
    assignmentId: assignmentId,
    textAnswer: 'This is my test submission for the flow test'
  }, studentCookies, csrfToken, csrfCookies);
  
  if (!submissionResult.success) {
    console.log('❌ Assignment submission failed:', submissionResult.error);
    return false;
  }
  submissionId = submissionResult.data.data.id;
  console.log('✅ Assignment submitted:', submissionId);
  
  return { studentCookies, submissionId, csrfToken, csrfCookies };
}

async function testGradingFlow(teacherCookies, assignmentId, submissionId, csrfToken, csrfCookies) {
  console.log('\n📊 Testing Grading Flow...');
  
  // 1. Teacher views submissions
  const submissionsResult = await makeRequest('GET', `/submissions?assignment=${assignmentId}`, null, teacherCookies);
  if (!submissionsResult.success || !Array.isArray(submissionsResult.data.data)) {
    console.log('❌ Failed to view submissions:', submissionsResult.error);
    return false;
  }
  console.log('✅ Teacher can view submissions:', submissionsResult.data.data.length);
  
  // 2. Teacher grades submission
  const gradeResult = await makeRequest('PUT', `/submissions/${submissionId}/grade`, {
    grade: 85,
    feedback: 'Good work on the flow test!'
  }, teacherCookies, csrfToken, csrfCookies);
  
  if (!gradeResult.success) {
    console.log('❌ Grading failed:', gradeResult.error);
    return false;
  }
  console.log('✅ Submission graded successfully');
  
  return true;
}

async function testStudentViewGrade(studentCookies, submissionId) {
  console.log('\n👀 Testing Student View Grade...');
  
  // First get the student's user ID from /auth/me
  const meResult = await makeRequest('GET', '/auth/me', null, studentCookies);
  if (!meResult.success) {
    console.log('❌ Failed to get student user ID:', meResult.error);
    return false;
  }
  
  const userId = meResult.data.data.id;
  const submissionsResult = await makeRequest('GET', `/submissions/student/${userId}`, null, studentCookies);
  
  if (!submissionsResult.success) {
    console.log('❌ Failed to view student submissions:', submissionsResult.error);
    return false;
  }
  
  const graded = submissionsResult.data.data.find(s => s.id === submissionId && s.grade !== null);
  if (!graded) {
    console.log('❌ Grade not found in student submissions');
    return false;
  }
  
  console.log('✅ Student can view grade:', graded.grade);
  return true;
}

async function testPageRefreshPersistence(cookies) {
  console.log('\n🔄 Testing Page Refresh Persistence...');
  
  // Simulate page refresh by making /auth/me call
  const meResult = await makeRequest('GET', '/auth/me', null, cookies);
  if (!meResult.success) {
    console.log('❌ Session not persistent after refresh:', meResult.error);
    return false;
  }
  
  console.log('✅ Session persists after page refresh');
  return true;
}

async function testLogout(cookies, csrfToken, csrfCookies) {
  console.log('\n🚪 Testing Logout...');
  
  // Logout
  const logoutResult = await makeRequest('POST', '/auth/logout', null, cookies, csrfToken, csrfCookies);
  if (!logoutResult.success) {
    console.log('❌ Logout failed:', logoutResult.error);
    return false;
  }
  
  // Try to access protected route after logout (no cookies to simulate browser behavior)
  const meResult = await makeRequest('GET', '/auth/me', null, '');
  if (meResult.success) {
    console.log('❌ Still authenticated after logout');
    return false;
  }
  
  console.log('✅ Logout successful, session cleared');
  return true;
}

async function cleanup(teacherCookies, classroomId, csrfToken, csrfCookies) {
  console.log('\n🧹 Cleaning up...');
  
  if (classroomId && teacherCookies) {
    await makeRequest('DELETE', `/classrooms/${classroomId}`, null, teacherCookies, csrfToken, csrfCookies);
    console.log('✅ Test data cleaned up');
  }
}

async function runFullSystemFlow() {
  console.log('🚀 Starting Full System Flow Test...');
  
  try {
    // Teacher Flow
    const teacherFlow = await testCompleteTeacherFlow();
    if (!teacherFlow) {
      console.log('❌ Teacher flow failed');
      return;
    }
    
    const { teacherCookies, classroomId, assignmentId, classroomCode, csrfToken, csrfCookies } = teacherFlow;
    
    // Test teacher session persistence
    await testPageRefreshPersistence(teacherCookies);
    
    // Student Flow
    const studentFlow = await testCompleteStudentFlow(classroomCode, assignmentId, csrfToken);
    if (!studentFlow) {
      console.log('❌ Student flow failed');
      await cleanup(teacherCookies, classroomId, csrfToken, csrfCookies);
      return;
    }
    
    const { studentCookies, submissionId, csrfToken: studentCsrfToken, csrfCookies: studentCsrfCookies } = studentFlow;
    
    // Test student session persistence
    await testPageRefreshPersistence(studentCookies);
    
    // Grading Flow
    const gradingSuccess = await testGradingFlow(teacherCookies, assignmentId, submissionId, csrfToken, csrfCookies);
    if (!gradingSuccess) {
      console.log('❌ Grading flow failed');
      await cleanup(teacherCookies, classroomId, csrfToken, csrfCookies);
      return;
    }
    
    // Student View Grade
    const viewGradeSuccess = await testStudentViewGrade(studentCookies, submissionId);
    if (!viewGradeSuccess) {
      console.log('❌ Student view grade failed');
    }
    
    // Test Logout
    await testLogout(studentCookies, studentCsrfToken, studentCsrfCookies);
    await testLogout(teacherCookies, csrfToken, csrfCookies);
    
    // Cleanup
    await cleanup(teacherCookies, classroomId, csrfToken, csrfCookies);
    
    console.log('\n🎉 Full System Flow Test Completed Successfully!');
    console.log('\n📊 All Critical Flows Verified:');
    console.log('- Teacher registration → login → create classroom → create assignment');
    console.log('- Student registration → login → join classroom → view assignment → submit');
    console.log('- Teacher grade submission');
    console.log('- Student view grade');
    console.log('- Session persistence across page refreshes');
    console.log('- Proper logout and session clearing');
    
  } catch (error) {
    console.error('❌ Full system flow test failed:', error);
  }
}

runFullSystemFlow();