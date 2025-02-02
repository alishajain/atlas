const db = require("../db/database");

// Function to fetch all employee details
const getEmployeeDetails = async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM employee_details");
    res.json({ success: true, data: results });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new employee to the database
const addEmployee = async (req, res) => {
  const {
    EmpId,
    EmpName,
    Address,
    EmailId,
    ContactNo,
    AltContactNo,
    DOB,
    Age,
    JoiningDate,
    Designation,
    Anniversary,
    UserId,  // Adding UserId from the request body
  } = req.body;

  // Basic validation: Ensure all required fields are provided
  if (
    !EmpId ||
    !EmpName ||
    !EmailId ||
    !ContactNo ||
    !DOB ||
    !JoiningDate ||
    !Designation ||
    !UserId // Ensure UserId is provided
  ) {
    return res
      .status(400)
      .json({ error: "Please provide all required fields, including UserId." });
  }

  // Validate Email (must be in a valid email format)
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(EmailId)) {
    return res
      .status(400)
      .json({ error: "Please provide a valid email address." });
  }

  try {
    const dobDate = new Date(DOB);
    const joiningDate = new Date(JoiningDate);
    const anniversaryDate = Anniversary ? new Date(Anniversary) : null;

    if (
      isNaN(dobDate) ||
      isNaN(joiningDate) ||
      (anniversaryDate && isNaN(anniversaryDate))
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid date format" });
    }

    // Prepare SQL query to insert a new employee
    const query = `
      INSERT INTO employee_details 
      (EmpId, EmpName, Address, EmailId, ContactNo, AltContactNo, DOB, Age, JoiningDate, Designation, Anniversary, UserId)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // Execute the query with the provided data
    const [results] = await db.query(query, [
      EmpId,
      EmpName,
      Address,
      EmailId,
      ContactNo,
      AltContactNo,
      dobDate.toISOString().split("T")[0],
      Age,
      joiningDate.toISOString().split("T")[0],
      Designation,
      anniversaryDate ? anniversaryDate.toISOString().split("T")[0] : null,
      UserId,  // Insert UserId into the database
    ]);
    
    res.status(201).json({
      success: true,
      message: "Employee added successfully",
      data: { EmpId, EmpName },
    });
  } catch (err) {
    console.error("Error inserting employee data:", err);
    res.status(500).json({ error: "Failed to add employee" });
  }
};

// Function to handle search by EmpId or EmpName
const searchEmployee = async (req, res) => {
  const { empId, empName } = req.query;

  try {
    let query = "SELECT * FROM employee_details WHERE 1=1";
    let queryParams = [];

    if (empId) {
      query += " AND EmpId = ?";
      queryParams.push(empId);
    }

    if (empName) {
      query += " AND EmpName LIKE ?";
      queryParams.push(`%${empName}%`);
    }

    const [results] = await db.query(query, queryParams);
    res.json({ success: true, data: results });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching employee details" });
  }
};

// Function to delete an employee by EmpId
const deleteEmployee = async (req, res) => {
  const { EmpId } = req.params;

  try {
    // Check if empId exists
    if (!EmpId) {
      return res
        .status(400)
        .json({ success: false, message: "Employee ID is required" });
    }

    // Perform the deletion operation
    const result = await db.query(
      "DELETE FROM employee_details WHERE EmpId = ?",
      [EmpId]
    );

    if (result.affectedRows > 0) {
      // Successful deletion
      return res.json({
        success: true,
        message: "Employee deleted successfully",
      });
    } else {
      // No rows affected, meaning no such employee exists
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }
  } catch (error) {
    console.error("Error deleting employee:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error deleting employee" });
  }
};

// Function to update an employee's details by EmpId
const updateEmployee = async (req, res) => {
  const { EmpId } = req.params;
  const {
    EmpName,
    Address,
    EmailId,
    ContactNo,
    AltContactNo,
    DOB,
    Age,
    JoiningDate,
    Designation,
    Anniversary,
    UserId,  // Adding UserId to the update request
  } = req.body;

  // Check if all required fields are present
  if (
    !EmpName ||
    !Address ||
    !EmailId ||
    !ContactNo ||
    !DOB ||
    !Age ||
    !JoiningDate ||
    !Designation ||
    !UserId // Ensure UserId is provided
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  // Ensure dates are in the correct format
  try {
    const dobDate = new Date(DOB);
    const joiningDate = new Date(JoiningDate);
    const anniversaryDate = Anniversary ? new Date(Anniversary) : null;

    if (
      isNaN(dobDate) ||
      isNaN(joiningDate) ||
      (anniversaryDate && isNaN(anniversaryDate))
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid date format" });
    }

    // Update employee details in the database
    const result = await db.query(
      "UPDATE employee_details SET EmpName = ?, Address = ?, EmailId = ?, ContactNo = ?, AltContactNo = ?, DOB = ?, Age = ?, JoiningDate = ?, Designation = ?, Anniversary = ?, UserId = ? WHERE EmpId = ?",
      [
        EmpName,
        Address,
        EmailId,
        ContactNo,
        AltContactNo,
        dobDate.toISOString().split("T")[0],
        Age,
        joiningDate.toISOString().split("T")[0],
        Designation,
        anniversaryDate ? anniversaryDate.toISOString().split("T")[0] : null,
        UserId,  // Update UserId in the employee record
        EmpId,
      ]
    );

    if (result.affectedRows > 0) {
      res.json({ success: true, message: "Employee updated successfully" });
    } else {
      res.status(404).json({ success: false, message: "Employee not found" });
    }
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({
      success: false,
      message: "Error updating employee",
      error: error.message,
    });
  }
};

module.exports = {
  getEmployeeDetails,
  addEmployee,
  searchEmployee,
  deleteEmployee,
  updateEmployee,
};
