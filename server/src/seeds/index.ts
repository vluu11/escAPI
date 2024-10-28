import { seedUsers } from './user-seeds.js';
import { seedLeaderboard } from './leaderboard-seed.js';
import { seedRooms } from './room-seeds.js';
import { seedPuzzles } from './puzzle-seeds.js';
import sequelize from '../config/connection.js';

const seedAll = async (): Promise<void> => {
  try {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');

    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n');

    await seedLeaderboard();
    console.log('\n----- LEADERBAORD SEEDED -----\n');

    await seedPuzzles();
    console.log('\n----- PUZZLES SEEDED -----\n');

    await seedRooms();
    console.log('\n----- ROOMS SEEDED -----\n');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedAll();
