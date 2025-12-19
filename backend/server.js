const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
console.log('Environment variables loaded from:', path.join(__dirname, '.env'));
console.log('PORT:', process.env.PORT);

const app = require('./src/app');
const connectDB = require('./src/config/database');

const PORT = process.env.PORT || 5000;

connectDB();

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});


