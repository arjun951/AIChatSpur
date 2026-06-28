const express = require('express');
const cors = require('cors');
const chatRoutes = require('./routes/chat.routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/chat', chatRoutes);

app.use(errorHandler);

module.exports = app;
