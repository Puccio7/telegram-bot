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
  return {
    reply_markup: {
      inline_keyboard: [
        ...episodes.map((ep) => [
          { text: ep.title, url: ep.url },
        ]),
        [{ text: "Indietro", callback_data: `indietro_stagioni` }],
      ],
    },
  };
};

// Comandi principali
const setupCommands = (bot) => {
  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const name = msg.from.first_name || msg.from.username || "Utente";
    bot.sendMessage(
      chatId,
      `Ciao ${name}, benvenuto/a! Scegli un'opzione dal menu principale.`,
      mainMenuKeyboard
    );
  });

  bot.on("callback_query", async (callbackQuery) => {
    const chatId = callbackQuery.message.chat.id;
    const messageId = callbackQuery.message.message_id;
    const data = callbackQuery.data;

    // Elimina il messaggio precedente
    await bot.deleteMessage(chatId, messageId);

    // Gestione "Stagioni"
    if (data === "stagioni") {
      await bot.sendMessage(chatId, "Seleziona una stagione:", generateSeasonsKeyboard());
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
        "Per usare questo bot:\n\n1. Premi 'Stagioni' per esplorare le stagioni e i loro episodi.\n2. Premi sugli episodi per accedere ai link.\n\nPremi 'Indietro' per tornare al menu principale.",
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
      await bot.sendMessage(
        chatId,
        `Bentornato/a ${name}! Ecco il menu principale. Scegli un'opzione:`,
        mainMenuKeyboard
      );
    }

    if (data === "indietro_stagioni") {
      await bot.sendMessage(chatId, "Seleziona una stagione:", generateSeasonsKeyboard());
    }
  });
};

module.exports = { setupCommands };
