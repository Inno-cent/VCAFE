<template>
  <div class="h-screen flex flex-col items-center justify-center gap-4 px-4 text-center">
    <h2 class="text-2xl font-semibold">Enter Your Name</h2>
    <input
      v-model="username"
      type="text"
      placeholder="Your name"
      class="border border-gray-300 p-2 rounded w-64"
    />

    <h2 class="text-xl font-semibold mt-6">Join or Create a Room</h2>
    <input
      v-model="roomCode"
      type="text"
      placeholder="Enter room code"
      class="border border-gray-300 p-2 rounded w-64"
    />

    <div class="flex gap-4 mt-4">
      <button
        @click="joinRoom"
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
      >
        Join Room
      </button>
      <button
        @click="createRoom"
        class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
      >
        New Room
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const roomCode = ref('')

const joinRoom = () => {
  if (!username.value.trim() || !roomCode.value.trim()) {
    alert('Please enter both your name and a room code.')
    return
  }

  router.push({
    name: 'Room',
    params: { roomId: roomCode.value.trim() },
    query: { name: username.value.trim() }
  })
}

const createRoom = () => {
  if (!username.value.trim()) {
    alert('Please enter your name before creating a room.')
    return
  }

  const id = crypto.randomUUID().slice(0, 6)
  router.push({
    name: 'Room',
    params: { roomId: id },
    query: { name: username.value.trim() }
  })
}
</script>
