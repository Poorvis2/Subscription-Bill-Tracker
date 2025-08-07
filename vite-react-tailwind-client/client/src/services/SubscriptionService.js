import axios from 'axios';

const API = 'http://localhost:5000/api/subscriptions'; // Update if different

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const addSubscription = async (data) => {
  const res = await axios.post(`${API}/add`, data, getAuthHeaders());
  return res.data;
};

export const getAllSubscriptions = async () => {
  const res = await axios.get(`${API}/all`, getAuthHeaders());
  return res.data;
};

export const deleteSubscription = async (id) => {
  await axios.delete(`${API}/${id}`, getAuthHeaders());
};

export const updateSubscription = async (id, data) => {
  await axios.put(`${API}/${id}`, data, getAuthHeaders());
};
