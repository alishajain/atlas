import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ShowSampleDetails from "../Components/ShowSampleDetails";
import ShowKnittingDetails from "../Components/ShowKnittingDetails";

const ShowSamples = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const RSN = location.state ? location.state.RSN : null;

  const handleNextButton = () => {
    navigate(`/show-color/${RSN}`, { state: { RSN: RSN } });
  };

  // Back button handler to navigate to the root
  const handleBackButton = () => {
    navigate("/"); // Navigate to the root path
  };

  return (
    <div>
      <div>
        <ShowSampleDetails RSN={RSN} />
        <ShowKnittingDetails RSN={RSN} />
        <button onClick={handleBackButton}>Back</button>
        <button onClick={handleNextButton}>Next</button>
      </div>
    </div>
  );
};

export default ShowSamples;
