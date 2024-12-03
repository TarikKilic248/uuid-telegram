<!-- eslint-disable no-alert -->
<script setup>
import { onMounted, ref } from 'vue'

// UUID ve bot konfigürasyonu
const uuid = ref('')
const botToken = useRuntimeConfig().public.botToken
const chatId = ref('') // Dinamik chat ID'yi burada alıyoruz

async function sendUuidToTelegram() {
  if (!chatId.value) {
    alert('Lütfen geçerli bir Chat ID girin.')
    return
  }

  await sendToTelegram(uuid.value)
}

async function fetchUuid() {
  try {
    const response = await fetch('https://www.uuidgenerator.net/api/version1')
    const data = await response.text()
    uuid.value = data.trim()
  }
  catch (error) {
    console.error('UUID alırken hata oluştu:', error)
  }
}

async function sendToTelegram(uuid) {
  if (!uuid) {
    alert('Gönderilecek UUID bulunamadı!')
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

    alert('UUID başarıyla Telegram\'a gönderildi!')
  }
  catch (error) {
    console.error('Telegram\'a gönderim sırasında bir hata oluştu:', error)
    alert('Telegram\'a gönderim başarısız oldu.')
  }
}

async function copyToClipboard() {
  if (!uuid.value) {
    alert('Kopyalanacak UUID bulunamadı!')
    return
  }

  try {
    await navigator.clipboard.writeText(uuid.value)
    alert('UUID başarıyla kopyalandı!')
  }
  catch (error) {
    console.error('Kopyalama işlemi sırasında bir hata oluştu:', error)
    alert('Kopyalama işlemi başarısız oldu. Lütfen tarayıcınızı kontrol edin.')
  }
}

async function getChatIdFromBackend() {
  const response = await fetch('/api/telegram')
  const data = await response.json()
  if (data.chatId) {
    chatId.value = data.chatId
  }
  else {
    alert('Chat ID alınamadı.')
  }
}

function regenerateUuid() {
  fetchUuid()
}

onMounted(() => {
  getChatIdFromBackend()
  fetchUuid()
})
</script>

<template>
  <div class="flex justify-between lg:flex-row flex-col bg-surface-0 dark:bg-surface-900">
    <div class="flex flex-col items-center justify-center lg:w-1/2 gap-10">
      <div class="flex justify-center">
        <div class="text-surface-700 dark:text-surface-100 text-center">
          <div class="text-surface-900 dark:text-surface-0 font-bold text-5xl mb-4">
            UUID Maker
          </div>
          <div class="text-surface-700 dark:text-surface-100 text-2xl mb-8">
            <span>{{ uuid }}</span>
            <Button
              icon="i-heroicons-document-duplicate"
              label="Copy"
              @click="copyToClipboard"
            />
          </div>
          <Button
            label="Re generate"
            raised
            rounded
            class="font-bold px-8 py-4 whitespace-nowrap"
            @click="regenerateUuid"
          />
        </div>
      </div>
      <div class="flex flex-col justify-center items-center p-6 pt-12 lg:p-12">
        <h1 class="text-3xl lg:text-5xl font-bold text-surface-900 dark:text-surface-0 mb-4 lg:leading-normal text-center lg:text-left">
          Send message to Telegram
        </h1>
        <a href="https://t.me/UUID_maker_version1_bot" class="font-bold px-8 py-4 whitespace-nowrap" target="_blank">Botu Başlat</a>

        <p class="text-surface-700 dark:text-surface-200 leading-normal mb-8 text-center lg:text-left">
          Search UUID_Maker for Telegram.
        </p>
        <p>Your Chat ID: {{ chatId }}</p>
        <div class="font-bold px-8 py-4 whitespace-nowrap">
          <Button
            label="Send UUID"
            type="button"
            @click="sendUuidToTelegram"
          />
        </div>
      </div>
    </div>
    <div class="flex overflow-hidden h-auto">
      <img src="../public/th.jpeg" alt="hero-1" class="object-cover lg:[clip-path:polygon(12%_0,100%_0%,100%_100%,0_100%)]">
    </div>
  </div>
</template>
