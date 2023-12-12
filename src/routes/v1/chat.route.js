/* eslint-disable prettier/prettier */
const express = require('express');
const chatController = require('../../controllers/chat.controller');
// const auth = require('../../middlewares/auth');

const router = express.Router();

router.get('/chats', chatController.getChats);
router.get('/messages', chatController.getMessages);
router.post('/', chatController.postChat);



module.exports = router;