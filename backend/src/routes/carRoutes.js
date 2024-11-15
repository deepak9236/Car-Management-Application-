import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import {
  createCar,
  listCars,
  getCarById,
  updateCar,
  deleteCar,
} from '../controllers/carController.js';

import { upload } from '../middlewares/uploadMiddleware.js';


const router = express.Router();

router.post('/',authMiddleware,  upload.array('images', 2), createCar);
router.get('/', authMiddleware, listCars);
router.get('/:id', authMiddleware, getCarById);
router.put('/:id', authMiddleware, updateCar);
router.delete('/:id', authMiddleware, deleteCar);

export default router;
