import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FeelingLucky = () => {
  const [city, setCity] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  
  // List of example cities for the "Feeling Lucky" feature
  const exampleCities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];

  useEffect(() => {
    const getRandomCity = () => {
      // Select a random city from the list
      return exampleCities[Math.floor(Math.random() * exampleCities.length)];
    };

    const fetchCoordinates = async (location) => {
      try {
        const response = await axios.get(`https://geocode.maps.co/search?q=${location}&api_key=66a4d9f9e6871974664850yfw395282`);
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
            current: 'temperature_2m,wind_speed_10m',
            hourly: 'temperature_2m,relative_humidity_2m,wind_speed_10m'
          }
        });

        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    const getWeather = async () => {
      const randomCity = getRandomCity();
      setCity(randomCity);

      const coordinates = await fetchCoordinates(randomCity);
      if (coordinates) {
        await fetchWeatherData(coordinates);
      }
    };

    getWeather();
  }, []);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl mb-4">I'm Feeling Lucky</h2>
      <div>City: {city}</div>
      <div>Latitude: {weatherData.latitude}</div>
      <div>Longitude: {weatherData.longitude}</div>
      <div>Temperature: {weatherData.current?.temperature_2m}°C</div>
      <div>Wind Speed: {weatherData.current?.wind_speed_10m} km/h</div>
      {/* Display more weather data as needed */}
    </div>
  );
};

export default FeelingLucky;
