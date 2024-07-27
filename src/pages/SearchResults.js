import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { FaRandom } from 'react-icons/fa';

const SearchResults = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const city = query.get('city');
    const [weatherData, setWeatherData] = useState(null);

    const key = 'API_KEY'; // Your API key

    if (key === 'API_KEY') {
        console.error('You need to provide an API key');
        throw new Error('You need to provide an API key');
    }

    useEffect(() => {
        const fetchCoordinates = async (location) => {
            try {
                const response = await axios.get(`https://geocode.maps.co/search?q=${location}&api_key=${key}`);
                const data = response.data;

                if (!data || !data[0] || !data[0].lat || !data[0].lon) {
                    throw new Error('Invalid API response');
                }

                return { lat: data[0].lat, lon: data[0].lon };
            } catch (error) {
                console.error('Error fetching coordinates:', error);
                return null;
            }
        };

        const fetchWeatherData = async (coordinates) => {
            try {
                const response = await axios.get(`https://api.open-meteo.com/v1/forecast`, {
                    params: {
                        latitude: coordinates.lat,
                        longitude: coordinates.lon,
                        current_weather: true,
                        hourly: 'temperature_2m,relative_humidity_2m,wind_speed_10m'
                    }
                });

                console.log('Response Data:', response.data); // Log the entire response for debugging
                setWeatherData(response.data);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        const getWeather = async () => {
            if (!city) return;

            const coordinates = await fetchCoordinates(city);
            if (coordinates) {
                await fetchWeatherData(coordinates);
            }
        };

        getWeather();
    }, [city]);

    const getRandomCity = () => {
        const randomCities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville', 'Fort Worth', 'Columbus', 'Charlotte', 'Indianapolis', 'San Francisco', 'Seattle', 'Denver', 'Washington', 'Boston', 'El Paso', 'Nashville', 'Oklahoma City', 'Las Vegas', 'Detroit', 'Portland', 'Memphis', 'Louisville', 'Milwaukee', 'Baltimore', 'Albuquerque', 'Tucson', 'Fresno', 'Sacramento', 'Mesa', 'Kansas City', 'Atlanta', 'Long Beach', 'Colorado Springs', 'Raleigh', 'Miami', 'Virginia Beach', 'Omaha', 'Oakland', 'Minneapolis', 'Tulsa', 'Arlington', 'New Orleans', 'Wichita', 'Cleveland', 'Tampa', 'Bakersfield', 'Aurora', 'Anaheim', 'Honolulu', 'Santa Ana', 'Corpus Christi', 'Riverside', 'St. Louis', 'Lexington', 'Pittsburgh', 'Stockton', 'Anchorage', 'Cincinnati', 'Saint Paul', 'Greensboro', 'Toledo', 'Newark', 'Plano', 'Henderson', 'Lincoln', 'Orlando', 'Jersey City', 'Chula Vista', 'Buffalo', 'Fort Wayne', 'Chandler', 'St. Petersburg', 'Laredo', 'Durham', 'Irvine', 'Madison', 'Norfolk', 'Lubbock', 'Gilbert', 'Winston-Salem', 'Glendale', 'Reno', 'Hialeah', 'Garland', 'Chesapeake', 'Irving', 'North Las Vegas', 'Scottsdale', 'Baton Rouge', 'Fremont', 'Richmond', 'Boise', 'San Bernardino', 'Spokane', 'Birmingham', 'Modesto', 'Des Moines', 'Rochester', 'Tacoma', 'Fontana', 'Oxnard', 'Moreno Valley', 'Fayetteville', 'Aurora', 'Glendale', 'Yonkers', 'Huntington Beach', 'Montgomery', 'Amarillo', 'Akron', 'Little Rock', 'Augusta', 'Grand Rapids', 'Mobile', 'Salt Lake City', 'Huntsville', 'Tallahassee', 'Grand Prairie', 'Overland Park', 'Knoxville', 'Worcester', 'Brownsville', 'Newport News', 'Santa Clarita', 'Port St. Lucie', 'Providence', 'Fort Lauderdale', 'Chattanooga', 'Tempe', 'Oceanside', 'Garden Grove', 'Rancho Cucamonga', 'Cape Coral', 'Santa Rosa', 'Vancouver', 'Sioux Falls', 'Peoria', 'Ontario', 'Jackson', 'Elk Grove', 'Springfield', 'Pembroke Pines', 'Salem', 'Corona', 'Eugene', 'McKinney', 'Fort Collins', 'Lancaster', 'Cary', 'Palmdale', 'Hayward', 'Salinas', 'Frisco', 'Springfield'];
        const randomCity = randomCities[Math.floor(Math.random() * randomCities.length)];
        window.location.href = `/search-results?city=${randomCity}`;
    };

    if (!weatherData) {
        return <div className="text-center text-gray-600">Loading...</div>;
    }

    const chartUrl = createGraphUrl(weatherData);

    return (
        <div className="min-h-screen p-4 bg-gray-100 text-gray-800">
            <div className="flex justify-between mb-6">
                <button 
                    onClick={getRandomCity}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                    <FaRandom /> I'm Feeling Lucky
                </button>
            </div>
            <h2 className="text-3xl font-bold mb-4">Search Results</h2>
            <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
                <p className="text-lg mb-2"><strong>City:</strong> {city}</p>
                <p className="text-lg mb-2"><strong>Latitude:</strong> {weatherData.latitude}</p>
                <p className="text-lg mb-2"><strong>Longitude:</strong> {weatherData.longitude}</p>
                <p className="text-lg mb-2"><strong>Temperature:</strong> {weatherData.current?.temperature_2m}°C</p>
                <p className="text-lg mb-2"><strong>Wind Speed:</strong> {weatherData.current?.wind_speed_10m} km/h</p>
            </div>
            <div className="relative w-full h-80">
                <img src={chartUrl} alt="Weather Chart" className="w-full h-full object-contain rounded-lg shadow-lg" />
            </div>
        </div>
    );
};

export default SearchResults;

const createGraphUrl = (data) => {
    const { time, temperature_2m, relative_humidity_2m, wind_speed_10m } = data.hourly;

    if (!Array.isArray(time) || !Array.isArray(temperature_2m) || !Array.isArray(relative_humidity_2m) || !Array.isArray(wind_speed_10m)) {
        console.error('Invalid data structure');
        return '';
    }

    // Create the URL for QuickChart.io
    const chartUrl = `https://quickchart.io/chart?c=${encodeURIComponent(JSON.stringify({
        type: 'line',
        data: {
            labels: time,
            datasets: [
                {
                    label: 'Temperature (°C)',
                    data: temperature_2m,
                    borderColor: '#FF0000',
                    fill: false
                },
                {
                    label: 'Humidity (%)',
                    data: relative_humidity_2m,
                    borderColor: '#0000FF',
                    fill: false
                },
                {
                    label: 'Wind Speed (km/h)',
                    data: wind_speed_10m,
                    borderColor: '#00FF00',
                    fill: false
                }
            ]
        },
        options: {
            scales: {
                x: {
                    ticks: { color: 'rgba(0, 0, 0, 0.7)' }
                },
                y: {
                    ticks: { color: 'rgba(0, 0, 0, 0.7)' }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: 'rgba(0, 0, 0, 0.7)'
                    }
                }
            }
        }
    }))}`;

    return chartUrl;
};
