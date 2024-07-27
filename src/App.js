import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import About from './pages/About';
import FeelingLucky from './pages/FeelingLucky'; // Ensure this import is correct

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-800">
        <nav className="bg-blue-500 p-4 text-white shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">Weather App</h1>
            <div>
              <Link to="/" className="mr-4 hover:text-gray-200">Home</Link>
              <Link to="/about" className="mr-4 hover:text-gray-200">About</Link>
              <Link to="/feeling-lucky" className="hover:text-gray-200">I'm Feeling Lucky</Link>
            </div>
          </div>
        </nav>
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search-results" element={<SearchResults />} />
            <Route path="/about" element={<About />} />
            <Route path="/feeling-lucky" element={<FeelingLucky />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
