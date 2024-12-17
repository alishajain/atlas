const express = require('express');
const router = express.Router();

// Import controllers
const sampleController = require('../controllers/SampleTableController');
const knittingController = require('../controllers/KnittingTableController');
const yarnController = require('../controllers/YarnMasterController');
const yarnStockController = require('../controllers/YarnInventoryController');
const employeeController = require('../controllers/EmployeeController');
const userController = require('../controllers/UserController');
const machineController = require('../controllers/MachineMasterController');
const imageController = require('../controllers/ImageController');
const colorMatchingController = require('../controllers/ColorMatchingController');
const colorDetailsController = require('../controllers/ColorDetailsController');

// Routes for Sample Details
router.get('/SampleDetails', sampleController.getSampleDetailsData);
router.post('/add-sample', sampleController.addSampleDetails);
router.get('/sample-details/:RSN', sampleController.getSampleDetailsByRSN);
router.put('/update-sample', sampleController.updateSampleRecord);
router.get('/get-latest-rsn', sampleController.getLatestRSN);

// Routes for Knitting Details
router.get('/KnittingDetails', knittingController.getKnittingDetails);
router.post('/add-knitting', knittingController.addKnittingDetails);
router.get('/knitting-details/:RSN', knittingController.getKnittingDetailsByRSN);
router.put('/knitting-details/:RSN', knittingController.updateKnittingDetails);

// Routes for Yarn Master
router.get('/YarnDetails', yarnController.getYarnDetails);
router.post('/add-yarn', yarnController.addYarnDetails);

// Routes for Yarn Stock
router.get('/YarnStock', yarnStockController.getYarnStockDetails);
router.get('/yarnId', yarnStockController.getYarnIds);
router.post('/add-yarn-stock', yarnStockController.addYarnStockDetails);

// Routes for Employee Details
router.get('/EmployeeDetails', employeeController.getEmployeeDetails);
router.post('/add-employee', employeeController.addEmployee);
router.get('/search-employee', employeeController.searchEmployee);
router.put('/update-employee/:EmpId', employeeController.updateEmployee);
router.delete('/delete-employee/:EmpId', employeeController.deleteEmployee);

// Routes for User Master
router.get('/login', userController.getUsers);
router.post('/login', userController.addUser);

// Routes for Machine Master
router.post('/add-machine', machineController.addMachine);
router.get('/machines', machineController.showAllMachines);
router.get('/search-machine/:MachineNo', machineController.searchMachine);
router.delete('/delete-machine/:MachineNo', machineController.deleteMachine);
router.put('/update-machine/:MachineNo', machineController.updateMachine);
router.get('/get-machineNo', machineController.getMachineNo);

// Routes for Sample Image
router.post('/upload-image', imageController.upload.single('image'), imageController.uploadImage);
router.get('/image/:RSN', imageController.getImage);

// Routes for Color Matching
router.get('/color-matching', colorMatchingController.getAllColorMatching); 
router.post('/add-color-matching', colorMatchingController.addColorMatching);
router.get('/color-matching/:RSN', colorMatchingController.getColorMatchingByRSN); 
router.put('/update-color-matching/:RSN', colorMatchingController.updateColorMatching);
router.delete('/delete-color-matching/:RSN', colorMatchingController.deleteColorMatching);

// Routes for Color Details
router.post('/add-color-detail', colorDetailsController.addColorDetail);
router.get('/color-details', colorDetailsController.getAllColorDetails);
router.get('/color-detail/:ColorId', colorDetailsController.getColorDetailByColorId);
router.put('/update-color-detail/:ColorId', colorDetailsController.updateColorDetail);
router.delete('/delete-color-detail/:ColorId', colorDetailsController.deleteColorDetail);

module.exports = router;

// Export the router to use it in the main server file
module.exports = router;
