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
const cuttingController = require('../controllers/CuttingController');
const kachianController = require('../controllers/KachianController');
const kachiPressController = require('../controllers/KachiPressController');
const kachiWashController = require('../controllers/KachiWashController');
const kajController = require('../controllers/KajController');
const linkingController = require('../controllers/LinkingController');
const overlockController = require('../controllers/OverlockController');
const pakkiPressController = require('../controllers/PakkiPressController');
const pakkiWashController = require('../controllers/PakkiWashController');
const raffuController = require('../controllers/RaffuController');
const sewingController = require('../controllers/SewingController');
const tailoringController = require('../controllers/TailoringController');
const thokeTankeController = require('../controllers/ThokeTankeController');
const sideController = require('../controllers/SideController');

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

//Routes for Order Master
router.post('/add-order', orderController.addOrderDetails);
router.put('/update-order/:OrderNo', orderController.updateOrderDetails);
router.put('/update-order-status/:OrderNo', orderController.updateOrderStatus);
router.delete('/delete-order/:OrderNo', orderController.deleteOrder);
router.get('/get-all-orders', orderController.getAllOrders);
router.get('/get-order/:OrderNo', orderController.getOrderDetails);
router.get('/get-orderNo', orderController.getLatestOrderNo);

// Routes for Order Yarn
router.post('/add-order-yarn', orderYarnController.addOrderYarn);
router.get ('/order-yarn/:OrderNo', orderYarnController.searchOrderYarnByOrderNo)

//Routes for Order Details
router.post('/add-order-details', orderDetailsController.addOrderDetails);
router.put('/update-order-details', orderDetailsController.updateOrderDetails);
router.get('/order-details/:OrderNo', orderDetailsController.getOrderByOrderNo);

// Route for cutting process
router.get('/get-cutting', cuttingController.getCuttingByRSN);
router.post('/add-cutting', cuttingController.addCutting);

// Route for kachian process
router.get('/get-kachian', kachianController.getKachianByRSN);
router.post('/add-kachian', kachianController.addKachian);

// Route for kachi press process
router.get('/get-kachipress', kachiPressController.getKachiPressByRSN);
router.post('/add-kachipress', kachiPressController.addKachiPress);

// Route for kachi wash process
router.get('/get-kachiwash', kachiWashController.getKachiWashByRSN);
router.post('/add-kachiwash', kachiWashController.addKachiWash);

// Route for kaj process
router.get('/get-kaj', kajController.getKajByRSN);
router.post('/add-kaj', kajController.addKaj);

// Route for linking process
router.get('/get-linking', linkingController.getLinkingByRSN);
router.post('/add-linking', linkingController.addLinking);

// Routes for overlock process
router.get('/get-overlock', overlockController.getOverlockByRSN);
router.post('/add-overlock', overlockController.addOverlock);

// Routes for pakki press process
router.get('/get-pakkipress', pakkiPressController.getPakkiPressByRSN)
router.post('/add-pakkipress', pakkiPressController.addPakkiPress);

// Routes for pakki wash process
router.get('/get-pakkiwash', pakkiWashController.getPakkiWashByRSN);
router.post('/add-pakkiwash', pakkiWashController.addPakkiWash);

// Routes for raffu process
router.get('/get-raffu', raffuController.getRaffuByRSN);
router.post('/add-raffu', raffuController.addRaffu);

// Route for sewing process
router.post('/add-sewing', sewingController.addSewing);
router.get('/get-sewing', sewingController.getSewingByRSN);

// Route for tailoring process
router.get('/get-tailoring', tailoringController.getTailoringByRSN);
router.post('/add-tailoring', tailoringController.addTailoring);

// Route for thoke/tanke process
router.get('/get-thoketanke', thokeTankeController.getThokeTankeByRSN)
router.post('/add-thoketanke', thokeTankeController.addThokeTanke);

// Route for side process
router.get('/get-side', sideController.getSideByRSN);
router.add('/add-side', sideController.addSide);

// Export the router to use it in the main server file
module.exports = router;
