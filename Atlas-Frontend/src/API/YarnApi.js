import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const addYarnDetails = async (data) => {
  console.log(data);
  try {
    const response = await axios.post(`${API_URL}/add-yarn`, data, {
      headers: { "Content-Type": "application/json" },
    });

    return response.data; // Return response data to the caller
  } catch (error) {
    // Enhanced error handling with more specific details
    console.error("API call error:", error);

    // Check if the error has a response (e.g., 404, 500)
    if (error.response) {
      console.error("Response error:", error.response.data);
      throw new Error(
        `Error: ${error.response.status} - ${error.response.data}`
      );
    }
    // Check if the error is due to network issues or no response
    else if (error.request) {
      console.error("Request error:", error.request);
      throw new Error("No response received from the API");
    }
    // For other types of errors (e.g., misconfiguration)
    else {
      console.error("Error message:", error.message);
      throw new Error(`Error: ${error.message}`);
    }
  }
};

// Fetch Yarn IDs for the dropdown
export const getYarnIds = async () => {
  try {
    const response = await axios.get(`${API_URL}/yarnId`);
    return response.data;  // Return the Yarn IDs
  } catch (error) {
    console.error('Error fetching YarnIds:', error);
    throw new Error('Error fetching YarnIds');
  }
};

// API function to insert Yarn stock details
export const addYarnStockDetails = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/add-yarn-stock`, data, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    // Enhanced error handling with more specific details
    console.error('API call error:', error);

    // Check if the error has a response (e.g., 404, 500)
    if (error.response) {
      console.error('Response error:', error.response.data);
      throw new Error(`Error: ${error.response.status} - ${error.response.data}`);
    } 
    // Check if the error is due to network issues or no response
    else if (error.request) {
      console.error('Request error:', error.request);
      throw new Error('No response received from the API');
    } 
    // For other types of errors (e.g., misconfiguration)
    else {
      console.error('Error message:', error.message);
      throw new Error(`Error: ${error.message}`);
    }
  }
};
