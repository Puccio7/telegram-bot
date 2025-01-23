require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

// Leggi il token dal file .env
const token = process.env.BOT_TOKEN;

// L'URL del tuo servizio su Render (usa l'URL che Render ti ha fornito)
const url = 'https://telegram-bot-oplp.onrender.com';

// Inizializza il bot
const bot = new TelegramBot(token);

// Imposta il nuovo webhook
bot.setWebHook(`${url}/bot${token}`);

// Importa le funzioni di gestione dei comandi
const { handleStart, handleEpisodi, handleCustomMessages } = require('./commands');

// Gestisci i comandi
handleStart(bot);
handleEpisodi(bot);
handleCustomMessages(bot);

// Simula l'ascolto su una porta (anche se non serve per Telegram)
const port = process.env.PORT || 3000;
const express = require('express');
const app = express();

// Aggiungi un endpoint "di controllo" per Render
app.get('/', (req, res) => {
  res.send('Il bot Telegram è attivo!');
});

// Avvia il server Express
app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});
