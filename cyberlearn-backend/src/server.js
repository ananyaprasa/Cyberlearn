import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import { csrfProtection } from "./middleware/csrfMiddleware.js";
import authRoutes from "./routes/authRoutes.js";
import contentRoutes from "./routes/contentRoutes.js";
import assignmentRoutes from "./routes/assignmentRoutes.js";
import submissionRoutes from "./routes/submissionRoutes.js";
import classroomRoutes from "./routes/classroomRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import studyMaterialRoutes from "./routes/studyMaterialRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));


dotenv.config({ path: path.resolve(process.cwd(), ".env") });

console.log("KEY CHECK:", process.env.GEMINI_API_KEY);

const app = express();

// Trust proxy — required for rate limiting and cookies behind Render/Vercel/nginx
app.set("trust proxy", 1);

// Middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL || true, // true = allow all origins (safe behind auth)
  credentials: true
}));

app.use(helmet());
app.use(cookieParser());
app.use(express.json());

// Serve uploaded study materials as static files
// Files accessible at: GET /uploads/study-materials/<filename>.pdf
const uploadsPath = path.resolve(__dirname, '../../uploads');
app.use('/uploads', express.static(uploadsPath, {
  // Only serve PDF files — block directory listing and other types
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.pdf')) {
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'inline');
    }
  },
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500,                  // generous limit for dev/normal usage
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many requests, please try again later.' }
});

// Stricter limiter for auth endpoints only
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many login attempts, please try again later.' }
});

app.use(limiter);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "CyberLearn Backend Running 🚀" });
});

// CSRF Token route
app.get("/api/csrf-token", csrfProtection, (req, res) => {
  res.json({
    success: true,
    data: {
      csrfToken: req.csrfToken()
    }
  });
});

// Routes
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/classrooms", classroomRoutes);
app.use("/api/classrooms/:id/materials", studyMaterialRoutes);
app.use("/api/materials", studyMaterialRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  // Handle CSRF token errors
  if (err.code === 'EBADCSRFTOKEN') {
    return res.status(403).json({
      success: false,
      message: 'Invalid CSRF token'
    });
  }
  
  // Pass to default error handler
  next(err);
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Connect DB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("❌ DB Error:", err);
  });
