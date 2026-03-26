import Assignment from "../models/Assignment.js";
import Classroom from "../models/Classroom.js";
import User from "../models/User.js";
import Submission from "../models/Submission.js";
import mongoose from "mongoose";

// ================= GET ASSIGNMENTS BY CLASSROOM =================
export const getAssignmentsByClassroom = async (req, res) => {
  try {
    const { classroomId } = req.params;

    const classroom = await Classroom.findById(classroomId);
    if (!classroom) {
      return res.status(404).json({ success: false, message: 'Classroom not found' });
    }

    // Teachers must own the classroom; students must be enrolled
    if (req.user) {
      if (req.user.role === 'teacher' && classroom.teacher.toString() !== req.user._id.toString()) {
        return res.status(403).json({ success: false, message: 'Access denied' });
      }
      if (req.user.role === 'student' && !classroom.students.map(s => s.toString()).includes(req.user._id.toString())) {
        return res.status(403).json({ success: false, message: 'Access denied' });
      }
    }

    const assignments = await Assignment.find({ classroom: classroomId })
      .populate('createdBy', 'name email')
      .populate('classroom', 'name')
      .sort({ createdAt: -1 });

    const responseData = assignments.map(a => ({
      id: a._id.toString(),
      title: a.title,
      description: a.description,
      category: a.category,
      points: a.points,
      deadline: a.deadline,
      createdBy: a.createdBy?.email || 'system',
      createdAt: a.createdAt,
      classroomId: a.classroom?._id?.toString() || null,
      attachments: a.attachments,
      allowedFileTypes: a.allowedFileTypes,
      allowLinks: a.allowLinks
    }));

    res.json({ success: true, data: responseData });
  } catch (error) {
    console.error('Get assignments by classroom error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= CREATE ASSIGNMENT =================
export const createAssignment = async (req, res) => {
  const session = await mongoose.startSession();
  
  try {
    await session.withTransaction(async () => {
      const { title, description, category, points, deadline, classroomId, attachments, allowedFileTypes, allowLinks } = req.body;

      // Safe defaults for missing data
      const assignmentData = {
        title: title || "Untitled Assignment",
        description: description || "",
        category: category || "General",
        points: points || 100,
        deadline: deadline ? new Date(deadline) : null,
        classroom: classroomId || null,
        createdBy: req.user ? req.user._id : null,
        attachments: attachments || [],
        allowedFileTypes: allowedFileTypes || ['.pdf', '.doc', '.docx', '.txt'],
        allowLinks: allowLinks !== undefined ? allowLinks : true
      };

      // Graceful auth fallback - if no user, create as system assignment
      if (!req.user) {
        assignmentData.createdBy = null;
      }

      // ENHANCED: Validate classroom if provided
      if (classroomId) {
        const classroom = await Classroom.findById(classroomId).session(session);
        if (!classroom) {
          throw new Error("Classroom not found - invalid reference");
        }

        // Check if user is teacher of this classroom (only if authenticated)
        if (req.user && classroom.teacher.toString() !== req.user._id.toString()) {
          throw new Error("Only classroom teacher can create assignments");
        }

        // ENHANCED: Verify classroom is not deleted/inactive
        if (classroom.isDeleted) {
          throw new Error("Cannot create assignment in deleted classroom");
        }
      }

      const assignment = await Assignment.create([assignmentData], { session });

      const populatedAssignment = await Assignment.findById(assignment[0]._id)
        .populate('createdBy', 'name email')
        .populate('classroom', 'name')
        .session(session);

      // Frontend-compatible response format
      const responseData = {
        id: populatedAssignment._id.toString(),
        title: populatedAssignment.title,
        description: populatedAssignment.description,
        category: populatedAssignment.category,
        points: populatedAssignment.points,
        deadline: populatedAssignment.deadline,
        createdBy: populatedAssignment.createdBy?.email || 'system',
        createdAt: populatedAssignment.createdAt,
        classroomId: populatedAssignment.classroom?._id?.toString() || null,
        attachments: populatedAssignment.attachments,
        allowedFileTypes: populatedAssignment.allowedFileTypes,
        allowLinks: populatedAssignment.allowLinks
      };

      res.status(201).json({
        success: true,
        data: responseData
      });
    });
  } catch (error) {
    console.error("Create assignment error:", error);
    res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  } finally {
    await session.endSession();
  }
};

// ================= GET ALL ASSIGNMENTS =================
export const getAssignments = async (req, res) => {
  try {
    const { classroomId } = req.query;
    let filter = {};

    // Graceful auth fallback - if no user, return general assignments only
    if (!req.user) {
      filter = { classroom: null }; // Only general assignments
    } else if (req.user.role === 'student') {
      // Students see assignments from their enrolled classrooms + general assignments
      const user = await User.findById(req.user._id).populate('enrolledClasses');
      const classroomIds = user.enrolledClasses.map(c => c._id);
      
      filter = {
        $or: [
          { classroom: { $in: classroomIds } },
          { classroom: null } // General assignments
        ]
      };
    } else if (req.user.role === 'teacher') {
      // Teachers see assignments they created
      filter.createdBy = req.user._id;
    }

    // Filter by specific classroom if requested
    if (classroomId) {
      if (req.user?.role === 'student') {
        // Narrow the enrolled-classrooms $or filter to just this classroom
        filter = {
          $and: [
            filter,
            { classroom: classroomId }
          ]
        };
      } else if (req.user?.role === 'teacher') {
        // Verify teacher owns this classroom, then return all its assignments
        const classroom = await Classroom.findOne({ _id: classroomId, teacher: req.user._id });
        if (!classroom) {
          return res.status(403).json({ success: false, message: 'Access denied' });
        }
        // Return all assignments for this classroom (regardless of createdBy)
        filter = { classroom: classroomId };
      } else {
        filter.classroom = classroomId;
      }
    }

    console.log('🔍 Assignment filter:', JSON.stringify(filter));
    console.log('🔍 classroomId param:', classroomId);
    console.log('🔍 user role:', req.user?.role, 'userId:', req.user?._id);

    const assignments = await Assignment.find(filter)
      .populate('createdBy', 'name email')
      .populate('classroom', 'name')
      .sort({ createdAt: -1 });

    console.log('📦 Assignments found:', assignments.length);

    // Frontend-compatible response format
    const responseData = assignments.map(assignment => ({
      id: assignment._id.toString(),
      title: assignment.title,
      description: assignment.description,
      category: assignment.category,
      points: assignment.points,
      deadline: assignment.deadline,
      createdBy: assignment.createdBy?.email || 'system',
      createdAt: assignment.createdAt,
      classroomId: assignment.classroom?._id?.toString() || null,
      attachments: assignment.attachments,
      allowedFileTypes: assignment.allowedFileTypes,
      allowLinks: assignment.allowLinks
    }));

    res.json({
      success: true,
      data: responseData
    });
  } catch (error) {
    console.error("Get assignments error:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// ================= GET ASSIGNMENT BY ID =================
export const getAssignmentById = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('classroom', 'name');

    if (!assignment) {
      return res.status(404).json({ 
        success: false, 
        message: "Assignment not found" 
      });
    }

    // Check access permissions (graceful fallback if no auth)
    if (req.user && req.user.role === 'student') {
      // Students can only see assignments from their enrolled classrooms or general assignments
      if (assignment.classroom) {
        const user = await User.findById(req.user._id);
        if (!user.enrolledClasses.includes(assignment.classroom._id)) {
          return res.status(403).json({ 
            success: false, 
            message: "Access denied" 
          });
        }
      }
    } else if (req.user && req.user.role === 'teacher') {
      // Teachers can only see assignments they created
      if (assignment.createdBy && assignment.createdBy._id.toString() !== req.user._id.toString()) {
        return res.status(403).json({ 
          success: false, 
          message: "Access denied" 
        });
      }
    }

    // Frontend-compatible response format
    const responseData = {
      id: assignment._id.toString(),
      title: assignment.title,
      description: assignment.description,
      category: assignment.category,
      points: assignment.points,
      deadline: assignment.deadline,
      createdBy: assignment.createdBy?.email || 'system',
      createdAt: assignment.createdAt,
      classroomId: assignment.classroom?._id?.toString() || null,
      attachments: assignment.attachments,
      allowedFileTypes: assignment.allowedFileTypes,
      allowLinks: assignment.allowLinks
    };

    res.json({
      success: true,
      data: responseData
    });
  } catch (error) {
    console.error("Get assignment error:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// ================= UPDATE ASSIGNMENT =================
export const updateAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      return res.status(404).json({ 
        success: false, 
        message: "Assignment not found" 
      });
    }

    // Only creator can update (graceful fallback if no auth)
    if (req.user && assignment.createdBy && assignment.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: insufficient permissions"
      });
    }

    // Safe update with defaults
    const updateData = {
      title: req.body.title || assignment.title,
      description: req.body.description !== undefined ? req.body.description : assignment.description,
      category: req.body.category || assignment.category,
      points: req.body.points !== undefined ? req.body.points : assignment.points,
      deadline: req.body.deadline !== undefined ? (req.body.deadline ? new Date(req.body.deadline) : null) : assignment.deadline,
      attachments: req.body.attachments !== undefined ? req.body.attachments : assignment.attachments,
      allowedFileTypes: req.body.allowedFileTypes !== undefined ? req.body.allowedFileTypes : assignment.allowedFileTypes,
      allowLinks: req.body.allowLinks !== undefined ? req.body.allowLinks : assignment.allowLinks
    };

    const updatedAssignment = await Assignment.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    )
      .populate('createdBy', 'name email')
      .populate('classroom', 'name');

    // Frontend-compatible response format
    const responseData = {
      id: updatedAssignment._id.toString(),
      title: updatedAssignment.title,
      description: updatedAssignment.description,
      category: updatedAssignment.category,
      points: updatedAssignment.points,
      deadline: updatedAssignment.deadline,
      createdBy: updatedAssignment.createdBy?.email || 'system',
      createdAt: updatedAssignment.createdAt,
      classroomId: updatedAssignment.classroom?._id?.toString() || null,
      attachments: updatedAssignment.attachments,
      allowedFileTypes: updatedAssignment.allowedFileTypes,
      allowLinks: updatedAssignment.allowLinks
    };

    res.json({
      success: true,
      data: responseData
    });
  } catch (error) {
    console.error("Update assignment error:", error);
    res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// ================= DELETE ASSIGNMENT =================
export const deleteAssignment = async (req, res) => {
  const session = await mongoose.startSession();
  
  try {
    await session.withTransaction(async () => {
      const assignment = await Assignment.findById(req.params.id).session(session);

      if (!assignment) {
        throw new Error("Assignment not found");
      }

      // Only creator can delete (graceful fallback if no auth)
      if (req.user && assignment.createdBy && assignment.createdBy.toString() !== req.user._id.toString()) {
        const error = new Error("Forbidden: insufficient permissions");
        error.statusCode = 403;
        throw error;
      }

      // CASCADE DELETE: Remove from classroom and delete all submissions
      if (assignment.classroom) {
        await Classroom.findByIdAndUpdate(
          assignment.classroom,
          { $pull: { assignments: assignment._id } },
          { session }
        );
      }

      // Delete all submissions for this assignment
      await Submission.deleteMany({ assignment: assignment._id }, { session });

      // Delete the assignment
      await Assignment.findByIdAndDelete(req.params.id, { session });

      res.json({
        success: true,
        data: { message: "Assignment deleted successfully" }
      });
    });
  } catch (error) {
    console.error("Delete assignment error:", error);
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ 
      success: false, 
      message: error.message 
    });
  } finally {
    await session.endSession();
  }
};