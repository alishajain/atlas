import React, { useState } from "react";
import { updateMachineByMachineNo } from "../API/MachineApi";

const UpdateMachine = ({ machine, goBack }) => {
  const [updatedMachine, setUpdatedMachine] = useState({ ...machine });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedMachine((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await updateMachineByMachineNo(
        machine.MachineNo,
        updatedMachine
      );
      if (result.success) {
        setSuccessMessage("Machine updated successfully");
        goBack(); // Go back to search after successful update
      }
    } catch (err) {
      setError("Error updating machine");
    }
  };

  return (
    <div>
      <h2>Update Machine</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="ModelNo">Model No</label>
              </td>
              <td>
                <input
                  type="text"
                  name="ModelNo"
                  value={updatedMachine.ModelNo}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="MachineType">Machine Type</label>
              </td>
              <td>
                <input
                  type="text"
                  name="MachineType"
                  value={updatedMachine.MachineType}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="Category">Category</label>
              </td>
              <td>
                <input
                  type="text"
                  name="Category"
                  value={updatedMachine.Category}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="CountPeriod">Count Period</label>
              </td>
              <td>
                <input
                  type="text"
                  name="CountPeriod"
                  value={updatedMachine.CountPeriod}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="MachineSystem">Machine System</label>
              </td>
              <td>
                <input
                  type="text"
                  name="MachineSystem"
                  value={updatedMachine.MachineSystem}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="MachineStatus">Machine Status</label>
              </td>
              <td>
                <input
                  type="text"
                  name="MachineStatus"
                  value={updatedMachine.MachineStatus}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="Remarks">Remarks</label>
              </td>
              <td>
                <input
                  type="text"
                  name="Remarks"
                  value={updatedMachine.Remarks}
                  onChange={handleChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit">Update Machine</button>
      </form>

      <button onClick={goBack}>Go Back</button>
    </div>
  );
};

export default UpdateMachine;
