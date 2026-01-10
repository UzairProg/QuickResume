import express from 'express';
import { registerUser, loginUser, getUserProfile, getUserResume } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/data', protect, getUserProfile);
router.get('/resumes', protect, getUserResume);

export default router;
