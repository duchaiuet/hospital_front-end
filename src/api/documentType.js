export async function getDocumentTypes() {
  try {
    const url = new URL(`${process.env.REACT_APP_BASE_URL}/document-type`);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        accept: '*/*',
      },
    });
    if (!response.ok) {
      throw new Error('Error fetching document types');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching document types:', error);
    throw error;
  }
}
