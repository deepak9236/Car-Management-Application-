import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCarById, deleteCar } from '../../api/car';

const ViewCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const { data } = await getCarById(id);
        setCar(data.car); // Adjusted to set the car data correctly
      } catch (err) {
        console.error('Error fetching car details', err);
      }
    };
    fetchCar();
  }, [id]);

  // Log the car state after it has been updated
  useEffect(() => {
    if (car) {
      console.log('Car fetched:', car);  // This will log the car details after state is updated
      console.log('Car Title:', car.title); // This should now correctly print the title
    }
  }, [car]); // Runs whenever 'car' changes

  const handleDelete = async () => {
    try {
      await deleteCar(id);
      navigate('/');
    } catch (err) {
      console.error('Error deleting car', err);
    }
  };

  // Handle case where car is still null
  if (!car) return <div>Loading...</div>;

  // Check if car.images exists and has at least one image
  const imageUrl = car.images && car.images.length > 0 ? `https://car-management-application-k2t8.onrender.com/uploads/${car.images[0]}` : '/path/to/default-image.jpg'; // Default image

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{car.title}</h1>
      <img src={imageUrl} alt={car.title} className="w-full h-64 object-cover mb-4" />
      <p>{car.description}</p>
      <div className="mt-4">
        <button onClick={() => navigate(`/car/update/${car._id}`)} className="bg-yellow-500 text-white p-2 rounded mr-4">Edit</button>
        <button onClick={handleDelete} className="bg-red-500 text-white p-2 rounded">Delete</button>
      </div>
    </div>
  );
};

export default ViewCar;
