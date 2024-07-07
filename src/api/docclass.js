export const fetchDocClasses = async () => {
  try {
    const url = new URL(`${process.env.REACT_APP_BASE_URL}/doc-class`);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log('data: ', data);

    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
