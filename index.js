require('dotenv').config();
const port = process.env.PORT || 4000;
const TelegramBot = require('node-telegram-bot-api');

// Inserisci il tuo token qui
const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
  bot.sendMessage(msg.chat.id, `Ciao ${msg.from.first_name}, hai scritto: "${msg.text}"`);
});
