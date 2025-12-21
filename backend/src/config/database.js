const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Simplified connection without deprecated options
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    // Log part of the URI to verify it's being read (security: don't log full URI)
    if (process.env.MONGODB_URI) {
      const maskedURI = process.env.MONGODB_URI.replace(/:([^:@]{1,})@/, ':****@');
      console.log(`Attempted to connect to: ${maskedURI}`);
    } else {
      console.log('MONGODB_URI environment variable is not defined');
    }
    process.exit(1);
  }
};

module.exports = connectDB;



