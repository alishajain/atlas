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
const commentController = require('../controllers/SampleCommentController');
const yarnUsageController = require('../controllers/YarnUsageContoller');
const articleController = require('../controllers/ArticleController');
const orderController = require('../controllers/OrderController');
const orderYarnController = require('../controllers/OrderYarnController');
const orderDetailsController = require('../controllers/OrderDetailsController');

// Routes for Sample Details
router.get('/SampleList', sampleController.getSampleList);
router.post('/add-sample', sampleController.addSampleDetails);
router.get('/sample-details/:RSN', sampleController.getSampleDetailsByRSN);
router.put('/update-sample', sampleController.updateSampleRecord);
router.get('/get-latest-rsn', sampleController.getLatestRSN);
router.delete('/delete-sample/:RSN', sampleController.deleteSample);
router.put('/update-articleNo/:RSN', sampleController.updateArticleNo);

// Routes for Knitting Details
router.get('/get-size/:RSN', knittingController.getKnittingSize);
router.post('/add-knitting', knittingController.addKnittingDetails);
router.get('/knitting-details/:RSN', knittingController.getKnittingDetailsByRSN);
router.put('/update-knitting-details/:RSN', knittingController.updateKnittingDetails);

// Routes for Yarn Master
router.get('/YarnDetails', yarnController.getYarnDetails);
router.post('/add-yarn', yarnController.addYarnDetails);
router.get('/search-yarn/:YarnId', yarnController.getYarnDetailsByYarnId);
router.put('/update-yarn/:YarnId', yarnController.updateYarnDetails);

// Routes for Yarn Stock
router.get('/YarnStock', yarnStockController.getYarnStockDetails);
router.get('/yarnId', yarnStockController.getYarnIds);
router.post('/add-yarn-stock', yarnStockController.addYarnStockDetails);
router.get('/yarn/:YarnId', yarnStockController.getYarnbyYarnID);

// Routes for Employee Details
router.get('/EmployeeDetails', employeeController.getEmployeeDetails);
router.post('/add-employee', employeeController.addEmployee);
router.get('/search-employee', employeeController.searchEmployee);
router.put('/update-employee/:EmpId', employeeController.updateEmployee);
router.delete('/delete-employee/:EmpId', employeeController.deleteEmployee);

// Routes for User Master
router.get('/users', userController.getUsers);
router.post('/signup', userController.addUser);
router.post('/login', userController.loginUser);

// Routes for Machine Master
router.post('/add-machine', machineController.addMachine);
router.get('/machines', machineController.showAllMachines);
router.get('/search-machine/:MachineNo', machineController.searchMachine);
router.delete('/delete-machine/:MachineNo', machineController.deleteMachine);
router.put('/update-machine/:MachineNo', machineController.updateMachine);
router.get('/get-machineNo', machineController.getMachineNo);

// Routes for Sample Image
router.post('/upload-image', imageController.upload, imageController.uploadImage);
router.get('/image/:RSN', imageController.getImage);
router.put('/update-image/:RSN', imageController.upload, imageController.updateImage);

// Routes for Color Matching
router.get('/color-matching', colorMatchingController.getAllColorMatching); 
router.post('/add-color-matching', colorMatchingController.addColorMatching);
router.get('/color-matching/:RSN', colorMatchingController.getColorMatchingByRSN); 
router.put('/update-color-matching/:RSN', colorMatchingController.updateColorMatching);
router.delete('/delete-color-matching/:RSN', colorMatchingController.deleteColorMatching);
router.get('/get-colorId/:RSN/:MatchingName/:Panel', colorMatchingController.getColorId);
router.get('/color-panel/:RSN', colorMatchingController.getColorPanelByRSN);
router.get('/matching-name/:RSN', colorMatchingController.getMatchingNameByRSN);
router.get('/get-colorIds/:RSN/:MatchingName', colorMatchingController.getColorIds);

// Routes for Color Details
router.post('/add-color-detail', colorDetailsController.addColorDetail);
router.get('/color-details', colorDetailsController.getAllColorDetails);
router.get('/get-color-details/:ColorId', colorDetailsController.getColorDetailByColorId);
router.put('/update-color-detail/:ColorId', colorDetailsController.updateColorDetail);
router.delete('/delete-color-detail/:ColorId', colorDetailsController.deleteColorDetail);

//Routes for Sample Comments
router.get('/comments/:RSN', commentController.getComments);
router.post('/comments', commentController.addComment);

//Routes for Yarn Usage
router.post('/add-yarn-usage', yarnUsageController.addYarnUsage);
router.get('/get-yarn-usage/:ArticleNo', yarnUsageController.getYarnUsageByArticleNo);

//Routes for Article Master
router.post('/add-article', articleController.addArticleMaster);
router.get('/get-article-numbers', articleController.getAllArticleNos);

//Routes for Order Details
router.post('/add-order', orderController.addOrderDetails);
router.put('/update-order/:OrderNo', orderController.updateOrderDetails);
router.put('/update-order-status/:OrderNo', orderController.updateOrderStatus);
router.delete('/delete-order/:OrderNo', orderController.deleteOrder);
router.get('/get-all-orders', orderController.getAllOrders);
router.get('/get-order/:OrderNo', orderController.getOrderDetails);
router.get('/get-orderNo', orderController.getLatestOrderNo);

// Routes for Order Yarn
router.post('/add-order-yarn', orderYarnController.addOrderYarn);

//Routes for Order Details
router.post('/add-order-details', orderDetailsController.addOrderDetails);
router.put('/update-order-details', orderDetailsController.updateOrderDetails);

// Export the router to use it in the main server file
module.exports = router;
