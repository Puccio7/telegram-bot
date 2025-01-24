const TelegramBot = require('node-telegram-bot-api'); 
require('dotenv').config();
const express = require('express');
const app = express();
const path = require("path");

// Require the fastify framework and instantiate it
const fastify = require("fastify")({
  // Set this to true for detailed logging:
  logger: false,
});

// Leggi il token dal file .env
const token = process.env.BOT_TOKEN;
const port = process.env.PORT || 3000;
// Inizializza il bot
const bot = new TelegramBot(token);

// L'URL del tuo servizio su Render (usa l'URL che Render ti ha fornito)
const url = process.env.WEBHOOK_URL;

// Imposta il nuovo webhook
bot.setWebHook(`${url}/bot${token}`);

// Assicurati di fare il parse del corpo della richiesta
app.use(express.json());  // Per fare il parse di JSON

// Gestisci gli aggiornamenti tramite webhook
app.post(`/bot${token}`, (req, res) => {
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

// Run the server and report out to the logs
fastify.listen(
  { port: process.env.PORT, host: "0.0.0.0" },
  function (err, address) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Your app is listening on ${address}`);
  }
);
// Avvia il server Express
app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});
