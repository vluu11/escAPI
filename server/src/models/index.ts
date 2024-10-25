import sequelize from '../config/connection.js';
import { LeaderboardFactory } from './leaderboard.js';
import { PuzzleFactory } from './puzzles.js';
import { RoomsFactory } from './rooms.js';
import { UserFactory } from './user.js';
import { LeaderboardFactory } from './leaderboard.js';
import { PuzzleFactory } from './puzzles.js';
import { RoomsFactory } from './rooms.js';

const Leaderboard = LeaderboardFactory(sequelize);
const Puzzle = PuzzleFactory(sequelize);
const Room = RoomsFactory(sequelize);
const User = UserFactory(sequelize);
const Leaderboard = LeaderboardFactory(sequelize);
const Puzzle = PuzzleFactory(sequelize);
const Rooms = RoomsFactory(sequelize);

<<<<<<< HEAD
export { User, Leaderboard, Puzzle, Rooms};
=======
Leaderboard.hasMany(User);
User.belongsTo(Leaderboard)

Room.hasMany(Puzzle);
Puzzle.belongsTo(Room)

export { Leaderboard, Puzzle, Room, User };
>>>>>>> 9c6446164528c7dd1f5c1d7b2d062277742f977e
