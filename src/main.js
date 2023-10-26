import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import Vant from 'vant';
import 'vant/lib/index.css';


const app = createApp(App)

app.config.globalProperties.$axios = axios

app.use(router)
app.use(Vant);
app.mount('#app')
