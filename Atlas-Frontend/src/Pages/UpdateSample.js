import React, { useState } from "react";
import WelcomeSample from "./WelcomeSample";
import RSNInput from "../Components/RSNInput"; // Import the RSNInput component
import UpdateKnittingRecord from "../Components/UpdatKnittingRecord"; // Import the KnittingDetailsForm component
import UpdateSampleDetails from "../Components/UpdateSampleDetails";
import ShowImage from "../Components/ShowImage";

const UpdateSample = () => {
  const [RSN, setRSN] = useState(null);
  const [backButton, setBackButton] = useState(false);

  const handleBackButton = () => setBackButton(true);

  const handleRSNSubmit = (enteredRSN) => {
    setRSN(enteredRSN); // Set the RSN and move to the next part
  };

  return (
    <div>
      {!backButton && (
        <div>
          {!RSN ? (
            <RSNInput onSubmit={handleRSNSubmit} />
          ) : (
            <div>
              <UpdateSampleDetails RSN={RSN} />
              <UpdateKnittingRecord RSN={RSN} />
              <ShowImage RSN={RSN} />
            </div>
          )}
          <button onClick={handleBackButton}>Go to Welcome Page</button>
        </div>
      )}
      {backButton && <WelcomeSample />}
    </div>
  );
};

export default UpdateSample;
