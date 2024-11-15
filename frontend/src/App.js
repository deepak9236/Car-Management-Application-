import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Dashboard from './pages/Dashboard'; // Importing Dashboard
import CreateCar from './pages/Cars/CreateCar'; // Importing Create Car Page
import ViewCar from './pages/Cars/ViewCar'; // Importing Car Detail Page
import UpdateCar from './pages/Cars/UpdateCar'; // Importing Update Car Page

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/car/create" element={<CreateCar />} />
        <Route path="/car/:id" element={<ViewCar />} />  {/* Route to view a single car */}
        <Route path="/car/update/:id" element={<UpdateCar />} />  {/* Route to update car */}
      </Routes>
    </Router>
  );
};

export default App;
