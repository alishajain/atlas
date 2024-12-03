// routes/tableRoutes.js
const express = require('express');
const router = express.Router();
const sampleController = require('../controllers/SampleTableController')
const knittingController = require('../controllers/KnittingTableController');

// Route for fetching data
router.get('/SampleDetails', sampleController.getSampleDetailsData);

router.get('/KnittingDetails', knittingController.getKnittingDetails);

// Route for adding new Record
router.post('/add-sample', sampleController.addSampleDetails);
router.post('/add-knitting', knittingController.addKnittingDetails);

// Define the update route
router.put('/update-sample', sampleController.updateSampleRecord);

// Export the router to use it in the main server file
module.exports = router;
