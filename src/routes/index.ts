import express from 'express'

import { callbackController } from '@/controllers/callbackController'
import { commandController } from '@/controllers/commandController'
import { IUpdate } from '@/types'

const router = express.Router()

router.post('/webhook', async (req, res) => {
  try {
    const update: IUpdate = req.body

    if (update.message) {
      await commandController.handleCommand(update.message)
    } else if (update.callbackQuery) {
      await callbackController.handleCallback(update)
    }

    res.sendStatus(200)
  } catch (error) {
    console.error('Error processing webhook:', error)
    res.sendStatus(500)
  }
})

export default router
