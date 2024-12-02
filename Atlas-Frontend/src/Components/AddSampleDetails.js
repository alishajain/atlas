import React, { useState } from "react";
import WelcomeSample from "../Pages/WelcomeSample";
import { addSampleDetails } from "../API/Api";

const AddSampleDetails = () => {
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
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [backButton, setBackButton] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (
      !articleName ||
      !designFileNo ||
      !seriesArticleFileNo ||
      !articleType ||
      !gender ||
      !machineSpeed ||
      !designer ||
      !grapher ||
      !master ||
      !sampleStatus
    ) {
      setMessage("All fields are required.");
      return;
    }

    const data = {
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
      setLoading(true);
      const result = await addSampleDetails(data);
      setMessage("Sample details added successfully." || result.message);
    } catch (error) {
      setMessage(
        error.message || "An error occurred while adding the sample details."
      );
    } finally {
      setLoading(false);
    }

    window.location.reload();
  };

  const handleMachineSpeedChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      setMachineSpeed(value);
    }
  };

  const handleBackButton = () => {
    setBackButton(true);
  };

  return (
    <div>
      {!backButton && (
        <div>
          <h2>Add Sample Details</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="articleName">Article Name:</label>
              <input
                id="articleName"
                type="text"
                value={articleName}
                onChange={(e) => setArticleName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="designFileNo">Design File Number:</label>
              <input
                id="designFileNo"
                type="text"
                value={designFileNo}
                onChange={(e) => setDesignFileNo(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="seriesArticleFileNo">
                Series Article File No:
              </label>
              <input
                id="seriesArticleFileNo"
                type="text"
                value={seriesArticleFileNo}
                onChange={(e) => setSeriesArticleFileNo(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="articleType">Article Type:</label>
              <input
                id="articleType"
                type="text"
                value={articleType}
                onChange={(e) => setArticleType(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="gender">Gender:</label>
              <input
                id="gender"
                type="text"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="machineSpeed">Machine Speed:</label>
              <input
                id="machineSpeed"
                type="number"
                value={machineSpeed}
                onChange={handleMachineSpeedChange}
                required
              />
            </div>
            <div>
              <label htmlFor="designer">Designer Name:</label>
              <input
                id="designer"
                type="text"
                value={designer}
                onChange={(e) => setDesigner(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="grapher">Grapher Name:</label>
              <input
                id="grapher"
                type="text"
                value={grapher}
                onChange={(e) => setGrapher(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="master">Master Name:</label>
              <input
                id="master"
                type="text"
                value={master}
                onChange={(e) => setMaster(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="sampleStatus">Sample Status:</label>
              <input
                id="sampleStatus"
                type="text"
                value={sampleStatus}
                onChange={(e) => setSampleStatus(e.target.value)}
                required
              />
            </div>
            <button type="submit" disabled={loading}>
              Add New
            </button>
          </form>
          {loading && <p>Loading...</p>} {/* Show loading message */}
          {message && <p>{message}</p>}
          <button onClick={handleBackButton}>Go to Welcome Page</button>
        </div>
      )}
      {backButton && <WelcomeSample />}
    </div>
  );
};

export default AddSampleDetails;
