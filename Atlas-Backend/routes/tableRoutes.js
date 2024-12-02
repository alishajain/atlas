// routes/tableRoutes.js
const express = require('express');
const router = express.Router();
const tableController = require('../controllers/tableController');

// Route for fetching data from table1
router.get('/SampleDetails', tableController.getSampleDetailsData);

// Route for fetching data from table2
router.get('/KnittingDetails', tableController.getKnittingDetailsData);

router.post(`/add-sample`, tableController.addSampleDetails);

// Define the update route
router.put('/update-sample', tableController.updateRecord);

// Export the router to use it in the main server file
module.exports = router;
