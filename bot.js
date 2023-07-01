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
          text: "Weather in your location",
          request_location: true,
        },
        {
          text: "Weather in another location",
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

    try {
      if (text === "/start") {
        await bot.sendMessage(
          chatId,
          `Hello, I'm a little helper who can tell about the weather.`
        );
        await bot.sendSticker(
          chatId,
          "https://tlgrm.eu/_/stickers/9d4/44b/9d444bb6-d895-3ddc-9d38-44981f03bc65/5.webp"
        );

        // an empty line so that an error does not appear
        await bot.sendMessage(chatId, " ", options);

        return;
      }

      if (text === "/help") {
        bot.sendMessage(
          chatId,
          `If you are interested in knowing the current weather, send your location.`
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

    try {
      // weather response if will be send location
      if (location) {
        const { latitude, longitude } = location;

        const response = await fetchWeather(latitude, longitude);
        // weather message
        await bot.sendMessage(chatId, createMarkupWeather(response));
        // weather icon
        await bot.sendPhoto(
          chatId,
          `https://openweathermap.org/img/wn/${response.icon}@2x.png`
        );
      }
    } catch (error) {
      console.log(error);
    }
  });
  // =====================================

  // catch text from chat
  bot.on("message", async (msg) => {
    const chatId = msg.chat.id;

    console.log(chatId);

    
  });
  // =====================================

  // catch text from chat
  // bot.on("message", async (query) => {
  // const chatId = query.message.chat.id;
  // const buttonId = query.data;

  // console.log(query);
  // });

  // ======================================
};

start();
