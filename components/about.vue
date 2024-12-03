<script setup>
import Button from 'primevue/button'
</script>

<template>
  <div class="flex lg:flex-row flex-col gap-4 bg-surface-0 dark:bg-surface-900">
    <div class="flex-1 flex items-center justify-center">
      <div class="p-6 pt-12 lg:p-12">
        <h1 class="text-3xl lg:text-5xl font-bold text-surface-900 dark:text-surface-0 mb-4 lg:leading-normal text-center lg:text-left">
          Send to Telegram
        </h1>
        <p class="text-surface-700 dark:text-surface-200 leading-normal mb-8 text-center lg:text-left">
          Search UUID_Maker for Telegram.
        </p>
        <div class="flex items-center justify-center lg:justify-start gap-6">
          <Button label="Send UUID" type="button" />
        </div>
      </div>
    </div>
    <div class="flex-1 overflow-hidden">
      <img src="../public/th.jpeg" alt="hero-1" class="h-full w-full object-cover lg:[clip-path:polygon(12%_0,100%_0%,100%_100%,0_100%)]">
    </div>
  </div>
</template>
