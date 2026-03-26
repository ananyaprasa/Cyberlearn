# Assignment System - Quick Start Guide

## 🚀 Getting Started

### 1. Access the Assignment System
Navigate to: `http://localhost:5173/assignments`

### 2. Debug Panel (Important!)
Click the **🛠️ Debug Panel** button on the Assignments page or go to:
`http://localhost:5173/assignments/debug`

This panel lets you:
- View current user role (Teacher/Student)
- See system stats (total assignments, submissions)
- Add 3 sample assignments instantly
- View raw data
- Clear all data

---

## 👨‍🏫 Testing as a Teacher

### Method 1: Use Teacher Email
When logging in, use an email containing "teacher":
- `teacher@cyberlearn.com`
- `john.teacher@example.com`
- `myteacher@school.edu`

### Method 2: Check Current Role
Go to Debug Panel to see if you're a teacher or student.

### Teacher Features:
1. **Quick Add Assignment** - Fast inline form on main page
2. **Full Form** - Detailed form at `/assignments/create`
3. **View All Submissions** - Click any assignment to see student work
4. **Grade Submissions** - Click on a student submission to grade it
5. **Edit/Delete** - Manage assignments from detail page

---

## 👨‍🎓 Testing as a Student

Use any email that doesn't contain "teacher":
- `student@example.com`
- `john@school.edu`

### Student Features:
1. **View Assignments** - See all available assignments
2. **Filter Tabs** - All, Pending, Submitted, Graded
3. **Submit Work** - Text, links, and file uploads
4. **View Grades** - See grades and teacher feedback
5. **Stats Dashboard** - Track your progress

---

## 🎯 Quick Test Workflow

### Step 1: Add Sample Data
1. Go to `/assignments/debug`
2. Click **"➕ Add 3 Sample Assignments"**
3. This creates 3 assignments with different deadlines

### Step 2: Test as Student
1. Go to `/assignments`
2. Click on any assignment
3. Fill in the submission form:
   - Add text answer
   - Add a link (optional)
   - Upload files (optional)
4. Click **Submit Assignment**
5. You should see "Assignment submitted successfully!"

### Step 3: Test as Teacher
1. Log out and log back in with a teacher email
2. Go to `/assignments`
3. Click on an assignment with submissions
4. Click on a student submission
5. Enter a grade (0 to max points)
6. Add feedback
7. Click **Submit Grade**

### Step 4: Verify as Student
1. Log back in as student
2. Go to `/assignments`
3. You should see:
   - Updated stats (Submitted, Graded counts)
   - "Graded" badge on the assignment
   - Grade and feedback visible

---

## 🐛 Troubleshooting

### Submit Button Not Working?
1. Make sure you're logged in
2. Check that you filled at least one field (text, link, or file)
3. Check browser console for errors (F12)
4. Try refreshing the page

### Stats Not Updating?
1. Refresh the page after submitting
2. Check Debug Panel to verify data was saved
3. Make sure you're logged in with the same account

### Can't Create Assignments?
1. Verify you're logged in as a teacher (check Debug Panel)
2. Use an email containing "teacher"
3. Try the Quick Add form first (simpler)

### No Assignments Showing?
1. Go to Debug Panel
2. Click "Add 3 Sample Assignments"
3. Refresh the page

---

## 📊 Understanding the Stats

### For Students:
- **Submitted**: Total assignments you've submitted
- **Graded**: Assignments that have been graded
- **Pending**: Assignments you haven't submitted yet
- **Total Points**: Sum of all your grades

### Filter Tabs:
- **All**: Shows all assignments
- **Pending**: Assignments you haven't submitted
- **Submitted**: Assignments waiting for grading
- **Graded**: Assignments with grades

---

## 🎨 Features Overview

### Timer System
- **Green** (> 7 days): Plenty of time
- **Orange** (2-7 days): Getting close
- **Red** (< 2 days): Urgent!
- **Overdue**: Past deadline (can't submit)

### Submission Types
1. **Text Answer**: Write your solution
2. **Link**: Submit a URL (GitHub, Google Drive, etc.)
3. **Files**: Upload documents (.pdf, .doc, .docx, .txt)

### Grading
- Teachers can grade 0 to max points
- Written feedback is optional but recommended
- Students see grades immediately after grading

---

## 🔧 Data Management

### Clear All Data
Use the Debug Panel to reset everything:
1. Go to `/assignments/debug`
2. Click **"🗑️ Clear All Data"**
3. Confirm the action
4. Page will reload with fresh state

### View Raw Data
Click **"👁️ Show Raw Data"** in Debug Panel to see:
- All assignments (JSON format)
- All submissions (JSON format)
- Useful for debugging

---

## 💡 Tips

1. **Use Debug Panel First**: Always start here to understand the system state
2. **Test Both Roles**: Switch between teacher and student accounts
3. **Sample Assignments**: Use the sample data generator for quick testing
4. **Check Console**: Open browser DevTools (F12) to see any errors
5. **Refresh After Actions**: Some updates may require a page refresh

---

## 🚨 Known Limitations

1. **File Storage**: Files are stored as metadata only (name, size, type), not actual file content
2. **No Real Upload**: File upload is simulated for demo purposes
3. **LocalStorage**: All data is stored locally and will be lost if you clear browser data
4. **No Backend**: This is a frontend-only implementation

---

## 📝 Next Steps

After testing the basic functionality:
1. Try creating custom assignments
2. Test the deadline timer by creating assignments with different deadlines
3. Test file upload with different file types
4. Try grading with different point values
5. Test the filter tabs as a student

---

## 🆘 Need Help?

If something isn't working:
1. Check the Debug Panel first
2. Look at browser console (F12)
3. Try clearing all data and starting fresh
4. Make sure you're using the correct role (teacher/student)
5. Verify you're logged in

---

## 🎓 Example Test Scenario

**Complete Workflow Test:**

1. **Setup** (as Teacher)
   - Login with `teacher@test.com`
   - Go to Debug Panel
   - Add 3 sample assignments

2. **Submit** (as Student)
   - Logout, login with `student@test.com`
   - Go to Assignments
   - Click first assignment
   - Submit with text: "This is my solution"
   - Add link: "https://github.com/mywork"

3. **Grade** (as Teacher)
   - Logout, login as teacher again
   - Go to Assignments
   - Click the assignment
   - Click the student submission
   - Grade: 85/100
   - Feedback: "Good work! Consider adding more details."
   - Submit grade

4. **Verify** (as Student)
   - Logout, login as student
   - Go to Assignments
   - See updated stats
   - Click the graded assignment
   - View grade and feedback

---

Happy Testing! 🎉
