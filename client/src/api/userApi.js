import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const getAllUsers = () => API.get('/users');
export const addUser = (userData) => API.post('/users', userData);
export const deleteUser = async (id) => axios.delete(`${API_BASE}/${id}`);