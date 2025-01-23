const TelegramBot = require('node-telegram-bot-api');

// Funzione per gestire il comando /start
function handleStart(bot) {
  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const userName = msg.from.first_name || "Utente";
    bot.sendMessage(chatId, `Ciao ${userName}, benvenuto nel bot! Digita /episodi per vedere gli episodi disponibili.`);
  });
}

// Funzione per gestire il comando /episodi
function handleEpisodi(bot) {
  bot.onText(/\/episodi/, (msg) => {
    const chatId = msg.chat.id;
    const episodes = [
      "Episodio 1 - La nascita",
      "Episodio 2 - L'avventura",
      "Episodio 3 - Il conflitto",
      "Episodio 4 - La resa"
    ];
    bot.sendMessage(chatId, `Ecco gli episodi disponibili:\n${episodes.join("\n")}`);
  });
}

// Funzione per gestire messaggi personalizzati
function handleCustomMessages(bot) {
  bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text.toLowerCase(); // Per ignorare maiuscole/minuscole

    if (text.includes("ciao")) {
      bot.sendMessage(chatId, "Ciao! Come posso aiutarti?");
    }

    if (text.includes("episodi")) {
      bot.sendMessage(chatId, "Hai chiesto degli episodi! Puoi usare il comando /episodi per vederli.");
    }

    if (text.includes("aiuto")) {
      bot.sendMessage(chatId, "Posso aiutarti con i comandi /start e /episodi.");
    }

    // Risposta di default
    else if (text && !text.startsWith("/")) {
      bot.sendMessage(chatId, "Non sono sicuro di cosa intendi, ma se hai bisogno di aiuto prova a usare /start o /episodi.");
    }
  });
}

module.exports = { handleStart, handleEpisodi, handleCustomMessages };
