const createMarkupWeather = require("./createMarkupWeather");
const fetchWeather = require("../api/fetchWeather");

const sendWeatherInfo = async (chatId, latitude, longitude, bot) => {
  try {
    const response = await fetchWeather(latitude, longitude);
    // weather message
    await bot.sendMessage(chatId, createMarkupWeather(response));
    // weather icon
    await bot.sendPhoto(
      chatId,
      `https://openweathermap.org/img/wn/${response.icon}@2x.png`
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendWeatherInfo;
