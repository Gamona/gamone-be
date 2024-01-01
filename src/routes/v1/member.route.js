/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
const express = require('express');
const multer = require('multer');
const os = require('os');
const memberController = require('../../controllers/member.controller');
const memberValidation = require('../../validations/member.validation');
const validate = require('../../middlewares/validate');

const router = express.Router();

router.post('/register/', multer({ dest: os.tmpdir() }).single('avatar'), validate(memberValidation.register) , memberController.createMember);
router.post('/login/', validate(memberValidation.login) , memberController.loginMember);
router.get('/profile/:id' , memberController.profileMember);

module.exports = router;