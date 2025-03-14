export const useTelegramStore = defineStore('telegram', () => {
  const botToken = useRuntimeConfig().public.botToken
  const chatId = ref()

  const fetchTelegram = async () => {
    try {
      const response = await fetch(`https://api.telegram.org/bot${botToken}/getUpdates`)
      const data = await response.json()

      if (data.ok && data.result.length > 0) {
        // API'den gelen son mesajın chat_id'sini al
        chatId.value = data.result[data.result.length - 1]?.message?.chat?.id

        if (!chatId.value) {
          console.error('Chat ID bulunamadı, API yanıtı:', data)
        }
      }
      else {
        console.error('Telegram API yanıtı başarısız veya sonuç boş:', data)
      }
    }
    catch (error) {
      console.error('Telegram API hatası:', error)
    }
  }

  const sendUUIDToTelegram = async (uuid: any) => {
    if (!chatId.value) {
      alert('Chat ID bulunamadı. Lütfen önce "Botu Başlat" butonuna tıklayın ve sonra "Yükle" butonuna basın.')
      return
    }

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
      alert('Telegram\'a gönderim sırasında bir hata oluştu. Lütfen konsolu kontrol edin.')
    }
  }

  return {
    chatId,
    sendUUIDToTelegram,
    fetchTelegram,
  }
})
