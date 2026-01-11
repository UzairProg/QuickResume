import express from 'express';
import multer from 'multer';
import { createResume, getResumeById, getPublicResumeById, updateResume, deleteResume } from '../controllers/resumeController.js';
import protect  from '../middlewares/authMiddleware.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/create', protect, createResume);
router.get('/get/:resumeId', protect, getResumeById);
router.get('/public/:resumeId', getPublicResumeById);
router.put('/update', protect, upload.single('image'), updateResume);
router.delete('/delete/:resumeId', protect, deleteResume);

export default router;