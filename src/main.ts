import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import "../public/rem.less"
import "lib-flexible/flexible.js"
import { symbolState, createState, symbolChangState, changeCollapse } from '@/util/store'


createApp(App).use(store).use(router).use(ElementPlus).provide(symbolState, createState()).provide(symbolChangState, changeCollapse).mount('#app')
