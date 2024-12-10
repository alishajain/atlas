import React, { useState } from 'react';
import { uploadImage } from '../API/ImageApi';

const AddImage = () => {
  const [RSN, setRSN] = useState('');
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');

  // Handle image file selection
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle form submit (upload image)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image || !imageName || !RSN) {
      alert("Please provide an image, a name, and RSN.");
      return;
    }

    setUploadStatus("Uploaded");

    try {
      // Ensure RSN is a number before sending it
      const numericRSN = parseInt(RSN, 10);
      if (isNaN(numericRSN)) {
        throw new Error("Invalid RSN entered.");
      }

      // Upload the image and pass RSN, imageName, and the image data
      const result = await uploadImage(image, imageName, numericRSN);
      setUploadStatus(`Image uploaded successfully! RSN: ${result.RSN}`);
    } catch (error) {
      setUploadStatus(`Error uploading image: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Upload an Image</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="RSN">RSN</label>
          <input
            type="number"
            id="RSN"
            value={RSN}
            onChange={(e) => setRSN(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="imageName">Image Name</label>
          <input
            type="text"
            id="imageName"
            value={imageName}
            onChange={(e) => setImageName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="image">Select Image</label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            accept="image/*"
            required
          />
        </div>
        <button type="submit">Upload Image</button>
      </form>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};

export default AddImage;
