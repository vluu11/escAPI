import { User } from '../models/index.js';

export const seedUsers = async () => {
  await User.bulkCreate(
    [
      { username: 'JollyGuru', 
        email: 'jolly@guru.com', 
        password: 'password',
        progress: 1,
      },
    ],
    { individualHooks: true }
  );
};
