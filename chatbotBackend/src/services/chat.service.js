import { insertMessagePair, getMessagesByUserId } from '../db/message.repository.js';
import { generateReply } from './llm.service.js';
import AppError from '../utils/AppError.js';

const LLM_ERROR_MESSAGE = 'Something went wrong, please try again';

export async function processMessage(sessionId, message) {
  let reply;
  try {
    reply = await generateReply(message, sessionId);
  } catch (err) {
    console.error('LLM error:', err);
    throw new AppError(LLM_ERROR_MESSAGE, 500);
  }

  insertMessagePair(sessionId, message, reply);
  return { reply, sessionId };
}

export function getHistory(sessionId) {
  const rows = getMessagesByUserId(sessionId);

  return rows.map((row) => ({
    role: row.role,
    text: row.content,
    createdAt: new Date(row.sent_at + 'Z').toISOString(),
  }));
}
