import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const deposit = (userId, amount) =>
  axios.post(`${API_URL}/deposit`, { userId, amount });

export const withdraw = (userId, amount) =>
  axios.post(`${API_URL}/withdraw`, { userId, amount });

export const getBalance = (userId) =>
  axios.get(`${API_URL}/${userId}`);

export const getTransactions = (userId) =>
  axios.get(`${API_URL}/transactions/${userId}`);

export const getDailySummary = (userId) =>
  axios.get(`${API_URL}/daily-summary/${userId}`);
