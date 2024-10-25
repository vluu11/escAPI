import { DataTypes, type Sequelize, Model, type Optional } from 'sequelize';

interface PuzzleAttributes {
  id: number;
  room_id: number;
  description: string;
  solution: string;
}

interface PuzzleCreationAttributes extends Optional<PuzzleAttributes, 'id'> {}

export class Puzzle
  extends Model<PuzzleAttributes, PuzzleCreationAttributes>
  implements PuzzleAttributes
{
  public id!: number;
  public room_id!: number;
  public description!: string;
  public solution!: string;

}

export function PuzzleFactory(sequelize: Sequelize): typeof Puzzle {
  Puzzle.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      room_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      solution: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
        tableName: 'puzzles',
        sequelize,
      }
  );

  return Puzzle;
}
