import { User } from '../models/index.js';

export const seedUsers = async () => {
  await User.bulkCreate(
    [
      { username: 'UnnaturalAngelo', 
        email: 'Unnatural@Angelo.com', 
        password: 'password',
        progress: 1,
        createdAt: new Date(),
      },
      { username: 'PlaintiveBella', 
        email: 'Plaintive@Bella.com', 
        password: 'password',
        progress: 1,
        createdAt: new Date(),
      },
      { username: 'TrickyMelvin', 
        email: 'Tricky@Melvin.com', 
        password: 'password',
        progress: 1,
        createdAt: new Date(),
      },
      { username: 'UttmostWilliams', 
        email: 'Uttmost@Williams.com', 
        password: 'password',
        progress: 1,
        createdAt: new Date(),
      },
      { username: 'WaitingAlphonse', 
        email: 'Waiting@Alphonse.com', 
        password: 'password',
        progress: 1,
        createdAt: new Date(),
      },
    ],
    { individualHooks: true }
  );
};
