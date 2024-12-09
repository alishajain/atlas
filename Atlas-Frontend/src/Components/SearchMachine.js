import React, { useState } from 'react';
import { searchMachineByMachineNo, deleteMachine} from '../API/MachineApi'; // Assuming deleteMachineByMachineNo API function exists
import UpdateMachine from './UpdateMachine'; // Assume you have UpdateMachine component

const SearchMachine = () => {
  const [machineNo, setMachineNo] = useState('');
  const [machines, setMachines] = useState([]); // To store the list of machines
  const [error, setError] = useState('');
  const [showUpdate, setShowUpdate] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState(null); // To track the selected machine for updating

  const handleSearch = async () => {
    try {
      const result = await searchMachineByMachineNo(machineNo);
      setMachines(result.data); // Assuming result.data is an array of machines
      setError('');
    } catch (err) {
      setError('Machine not found');
      setMachines([]); // Clear machines if no machine found
    }
  };

  const handleUpdate = (machine) => {
    setSelectedMachine(machine); // Set the selected machine for updating
    setShowUpdate(true); // Show the Update form
  };

  const handleDelete = async (machineNo) => {
    try {
      const result = await deleteMachine(machineNo); // Call the delete API
      alert('Record Deleted');
      if (result.success) {
        // Remove the deleted machine from the list of machines
        setMachines((prevMachines) => prevMachines.filter((machine) => machine.MachineNo !== machineNo));
        setError('');
      } else {
        //setError('Failed to delete machine');
      }
    } catch (err) {
      //setError('Error deleting machine');
    }
  };

  const goBackToSearch = () => {
    setShowUpdate(false); // Hide the update form and go back to search
    setSelectedMachine(null); // Clear the selected machine
  };

  return (
    <div>
      <h1>Search Machine</h1>
      <input
        type="text"
        placeholder="Enter MachineNo"
        value={machineNo}
        onChange={(e) => setMachineNo(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {machines.length > 0 && !showUpdate && (
        <div>
          <h2>Machine Details</h2>
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {machines.map((machine) => (
                <tr key={machine.MachineNo}>
                  <td>{machine.MachineNo}</td>
                  <td>{machine.ModelNo}</td>
                  <td>{machine.MachineType}</td>
                  <td>{machine.Category}</td>
                  <td>{machine.CountPeriod}</td>
                  <td>{machine.MachineSystem}</td>
                  <td>{machine.MachineStatus}</td>
                  <td>{machine.Remarks}</td>
                  <td>
                    <button onClick={() => handleUpdate(machine)}>Update</button>
                    <button onClick={() => handleDelete(machine.MachineNo)}>Delete</button> {/* Delete button */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showUpdate && (
        <div>
          <UpdateMachine machine={selectedMachine} goBack={goBackToSearch} />
          {/* Go Back Button */}
          <button onClick={goBackToSearch}>Go Back</button>
        </div>
      )}
    </div>
  );
};

export default SearchMachine;
