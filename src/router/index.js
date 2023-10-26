import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Singer from '../views/Singer.vue'
import List from '../views/List.vue'
import Allsongs from '../views/Allsongs.vue'
import Play from '../views/Play.vue'
import Login from '@/views/Login.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/singer',
    name: 'Singer',
    component: Singer
  },
  {
    path: '/list',
    name: 'List',
    component: List
  },
  {
    path: '/allsongs',
    name: 'Allsongs',
    component: Allsongs
  },
  {
    path: '/play',
    name: 'Play',
    component: Play
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
