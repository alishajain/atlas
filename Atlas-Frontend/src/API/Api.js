import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const addSampleDetails = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/add-sample`, data, {
      headers: { 'Content-Type': 'application/json' }
    });

    return response.data; // Return response data to the caller
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

export const addKnittingDetails = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/add-knitting`, data, {
      headers: { 'Content-Type': 'application/json' }
    });

    // Check for a successful response (e.g., status 200)
    if (response.status === 200) {
      return response.data; // Return response data to the caller
    } else {
      throw new Error('Unexpected response status: ' + response.status);
    }
  } catch (error) {
    // Enhanced error handling with more specific details
    console.error('API call error:', error);

    // Check if the error has a response (e.g., 404, 500)
    if (error.response) {
      console.error('Response error:', error.response.data);
      return { success: false, message: `Error: ${error.response.status} - ${error.response.data}` };
    } 
    // Check if the error is due to network issues or no response
    else if (error.request) {
      console.error('Request error:', error.request);
      return { success: false, message: 'No response received from the API' };
    } 
    // For other types of errors (e.g., misconfiguration)
    else {
      console.error('Error message:', error.message);
      return { success: false, message: error.message };
    }
  }
};


// This function handles the PUT request to update a record in the database
export const updateRecord = async (data) => {
  try {
    const response = await fetch('http://localhost:5000/api/update-sample', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Error updating record');
    }

    return result;
  } catch (error) {
    console.log("*********************************")
    console.error('API Error:', error);
    throw new Error(error.message || 'There was an error with the API request');
  }
};

