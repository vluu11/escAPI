import sequelize from '../config/connection.js';
import { UserFactory } from './user.js';
import { LeaderboardFactory } from './leaderboard.js';
import { PuzzleFactory } from './puzzles.js';
import { RoomsFactory } from './rooms.js';

const User = UserFactory(sequelize);
const Leaderboard = LeaderboardFactory(sequelize);
const Puzzle = PuzzleFactory(sequelize);
const Rooms = RoomsFactory(sequelize);

export { User, Leaderboard, Puzzle, Rooms};
