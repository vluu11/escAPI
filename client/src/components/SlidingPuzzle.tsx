import React, { useEffect, useState } from 'react';
import './SlidingPuzzle.css';

interface SlidingPuzzleProps {
  image: string;
  contentBackgroundImage: string;
  size?: number;
  isOpen: boolean;
  onClose: () => void;
}

interface Position {
  row: number;
  col: number;
}

const SlidingPuzzle: React.FC<SlidingPuzzleProps> = ({
  image,
  contentBackgroundImage,
  size = 4,
  isOpen,
  onClose,
}) => {
  const [board, setBoard] = useState<number[][]>([]);
  const [emptyTile, setEmptyTile] = useState<Position>({ row: size - 1, col: size - 1 });

  useEffect(() => {
    const savedBoard = localStorage.getItem('puzzleBoard');
    if (savedBoard) {
      setBoard(JSON.parse(savedBoard));
    } else {
      initializeBoard();
    }
  }, [size]);

  // sets up the board
  const initializeBoard = () => {
    const newBoard = Array.from({ length: size }, (_, i) =>
      Array.from({ length: size }, (_, j) => i * size + j + 1)
    );
    newBoard[size - 1][size - 1] = 0; // set the last tile as empty
    setBoard(newBoard);
    localStorage.setItem('puzzleBoard', JSON.stringify(newBoard));
  };

  // 
  const handleTileClick = (row: number, col: number) => {
    if (
      (row === emptyTile.row && Math.abs(col - emptyTile.col) === 1) ||
      (col === emptyTile.col && Math.abs(row - emptyTile.row) === 1)
    ) {
      const newBoard = board.map((r) => r.slice());
      [newBoard[row][col], newBoard[emptyTile.row][emptyTile.col]] = [
        newBoard[emptyTile.row][emptyTile.col],
        newBoard[row][col],
      ];
      setBoard(newBoard);
      setEmptyTile({ row, col });
      localStorage.setItem('puzzleBoard', JSON.stringify(newBoard));
    }
  };

  // reset the board
  const resetGame = () => {
    localStorage.removeItem('puzzleBoard');
    initializeBoard();
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div
        className="modal-content"
        style={{ backgroundImage: `url(${contentBackgroundImage})` }}
      >
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <div className="puzzle-board">
          {board.map((row, rowIndex) =>
            row.map((tile, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`tile ${tile === 0 ? 'empty' : ''}`}
                onClick={() => handleTileClick(rowIndex, colIndex)}
                style={{
                  backgroundImage: tile === 0 ? 'none' : `url(${image})`,
                  backgroundPosition: `-${(tile % size) * 100}px -${Math.floor(tile / size) * 100}px`,
                  backgroundSize: `${size * 100}px ${size * 100}px`,
                }}
              />
            ))
          )}
        </div>
        <button onClick={resetGame}>Reset Game</button>
      </div>
    </div>
  );
};

export default SlidingPuzzle;
