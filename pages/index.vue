<script setup lang="ts">
definePageMeta({
  name: 'home',
})
const telegramStore = useTelegramStore()
const uuidStore = useUUIDStore()
const botInitialized = ref(false)

onMounted(() => {
  uuidStore.generateUuid()
})

async function initializeBot() {
  botInitialized.value = true
  await telegramStore.fetchTelegram()
}
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
            <span>{{ uuidStore.uuid }}</span>
            <Button
              icon="i-heroicons-document-duplicate"
              label="Copy"
              @click="uuidStore.copyUuid"
            />
          </div>
          <Button
            label="Re generate"
            raised
            rounded
            class="font-bold px-8 py-4 whitespace-nowrap"
            @click="uuidStore.generateUuid"
          />
        </div>
      </div>
      <div class="flex flex-col justify-center items-center p-6 pt-12 lg:p-12">
        <h1 class="text-3xl lg:text-5xl font-bold text-surface-900 dark:text-surface-0 mb-4 lg:leading-normal text-center lg:text-left">
          Send message to Telegram
        </h1>

        <div class="flex flex-col items-center mb-6">
          <p class="mb-4 text-surface-700 dark:text-surface-200">
            1. Adım: Telegram botunu başlatın
          </p>
          <a
            href="https://web.telegram.org/k/"
            class="bg-blue-500 hover:bg-blue-600 text-white font-bold px-8 py-4 rounded-lg mb-4"
            target="_blank"
            @click="initializeBot"
          >
            Botu Başlat
          </a>

          <p class="text-surface-700 dark:text-surface-200 mb-2">
            Chat ID Durumu:
          </p>
          <p :class="{ 'text-red-500': !telegramStore.chatId, 'text-green-500': telegramStore.chatId }" class="mb-6">
            {{ telegramStore.chatId ? 'Başarılı ✓' : 'Bağlantı Kurulmadı ✗' }}
          </p>

          <p class="mb-4 text-surface-700 dark:text-surface-200">
            3. Adım: UUID'yi Telegram'a gönderin
          </p>
          <Button
            label="UUID'yi Telegram'a Gönder"
            class="bg-purple-500 hover:bg-purple-600 text-white font-bold px-8 py-4 rounded-lg"
            :disabled="!telegramStore.chatId"
            @click="telegramStore.sendUUIDToTelegram(uuidStore.uuid)"
          />
        </div>
      </div>
    </div>
    <div class="flex overflow-hidden h-auto">
      <img src="public/th.jpeg" alt="hero-1" class="object-cover lg:[clip-path:polygon(12%_0,100%_0%,100%_100%,0_100%)]">
    </div>
  </div>
</template>
