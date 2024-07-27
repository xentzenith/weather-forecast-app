import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [city, setCity] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (city.trim()) {
      navigate(`/search-results?city=${city}`);
    } else {
      toast.error("Please enter a city name"); // Display error toast
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <h2 className="text-4xl font-bold mb-6 text-blue-600">Welcome to the Weather App</h2>
      <p className="text-lg mb-4">Get the latest weather updates by searching for your city.</p>
      <div className="flex items-center space-x-4">
        <input 
          type="text" 
          placeholder="Enter city" 
          className="border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyDown} // Added onKeyDown handler
        />
        <button 
          onClick={handleSearch}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Search
        </button>
      </div>
      <ToastContainer /> {/* Container for toast notifications */}
    </div>
  );
};

export default Home;
