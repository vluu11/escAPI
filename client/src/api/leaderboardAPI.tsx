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

    console.log(`Respoonse:`)
    console.log(response)

    const data = await response.json();

    console.log(`Data:`);
    console.log(data)

    return data;
  } catch (err) {
    console.log('Error from data retrieval:', err);
    return [];
  }
};

export { retrieveLeaderboard };