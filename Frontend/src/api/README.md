# API Layer Documentation

## Overview
This directory contains the centralized API layer using Axios for all backend communication. It replaces scattered fetch calls with a consistent, maintainable approach.

## Files Structure
```
src/api/
├── axiosInstance.js    # Configured Axios instance with interceptors
├── apiService.js       # Centralized API methods for all endpoints
├── contentapi.js       # Legacy content API (updated to use apiService)
└── README.md          # This documentation
```

## Installation
Make sure axios is installed:
```bash
npm install axios
```

## Usage Examples

### 1. Basic API Calls

```javascript
import apiService from '../api/apiService';

// Content API
const lessons = await apiService.content.getByCategory('Cryptography');
const lesson = await apiService.content.getById('lesson-id');

// Assignments API
const assignments = await apiService.assignments.getAll();
const newAssignment = await apiService.assignments.create({
  title: 'New Assignment',
  description: 'Assignment description',
  points: 100
});

// Classrooms API
const classrooms = await apiService.classrooms.getAll();
const newClassroom = await apiService.classrooms.create({
  name: 'My Classroom',
  description: 'Classroom description'
});
```

### 2. Error Handling

```javascript
import apiService from '../api/apiService';

try {
  const assignments = await apiService.assignments.getAll();
  setAssignments(assignments);
} catch (error) {
  console.error('Failed to load assignments:', error.message);
  setError(error.message);
}
```

### 3. Using in React Components

```javascript
import { useState, useEffect } from 'react';
import apiService from '../api/apiService';

function AssignmentsList() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAssignments = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await apiService.assignments.getAll();
        setAssignments(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadAssignments();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {assignments.map(assignment => (
        <div key={assignment.id}>{assignment.title}</div>
      ))}
    </div>
  );
}
```

### 4. Authentication Token Handling

The Axios instance automatically handles JWT tokens:

```javascript
// Tokens are automatically attached from localStorage:
// - 'authToken'
// - 'googleToken' 
// - 'token'

// Manual token management (if needed):
localStorage.setItem('authToken', 'your-jwt-token');

// The interceptor will automatically add:
// Authorization: Bearer your-jwt-token
```

### 5. API Response Format

All API calls return the data directly (unwrapped from backend response):

```javascript
// Backend returns: { success: true, data: [...] }
// apiService returns: [...] (just the data)

const assignments = await apiService.assignments.getAll();
// assignments is already the array, not { success: true, data: [...] }
```

## Available APIs

### Content API
- `content.getAll(params)` - Get all content with optional params
- `content.getByCategory(category)` - Get content by category
- `content.getById(id)` - Get specific content by ID

### Assignments API
- `assignments.getAll(classroomId?)` - Get all assignments (optionally filtered by classroom)
- `assignments.getById(id)` - Get specific assignment
- `assignments.create(data)` - Create new assignment
- `assignments.update(id, data)` - Update assignment
- `assignments.delete(id)` - Delete assignment

### Submissions API
- `submissions.create(data)` - Create new submission
- `submissions.getByAssignment(assignmentId)` - Get submissions for assignment
- `submissions.getByStudent(userId)` - Get student's submissions
- `submissions.grade(id, gradeData)` - Grade a submission

### Classrooms API
- `classrooms.getAll()` - Get all classrooms
- `classrooms.create(data)` - Create new classroom
- `classrooms.join(code)` - Join classroom with code
- `classrooms.leave(id)` - Leave classroom
- `classrooms.delete(id)` - Delete classroom

### Users API
- `users.getProfile()` - Get user profile
- `users.updateProfile(data)` - Update user profile
- `users.getStats()` - Get user statistics

### Auth API
- `auth.login(credentials)` - Login user
- `auth.register(userData)` - Register new user
- `auth.logout()` - Logout user
- `auth.verifyToken()` - Verify JWT token

## Configuration

### Axios Instance Configuration
```javascript
// Base URL
baseURL: 'http://localhost:5000/api'

// Timeout
timeout: 10000 // 10 seconds

// Headers
'Content-Type': 'application/json'
'Accept': 'application/json'
'Authorization': 'Bearer {token}' // Auto-added if token exists
```

### Error Handling
- **401 Unauthorized**: Automatically clears tokens and can redirect to login
- **403 Forbidden**: Logs warning
- **404 Not Found**: Logs warning
- **500+ Server Errors**: Logs error
- **Network Errors**: Logs network error
- **Timeout**: Logs timeout error

## Migration from Fetch

### Before (fetch):
```javascript
const response = await fetch('http://localhost:5000/api/assignments');
const data = await response.json();
if (!response.ok) {
  throw new Error('Failed to fetch');
}
```

### After (apiService):
```javascript
const data = await apiService.assignments.getAll();
// Error handling is automatic
```

## Development vs Production

### Development
- Detailed console logging for requests/responses
- Error details logged to console

### Production
- Remove console.log statements
- Consider using environment variables for API base URL

```javascript
// Environment-based configuration
const API_BASE = process.env.NODE_ENV === 'production' 
  ? 'https://your-production-api.com/api'
  : 'http://localhost:5000/api';
```

## Best Practices

1. **Always use try-catch** when calling API methods
2. **Handle loading states** in components
3. **Display user-friendly error messages**
4. **Use the centralized apiService** instead of direct axios calls
5. **Keep API logic separate** from component logic
6. **Use consistent error handling** patterns across components

## Troubleshooting

### Common Issues

1. **Network Error**: Backend server not running
   - Start backend: `npm run dev` in backend directory

2. **401 Unauthorized**: Token expired or missing
   - Check localStorage for valid token
   - Re-authenticate user

3. **CORS Issues**: Cross-origin requests blocked
   - Ensure backend CORS is configured for frontend URL

4. **Timeout**: Request taking too long
   - Check backend performance
   - Increase timeout in axiosInstance.js if needed

### Debug Mode
Enable detailed logging by checking browser console for:
- 🚀 API Request logs
- ✅ API Response logs  
- ❌ API Error logs