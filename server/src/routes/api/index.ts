import { Router } from 'express';
import { userRouter } from './user-routes.js';
import { leaderboardRouter } from './leaderboard-routes.js';

const router = Router();

router.use('/users', userRouter);
router.use('/leaderboard', leaderboardRouter);

export default router;
