import { DataTypes, type Sequelize, Model } from "sequelize";
import RoomAttributes from "../interface/roomsAttributes";

export class Rooms 
    extends Model<RoomAttributes> 
    implements RoomAttributes{
        
    public id!: number;
    public name!: string;
    public puzzle_id!: number;
}

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
                type: DataTypes.NUMBER,
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