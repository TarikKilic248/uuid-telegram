import { defineEventHandler, readBody } from 'h3'

// Botun aldığı son güncellemeleri kontrol et
async function getChatIdFromBot() {
  const botToken = process.env.BOT_TOKEN // Bot token'ınızı buraya alın

  
  const response = await fetch(`https://api.telegram.org/bot${botToken}/getUpdates`)
  const data = await response.json()

  if (data.ok && data.result.length > 0) {
    const chatId = data.result[data.result.length - 1].message.chat.id
    return chatId
  }
  else {
    throw new Error('Kullanıcı chat ID alınamadı')
  }
}

export default defineEventHandler(async () => {
  // Botun chat ID'sini almak için getUpdates çağrısı yapabilirsiniz
  const chatId = await getChatIdFromBot()
  return { chatId }
})
