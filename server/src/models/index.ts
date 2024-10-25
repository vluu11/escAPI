import sequelize from '../config/connection.js';
import { LeaderboardFactory } from './leaderboard.js';
import { PuzzleFactory } from './puzzles.js';
import { RoomsFactory } from './rooms.js';
import { UserFactory } from './user.js';

const Leaderboard = LeaderboardFactory(sequelize);
const Puzzle = PuzzleFactory(sequelize);
const Room = RoomsFactory(sequelize);
const User = UserFactory(sequelize);

Leaderboard.hasMany(User);
User.belongsTo(Leaderboard)

Room.hasMany(Puzzle);
Puzzle.belongsTo(Room)

export { Leaderboard, Puzzle, Room, User };
