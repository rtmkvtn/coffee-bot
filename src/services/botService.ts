import TelegramBot from 'node-telegram-bot-api'

import { config } from '@/config'

class BotService {
  private bot: TelegramBot

  constructor() {
    const isDevelopment = process.env.NODE_ENV === 'development'

    this.bot = new TelegramBot(config.bot.token, {
      // Use polling in development, webhook in production
      ...(isDevelopment
        ? { polling: true }
        : {
            webHook: {
              port: config.server.port,
            },
          }),
    })
  }

  async initialize(): Promise<void> {
    try {
      const isDevelopment = process.env.NODE_ENV === 'development'

      if (!isDevelopment && config.bot.webhookUrl) {
        // Set webhook only in production
        await this.bot.setWebHook(config.bot.webhookUrl, {
          allowed_updates: ['message', 'callback_query'],
        })
      }

      // Get bot info
      const botInfo = await this.bot.getMe()
      console.log(
        `Bot initialized: @${botInfo.username} (${isDevelopment ? 'polling' : 'webhook'} mode)`
      )
    } catch (error) {
      console.error('Failed to initialize bot:', error)
      throw error
    }
  }

  async deleteWebhook(): Promise<void> {
    try {
      const isDevelopment = process.env.NODE_ENV === 'development'

      if (!isDevelopment) {
        await this.bot.deleteWebHook()
        console.log('Webhook deleted successfully')
      }
    } catch (error) {
      console.error('Failed to delete webhook:', error)
      throw error
    }
  }

  getBot(): TelegramBot {
    return this.bot
  }
}

export const botService = new BotService()
