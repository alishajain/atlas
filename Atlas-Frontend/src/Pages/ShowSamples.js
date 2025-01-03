import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ShowSampleDetails from "../Components/ShowSampleDetails";
import ShowKnittingDetails from "../Components/ShowKnittingDetails";
import ShowImage from "../Components/ShowImage";

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
      <div style={{margin: "2%"}}>
        <ShowSampleDetails RSN={RSN} />
        <div style={{ display: "flex", justifyContent: "space-between", gap: "20px" }}>
          <div style={{ flex: "0 0 65%" }}>
            <ShowKnittingDetails RSN={RSN} />
          </div>
          <div style={{ flex: "0 0 35%" }}>
            <ShowImage RSN={RSN} />
          </div>
        </div>
        <button onClick={handleBackButton}>Back</button>
        <button onClick={handleNextButton}>Next</button>
      </div>
    </div>
  );
};

export default ShowSamples;
