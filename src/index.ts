import TelegramBot, { Message } from "node-telegram-bot-api";

const token = '7994672561:AAG-F_WcfQ8Ddy7c00Tj8EvBzWxw3kdhZrA'
const weAppUrl = 'https://669f-166-1-22-232.ngrok-free.app'
const bot = new TelegramBot(token, {polling: true})

bot.on('message', async (msg: Message) => {
  const chatId = msg.chat.id
  const text = msg.text

  if (text === '/start') {
    await bot.sendMessage(chatId, 'Кнопка ниже', {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Button', web_app: {url: weAppUrl}
            }
          ]
        ]
      }
    })
  }
})
