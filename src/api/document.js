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

    if (!response.ok) {
      throw new Error(`Network response was not ok ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

export const getDocuments = async (page, pageSize, keyword) => {
  try {
    const url = new URL(`${process.env.REACT_APP_BASE_URL}/document`);
    url.searchParams.append('page', page);
    url.searchParams.append('pageSize', pageSize);
    if (keyword) {
      url.searchParams.append('keyword', keyword);
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        accept: '*/*',
      },
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

export const deleteDocument = async (id) => {
  try {
    const url = new URL(`${process.env.REACT_APP_BASE_URL}/document/${id}`);

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        accept: '*/*',
      },
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};
