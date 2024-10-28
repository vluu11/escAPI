import { DataTypes, type Sequelize, Model, Optional } from "sequelize";
import RoomAttributes from "../interface/roomsAttributes";

export class Rooms 
    extends Model<RoomAttributes, RoomCreationAttributes> 
    implements RoomAttributes{
        
    public id!: number;
    public name!: string;
    public puzzle_id!: number;
}

interface RoomCreationAttributes extends Optional<RoomAttributes, 'id'> {}

export function RoomsFactory(sequelize: Sequelize): typeof Rooms{
    Rooms.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            puzzle_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            modelName: 'rooms',
            sequelize,
            underscored: true
        }
    )

    return Rooms;
}