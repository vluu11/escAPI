import express from 'express';
import type { Request, Response } from 'express';
import { Leaderboard } from '../../models/index.js';
import { User } from '../../models/index.js';


const router = express.Router(); 

router.get('/', async (_req: Request, res: Response) => {
    try{
        const leaderboardData = await Leaderboard.findAll({
            include: {
              model: User,
              attributes: ['id', 'username'], 
            },
          });

        res.status(200).json(leaderboardData);
    }catch(error: any){
        res.status(500).json(error);
    }
})

router.post('/leaderboard', async ( req: Request, res: Response) => {

    const { user_id, time_to_complete, updated_at } = req.body

    try{
        const newLeaderboard = await Leaderboard.create({user_id, time_to_complete, updated_at});
        res.status(200).json(newLeaderboard);
    }catch(error: any){
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.put('/:id', async (req: Request, res: Response) => {
    try {

        const leaderboard = await Leaderboard.findByPk(1); 

        if (leaderboard) {

            await leaderboard.update(req.body);

            res.status(200).json(leaderboard);
        } else {
            res.status(404).json({ error: 'Leaderboard not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




export { router as leaderboardRouter };
