import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [city, setCity] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/search-results?city=${city}`);
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl mb-4">Welcome to the Weather App</h2>
      <input 
        type="text" 
        placeholder="Enter city" 
        className="border p-2 mr-2"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button 
        onClick={handleSearch} 
        className="bg-blue-500 text-white p-2 rounded"
      >
        Search
      </button>
    </div>
  );
};

export default Home;
