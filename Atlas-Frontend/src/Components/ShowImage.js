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
        const response = await getImageByRSN(Number(RSN));

        // Check if response data contains image and handle it
        if (response.data && response.data.length > 0 && response.data[0].ImageData) {
          const imagePath = response.data[0].ImageData.replace(/\\/g, "/");
          setImageData(imagePath);
        } else {
          throw new Error("No ImageData found in response.");
        }
      } catch (err) {
        setError("Error fetching image");
        console.error("Error details:", err);
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
          src={`http://localhost:5000/${imageData}`}
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
