import axios from 'axios';

// Base URL for the API - assuming REACT_APP_API_URL is set in .env
const API_URL = process.env.REACT_APP_API_URL;

// Function to add a yarn request (POST request)
export const addOrderYarn = async (orderYarn) => {
  try {
    const response = await axios.post(`${API_URL}/add-order-yarn`, orderYarn);
    return response.data;
  } catch (error) {
    // Handle errors and return an error message
    console.error('Error adding yarn request:', error);
    throw new Error(error.response?.data?.message || 'Error adding yarn request');
  }
};
