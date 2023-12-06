/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
const express = require('express');
const multer = require('multer');
const os = require('os');
const lawyerController = require('../../controllers/lawyer.controller');

const router = express.Router();

router.post('/', multer({ dest: os.tmpdir() }).single('avatar'), lawyerController.createLawyer);

module.exports = router;