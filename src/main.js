import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import Vant from 'vant'
import 'virtual:uno.css'
import 'vant/lib/index.css'

const app = createApp(App)

axios.interceptors.request.use(config => {
  if (config.method === 'get') {
    config.params = {
      realIp: '171.220.159.204',
      ...config.params
    }
  }
  return config
})


app.config.globalProperties.$axios = axios
app.config.globalProperties.$apiBaseUrl = 'https://term-project-h5-api.kejinginsurance.icu'

router.afterEach((to, from) => {
  const toDepth = to.path.split('/').length
  const fromDepth = from.path.split('/').length
  to.meta.transition = toDepth < fromDepth ? 'slide-right' : 'slide-left'
})

app.use(router)
app.use(Vant)
app.mount('#app')
