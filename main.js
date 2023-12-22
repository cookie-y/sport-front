import { createSSRApp } from 'vue';
import App from './App';
import uviewPlus from '@/uni_modules/uview-plus';
import pinia from './store/index';
import './mock/index.ts';
import 'uno.css';
import '@/utils/dayjs';
import '@/utils/interceptor';

export function createApp() {
  const app = createSSRApp(App);
  app.use(pinia).use(uviewPlus);
  return {
    app,
  };
}
