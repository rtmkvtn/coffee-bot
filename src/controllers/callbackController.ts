import { telegramService } from '@/services/telegramService'
import { IUpdate } from '@/types'

type CallbackHandler = (update: IUpdate) => Promise<void>

class CallbackController {
  private handlers: Map<string, CallbackHandler> = new Map()

  registerHandler(callbackData: string, handler: CallbackHandler): void {
    this.handlers.set(callbackData, handler)
  }

  async handleCallback(update: IUpdate): Promise<void> {
    const callbackQuery = update.callbackQuery
    if (!callbackQuery) return

    const handler = this.handlers.get(callbackQuery.data)
    if (handler) {
      try {
        await handler(update)
      } catch (error) {
        console.error(`Error handling callback ${callbackQuery.data}:`, error)
        await telegramService.answerCallbackQuery(
          callbackQuery.id,
          'Извините, произошла ошибка. Пожалуйста, попробуйте позже.'
        )
      }
    }
  }
}

export const callbackController = new CallbackController()
