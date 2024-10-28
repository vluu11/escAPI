import { Leaderboard } from '../models/index.js';

export const seedLeaderboard = async () => {
  await Leaderboard.bulkCreate(
    [
      {
        user_id: 1,
        time_to_complete: 120, // Example time in seconds
        updated_at: new Date(),
      },
      {
        user_id: 2,
        time_to_complete: 90,
        updated_at: new Date(),
      },
      {
        user_id: 3,
        time_to_complete: 150,
        updated_at: new Date(),
      },
      {
        user_id: 4,
        time_to_complete: 110,
        updated_at: new Date(),
      },
      {
        user_id: 5,
        time_to_complete: 95,
        updated_at: new Date(),
      },
    ],
    { individualHooks: true }
  );
};