import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Function to add pakkiwash data 
const addPakkiWashData = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/add-pakkiwash`, data);
    return response.data;
  } catch (error) {
    console.error('Error adding pakkiwash data:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Function to get pakkiwash data by RSN
const getPakkiWashByRSN = async (RSN) => {
  try {
    const response = await axios.get(`${API_URL}/get-pakkiwash/${RSN}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching pakkiwash data:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export {
  addPakkiWashData,
  getPakkiWashByRSN
};
