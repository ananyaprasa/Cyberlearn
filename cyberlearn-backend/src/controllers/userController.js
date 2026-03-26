import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Assignment from "../models/Assignment.js";
import Submission from "../models/Submission.js";
import Classroom from "../models/Classroom.js";

// ================= GET USER PROFILE =================
export const getUserProfile = async (req, res) => {
  try {
    // Graceful auth fallback
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        error: "Authentication required" 
      });
    }

    const user = await User.findById(req.user._id)
      .select('-password')
      .populate('enrolledClasses', 'name teacherName joinCode');

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        error: "User not found" 
      });
    }

    // Frontend-compatible response format
    const responseData = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      enrolledClasses: user.enrolledClasses.map(c => ({
        id: c._id.toString(),
        name: c.name,
        teacherName: c.teacherName,
        joinCode: c.joinCode
      })),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    res.json({
      success: true,
      data: responseData
    });
  } catch (error) {
    console.error("Get user profile error:", error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

// ================= UPDATE USER PROFILE =================
export const updateUserProfile = async (req, res) => {
  try {
    // Graceful auth fallback
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        error: "Authentication required" 
      });
    }

    const { name, email } = req.body;
    
    // Check if email is already taken by another user
    if (email && email !== req.user.email) {
      const existingUser = await User.findOne({ 
        email: email.toLowerCase(),
        _id: { $ne: req.user._id }
      });
      
      if (existingUser) {
        return res.status(400).json({ 
          success: false, 
          error: "Email already in use" 
        });
      }
    }

    // Safe update with defaults
    const updateData = {
      name: name || req.user.name,
      email: email ? email.toLowerCase() : req.user.email
    };

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true, runValidators: true }
    )
      .select('-password')
      .populate('enrolledClasses', 'name teacherName joinCode');

    // Frontend-compatible response format
    const responseData = {
      id: updatedUser._id.toString(),
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      enrolledClasses: updatedUser.enrolledClasses.map(c => ({
        id: c._id.toString(),
        name: c.name,
        teacherName: c.teacherName,
        joinCode: c.joinCode
      })),
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt
    };

    res.json({
      success: true,
      data: responseData
    });
  } catch (error) {
    console.error("Update user profile error:", error);
    res.status(400).json({ 
      success: false, 
      error: error.message 
    });
  }
};

// ================= GET USER STATS =================
export const getUserStats = async (req, res) => {
  try {
    // Graceful auth fallback
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        error: "Authentication required" 
      });
    }

    const userId = req.user._id;
    const userRole = req.user.role;

    let stats = {};

    if (userRole === 'student') {
      // Student statistics
      const user = await User.findById(userId).populate('enrolledClasses');
      const enrolledClassrooms = user.enrolledClasses ? user.enrolledClasses.length : 0;

      // Get assignments available to student
      const classroomIds = user.enrolledClasses ? user.enrolledClasses.map(c => c._id) : [];
      const availableAssignments = await Assignment.find({
        $or: [
          { classroom: { $in: classroomIds } },
          { classroom: null } // General assignments
        ]
      });

      // Get student submissions
      const submissions = await Submission.find({ student: userId });
      const submittedAssignments = submissions.length;
      const gradedSubmissions = submissions.filter(s => s.grade !== null && s.grade !== undefined);
      const pendingGrading = submissions.filter(s => s.grade === null || s.grade === undefined);

      // Calculate total points and average grade
      const totalPointsEarned = gradedSubmissions.reduce((sum, s) => sum + (s.grade || 0), 0);
      const totalPossiblePoints = gradedSubmissions.reduce((sum, s) => {
        const assignment = availableAssignments.find(a => a._id.toString() === s.assignment.toString());
        return sum + (assignment ? assignment.points : 0);
      }, 0);

      const averageGrade = totalPossiblePoints > 0 ? 
        Math.round((totalPointsEarned / totalPossiblePoints) * 100) : 0;

      stats = {
        role: 'student',
        enrolledClassrooms,
        totalAssignments: availableAssignments.length,
        submittedAssignments,
        gradedAssignments: gradedSubmissions.length,
        pendingGrading: pendingGrading.length,
        totalPointsEarned,
        totalPossiblePoints,
        averageGrade,
        completionRate: availableAssignments.length > 0 ? 
          Math.round((submittedAssignments / availableAssignments.length) * 100) : 0
      };

    } else if (userRole === 'teacher' || userRole === 'admin') {
      // Teacher statistics
      const createdClassrooms = await Classroom.find({ teacher: userId });
      const createdAssignments = await Assignment.find({ createdBy: userId });
      
      // Get total students across all classrooms
      const totalStudents = createdClassrooms.reduce((sum, c) => sum + (c.students ? c.students.length : 0), 0);
      
      // Get submissions for teacher's assignments
      const assignmentIds = createdAssignments.map(a => a._id);
      const allSubmissions = await Submission.find({ assignment: { $in: assignmentIds } });
      const gradedSubmissions = allSubmissions.filter(s => s.grade !== null && s.grade !== undefined);
      const pendingGrading = allSubmissions.filter(s => s.grade === null || s.grade === undefined);

      stats = {
        role: userRole,
        createdClassrooms: createdClassrooms.length,
        createdAssignments: createdAssignments.length,
        totalStudents,
        totalSubmissions: allSubmissions.length,
        gradedSubmissions: gradedSubmissions.length,
        pendingGrading: pendingGrading.length,
        gradingRate: allSubmissions.length > 0 ? 
          Math.round((gradedSubmissions.length / allSubmissions.length) * 100) : 0
      };
    }

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error("Get user stats error:", error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

// ================= CHANGE PASSWORD =================
export const changePassword = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, error: "Authentication required" });
    }

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, error: "Current and new password are required" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, error: "New password must be at least 6 characters" });
    }

    // Fetch user directly from DB — password is not select:false so it's always present
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // user.password is the raw mongoose doc field (not affected by toJSON transform)
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, error: "Current password is incorrect" });
    }

    const hashedNew = await bcrypt.hash(newPassword, 10);

    // Use updateOne with $set — bypasses validators/hooks, writes directly to DB
    const result = await User.updateOne(
      { _id: req.user._id },
      { $set: { password: hashedNew } }
    );

    if (result.modifiedCount !== 1) {
      console.error(`[changePassword] updateOne did not modify any document for user ${req.user._id}`);
      return res.status(500).json({ success: false, error: "Password update failed — no document modified" });
    }

    console.log(`[changePassword] Password successfully updated for user ${req.user._id}`);

    res.json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// ================= DELETE ACCOUNT =================
export const deleteAccount = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, error: "Authentication required" });
    }

    const user = await User.findById(req.user._id);
    if (!user || user.isDeleted) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Trigger pre-deleteOne hooks for cascade cleanup
    await user.deleteOne();

    res.json({ success: true, message: "Account deleted successfully" });
  } catch (error) {
    console.error("Delete account error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
