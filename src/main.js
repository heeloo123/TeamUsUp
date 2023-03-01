import Vue from'vue'
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).use(router).mount('#app')

//import sweetalert
import VueSweetaleart2 from 'vue-sweetalert2';

import router from './router'
Vue.use(VueSweetaleart2);

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios);

import{ MotionPlugin } from '@vueuse/motion'
App.use(MotionPlugin)



