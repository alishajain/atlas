import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Add a new color detail
const addColorDetail = async (colorData) => {
  try {
    const response = await axios.post(`${API_URL}/add-color-detail`, colorData);
    return response.data;
  } catch (error) {
    console.error("Error adding color detail:", error);
    throw error;
  }
};

// Get all color details
const getAllColorDetails = async () => {
  try {
    const response = await axios.get(`${API_URL}/color-details`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all color details:", error);
    throw error;
  }
};

// Get a specific color detail by ColorId
const getColorDetailByColorId = async (ColorId) => {
  try {
    const response = await axios.get(`${API_URL}/color-detail/${ColorId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching color detail for ColorId ${ColorId}:`, error);
    throw error;
  }
};

// Update color detail by ColorId
const updateColorDetail = async (ColorId, updatedData) => {
  try {
    const response = await axios.put(
      `${API_URL}/update-color-detail/${ColorId}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating color detail for ColorId ${ColorId}:`, error);
    throw error;
  }
};

// Delete color detail by ColorId
const deleteColorDetail = async (ColorId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/delete-color-detail/${ColorId}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error deleting color detail for ColorId ${ColorId}:`, error);
    throw error;
  }
};

export {
  addColorDetail,
  getAllColorDetails,
  getColorDetailByColorId,
  updateColorDetail,
  deleteColorDetail,
};