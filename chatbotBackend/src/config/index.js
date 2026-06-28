const path = require('path');

module.exports = {
  port: process.env.PORT || 5000,
  dbPath: process.env.DB_PATH || path.join(__dirname, '../../data/chat.db'),
};
