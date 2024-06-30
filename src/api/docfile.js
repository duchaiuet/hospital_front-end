export const fetchDocuments = async (page, pageSize) => {
  try {
    const url = new URL(
      `${process.env.REACT_APP_BASE_URL}/document-detail?page=${page}&pageSize=${pageSize}`
    );

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        accept: '*/*',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching documents:', error);
    throw error;
  }
};
