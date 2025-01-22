import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Function to add raffu data
const addRaffuData = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/add-raffu`, data);
    return response.data;
  } catch (error) {
    console.error('Error adding raffu data:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Function to get raffu data by RSN
const getRaffuByRSN = async (RSN) => {
  try {
    const response = await axios.get(`${API_URL}/get-raffu/${RSN}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching raffu data:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export {
  addRaffuData,
  getRaffuByRSN
};
