// api.js
export const createDocument = async (documentData) => {
  try {
    const url = new URL(`${process.env.REACT_APP_BASE_URL}/document`);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(documentData),
    });
    console.log('documentData: ', documentData);
    console.log('response: ', response);

    if (!response.ok) {
      throw new Error(`Network response was not ok ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return null; // Ensure a value is always returned
  }
};
