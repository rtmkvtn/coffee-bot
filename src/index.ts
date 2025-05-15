import express from 'express'

import { config } from './config'
import { commandController } from './controllers/commandController'
import { eventController } from './controllers/eventController'
import router from './routes'
import { botService } from './services/botService'
import { telegramService } from './services/telegramService'

// Register commands
commandController.registerCommand({
  command: '/start',
  description: 'Начать работу с ботом',
  handler: async (message) => {
    await telegramService.sendMessage(
      message.chat.id,
      'Добро пожаловать в Coffee Bot! 🎉\n\nИспользуйте /menu чтобы увидеть наше меню.'
    )
  },
})

commandController.registerCommand({
  command: '/menu',
  description: 'Показать меню',
  handler: async (message) => {
    await telegramService.sendMessage(
      message.chat.id,
      'Наше меню:\n\n' +
        '☕️ Кофе:\n' +
        '- Эспрессо\n' +
        '- Американо\n' +
        '- Капучино\n' +
        '- Латте\n\n' +
        '🍵 Чай:\n' +
        '- Черный чай\n' +
        '- Зеленый чай\n' +
        '- Травяной чай'
    )
  },
})

// Create Express app
const app = express()
app.use(express.json())

// Use routes
app.use('/', router)

let server: any

// Initialize bot and start server
async function startServer() {
  try {
    // Initialize bot
    await botService.initialize()

    // Initialize event handlers
    eventController.initialize()

    // Start server
    server = app.listen(config.server.port, () => {
      console.log(`Server is running on port ${config.server.port}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

// Graceful shutdown
async function shutdown() {
  console.log('Shutting down gracefully...')

  try {
    // Delete webhook
    await botService.deleteWebhook()

    // Close server
    if (server) {
      await new Promise((resolve) => {
        server.close(resolve)
      })
    }

    console.log('Server shut down successfully')
    process.exit(0)
  } catch (error) {
    console.error('Error during shutdown:', error)
    process.exit(1)
  }
}

// Handle shutdown signals
process.on('SIGTERM', shutdown)
process.on('SIGINT', shutdown)

startServer()
