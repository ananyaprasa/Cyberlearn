// Backend Reliability Audit Script
import fetch from 'node-fetch';
import mongoose from 'mongoose';

const BASE_URL = 'http://localhost:5000';

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

async function reliabilityAudit() {
  console.log('🔍 BACKEND RELIABILITY AUDIT\n');
  
  const issues = [];
  
  // Setup test users
  const teacherResult = await makeRequest('POST', `${BASE_URL}/api/auth/register`, {
    name: 'Reliability Teacher',
    email: 'reliability.teacher@test.com',
    password: 'password123'
  });
  
  const teacherLogin = await makeRequest('POST', `${BASE_URL}/api/auth/login`, {
    email: 'reliability.teacher@test.com',
    password: 'password123'
  });
  
  const teacherToken = teacherLogin.data?.data?.token;
  
  const studentResult = await makeRequest('POST', `${BASE_URL}/api/auth/register`, {
    name: 'Reliability Student',
    email: 'reliability.student@test.com',
    password: 'password123'
  });
  
  const studentLogin = await makeRequest('POST', `${BASE_URL}/api/auth/login`, {
    email: 'reliability.student@test.com',
    password: 'password123'
  });
  
  const studentToken = studentLogin.data?.data?.token;
  
  console.log('=== TEST 1: DATA INTEGRITY ISSUES ===');
  
  // Test 1.1: Orphaned References - Delete classroom with assignments
  console.log('Test 1.1: Orphaned assignments after classroom deletion');
  
  const classroom = await makeRequest('POST', `${BASE_URL}/api/classrooms`, {
    name: 'Test Classroom',
    description: 'For reliability testing'
  }, { 'Authorization': `Bearer ${teacherToken}` });
  
  if (classroom.success) {
    const classroomId = classroom.data.data.id;
    
    // Create assignment in classroom
    const assignment = await makeRequest('POST', `${BASE_URL}/api/assignments`, {
      title: 'Test Assignment',
      description: 'For reliability testing',
      classroomId: classroomId
    }, { 'Authorization': `Bearer ${teacherToken}` });
    
    if (assignment.success) {
      // Delete classroom - what happens to assignment?
      const deleteResult = await makeRequest('DELETE', `${BASE_URL}/api/classrooms/${classroomId}`, null, {
        'Authorization': `Bearer ${teacherToken}`
      });
      
      // Check if assignment still exists
      const assignmentCheck = await makeRequest('GET', `${BASE_URL}/api/assignments/${assignment.data.data.id}`, null, {
        'Authorization': `Bearer ${teacherToken}`
      });
      
      if (assignmentCheck.success) {
        issues.push('ORPHANED ASSIGNMENT: Assignment still exists after classroom deletion');
      }
    }
  }
  
  // Test 1.2: Duplicate submissions
  console.log('Test 1.2: Duplicate submission prevention');
  
  const testAssignment = await makeRequest('POST', `${BASE_URL}/api/assignments`, {
    title: 'Duplicate Test Assignment',
    description: 'Testing duplicate submissions'
  }, { 'Authorization': `Bearer ${teacherToken}` });
  
  if (testAssignment.success) {
    const assignmentId = testAssignment.data.data.id;
    
    // Submit first time
    const submission1 = await makeRequest('POST', `${BASE_URL}/api/submissions`, {
      assignmentId: assignmentId,
      textAnswer: 'First submission'
    }, { 'Authorization': `Bearer ${studentToken}` });
    
    // Submit second time (should fail)
    const submission2 = await makeRequest('POST', `${BASE_URL}/api/submissions`, {
      assignmentId: assignmentId,
      textAnswer: 'Second submission'
    }, { 'Authorization': `Bearer ${studentToken}` });
    
    if (submission2.success) {
      issues.push('DUPLICATE SUBMISSION: System allows multiple submissions from same student');
    }
  }
  
  console.log('\\n=== TEST 2: EDGE CASES ===');
  
  // Test 2.1: Invalid ObjectIds
  console.log('Test 2.1: Invalid ObjectId handling');
  
  const invalidIdTest = await makeRequest('GET', `${BASE_URL}/api/assignments/invalid-id`, null, {
    'Authorization': `Bearer ${teacherToken}`
  });
  
  if (invalidIdTest.status !== 400 && invalidIdTest.status !== 404) {
    issues.push('INVALID OBJECTID: System does not handle invalid ObjectIds properly');
  }
  
  // Test 2.2: Empty/null inputs
  console.log('Test 2.2: Empty input validation');
  
  const emptyAssignment = await makeRequest('POST', `${BASE_URL}/api/assignments`, {
    title: '',
    description: null
  }, { 'Authorization': `Bearer ${teacherToken}` });
  
  if (emptyAssignment.success) {
    issues.push('EMPTY INPUT: System accepts empty/null required fields');
  }
  
  // Test 2.3: Concurrent submissions
  console.log('Test 2.3: Concurrent operations');
  
  const concurrentAssignment = await makeRequest('POST', `${BASE_URL}/api/assignments`, {
    title: 'Concurrent Test Assignment',
    description: 'Testing concurrent submissions'
  }, { 'Authorization': `Bearer ${teacherToken}` });
  
  if (concurrentAssignment.success) {
    const assignmentId = concurrentAssignment.data.data.id;
    
    // Simulate concurrent submissions
    const promises = [];
    for (let i = 0; i < 3; i++) {
      promises.push(
        makeRequest('POST', `${BASE_URL}/api/submissions`, {
          assignmentId: assignmentId,
          textAnswer: `Concurrent submission ${i}`
        }, { 'Authorization': `Bearer ${studentToken}` })
      );
    }
    
    const results = await Promise.all(promises);
    const successCount = results.filter(r => r.success).length;
    
    if (successCount > 1) {
      issues.push('RACE CONDITION: Multiple concurrent submissions succeeded');
    }
  }
  
  console.log('\\n=== TEST 3: CONSISTENCY RULES ===');
  
  // Test 3.1: Classroom enrollment before submission
  console.log('Test 3.1: Classroom enrollment validation');
  
  const restrictedClassroom = await makeRequest('POST', `${BASE_URL}/api/classrooms`, {
    name: 'Restricted Classroom',
    description: 'For enrollment testing'
  }, { 'Authorization': `Bearer ${teacherToken}` });
  
  if (restrictedClassroom.success) {
    const classroomId = restrictedClassroom.data.data.id;
    
    const restrictedAssignment = await makeRequest('POST', `${BASE_URL}/api/assignments`, {
      title: 'Restricted Assignment',
      description: 'Only for enrolled students',
      classroomId: classroomId
    }, { 'Authorization': `Bearer ${teacherToken}` });
    
    if (restrictedAssignment.success) {
      // Try to submit without being enrolled
      const unauthorizedSubmission = await makeRequest('POST', `${BASE_URL}/api/submissions`, {
        assignmentId: restrictedAssignment.data.data.id,
        textAnswer: 'Unauthorized submission'
      }, { 'Authorization': `Bearer ${studentToken}` });
      
      if (unauthorizedSubmission.success) {
        issues.push('ENROLLMENT BYPASS: Student can submit to classroom assignment without enrollment');
      }
    }
  }
  
  // FINAL REPORT
  console.log('\\n🎯 RELIABILITY AUDIT RESULTS');
  console.log('=====================================');
  
  if (issues.length === 0) {
    console.log('✅ NO CRITICAL RELIABILITY ISSUES FOUND');
  } else {
    console.log(`❌ FOUND ${issues.length} RELIABILITY ISSUES:\\n`);
    issues.forEach((issue, index) => {
      console.log(`${index + 1}. ${issue}`);
    });
  }
  
  return issues;
}

// Run the audit
reliabilityAudit().catch(console.error);