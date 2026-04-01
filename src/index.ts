import dotenv from 'dotenv'
import express from 'express'
import fetch from 'node-fetch'
import TelegramBot, { Message } from 'node-telegram-bot-api'

import { BACKEND_URL, BOT_TOKEN, WEBAPP_URL, WEBHOOK_URL } from './constants'
import { getTerms } from './terms'

dotenv.config()
console.log('BOT_TOKEN:', process.env.BOT_TOKEN)

if (!BOT_TOKEN) {
  throw new Error('BOT_TOKEN is not defined')
}

const bot = new TelegramBot(
  BOT_TOKEN,
  process.env.NODE_ENV === 'development' ? { polling: true } : { webHook: true }
)
bot.setWebHook(WEBHOOK_URL)

// Create Express app
const app = express()
app.use(express.json())

// Webhook endpoint
app.post('/telegram-webhook', (req, res) => {
  bot.processUpdate(req.body)
  res.sendStatus(200)
})

// Start Express server
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

async function checkTermsStatus(
  telegramId: string
): Promise<{ agreedToTerms: boolean } | null> {
  try {
    const res = await fetch(
      `${BACKEND_URL}/bot-internal/users/${telegramId}/terms`,
      {
        headers: { Authorization: `Bearer ${BOT_TOKEN}` },
      }
    )
    if (res.status === 404) return null
    if (!res.ok) return null
    return (await res.json()) as { agreedToTerms: boolean }
  } catch (err) {
    console.error('Failed to check terms status:', err)
    return null
  }
}

async function agreeToTerms(telegramId: string): Promise<boolean> {
  try {
    const res = await fetch(
      `${BACKEND_URL}/bot-internal/users/${telegramId}/terms`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${BOT_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ agreedToTerms: true }),
      }
    )
    return res.ok
  } catch (err) {
    console.error('Failed to agree to terms:', err)
    return false
  }
}

bot.on('message', async (msg: Message) => {
  const chatId = msg.chat.id
  const text = msg.text
  const telegramId = String(msg.from?.id)

  console.log(`message #${text}`)

  if (text === '/start') {
    const terms = getTerms(msg.from?.language_code)
    const status = await checkTermsStatus(telegramId)

    if (status?.agreedToTerms) {
      await bot.sendMessage(chatId, terms.welcomeBack, {
        reply_markup: {
          keyboard: [
            [
              {
                text: terms.openMenu,
                web_app: { url: WEBAPP_URL },
              },
            ],
          ],
          resize_keyboard: true,
          one_time_keyboard: false,
        },
      })
      return
    }

    await bot.sendMessage(chatId, terms.text, {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: terms.agree,
              callback_data: 'terms_agree',
            },
            {
              text: terms.decline,
              callback_data: 'terms_decline',
            },
          ],
        ],
      },
    })
  }
})

bot.on('callback_query', async (query) => {
  const chatId = query.message?.chat.id
  const telegramId = String(query.from.id)
  const terms = getTerms(query.from.language_code)

  if (!chatId) return

  if (query.data === 'terms_agree') {
    const ok = await agreeToTerms(telegramId)
    await bot.answerCallbackQuery(query.id)

    if (ok) {
      await bot.sendMessage(chatId, terms.success, {
        reply_markup: {
          keyboard: [
            [
              {
                text: terms.openMenu,
                web_app: { url: WEBAPP_URL },
              },
            ],
          ],
          resize_keyboard: true,
          one_time_keyboard: false,
        },
      })
    } else {
      await bot.sendMessage(
        chatId,
        'Something went wrong. Please try again with /start'
      )
    }
  }

  if (query.data === 'terms_decline') {
    await bot.answerCallbackQuery(query.id)
    await bot.sendMessage(chatId, terms.declined)
  }
})
