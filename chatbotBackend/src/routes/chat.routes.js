import express from 'express';
import * as chatController from '../controllers/chat.controller.js';
import {
  validateSendMessage,
  validateHistoryQuery,
} from '../middleware/validateChat.js';

const router = express.Router();

router.post('/message', validateSendMessage, chatController.sendMessage);
router.get('/history', validateHistoryQuery, chatController.getHistory);

export default router;
