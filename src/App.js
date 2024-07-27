import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import About from './pages/About';

const randomCities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville', 'Fort Worth', 'Columbus', 'Charlotte', 'Indianapolis', 'San Francisco', 'Seattle', 'Denver', 'Washington', 'Boston', 'El Paso', 'Nashville', 'Oklahoma City', 'Las Vegas', 'Detroit', 'Portland', 'Memphis', 'Louisville', 'Milwaukee', 'Baltimore', 'Albuquerque', 'Tucson', 'Fresno', 'Sacramento', 'Mesa', 'Kansas City', 'Atlanta', 'Long Beach', 'Colorado Springs', 'Raleigh', 'Miami', 'Virginia Beach', 'Omaha', 'Oakland', 'Minneapolis', 'Tulsa', 'Arlington', 'New Orleans', 'Wichita', 'Cleveland'];

const FeelingLucky = () => {
    const getRandomCity = () => {
        const randomCity = randomCities[Math.floor(Math.random() * randomCities.length)];
        window.location.href = `/?city=${randomCity}`;
    };
    
    return (
        <div className="text-center">
        <h2 className="text-2xl mb-4">I'm Feeling Lucky</h2>
        <button 
            onClick={getRandomCity} 
            className="bg-blue-500 text-white p-2 rounded"
        >
            Get Weather
        </button>
        </div>
    );
    }

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-800">
        <nav className="bg-blue-500 p-4 text-white">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">Weather App</h1>
            <div>
              <Link to="/" className="mr-4">Home</Link>
              <Link to="/about" className="mr-4">About</Link>
              <Link to="/feeling-lucky" className="mr-4">I'm Feeling Lucky</Link>
            </div>
          </div>
        </nav>
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search-results" element={<SearchResults />} />
            <Route path="/about" element={<About />} />
            <Route path="/feeling-lucky" element={<FeelingLucky />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
