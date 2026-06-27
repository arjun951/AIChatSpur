const express = require('express');
const chatRoutes = require('./routes/chat.routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/chat', chatRoutes);

app.use(errorHandler);

module.exports = app;
