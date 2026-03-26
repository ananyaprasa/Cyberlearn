// Simple test script to verify backend endpoints
import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:5000';

async function testEndpoints() {
  console.log('🧪 Testing Backend Endpoints...\n');

  // Test 1: Health check
  try {
    const response = await fetch(`${BASE_URL}/`);
    const data = await response.json();
    console.log('✅ Health Check:', data.message);
  } catch (error) {
    console.log('❌ Health Check Failed:', error.message);
  }

  // Test 2: Get assignments (no auth)
  try {
    const response = await fetch(`${BASE_URL}/api/assignments`);
    const data = await response.json();
    console.log('✅ Get Assignments (no auth):', data.success ? 'Success' : 'Failed');
  } catch (error) {
    console.log('❌ Get Assignments Failed:', error.message);
  }

  // Test 3: Get classrooms (no auth)
  try {
    const response = await fetch(`${BASE_URL}/api/classrooms`);
    const data = await response.json();
    console.log('✅ Get Classrooms (no auth):', data.success ? 'Success' : 'Failed');
  } catch (error) {
    console.log('❌ Get Classrooms Failed:', error.message);
  }

  // Test 4: Get content (public)
  try {
    const response = await fetch(`${BASE_URL}/api/content`);
    const data = await response.json();
    console.log('✅ Get Content (public):', data.success ? 'Success' : 'Failed');
  } catch (error) {
    console.log('❌ Get Content Failed:', error.message);
  }

  console.log('\n🎉 Backend endpoint tests completed!');
}

// Run tests if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  testEndpoints();
}

export default testEndpoints;