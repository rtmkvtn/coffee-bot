import { CallbackQuery, Message } from 'node-telegram-bot-api'

export type IMessage = Message
export type ICallbackQuery = CallbackQuery

export interface IUser {
  id: number
  username?: string
  firstName?: string
  lastName?: string
  languageCode?: string
}

export interface IUpdate {
  updateId: number
  message?: IMessage
  callbackQuery?: {
    id: string
    from: Message['from']
    message: IMessage
    data: string
  }
}

export interface ICommand {
  command: string
  description: string
  handler: (message: IMessage) => Promise<void>
}

export interface IButton {
  text: string
  callbackData: string
}

export interface IKeyboard {
  inline_keyboard: Array<Array<{ text: string; callback_data: string }>>
}
