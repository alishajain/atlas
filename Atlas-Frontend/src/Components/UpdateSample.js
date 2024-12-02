// UpdateRecord.js

import React, { useState } from "react";
import WelcomeSample from "../Pages/WelcomeSample";
import { updateRecord } from "../API/Api";

const UpdateSampleData = () => {
  const [RSN, setRSN] = useState("");
  const [articleName, setArticleName] = useState("");
  const [designFileNo, setDesignFileNo] = useState("");
  const [seriesArticleFileNo, setSeriesArticleFileNo] = useState("");
  const [articleType, setArticleType] = useState("");
  const [gender, setGender] = useState("");
  const [machineSpeed, setMachineSpeed] = useState("");
  const [designer, setDesigner] = useState("");
  const [grapher, setGrapher] = useState("");
  const [master, setMaster] = useState("");
  const [sampleStatus, setSampleStatus] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [backButton, setBackButton] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      RSN,
      articleName,
      designFileNo,
      seriesArticleFileNo,
      articleType,
      gender,
      machineSpeed,
      designer,
      grapher,
      master,
      sampleStatus,
    };

    try {
      // Call the updateRecord API function
      const result = await updateRecord(data);

      // Handle success response
      setSuccessMessage(result.message);
      setError(""); // Reset error message if the update was successful
    } catch (err) {
      // Handle error
      setError(err.message);
      setSuccessMessage(""); // Reset success message if there was an error
    }

    window.location.reload();
  };

  const handleBackButton = () => {
    setBackButton(true);
  };

  return (
    <div>
      {!backButton && (
        <div>
          <h2>Update Record</h2>

          {/* Display success message */}
          {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

          {/* Display error message */}
          {error && <p style={{ color: "red" }}>{error}</p>}

          <form onSubmit={handleSubmit}>
            <div>
              <label>RSN:</label>
              <input
                type="number"
                value={RSN}
                onChange={(e) => setRSN(e.target.value)}
                placeholder="Enter RSN"
              />
            </div>
            <div>
              <label>Article Name:</label>
              <input
                type="text"
                value={articleName}
                onChange={(e) => setArticleName(e.target.value)}
                placeholder="Enter Article Name"
              />
            </div>
            <div>
              <label>Design File No:</label>
              <input
                type="text"
                value={designFileNo}
                onChange={(e) => setDesignFileNo(e.target.value)}
                placeholder="Enter Design File Number"
              />
            </div>
            <div>
              <label>Series Article File No:</label>
              <input
                type="text"
                value={seriesArticleFileNo}
                onChange={(e) => setSeriesArticleFileNo(e.target.value)}
                placeholder="Enter Series Article File Number"
              />
            </div>
            <div>
              <label>Article Type:</label>
              <input
                type="text"
                value={articleType}
                onChange={(e) => setArticleType(e.target.value)}
                placeholder="Enter Article Type"
              />
            </div>
            <div>
              <label>Gender:</label>
              <input
                type="text"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                placeholder="Enter Gender"
              />
            </div>
            <div>
              <label>Machine Speed:</label>
              <input
                type="number"
                value={machineSpeed}
                onChange={(e) => setMachineSpeed(e.target.value)}
                placeholder="Enter Machine Speed"
              />
            </div>
            <div>
              <label>Designer:</label>
              <input
                type="text"
                value={designer}
                onChange={(e) => setDesigner(e.target.value)}
                placeholder="Enter Designer Name"
              />
            </div>
            <div>
              <label>Grapher:</label>
              <input
                type="text"
                value={grapher}
                onChange={(e) => setGrapher(e.target.value)}
                placeholder="Enter Grapher Name"
              />
            </div>
            <div>
              <label>Sample Master:</label>
              <input
                type="text"
                value={master}
                onChange={(e) => setMaster(e.target.value)}
                placeholder="Enter Master Name"
              />
            </div>
            <div>
              <label>Sample Status:</label>
              <input
                type="text"
                value={sampleStatus}
                onChange={(e) => setSampleStatus(e.target.value)}
                placeholder="Enter Sample Status"
              />
            </div>
            <button type="submit">Update Record</button>
          </form>
          <button onClick={handleBackButton}>Go to Welcome Page</button>
        </div>
      )}
      {backButton && <WelcomeSample />}
    </div>
  );
};

export default UpdateSampleData;
