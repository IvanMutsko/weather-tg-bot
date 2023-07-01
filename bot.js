const TelegramApi = require("node-telegram-bot-api");
const fetchWeather = require("./api/fetchWeather");
const createMarkupWeather = require("./helpers/createMarkupWeather");

require("dotenv").config();

const bot = new TelegramApi(process.env.BOT_TOKEN, { polling: true });

bot.setMyCommands([
  { command: "/start", description: "start greeting" },
  {
    command: "/help",
    description: "help",
  },
]);

const options = {
  reply_markup: {
    keyboard: [
      [
        {
          text: "Send Location",
          request_location: true,
        },
      ],
    ],
    resize_keyboard: true,
  },
};

const start = () => {
  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === "/start") {
      await bot.sendMessage(
        chatId,
        `Hello, I'm a little helper who can tell about the weather.`
      );
      await bot.sendSticker(
        chatId,
        "https://tlgrm.eu/_/stickers/9d4/44b/9d444bb6-d895-3ddc-9d38-44981f03bc65/5.webp"
      );

      bot.sendMessage(
        chatId,
        "Click the button to send your location",
        options
      );
      return;
    }

    if (text === "/help") {
      bot.sendMessage(
        chatId,
        `If you are interested in knowing the current weather, send your location.`
      );
      return;
    }
  });

  bot.on("location", async (msg) => {
    const location = msg.location;
    const chatId = msg.chat.id;

    // weather response if will be send location
    if (location) {
      const { latitude, longitude } = location;

      const response = await fetchWeather(latitude, longitude);
      // weather message
      bot.sendMessage(chatId, createMarkupWeather(response));
      // weather icon
      await bot.sendPhoto(
        chatId,
        `https://openweathermap.org/img/wn/${response.icon}@2x.png`
      );
    }
  });
};

start();

// Enable graceful stop
// process.once("SIGINT", () => bot.stop("SIGINT"));
// process.once("SIGTERM", () => bot.stop("SIGTERM"));
