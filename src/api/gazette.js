export const createGazette = async (data) => {
  try {
    const url = new URL(`${process.env.REACT_APP_BASE_URL}/gazette`);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};
