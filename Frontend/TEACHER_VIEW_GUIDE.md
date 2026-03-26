# Teacher View - Complete Guide

## 🎓 Overview

The teacher view provides comprehensive tools for managing assignments, grading submissions, and tracking student progress. Teachers have access to different features and statistics compared to students.

## 📊 Teacher Dashboard - Assignments

### Teacher Statistics

When logged in as a teacher, you'll see:

```
┌─────────────────────────────────────────────────┐
│  📚 Assignments                                 │
│                                                 │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────┐│
│  │    5     │ │    12    │ │    3     │ │ 9  ││
│  │  Total   │ │  Total   │ │ Pending  │ │Grad││
│  │Assignmts │ │Submissns │ │ Grading  │ │ed  ││
│  └──────────┘ └──────────┘ └──────────┘ └────┘│
└─────────────────────────────────────────────────┘
```

**Stats Explained:**
- **Total Assignments**: Number of assignments you've created
- **Total Submissions**: All submissions from all students
- **Pending Grading**: Submissions waiting to be graded
- **Graded**: Submissions you've already graded

### Assignment Cards (Teacher View)

Each assignment card shows:

```
┌─────────────────────────────────────┐
│  Network Security Analysis          │
│  Network Security                   │
│                                     │
│  Analyze network traffic...         │
│                                     │
│  🏆 100 pts  ⏰ 5 days left         │
│  ─────────────────────────────────  │
│  📝 12 submissions                  │
│  ⏳ 3 pending                       │
└─────────────────────────────────────┘
```

**Information Displayed:**
- Assignment title and category
- Description
- Points and deadline
- **📝 Submissions count**: Total submissions received
- **⏳ Pending count**: Submissions needing grading

## 🎯 Teacher Features

### 1. Create Assignments

**Two Methods:**

#### Quick Add (Fast Creation)
- Click "+ Quick Add" button
- Fill in essential fields:
  - Title
  - Description
  - Category
  - Points
  - Deadline
- Inline form on main page
- Perfect for quick assignments

#### Full Form (Detailed Creation)
- Click "+ Full Form" button
- Navigate to `/assignments/create`
- More options:
  - File type restrictions
  - Link submission toggle
  - Detailed settings
- Better for complex assignments

### 2. View Submissions

**From Assignment Card:**
- Click on any assignment
- See list of all student submissions
- View submission details:
  - Student name
  - Submission time
  - Status (Submitted/Graded)
  - Content (text, links, files)

**Submission List View:**
```
┌─────────────────────────────────────┐
│  Student Submissions (12)           │
│                                     │
│  ┌───────────────────────────────┐ │
│  │ John Doe          Pending     │ │
│  │ Submitted: 2 hours ago        │ │
│  └───────────────────────────────┘ │
│                                     │
│  ┌───────────────────────────────┐ │
│  │ Jane Smith        Graded: 85  │ │
│  │ Submitted: 1 day ago          │ │
│  └───────────────────────────────┘ │
└─────────────────────────────────────┘
```

### 3. Grade Submissions

**Grading Process:**

1. **Navigate to Submission**
   - Click assignment
   - Click student submission
   - Or go to `/assignments/:id/grade/:submissionId`

2. **Review Student Work**
   - Read text answer
   - Check submitted links
   - View file list
   - See submission timestamp

3. **Assign Grade**
   - Enter grade (0 to max points)
   - Validation: Must be within range
   - Required field

4. **Provide Feedback**
   - Write detailed feedback
   - Explain grade reasoning
   - Suggest improvements
   - Optional but recommended

5. **Submit Grade**
   - Click "Submit Grade"
   - Student can immediately see grade
   - Status changes to "Graded"

**Grading Interface:**
```
┌─────────────────────────────────────┐
│  Grade Submission                   │
│                                     │
│  Student: John Doe                  │
│  Assignment: Network Security       │
│  Max Points: 100                    │
│                                     │
│  ┌─ Student Submission ───────────┐│
│  │ Answer: [Student's text]       ││
│  │ Link: [URL if provided]        ││
│  │ Files: [List of files]         ││
│  └────────────────────────────────┘│
│                                     │
│  Grade (0-100): [____]              │
│  Feedback: [________________]       │
│                                     │
│  [Submit Grade]                     │
└─────────────────────────────────────┘
```

### 4. Manage Assignments

**Edit Assignment:**
- Click assignment
- Click "✏️ Edit Assignment"
- Modify details
- Save changes

**Delete Assignment:**
- Click assignment
- Click "🗑️ Delete Assignment"
- Confirm deletion
- Assignment removed (cannot be undone)

## 🏫 Teacher View - Classrooms

### Classroom Management

**Create Classroom:**
```
1. Go to /classrooms
2. Click "+ Create Classroom"
3. Fill in:
   - Classroom Name
   - Description
   - Subject
4. Click "Create"
5. Receive 6-character code
6. Share code with students
```

**Classroom Card (Teacher View):**
```
┌─────────────────────────────────────┐
│  Cybersecurity 101      ABC123      │
│                                     │
│  Learn cybersecurity fundamentals   │
│                                     │
│  📚 Cybersecurity                   │
│  👥 25 students                     │
│  📝 5 assignments                   │
└─────────────────────────────────────┘
```

**Shows:**
- Classroom name and code
- Description
- Subject
- Student count
- Assignment count

### Classroom Detail (Teacher View)

**Tabs Available:**
1. **Assignments Tab**
   - All assignments for this classroom
   - Create new assignment
   - Assign existing assignment
   - View submissions

2. **Students Tab**
   - List of enrolled students
   - Student names and emails
   - Enrollment dates
   - Remove students (if needed)

3. **Settings Tab** (if implemented)
   - Edit classroom details
   - Change description
   - Update subject
   - Delete classroom

## 📈 Teacher Analytics

### Assignment Analytics

**Per Assignment:**
- Total submissions
- Pending grading count
- Average grade (after grading)
- Submission rate
- On-time vs late submissions

### Classroom Analytics

**Per Classroom:**
- Total students
- Active students
- Assignment completion rate
- Average grades
- Student progress

## 🎨 Visual Differences

### Color Coding

**Teacher Stats:**
- Green theme: `rgba(45, 214, 143, 0.1)`
- Green borders and text
- Distinct from student blue/teal

**Student Stats:**
- Teal theme: `rgba(2, 168, 154, 0.1)`
- Standard color scheme

### Icons

**Teacher-Specific:**
- 👨‍🏫 Teacher role indicator
- 📝 Submissions count
- ⏳ Pending grading
- ✏️ Edit actions
- 🗑️ Delete actions

**Student-Specific:**
- 👨‍🎓 Student role indicator
- ✓ Submitted status
- 🏆 Points earned
- 📊 Progress tracking

## 🔐 Teacher Permissions

### What Teachers Can Do:

**Assignments:**
- ✅ Create assignments
- ✅ Edit assignments
- ✅ Delete assignments
- ✅ View all submissions
- ✅ Grade submissions
- ✅ Provide feedback
- ✅ See submission statistics

**Classrooms:**
- ✅ Create classrooms
- ✅ Generate classroom codes
- ✅ View enrolled students
- ✅ Remove students
- ✅ Delete classrooms
- ✅ Assign assignments to classrooms

### What Teachers Cannot Do:

**Assignments:**
- ❌ Submit assignments (teacher role)
- ❌ See student-specific stats
- ❌ Use student filter tabs

**Classrooms:**
- ❌ Join classrooms as student
- ❌ Submit work in classrooms

## 🧪 Testing Teacher View

### How to Test:

1. **Register as Teacher:**
   - Go to `/auth`
   - Click "Create one"
   - Fill in details
   - Select "👨‍🏫 Teacher" role
   - Register

2. **Create Assignment:**
   - Go to `/assignments`
   - See teacher stats (green cards)
   - Click "+ Quick Add"
   - Create test assignment

3. **Test Grading:**
   - Have a student submit (or use guest)
   - Click assignment
   - See submission list
   - Click submission
   - Grade it

4. **Create Classroom:**
   - Go to `/classrooms`
   - Click "+ Create Classroom"
   - Fill in details
   - Get classroom code
   - Share with students

### Quick Test Accounts:

**Teacher Account:**
```
Email: teacher@cyberlearn.com
Password: teacher123
Role: Teacher
```

**Student Account:**
```
Email: student@cyberlearn.com
Password: student123
Role: Student
```

## 📋 Teacher Workflow

### Typical Teacher Workflow:

```
1. Create Classroom
   ↓
2. Share classroom code with students
   ↓
3. Create assignments for classroom
   ↓
4. Students submit work
   ↓
5. Review submissions
   ↓
6. Grade and provide feedback
   ↓
7. Students see grades
   ↓
8. Track class progress
   ↓
9. Create more assignments
```

### Assignment Workflow:

```
1. Click "+ Quick Add" or "+ Full Form"
   ↓
2. Fill in assignment details
   ↓
3. Set deadline and points
   ↓
4. Create assignment
   ↓
5. Students see and submit
   ↓
6. View submissions (📝 count)
   ↓
7. Click pending submissions (⏳ count)
   ↓
8. Grade each submission
   ↓
9. Provide feedback
   ↓
10. Submit grade
```

## 💡 Best Practices

### For Teachers:

1. **Clear Instructions**: Write detailed assignment descriptions
2. **Reasonable Deadlines**: Give students enough time
3. **Timely Grading**: Grade submissions promptly
4. **Constructive Feedback**: Help students improve
5. **Consistent Grading**: Use rubrics or standards
6. **Track Progress**: Monitor submission rates
7. **Communicate**: Use feedback to guide students

### Assignment Creation:

1. **Specific Titles**: Clear, descriptive names
2. **Detailed Descriptions**: What students should do
3. **Point Values**: Reflect assignment difficulty
4. **File Types**: Specify allowed formats
5. **Categories**: Organize by topic
6. **Deadlines**: Consider student workload

### Grading:

1. **Review Thoroughly**: Read all submissions carefully
2. **Fair Grading**: Apply consistent standards
3. **Detailed Feedback**: Explain grades
4. **Positive Tone**: Encourage improvement
5. **Timely**: Grade within reasonable time
6. **Track Patterns**: Notice common issues

## 🎯 Summary

The teacher view provides:

1. **Comprehensive Stats**: Track all assignments and submissions
2. **Easy Creation**: Quick Add and Full Form options
3. **Submission Management**: View and grade all student work
4. **Classroom Control**: Create and manage classrooms
5. **Student Tracking**: Monitor progress and engagement
6. **Flexible Grading**: Grade with feedback
7. **Visual Distinction**: Green theme for teacher features

Teachers have full control over the learning experience while students focus on completing and learning from assignments!
