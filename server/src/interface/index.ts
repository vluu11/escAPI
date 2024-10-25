import sequelize from "../config/connection";
import { UserFactory } from '../models/user.js';
import { LeaderboardFactory } from "../models/leaderboard";
import { PuzzleFactory } from "../models/puzzles";
import { RoomsFactory } from "../models/rooms";

const User = UserFactory(sequelize);
const Leaderboard = LeaderboardFactory(sequelize);
const Puzzle = PuzzleFactory(sequelize);
const Rooms = RoomsFactory(sequelize);


export { User, Leaderboard, Puzzle, Rooms}; 