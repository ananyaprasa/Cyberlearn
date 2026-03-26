#!/usr/bin/env node

/**
 * API Contract Validation Test
 * Tests all API endpoints for consistent response formats
 */

import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

async function testApiContract(method, url, data = null, expectedStatus = 200, description = '') {
  try {
    const config = {
      method,
      url: `${BASE_URL}${url}`,
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    };
    
    if (data) config.data = data;
    
    const response = await axios(config);
    
    // Check response format
    const hasSuccess = typeof response.data.success === 'boolean';
    const hasData = response.data.hasOwnProperty('data');
    
    if (hasSuccess && hasData) {
      console.log(`✅ ${description}: Correct format { success: ${response.data.success}, data: ... }`);
      return true;
    } else {
      console.log(`❌ ${description}: Wrong format`, Object.keys(response.data));
      return false;
    }
    
  } catch (error) {
    const status = error.response?.status;
    const data = error.response?.data;
    
    if (status === expectedStatus) {
      // Check error format
      const hasSuccess = data && typeof data.success === 'boolean' && data.success === false;
      const hasMessage = data && (data.message || data.error);
      
      if (hasSuccess && hasMessage) {
        console.log(`✅ ${description}: Correct error format { success: false, message/error: ... }`);
        return true;
      } else {
        console.log(`❌ ${description}: Wrong error format`, data);
        return false;
      }
    } else {
      console.log(`❌ ${description}: Unexpected status ${status}, expected ${expectedStatus}`);
      return false;
    }
  }
}

async function runApiContractTests() {
  console.log('🚀 Starting API Contract Validation Tests...');
  
  let passed = 0;
  let total = 0;
  
  // Test public endpoints
  total++; if (await testApiContract('GET', '/content', null, 200, 'GET /content')) passed++;
  total++; if (await testApiContract('GET', '/content/invalid-id', null, 404, 'GET /content/:id (not found)')) passed++;
  
  // Test auth endpoints
  total++; if (await testApiContract('POST', '/auth/login', { email: 'invalid', password: 'short' }, 400, 'POST /auth/login (validation error)')) passed++;
  total++; if (await testApiContract('GET', '/auth/me', null, 401, 'GET /auth/me (unauthorized)')) passed++;
  
  // Test protected endpoints without auth
  total++; if (await testApiContract('POST', '/classrooms', { name: 'Test' }, 401, 'POST /classrooms (unauthorized)')) passed++;
  total++; if (await testApiContract('POST', '/assignments', { title: 'Test' }, 401, 'POST /assignments (unauthorized)')) passed++;
  total++; if (await testApiContract('POST', '/submissions', { assignmentId: 'test' }, 401, 'POST /submissions (unauthorized)')) passed++;
  
  // Test invalid routes
  total++; if (await testApiContract('GET', '/invalid-route', null, 404, 'GET /invalid-route (not found)')) passed++;
  
  console.log(`\n📊 API Contract Test Results: ${passed}/${total} passed`);
  
  if (passed === total) {
    console.log('✅ All API contracts are consistent!');
  } else {
    console.log('❌ Some API contracts are inconsistent');
  }
  
  return passed === total;
}

runApiContractTests();