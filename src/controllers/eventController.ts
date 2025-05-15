import { CallbackQuery, Message } from 'node-telegram-bot-api'

import { botService } from '@/services/botService'

import { callbackController } from './callbackController'
import { commandController } from './commandController'

class EventController {
  initialize(): void {
    const bot = botService.getBot()

    // Handle text messages
    bot.on('text', async (msg: Message) => {
      try {
        await commandController.handleCommand(msg)
      } catch (error) {
        console.error('Error handling text message:', error)
      }
    })

    // Handle callback queries
    bot.on('callback_query', async (query: CallbackQuery) => {
      try {
        if (query.message) {
          await callbackController.handleCallback({
            updateId: 0, // This will be set by Telegram
            callbackQuery: {
              id: query.id,
              from: query.from,
              message: query.message,
              data: query.data || '',
            },
          })
        }
      } catch (error) {
        console.error('Error handling callback query:', error)
      }
    })

    // Handle errors
    bot.on('polling_error', (error) => {
      console.error('Polling error:', error)
    })

    bot.on('webhook_error', (error) => {
      console.error('Webhook error:', error)
    })
  }
}

export const eventController = new EventController()
