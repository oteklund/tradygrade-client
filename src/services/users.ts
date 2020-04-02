import axios from 'axios';

const apiUrl: string = 'http://localhost:4000/api/users';

export const getUser = async (id: number) => {
  try {
    let response = await axios.get(`http://localhost:4000/api/users/${id}`);
    return response.data;
  } catch (error) {
    return null;
  }
};
