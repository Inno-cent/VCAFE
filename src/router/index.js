import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Join from '../pages/Join.vue'
import Room from '../pages/Room.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/join', component: Join },
  { path: '/room/:roomId', component: Room },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})