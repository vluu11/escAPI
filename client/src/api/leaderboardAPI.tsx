import Auth from '../utils/auth';

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

    const data = await response.json();
    return data;
  } catch (err) {
    console.log('Error from data retrieval:', err);
    return [];
  }
};

export { retrieveLeaderboard };