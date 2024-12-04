import React, { useState, useEffect } from "react";
import { updateRecord, getSampleDetailsByRSN } from "../API/Api";

const UpdateSampleDetails = ({ RSN }) => {
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
  const [loading, setLoading] = useState(false);

  // Fetch data when RSN changes
  useEffect(() => {
    if (RSN) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await getSampleDetailsByRSN(RSN);
          const data = response.data;

          // Populate form with fetched data
          setArticleName(data.ArticleName || "");
          setDesignFileNo(data.DesignFileNo || "");
          setSeriesArticleFileNo(data.SeriesArticleFileNo || "");
          setArticleType(data.ArticleType || "");
          setGender(data.Gender || "");
          setMachineSpeed(data.MachineSpeed || "");
          setDesigner(data.Designer || "");
          setGrapher(data.Grapher || "");
          setMaster(data.SampleMaster || "");
          setSampleStatus(data.SampleStatus || "");
        } catch (err) {
          setError("Failed to fetch Sample details.");
        } finally {
          setLoading(false);
        }
        
      };
      fetchData();
    }
  }, [RSN]); // Re-fetch when RSN changes

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
      setSuccessMessage(result.message);
      setError(""); // Reset error message if the update was successful
    } catch (err) {
      setError(err.message);
      setSuccessMessage(""); // Reset success message if there was an error
    }
  };

  return (
    <div>
      <h2>Update Record</h2>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>RSN:</label>
            <input
              type="number"
              value={RSN} // Use the RSN prop directly (make it read-only)
              readOnly
            />
          </div>
          <div>
            <label>Article Name:</label>
            <input
              type="text"
              value={articleName}
              onChange={(e) => setArticleName(e.target.value)}
            />
          </div>
          <div>
            <label>Design File No:</label>
            <input
              type="text"
              value={designFileNo}
              onChange={(e) => setDesignFileNo(e.target.value)}
            />
          </div>
          <div>
            <label>Series Article File No:</label>
            <input
              type="text"
              value={seriesArticleFileNo}
              onChange={(e) => setSeriesArticleFileNo(e.target.value)}
            />
          </div>
          <div>
            <label>Article Type:</label>
            <input
              type="text"
              value={articleType}
              onChange={(e) => setArticleType(e.target.value)}
            />
          </div>
          <div>
            <label>Gender:</label>
            <input
              type="text"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />
          </div>
          <div>
            <label>Machine Speed:</label>
            <input
              type="number"
              value={machineSpeed}
              onChange={(e) => setMachineSpeed(e.target.value)}
            />
          </div>
          <div>
            <label>Designer:</label>
            <input
              type="text"
              value={designer}
              onChange={(e) => setDesigner(e.target.value)}
            />
          </div>
          <div>
            <label>Grapher:</label>
            <input
              type="text"
              value={grapher}
              onChange={(e) => setGrapher(e.target.value)}
            />
          </div>
          <div>
            <label>Sample Master:</label>
            <input
              type="text"
              value={master}
              onChange={(e) => setMaster(e.target.value)}
            />
          </div>
          <div>
            <label>Sample Status:</label>
            <input
              type="text"
              value={sampleStatus}
              onChange={(e) => setSampleStatus(e.target.value)}
            />
          </div>
          <button type="submit">Update Record</button>
        </form>
      )}
    </div>
  );
};

export default UpdateSampleDetails;
