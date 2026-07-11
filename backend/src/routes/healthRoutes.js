import { Router } from 'express';
   import healthController from '../controllers/healthController.js';

   const router = Router();

   // GET /api/health
   router.get('/health', healthController.check);

   export default router;
   
