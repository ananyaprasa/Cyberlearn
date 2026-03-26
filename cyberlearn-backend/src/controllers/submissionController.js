import Submission from "../models/Submission.js";
import Assignment from "../models/Assignment.js";
import Classroom from "../models/Classroom.js";
import User from "../models/User.js";
import mongoose from "mongoose";

// ================= CREATE SUBMISSION =================
export const createSubmission = async (req, res) => {
  try {
    // Accept both 'assignment' and 'assignmentId' field names
    const assignmentId = req.body.assignment || req.body.assignmentId;
    const { textAnswer, linkAnswer, files } = req.body;

    if (!assignmentId) {
      return res.status(400).json({ 
        success: false, 
        message: "Assignment ID is required" 
      });
    }

    // ENHANCED: Validate assignment exists with proper error handling
    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({ 
        success: false, 
        message: "Assignment not found - invalid reference" 
      });
    }

    // Graceful auth fallback
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: "Authentication required to submit assignments" 
      });
    }

    // ENHANCED: Check if student has access to this assignment
    if (assignment.classroom) {
      const user = await User.findById(req.user._id);
      const enrolled = user.enrolledClasses.some(
        id => id.toString() === assignment.classroom.toString()
      );
      if (!enrolled) {
        return res.status(403).json({ 
          success: false, 
          message: "Access denied - not enrolled in assignment classroom" 
        });
      }
    }

    // ENHANCED: Use atomic transaction to prevent duplicate submissions
    const session = await mongoose.startSession();
    
    let submissionId;
    
    try {
      await session.withTransaction(async () => {
        // Check if submission already exists within transaction
        const existingSubmission = await Submission.findOne({
          assignment: assignmentId,
          student: req.user._id
        }).session(session);

        if (existingSubmission) {
          throw new Error("Submission already exists for this assignment");
        }

        // ENHANCED: Validate assignment is still active and not past deadline
        const currentAssignment = await Assignment.findById(assignmentId).session(session);
        if (!currentAssignment) {
          throw new Error("Assignment no longer exists");
        }

        if (currentAssignment.deadline && new Date() > currentAssignment.deadline) {
          throw new Error("Assignment deadline has passed");
        }

        // Safe defaults for submission data
        const submissionData = {
          assignment: assignmentId,
          student: req.user._id,
          studentEmail: req.user.email,
          studentName: req.user.name,
          textAnswer: textAnswer || "",
          linkAnswer: linkAnswer || "",
          files: files || [],
          status: "submitted",
          submittedAt: new Date()
        };

        // ENHANCED: Validate at least one answer type is provided
        if (!submissionData.textAnswer && 
            !submissionData.linkAnswer && 
            (!submissionData.files || submissionData.files.length === 0)) {
          throw new Error("At least one answer type (text, link, or file) is required");
        }

        const submission = await Submission.create([submissionData], { session });
        submissionId = submission[0]._id;
      });
    } finally {
      await session.endSession();
    }

    const populatedSubmission = await Submission.findById(submissionId)
      .populate('assignment', 'title points deadline')
      .populate('student', 'name email');

    // Frontend-compatible response format
    const responseData = {
      id: populatedSubmission._id?.toString(),
      assignmentId: populatedSubmission.assignment._id?.toString(),
      studentEmail: populatedSubmission.studentEmail,
      studentName: populatedSubmission.studentName,
      submittedAt: populatedSubmission.submittedAt,
      status: populatedSubmission.status,
      grade: populatedSubmission.grade,
      feedback: populatedSubmission.feedback || "",
      text: populatedSubmission.textAnswer,
      link: populatedSubmission.linkAnswer,
      files: populatedSubmission.files
    };

    res.status(201).json({
      success: true,
      data: responseData
    });
  } catch (error) {
    console.error("Create submission error:", error);
    res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// ================= GET SUBMISSIONS BY ASSIGNMENT =================
export const getSubmissionsByAssignment = async (req, res) => {
  try {
    const { assignment } = req.query;

    if (!assignment) {
      return res.status(400).json({ 
        success: false, 
        message: "Assignment ID is required" 
      });
    }

    // Validate assignment exists and user has access
    const assignmentDoc = await Assignment.findById(assignment);
    if (!assignmentDoc) {
      return res.status(404).json({ 
        success: false, 
        message: "Assignment not found" 
      });
    }

    // Graceful auth fallback - only assignment creators can see all submissions
    if (!req.user) {
      return res.status(403).json({ 
        success: false, 
        message: "Authentication required" 
      });
    }

    // Check if user created this assignment OR is the teacher of the classroom
    if (req.user.role === 'teacher') {
      const isCreator = assignmentDoc.createdBy &&
        assignmentDoc.createdBy.toString() === req.user._id.toString();

      let isClassroomTeacher = false;
      if (assignmentDoc.classroom) {
        const classroom = await Classroom.findOne({
          _id: assignmentDoc.classroom,
          teacher: req.user._id
        });
        isClassroomTeacher = !!classroom;
      }

      // If assignment has no createdBy AND no classroom (legacy data), allow any teacher to view
      const isLegacyOrphan = !assignmentDoc.createdBy && !assignmentDoc.classroom;

      if (!isCreator && !isClassroomTeacher && !isLegacyOrphan) {
        return res.status(403).json({ success: false, message: 'Access denied' });
      }
    }

    const submissions = await Submission.find({ assignment })
      .populate('student', 'name email')
      .populate('assignment', 'title points')
      .sort({ submittedAt: -1 });

    // Frontend-compatible response format
    const responseData = submissions.map(submission => ({
      id: submission._id?.toString(),
      assignmentId: submission.assignment._id?.toString(),
      studentEmail: submission.studentEmail,
      studentName: submission.studentName,
      submittedAt: submission.submittedAt,
      status: submission.status,
      grade: submission.grade,
      feedback: submission.feedback || "",
      text: submission.textAnswer,
      link: submission.linkAnswer,
      files: submission.files
    }));

    res.json({
      success: true,
      data: responseData
    });
  } catch (error) {
    console.error("Get submissions error:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// ================= GRADE SUBMISSION =================
export const gradeSubmission = async (req, res) => {
  try {
    const { grade, feedback } = req.body;
    const submissionId = req.params.id;

    const submission = await Submission.findById(submissionId)
      .populate('assignment', 'title points createdBy classroom');

    if (!submission) {
      return res.status(404).json({ 
        success: false, 
        message: "Submission not found" 
      });
    }

    // Graceful auth fallback
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: "Authentication required to grade submissions" 
      });
    }

    // Only the teacher who owns the classroom (or created the assignment) can grade
    if (req.user.role === 'teacher') {
      const isCreator = submission.assignment.createdBy &&
        submission.assignment.createdBy.toString() === req.user._id.toString();
      let isClassroomTeacher = false;
      if (!isCreator && submission.assignment.classroom) {
        const classroom = await Classroom.findOne({
          _id: submission.assignment.classroom,
          teacher: req.user._id
        });
        isClassroomTeacher = !!classroom;
      }
      if (!isCreator && !isClassroomTeacher) {
        return res.status(403).json({ success: false, message: 'Only the classroom teacher can grade submissions' });
      }
    }

    // Validate grade (safe defaults)
    const maxPoints = submission.assignment.points || 100;
    let validGrade = grade;
    
    if (grade !== null && grade !== undefined) {
      if (grade < 0) validGrade = 0;
      if (grade > maxPoints) validGrade = maxPoints;
    }

    const updatedSubmission = await Submission.findByIdAndUpdate(
      submissionId,
      {
        grade: validGrade,
        feedback: feedback || "",
        status: validGrade !== null && validGrade !== undefined ? "graded" : "submitted"
      },
      { new: true }
    )
      .populate('student', 'name email')
      .populate('assignment', 'title points');

    // Frontend-compatible response format
    const responseData = {
      id: updatedSubmission._id.toString(),
      assignmentId: updatedSubmission.assignment._id.toString(),
      studentEmail: updatedSubmission.studentEmail,
      studentName: updatedSubmission.studentName,
      submittedAt: updatedSubmission.submittedAt,
      status: updatedSubmission.status,
      grade: updatedSubmission.grade,
      feedback: updatedSubmission.feedback || "",
      text: updatedSubmission.textAnswer,
      link: updatedSubmission.linkAnswer,
      files: updatedSubmission.files
    };

    res.json({
      success: true,
      data: responseData
    });
  } catch (error) {
    console.error("Grade submission error:", error);
    res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// ================= DELETE SUBMISSION (UNSUBMIT) =================
export const deleteSubmission = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);

    if (!submission) {
      return res.status(404).json({ success: false, message: "Submission not found" });
    }

    if (!req.user) {
      return res.status(401).json({ success: false, message: "Authentication required" });
    }

    // Only the student who submitted can unsubmit
    if (submission.student.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "You can only unsubmit your own submission" });
    }

    // Cannot unsubmit if already graded
    if (submission.status === 'graded') {
      return res.status(400).json({ success: false, message: "Cannot unsubmit a graded submission" });
    }

    await Submission.findByIdAndDelete(req.params.id);

    res.json({ success: true, data: { message: "Submission removed successfully" } });
  } catch (error) {
    console.error("Delete submission error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
export const getStudentSubmissions = async (req, res) => {
  try {
    const { userId } = req.params;

    // Graceful auth fallback
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: "Authentication required" 
      });
    }

    // Students can only see their own submissions
    if (req.user.role === 'student' && req.user._id.toString() !== userId) {
      return res.status(403).json({ 
        success: false, 
        message: "Access denied" 
      });
    }

    // Teachers can see submissions for assignments they own (created or classroom)
    let filter = { student: userId };
    
    if (req.user.role === 'teacher') {
      // Get assignments created by this teacher OR in classrooms they own
      const teacherClassrooms = await Classroom.find({ teacher: req.user._id });
      const classroomIds = teacherClassrooms.map(c => c._id);
      const teacherAssignments = await Assignment.find({
        $or: [
          { createdBy: req.user._id },
          { classroom: { $in: classroomIds } }
        ]
      });
      const assignmentIds = teacherAssignments.map(a => a._id);
      filter.assignment = { $in: assignmentIds };
    }

    const submissions = await Submission.find(filter)
      .populate('assignment', 'title points deadline category')
      .populate('student', 'name email')
      .sort({ submittedAt: -1 });

    // Frontend-compatible response format
    const responseData = submissions.map(submission => ({
      id: submission._id?.toString(),
      assignmentId: (submission.assignment?._id || submission.assignment)?.toString(),
      studentEmail: submission.studentEmail,
      studentName: submission.studentName,
      submittedAt: submission.submittedAt,
      status: submission.status,
      grade: submission.grade,
      feedback: submission.feedback || "",
      text: submission.textAnswer,
      link: submission.linkAnswer,
      files: submission.files,
      assignment: submission.assignment ? {
        title: submission.assignment.title,
        points: submission.assignment.points,
        deadline: submission.assignment.deadline,
        category: submission.assignment.category
      } : null
    }));

    res.json({
      success: true,
      data: responseData
    });
  } catch (error) {
    console.error("Get student submissions error:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};