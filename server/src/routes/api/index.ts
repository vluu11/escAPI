import { Router } from 'express';
import { userRouter } from './user-routes.js';
import { leaderboardRouter } from './leaderboard-routes.js';
import { puzzleRouter } from './puzzle-routes.js';
import { roomRouter } from './room-routes.js';

const router = Router();

router.use('/users', userRouter);
router.use('/leaderboard', leaderboardRouter);
router.use('/puzzle', puzzleRouter);
router.use('/room', roomRouter)

export default router;
