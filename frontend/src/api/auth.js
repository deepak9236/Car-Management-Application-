import axios from 'axios';
const API_URL = 'https://car-management-application-k2t8.onrender.com/api/auth';

export const register = (data) => axios.post(`${API_URL}/register`, data);
export const login = (data) => axios.post(`${API_URL}/login`, data);
export const verifyToken = () => axios.get(`${API_URL}/verify`, {
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});
