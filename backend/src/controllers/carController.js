import { Car } from '../models/Car.js';

// Create a new car
export const createCar = async (req, res) => {
  const { title, description, tags } = req.body;
  console.log(title, description, tags);
  const userId = req.user.id;
  console.log(userId);
  // console.log(req.files.length);

  if (!req.files || req.files.length > 2) {
    return res.status(400).json({ message: 'You can upload up to 10 images only.' });
  }

  const images = req.files.map((file) => file.path);

  try {
    const car = new Car({ title, description, tags, images, user: userId });
    await car.save();
    res.status(201).json({ message: 'Car created successfully.', car });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const listCars = async (req, res) => {
  const userId = req.user.id;
  try {
    const cars = await Car.find({ user: userId });
    res.status(200).json({ cars });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getCarById = async (req, res) => {
  const { id } = req.params;
  try {
    const car = await Car.findOne({ _id: id, user: req.user.id });
    if (!car) return res.status(404).json({ message: 'Car not found.' });
    res.status(200).json({ car });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a car's details
export const updateCar = async (req, res) => {
  const { id } = req.params;
  const { title, description, tags } = req.body;

  try {
    const car = await Car.findOneAndUpdate(
      { _id: id, user: req.user.id },
      { title, description, tags },
      { new: true }
    );

    if (!car) return res.status(404).json({ message: 'Car not found.' });

    res.status(200).json({ message: 'Car updated successfully.', car });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a car
export const deleteCar = async (req, res) => {
  const { id } = req.params;

  try {
    const car = await Car.findOneAndDelete({ _id: id, user: req.user.id });

    if (!car) return res.status(404).json({ message: 'Car not found.' });

    res.status(200).json({ message: 'Car deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
