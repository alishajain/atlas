import React, { useState, useEffect } from "react";
import { getKnittingDetailsByRSN, updateKnittingDetails } from "../API/SampleApi";

const UpdateKnittingRecord = ({ RSN }) => {
  const [formData, setFormData] = useState({
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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (RSN) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await getKnittingDetailsByRSN(RSN);
          setFormData({
            ...response.data,
            Total: calculateTotal(response.data), // Calculate total from fetched data
          });
        } catch (err) {
          setError("Failed to fetch knitting details.");
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [RSN]);

  const handleChange = (e, field, type) => {
    const { value } = e.target;
    setFormData((prevData) => {
      const newFormData = { ...prevData };
      newFormData[field][type] = value;

      // Recalculate total weight and total time
      newFormData.Total = calculateTotal(newFormData);
      return newFormData;
    });
  };

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

    // Validate that all fields have both weight and time
    for (let field in formData) {
      if (typeof formData[field] === "object") {
        const { Weight, Time } = formData[field];
        if (Weight === "" || Time === "") {
          setError(`Both weight and time must be provided for ${field}`);
          return; // Stop submission if any required field is missing
        }
      }
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Send the updated data to the backend via the API function
      const response = await updateKnittingDetails(RSN, formData);
      setSuccess("Knitting details updated successfully!");
    } catch (error) {
      setError(
        error.message || "An error occurred while updating knitting details"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Update Knitting Details</h1>

      {/* Form to update knitting details */}
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
                <input type="text" name="RSN" value={formData.RSN} disabled />
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

            {/* JSON Fields (Dynamic fields like FrontRight, FrontLeft, etc.) */}
            {[
              "FrontRight",
              "FrontLeft",
              "FrontComplete",
              "BackRight",
              "BackLeft",
              "BackComplete",
              "SleeveRight",
              "SleeveLeft",
              "BothSleeves",
              "Tape",
              "Collar",
              "Kharcha1",
              "Kharcha2",
              "Kharcha3",
            ].map((field) => (
              <tr key={field}>
                <td>{field}</td>
                <td>
                  <input
                    type="number"
                    value={formData[field].Weight}
                    onChange={(e) => handleChange(e, field, "Weight")}
                    placeholder="Weight"
                    required
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={formData[field].Time}
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
          {loading ? "Updating..." : "Update"}
        </button>
      </form>

      {/* Display Success or Error Messages */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default UpdateKnittingRecord;
