import express from 'express';
import mongoose from 'mongoose';
import { config } from './config.js';
import authRoutes from './routes/authRoutes.js';
import carRoutes from './routes/carRoutes.js';
import cors from 'cors'

const app = express();

// Middleware
app.use(cors())
app.use(express.json());

// API Docs

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);

// Database Connection
mongoose
  .connect(config.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

export default app;
