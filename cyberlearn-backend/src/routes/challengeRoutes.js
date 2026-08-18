import express from "express";
import {
  getChallenges,
  getChallengeById,
  createChallenge,
  updateChallenge,
  deleteChallenge,
  togglePublish,
  submitFlag,
  unlockHint,
  getLeaderboard,
  getMyProgress,
  getAllChallengesAdmin
} from "../controllers/challengeController.js";
import { protect, requireTeacher, optionalProtect } from "../middleware/authMiddleware.js";
import { csrfProtection } from "../middleware/csrfMiddleware.js";

const router = express.Router();

// ── Public routes (no auth required) ──────────────────────────

// GET /api/challenges/leaderboard — global leaderboard (public)
router.get("/leaderboard", getLeaderboard);

// ── Authenticated routes ───────────────────────────────────────

// GET /api/challenges/my-progress — current user's XP/level/solved (must be before /:id)
router.get("/my-progress", protect, getMyProgress);

// GET /api/challenges/admin — all challenges for management (must be before /:id)
router.get("/admin", protect, requireTeacher, getAllChallengesAdmin);

// GET /api/challenges — list published challenges (optional auth personalises solved state)
router.get("/", optionalProtect, getChallenges);

// GET /api/challenges/:id — single published challenge (optional auth)
router.get("/:id", optionalProtect, getChallengeById);

// POST /api/challenges/:id/submit — submit a flag (requires auth)
router.post("/:id/submit", protect, csrfProtection, submitFlag);

// POST /api/challenges/:id/hints/:hintIndex — unlock a hint (requires auth)
router.post("/:id/hints/:hintIndex", protect, csrfProtection, unlockHint);

// ── Teacher/Admin management routes ───────────────────────────

// POST /api/challenges — create challenge
router.post("/", protect, requireTeacher, csrfProtection, createChallenge);

// PUT /api/challenges/:id — update challenge
router.put("/:id", protect, requireTeacher, csrfProtection, updateChallenge);

// PATCH /api/challenges/:id/publish — toggle publish
router.patch("/:id/publish", protect, requireTeacher, csrfProtection, togglePublish);

// DELETE /api/challenges/:id — delete challenge
router.delete("/:id", protect, requireTeacher, csrfProtection, deleteChallenge);

export default router;
