#!/usr/bin/env node

/**
 * Security Audit
 */

import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

async function makeRequest(method, url, data = null, cookies = '', headers = {}) {
  try {
    const config = {
      method,
      url: `${BASE_URL}${url}`,
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookies,
        ...headers
      },
      withCredentials: true
    };
    
    if (data) config.data = data;
    
    const response = await axios(config);
    
    return { 
      success: true, 
      data: response.data, 
      status: response.status,
      headers: response.headers
    };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data || error.message, 
      status: error.response?.status,
      headers: error.response?.headers
    };
  }
}

async function auditSecurity() {
  console.log('🔐 SECURITY AUDIT');
  console.log('=================');
  
  const issues = [];
  
  // Test 1: Check CORS configuration
  console.log('\n1. Testing CORS configuration...');
  const corsTest = await makeRequest('OPTIONS', '/auth/me', null, '', {
    'Origin': 'http://malicious-site.com'
  });
  
  // Should reject or have proper CORS headers
  console.log('✅ CORS test completed (manual review needed)');
  
  // Test 2: Check cookie security
  console.log('\n2. Testing cookie security...');
  const loginResult = await makeRequest('POST', '/auth/login', {
    email: 'teacher@test.com',
    password: 'password123'
  });
  
  if (loginResult.success) {
    const setCookieHeader = loginResult.headers['set-cookie'];
    if (setCookieHeader) {
      const cookieString = setCookieHeader[0];
      
      if (!cookieString.includes('HttpOnly')) {
        issues.push('CRITICAL: Cookies are not HttpOnly');
      }
      
      if (!cookieString.includes('SameSite')) {
        issues.push('MAJOR: Cookies missing SameSite attribute');
      }
      
      if (cookieString.includes('Secure') && process.env.NODE_ENV !== 'production') {
        // This is expected in development
      } else if (!cookieString.includes('Secure') && process.env.NODE_ENV === 'production') {
        issues.push('CRITICAL: Cookies not marked Secure in production');
      }
      
      console.log('✅ Cookie security attributes checked');
    } else {
      issues.push('CRITICAL: Login does not set cookies');
    }
  }
  
  // Test 3: Check for token exposure in responses
  console.log('\n3. Testing for token exposure...');
  if (loginResult.success && loginResult.data) {
    const responseString = JSON.stringify(loginResult.data);
    if (responseString.includes('token') || responseString.includes('jwt')) {
      issues.push('CRITICAL: JWT token exposed in login response');
    } else {
      console.log('✅ No token exposure in responses');
    }
  }
  
  // Test 4: Test role-based access control
  console.log('\n4. Testing RBAC enforcement...');
  const teacherCookies = loginResult.success ? 
    loginResult.headers['set-cookie']?.map(c => c.split(';')[0]).join('; ') : '';
  
  // Student login
  const studentLogin = await makeRequest('POST', '/auth/login', {
    email: 'student@test.com',
    password: 'password123'
  });
  
  const studentCookies = studentLogin.success ? 
    studentLogin.headers['set-cookie']?.map(c => c.split(';')[0]).join('; ') : '';
  
  // Test student trying to create classroom
  const studentCreateClassroom = await makeRequest('POST', '/classrooms', {
    name: 'Unauthorized Classroom'
  }, studentCookies);
  
  if (studentCreateClassroom.success) {
    issues.push('CRITICAL: Student can create classrooms (RBAC bypass)');
  } else if (studentCreateClassroom.status !== 403) {
    issues.push('MAJOR: Wrong status code for unauthorized access');
  } else {
    console.log('✅ RBAC properly blocks unauthorized actions');
  }
  
  // Test 5: Check for SQL injection vulnerabilities (NoSQL injection)
  console.log('\n5. Testing for injection vulnerabilities...');
  const injectionTest = await makeRequest('POST', '/auth/login', {
    email: { $ne: null },
    password: { $ne: null }
  });
  
  if (injectionTest.success) {
    issues.push('CRITICAL: NoSQL injection vulnerability in login');
  } else {
    console.log('✅ NoSQL injection attempts blocked');
  }
  
  // Test 6: Check rate limiting
  console.log('\n6. Testing rate limiting...');
  const rateLimitPromises = [];
  for (let i = 0; i < 35; i++) { // Exceed the 30 request limit
    rateLimitPromises.push(makeRequest('POST', '/auth/login', {
      email: 'nonexistent@test.com',
      password: 'wrong'
    }));
  }
  
  const rateLimitResults = await Promise.all(rateLimitPromises);
  const rateLimited = rateLimitResults.some(r => r.status === 429);
  
  if (!rateLimited) {
    issues.push('MAJOR: Rate limiting not working properly');
  } else {
    console.log('✅ Rate limiting is active');
  }
  
  // Test 7: Check for information disclosure
  console.log('\n7. Testing for information disclosure...');
  const nonExistentUser = await makeRequest('POST', '/auth/login', {
    email: 'nonexistent@test.com',
    password: 'password123'
  });
  
  if (nonExistentUser.error && 
      (nonExistentUser.error.error?.includes('User not found') || 
       nonExistentUser.error.message?.includes('User not found'))) {
    issues.push('MINOR: Login reveals whether user exists');
  } else {
    console.log('✅ No user enumeration vulnerability');
  }
  
  // Test 8: Check password requirements
  console.log('\n8. Testing password requirements...');
  const weakPasswordTest = await makeRequest('POST', '/auth/register', {
    name: 'Test User',
    email: 'weakpass@test.com',
    password: '123',
    role: 'student'
  });
  
  if (weakPasswordTest.success) {
    issues.push('MAJOR: Weak passwords are accepted');
  } else {
    console.log('✅ Password requirements enforced');
  }
  
  return issues;
}

auditSecurity().then(issues => {
  console.log('\n📊 SECURITY AUDIT RESULTS:');
  if (issues.length === 0) {
    console.log('✅ No security issues found');
  } else {
    console.log(`❌ Found ${issues.length} security issues:`);
    issues.forEach(issue => console.log(`  - ${issue}`));
  }
});