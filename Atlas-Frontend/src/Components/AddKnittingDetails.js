import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { addKnittingDetails } from "../API/SampleApi"; // Assuming Api.js is in the same directory

const AddKnittingDetailsForm = () => {
  const location = useLocation();
  const selectedStates = location.state?.selectedFields || {}; // Access selected states (checkbox selections)
  const RSN = location.state?.RSN || ""; // Access RSN

  const [formData, setFormData] = useState({
    RSN: RSN,
    Size: "",
    FrontRight: { Weight: "", Time: "" },
    FrontLeft: { Weight: "", Time: "" },
    FrontComplete: { Weight: "", Time: "" },
    BackRight: { Weight: "", Time: "" },
    BackLeft: { Weight: "", Time: "" },
    BackComplete: { Weight: "", Time: "" },
    SleeveRight: { Weight: "", Time: "" },
    SleeveLeft: { Weight: "", Time: "" },
    BothSleeves: { Weight: "", Time: "" },
    Tape: { Weight: "", Time: "" },
    Collar: { Weight: "", Time: "" },
    Kharcha1: { Weight: "", Time: "" },
    Kharcha2: { Weight: "", Time: "" },
    Kharcha3: { Weight: "", Time: "" },
    Total: { Weight: 0, Time: 0 }, // Initial values for Total
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    // Initialize formData based on selectedStates
    setFormData((prevData) => {
      const newFormData = { ...prevData };
      Object.keys(newFormData).forEach((key) => {
        if (selectedStates[key]) {
          newFormData[key] = { Weight: "", Time: "" }; // Initialize only for selected states
        }
      });
      return newFormData;
    });
  }, [selectedStates]); // Re-run when selectedStates change

  // Function to handle change in any input field (weight or time)
  const handleChange = (e, field, type) => {
    const { value } = e.target;
    setFormData((prevData) => {
      const newFormData = { ...prevData };
      if (!newFormData[field]) {
        newFormData[field] = { Weight: "", Time: "" }; // Initialize if undefined
      }

      // Set value to 0 if it's empty
      newFormData[field][type] = value === "" ? 0 : value; // Set to 0 if empty

      // Recalculate total weight and total time
      newFormData.Total = calculateTotal(newFormData);
      return newFormData;
    });
  };

  // Function to calculate the total weight and total time
  const calculateTotal = (data) => {
    let totalWeight = 0;
    let totalTime = 0;

    // Iterate over the fields that contain weight and time
    Object.keys(data).forEach((key) => {
      if (key !== "RSN" && key !== "Size" && key !== "Total") {
        const { Weight, Time } = data[key];
        totalWeight += parseFloat(Weight) || 0; // Add weight, default to 0 if not a valid number
        totalTime += parseFloat(Time) || 0; // Add time, default to 0 if not a valid number
      }
    });

    return { Weight: totalWeight, Time: totalTime };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure all fields have weight and time
    const updatedFormData = { ...formData };

    Object.keys(updatedFormData).forEach((field) => {
      if (typeof updatedFormData[field] === "object") {
        const { Weight, Time } = updatedFormData[field];

        // Set to 0 if Weight or Time is empty
        if (Weight === "") updatedFormData[field].Weight = 0;
        if (Time === "") updatedFormData[field].Time = 0;
      }
    });

    // Start loading indicator
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Send the data to the backend via the API function
      const response = await addKnittingDetails(updatedFormData);

      // On success, display success message and clear form
      setSuccess("Knitting details added successfully!");
      setFormData({
        RSN: "",
        Size: "",
        FrontRight: { Weight: "", Time: "" },
        FrontLeft: { Weight: "", Time: "" },
        FrontComplete: { Weight: "", Time: "" },
        BackRight: { Weight: "", Time: "" },
        BackLeft: { Weight: "", Time: "" },
        BackComplete: { Weight: "", Time: "" },
        SleeveRight: { Weight: "", Time: "" },
        SleeveLeft: { Weight: "", Time: "" },
        BothSleeves: { Weight: "", Time: "" },
        Tape: { Weight: "", Time: "" },
        Collar: { Weight: "", Time: "" },
        Kharcha1: { Weight: "", Time: "" },
        Kharcha2: { Weight: "", Time: "" },
        Kharcha3: { Weight: "", Time: "" },
        Total: { Weight: 0, Time: 0 },
      });
    } catch (error) {
      // Handle errors if the API request fails
      setError(
        error.message || "An error occurred while adding knitting details"
      );
    } finally {
      // End loading indicator
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Add Knitting Details</h1>
      <form onSubmit={handleSubmit}>
        <table border="1">
          <thead>
            <tr>
              <th>Field</th>
              <th>Weight</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {/* Static Fields (RSN and Size) */}
            <tr>
              <td>RSN:</td>
              <td colSpan="2">
                <input
                  type="text"
                  name="RSN"
                  value={formData.RSN}
                  onChange={(e) =>
                    setFormData({ ...formData, RSN: e.target.value })
                  }
                  required
                />
              </td>
            </tr>

            <tr>
              <td>Size:</td>
              <td colSpan="2">
                <input
                  type="text"
                  name="Size"
                  value={formData.Size}
                  onChange={(e) =>
                    setFormData({ ...formData, Size: e.target.value })
                  }
                  required
                />
              </td>
            </tr>

            {/* Dynamic Fields Based on Selected States */}
            {Object.keys(selectedStates)
              .filter((field) => selectedStates[field]) // Filter only selected fields
              .map((field) => (
                <tr key={field}>
                  <td>{field}</td>
                  <td>
                    <input
                      type="number"
                      value={formData[field]?.Weight || ""}
                      onChange={(e) => handleChange(e, field, "Weight")}
                      placeholder="Weight"
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={formData[field]?.Time || ""}
                      onChange={(e) => handleChange(e, field, "Time")}
                      placeholder="Time"
                      required
                    />
                  </td>
                </tr>
              ))}

            {/* Total Row */}
            <tr>
              <td>Total</td>
              <td>{formData.Total.Weight}</td>
              <td>{formData.Total.Time}</td>
            </tr>
          </tbody>
        </table>

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      {/* Display Success or Error Messages */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default AddKnittingDetailsForm;
