import { DataTypes, type Sequelize, Model, Optional } from 'sequelize';
import LeaderboardAttributes from '../interface/leaderboardAttributes'; 

export class Leaderboard 
    extends Model<LeaderboardAttributes, LeaderboardCreationAttributes> 
    implements LeaderboardAttributes{
        
    public id!: number;
    public user_id!: number;
    public time_to_complete!: number;
    public readonly updated_at!: Date;
}

interface LeaderboardCreationAttributes extends Optional<LeaderboardAttributes, 'id'> {}

export function LeaderboardFactory(sequelize: Sequelize): typeof Leaderboard {
    Leaderboard.init(
        {
            id:{
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            time_to_complete: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            updated_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                allowNull: false
            }
        },
        {
            tableName: 'leaderboard',
            sequelize,
            underscored: true
        }
    );

    return Leaderboard;
}