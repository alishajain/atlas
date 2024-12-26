import React from 'react';
import { useNavigate } from 'react-router-dom';

const Employee = () => {
  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate('/add-employee');  // Navigate to the Add path
  };

  const handleSearchClick = () => {
    navigate('/search-employee');  // Navigate to the Search path
  };

  return (
    <div>
        <h1>Employee Actions</h1>
      <button onClick={handleAddClick}>Add</button>
      <button onClick={handleSearchClick}>Search</button>
    </div>
  );
};

export default Employee;
