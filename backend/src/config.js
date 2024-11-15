import dotenv from 'dotenv';
dotenv.config();

export const config = {
  PORT: process.env.PORT || 5001,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/carManagementDB',
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret',
};
