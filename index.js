require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

// Leggi il token dal file .env
const token = process.env.BOT_TOKEN;

// Inizializza il bot con polling
const bot = new TelegramBot(token, { polling: true });

// Assicurati che il webhook non venga mai usato
bot.setWebHook(""); // Disabilita qualsiasi webhook esistente

// Simula l'ascolto su una porta (anche se non serve per Telegram)
const port = process.env.PORT || 3000;
const express = require('express');
const app = express();

// Telegram bot logica
bot.on('message', (msg) => {
  bot.sendMessage(msg.chat.id, `Ciao ${msg.from.first_name}, hai scritto: "${msg.text}"`);
});

// Aggiungi un endpoint "di controllo" per Render
app.get('/', (req, res) => {
  res.send('Il bot Telegram è attivo!');
});

// Avvia il server Express
app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});
