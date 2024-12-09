import React from "react";
import { deleteEmployee } from "../API/EmployeeApi"; // Assuming deleteEmployee is an API function for deleting an employee

const DeleteEmployee = ({ empId, onDeleteSuccess, onDeleteError }) => {
  const handleDelete = async () => {
    try {
      const result = await deleteEmployee(empId);
      if (result.success) {
        onDeleteSuccess(empId); // Notify parent on successful delete
      }
    } catch (err) {
      onDeleteError("Error deleting employee"); // Notify parent of error
    }
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default DeleteEmployee;
