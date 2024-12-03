import React, { useState } from "react";
import KnittingDetails from "../Components/KnittingDetails";
import SampleDetails from "../Components/SampleDetails";
import WelcomeSample from "./WelcomeSample";

const ShowSamples = () => {
  const [backButton, setBackButton] = useState(false);

  const handleBackButton = () => setBackButton(true);
  return (
    <div>
      {!backButton && (
        <div>
          <SampleDetails />
          <KnittingDetails />
          <button onClick={handleBackButton}>Go to Welcome Page</button>
        </div>
      )}
      {backButton && <WelcomeSample />}
    </div>
  );
};

export default ShowSamples;
