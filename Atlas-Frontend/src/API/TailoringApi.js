import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Function to add tailoring data
const addTailoringData = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/add-tailoring`, data);
    return response.data;
  } catch (error) {
    console.error('Error adding tailoring data:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Function to get tailoring data by RSN
const getTailoringByRSN = async (RSN) => {
  try {
    const response = await axios.get(`${API_URL}/get-tailoring/${RSN}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tailoring data:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export {
  addTailoringData,
  getTailoringByRSN
};
