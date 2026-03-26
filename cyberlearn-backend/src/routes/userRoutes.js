import express from "express";
import {
  getUserProfile,
  updateUserProfile,
  getUserStats,
  changePassword,
  deleteAccount
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create optional auth middleware for graceful fallback
const optionalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    // If auth header exists, use protect middleware
    return protect(req, res, next);
  }
  // If no auth header, continue without user
  req.user = null;
  next();
};

// GET /api/users/profile - Get user profile (requires auth)
router.get("/profile", protect, getUserProfile);

// PUT /api/users/profile - Update user profile (requires auth)
router.put("/profile", protect, updateUserProfile);

// GET /api/users/stats - Get user statistics (requires auth)
router.get("/stats", protect, getUserStats);

// PUT /api/users/change-password - Change user password (requires auth)
router.put("/change-password", protect, changePassword);

// DELETE /api/users/account - Delete user account (requires auth)
router.delete("/account", protect, deleteAccount);

export default router;