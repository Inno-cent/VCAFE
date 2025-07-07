<template>
  <div class="h-screen flex flex-col">
    <div class="flex justify-between p-4 bg-gray-900 text-white">
      <h2 class="text-lg">Room: {{ roomId }}</h2>
      <p class="italic">You: {{ username }}</p>
    </div>

    <div class="flex-grow grid place-items-center bg-gray-100">
      <video ref="localVideo" autoplay muted playsinline class="w-[400px] rounded shadow" />
    </div>

    <div class="flex justify-center gap-4 p-4 bg-white border-t">
      <button class="px-4 py-2 bg-blue-600 text-white rounded">Mute</button>
      <button class="px-4 py-2 bg-gray-800 text-white rounded">Camera</button>
      <button class="px-4 py-2 bg-red-600 text-white rounded">Leave</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const roomId = route.params.roomId
const username = route.query.name

const localVideo = ref(null)

onMounted(async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  localVideo.value.srcObject = stream
})
</script>
