import React, { useState } from "react";
import { addSampleDetails } from "../API/SampleApi";

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

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleMachineSpeedChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value)) {
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

    const { articleName, designFileNo, seriesArticleFileNo, articleType, gender, machineSpeed, designer, grapher, master, sampleStatus } = formData;

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
    } catch (error) {
      setMessage(error.message || "An error occurred while adding the sample details.");
    } finally {
      setLoading(false);
    }

    window.location.reload();
  };

  return (
    <div>
        <div>
          <h2>Add Sample Details</h2>
          <form onSubmit={handleSubmit}>
            {Object.keys(formData).map((key) => (
              <div key={key}>
                <label htmlFor={key}>{key.replace(/([A-Z])/g, " $1").toUpperCase()}:</label>
                <input
                  id={key}
                  type={key === "machineSpeed" ? "number" : "text"}
                  value={formData[key]}
                  onChange={key === "machineSpeed" ? handleMachineSpeedChange : handleChange}
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
    </div>
  );
};

export default AddSampleDetails;
