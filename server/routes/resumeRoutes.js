import express from 'express';
import { createResume, getResumeById, getPublicResumeById, updateResume, deleteResume } from '../controllers/resumeController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', protect, createResume);
router.get('/get/:resumeId', protect, getResumeById);
router.get('/public/:resumeId', getPublicResumeById);
router.put('/update', protect, updateResume);
router.delete('/delete/:resumeId', protect, deleteResume);

export default router;