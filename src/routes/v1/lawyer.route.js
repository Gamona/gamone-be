/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
const express = require('express');
const multer = require('multer');
const os = require('os');
const lawyerController = require('../../controllers/lawyer.controller');
const lawyerValidation = require('../../validations/lawyer.validation');
const validate = require('../../middlewares/validate');

const router = express.Router();

router.post('/register', multer({ dest: os.tmpdir() }).single('avatar'), validate(lawyerValidation.register) , lawyerController.createLawyer);
router.post('/login', validate(lawyerValidation.login) , lawyerController.loginLawyer);

module.exports = router;