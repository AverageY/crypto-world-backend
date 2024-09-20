import express from 'express';
import { getUserWatchlist } from '../controllers/userController.js';
import { checkJwt } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/:id/watchlist', getUserWatchlist);

export default router;
