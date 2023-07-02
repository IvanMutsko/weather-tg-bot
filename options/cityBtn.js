const cityBtn = (data) => {
  if (data) {
    let options = {
      reply_markup: {
        inline_keyboard: [],
      },
    };

    const markupBtn = data.map((city) => {
      const { country, name, state, lat, lon } = city;
      const btn = [
        {
          text: `${country}, ${name}${state ? `, ${state}` : ""}`,
          callback_data: JSON.stringify({ lat, lon }),
        },
      ];
      return btn;
    });

    options.reply_markup.inline_keyboard = markupBtn;

    return options;
  }
};

module.exports = cityBtn;
