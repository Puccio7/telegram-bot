const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
const express = require('express');
const app = express();

// Leggi il token dal file .env
const token = process.env.BOT_TOKEN;

// Inizializza il bot
const bot = new TelegramBot(token);
// Simula l'ascolto su una porta (anche se non serve per Telegram)
const port = process.env.PORT || 3000;
// L'URL del tuo servizio su Render (usa l'URL che Render ti ha fornito)
const url = 'https://telegram-bot-oplp.onrender.com';

// Imposta il nuovo webhook
bot.setWebHook(`${url}/bot${token}`);

// Assicurati di fare il parse del corpo della richiesta
app.use(express.json());  // Per fare il parse di JSON

app.post(url, (req, res) => {
  console.log('Messaggio ricevuto:', req.body); // Aggiungi questo log
  const message = req.body.message;
  if (message) {
    const chatId = message.chat.id;
    const text = message.text;
        // Rispondi a un messaggio
    bot.sendMessage(chatId, `Hai scritto: ${text}`);
  }
  res.sendStatus(200); // Rispondi a Telegram con uno status di successo
});

// Importa i comandi dal file command.js
const { setupCommands } = require('./command');

// Avvia i comandi per il bot
setupCommands(bot);

// Avvia il server Express
app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});
