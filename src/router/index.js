import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Singer from '../views/Singer.vue'
import List from '../views/List.vue'
import Allsongs from '../views/Allsongs.vue'
import Play from '../views/Play.vue'
import Login from '@/views/Login.vue'
import MyPosition from '@/views/MyPosition.vue'
import OfflineMessage from '@/views/OfflineMessage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/home/singer',
    name: 'Singer',
    component: Singer
  },
  {
    path: '/home/list',
    name: 'List',
    component: List
  },
  {
    path: '/home/singer/allsongs',
    name: 'Allsongs',
    component: Allsongs
  },
  {
    path: '/home/play',
    name: 'Play',
    component: Play
  },
  {
    path: '/home/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home/myPosition',
    name: 'MyPosition',
    component: MyPosition
  },
  {
    path: '/home/offlineMessage',
    name: 'OfflineMessage',
    component: OfflineMessage
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
