import { Router, type Request, type Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await User.findOne({
    where: { username },
  });
  if (!user) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  const passwordIsValid = await bcrypt.compare(password, user.password);
  if (!passwordIsValid) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  const secretKey = process.env.JWT_SECRET_KEY || '';

  const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
  return res.json({ token });
};

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    // Hash the password

    const autoEmail = `${username}@escape.com`;

    // Create and save the new user
    const newUser = await User.create({ username, password, email: autoEmail , progress: 0 });

    const secretKey = process.env.JWT_SECRET_KEY || '';
    const token = jwt.sign({ username: newUser.username }, secretKey, { expiresIn: '1h' });

    return res.status(201).json({ token });
  } catch (error) {
    console.error('Error registering new user:', error);
    return res.status(500).json({ message: 'Failed to register user' });
  }
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

// POST /register - Register a new user
router.post('/register', register);

export default router;
