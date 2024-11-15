import React, { useEffect, useState } from 'react';
import { getCars } from '../api/car';
import { useNavigate } from 'react-router-dom';
import CarCard from '../components/CarCard';

const Dashboard = () => {
  const [cars, setCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const { data } = await getCars();

        if (Array.isArray(data.cars)) {
          setCars(data.cars);
        } else {
          console.error('Cars data is not an array:', data.cars);
        }
        console.log('Fetched cars:', data);
      } catch (err) {
        console.error('Error fetching cars', err);
      }
    };
    fetchCars();
  }, []);

  // Filter cars based on search query
  const filteredCars = cars.filter(car =>
    car.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    car.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    car.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleCreateCar = () => {
    navigate('/car/create'); // Navigate to the Create Car route
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Your Cars</h1>
        <input
          type="text"
          placeholder="Search cars..."
          className="p-2 border rounded"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {cars.length === 0 ? (
        <div className="text-center mt-6">
          <p>No cars found. Would you like to create one?</p>
          <button
            onClick={handleCreateCar}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Create Car
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCars.length === 0 ? (
            <p>No cars match your search criteria.</p>
          ) : (
            filteredCars.map(car => (
              <CarCard key={car._id} car={car} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
