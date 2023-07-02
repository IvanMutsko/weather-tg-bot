const mainBtn = {
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

module.exports = mainBtn;
