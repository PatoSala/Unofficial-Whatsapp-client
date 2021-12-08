const express = require('express');
const router = express.Router();

const whatsappApiController = require('../controllers/whatsappApiController');

// whatsapp related endpoints

router.get('/whatsapp/init', whatsappApiController.init);

router.get('/whatsapp/info', whatsappApiController.getClientInfo);

router.get('/whatsapp/info/:wid', whatsappApiController.getChatInfo);

router.get('/whatsapp/chats', whatsappApiController.fetchChats);

router.get('/whatsapp/messages/:wid', whatsappApiController.fetchMessages);

router.get('/whatsapp/ppic/:wid', whatsappApiController.getProfilePic)

router.get('/whatsapp/app', whatsappApiController.client);

router.get('/whatsapp/sendmessage', whatsappApiController.sendMessage);

router.get('/whatsapp/kill', whatsappApiController.kill);

module.exports = router;
