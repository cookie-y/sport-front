import App from './App'
import uviewPlus from '@/uni_modules/uview-plus'
import pinia from './store/index';
import "./mock/index.ts"
import 'uno.css';
import '@/utils/dayjs';
import '@/utils/interceptor';

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  app.use(pinia).use(uviewPlus)
  return {
    app
  }
}
// #endif