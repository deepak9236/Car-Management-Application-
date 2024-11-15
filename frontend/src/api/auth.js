import axios from 'axios';
const API_URL = 'http://localhost:5000/api/auth';

export const register = (data) => axios.post(`${API_URL}/register`, data);
export const login = (data) => axios.post(`${API_URL}/login`, data);
export const verifyToken = () => axios.get(`${API_URL}/verify`, {
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});
