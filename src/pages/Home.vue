<template>
  <div class="h-screen flex items-center justify-center flex-col gap-6">
    <h1 class="text-4xl font-bold text-center">Welcome to Vue Meet</h1>
    <router-link
      to="/join"
      class="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
    >
      Join or Create Meeting
    </router-link>
  </div>
</template>
