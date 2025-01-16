import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

// Function to add new order details
export const addOrderDetails = async (orderData) => {
  try {
    const response = await axios.post(`${API_URL}/add-order-details`, orderData);
    return response.data;
  } catch (error) {
    console.error("Error adding order details:", error);
    throw error;
  }
};

// Function to update existing order details
export const updateOrderDetails = async (orderData) => {
  try {
    const response = await axios.put(`${API_URL}/update-order-details`, orderData);
    return response.data;
  } catch (error) {
    console.error("Error updating order details:", error);
    throw error;
  }
};
