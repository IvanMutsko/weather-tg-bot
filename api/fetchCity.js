const axios = require("axios");

require("dotenv").config();

const URL_CITY_API = "https://api.openweathermap.org/geo/1.0/direct?";

const fetchCity = async function (text) {
  if (text) {
    try {
      const cityAPIUrl = `${URL_CITY_API}appid=${process.env.API_KEY}&limit=5&q=${text}`;
      const response = await axios.get(cityAPIUrl);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = fetchCity;
