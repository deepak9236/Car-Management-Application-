import express from 'express';
import mongoose from 'mongoose';
import { config } from './src/config.js';
import app from './src/app.js';

const server = express();

server.use(app);
// Database Connection

mongoose
  .connect(config.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

server.listen(config.PORT, () => {
  console.log(`Server running on http://localhost:${config.PORT}`);
});
