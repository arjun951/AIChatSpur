const sessions = new Map();

function addMessage(sessionId, message) {
  if (!sessions.has(sessionId)) {
    sessions.set(sessionId, []);
  }
  sessions.get(sessionId).push(message);
}

function processMessage(sessionId, message) {
  const userEntry = {
    role: 'user',
    text: message,
    createdAt: new Date().toISOString(),
  };
  addMessage(sessionId, userEntry);

  const reply = `Your session ID: ${sessionId}`;
  const botEntry = {
    role: 'bot',
    text: reply,
    createdAt: new Date().toISOString(),
  };
  addMessage(sessionId, botEntry);

  return { reply, sessionId };
}

function getHistory(sessionId) {
  return sessions.get(sessionId) || [];
}

module.exports = { processMessage, getHistory };
