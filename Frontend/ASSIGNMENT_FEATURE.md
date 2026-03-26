# Assignment Feature Documentation

## Overview
A Google Classroom-style assignment system integrated into CyberLearn with role-based access for teachers and students.

## Features Implemented

### 1. Role-Based Access Control
- **Teachers**: Can create, edit, delete assignments and grade submissions
- **Students**: Can view assignments, submit work, and see grades/feedback
- Role detection: Users with email containing "teacher" or role="teacher" are identified as teachers

### 2. Assignment Creation (Teachers Only)
- Title, description, category selection
- Points allocation (customizable)
- Deadline with date/time picker
- File upload settings (allowed file types)
- Link submission toggle
- Route: `/assignments/create`

### 3. Assignment Listing
- Grid view of all assignments
- Filter tabs for students: All, Pending, Submitted, Graded
- Real-time countdown timer for each assignment
- Color-coded deadline indicators (green > 7 days, orange 2-7 days, red < 2 days)
- Stats dashboard showing submitted, graded, pending, and total points
- Route: `/assignments`

### 4. Assignment Submission (Students)
- Text/description input
- Optional link submission
- Multiple file uploads with preview
- File type validation
- Submission disabled after deadline
- Route: `/assignments/:id`

### 5. Grading System (Teachers Only)
- View all student submissions for an assignment
- Grade input (0 to max points)
- Written feedback field
- Submission details display (text, links, files)
- Route: `/assignments/:assignmentId/grade/:submissionId`

### 6. Timer & Deadline Management
- Real-time countdown timer (updates every second)
- Displays: days, hours, minutes, seconds remaining
- "Overdue" status when deadline passes
- Prevents submission after deadline

### 7. File Upload System
- Multiple file selection
- File preview with name and size
- Remove individual files before submission
- File type restrictions based on assignment settings
- Stores file metadata (name, size, type)

### 8. Teacher Feedback
- Text feedback field for each submission
- Visible to students after grading
- Displayed alongside grade

## File Structure

```
src/
├── contexts/
│   └── AssignmentContext.jsx       # State management for assignments
├── pages/
│   ├── Assignments.jsx             # Assignment listing page
│   ├── Assignments.css             # Shared styles
│   ├── AssignmentDetail.jsx        # View/submit assignment
│   ├── AssignmentDetail.css        # Detail page styles
│   ├── CreateAssignment.jsx        # Create new assignment (teachers)
│   └── GradeSubmission.jsx         # Grade student work (teachers)
└── App.jsx                         # Routes configuration
```

## Routes

| Route | Access | Description |
|-------|--------|-------------|
| `/assignments` | All | List all assignments |
| `/assignments/create` | Teachers | Create new assignment |
| `/assignments/:id` | All | View assignment details / Submit work |
| `/assignments/:id/edit` | Teachers | Edit assignment (placeholder) |
| `/assignments/:assignmentId/grade/:submissionId` | Teachers | Grade submission |

## Data Storage

All data is stored in localStorage:
- `assignments` - Array of assignment objects
- `submissions` - Array of submission objects

### Assignment Object Structure
```javascript
{
  id: 'assign-1',
  title: 'Network Security Analysis',
  description: 'Assignment description...',
  category: 'Network Security',
  points: 100,
  deadline: '2024-03-15T23:59:00',
  createdBy: 'teacher@cyberlearn.com',
  createdAt: '2024-03-08T10:00:00',
  attachments: [],
  allowedFileTypes: ['.pdf', '.doc', '.docx', '.txt'],
  allowLinks: true
}
```

### Submission Object Structure
```javascript
{
  id: 'sub-1',
  assignmentId: 'assign-1',
  studentEmail: 'student@example.com',
  studentName: 'John Doe',
  submittedAt: '2024-03-10T14:30:00',
  text: 'My answer...',
  link: 'https://example.com/work',
  files: [{ name: 'report.pdf', size: 1024, type: 'application/pdf' }],
  status: 'submitted', // or 'graded'
  grade: null, // or number
  feedback: null, // or string
  gradedAt: null // or timestamp
}
```

## Context API Methods

### AssignmentContext
- `isTeacher()` - Check if current user is a teacher
- `createAssignment(data)` - Create new assignment
- `updateAssignment(id, updates)` - Update assignment
- `deleteAssignment(id)` - Delete assignment
- `submitAssignment(assignmentId, data)` - Submit student work
- `gradeSubmission(submissionId, grade, feedback)` - Grade submission
- `getSubmissionsForAssignment(assignmentId)` - Get all submissions
- `getStudentSubmission(assignmentId)` - Get current student's submission
- `getStudentStats()` - Get student statistics

## UI Features

### Visual Design
- Glassmorphism cards with backdrop blur
- Gradient accents (teal/green theme)
- Animated hover effects
- Responsive grid layouts
- Status badges with color coding
- Real-time timer updates

### Animations
- Card hover lift effect
- Smooth transitions
- Animated stat counters
- Color-coded deadline warnings

### Responsive Design
- Mobile-friendly layouts
- Flexible grid systems
- Adaptive navigation
- Touch-friendly buttons

## Usage Examples

### For Teachers
1. Navigate to `/assignments`
2. Click "Create Assignment"
3. Fill in assignment details
4. Set deadline and points
5. Students can now see and submit
6. View submissions from assignment detail page
7. Click on a submission to grade it

### For Students
1. Navigate to `/assignments`
2. View available assignments
3. Click on an assignment
4. Submit text, links, or files
5. Wait for teacher to grade
6. View grade and feedback

## Testing

To test as a teacher:
- Use an email containing "teacher" (e.g., teacher@cyberlearn.com)
- Or set user role to "teacher"

To test as a student:
- Use any other email
- Default role is student

## Future Enhancements

Potential additions:
- Assignment edit functionality
- Bulk grading
- Assignment templates
- Due date reminders
- Email notifications
- Rich text editor
- Rubric-based grading
- Peer review system
- Assignment analytics
- Export grades to CSV
- Assignment categories/folders
- Draft submissions
- Resubmission after grading
- Comment threads
- File preview/download
- Plagiarism detection
- Assignment duplication
- Scheduled publishing
