import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Function to add kachipress data
const addKachiPressData = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/add-kachipress`, data);
    return response.data;
  } catch (error) {
    console.error('Error adding kachipress data:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Function to get kachipress data by RSN
const getKachiPressByRSN = async (RSN) => {
  try {
    const response = await axios.get(`${API_URL}/get-kachipress/${RSN}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching kachipress data:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export {
  addKachiPressData,
  getKachiPressByRSN
};
