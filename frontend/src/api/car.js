import axios from 'axios';
const API_URL = 'https://car-management-application-k2t8.onrender.com/api/cars';

export const createCar = (data) => axios.post(API_URL, data, {
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});
export const getCars = () => axios.get(API_URL, {
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});
export const getCarById = (id) => axios.get(`${API_URL}/${id}`, {
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});
export const updateCar = (id, data) => axios.put(`${API_URL}/${id}`, data, {
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});
export const deleteCar = (id) => axios.delete(`${API_URL}/${id}`, {
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});
