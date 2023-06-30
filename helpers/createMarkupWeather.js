const createMarkupWeather = (data) => {
  const markup = `
  ${data.location}

  ${data.description.charAt(0).toUpperCase() + data.description.slice(1)}
  Temperature: ${data.temp} °C 
  (Feels like: ${data.feelsLike} °C) 
  Wind: ${data.windSpeed} m/s (gust: ${data.windGust} m/s) 
  Pressure: ${data.pressure} mmHg 
  Humidity: ${data.humidity} % 
  Cloudiness: ${data.clouds} %



  https://openweathermap.org/img/wn/${data.icon}@2x.png`;
  return markup;
};

module.exports = createMarkupWeather;
