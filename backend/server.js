import express from 'express';
import { config } from './src/config.js';
import app from './src/app.js';

const server = express();

server.use(app);

server.listen(config.PORT, () => {
  console.log(`Server running on http://localhost:${config.PORT}`);
});
