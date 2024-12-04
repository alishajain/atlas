import React, { useState } from "react";
import WelcomeSample from "./WelcomeSample";
import AddSampleDetails from "../Components/AddSampleDetails";
import AddKnittingDetails from "../Components/AddKnittingDetails"

const AddSample = () => {
  const [backButton, setBackButton] = useState(false);

  const handleBackButton = () => setBackButton(true);
  return (
    <div>
      {!backButton && (
        <div>
          <AddSampleDetails />
          <AddKnittingDetails />
          <button onClick={handleBackButton}>Go to Welcome Page</button>
        </div>
      )}
      {backButton && <WelcomeSample />}
    </div>
  );
};

export default AddSample;
