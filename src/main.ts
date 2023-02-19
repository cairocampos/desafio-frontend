import { createApp } from 'vue'
import {router} from '@/router'
import './styles/globals.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import { AxiosAdapter } from './core/http/adapters/axios'

const pinia = createPinia()

const axiosAdapter = new AxiosAdapter()

createApp(App)
.use(router)
.use(pinia)
.provide('http', axiosAdapter)
.mount('#app')