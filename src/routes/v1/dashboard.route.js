/* eslint-disable prettier/prettier */
const express = require('express');
// const auth = require('../../middlewares/auth');
const dashboardController = require('../../controllers/dashboard.controller');

const router = express.Router();

router.post('/premium', dashboardController.makePremiumUser);
router.get('/lawyer', dashboardController.lawyerDashboard);



module.exports = router;