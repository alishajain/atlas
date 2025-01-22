import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Function to add sewing data
const addSewingData = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/add-sewing`, data);
    return response.data;
  } catch (error) {
    console.error('Error adding sewing data:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Function to get sewing data by RSN
const getSewingByRSN = async (RSN) => {
  try {
    const response = await axios.get(`${API_URL}/get-sewing/${RSN}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching sewing data:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export {
  addSewingData,
  getSewingByRSN
};
