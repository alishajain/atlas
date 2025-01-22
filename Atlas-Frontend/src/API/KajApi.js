import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Function to add kaj data
const addKajData = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/add-kaj`, data);
    return response.data;
  } catch (error) {
    console.error('Error adding kaj data:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Function to get kaj data by RSN
const getKajByRSN = async (RSN) => {
  try {
    const response = await axios.get(`${API_URL}/get-kaj/${RSN}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching kaj data:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export {
  addKajData,
  getKajByRSN
};
