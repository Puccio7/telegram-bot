const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");

// Leggi il token dal file .env
const token = process.env.BOT_TOKEN;
const port = process.env.PORT || 6000;
// Inizializza il bot
const bot = new TelegramBot(token, {polling: true});


// L'URL del tuo servizio su Render (usa l'URL che Render ti ha fornito)
const url = process.env.WEBHOOK_URL;

// Imposta il nuovo webhook
bot.setWebHook(`${url}/bot${token}`);

// Verifica se il webhook è già configurato
bot.getWebHookInfo()
  .then(info => {
    if (!info.url) {
      // Se non è stato impostato un webhook, lo configuriamo
      bot.setWebHook(`${url}/bot${token}`);
      console.log('Webhook configurato con successo');
    } else {
      console.log('Webhook già configurato:', info.url);
    }
  })
  .catch(error => {
    console.error('Errore nel recupero delle informazioni del webhook:', error);
  });

// Assicurati di fare il parse del corpo della richiesta
app.use(express.json()); // Per fare il parse di JSON

// Gestisci gli aggiornamenti tramite webhook
app.post(`/bot${token}`, (req, res) => {
  console.log("Messaggio ricevuto:", req.body); // Aggiungi questo log
  const message = req.body.message;
  if (message) {
    const chatId = message.chat.id;
    const text = message.text;
    // Rispondi a un messaggio
    bot.sendMessage(chatId, `Hai scritto: ${text}`);
  }
  res.sendStatus(200); // Rispondi a Telegram con uno status di successo
});

// Aggiungi questo endpoint nel tuo file server.js (o dove gestisci le tue rotte)
app.get('/keep-alive', (req, res) => {
  res.send('Alive and kicking!');
});

const cors = require('cors');
app.use(cors());

// Importa i comandi dal file command.js
const { setupCommands } = require("./command");

// Avvia i comandi per il bot
setupCommands(bot);
