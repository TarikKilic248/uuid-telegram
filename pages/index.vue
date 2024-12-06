<script setup lang="ts">
definePageMeta({
  name: 'home',
})
const telegramStore = useTelegramStore()
const uuidStore = useUUIDStore()

onMounted(() => {
  uuidStore.generateUuid()
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
        <a href="https://t.me/UUID_maker_version1_bot" class="font-bold px-8 py-4 whitespace-nowrap" target="_blank" @click="telegramStore.fetchTelegram">Botu Başlat</a>

        <p class="text-surface-700 dark:text-surface-200 leading-normal mb-8 text-center lg:text-left">
          Search UUID_Maker for Telegram.
        </p>
        <p>Your Chat ID: {{ telegramStore.chatId }}</p>
        <div class="font-bold px-8 py-4 whitespace-nowrap">
          <Button
            label="Send UUID"
            type="button"
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
