import express from 'express';
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



export default app;
