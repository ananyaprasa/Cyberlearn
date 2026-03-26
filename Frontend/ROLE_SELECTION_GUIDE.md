# Role Selection Feature - User Guide

## 🎭 Overview

The authentication system now includes role selection during registration, allowing users to specify whether they are a Student, Teacher, or Admin.

## ✨ Features

### Role Options:
1. **👨‍🎓 Student** (Default)
   - Can view and submit assignments
   - Can see grades and feedback
   - Cannot create or grade assignments

2. **👨‍🏫 Teacher**
   - Can create, edit, and delete assignments
   - Can view all student submissions
   - Can grade assignments and provide feedback
   - Has all student permissions

3. **👨‍💼 Admin**
   - Has all teacher permissions
   - Can manage the system
   - Full access to all features

## 🚀 How to Use

### Creating a New Account:

1. **Go to Login Page**: Navigate to `/auth`

2. **Switch to Signup**: Click "Create one" link

3. **Fill in Details**:
   - Username: Your display name
   - Email: Your email address
   - Password: Choose a secure password

4. **Select Your Role**:
   - Click on one of the three role options
   - Student is selected by default
   - The selected role will be highlighted in green

5. **Register**: Click the "Register" button

6. **Automatic Login**: You'll be logged in and redirected to the dashboard

### Role Selection UI:

```
┌─────────────────────────────────────┐
│  I am a:                            │
│                                     │
│  ┌────────┐  ┌────────┐  ┌────────┐│
│  │   👨‍🎓   │  │   👨‍🏫   │  │   👨‍💼   ││
│  │ Student│  │ Teacher│  │  Admin ││
│  └────────┘  └────────┘  └────────┘│
└─────────────────────────────────────┘
```

## 🎨 Visual Feedback

### Default State:
- All roles have a subtle background
- White border with low opacity

### Hover State:
- Background becomes slightly brighter
- Border becomes more visible
- Card lifts up slightly

### Selected State:
- Green background glow
- Green border
- Green text color
- Box shadow effect

## 🔐 Role Persistence

### How Roles Are Stored:

1. **During Registration**:
   ```javascript
   {
     email: "user@example.com",
     name: "John Doe",
     role: "student", // or "teacher" or "admin"
     picture: "avatar-url"
   }
   ```

2. **Stored in localStorage**:
   - Key: `user`
   - Contains full user object with role

3. **Loaded on App Start**:
   - AuthContext reads from localStorage
   - Role is available throughout the app

## 🎯 Role-Based Features

### Student Features:
- ✅ View assignments
- ✅ Submit assignments
- ✅ View grades and feedback
- ✅ Track progress with stats
- ❌ Cannot create assignments
- ❌ Cannot grade submissions

### Teacher Features:
- ✅ All student features
- ✅ Create assignments (Quick Add & Full Form)
- ✅ View all student submissions
- ✅ Grade assignments
- ✅ Provide feedback
- ✅ Edit/delete assignments

### Admin Features:
- ✅ All teacher features
- ✅ Full system access
- ✅ Can manage all content

## 🧪 Testing Different Roles

### Test as Student:
1. Register with role: Student
2. Go to `/assignments`
3. Should NOT see "Create Assignment" buttons
4. Can submit assignments

### Test as Teacher:
1. Register with role: Teacher
2. Go to `/assignments`
3. Should see "Quick Add" and "Full Form" buttons
4. Can create and grade assignments

### Test as Admin:
1. Register with role: Admin
2. Has all teacher permissions
3. Can access all features

## 🔄 Quick Login Accounts

Pre-configured accounts for testing:

### Teacher Account:
- Email: `teacher@cyberlearn.com`
- Password: `teacher123`
- Role: Teacher
- Name: Dr. Sarah Johnson

### Student Account:
- Email: `student@cyberlearn.com`
- Password: `student123`
- Role: Student
- Name: Alex Chen

## 📱 Responsive Design

### Desktop View:
- Three roles displayed horizontally
- Icons and text stacked vertically
- Adequate spacing between options

### Mobile View:
- Roles stack vertically
- Icons and text displayed horizontally
- Full width for easy tapping

## 🎨 Styling Details

### Colors:
- Default: `rgba(255, 255, 255, 0.08)`
- Hover: `rgba(255, 255, 255, 0.12)`
- Selected: `rgba(45, 214, 143, 0.15)`
- Border Selected: `rgba(45, 214, 143, 0.5)`

### Animations:
- Smooth transitions (0.3s ease)
- Hover lift effect (translateY -2px)
- Box shadow on selection

### Typography:
- Role label: 0.9rem, medium weight
- Role text: 0.85rem, medium weight
- Selected text: 0.85rem, semi-bold, green

## 🐛 Troubleshooting

### Role Not Saving:
1. Check browser console for errors
2. Verify localStorage is enabled
3. Try clearing browser data and registering again

### Role Not Showing Correct Permissions:
1. Go to `/assignments/debug`
2. Check "Role" field
3. Should show: 👨‍🎓 Student, 👨‍🏫 Teacher, or 👨‍💼 Admin
4. If incorrect, logout and login again

### Can't Select Role:
1. Make sure you're on the signup form (not login)
2. Click directly on the role card
3. Try refreshing the page

## 💡 Tips

1. **Default Selection**: Student is selected by default for safety
2. **Visual Feedback**: Selected role has green highlight
3. **Easy Switching**: Can change role before clicking Register
4. **Persistent**: Role persists across sessions
5. **Debug Panel**: Use `/assignments/debug` to verify role

## 🔧 Technical Details

### Role Detection Logic:
```javascript
const isTeacher = () => {
  return user?.role === 'teacher' || 
         user?.role === 'admin' || 
         user?.email?.includes('teacher');
};
```

### Role Storage:
```javascript
// Stored in localStorage
localStorage.setItem('user', JSON.stringify({
  email: email,
  name: username,
  role: role, // 'student', 'teacher', or 'admin'
  picture: avatarUrl
}));
```

### Role Loading:
```javascript
// Loaded on app start
const savedUser = localStorage.getItem('user');
const userData = JSON.parse(savedUser);
// userData.role is now available
```

## 📋 Checklist for Testing

- [ ] Can see role selector on signup form
- [ ] Student is selected by default
- [ ] Can click to select Teacher
- [ ] Can click to select Admin
- [ ] Selected role has green highlight
- [ ] Can register with selected role
- [ ] Role persists after login
- [ ] Teacher can create assignments
- [ ] Student cannot create assignments
- [ ] Admin has teacher permissions
- [ ] Role shows correctly in debug panel

## 🎉 Summary

The role selection feature provides:
- Clear visual interface for choosing roles
- Default to Student for safety
- Persistent role storage
- Role-based permissions throughout the app
- Easy testing with visual feedback

Users can now properly identify themselves during registration, and the system will grant appropriate permissions based on their role!
