import Auth from '../utils/auth';
import { LeaderboardData } from '../interfaces/LeaderboardData';

const retrieveLeaderboard = async () => {
  try {
    const response = await fetch('/api/leaderboard', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error('invalid user API response, check network tab!');
    }

    const data: LeaderboardData[] = await response.json();
    console.log('data');
    console.log(data);
    return data;
  } catch (err) {
    console.log('Error from data retrieval:', err);
    return [];
  }
};

export { retrieveLeaderboard };