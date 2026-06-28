import * as chatService from '../services/chat.service.js';

export async function sendMessage(req, res, next) {
  try {
    const { message, sessionId } = req.body;
    const result = await chatService.processMessage(sessionId, message);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export function getHistory(req, res, next) {
  try {
    const { sessionId } = req.query;
    const messages = chatService.getHistory(sessionId);
    res.status(200).json({ sessionId, messages });
  } catch (err) {
    next(err);
  }
}
