const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export async function fetchHistory(sessionId) {
  const res = await fetch(
    `${API_BASE}/api/chat/history?sessionId=${encodeURIComponent(sessionId)}`
  );
  if (!res.ok) {
    throw new Error('Failed to load history');
  }
  return res.json();
}

export async function sendMessage(message, sessionId) {
  const res = await fetch(`${API_BASE}/api/chat/message`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, sessionId }),
  });
  if (!res.ok) {
    throw new Error('Failed to send message');
  }
  return res.json();
}
