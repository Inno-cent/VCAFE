<template>
  <div class="h-screen flex flex-col items-center justify-center gap-4">
    <h2 class="text-2xl font-semibold">Enter Your Name</h2>
    <input v-model="username" placeholder="Your name" class="border p-2 rounded w-64" />

    <h2 class="text-xl font-semibold mt-6">Join or Create a Room</h2>
    <input v-model="roomCode" placeholder="Enter room code" class="border p-2 rounded w-64" />

    <div class="flex gap-4 mt-4">
      <button @click="joinRoom" class="bg-blue-600 text-white px-4 py-2 rounded">
        Join Room
      </button>
      <button @click="createRoom" class="bg-green-600 text-white px-4 py-2 rounded">
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
  if (!username.value || !roomCode.value) return alert('Fill both fields')
  router.push({ name: 'Room', params: { roomId: roomCode.value }, query: { name: username.value } })
}

const createRoom = () => {
  if (!username.value) return alert('Enter name')
  const id = crypto.randomUUID().slice(0, 6)
  router.push({ name: 'Room', params: { roomId: id }, query: { name: username.value } })
}
</script>
