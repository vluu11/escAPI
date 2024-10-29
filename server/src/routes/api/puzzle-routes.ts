import express from 'express';
import type { Request, Response } from 'express';
import { Puzzle } from '../../models/index.js';

const router = express.Router();

// GET /puzzles - Get all puzzles
router.get('/', async (_req: Request, res: Response) => {
  try {
    const puzzles = await Puzzle.findAll();
    res.status(200).json(puzzles);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// GET /puzzles/:id - Get a puzzle by id
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const puzzle = await Puzzle.findByPk(id);
    if (puzzle) {
      res.json(puzzle);
    } else {
      res.status(404).json({ message: 'Puzzle not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// POST /puzzles - Create a new puzzle
router.post('/', async (req: Request, res: Response) => {
  const { room_id, description, solution } = req.body;
  try {
    const newPuzzle = await Puzzle.create({ room_id, description, solution });
    res.status(201).json(newPuzzle);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// PUT /puzzles/:id - Update a puzzle by id
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { room_id, description, solution } = req.body;
  try {
    const puzzle = await Puzzle.findByPk(id);
    if (puzzle) {
      puzzle.room_id = room_id;
      puzzle.description = description;
      puzzle.solution = solution;
      await puzzle.save();
      res.json(puzzle);
    } else {
      res.status(404).json({ message: 'Puzzle not found' });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /puzzles/:id - Delete a puzzle by id
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const puzzle = await Puzzle.findByPk(id);
    if (puzzle) {
      await puzzle.destroy();
      res.json({ message: 'Puzzle deleted' });
    } else {
      res.status(404).json({ message: 'Puzzle not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export { router as puzzleRouter };
