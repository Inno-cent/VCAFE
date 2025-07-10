import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Join from '../pages/Join.vue'
import Room from '../pages/Room.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/join', name: 'Join', component: Join },
  { path: '/room/:roomId', name: 'Room', component: Room } // ✅ This must have a `name`
]

export default createRouter({
  history: createWebHistory(),
  routes,
})