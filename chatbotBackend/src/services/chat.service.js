const messageRepository = require('../db/message.repository');
const { countWords, formatWordCountReply } = require('../utils/wordCount');

function processMessage(sessionId, message) {
  const wordCount = countWords(message);
  const reply = formatWordCountReply(wordCount);

  messageRepository.insertMessagePair(sessionId, message, reply);

  return { reply, sessionId };
}

function getHistory(sessionId) {
  const rows = messageRepository.getMessagesByUserId(sessionId);

  return rows.map((row) => ({
    role: row.role,
    text: row.content,
    createdAt: new Date(row.sent_at + 'Z').toISOString(),
  }));
}

module.exports = { processMessage, getHistory };
