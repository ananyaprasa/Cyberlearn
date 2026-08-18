import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    // Read token from cookies instead of headers
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: "Not authorized" 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ 
      success: false, 
      message: "Token invalid" 
    });
  }
};

/**
 * Optional authentication — sets req.user if a valid token is present,
 * but always calls next(). Used for public routes that personalise
 * their response when a user is logged in (e.g. solved challenge state).
 */
export const optionalProtect = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return next(); // no token — proceed as guest

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (user) req.user = user;
  } catch {
    // Invalid/expired token — proceed as guest, don't error
  }
  next();
};

// Role-based middleware functions
export const requireTeacher = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Authentication required"
    });
  }

  if (req.user.role !== "teacher" && req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Forbidden: insufficient permissions"
    });
  }

  next();
};

export const requireStudent = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Authentication required"
    });
  }

  if (req.user.role !== "student") {
    return res.status(403).json({
      success: false,
      message: "Forbidden: insufficient permissions"
    });
  }

  next();
};
