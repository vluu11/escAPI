import { Room } from '../models/index.js';

export const seedRooms = async () => {
  await Room.bulkCreate(
    [
      { 
        name: 'Mystery Room',
        puzzle_id: 1 // Replace with an actual puzzle_id if needed
      },
    ],
    { individualHooks: true }
  );
};