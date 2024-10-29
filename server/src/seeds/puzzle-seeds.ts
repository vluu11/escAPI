import { Puzzle } from '../models/index.js';

export const seedPuzzles = async () => {
  await Puzzle.bulkCreate(
    [
      {
        room_id: 1, // Ensure this corresponds to an existing room ID
        description: 'Solve the riddle of the missing key to unlock the door.',
        solution: 'key123',
      },
      {
        room_id: 2, // Replace with an appropriate existing room ID
        description: 'Arrange the colored blocks in ascending order.',
        solution: 'red-green-blue',
      },
      {
        room_id: 3, // Replace with an actual room ID
        description: 'Find the hidden object behind the old painting.',
        solution: 'amulet',
      },
    ],
    { individualHooks: true }
  );
};