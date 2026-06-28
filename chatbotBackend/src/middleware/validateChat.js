const MAX_MESSAGE_LENGTH = 1800;

export function validateSendMessage(req, res, next) {
  const { message, sessionId } = req.body;

  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'message is required' });
  }

  if (message.trim().length > MAX_MESSAGE_LENGTH) {
    return res.status(400).json({ error: 'Crossed input limit' });
  }

  if (!sessionId || typeof sessionId !== 'string' || !sessionId.trim()) {
    return res.status(400).json({ error: 'sessionId is required' });
  }

  next();
}

export function validateHistoryQuery(req, res, next) {
  const { sessionId } = req.query;

  if (!sessionId || typeof sessionId !== 'string' || !sessionId.trim()) {
    return res.status(400).json({ error: 'sessionId query param is required' });
  }

  next();
}
