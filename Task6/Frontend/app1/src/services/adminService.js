// adminServices.js
import axios from 'axios';
import config from './config';

export const getAllUsers = async () => {
  const token = sessionStorage.getItem('token');
  return axios.get(`${config.BASE_URL}/admin/get-users`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const getUserById = async (userId) => {
  const token = sessionStorage.getItem('token');
  return axios.get(`${config.BASE_URL}/admin/get-user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const addUser = async (userData) => {
  const token = sessionStorage.getItem('token');
  return axios.post(`${config.BASE_URL}/admin/add-user`, userData, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const updateUser = async (userId, userData) => {
  const token = sessionStorage.getItem('token');
  return axios.put(`${config.BASE_URL}/admin/update-user/${userId}`, userData, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const deleteUser = async (userId) => {
  const token = sessionStorage.getItem('token');
  return axios.delete(`${config.BASE_URL}/admin/delete-user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const addUserAddress = async (userId, addressData) => {
  const token = sessionStorage.getItem('token');
  return axios.post(`${config.BASE_URL}/admin/add-user-address/${userId}`, addressData, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const updateUserAddress = async (userId, addressData) => {
  const token = sessionStorage.getItem('token');
  return axios.put(`${config.BASE_URL}/admin/update-user-address/${userId}`, addressData, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const getUserAddress = async (userId) => {
  const token = sessionStorage.getItem('token');
  return axios.get(`${config.BASE_URL}/admin/get-user-address/${userId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};


export const createUserWithAddress = async (payload) => {
  const token = sessionStorage.getItem('token');

  return axios.post(
    `${config.BASE_URL}/admin/create-user`,
    payload,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
};