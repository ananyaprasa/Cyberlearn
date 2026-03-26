import Classroom from "../models/Classroom.js";
import User from "../models/User.js";
import Assignment from "../models/Assignment.js";
import mongoose from "mongoose";

// Generate random classroom code
const generateClassroomCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

// ================= CREATE CLASSROOM =================
export const createClassroom = async (req, res) => {
  try {
    const { name, description, subject } = req.body;

    // Graceful auth fallback
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: "Authentication required to create classrooms" 
      });
    }

    // Only teachers can create classrooms
    if (req.user.role !== 'teacher' && req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: "Only teachers can create classrooms" 
      });
    }

    // Safe defaults
    const classroomData = {
      name: name || "Untitled Classroom",
      description: description || "",
      subject: subject || "Cybersecurity",
      teacher: req.user._id,
      teacherName: req.user.name,
      students: [],
      assignments: []
    };

    // Generate unique join code
    let joinCode;
    let isUnique = false;
    while (!isUnique) {
      joinCode = generateClassroomCode();
      const existing = await Classroom.findOne({ joinCode });
      if (!existing) isUnique = true;
    }
    classroomData.joinCode = joinCode;

    const classroom = await Classroom.create(classroomData);

    const populatedClassroom = await Classroom.findById(classroom._id)
      .populate('teacher', 'name email')
      .populate('students', 'name email');

    // Frontend-compatible response format
    const responseData = {
      id: populatedClassroom._id.toString(),
      code: populatedClassroom.joinCode,
      name: populatedClassroom.name,
      description: populatedClassroom.description,
      subject: populatedClassroom.subject,
      teacherId: populatedClassroom.teacher.email,
      teacherName: populatedClassroom.teacherName,
      createdAt: populatedClassroom.createdAt,
    };

    res.status(201).json({
      success: true,
      data: responseData
    });
  } catch (error) {
    console.error("Create classroom error:", error);
    res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// ================= GET CLASSROOMS =================
export const getClassrooms = async (req, res) => {
  try {
    let classrooms = [];

    // Graceful auth fallback
    if (!req.user) {
      return res.json({
        success: true,
        data: []
      });
    }

    if (req.user.role === 'teacher' || req.user.role === 'admin') {
      // Teachers see classrooms they created
      classrooms = await Classroom.find({ teacher: req.user._id })
        .populate('teacher', 'name email')
        .populate('students', 'name email')
        .sort({ createdAt: -1 });
    } else {
      // Students see classrooms they're enrolled in
      const user = await User.findById(req.user._id).populate('enrolledClasses');
      const classroomIds = user.enrolledClasses.map(c => c._id);
      
      classrooms = await Classroom.find({ _id: { $in: classroomIds } })
        .populate('teacher', 'name email')
        .populate('students', 'name email')
        .sort({ createdAt: -1 });
    }

    // Frontend-compatible response format
    const responseData = classrooms.map(classroom => ({
      id: classroom._id.toString(),
      code: classroom.joinCode,
      name: classroom.name,
      description: classroom.description,
      subject: classroom.subject,
      teacherId: classroom.teacher.email,
      teacherName: classroom.teacherName,
      createdAt: classroom.createdAt,
      students: classroom.students.map(s => ({
        id: s._id.toString(),
        studentName: s.name,
        studentEmail: s.email,
        enrolledAt: classroom.createdAt
      })),
    }));

    res.json({
      success: true,
      data: responseData
    });
  } catch (error) {
    console.error("Get classrooms error:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// ================= JOIN CLASSROOM =================
export const joinClassroom = async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ 
        success: false, 
        message: "Join code is required" 
      });
    }

    // Graceful auth fallback
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: "Authentication required to join classrooms" 
      });
    }

    const classroom = await Classroom.findOne({ joinCode: code.toUpperCase() });
    if (!classroom) {
      return res.status(404).json({ 
        success: false, 
        message: "Invalid classroom code" 
      });
    }

    // ENHANCED: Check if already enrolled in classroom students array
    if (classroom.students.includes(req.user._id)) {
      return res.status(400).json({ 
        success: false, 
        message: "Already enrolled in this classroom" 
      });
    }

    // ENHANCED: Check if already enrolled in user's enrolledClasses array
    const user = await User.findById(req.user._id);
    if (user.enrolledClasses.includes(classroom._id)) {
      return res.status(400).json({ 
        success: false, 
        message: "Already enrolled in this classroom" 
      });
    }

    // ENHANCED: Use atomic operations to prevent race conditions
    const session = await mongoose.startSession();
    
    try {
      await session.withTransaction(async () => {
        // Double-check enrollment status within transaction
        const currentClassroom = await Classroom.findById(classroom._id).session(session);
        const currentUser = await User.findById(req.user._id).session(session);
        
        if (currentClassroom.students.includes(req.user._id) || 
            currentUser.enrolledClasses.includes(classroom._id)) {
          throw new Error("Already enrolled in this classroom");
        }

        // Add student to classroom
        await Classroom.findByIdAndUpdate(
          classroom._id,
          { $addToSet: { students: req.user._id } }, // $addToSet prevents duplicates
          { session }
        );

        // Add classroom to user's enrolled classes
        await User.findByIdAndUpdate(
          req.user._id,
          { $addToSet: { enrolledClasses: classroom._id } }, // $addToSet prevents duplicates
          { session }
        );
      });
    } finally {
      await session.endSession();
    }

    const updatedClassroom = await Classroom.findById(classroom._id)
      .populate('teacher', 'name email')
      .populate('students', 'name email');

    // Frontend-compatible response format
    const responseData = {
      id: updatedClassroom._id.toString(),
      code: updatedClassroom.joinCode,
      name: updatedClassroom.name,
      description: updatedClassroom.description,
      subject: updatedClassroom.subject,
      teacherId: updatedClassroom.teacher.email,
      teacherName: updatedClassroom.teacherName,
      createdAt: updatedClassroom.createdAt,
      students: updatedClassroom.students.map(s => ({
        id: s._id.toString(),
        studentName: s.name,
        studentEmail: s.email,
        enrolledAt: updatedClassroom.createdAt
      })),
    };

    res.json({
      success: true,
      data: {
        message: "Successfully joined classroom",
        classroom: responseData
      }
    });
  } catch (error) {
    console.error("Join classroom error:", error);
    res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// ================= GET CLASSROOM BY ID =================
export const getClassroomById = async (req, res) => {
  try {
    const classroom = await Classroom.findById(req.params.id)
      .populate('teacher', 'name email')
      .populate('students', 'name email');

    if (!classroom) {
      return res.status(404).json({ success: false, message: "Classroom not found" });
    }

    // Access check: teacher must own it, student must be enrolled
    if (req.user) {
      if (req.user.role === 'teacher' && classroom.teacher._id.toString() !== req.user._id.toString()) {
        return res.status(403).json({ success: false, message: "Access denied" });
      }
      if (req.user.role === 'student' && !classroom.students.some(s => s._id.toString() === req.user._id.toString())) {
        return res.status(403).json({ success: false, message: "Access denied" });
      }
    }

    const responseData = {
      id: classroom._id.toString(),
      code: classroom.joinCode,
      name: classroom.name,
      description: classroom.description,
      subject: classroom.subject,
      teacherId: classroom.teacher.email,
      teacherName: classroom.teacherName,
      createdAt: classroom.createdAt,
      students: classroom.students.map(s => ({
        id: s._id.toString(),
        studentName: s.name,
        studentEmail: s.email
      })),
    };

    res.json({ success: true, data: responseData });
  } catch (error) {
    console.error("Get classroom by ID error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= DELETE CLASSROOM =================
export const deleteClassroom = async (req, res) => {
  try {
    const classroom = await Classroom.findById(req.params.id);

    if (!classroom) {
      return res.status(404).json({ 
        success: false, 
        message: "Classroom not found" 
      });
    }

    // Graceful auth fallback
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: "Authentication required" 
      });
    }

    // Only the teacher who created it can delete
    if (classroom.teacher.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: insufficient permissions"
      });
    }

    // Remove classroom from all enrolled students
    await User.updateMany(
      { enrolledClasses: classroom._id },
      { $pull: { enrolledClasses: classroom._id } }
    );

    // Delete associated assignments
    await Assignment.deleteMany({ classroom: classroom._id });

    // Delete the classroom
    await Classroom.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      data: { message: "Classroom deleted successfully" }
    });
  } catch (error) {
    console.error("Delete classroom error:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// ================= LEAVE CLASSROOM =================
export const leaveClassroom = async (req, res) => {
  try {
    const classroom = await Classroom.findById(req.params.id);

    if (!classroom) {
      return res.status(404).json({ 
        success: false, 
        message: "Classroom not found" 
      });
    }

    // Graceful auth fallback
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: "Authentication required" 
      });
    }

    // Check if user is enrolled
    if (!classroom.students.includes(req.user._id)) {
      return res.status(400).json({ 
        success: false, 
        message: "Not enrolled in this classroom" 
      });
    }

    // Remove student from classroom
    await Classroom.findByIdAndUpdate(
      req.params.id,
      { $pull: { students: req.user._id } }
    );

    // Remove classroom from user's enrolled classes
    await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { enrolledClasses: req.params.id } }
    );

    res.json({
      success: true,
      data: { message: "Successfully left classroom" }
    });
  } catch (error) {
    console.error("Leave classroom error:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};