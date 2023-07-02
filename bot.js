const TelegramApi = require("node-telegram-bot-api");
require("dotenv").config();
const fetchCity = require("./api/fetchCity");
const sendWeatherInfo = require("./helpers/sendWeatherInfo");
const mainBtn = require("./options/mainBtn");
const cityBtn = require("./options/cityBtn");

const bot = new TelegramApi(process.env.BOT_TOKEN, { polling: true });

bot.setMyCommands([
  { command: "/start", description: "start greeting" },
  { command: "/help", description: "help" },
]);

// const start = () => {
bot.on("message", async (msg) => {
  const text = msg.text;
  const chatId = msg.chat.id;

  try {
    if (text === "/start") {
      await bot.sendMessage(
        chatId,
        `Hello, I'm a little helper who can tell about the weather.`,
        mainBtn
      );
      await bot.sendSticker(
        chatId,
        "https://tlgrm.eu/_/stickers/9d4/44b/9d444bb6-d895-3ddc-9d38-44981f03bc65/5.webp"
      );

      return;
    }

    if (text === "/help") {
      bot.sendMessage(
        chatId,
        `If you are interested in the current weather, submit your location or use the buttons below.`
      );

      return;
    }
  } catch (error) {
    console.log(error);
  }
});

bot.on("location", async (msg) => {
  const location = msg.location;
  const chatId = msg.chat.id;

  // weather response if will be send location
  if (location) {
    const { latitude, longitude } = location;
    return sendWeatherInfo(chatId, latitude, longitude, bot);
  }
});

// weather in another location
bot.on("message", async (msg) => {
  const text = msg.text;
  const chatId = msg.chat.id;

  if (text === "Weather in another location") {
    bot.sendMessage(chatId, "Enter the city");

    bot.on("message", async (msg) => {
      const text = msg.text;
      const chatId = msg.chat.id;

      console.log(msg);

      const variantsOfCity = await fetchCity(text);
      const buttons = await cityBtn(variantsOfCity);

      if (variantsOfCity.length === 0) {
        await bot.sendMessage(chatId, "Not found 😢 Try another city");
        return;
      }

      await bot.sendMessage(chatId, "Select the correct option", buttons);
    });
  }
});

bot.on("callback_query", async (msg) => {
  const chatId = msg.message.chat.id;
  const coords = JSON.parse(msg.data);

  return sendWeatherInfo(chatId, coords.lat, coords.lon, bot);
});
// };

// start();
