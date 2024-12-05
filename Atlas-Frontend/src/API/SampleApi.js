import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

//Adds Sample details
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

//Adds Knitting Details
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

//Updates Sample details
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
    console.error('API Error:', error);
    throw new Error(error.message || 'There was an error with the API request');
  }
};

//Fetch sample details by RSN
export const getSampleDetailsByRSN = async (RSN) => {
  console.log(RSN);
  if (!RSN) {
    throw new Error("RSN is required");
  }

  try {
    const url = `${API_URL}/sample-details/${RSN}`;
    console.log("Fetching sample details from:", url);
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching sample details:", error.response || error.message);
    throw error;
  }
};

//Fetch knitting details by RSN
export const getKnittingDetailsByRSN = async (RSN) => {
  console.log(RSN);
  if (!RSN) {
    throw new Error("RSN is required");
  }

  try {
    const url = `${API_URL}/knitting-details/${RSN}`;
    console.log("Fetching knitting details from:", url);
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching knitting details:", error.response || error.message);
    throw error;
  }
};

//Function to update the knitting details
export const updateKnittingDetails = async (RSN, knittingData) => {
  if (!RSN || !knittingData) {
    throw new Error("RSN and knittingData are required");
  }

  const url = `${API_URL}/knitting-details/${RSN}`;
  console.log("Updating knitting details at:", url);
  console.log("Knitting Data:", knittingData);

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(knittingData),
  });

  if (!response.ok) {
    const errorText = await response.text(); // Get error response body
    console.error("Error response:", errorText);
    throw new Error(`Failed to update knitting details: ${errorText}`);
  }

  let data;
  try {
    data = await response.json();
  } catch (err) {
    throw new Error("Failed to parse response data");
  }

  return data;
};