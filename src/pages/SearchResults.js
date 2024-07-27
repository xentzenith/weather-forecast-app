import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { FaSun, FaMoon, FaRandom } from 'react-icons/fa';

const SearchResults = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const city = query.get('city');
    const [weatherData, setWeatherData] = useState(null);
    const [theme, setTheme] = useState('light');
  
    const key = '66a4d9f9e6871974664850yfw395282' || 'Your API key';
  
    if(key === 'Your API key') {
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
  
    const toggleTheme = () => {
      setTheme(theme === 'light' ? 'dark' : 'light');
    };
  
    const getRandomCity = () => {
      const randomCities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];
      const randomCity = randomCities[Math.floor(Math.random() * randomCities.length)];
      window.location.href = `/?city=${randomCity}`;
    };
  
    if (!weatherData) {
      return <div>Loading...</div>;
    }
  
    const chartUrl = createGraphUrl(weatherData);
  
    return (
      <div className={theme === 'light' ? '' : 'dark-theme'}>
        <button onClick={toggleTheme}>
          {theme === 'light' ? <FaMoon /> : <FaSun />} Toggle Theme
        </button>
        <button onClick={getRandomCity}>
          <FaRandom /> I'm Feeling Lucky
        </button>
        <h2 className="text-2xl mb-4">Search Results</h2>
        <div>City: {city}</div>
        <div>Latitude: {weatherData.latitude}</div>
        <div>Longitude: {weatherData.longitude}</div>
        <div>Temperature: {weatherData.current?.temperature_2m}°C</div>
        <div>Wind Speed: {weatherData.current?.wind_speed_10m} km/h</div>
        <div style={{ height: '400px' }}>
          <img src={chartUrl} alt="Weather Chart" style={{ width: '100%', height: '100%' }} />
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
                    ticks: { color: 'rgba(255, 255, 255, 0.7)' }
                },
                y: {
                    ticks: { color: 'rgba(255, 255, 255, 0.7)' }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: 'rgba(255, 255, 255, 0.7)'
                    }
                }
            }
        }
    }))}`;

    return chartUrl;
};
