import fetch from 'node-fetch'

import { config } from './config'

const { token, webhookUrl } = config.bot

if (!token || !webhookUrl) {
  console.error(
    'BOT_TOKEN and WEBHOOK_URL must be set as environment variables.'
  )
  process.exit(1)
}

async function setWebhook() {
  const url = `https://api.telegram.org/bot${token}/setWebhook`
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `url=${encodeURIComponent(webhookUrl)}`,
  })
  const data = await res.json()
  console.log(data)
}

setWebhook().catch(console.error)
