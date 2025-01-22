import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Function to add pakkipress data
const addPakkiPressData = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/add-pakkipress`, data);
    return response.data;
  } catch (error) {
    console.error('Error adding pakkipress data:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Function to get pakkipress data by RSN
const getPakkiPressByRSN = async (RSN) => {
  try {
    const response = await axios.get(`${API_URL}/get-pakkipress/${RSN}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching pakkipress data:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export {
  addPakkiPressData,
  getPakkiPressByRSN
};
