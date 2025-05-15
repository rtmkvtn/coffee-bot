import { localizationService } from '@/services/localizationService'
import { telegramService } from '@/services/telegramService'
import { ICommand, IMessage } from '@/types'

class CommandController {
  private commands: Map<string, ICommand> = new Map()

  registerCommand(command: ICommand): void {
    this.commands.set(command.command, command)
  }

  async handleCommand(message: IMessage): Promise<void> {
    const command = message.text?.split(' ')[0].toLowerCase()
    if (!command) return

    const handler = this.commands.get(command)
    if (handler) {
      try {
        await handler.handler(message)
      } catch (error) {
        console.error(`Error handling command ${command}:`, error)
        await telegramService.sendMessage(
          message.chat.id,
          localizationService.getText('error', message.from?.language_code)
        )
      }
    }
  }

  getCommands(): ICommand[] {
    return Array.from(this.commands.values())
  }
}

export const commandController = new CommandController()
