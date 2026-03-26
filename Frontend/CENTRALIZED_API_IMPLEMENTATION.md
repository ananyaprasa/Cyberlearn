# Centralized API Layer Implementation

## ✅ COMPLETED IMPLEMENTATION

### 1. **Axios Instance Configuration**
**File**: `src/api/axiosInstance.js`

**Features Implemented**:
- ✅ Base URL: `http://localhost:5000/api`
- ✅ 10-second timeout handling
- ✅ JSON headers (Content-Type, Accept)
- ✅ Request interceptor for automatic JWT token attachment
- ✅ Response interceptor for global error handling
- ✅ Comprehensive error logging and debugging
- ✅ Token management from multiple localStorage keys
- ✅ Automatic token cleanup on 401 errors

**Configuration**:
```javascript
baseURL: 'http://localhost:5000/api'
timeout: 10000
headers: {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}
```

**Token Sources** (automatically checked):
- `localStorage.getItem('authToken')`
- `localStorage.getItem('googleToken')`
- `localStorage.getItem('token')`

### 2. **Centralized API Service Layer**
**File**: `src/api/apiService.js`

**Complete API Coverage**:
- ✅ **Content API** (5 methods)
- ✅ **Assignments API** (5 methods)
- ✅ **Submissions API** (4 methods)
- ✅ **Classrooms API** (5 methods)
- ✅ **Users API** (3 methods)
- ✅ **Auth API** (4 methods)

**Total**: 26 API methods covering all backend endpoints

### 3. **Updated Existing API Calls**
**Files Updated**:
- ✅ `src/api/contentapi.js` - Updated to use apiService
- ✅ `src/pages/CryptographyDetail.jsx` - Replaced fetch with apiService
- ✅ `src/pages/NetworkSecurityDetail.jsx` - Replaced fetch with apiService
- ✅ `src/pages/OSINTDetail.jsx` - Replaced fetch with apiService
- ✅ `src/pages/ReconnaissanceDetail.jsx` - Replaced fetch with apiService

**Improvements**:
- ✅ Consistent error handling
- ✅ Loading states
- ✅ Better error messages
- ✅ Automatic token management

### 4. **Package Dependencies**
**File**: `package.json`
- ✅ Added `axios: ^1.6.0` dependency

### 5. **Documentation**
**Files Created**:
- ✅ `src/api/README.md` - Comprehensive API usage guide
- ✅ `src/api/MIGRATION_EXAMPLES.md` - Context migration patterns
- ✅ `CENTRALIZED_API_IMPLEMENTATION.md` - This summary

---

## 🔧 API METHODS AVAILABLE

### Content API
```javascript
import apiService from '../api/apiService';

// Get content by category
const lessons = await apiService.content.getByCategory('Cryptography');

// Get specific content
const lesson = await apiService.content.getById('lesson-id');

// Get all content with params
const content = await apiService.content.getAll('?category=OSINT');
```

### Assignments API
```javascript
// Get all assignments
const assignments = await apiService.assignments.getAll();

// Get assignments for specific classroom
const classroomAssignments = await apiService.assignments.getAll('classroom-id');

// Create assignment
const newAssignment = await apiService.assignments.create({
  title: 'New Assignment',
  description: 'Description',
  points: 100,
  deadline: '2024-12-31T23:59:59Z'
});

// Update assignment
const updated = await apiService.assignments.update('assignment-id', {
  title: 'Updated Title'
});

// Delete assignment
await apiService.assignments.delete('assignment-id');
```

### Submissions API
```javascript
// Create submission
const submission = await apiService.submissions.create({
  assignmentId: 'assignment-id',
  textAnswer: 'My answer',
  linkAnswer: 'https://example.com'
});

// Get submissions for assignment
const submissions = await apiService.submissions.getByAssignment('assignment-id');

// Grade submission
const graded = await apiService.submissions.grade('submission-id', {
  grade: 85,
  feedback: 'Good work!'
});
```

### Classrooms API
```javascript
// Get all classrooms
const classrooms = await apiService.classrooms.getAll();

// Create classroom
const classroom = await apiService.classrooms.create({
  name: 'My Classroom',
  description: 'Description',
  subject: 'Cybersecurity'
});

// Join classroom
const result = await apiService.classrooms.join('ABC123');

// Leave classroom
await apiService.classrooms.leave('classroom-id');
```

### Users API
```javascript
// Get user profile
const profile = await apiService.users.getProfile();

// Update profile
const updated = await apiService.users.updateProfile({
  name: 'New Name',
  email: 'new@email.com'
});

// Get user stats
const stats = await apiService.users.getStats();
```

### Auth API
```javascript
// Login
const response = await apiService.auth.login({
  email: 'user@example.com',
  password: 'password'
});

// Register
const response = await apiService.auth.register({
  name: 'User Name',
  email: 'user@example.com',
  password: 'password'
});

// Verify token
const user = await apiService.auth.verifyToken();
```

---

## 🚀 USAGE PATTERNS

### 1. **Basic API Call with Error Handling**
```javascript
import { useState, useEffect } from 'react';
import apiService from '../api/apiService';

function MyComponent() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiService.assignments.getAll();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {data.map(item => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
}
```

### 2. **Form Submission with API**
```javascript
const handleSubmit = async (formData) => {
  try {
    setSubmitting(true);
    const result = await apiService.assignments.create(formData);
    console.log('Created:', result);
    // Handle success (redirect, show message, etc.)
  } catch (error) {
    setError(error.message);
  } finally {
    setSubmitting(false);
  }
};
```

### 3. **Authentication Flow**
```javascript
const handleLogin = async (credentials) => {
  try {
    const response = await apiService.auth.login(credentials);
    // Token is automatically stored by interceptor
    setUser(response.user);
    navigate('/dashboard');
  } catch (error) {
    setError(error.message);
  }
};
```

---

## 🔄 MIGRATION STATUS

### ✅ **COMPLETED**
1. **Axios Instance** - Fully configured with interceptors
2. **API Service Layer** - All 26 endpoints implemented
3. **Content API Integration** - All content pages updated
4. **Error Handling** - Global error management
5. **Token Management** - Automatic JWT handling
6. **Documentation** - Comprehensive guides created

### 🔄 **NEXT STEPS** (Not Done Yet)
1. **Context Migration** - Update AssignmentContext, ClassroomContext, AuthContext
2. **Component Updates** - Update components to use async API calls
3. **Error UI** - Add error boundaries and user-friendly error displays
4. **Loading UI** - Add loading spinners and skeleton screens
5. **Testing** - Test all API integrations with backend

---

## 📋 INSTALLATION INSTRUCTIONS

### 1. Install Dependencies
```bash
cd Frontend
npm install axios
```

### 2. Import and Use
```javascript
// Import the API service
import apiService from '../api/apiService';

// Use any API method
const data = await apiService.assignments.getAll();
```

### 3. Error Handling
```javascript
try {
  const result = await apiService.assignments.create(data);
} catch (error) {
  console.error('API Error:', error.message);
}
```

---

## 🎯 **BENEFITS ACHIEVED**

### 1. **Centralized Configuration**
- Single place to configure base URL, timeout, headers
- Consistent error handling across all API calls
- Automatic token management

### 2. **Better Developer Experience**
- IntelliSense support for all API methods
- Consistent method signatures
- Comprehensive error messages

### 3. **Maintainability**
- Easy to update API endpoints
- Consistent patterns across the application
- Clear separation of concerns

### 4. **Debugging**
- Detailed request/response logging
- Error categorization and handling
- Network issue detection

### 5. **Security**
- Automatic token attachment
- Token cleanup on authentication errors
- Secure header management

---

## 🔍 **DEBUGGING**

### Console Logs
The API layer provides detailed logging:
- 🚀 **Request logs**: Method, URL, data, headers
- ✅ **Success logs**: Status, response data
- ❌ **Error logs**: Status, error message, context

### Common Issues
1. **Network Error**: Backend not running → Start backend server
2. **401 Unauthorized**: Token expired → Re-authenticate
3. **CORS Issues**: Cross-origin blocked → Check backend CORS config
4. **Timeout**: Request too slow → Check backend performance

The centralized API layer is now ready for use. The next step would be to migrate the contexts from localStorage to use these API methods.