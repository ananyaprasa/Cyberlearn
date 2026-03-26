import express from "express";
import {
  createClassroom,
  getClassrooms,
  getClassroomById,
  joinClassroom,
  deleteClassroom,
  leaveClassroom
} from "../controllers/classroomController.js";
import { protect, requireTeacher, requireStudent } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import { csrfProtection } from "../middleware/csrfMiddleware.js";

const router = express.Router();

// POST /api/classrooms - Create classroom (TEACHERS ONLY)
router.post("/", protect, requireTeacher, csrfProtection, createClassroom);

// GET /api/classrooms - Get user's classrooms (REQUIRES AUTH)
router.get("/", protect, getClassrooms);

// GET /api/classrooms/:id - Get single classroom (REQUIRES AUTH)
router.get("/:id", protect, getClassroomById);

// POST /api/classrooms/join - Join classroom by code (STUDENTS ONLY)
router.post("/join", protect, requireStudent, csrfProtection, joinClassroom);

// DELETE /api/classrooms/:id - Delete classroom (TEACHERS ONLY)
router.delete("/:id", protect, requireTeacher, csrfProtection, deleteClassroom);

// DELETE /api/classrooms/:id/leave - Leave classroom (requires auth)
router.delete("/:id/leave", protect, csrfProtection, leaveClassroom);

export default router;