import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueSweetaleart2 from 'vue-sweetalert2'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(VueSweetaleart2)
app.use(VueAxios, axios)
app.use(pinia)

app.mount('#app')