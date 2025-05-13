import TelegramBot, { Message } from "node-telegram-bot-api";
import express from 'express';
import {BOT_TOKEN, WEBAPP_URL, WEBHOOK_URL} from './constants';

const bot = new TelegramBot(BOT_TOKEN, { webHook: true });
bot.setWebHook(WEBHOOK_URL);

// Create Express app
const app = express();
app.use(express.json());

// Webhook endpoint
app.post('/telegram-webhook', (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Start Express server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(WEBAPP_URL, WEBHOOK_URL, BOT_TOKEN)
});

bot.on('message', async (msg: Message) => {
  const chatId = msg.chat.id
  const text = msg.text
  console.log(`message #${text}`);

  if (text === '/start') {
    await bot.sendMessage(chatId, 'Кнопка ниже', {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Button', web_app: {url: WEBAPP_URL}
            }
          ]
        ]
      }
    })
  }
})
