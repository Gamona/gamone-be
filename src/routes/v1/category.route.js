/* eslint-disable prettier/prettier */
const express = require('express');
const { categoryController } = require('../../controllers');

const router = express.Router();


router.post('/limit', categoryController.getCategoriesLimit);
router.post('/all', categoryController.getCategoriesAll);

module.exports = router;