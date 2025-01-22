import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Function to add kachiwash data 
const addKachiWashData = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/add-kachiwash`, data);
    return response.data;
  } catch (error) {
    console.error('Error adding kachiwash data:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Function to get kachiwash data by RSN
const getKachiWashByRSN = async (RSN) => {
  try {
    const response = await axios.get(`${API_URL}/get-kachiwash/${RSN}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching kachiwash data:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export {
  addKachiWashData,
  getKachiWashByRSN
};
