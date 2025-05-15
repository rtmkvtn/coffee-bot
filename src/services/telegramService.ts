import { IKeyboard } from '@/types'

import { botService } from './botService'

class TelegramService {
  async sendMessage(
    chatId: number,
    text: string,
    keyboard?: IKeyboard
  ): Promise<void> {
    try {
      await botService.getBot().sendMessage(chatId, text, {
        parse_mode: 'HTML',
        reply_markup: keyboard,
      })
    } catch (error) {
      console.error('Failed to send message:', error)
      throw error
    }
  }

  async answerCallbackQuery(
    callbackQueryId: string,
    text?: string
  ): Promise<void> {
    try {
      await botService.getBot().answerCallbackQuery(callbackQueryId, { text })
    } catch (error) {
      console.error('Failed to answer callback query:', error)
      throw error
    }
  }

  async deleteMessage(chatId: number, messageId: number): Promise<void> {
    try {
      await botService.getBot().deleteMessage(chatId, messageId)
    } catch (error) {
      console.error('Failed to delete message:', error)
      throw error
    }
  }

  async editMessageText(
    chatId: number,
    messageId: number,
    text: string,
    keyboard?: IKeyboard
  ): Promise<void> {
    try {
      await botService.getBot().editMessageText(text, {
        chat_id: chatId,
        message_id: messageId,
        parse_mode: 'HTML',
        reply_markup: keyboard,
      })
    } catch (error) {
      console.error('Failed to edit message:', error)
      throw error
    }
  }
}

export const telegramService = new TelegramService()
