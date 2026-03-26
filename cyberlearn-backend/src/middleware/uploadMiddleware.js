import busboy from 'busboy';
import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOAD_DIR = path.resolve(__dirname, '../../../uploads/study-materials');
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

export const uploadPDF = (req, res, next) => {
  const contentType = req.headers['content-type'] || '';
  if (!contentType.includes('multipart/form-data')) {
    return res.status(400).json({ success: false, message: 'Request must be multipart/form-data' });
  }

  let bb;
  try {
    bb = busboy({ headers: req.headers, limits: { fileSize: MAX_FILE_SIZE } });
  } catch {
    return res.status(400).json({ success: false, message: 'Invalid multipart request' });
  }

  const fields = {};
  let savedFilePath = null;
  let uploadedFile = null;
  let responseSent = false;   // guard against double-response
  let filePromise = null;     // resolves when writeStream finishes

  const sendError = (status, message) => {
    if (responseSent) return;
    responseSent = true;
    if (savedFilePath) fs.unlink(savedFilePath, () => {});
    res.status(status).json({ success: false, message });
  };

  bb.on('field', (name, value) => {
    fields[name] = value;
  });

  bb.on('file', (fieldname, fileStream, info) => {
    const { filename, mimeType } = info;

    if (mimeType !== 'application/pdf') {
      fileStream.resume();
      sendError(400, 'Only PDF files are allowed');
      return;
    }

    const uniqueName = `${randomUUID()}.pdf`;
    savedFilePath = path.join(UPLOAD_DIR, uniqueName);
    const writeStream = fs.createWriteStream(savedFilePath);
    let fileSize = 0;
    let limitExceeded = false;

    fileStream.on('data', (chunk) => { fileSize += chunk.length; });

    fileStream.on('limit', () => {
      limitExceeded = true;
      fileStream.resume();
      writeStream.destroy();
      sendError(400, `File exceeds maximum size of ${MAX_FILE_SIZE / 1024 / 1024}MB`);
    });

    fileStream.pipe(writeStream);

    // Wrap writeStream completion in a Promise so bb 'finish' can await it
    filePromise = new Promise((resolve, reject) => {
      writeStream.on('finish', () => {
        if (!limitExceeded) {
          uploadedFile = {
            fieldname,
            originalName: filename,
            filePath: `study-materials/${uniqueName}`,
            mimeType,
            fileSize,
          };
        }
        resolve();
      });
      writeStream.on('error', (err) => {
        fs.unlink(savedFilePath, () => {});
        reject(err);
      });
    });
  });

  bb.on('finish', async () => {
    // Wait for the write stream to fully flush before calling next()
    try {
      if (filePromise) await filePromise;
    } catch {
      sendError(500, 'Failed to save file');
      return;
    }

    if (responseSent) return; // error already sent (e.g. wrong MIME, size limit)

    if (!uploadedFile) {
      sendError(400, 'No valid file uploaded');
      return;
    }

    req.body = { ...req.body, ...fields };
    req.uploadedFile = uploadedFile;
    next();
  });

  bb.on('error', (err) => {
    sendError(400, err.message || 'Upload error');
  });

  req.pipe(bb);
};
