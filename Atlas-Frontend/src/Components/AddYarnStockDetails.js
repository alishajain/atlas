import React, { useState, useEffect } from "react";
import { getYarnIds, addYarnStockDetails } from "../API/YarnApi";

const AddYarnStockDetails = () => {
  const [yarnIds, setYarnIds] = useState([]); // State to store Yarn IDs
  const [selectedYarnId, setSelectedYarnId] = useState(""); // State for the selected YarnId
  const [date, setDate] = useState(""); // State for the Date input
  const [supplierName, setSupplierName] = useState(""); // State for Supplier Name
  const [supplierCity, setSupplierCity] = useState(""); // State for Supplier City
  const [weight, setWeight] = useState(""); // State for Weight
  const [amount, setAmount] = useState(""); // State for Amount
  const [message, setMessage] = useState(""); // State for success or error message
  const [loading, setLoading] = useState(false); // State to track form submission loading

  useEffect(() => {
    // Fetch Yarn IDs when the component mounts
    getYarnIds()
      .then((data) => {
        setYarnIds(data.data); // Set the Yarn IDs
      })
      .catch((error) => {
        setMessage("Error fetching Yarn IDs");
      });
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(""); // Clear previous messages

    // Prepare form data
    const formData = {
      Date: date,
      YarnId: selectedYarnId,
      SupplierName: supplierName,
      SupplierCity: supplierCity,
      Weight: weight,
      Amount: amount,
    };

    try {
      const response = await addYarnStockDetails(formData);
      if (response.success) {
        setMessage("Yarn stock details added successfully.");
        window.location.reload();
      } else {
        setMessage("Error adding yarn stock details.");
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div>
      <h2>Add Yarn Stock Details</h2>

      {message && <p>{message}</p>} {/* Show message if there's any */}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="yarnId">Yarn ID:</label>
          <select
            id="yarnId"
            value={selectedYarnId}
            onChange={(e) => setSelectedYarnId(e.target.value)}
            required
          >
            <option value="">Select Yarn ID</option>
            {yarnIds.map((yarn) => (
              <option key={yarn.YarnId} value={yarn.YarnId}>
                {yarn.YarnId}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="supplierName">Supplier Name:</label>
          <input
            type="text"
            id="supplierName"
            value={supplierName}
            onChange={(e) => setSupplierName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="supplierCity">Supplier City:</label>
          <input
            type="text"
            id="supplierCity"
            value={supplierCity}
            onChange={(e) => setSupplierCity(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="weight">Weight:</label>
          <input
            type="number"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div>
          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddYarnStockDetails;
