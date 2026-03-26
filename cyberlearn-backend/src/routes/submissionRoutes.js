import express from "express";
import {
  createSubmission,
  getSubmissionsByAssignment,
  gradeSubmission,
  deleteSubmission,
  getStudentSubmissions
} from "../controllers/submissionController.js";
import { protect, requireTeacher, requireStudent } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import { csrfProtection } from "../middleware/csrfMiddleware.js";

const router = express.Router();

// POST /api/submissions - Create submission (STUDENTS ONLY)
router.post("/", protect, requireStudent, csrfProtection, createSubmission);

// GET /api/submissions?assignment={id} - Get submissions by assignment (REQUIRES AUTH)
router.get("/", protect, getSubmissionsByAssignment);

// PUT /api/submissions/:id/grade - Grade submission (TEACHERS ONLY)
router.put("/:id/grade", protect, requireTeacher, csrfProtection, gradeSubmission);

// DELETE /api/submissions/:id - Unsubmit (requires auth)
router.delete("/:id", protect, csrfProtection, deleteSubmission);

// GET /api/submissions/student/:userId - Get student submissions (REQUIRES AUTH)
router.get("/student/:userId", protect, getStudentSubmissions);

export default router;