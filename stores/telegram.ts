export const useTelegramStore = defineStore('telegram', () => {
  const botToken = useRuntimeConfig().public.botToken
  const chatId = ref()

  const fetchTelegram = async () => {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/getUpdates`)
    const data = await response.json()
    chatId.value = data.result[data.result.length - 1]?.message.chat.id
  }

  const sendUUIDToTelegram = async (uuid: any) => {
    const message = `Yeni UUID oluşturuldu: ${uuid}`
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`

    try {
      const response = await fetch(telegramUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId.value,
          text: message,
        }),
      })

      if (!response.ok) {
        throw new Error(`Telegram API hatası: ${response.statusText}`)
      }
    }
    catch (error) {
      console.error('Telegram\'a gönderim sırasında bir hata oluştu:', error)
    }
  }

  return {
    chatId,
    sendUUIDToTelegram,
    fetchTelegram,
  }
})
