import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { dbPath } from '../config/index.js';

const dbDir = path.dirname(dbPath);
fs.mkdirSync(dbDir, { recursive: true });

const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS messages (
    id      INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT    NOT NULL,
    role    TEXT    NOT NULL CHECK (role IN ('user', 'bot')),
    content TEXT    NOT NULL,
    sent_at DATETIME DEFAULT (datetime('now'))
  );

  CREATE INDEX IF NOT EXISTS idx_messages_user
    ON messages(user_id, sent_at);
`);

export default db;
