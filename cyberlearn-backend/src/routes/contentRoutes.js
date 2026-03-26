import express from "express";
import {
  createContent,
  getAllContent,
  getContentById,
  updateContent,
  deleteContent,
  togglePublish} from "../controllers/contentController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Public routes (no authentication required)
router.get("/", getAllContent);
router.get("/:id", getContentById);

// Protected routes (authentication required)
router.post("/", protect, authorize(['teacher', 'admin']), createContent);
router.put("/:id", protect, authorize(['teacher', 'admin']), updateContent);
router.delete("/:id", protect, authorize(['teacher', 'admin']), deleteContent);
router.patch("/:id/publish", protect, authorize(['teacher', 'admin']), togglePublish);

export default router;
