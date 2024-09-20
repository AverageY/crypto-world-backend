import express from 'express';
import { saveUser } from '../controllers/authController.js';
import { checkJwt } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/save-user', saveUser);

export default router;
