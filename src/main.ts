import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import vant, { showToast } from 'vant'
import 'element-plus/dist/index.css'
import 'vant/lib/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.use(vant)
showToast.success = function (message: string, duration = 2000) {
  showToast({
    message,
    duration,
    icon: 'success',
  })
}
showToast.fail = function (message: string, duration: number = 2000) {
  showToast({
    message,
    duration,
    icon: 'fail',
  })
}

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
