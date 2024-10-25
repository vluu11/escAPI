import { Router } from 'express';
import { userRouter } from './user-routes.js';
import { leaderboardRouter } from './leaderboard-routes.js';
import { puzzleRouter } from './puzzle-routes.js';

const router = Router();

router.use('/users', userRouter);
router.use('/leaderboard', leaderboardRouter);
router.use('/puzzle', puzzleRouter);

export default router;
