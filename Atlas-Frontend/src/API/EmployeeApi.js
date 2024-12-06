import axios from "axios";

const API_URL = "http://localhost:5000/api";

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
        // Send a POST request with the employee data
        const response = await axios.post(`${API_URL}/add-employee`, employeeData);

        // Return the response from the backend
        return response.data;
    } catch (error) {
        console.error('Error adding employee:', error);

        // Return the error message
        throw new Error('Failed to add employee. Please try again later.');
    }
};

export const searchEmployee = async (empId, empName) => {
    try {
        const response = await axios.get(`${API_URL}/search-employee`, {
            params: {
                empId: empId || undefined,  // Send undefined if the field is empty
                empName: empName || undefined, // Send undefined if the field is empty
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching employee details:', error);
        throw new Error('Error fetching employee details');
    }
};

// Function to delete an employee
export const deleteEmployee = async (empId) => {
    try {
        console.log(empId);
        const response = await axios.delete(`${API_URL}/delete-employee/${empId}`);
        console.log('Alisha');
        return response.data;
    } catch (error) {
        console.error('Error deleting employee:', error);
        throw new Error('Error deleting employee');
    }
};

// Function to update an employee
export const updateEmployee = async (empId, employeeData) => {
    try {
        const response = await axios.put(`${API_URL}/update-employee/${empId}`, employeeData);
        return response.data;
    } catch (error) {
        console.error('Error updating employee:', error);
        throw new Error('Error updating employee');
    }
};
