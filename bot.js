const { Telegraf } = require("telegraf");
const fetchWeather = require("./api/fetchWeather");
const createMarkupWeather = require("./helpers/createMarkupWeather");

require("dotenv").config();

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply("Welcome"));

bot.on("message", async (ctx) => {
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
