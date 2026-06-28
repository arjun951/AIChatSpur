import express from 'express';
import cors from 'cors';
import chatRoutes from './routes/chat.routes.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/chat', chatRoutes);

app.use(errorHandler);

export default app;
