import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueSweetaleart2 from 'vue-sweetalert2'
import axios from 'axios'
import VueAxios from 'vue-axios'
import {createPinia} from "pinia/dist/pinia";
import 'sweetalert2/dist/sweetalert2.min.css';
import Multiselect from "vue-multiselect";

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(VueSweetaleart2)
app.use(VueAxios, axios)
app.use(pinia)
app.use(Multiselect)

app.mount('#app')