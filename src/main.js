import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { initTheme } from './composables/useTheme.js'
import VueApexCharts from 'vue3-apexcharts'
import './style.css'

initTheme()

const app = createApp(App)

app.use(router)
app.use(VueApexCharts)
app.mount('#app')
