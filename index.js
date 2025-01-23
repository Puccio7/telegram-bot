const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

// Leggi il token dal file .env
const token = process.env.BOT_TOKEN;

// Inizializza il bot
const bot = new TelegramBot(token);

// L'URL del tuo servizio su Render (usa l'URL che Render ti ha fornito)
const url = 'https://telegram-bot-oplp.onrender.com';

// Imposta il nuovo webhook
bot.setWebHook(`${url}/bot${token}`);

// Importa i comandi dal file command.js
const { setupCommands } = require('./command');

// Avvia i comandi per il bot
setupCommands(bot);

// Simula l'ascolto su una porta (anche se non serve per Telegram)
const port = process.env.PORT || 3000;
const express = require('express');
const app = express();

// Aggiungi un endpoint "di controllo" per Render
app.get('/', (req, res) => {
  res.send('Il bot Telegram è attivo!');
});

// Assicurati di fare il parse del corpo della richiesta
app.use(express.json());  // Per fare il parse di JSON

app.post(url, (req, res) => {
  const message = req.body.message;
  if (message) {
    const chatId = message.chat.id;
    const text = message.text;
    
// Avvia il server Express
app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});
