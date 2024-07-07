import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import store from "@/store"
import App from './App.vue'
import locale from 'element-plus/dist/locale/zh-cn'
const app = createApp(App)
app.use(ElementPlus, { locale }).use(router).use(store)
app.mount('#app')
