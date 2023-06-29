const createMarkupWeather = (data) => {
  const markup = `
  Temperature: ${data.temp} °C 
  Feels like: ${data.feelsLike} °C 
  Wind: ${data.windSpeed} m/s 
  Wind gust: ${data.windGust} m/s 
  Pressure: ${data.pressure} mmHg 
  Humidity: ${data.humidity} % 
  Cloudiness: ${data.clouds} %
  ${data.description.charAt(0).toUpperCase() + data.description.slice(1)}


  https://openweathermap.org/img/wn/${data.icon}@2x.png`;
  return markup;
};

module.exports = createMarkupWeather;