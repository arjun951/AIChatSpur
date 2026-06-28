const db = require('./index');

const insertStmt = db.prepare(
  'INSERT INTO messages (user_id, role, content) VALUES (?, ?, ?)'
);

const selectByUserIdStmt = db.prepare(`
  SELECT role, content, sent_at
  FROM messages
  WHERE user_id = ?
  ORDER BY sent_at ASC
`);

const insertPair = db.transaction((userId, userContent, botContent) => {
  insertStmt.run(userId, 'user', userContent);
  insertStmt.run(userId, 'bot', botContent);
});

function insertMessagePair(userId, userContent, botContent) {
  insertPair(userId, userContent, botContent);
}

function getMessagesByUserId(userId) {
  return selectByUserIdStmt.all(userId);
}

module.exports = { insertMessagePair, getMessagesByUserId };
