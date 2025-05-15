import dotenv from 'dotenv'

dotenv.config()

const isDevelopment = process.env.NODE_ENV === 'development'

// Validate required environment variables
const requiredEnvVars = ['BOT_TOKEN']
if (!isDevelopment) {
  requiredEnvVars.push('WEBHOOK_URL')
}

const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar])

if (missingEnvVars.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingEnvVars.join(', ')}`
  )
}

export const config = {
  bot: {
    token: process.env.BOT_TOKEN!,
    webhookUrl:
      process.env.WEBHOOK_URL ||
      'https://democoffeeandseaguls.ru/telegram-webhook',
  },
  server: {
    port: parseInt(process.env.PORT || '3001', 10),
  },
  webapp: {
    url: process.env.WEBAPP_URL || 'https://democoffeeandseaguls.ru/web-app',
  },
  domain: process.env.DOMAIN || 'https://democoffeeandseaguls.ru',
} as const
