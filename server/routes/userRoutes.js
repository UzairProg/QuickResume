import express from 'express';
import { registerUser, loginUser, getUserProfile, getUserResume, googleAuthUser } from '../controllers/userController.js';
import  protect  from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.get('/data', protect, getUserProfile);
router.get('/resumes', protect, getUserResume);
router.post('/google-auth', googleAuthUser);

export default router;
