import React, { useState } from 'react';
import { addMachine } from '../API/MachineApi';

const AddMachine = () => {
  const [machineData, setMachineData] = useState({
    MachineNo: '',
    ModelNo: '',
    MachineType: '',
    Category: '',
    CountPeriod: '',
    MachineSystem: '',
    MachineStatus: '',
    Remarks: '',
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMachineData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await addMachine(machineData);
      if (result.success) {
        setSuccessMessage('Machine added successfully');
        setMachineData({
          MachineNo: '',
          ModelNo: '',
          MachineType: '',
          Category: '',
          CountPeriod: '',
          MachineSystem: '',
          MachineStatus: '',
          Remarks: '',
        });
      }
    } catch (err) {
      setError('Error adding machine');
    }
  };

  return (
    <div>
      <h1>Add New Machine</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="MachineNo"
          placeholder="MachineNo"
          value={machineData.MachineNo}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="ModelNo"
          placeholder="ModelNo"
          value={machineData.ModelNo}
          onChange={handleChange}
        />
        <input
          type="text"
          name="MachineType"
          placeholder="MachineType"
          value={machineData.MachineType}
          onChange={handleChange}
        />
        <input
          type="text"
          name="Category"
          placeholder="Category"
          value={machineData.Category}
          onChange={handleChange}
        />
        <input
          type="text"
          name="CountPeriod"
          placeholder="CountPeriod"
          value={machineData.CountPeriod}
          onChange={handleChange}
        />
        <input
          type="text"
          name="MachineSystem"
          placeholder="MachineSystem"
          value={machineData.MachineSystem}
          onChange={handleChange}
        />
        <input
          type="text"
          name="MachineStatus"
          placeholder="MachineStatus"
          value={machineData.MachineStatus}
          onChange={handleChange}
        />
        <input
          type="text"
          name="Remarks"
          placeholder="Remarks"
          value={machineData.Remarks}
          onChange={handleChange}
        />
        <button type="submit">Add Machine</button>
      </form>
    </div>
  );
};

export default AddMachine;
