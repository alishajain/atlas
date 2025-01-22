import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Function to add linking data
const addLinkingData = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/add-linking`, data);
    return response.data;
  } catch (error) {
    console.error('Error adding linking data:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Function to get linking data by RSN
const getLinkingByRSN = async (RSN) => {
  try {
    const response = await axios.get(`${API_URL}/get-linking/${RSN}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching linking data:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export {
  addLinkingData,
  getLinkingByRSN
};
