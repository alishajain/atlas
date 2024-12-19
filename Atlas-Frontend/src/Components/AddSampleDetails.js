import React, { useState } from "react";
import { addSampleDetails } from "../API/SampleApi";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

const AddSampleDetails = () => {
  const [formData, setFormData] = useState({
    articleName: "",
    designFileNo: "",
    seriesArticleFileNo: "",
    articleType: "",
    gender: "",
    machineSpeed: "",
    designer: "",
    grapher: "",
    master: "",
    sampleStatus: "",
  });

  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleMachineSpeedChange = (e) => {
    const value = e.target.value;
    // Allow only numbers greater than or equal to 0
    if (!isNaN(value) && value >= 0) {
      setFormData((prevData) => ({
        ...prevData,
        machineSpeed: value,
      }));
    }
  };

  const validateForm = () => {
    const {
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
    } = formData;

    return (
      articleName &&
      designFileNo &&
      seriesArticleFileNo &&
      articleType &&
      gender &&
      machineSpeed &&
      designer &&
      grapher &&
      master &&
      sampleStatus
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setMessage("All fields are required.");
      return;
    }

    const {
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
    } = formData;

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
      setMessage(result.message || "Sample details added successfully.");

      // Redirect to PanelSelection with RSN passed as a state
      navigate(`/panel-selection/${result.RSN}`, {
        state: { RSN: result.RSN },
      }); // Navigate to PanelSelection with RSN as state
    } catch (error) {
      setMessage(
        error.message || "An error occurred while adding the sample details."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Add Sample Details</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label htmlFor={key}>
              {key.replace(/([A-Z])/g, " $1").toUpperCase()}:
            </label>
            <input
              id={key}
              type={key === "machineSpeed" ? "number" : "text"}
              value={formData[key]}
              onChange={
                key === "machineSpeed" ? handleMachineSpeedChange : handleChange
              }
              required
            />
          </div>
        ))}
        <button type="submit" disabled={loading}>
          Add New
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddSampleDetails;
