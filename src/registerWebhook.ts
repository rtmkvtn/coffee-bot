import fetch from 'node-fetch'

import { BOT_TOKEN, WEBHOOK_URL } from './constants'

const token = BOT_TOKEN
const webhookUrl = WEBHOOK_URL

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
    body: `url=${encodeURIComponent(webhookUrl as string)}`,
  })
  const data = await res.json()
  console.log(data)
}

setWebhook().catch(console.error)
