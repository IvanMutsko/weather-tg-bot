const axios = require("axios");

require("dotenv").config();

const URL_WEATHER_API = "https://api.openweathermap.org/data/2.5/weather?";

const fetchWeather = async function (latitude, longitude) {
  try {
    const weatherAPIUrl = `${URL_WEATHER_API}lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.API_KEY}`;
    const response = await axios.get(weatherAPIUrl);

    const { main, weather, wind, clouds, name, sys } = response.data;

    const weatherData = {
      location: `${sys.country} ${name}`,
      temp: Math.round(main.temp),
      feelsLike: Math.round(main.feels_like),
      pressure: (main.pressure * 0.750062).toFixed(0),
      humidity: main.humidity,
      windSpeed: Math.round(wind.speed),
      windGust: Math.round(wind.gust),
      clouds: clouds.all,
      description: weather[0].description,
      icon: weather[0].icon,
    };

    return weatherData;
  } catch (error) {
    console.log(error);
  }
};

module.exports = fetchWeather;
