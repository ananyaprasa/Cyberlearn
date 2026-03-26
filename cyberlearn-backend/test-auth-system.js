#!/usr/bin/env node

/**
 * Authentication System Audit
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
      cookies: responseCookies,
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

async function auditAuthSystem() {
  console.log('🔐 AUTHENTICATION SYSTEM AUDIT');
  console.log('================================');
  
  const issues = [];
  const testEmail = `audit${Date.now()}@test.com`;
  
  // Test 1: Login sets httpOnly cookie
  console.log('\n1. Testing login cookie setting...');
  const loginResult = await makeRequest('POST', '/auth/login', {
    email: 'teacher@test.com',
    password: 'password123'
  });
  
  if (!loginResult.success) {
    issues.push('CRITICAL: Login endpoint not working');
    console.log('❌ Login failed');
  } else if (!loginResult.cookies || !loginResult.cookies.includes('token=')) {
    issues.push('CRITICAL: Login does not set httpOnly cookie');
    console.log('❌ No token cookie set');
  } else {
    console.log('✅ Login sets cookie correctly');
  }
  
  const cookies = loginResult.cookies || '';
  
  // Test 2: /auth/me with cookie
  console.log('\n2. Testing /auth/me with cookie...');
  const meResult = await makeRequest('GET', '/auth/me', null, cookies);
  
  if (!meResult.success) {
    issues.push('CRITICAL: /auth/me fails with valid cookie');
    console.log('❌ /auth/me failed');
  } else if (!meResult.data?.data?.role) {
    issues.push('CRITICAL: /auth/me missing user role');
    console.log('❌ Missing role in response');
  } else {
    console.log('✅ /auth/me works with cookie');
  }
  
  // Test 3: Protected route with cookie
  console.log('\n3. Testing protected route with cookie...');
  const protectedResult = await makeRequest('GET', '/classrooms', null, cookies);
  
  if (!protectedResult.success && protectedResult.status !== 200) {
    issues.push('MAJOR: Protected routes may not accept cookies properly');
    console.log('❌ Protected route failed with cookie');
  } else {
    console.log('✅ Protected routes accept cookies');
  }
  
  // Test 4: Logout clears cookie
  console.log('\n4. Testing logout cookie clearing...');
  const logoutResult = await makeRequest('POST', '/auth/logout', null, cookies);
  
  if (!logoutResult.success) {
    issues.push('MAJOR: Logout endpoint not working');
    console.log('❌ Logout failed');
  } else {
    // Test if session is cleared by sending no cookies (simulating browser behavior)
    const postLogoutMe = await makeRequest('GET', '/auth/me', null, '');
    if (postLogoutMe.success) {
      issues.push('CRITICAL: Logout does not clear session');
      console.log('❌ Session still valid after logout');
    } else {
      console.log('✅ Logout clears session');
    }
  }
  
  // Test 5: Invalid token handling
  console.log('\n5. Testing invalid token handling...');
  const invalidTokenResult = await makeRequest('GET', '/auth/me', null, 'token=invalid');
  
  if (invalidTokenResult.success) {
    issues.push('CRITICAL: Invalid tokens are accepted');
    console.log('❌ Invalid token accepted');
  } else if (invalidTokenResult.status !== 401) {
    issues.push('MINOR: Invalid token returns wrong status code');
    console.log('❌ Wrong status for invalid token');
  } else {
    console.log('✅ Invalid tokens properly rejected');
  }
  
  return issues;
}

auditAuthSystem().then(issues => {
  console.log('\n📊 AUTHENTICATION AUDIT RESULTS:');
  if (issues.length === 0) {
    console.log('✅ Authentication system is secure');
  } else {
    console.log(`❌ Found ${issues.length} issues:`);
    issues.forEach(issue => console.log(`  - ${issue}`));
  }
});