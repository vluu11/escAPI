import express from 'express';
import type { Request, Response } from 'express';
import { Room } from '../../models/index.js';

const router = express.Router();

// GET /rooms - Get all rooms
router.get('/', async (_req: Request, res: Response) => {
  try {
    const rooms = await Room.findAll({});
    res.json(rooms);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// GET /rooms/:id - Get a room by id
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const room = await Room.findByPk(id, {});
    if (room) {
      res.json(room);
    } else {
      res.status(404).json({ message: 'Room not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /rooms/:id - Delete a room by id
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const room = await Room.findByPk(id);
    if (room) {
      await room.destroy();
      res.json({ message: 'Room deleted' });
    } else {
      res.status(404).json({ message: 'Room not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export { router as roomRouter };
