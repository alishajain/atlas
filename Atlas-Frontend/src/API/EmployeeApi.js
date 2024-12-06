import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Function to fetch employee details
export const employeeDetails = async () => {
  try {
    const response = await axios.get(`${API_URL}/EmployeeDetails`);
    return response.data;
  } catch (error) {
    console.error("Error Fetching Employee Details", error);
    throw new Error("Error Fetching Employee Details");
  }
};

// Function to add a new employee
export const addEmployee = async (employeeData) => {
  try {
    const response = await axios.post(`${API_URL}/add-employee`, employeeData);
    return response.data;
  } catch (error) {
    console.error("Error adding employee:", error);
    throw new Error("Failed to add employee. Please try again later.");
  }
};

// Function to search for employees
export const searchEmployee = async (empId, empName) => {
  try {
    const response = await axios.get(`${API_URL}/search-employee`, {
      params: {
        empId: empId || undefined, // Send undefined if the field is empty
        empName: empName || undefined, // Send undefined if the field is empty
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching employee details:", error);
    throw new Error("Error fetching employee details");
  }
};

// Function to delete an employee
export const deleteEmployee = async (empId) => {
  try {
    const response = await axios.delete(`${API_URL}/delete-employee/${empId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting employee:", error);
    throw new Error("Error deleting employee");
  }
};

// Function to update an employee
export const updateEmployee = async (updatedEmployee) => {
  try {
    console.log(updatedEmployee); // Log to check the data being sent

    // Make a PUT request to update the employee, passing EmpId in the URL
    const response = await axios.put(
      `${API_URL}/update-employee/${updatedEmployee.EmpId}`, // Pass EmpId in the URL
      updatedEmployee // Send the updated employee data in the request body
    );

    // Assuming the response contains a `success` field to indicate success
    if (response.data.success) {
      return response.data; // Return the updated employee data on success
    } else {
      throw new Error("Failed to update employee");
    }
  } catch (error) {
    console.error("Error updating employee:", error);
    throw new Error("Error updating employee");
  }
};
