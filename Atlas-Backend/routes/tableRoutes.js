// routes/tableRoutes.js
const express = require('express');
const router = express.Router();
const sampleController = require('../controllers/SampleTableController');
const knittingController = require('../controllers/KnittingTableController');
const yarnController = require('../controllers/YarnMasterController');
const yarnStockController = require('../controllers/YarnInventoryController');
const employeeController = require('../controllers/EmployeeController');

// Route for fetching data
router.get('/SampleDetails', sampleController.getSampleDetailsData);
router.get('/KnittingDetails', knittingController.getKnittingDetails);
router.get('/YarnDetails', yarnController.getYarnDetails);
router.get('/YarnStock', yarnStockController.getYarnStockDetails);
router.get('/EmployeeDetails', employeeController.getEmployeeDetails);

//Route to get IDs
router.get('/yarnId', yarnStockController.getYarnIds);

// Route for adding new Record
router.post('/add-sample', sampleController.addSampleDetails);
router.post('/add-knitting', knittingController.addKnittingDetails);
router.post('/add-yarn', yarnController.addYarnDetails);
router.post('/add-yarn-stock', yarnStockController.addYarnStockDetails);
router.post('/add-employee', employeeController.addEmployee);

// Route to search
router.get('/search-employee', employeeController.searchEmployee);

// Define the update route
router.get('/sample-details/:RSN', sampleController.getSampleDetailsByRSN);
router.put('/update-sample', sampleController.updateSampleRecord);
router.get('/knitting-details/:RSN', knittingController.getKnittingDetailsByRSN);
router.put('/knitting-details/:RSN', knittingController.updateKnittingDetails);
router.put('/update-employee/:EmpId', employeeController.updateEmployee);

//Route for deletion
router.delete('/delete-employee/:EmpId', employeeController.deleteEmployee);

// Export the router to use it in the main server file
module.exports = router;
