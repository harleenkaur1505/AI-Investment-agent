import { Router } from 'express';
import analysisController from '../controllers/analysisController.js';
import validateAnalysisInput from '../middleware/requestValidator.js';

const router = Router();

// POST /api/analyze - Validates body input and delegates to analysis controller
router.post('/analyze', validateAnalysisInput, analysisController.analyze);

export default router;
