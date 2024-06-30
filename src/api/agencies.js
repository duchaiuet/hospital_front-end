export const fetchAgencies = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/agency`, {
      method: 'GET',
      headers: {
        Accept: '*/*',
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
