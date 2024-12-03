export const useUUIDStore = defineStore('uuid', () => {
  const uuid = ref()

  const generateUuid = async () => {
    const response = await fetch('https://www.uuidgenerator.net/api/version1')
    const data = await response.text()
    uuid.value = data.trim()
  }

  const copyUuid = async () => {
    if (!uuid.value) {
      return alert('UUID is not generated yet.')
    }

    await navigator.clipboard.writeText(uuid.value)
    alert('UUID has been copied to clipboard.')
  }

  return {
    uuid,
    generateUuid,
    copyUuid,
  }
})
