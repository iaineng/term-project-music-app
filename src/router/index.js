import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/home/singer',
    name: 'Singer',
    component: () => import('../views/Singer.vue')
  },
  {
    path: '/home/list',
    name: 'List',
    component: () => import('../views/List.vue')
  },
  {
    path: '/home/singer/allsongs',
    name: 'Allsongs',
    component: () => import('../views/Allsongs.vue')
  },
  {
    path: '/home/play',
    name: 'Play',
    component: () => import('../views/Play.vue')
  },
  {
    path: '/home/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/home/myPosition',
    name: 'MyPosition',
    component: () => import('../views/MyPosition.vue')
  },
  {
    path: '/home/offlineMessage',
    name: 'OfflineMessage',
    component: () => import('../views/OfflineMessage.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
