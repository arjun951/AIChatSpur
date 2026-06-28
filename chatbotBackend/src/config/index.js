import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const port = process.env.PORT || 5000;
export const dbPath =
  process.env.DB_PATH || path.join(__dirname, '../../data/chat.db');
