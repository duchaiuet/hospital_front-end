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

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

export const getDocuments = async (
  page,
  pageSize,
  keyword,
  issueDateFrom,
  issueDateTo,
  AgencyId,
  DocClassId
) => {
  try {
    console.log('AgencyId: ', AgencyId);
    console.log('DocClassId: ', DocClassId);

    const url = new URL(`${process.env.REACT_APP_BASE_URL}/document`);

    url.searchParams.append('page', page);
    url.searchParams.append('pageSize', pageSize);

    if (keyword || keyword !== '') {
      url.searchParams.append('keyword', keyword);
    }
    if (issueDateFrom || issueDateFrom !== '') {
      url.searchParams.append('fromDate', issueDateFrom);
    }
    if (issueDateTo || issueDateTo !== '') {
      url.searchParams.append('toDate', issueDateTo);
    }

    if (AgencyId) {
      url.searchParams.append('agencyId', AgencyId);
    }

    if (DocClassId) {
      url.searchParams.append('categoryId', DocClassId);
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

export const getDocumentById = async (id) => {
  try {
    const url = new URL(`${process.env.REACT_APP_BASE_URL}/document/${id}`);

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

export const updateDocument = async (id, documentData) => {
  try {
    const url = new URL(`${process.env.REACT_APP_BASE_URL}/document/${id}`);

    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        accept: '*/*',
      },
      body: JSON.stringify(documentData),
    });

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

export const filterDocument = async (page, pageSize) => {
  try {
    const url = new URL(
      `${process.env.REACT_APP_BASE_URL}/document/filter?page=${page}&pageSize=${pageSize}`
    );

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
