import React, { useState } from 'react'
import './WeatherApp_Style.css'

import rainingImg from './img/raining.png'
import cloudyImg from './img/cloudy.png'
import clearSkyImg from './img/clear.png'
import snowImg from './img/snow.png'



const WeatherApp = () => {
    const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = 'faf7e3e655cd8790425b3c8b6791d43a';
  const apiLink = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!city) {
      setError("Please Enter City Name!!");
      return;
    }
    try {
      const url = await fetch(`${apiLink}${city}&appid=${apiKey}`);
      const apiData = await url.json();
      setWeatherData(apiData);
      setError(null);
    } catch (err) {
      setError("City Not Found");
      setWeatherData(null);
      console.log("Fetching Have Error", err);
    }
  };

  const imageSet = () => {
    if (!weatherData) return;
    switch (weatherData.weather[0].main) {
      case "Rain":
        return rainingImg;
      case "Clouds":
        return cloudyImg;
      case "Clear":
        return clearSkyImg;
      case "Snow":
        return snowImg;
      default:
        return cloudyImg;
    }
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit} className="search">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="inputValue"
        />
        <button type="submit"><img src={require('./img/search.png')} alt="" /></button>
      </form>

      {error && <div className="error">{error}</div>}
      
      {weatherData && (
        <div className="weather">
          <img className="weather-icon" src={imageSet()} alt="" />
          <h1 className="temp">{Math.floor(weatherData.main.temp)}°C</h1>
          <h2 className="city">{weatherData.name}</h2>

          <div className="details">
            <div className="col">
              <img src={require('./img/humidity.png')} alt="" />
              <div>
                <p className="humidity">{weatherData.main.humidity}%</p>
                <p>Humidity</p>
              </div>
            </div>

            <div className="col">
              <img src={require('./img/kaatt.png')} alt="" />
              <div>
                <p className="wind">{weatherData.wind.speed} km/h</p>
                <p>Wind Speed</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default WeatherApp