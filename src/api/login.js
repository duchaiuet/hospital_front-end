
export const getUserByEmail = async ( email, sub) => {
  try {
    const url = new URL(`${process.env.REACT_APP_BASE_URL}/user`);
    
    url.searchParams.append('email', email);
    url.searchParams.append('sub', sub);

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });

    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; 
  }
};