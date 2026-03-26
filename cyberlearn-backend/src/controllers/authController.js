import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { registerSchema, loginSchema } from "../validators/authValidator.js";

// ================= REGISTER =================
export const register = async (req, res) => {
  try {
    console.log("REGISTER HIT:", req.body);

    const parsed = registerSchema.parse(req.body);

    const existingUser = await User.findOne({ email: parsed.email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: "Email already exists" 
      });
    }

    const hashedPassword = await bcrypt.hash(parsed.password, 10);

    // Determine role — only student or teacher allowed from signup
    const allowedRoles = ['student', 'teacher'];
    let role = allowedRoles.includes(parsed.role) ? parsed.role : 'student';

    const user = await User.create({
      name: parsed.name,
      email: parsed.email,
      password: hashedPassword,
      role: role
    });

    res.status(201).json({
      success: true,
      data: {
        message: "User registered successfully",
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role
        }
      }
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// ================= LOGIN =================
export const login = async (req, res) => {
  try {
    const parsed = loginSchema.parse(req.body);

    const user = await User.findOne({ email: parsed.email.toLowerCase() }).select('+password');
    if (!user || user.isDeleted) {
      return res.status(400).json({ 
        success: false, 
        message: "Account does not exist" 
      });
    }

    const isMatch = await bcrypt.compare(parsed.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid credentials" 
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const isProduction = process.env.NODE_ENV === 'production';

    // Set httpOnly cookie instead of returning token
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,           // must be true in production (HTTPS)
      sameSite: isProduction ? "None" : "Lax", // cross-domain needs "None"
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.json({
      success: true,
      data: {
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        }
      }
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// ================= GET ME =================
export const getMe = async (req, res) => {
  const user = req.user;
  res.json({
    success: true,
    data: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      enrolledClasses: user.enrolledClasses || []
    }
  });
};

// ================= LOGOUT =================
export const logout = async (req, res) => {
  try {
    // Clear the httpOnly cookie with EXACT match of login cookie options
    const isProduction = process.env.NODE_ENV === 'production';
    res.clearCookie("token", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "None" : "Lax",
      path: "/"
    });

    res.json({
      success: true,
      data: {
        message: "Logged out successfully"
      }
    });
  } catch (error) {
    console.error("LOGOUT ERROR:", error);
    res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
};
