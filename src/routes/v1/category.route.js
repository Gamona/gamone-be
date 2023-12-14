/* eslint-disable prettier/prettier */
const express = require('express');
const { categoryController } = require('../../controllers');

const router = express.Router();


router.get('/limit', categoryController.getCategoriesLimit);
router.get('/all', categoryController.getCategoriesAll);

module.exports = router;