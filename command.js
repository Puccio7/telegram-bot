// Funzione che gestisce i comandi del bot
function setupCommands(bot) {
  // Comando /start che invia una tastiera inline
  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const options = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'Opzione 1', callback_data: 'opzione1' },
            { text: 'Opzione 2', callback_data: 'opzione2' },
          ],
          [
            { text: 'Opzione 3', callback_data: 'opzione3' }
          ]
        ]
      }
    };
    
    // Invia il messaggio con la tastiera inline
    bot.sendMessage(chatId, 'Scegli una delle opzioni:', options);
  });

  // Gestione dei bottoni cliccati
  bot.on('callback_query', (callbackQuery) => {
    const chatId = callbackQuery.message.chat.id;
    const data = callbackQuery.data; // Dati inviati con il bottone

    if (data === 'opzione1') {
      bot.sendMessage(chatId, 'Hai scelto l\'Opzione 1!');
    } else if (data === 'opzione2') {
      bot.sendMessage(chatId, 'Hai scelto l\'Opzione 2!');
    } else if (data === 'opzione3') {
      bot.sendMessage(chatId, 'Hai scelto l\'Opzione 3!');
    }
  });

  // Altri comandi che vuoi aggiungere
  bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Ecco i comandi disponibili:\n/start per iniziare\n/help per la guida');
  });
}

// Esportiamo la funzione per essere usata in index.js
module.exports = { setupCommands };
