import 'dotenv/config';
import './db/index.js';
import app from './app.js';
import { port } from './config/index.js';

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
