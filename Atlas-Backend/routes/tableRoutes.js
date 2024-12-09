const express = require('express');
const router = express.Router();

// Import controllers
const sampleController = require('../controllers/SampleTableController');
const knittingController = require('../controllers/KnittingTableController');
const yarnController = require('../controllers/YarnMasterController');
const yarnStockController = require('../controllers/YarnInventoryController');
const employeeController = require('../controllers/EmployeeController');
const userController = require ('../controllers/UserController');
const machineController = require ('../controllers/MachineMasterController');
const imageController = require('../controllers/ImageController');

// Routes for Sample Details
router.get('/SampleDetails', sampleController.getSampleDetailsData);
router.post('/add-sample', sampleController.addSampleDetails);
router.get('/sample-details/:RSN', sampleController.getSampleDetailsByRSN);
router.put('/update-sample', sampleController.updateSampleRecord);

//Routes for Knitting Details
router.get('/KnittingDetails', knittingController.getKnittingDetails);
router.post('/add-knitting', knittingController.addKnittingDetails);
router.get('/knitting-details/:RSN', knittingController.getKnittingDetailsByRSN);
router.put('/knitting-details/:RSN', knittingController.updateKnittingDetails);

//Routes for Yarn Master
router.get('/YarnDetails', yarnController.getYarnDetails);
router.post('/add-yarn', yarnController.addYarnDetails);

//Routes for Yarn Stock
router.get('/YarnStock', yarnStockController.getYarnStockDetails);
router.get('/yarnId', yarnStockController.getYarnIds);
router.post('/add-yarn-stock', yarnStockController.addYarnStockDetails);

//Routes for Employee Details
router.get('/EmployeeDetails', employeeController.getEmployeeDetails);
router.post('/add-employee', employeeController.addEmployee);
router.get('/search-employee', employeeController.searchEmployee);
router.put('/update-employee/:EmpId', employeeController.updateEmployee);
router.delete('/delete-employee/:EmpId', employeeController.deleteEmployee);

//Routes for User Master
router.get('/login', userController.getUsers);
router.post('/login', userController.addUser);

//Routes for Machine Master
router.post('/add-machine', machineController.addMachine);
router.get('/machines', machineController.showAllMachines);
router.get('/search-machine/:MachineNo', machineController.searchMachine);
router.delete('/delete-machine/:MachineNo', machineController.deleteMachine);
router.put('/update-machine/:MachineNo', machineController.updateMachine);

//Routes for Sample Image

// Export the router to use it in the main server file
module.exports = router;
