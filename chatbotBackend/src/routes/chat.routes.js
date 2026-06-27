const express = require('express');
const chatController = require('../controllers/chat.controller');
const {
  validateSendMessage,
  validateHistoryQuery,
} = require('../middleware/validateChat');

const router = express.Router();

router.post('/message', validateSendMessage, chatController.sendMessage);
router.get('/history', validateHistoryQuery, chatController.getHistory);

module.exports = router;
