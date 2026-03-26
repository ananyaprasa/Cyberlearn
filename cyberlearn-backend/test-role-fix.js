// Test role assignment fix
import fetch from 'node-fetch';

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
    
    console.log(`🔄 ${method} ${url}`);
    if (body) console.log('📤 Request Body:', JSON.stringify(body, null, 2));
    
    const response = await fetch(url, options);
    const data = await response.json();
    
    console.log(`📊 Status: ${response.status}`);
    console.log('📥 Response:', JSON.stringify(data, null, 2));
    console.log('---');
    
    return { status: response.status, data, success: response.ok };
  } catch (error) {
    console.log(`❌ Request Failed: ${error.message}`);
    console.log('---');
    return { error: error.message, success: false };
  }
}

async function testRoleFix() {
  console.log('🧪 TESTING ROLE ASSIGNMENT FIX\n');
  
  // Test 1: Register new teacher
  console.log('Test 1: Register new teacher');
  const teacherResult = await makeRequest('POST', `${BASE_URL}/api/auth/register`, {
    name: 'New Teacher',
    email: 'newteacher@test.com',
    password: 'password123'
  });
  
  // Test 2: Login new teacher
  console.log('Test 2: Login new teacher');
  const loginResult = await makeRequest('POST', `${BASE_URL}/api/auth/login`, {
    email: 'newteacher@test.com',
    password: 'password123'
  });
  
  let authToken = null;
  if (loginResult.success && loginResult.data.data.token) {
    authToken = loginResult.data.data.token;
    console.log(`✅ Auth token obtained, Role: ${loginResult.data.data.user.role}`);
  }
  
  // Test 3: Try to create classroom
  console.log('Test 3: Create classroom with teacher role');
  const classroomResult = await makeRequest('POST', `${BASE_URL}/api/classrooms`, {
    name: 'New Test Classroom',
    description: 'Testing role fix',
    subject: 'Cybersecurity'
  }, {
    'Authorization': `Bearer ${authToken}`
  });
  
  let joinCode = null;
  if (classroomResult.success && classroomResult.data.data) {
    joinCode = classroomResult.data.data.code;
    console.log(`✅ Classroom created with code: ${joinCode}`);
  }
  
  // Test 4: Register new student
  console.log('Test 4: Register new student');
  const studentResult = await makeRequest('POST', `${BASE_URL}/api/auth/register`, {
    name: 'New Student',
    email: 'newstudent@test.com',
    password: 'password123'
  });
  
  // Test 5: Login new student
  console.log('Test 5: Login new student');
  const studentLogin = await makeRequest('POST', `${BASE_URL}/api/auth/login`, {
    email: 'newstudent@test.com',
    password: 'password123'
  });
  
  let studentToken = null;
  if (studentLogin.success && studentLogin.data.data.token) {
    studentToken = studentLogin.data.data.token;
    console.log(`✅ Student token obtained, Role: ${studentLogin.data.data.user.role}`);
  }
  
  // Test 6: Join classroom
  if (joinCode) {
    console.log('Test 6: Join classroom with code');
    const joinResult = await makeRequest('POST', `${BASE_URL}/api/classrooms/join`, {
      code: joinCode
    }, {
      'Authorization': `Bearer ${studentToken}`
    });
  }
  
  console.log('🎉 ROLE FIX TEST COMPLETED!');
}

testRoleFix().catch(console.error);