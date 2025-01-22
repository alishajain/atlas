import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Function to add cutting data
const addCuttingData = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/add-cutting`, data);
    return response.data;
  } catch (error) {
    console.error('Error adding cutting data:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Function to get cutting data by RSN
const getCuttingByRSN = async (RSN) => {
  try {
    const response = await axios.get(`${API_URL}/get-cutting/${RSN}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching cutting data:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export {
  addCuttingData,
  getCuttingByRSN
};
