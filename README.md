# Weather Forecast App

## Overview

The Weather Forecast App is a React-based application designed to provide weather forecasts for cities. It leverages the Open-Meteo API for weather data and the Geocode Maps API for converting city names into geographic coordinates.

## Technologies Used
- **React:** A JavaScript library for building user interfaces.
- **React Router:** For routing and navigation within the application.
- **Axios:** For making HTTP requests to external APIs.
- **Tailwind** CSS: For styling and responsive design.
- **react-toastify:** For displaying toast notifications.
- **Open-Meteo API:** To fetch current weather data.
- **Geocode Maps API:** To convert city names into geographic coordinates.
- **GitHub Pages:** For deploying the application.

## Features

- **City-based Weather Forecasts**: Enter a city name to get current weather conditions.
- **Geocoding**: Automatically converts city names into latitude and longitude for accurate weather data.
- **Toast Notifications:** Provides user feedback for error messages and interactions.

## Live Demo

You can view the live demo of the application on GitHub Pages: [Weather Forecast App](https://xentzenith.github.io/weather-forecast-app/)

## Getting Started

### Prerequisites

- Node.js and npm (Node Package Manager) installed on your local machine.

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/xentzenith/weather-forecast-app.git
   cd weather-forecast-app
   ```

2. Install the dependencies

   ```bash
   npm install
   ```

3. Start the development server

   ```bash
    npm start
    ```

### Configuration

1. **API Keys**
```
Geocode Maps API: Replace the placeholder in the fetchCoordinates function with your actual Geocode Maps API key. Update the URL with your API key in src/pages/FeelingLucky.js and src/pages/SearchResults.js
```

2. **Deployment**
```
To deploy the application to GitHub Pages, update the homepage field in package.json with your GitHub Pages URL. Run the following command to deploy the application:
```
```bash
npm run deploy
```

### Contributing
If you would like to contribute to the project, please fork the repository and submit a pull request with your changes.