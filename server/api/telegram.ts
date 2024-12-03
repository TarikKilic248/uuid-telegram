import { defineEventHandler, getQuery, readBody } from 'h3'

// Chat ID'leri saklamak için bir set
const chatIds = new Set<string>()

// Check chat ID endpoint
export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Endpoint belirleme
  if (event.req.url?.includes('check-chat-id')) {
    const chatId = body.chatId

    if (chatIds.has(chatId)) {
      return { chatIdExists: true }
    }
    else {
      return { chatIdExists: false }
    }
  }

  // Save chat ID endpoint
  if (event.req.url?.includes('save-chat-id')) {
    const chatId = body.chatId
    chatIds.add(chatId)
    return { success: true }
  }

  return { error: 'Invalid API endpoint' }
})
