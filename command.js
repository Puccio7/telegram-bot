const TelegramBot = require("node-telegram-bot-api");
const { seasonsEpisodes } = require("./seasonsEpisodes");

// Configurazione tastiera principale
const mainMenuKeyboard = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "Stagioni", callback_data: "stagioni" }],
      [{ text: "Aiuto", callback_data: "aiuto" }],
    ],
  },
};

// Funzione per generare la tastiera delle stagioni
const generateSeasonsKeyboard = () => {
  const seasons = Object.keys(seasonsEpisodes);
  return {
    reply_markup: {
      inline_keyboard: [
        ...seasons.map((season) => [
          { text: `Stagione ${season}`, callback_data: `season_${season}` },
        ]),
        [{ text: "Indietro", callback_data: "indietro_main" }],
      ],
    },
  };
};

// Funzione per generare la tastiera degli episodi
const generateEpisodesKeyboard = (season) => {
  const episodes = seasonsEpisodes[season];
  const keyboard = [];
  for (let i = 0; i < episodes.length; i += 3) {
    const row = episodes.slice(i, i + 3).map((ep) => ({
      text: ep.title,
      url: ep.url,
    }));
    keyboard.push(row);
  }
  keyboard.push([{ text: "Indietro", callback_data: `indietro_stagioni` }]);
  return {
    reply_markup: {
      inline_keyboard: keyboard,
    },
  };
};

// Funzione per inviare un messaggio di saluto (riutilizzabile)
const sendGreetingMessage = async (bot, chatId, name) => {
  await bot.sendMessage(
    chatId,
    `Bentornato/a ${name}! Ecco il menu principale. Scegli un'opzione:`,
    mainMenuKeyboard
  );
};

// Comandi principali
const setupCommands = (bot) => {
  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const name = msg.from.first_name || msg.from.username || "Utente";
    sendGreetingMessage(bot, chatId, name);
  });

  bot.on("callback_query", async (callbackQuery) => {
    const chatId = callbackQuery.message.chat.id;
    const messageId = callbackQuery.message.message_id;
    const data = callbackQuery.data;

    // Elimina il messaggio precedente
    await bot.deleteMessage(chatId, messageId);

    // Gestione "Stagioni"
    if (data === "stagioni") {
      await bot.sendMessage(chatId, "Seleziona la stagione che vuoi vedere:", generateSeasonsKeyboard());
    }

    // Gestione specifica stagione
    if (data.startsWith("season_")) {
      const season = data.split("_")[1];
      if (seasonsEpisodes[season]) {
        await bot.sendMessage(
          chatId,
          `Ecco gli episodi della Stagione ${season}:`,
          generateEpisodesKeyboard(season)
        );
      } else {
        await bot.sendMessage(chatId, "Stagione non trovata.");
      }
    }

    // Gestione "Aiuto"
    if (data === "aiuto") {
      await bot.sendMessage(
        chatId,
        "Tramite questo bot puoi guardare le stagioni di MC Italia. Come? Così: \n\n1. Premi 'Stagioni' per esplorare le stagioni.\n2. Premi sull'episodio per accedere ai link.\n\nOppure premi 'Indietro' per tornare al menu principale.",
        {
          reply_markup: {
            inline_keyboard: [[{ text: "Indietro", callback_data: "indietro_main" }]],
          },
        }
      );
    }

    // Gestione "Indietro"
    if (data === "indietro_main") {
      const name = callbackQuery.from.first_name || callbackQuery.from.username || "Utente";
      sendGreetingMessage(bot, chatId, name);
    }

    if (data === "indietro_stagioni") {
      await bot.sendMessage(chatId, "Seleziona una stagione:", generateSeasonsKeyboard());
    }
  });
};

module.exports = { setupCommands };
