import React, { useEffect, useState } from 'react';
import { getAllMachines, deleteMachine } from '../API/MachineApi'; // Make sure deleteMachine function exists in MachineApi.js
import { Link } from 'react-router-dom';

const MachineDetails = () => {
  const [machines, setMachines] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch all machines on component mount
  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const result = await getAllMachines();
        setMachines(result.data);
      } catch (err) {
        setError('Error fetching machines');
      }
    };
    fetchMachines();
  }, []);

  // Handle delete action
  const handleDelete = async (machineNo) => {
    try {
      const result = await deleteMachine(machineNo); // Ensure this function exists and works in MachineApi.js
      if (result.success) {
        setSuccess('Machine deleted successfully!');
        // Update the state to remove the deleted machine from the list
        setMachines(machines.filter((machine) => machine.MachineNo !== machineNo));
      } else {
        setError('Failed to delete the machine');
      }
    } catch (err) {
      setError('Error deleting machine');
    }
  };

  return (
    <div>
      <h1>All Machines</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <table>
        <thead>
          <tr>
            <th>MachineNo</th>
            <th>ModelNo</th>
            <th>MachineType</th>
            <th>Category</th>
            <th>Count Period</th>
            <th>Machine System</th>
            <th>MachineStatus</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {machines.length > 0 ? (
            machines.map((machine) => (
              <tr key={machine.MachineNo}>
                <td>{machine.MachineNo}</td>
                <td>{machine.ModelNo}</td>
                <td>{machine.MachineType}</td>
                <td>{machine.Category}</td>
                <th>{machine.CountPeriod}</th>
                <th>{machine.MachineSystem}</th>
                <td>{machine.MachineStatus}</td>
                <th>{machine.Remarks}</th>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No machines found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MachineDetails;
