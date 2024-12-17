import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Create a new color matching entry
const addColorMatching = async (colorData) => {

    console.log(colorData);
  try {
    // Ensure headers are set if needed (e.g., Content-Type, Authorization, etc.)
    const response = await axios.post(`${API_URL}/add-color-matching`, colorData, {
      headers: {
        "Content-Type": "application/json", // Adjust if the server expects something different
      },
    });

    // Log and return the response data
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    // Log more detailed error information
    console.error("Error creating color matching:", error.response ? error.response.data : error.message);

    // Throwing the error with additional context
    throw new Error(`Error during API call: ${error.response ? error.response.data : error.message}`);
  }
};

// Get all color matching entries
const getAllColorMatching = async () => {
  try {
    const response = await axios.get(`${API_URL}/color-matching`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all color matching entries:", error);
    throw error;
  }
};

// Get color matching by RSN
const getColorMatchingByRSN = async (RSN) => {
  try {
    const response = await axios.get(`${API_URL}/color-matching/${RSN}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching color matching for RSN ${RSN}:`, error);
    throw error;
  }
};

// Update color matching entry by RSN
const updateColorMatching = async (RSN, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/update-color-matching/${RSN}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating color matching for RSN ${RSN}:`, error);
    throw error;
  }
};

// Delete color matching entry by RSN
const deleteColorMatching = async (RSN) => {
  try {
    const response = await axios.delete(`${API_URL}/delete-color-matching/${RSN}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting color matching for RSN ${RSN}:`, error);
    throw error;
  }
};

export {
  addColorMatching,
  getAllColorMatching,
  getColorMatchingByRSN,
  updateColorMatching,
  deleteColorMatching,
};
