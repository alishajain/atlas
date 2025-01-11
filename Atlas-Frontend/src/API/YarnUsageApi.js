import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const addYarnUsage = async (yarnUsageData) => {
  try {
    const response = await axios.post(`${API_URL}/add-yarn-usage`, yarnUsageData);
    return response.data;
  } catch (error) {
    console.error('Error adding yarn usage:', error);
    throw error;
  }
};
