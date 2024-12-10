import React, { useState, useEffect } from "react";
import { getImageByRSN } from "../API/ImageApi";

const ShowImage = ({ RSN }) => {
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getImageByRSN(Number(RSN));
        console.log("Image data received:", data.ImageData); // Debugging log
        
        if (data.ImageData) {
          // Check if ImageData is already base64 encoded
          setImageData(data.ImageData);  // Assuming it is in the correct format
        } else {
          throw new Error("No ImageData found in response.");
        }
      } catch (err) {
        setError("Error fetching image");
        console.error("Error details:", err); // Log the error for debugging
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [RSN]);

  if (loading) {
    return <p>Loading image...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {imageData ? (
        <img
          src={imageData}  // If it is base64, this should work correctly now
          alt="Sample"
          style={{ width: "100%", maxWidth: "600px" }}
        />
      ) : (
        <p>No image found for this RSN.</p>
      )}
    </div>
  );
};

export default ShowImage;
