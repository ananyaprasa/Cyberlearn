# Assignment System - Troubleshooting Guide

## ❌ "Failed to submit assignment" Error

### Cause
This error occurs when you're not logged in or your user session is invalid.

### Solution

#### Step 1: Check if you're logged in
1. Go to `/assignments/debug`
2. Look at "Current User Info" section
3. Check if "Authenticated" shows ✅ Yes or ❌ No

#### Step 2: If not authenticated
1. Click "Go to Login" button in debug panel
2. Or navigate to `/auth`
3. Login with Google or create an account
4. Return to assignments page

#### Step 3: Verify login
1. After logging in, check the navbar
2. You should see your profile picture and name
3. Go back to debug panel to confirm authentication

#### Step 4: Try submitting again
1. Navigate to the assignment
2. Fill in at least one field (text, link, or file)
3. Click "Submit Assignment"
4. You should see "Assignment submitted successfully!"

---

## 🔍 Common Issues & Solutions

### Issue: "You must be logged in to submit assignments"

**Cause:** Not authenticated

**Solution:**
1. Click the "Go to Login" button that appears
2. Login with your account
3. Return to the assignment page
4. Try submitting again

---

### Issue: Stats not updating after submission

**Cause:** Page needs refresh to show updated data

**Solution:**
1. After successful submission, refresh the page (F5)
2. Or the page will auto-refresh after submission
3. Check the stats dashboard for updated numbers

---

### Issue: Can't see "Create Assignment" button

**Cause:** You're logged in as a student, not a teacher

**Solution:**
1. Logout from current account
2. Login with an email containing "teacher"
   - Example: `teacher@test.com`
   - Example: `john.teacher@school.edu`
3. Return to assignments page
4. You should now see "Quick Add" and "Full Form" buttons

---

### Issue: No assignments showing

**Cause:** No assignments have been created yet

**Solution:**
1. Go to `/assignments/debug`
2. Click "➕ Add 3 Sample Assignments"
3. Return to assignments page
4. You should see 3 sample assignments

---

### Issue: Submit button does nothing

**Possible Causes:**
1. Not logged in
2. All fields are empty
3. JavaScript error

**Solutions:**

**Check 1: Login Status**
- Go to debug panel
- Verify you're authenticated
- If not, login first

**Check 2: Form Fields**
- Fill in at least ONE of these:
  - Text answer
  - Link
  - Upload a file
- You can't submit with all fields empty

**Check 3: Browser Console**
- Press F12 to open DevTools
- Click "Console" tab
- Look for red error messages
- Share the error message for help

---

### Issue: "Assignment not found"

**Cause:** Invalid assignment ID or assignment was deleted

**Solution:**
1. Go back to `/assignments`
2. Click on a different assignment
3. If no assignments exist, add sample assignments from debug panel

---

### Issue: Can't upload files

**Cause:** This is expected - file upload is simulated

**Note:**
- The system stores file metadata (name, size, type)
- Actual file content is not stored
- This is a frontend-only demo
- Files are not actually uploaded to a server

**What works:**
- Selecting files
- Seeing file names in the list
- Removing files before submission
- Submitting with file metadata

---

### Issue: Timer shows "NaN" or wrong time

**Cause:** Invalid deadline format

**Solution:**
1. When creating assignments, use the datetime-local input
2. Make sure deadline is in the future
3. If issue persists, delete and recreate the assignment

---

### Issue: Grading doesn't work

**Possible Causes:**
1. Not logged in as teacher
2. Invalid grade value

**Solutions:**

**Check 1: Teacher Role**
- Go to debug panel
- Verify role shows "👨‍🏫 Teacher"
- If not, logout and login with teacher email

**Check 2: Grade Value**
- Grade must be a number
- Grade must be between 0 and max points
- Example: If assignment is worth 100 points, grade must be 0-100

---

## 🔧 Reset Everything

If nothing works, try a complete reset:

1. Go to `/assignments/debug`
2. Click "🗑️ Clear All Data"
3. Confirm the action
4. Page will reload
5. Click "➕ Add 3 Sample Assignments"
6. Logout and login again
7. Try the workflow again

---

## 📋 Testing Checklist

Use this checklist to verify everything works:

### As Student:
- [ ] Can see assignments list
- [ ] Can view assignment details
- [ ] Can submit text answer
- [ ] Can submit link
- [ ] Can upload files
- [ ] See "Assignment submitted successfully!" message
- [ ] Stats update after submission
- [ ] Can see submission status
- [ ] Can view grade after teacher grades
- [ ] Can see teacher feedback

### As Teacher:
- [ ] Can create assignment (Quick Add)
- [ ] Can create assignment (Full Form)
- [ ] Can see all assignments
- [ ] Can view student submissions
- [ ] Can grade submissions
- [ ] Can provide feedback
- [ ] Can delete assignments

---

## 🆘 Still Having Issues?

### Debug Information to Collect:

1. **User Info** (from debug panel):
   - Email
   - Role
   - Authenticated status

2. **Browser Console Errors**:
   - Press F12
   - Go to Console tab
   - Copy any red error messages

3. **What you tried**:
   - Step-by-step what you did
   - What you expected to happen
   - What actually happened

4. **System Info**:
   - Number of assignments (from debug panel)
   - Number of submissions (from debug panel)
   - Browser name and version

### Quick Diagnostic Steps:

```
1. Open browser DevTools (F12)
2. Go to Console tab
3. Type: localStorage.getItem('googleToken')
4. If it returns null, you're not logged in
5. Type: localStorage.getItem('assignments')
6. This shows all assignments data
7. Type: localStorage.getItem('submissions')
8. This shows all submissions data
```

---

## 💡 Pro Tips

1. **Always check debug panel first** - It shows your current state
2. **Use browser console** - Errors will appear there
3. **Refresh after actions** - Some updates need a page refresh
4. **Test with sample data** - Use the sample assignments generator
5. **Clear data if stuck** - Start fresh with the clear data button
6. **Use teacher email** - Must contain "teacher" for teacher role
7. **Check authentication** - Most issues are due to not being logged in

---

## 🎯 Expected Behavior

### Successful Submission Flow:
1. Login with valid account ✅
2. Navigate to assignment ✅
3. Fill in at least one field ✅
4. Click "Submit Assignment" ✅
5. See success alert ✅
6. Page auto-refreshes ✅
7. See submission status on assignment card ✅
8. Stats update (Submitted count increases) ✅

### Successful Grading Flow:
1. Login as teacher ✅
2. Navigate to assignment ✅
3. See list of submissions ✅
4. Click on a submission ✅
5. Enter grade (0 to max points) ✅
6. Enter feedback (optional) ✅
7. Click "Submit Grade" ✅
8. See success alert ✅
9. Return to assignment page ✅
10. See "Graded" badge on submission ✅

---

## 📞 Need More Help?

If you're still experiencing issues:
1. Check all items in this troubleshooting guide
2. Collect the debug information listed above
3. Try the complete reset procedure
4. Test with a fresh browser session (incognito mode)
5. Make sure you're using a modern browser (Chrome, Firefox, Edge)

---

## ⚠️ Known Limitations

These are NOT bugs, they're expected behavior:

1. **File Upload**: Files are not actually uploaded, only metadata is stored
2. **LocalStorage**: Data is stored locally, not on a server
3. **No Backend**: This is a frontend-only implementation
4. **No Email**: No actual emails are sent
5. **No Real Auth**: Using Google OAuth for demo purposes
6. **Page Refresh**: Some actions require page refresh to see updates
7. **Browser Data**: Clearing browser data will delete all assignments

---

Remember: Most issues are solved by:
1. Making sure you're logged in
2. Using the correct role (teacher/student)
3. Refreshing the page
4. Checking the debug panel
