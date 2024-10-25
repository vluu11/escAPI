import { User } from '../models/index.js';

export const seedUsers = async () => {
  await User.bulkCreate(
    [
      { username: 'UnnaturalAngelo', 
        email: 'Unnatural@Angelo.com', 
        password: 'password',
        progress: 1,
      },
      { username: 'PlaintiveBella', 
        email: 'Plaintive@Bella.com', 
        password: 'password',
        progress: 1,
      },
      { username: 'TrickyMelvin', 
        email: 'Tricky@Melvin.com', 
        password: 'password',
        progress: 1,
      },
      { username: 'UttmostWilliams', 
        email: 'Uttmost@Williams.com', 
        password: 'password',
        progress: 1,
      },
      { username: 'WaitingAlphonse', 
        email: 'Waiting@Alphonse.com', 
        password: 'password',
        progress: 1,
      },
    ],
    { individualHooks: true }
  );
};
