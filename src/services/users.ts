import axios from 'axios';
import { tokenAndHeaderConfig } from './util';

const apiUrl: string = 'http://localhost:4000/api/users';

export const getUser = async (id: number) => {
  try {
    let headers = await tokenAndHeaderConfig();
    let response = await axios.get(`http://localhost:4000/api/users/${id}`, {
      headers
    });
    return response.data;
  } catch (error) {
    return null;
  }
};
export const getUsers = async (id: number) => {
  try {
    let headers = await tokenAndHeaderConfig();
    let response = await axios.get('http://localhost:4000/api/users/', {
      headers
    });
    return response.data;
  } catch (error) {
    return null;
  }
};
