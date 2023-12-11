/* eslint-disable prettier/prettier */
const express = require('express');
const chatController = require('../../controllers/chat.controller');
// const auth = require('../../middlewares/auth');

const router = express.Router();

router.get('/', chatController.getChats);
router.post('/', chatController.postChat);



module.exports = router;