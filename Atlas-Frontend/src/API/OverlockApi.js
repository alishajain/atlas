import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Function to add overlock data
const addOverlockData = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/add-overlock`, data);
    return response.data;
  } catch (error) {
    console.error('Error adding overlock data:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Function to get overlock data by RSN
const getOverlockByRSN = async (RSN) => {
  try {
    const response = await axios.get(`${API_URL}/get-overlock/${RSN}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching overlock data:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export {
  addOverlockData,
  getOverlockByRSN
};
