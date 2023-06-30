const { Telegraf } = require("telegraf");
const fetchWeather = require("./api/fetchWeather");
const createMarkupWeather = require("./helpers/createMarkupWeather");

require("dotenv").config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) =>
  ctx.reply(`Hello, I'm a little helper who can tell about the weather.
If you are interested in knowing the current weather, send your location.`)
);

bot.on("message", async (ctx) => {
  // weather response if will be send location
  if (ctx.message.location) {
    const { latitude, longitude } = ctx.message.location;

    const response = await fetchWeather(latitude, longitude);

    ctx.reply(createMarkupWeather(response));
  }
});

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
