import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if token exists and is not expired
    const token = localStorage.getItem('token');
    
    if (token) {
      // Decode token to check expiration (assuming JWT)
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode the JWT
      const expirationTime = decodedToken.exp * 1000; // Expiration time in milliseconds
      
      if (Date.now() < expirationTime) {
        setIsAuthenticated(true); // Token is valid
      } else {
        setIsAuthenticated(false); // Token has expired
      }
    }
  }, []);

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Car Management</h1>
      <nav>
        {isAuthenticated && (
          <>
            <Link to="/" className="mr-4">Dashboard</Link>
            <Link to="/car/create" className="mr-4">Create Car</Link> {/* Link to Create Car page */}
            <Link to="/car/:id" className="mr-4">View Car</Link> {/* Link to View Car page */}
            <Link to="/car/update/:id" className="mr-4">Update Car</Link> {/* Link to Update Car page */}
          </>
        )}
        <Link to="/login" className="mr-4">Login</Link>
        <Link to="/register" className="mr-4">Register</Link>
      </nav>
    </header>
  );
};

export default Header;