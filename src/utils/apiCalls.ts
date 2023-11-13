import axios, { AxiosError } from 'axios';
import { store } from 'store/';
import { constants } from './defaultConstants';

const baseURL = constants.DEFAULT_BACKEND_URL;
export const API = axios.create({ baseURL, withCredentials: true });

const handleAxiosError = async (error: AxiosError) => {
  if (error.response) {
    switch (error.response.status) {
      default:
        return error;
    }
  } else {
    return error;
  }
};

// USER RELATED CALLS
/* export const login = async (body: object) => {
  try {
    const { data } = await API.post('/users/login', body);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const data = await handleAxiosError(error);
      return data;
    }
    return error;
  }
};
export const logout = async () => {
  try {
    const { data } = await API.post('/users/logout');
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const data = await handleAxiosError(error);
      return data;
    }
    return error;
  }
};
export const getCurrentUser = async () => {
  try {
    const { data } = await API.get('/users/me');
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const data = await handleAxiosError(error);
      return data;
    }
    return error;
  }
}; */
