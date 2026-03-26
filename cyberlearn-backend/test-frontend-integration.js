#!/usr/bin/env node

/**
 * Frontend-Backend Integration Audit
 */

import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

async function makeRequest(method, url, data = null, cookies = '') {
  try {
    const config = {
      method,
      url: `${BASE_URL}${url}`,
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookies
      },
      withCredentials: true
    };
    
    if (data) config.data = data;
    
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

async function auditFrontendIntegration() {
  console.log('🔗 FRONTEND-BACKEND INTEGRATION AUDIT');
  console.log('=====================================');
  
  const issues = [];
  let teacherCookies = '';
  let studentCookies = '';
  let classroomId = '';
  let assignmentId = '';
  
  // Setup: Login as teacher
  const teacherLogin = await makeRequest('POST', '/auth/login', {
    email: 'teacher@test.com',
    password: 'password123'
  });
  
  if (!teacherLogin.success) {
    issues.push('CRITICAL: Cannot login as teacher for integration test');
    return issues;
  }
  teacherCookies = teacherLogin.cookies;
  
  // Setup: Login as student  
  const studentLogin = await makeRequest('POST', '/auth/login', {
    email: 'student@test.com',
    password: 'password123'
  });
  
  if (!studentLogin.success) {
    issues.push('CRITICAL: Cannot login as student for integration test');
    return issues;
  }
  studentCookies = studentLogin.cookies;
  
  console.log('\n1. Testing Classroom Flow...');
  
  // Test 1: Create classroom
  const createClassroom = await makeRequest('POST', '/classrooms', {
    name: 'Integration Test Classroom',
    description: 'Testing integration'
  }, teacherCookies);
  
  if (!createClassroom.success) {
    issues.push('CRITICAL: Teacher cannot create classroom');
    console.log('❌ Classroom creation failed');
  } else if (!createClassroom.data?.data?.id) {
    issues.push('CRITICAL: Classroom creation missing ID in response');
    console.log('❌ Missing classroom ID');
  } else {
    classroomId = createClassroom.data.data.id;
    console.log('✅ Classroom created with ID');
  }
  
  // Test 2: Student join classroom
  if (classroomId) {
    const joinCode = createClassroom.data.data.code;
    const joinResult = await makeRequest('POST', '/classrooms/join', {
      code: joinCode
    }, studentCookies);
    
    if (!joinResult.success) {
      issues.push('CRITICAL: Student cannot join classroom');
      console.log('❌ Classroom join failed');
    } else {
      console.log('✅ Student joined classroom');
    }
  }
  
  console.log('\n2. Testing Assignment Flow...');
  
  // Test 3: Create assignment
  if (classroomId) {
    const createAssignment = await makeRequest('POST', '/assignments', {
      title: 'Integration Test Assignment',
      description: 'Testing assignment integration',
      classroomId: classroomId,
      points: 100
    }, teacherCookies);
    
    if (!createAssignment.success) {
      issues.push('CRITICAL: Teacher cannot create assignment');
      console.log('❌ Assignment creation failed');
    } else if (!createAssignment.data?.data?.id) {
      issues.push('CRITICAL: Assignment creation missing ID in response');
      console.log('❌ Missing assignment ID');
    } else {
      assignmentId = createAssignment.data.data.id;
      console.log('✅ Assignment created with ID');
    }
  }
  
  console.log('\n3. Testing Submission Flow...');
  
  // Test 4: Student submit assignment
  if (assignmentId) {
    const submitAssignment = await makeRequest('POST', '/submissions', {
      assignmentId: assignmentId,
      textAnswer: 'Integration test submission'
    }, studentCookies);
    
    if (!submitAssignment.success) {
      issues.push('CRITICAL: Student cannot submit assignment');
      console.log('❌ Assignment submission failed');
    } else {
      console.log('✅ Assignment submitted');
    }
  }
  
  console.log('\n4. Testing Data Consistency...');
  
  // Test 5: Check classroom appears in student's list
  const studentClassrooms = await makeRequest('GET', '/classrooms', null, studentCookies);
  if (!studentClassrooms.success) {
    issues.push('MAJOR: Student cannot view classrooms');
    console.log('❌ Student classroom list failed');
  } else if (!Array.isArray(studentClassrooms.data?.data)) {
    issues.push('MAJOR: Classroom list not returned as array');
    console.log('❌ Classroom list wrong format');
  } else if (studentClassrooms.data.data.length === 0) {
    issues.push('CRITICAL: Joined classroom not appearing in student list');
    console.log('❌ No classrooms in student list');
  } else {
    console.log('✅ Student can see joined classroom');
  }
  
  // Test 6: Check assignment appears for student
  if (assignmentId) {
    const studentAssignments = await makeRequest('GET', '/assignments', null, studentCookies);
    if (!studentAssignments.success) {
      issues.push('MAJOR: Student cannot view assignments');
      console.log('❌ Student assignment list failed');
    } else if (!Array.isArray(studentAssignments.data?.data)) {
      issues.push('MAJOR: Assignment list not returned as array');
      console.log('❌ Assignment list wrong format');
    } else {
      const hasAssignment = studentAssignments.data.data.some(a => a.id === assignmentId);
      if (!hasAssignment) {
        issues.push('CRITICAL: Assignment not visible to enrolled student');
        console.log('❌ Assignment not in student list');
      } else {
        console.log('✅ Student can see classroom assignment');
      }
    }
  }
  
  console.log('\n5. Testing Response Format Consistency...');
  
  // Test 7: Check all responses have consistent format
  const responses = [createClassroom, joinResult, createAssignment, submitAssignment];
  responses.forEach((response, index) => {
    if (response && response.success && response.data) {
      if (typeof response.data.success !== 'boolean') {
        issues.push(`MAJOR: Response ${index + 1} missing success field`);
      }
      if (!response.data.hasOwnProperty('data')) {
        issues.push(`MAJOR: Response ${index + 1} missing data field`);
      }
    }
  });
  
  // Cleanup
  if (classroomId) {
    await makeRequest('DELETE', `/classrooms/${classroomId}`, null, teacherCookies);
  }
  
  return issues;
}

auditFrontendIntegration().then(issues => {
  console.log('\n📊 FRONTEND-BACKEND INTEGRATION RESULTS:');
  if (issues.length === 0) {
    console.log('✅ Frontend-backend integration is solid');
  } else {
    console.log(`❌ Found ${issues.length} integration issues:`);
    issues.forEach(issue => console.log(`  - ${issue}`));
  }
});