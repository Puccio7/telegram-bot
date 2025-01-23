const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

// Leggi il token dal file .env
const token = process.env.BOT_TOKEN;

// Inizializza il bot
const bot = new TelegramBot(token);


// Risposta al comando /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const userName = msg.from.first_name || "Utente";  // Ottieni il nome dell'utente
  bot.sendMessage(chatId, `Ciao ${userName}, benvenuto nel bot!`);
});

// Risposta a qualsiasi altro messaggio
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text.toLowerCase();  // Converti il messaggio in minuscolo

  if (text.includes("ciao")) {
    bot.sendMessage(chatId, "Ciao! Come posso aiutarti?");  // Risponde al messaggio che contiene "ciao"
  } else if (text.includes("episodi")) {
    bot.sendMessage(chatId, "Ecco gli episodi: Episodio 1, Episodio 2, Episodio 3");  // Risponde se il messaggio contiene "episodi"
  } else {
    bot.sendMessage(chatId, "Non sono sicuro di cosa intendi, ma se hai bisogno di aiuto prova a usare /start.");
  }
});

