import express from 'express';
import { uploadMaterial, getMaterials, deleteMaterial } from '../controllers/studyMaterialController.js';
import { protect, requireTeacher } from '../middleware/authMiddleware.js';
import { uploadPDF } from '../middleware/uploadMiddleware.js';
import { csrfProtection } from '../middleware/csrfMiddleware.js';

const router = express.Router({ mergeParams: true });

// POST /api/classrooms/:id/materials
// CSRF is intentionally skipped here — csurf cannot parse multipart/form-data.
// Security is enforced by JWT auth (protect) + role check (requireTeacher).
// uploadPDF runs BEFORE any body parsing so the stream is not consumed.
router.post('/', protect, requireTeacher, uploadPDF, uploadMaterial);

// GET /api/classrooms/:id/materials
router.get('/', protect, getMaterials);

// DELETE /api/materials/:materialId — CSRF applies (JSON request, no file)
router.delete('/:materialId', protect, requireTeacher, csrfProtection, deleteMaterial);

export default router;
