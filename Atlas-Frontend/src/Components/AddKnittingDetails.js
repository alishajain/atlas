import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { addKnittingDetails, getMachineNos } from "../API/SampleApi";

const AddKnittingDetailsForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedStates = location.state?.selectedFields || {}; // Access selected fields
  const RSN = location.state?.RSN || ""; // Access RSN

  const [formData, setFormData] = useState({
    RSN: RSN,
    Size: "",
    FrontRight: { Weight: "", Time: "", MachineNo: "" },
    FrontLeft: { Weight: "", Time: "", MachineNo: "" },
    FrontComplete: { Weight: "", Time: "", MachineNo: "" },
    BackRight: { Weight: "", Time: "", MachineNo: "" },
    BackLeft: { Weight: "", Time: "", MachineNo: "" },
    BackComplete: { Weight: "", Time: "", MachineNo: "" },
    SleeveRight: { Weight: "", Time: "", MachineNo: "" },
    SleeveLeft: { Weight: "", Time: "", MachineNo: "" },
    BothSleeves: { Weight: "", Time: "", MachineNo: "" },
    Tape: { Weight: "", Time: "", MachineNo: "" },
    Collar: { Weight: "", Time: "", MachineNo: "" },
    Kharcha1: { Weight: "", Time: "", MachineNo: "" },
    Kharcha2: { Weight: "", Time: "", MachineNo: "" },
    Kharcha3: { Weight: "", Time: "", MachineNo: "" },
    Total: { Weight: 0, Time: 0 },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [machineNos, setMachineNos] = useState([]);

  useEffect(() => {
    // Fetch machine numbers from the API
    const fetchMachineNos = async () => {
      try {
        const response = await getMachineNos();
        setMachineNos(response.data); // Set the machine numbers to state
      } catch (error) {
        setError("Failed to fetch machine numbers");
      }
    };

    fetchMachineNos();
  }, []); // Only run once on component mount

  useEffect(() => {
    // Initialize formData based on selectedStates
    setFormData((prevData) => {
      const newFormData = { ...prevData };
      Object.keys(newFormData).forEach((key) => {
        if (selectedStates[key]) {
          newFormData[key] = {
            Weight: "",
            Time: "",
            MachineNo: "", // No longer handling MachineType
          }; // Initialize with new fields
        }
      });
      return newFormData;
    });
  }, [selectedStates]); // Re-run when selectedStates change

  // Function to handle change in any input field (weight, time, machine model)
  const handleChange = (e, field, type) => {
    const { value } = e.target;

    // Ensure the value is not negative for weight and time fields
    const validValue = type === "Weight" || type === "Time"
      ? Math.max(0, parseFloat(value)) // Ensure non-negative values
      : value;

    setFormData((prevData) => {
      const newFormData = { ...prevData };

      if (!newFormData[field]) {
        newFormData[field] = {
          Weight: "",
          Time: "",
          MachineNo: "", // No longer handling MachineType
        }; // Initialize if undefined
      }

      // Set value to 0 if it's empty for weight/time or empty string for machine fields
      if (type === "Weight" || type === "Time") {
        newFormData[field][type] = validValue || 0; // Use validated value (or 0 if empty)
      } else {
        newFormData[field][type] = value === "" ? "" : value; // Set to empty string if empty
      }

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
        totalWeight += parseFloat(Weight) || 0;
        totalTime += parseFloat(Time) || 0;
      }
    });

    return { Weight: totalWeight, Time: totalTime };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure all fields have weight, time, and machine number
    const updatedFormData = { ...formData };

    Object.keys(updatedFormData).forEach((field) => {
      if (typeof updatedFormData[field] === "object") {
        const { Weight, Time, MachineNo } = updatedFormData[field];

        // Set to 0 if Weight or Time is empty
        if (Weight === "") updatedFormData[field].Weight = 0;
        if (Time === "") updatedFormData[field].Time = 0;
        if (MachineNo === "") updatedFormData[field].MachineNo = ""; // No longer handling MachineType
      }
    });

    // Start loading indicator
    setLoading(true);
    setError(null);
    setSuccess(null);

    console.log(updatedFormData);
    try {
      const response = await addKnittingDetails(updatedFormData);
      setSuccess("Knitting details added successfully!");

      navigate(`/add-color-details/${RSN}`, {
        state: { RSN, selectedStates, size: formData.Size },
      });

      setFormData({
        RSN: "",
        Size: "",
        FrontRight: { Weight: "", Time: "", MachineNo: "" },
        FrontLeft: { Weight: "", Time: "", MachineNo: "" },
        FrontComplete: { Weight: "", Time: "", MachineNo: "" },
        BackRight: { Weight: "", Time: "", MachineNo: "" },
        BackLeft: { Weight: "", Time: "", MachineNo: "" },
        BackComplete: { Weight: "", Time: "", MachineNo: "" },
        SleeveRight: { Weight: "", Time: "", MachineNo: "" },
        SleeveLeft: { Weight: "", Time: "", MachineNo: "" },
        BothSleeves: { Weight: "", Time: "", MachineNo: "" },
        Tape: { Weight: "", Time: "", MachineNo: "" },
        Collar: { Weight: "", Time: "", MachineNo: "" },
        Kharcha1: { Weight: "", Time: "", MachineNo: "" },
        Kharcha2: { Weight: "", Time: "", MachineNo: "" },
        Kharcha3: { Weight: "", Time: "", MachineNo: "" },
        Total: { Weight: 0, Time: 0 },
      });
    } catch (error) {
      // Handle errors if the API request fails
      setError(
        error.message || "An error occurred while adding knitting details"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Add Knitting Details</h1>
      <form onSubmit={handleSubmit}>
        <table border="1">
            <tr>
              <td>RSN:</td>
              <td colSpan="3">
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
              <td colSpan="3">
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
          <thead>
            <tr>
              <th>Field</th>
              <th>Weight</th>
              <th>Time</th>
              <th>Machine No</th>
            </tr>
          </thead>
          <tbody>

            {Object.keys(selectedStates)
              .filter((field) => selectedStates[field])
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
                  <td>
                    <select
                      value={formData[field]?.MachineNo || ""}
                      onChange={(e) => handleChange(e, field, "MachineNo")}
                      required
                    >
                      <option value="">Select Machine No</option>
                      {machineNos.map((machineNo) => (
                        <option key={machineNo} value={machineNo}>
                          {machineNo}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}

            {/* Total Row */}
            <tr>
              <td>Total</td>
              <td>{formData.Total.Weight}</td>
              <td>{formData.Total.Time}</td>
              <td></td>
            </tr>
          </tbody>
        </table>

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default AddKnittingDetailsForm;
