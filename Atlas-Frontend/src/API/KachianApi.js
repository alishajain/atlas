import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Function to add kachian data
const addKachianData = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/add-kachian`, data);
    return response.data;
  } catch (error) {
    console.error('Error adding kachian data:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Function to get kachian data by RSN
const getKachianByRSN = async (RSN) => {
  try {
    const response = await axios.get(`${API_URL}/get-kachian/${RSN}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching kachian data:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export {
  addKachianData,
  getKachianByRSN
};
