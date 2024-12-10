import axios from 'axios';

// Set base URL for API (adjust as needed)
const API_URL = 'http://localhost:5000/api'; // Change to your server URL

// Function to upload an image
export const uploadImage = async (imageData, imageName, RSN) => {
  const formData = new FormData();
  formData.append('image', imageData);
  formData.append('imageName', imageName);
  formData.append('RSN', RSN); // Include RSN in the form data

  try {
    const response = await axios.post(`${API_URL}/upload-image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error; // Rethrow the error to be handled in the component
  }
};


// Function to fetch image by RSN
export const getImageByRSN = async (RSN) => {
  try {
    const response = await axios.get(`${API_URL}/image/${RSN}`);
    return response.data; // This should return ImageData (base64 string or file path)
  } catch (error) {
    if (error.response) {
      console.error("Error fetching image:", error.response.data);
      console.error("Status Code:", error.response.status);
    } else if (error.request) {
      console.error("No response from server:", error.request);
    } else {
      console.error("Error during request setup:", error.message);
    }
    throw error; // Propagate error for further handling
  }
};
