function validateSendMessage(req, res, next) {
  const { message, sessionId } = req.body;

  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'message is required' });
  }

  if (!sessionId || typeof sessionId !== 'string' || !sessionId.trim()) {
    return res.status(400).json({ error: 'sessionId is required' });
  }

  next();
}

function validateHistoryQuery(req, res, next) {
  const { sessionId } = req.query;

  if (!sessionId || typeof sessionId !== 'string' || !sessionId.trim()) {
    return res.status(400).json({ error: 'sessionId query param is required' });
  }

  next();
}

module.exports = { validateSendMessage, validateHistoryQuery };
