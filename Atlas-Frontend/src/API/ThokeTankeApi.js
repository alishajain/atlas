import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Function to add thoketanke data
const addThokeTankeData = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/add-thoketanke`, data);
    return response.data;
  } catch (error) {
    console.error('Error adding thoketanke data:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Function to get thoketanke data by RSN
const getThokeTankeByRSN = async (RSN) => {
  try {
    const response = await axios.get(`${API_URL}/get-thoketanke/${RSN}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching thoketanke data:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export {
  addThokeTankeData,
  getThokeTankeByRSN
};
