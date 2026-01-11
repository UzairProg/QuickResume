import express from "express";
import { enhanceProfessionalSummary, enhanceJobDescription, extractTextFromResume } from "../controllers/aiController.js";

const router = express.Router();

router.post("/enhance-summary", enhanceProfessionalSummary);
router.post("/enhance-job-description", enhanceJobDescription);
router.post("/upload-resume", extractTextFromResume);

export default router;