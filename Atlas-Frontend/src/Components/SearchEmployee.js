import React, { useState } from "react";
import {
  searchEmployee,
  deleteEmployee,
  updateEmployee,
} from "../API/EmployeeApi"; // Import necessary functions

const formatDate = (date) => {
  const jsDate = new Date(date);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return jsDate.toLocaleDateString("en-US", options);
};

const SearchEmployee = () => {
  const [empId, setEmpId] = useState("");
  const [empName, setEmpName] = useState("");
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await searchEmployee(empId, empName);
      if (result.success) {
        setEmployees(result.data);
      } else {
        setError("No employees found");
      }
    } catch (err) {
      setError("Error fetching employee details");
    }
    setLoading(false);
  };

  const handleDelete = async (empId) => {
    try {
      const result = await deleteEmployee(empId);
      if (result.success) {
        setEmployees(employees.filter((emp) => emp.EmpId !== empId)); // Remove deleted employee from the state
      }
    } catch (err) {
      setError("Error deleting employee");
    }
  };

  const handleUpdate = async (emp) => {
    setSelectedEmployee(emp);
    // Here you could populate the form with the selected employee's data and allow the user to update it.
  };

  return (
    <div>
      <h1>Search Employee</h1>
      <div>
        <input
          type="text"
          placeholder="EmpId"
          value={empId}
          onChange={(e) => setEmpId(e.target.value)}
        />
        <input
          type="text"
          placeholder="EmpName"
          value={empName}
          onChange={(e) => setEmpName(e.target.value)}
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <table>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Email ID</th>
            <th>Contact No</th>
            <th>Alternate Contact No</th>
            <th>Date of Birth</th>
            <th>Age</th>
            <th>Date of Joining</th>
            <th>Designation</th>
            <th>Anniversary Date</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((emp) => (
              <tr key={emp.EmpId}>
                <td>{emp.EmpId}</td>
                <td>{emp.EmpName}</td>
                <td>{emp.Address}</td>
                <td>{emp.EmailId}</td>
                <td>{emp.ContactNo}</td>
                <td>{emp.AltContactNo}</td>
                <td>{formatDate(emp.DOB)}</td>
                <td>{emp.Age}</td>
                <td>{formatDate(emp.JoiningDate)}</td>
                <td>{emp.Designation}</td>
                <td>{formatDate(emp.Anniversary)}</td>
                <td>
                  <button onClick={() => handleUpdate(emp)}>Update</button>
                  <button onClick={() => handleDelete(emp.EmpId)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No employees found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SearchEmployee;
