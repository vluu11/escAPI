const retrievePuzzles = async () => {
    try {
      const response = await fetch('/api/puzzle');
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error('invalid user API response, check network tab!');
      }
  
      return data;
    } catch (err) {
      console.log('Error from data retrieval:', err);
      return [];
    }
  };
  
  export { retrievePuzzles };