import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './HomeView.vue'
import PackView from './PackView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomeView },
    { path: '/pack/:packName', component: PackView },
  ],
})

export default router
