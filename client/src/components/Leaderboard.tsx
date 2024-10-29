import React from 'react';

import { LeaderboardData } from '../interfaces/LeaderboardData';

// Define the props for the component
interface LeaderboardProps {
    board: LeaderboardData[] | null; // board can be an array of LeaderboardData objects or null
}

const Leaderboard: React.FC<LeaderboardProps> = ({ board }) => {
    return (
        <>
            <h2 className="pb-5">Leaderboard</h2>
            {board ? (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">User ID</th>
                            <th scope="col">Time to Complete</th>
                            <th scope="col">Updated At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {board.map((user) => (
                            <tr key={user.user_id}>
                                <td>{user.user_id}</td>
                                <td>{user.time_to_complete}</td>
                                <td>{user.updated_at}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No data available.</p>
            )}
        </>
    );
};

export default Leaderboard;
