import React from 'react';
import { Link } from 'react-router-dom';

const CarCard = ({ car }) => {
  const imageUrl = car.images && car.images.length > 0 ? `https://car-management-application-k2t8.onrender.com/uploads/${car.images[0]}` : '/path/to/default-image.jpg'; // Default image if no image is available

  return (
    <div className="border rounded-lg shadow-lg p-4">
      <img
        src={imageUrl}
        alt={car.title}
        className="w-full h-48 object-cover rounded"
      />
      <h2 className="text-xl font-semibold mt-2">{car.title}</h2>
      <p className="text-gray-500">{car.description.substring(0, 100)}...</p>
      <div className="mt-4">
        <Link to={`/car/${car._id}`} className="text-blue-600 hover:text-blue-800">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
