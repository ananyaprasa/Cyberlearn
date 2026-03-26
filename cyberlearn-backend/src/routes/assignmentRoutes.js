import express from "express";
import {
  createAssignment,
  getAssignments,
  getAssignmentById,
  getAssignmentsByClassroom,
  updateAssignment,
  deleteAssignment
} from "../controllers/assignmentController.js";
import { protect, requireTeacher } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import { csrfProtection } from "../middleware/csrfMiddleware.js";

const router = express.Router();

// GET /api/assignments/classroom/:classroomId - Get assignments for a specific classroom (REQUIRES AUTH)
router.get("/classroom/:classroomId", protect, getAssignmentsByClassroom);

// POST /api/assignments - Create assignment (TEACHERS ONLY)
router.post("/", protect, requireTeacher, csrfProtection, createAssignment);

// GET /api/assignments - Get all assignments (REQUIRES AUTH)
router.get("/", protect, getAssignments);

// GET /api/assignments/:id - Get assignment by ID (REQUIRES AUTH)
router.get("/:id", protect, getAssignmentById);

// PUT /api/assignments/:id - Update assignment (TEACHERS ONLY)
router.put("/:id", protect, requireTeacher, csrfProtection, updateAssignment);

// DELETE /api/assignments/:id - Delete assignment (TEACHERS ONLY)
router.delete("/:id", protect, requireTeacher, csrfProtection, deleteAssignment);

export default router;