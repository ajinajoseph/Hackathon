import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 
           (window.location.hostname === 'localhost' ? 'http://localhost:8000' : '/_/backend'),
  timeout: 8000,
});

const handleError = (error) => {
  const message = error?.response?.data?.detail || error?.message || 'Something went wrong';
  return Promise.reject(new Error(message));
};

export const getExpenses = async () => {
  try {
    const response = await api.get('/expenses');
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const addExpense = async (payload) => {
  try {
    const response = await api.post('/expenses', payload);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const deleteExpense = async (id) => {
  try {
    const response = await api.delete(`/expenses/${id}`);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const getAnalytics = async () => {
  try {
    const response = await api.get('/analytics/summary');
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const getMonthlyTrends = async () => {
  try {
    const response = await api.get('/analytics/monthly-trends');
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const getCategoryBreakdown = async () => {
  try {
    const response = await api.get('/analytics/category-breakdown');
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const getInsights = async () => {
  try {
    const response = await api.get('/insights');
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};
