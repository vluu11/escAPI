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
      : {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      progress: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
    },
  );

  return Puzzle;
}
