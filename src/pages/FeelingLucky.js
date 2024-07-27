import React from 'react';
import { Link } from 'react-router-dom';

const randomCities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville', 'Fort Worth', 'Columbus', 'Charlotte', 'Indianapolis', 'San Francisco', 'Seattle', 'Denver', 'Washington', 'Boston', 'El Paso', 'Nashville', 'Oklahoma City', 'Las Vegas', 'Detroit', 'Portland', 'Memphis', 'Louisville', 'Milwaukee', 'Baltimore', 'Albuquerque', 'Tucson', 'Fresno', 'Sacramento', 'Mesa', 'Kansas City', 'Atlanta', 'Long Beach', 'Colorado Springs', 'Raleigh', 'Miami', 'Virginia Beach', 'Omaha', 'Oakland', 'Minneapolis', 'Tulsa', 'Arlington', 'New Orleans', 'Wichita', 'Cleveland'];

const FeelingLucky = () => {
    const randomCity = randomCities[Math.floor(Math.random() * randomCities.length)];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
            <h2 className="text-3xl font-bold mb-4">I'm Feeling Lucky</h2>
            <p className="text-lg mb-4">How about the weather in <strong className="text-blue-600">{randomCity}</strong>?</p>
            <div className="space-x-4">
                <Link to={`/search-results?city=${randomCity}`}>
                    <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400">Yes</button>
                </Link>

                <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400" onClick={() => window.location.reload()}>No</button>
                
            </div>
        </div>
    );
};

export default FeelingLucky;
