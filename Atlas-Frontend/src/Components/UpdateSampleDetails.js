import React, { useState } from "react";
import { updateRecord } from "../API/SampleApi";

const UpdateSampleDetails = ({ RSN, initialData }) => {
  const [articleName, setArticleName] = useState(initialData.ArticleName || "");
  const [designFileNo, setDesignFileNo] = useState(initialData.DesignFileNo || "");
  const [seriesArticleFileNo, setSeriesArticleFileNo] = useState(initialData.SeriesArticleFileNo || "");
  const [articleType, setArticleType] = useState(initialData.ArticleType || "");
  const [gender, setGender] = useState(initialData.Gender || "");
  const [machineSpeed, setMachineSpeed] = useState(initialData.MachineSpeed || "");
  const [designer, setDesigner] = useState(initialData.Designer || "");
  const [grapher, setGrapher] = useState(initialData.Grapher || "");
  const [master, setMaster] = useState(initialData.SampleMaster || "");
  const [sampleStatus, setSampleStatus] = useState(initialData.SampleStatus || "");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

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

    setLoading(true);
    try {
      const result = await updateRecord(data);
      setSuccessMessage(result.message);
      setError("");
    } catch (err) {
      setError(err.message);
      setSuccessMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Update Record</h2>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>RSN:</label>
          <input type="number" value={RSN} readOnly />
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
        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Record"}
        </button>
      </form>
    </div>
  );
};

export default UpdateSampleDetails;
