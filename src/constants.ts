import dotenv from 'dotenv'

dotenv.config()

export const BOT_TOKEN = process.env.BOT_TOKEN
export const DOMAIN = process.env.DOMAIN || 'https://democoffeeandseaguls.ru'
export const WEBAPP_URL =
  process.env.WEBAPP_URL || 'https://democoffeeandseaguls.ru/web-app'
export const WEBHOOK_URL = `${DOMAIN}/telegram-webhook`
export const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:1337'
export const BOT_NOTIFY_SECRET = process.env.BOT_NOTIFY_SECRET || ''
