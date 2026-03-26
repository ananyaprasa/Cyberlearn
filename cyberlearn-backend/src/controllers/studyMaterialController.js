import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import StudyMaterial from '../models/StudyMaterial.js';
import Classroom from '../models/Classroom.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOAD_DIR = path.resolve(__dirname, '../../../uploads');

// ── helpers ──────────────────────────────────────────────────────────────────

const hasAccess = (classroom, user) => {
  if (!user) return false;
  if (user.role === 'admin') return true;
  if (classroom.teacher.toString() === user._id.toString()) return true;
  if (user.role === 'student') {
    return classroom.students.some(s => s.toString() === user._id.toString());
  }
  return false;
};

const formatMaterial = (m) => ({
  id:           m._id.toString(),
  title:        m.title,
  originalName: m.originalName,
  fileUrl:      `http://localhost:5000/uploads/${m.filePath}`,
  fileSize:     m.fileSize,
  mimeType:     m.mimeType,
  uploadedBy:   m.uploadedBy,
  uploadedAt:   m.createdAt,
});

// ── POST /api/classrooms/:id/materials ───────────────────────────────────────
export const uploadMaterial = async (req, res) => {
  console.log("UPLOAD HIT");
  try {
    const classroom = await Classroom.findById(req.params.id);
    if (!classroom) {
      return res.status(404).json({ success: false, message: 'Classroom not found' });
    }

    // Only the classroom's teacher (or admin) can upload
    if (
      req.user.role !== 'admin' &&
      classroom.teacher.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ success: false, message: 'Only the classroom teacher can upload materials' });
    }

    const { title } = req.body;
    if (!title || !title.trim()) {
      // Clean up uploaded file since we're rejecting
      if (req.uploadedFile) {
        fs.unlink(path.join(UPLOAD_DIR, req.uploadedFile.filePath), () => {});
      }
      return res.status(400).json({ success: false, message: 'Title is required' });
    }

    if (!req.uploadedFile) {
      return res.status(400).json({ success: false, message: 'PDF file is required' });
    }

    const material = await StudyMaterial.create({
      title:        title.trim(),
      filePath:     req.uploadedFile.filePath,
      originalName: req.uploadedFile.originalName,
      mimeType:     req.uploadedFile.mimeType,
      fileSize:     req.uploadedFile.fileSize,
      classroom:    classroom._id,
      uploadedBy:   req.user._id,
    });

    res.status(201).json({ success: true, data: formatMaterial(material) });
  } catch (error) {
    // Clean up file on DB error
    if (req.uploadedFile) {
      fs.unlink(path.join(UPLOAD_DIR, req.uploadedFile.filePath), () => {});
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── GET /api/classrooms/:id/materials ────────────────────────────────────────
export const getMaterials = async (req, res) => {
  try {
    const classroom = await Classroom.findById(req.params.id);
    if (!classroom) {
      return res.status(404).json({ success: false, message: 'Classroom not found' });
    }

    if (!hasAccess(classroom, req.user)) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    const materials = await StudyMaterial.find({ classroom: classroom._id })
      .sort({ createdAt: -1 })
      .lean();

    res.json({ success: true, data: materials.map(formatMaterial) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── DELETE /api/materials/:materialId ────────────────────────────────────────
export const deleteMaterial = async (req, res) => {
  try {
    const material = await StudyMaterial.findById(req.params.materialId);
    if (!material) {
      return res.status(404).json({ success: false, message: 'Material not found' });
    }

    const classroom = await Classroom.findById(material.classroom);

    // Only classroom teacher or admin can delete
    if (
      req.user.role !== 'admin' &&
      classroom?.teacher.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ success: false, message: 'Only the classroom teacher can delete materials' });
    }

    // Remove file from disk
    const filePath = path.join(UPLOAD_DIR, material.filePath);
    fs.unlink(filePath, () => {}); // non-blocking, ignore if already gone

    await StudyMaterial.findByIdAndDelete(material._id);

    res.json({ success: true, data: { message: 'Material deleted successfully' } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
