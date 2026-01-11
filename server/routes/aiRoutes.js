import express from "express";
import { enhanceProfessionalSummary, enhanceJobDescription, extractTextFromResume } from "../controllers/aiController.js";
import protect from "../middlewares/authMiddleware.js";
import { checkAICredits } from "../middlewares/creditsMiddleware.js";

const router = express.Router();

router.post("/enhance-summary", protect, checkAICredits, enhanceProfessionalSummary);
router.post("/enhance-job-description", protect, checkAICredits, enhanceJobDescription);
router.post("/upload-resume", protect, checkAICredits, extractTextFromResume);

export default router;