import express from "express";
import { enhanceProfessionalSummary, enhanceJobDescription, extractTextFromResume } from "../controllers/aiController.js";
import protect from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/enhance-summary", enhanceProfessionalSummary);
router.post("/enhance-job-description", enhanceJobDescription);
router.post("/upload-resume",protect, extractTextFromResume);

export default router;