import axios from 'axios';

// Base URL for the API
const API_URL = 'http://localhost:5000/api'; // Replace with your backend URL

// Function to add a new machine
export const addMachine = async (machineData) => {
  try {
    const response = await axios.post(`${API_URL}/add-machine`, machineData);
    return response.data;
  } catch (error) {
    console.error('Error adding machine:', error);
    throw new Error('Error adding machine');
  }
};

// Function to search a machine by MachineNo
export const searchMachineByMachineNo = async (MachineNo) => {
  try {
    const response = await axios.get(`${API_URL}/search-machine/${MachineNo}`);
    return response.data;
  } catch (error) {
    console.error('Error searching machine:', error);
    throw new Error('Error searching machine');
  }
};

// Function to update a machine by MachineNo
export const updateMachineByMachineNo = async (MachineNo, updatedData) => {
 
  try {
    // Log the URL and data being sent
    console.log(`Sending PUT request to: ${API_URL}/update-machine/${MachineNo}`);
    console.log('Updated Data:', updatedData);

    const response = await axios.put(`${API_URL}/update-machine/${MachineNo}`, updatedData);
    
    // Return the response data if successful
    return response.data;
  } catch (error) {
    // Log detailed error information
    console.error('Error updating machine:', error.response || error.message);
    
    // Throw a new error to be caught by the calling function
    throw new Error('Error updating machine');
  }
};


export const getAllMachines = async () => {
  try {
    const response = await axios.get(`${API_URL}/machines`);
    return response.data; // Assume the response data contains the machines
  } catch (error) {
    console.error('Error fetching all machines:', error);
    throw error;
  }
};

export const deleteMachine = async (machineNo) => {
  try {
    const response = await axios.delete(`${API_URL}/delete-machine/${machineNo}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting machine:', error);
    throw error;
  }
};
