import { resolve } from 'path';
import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import UnoCSS from 'unocss/vite';

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './'),
    },
  },
  plugins: [uni(), UnoCSS()],
  server: {
    // 端口
    port: 8888,
    // 自动打开
    open: true,
    // 开启热更新
    hmr: true,
    // 配置代理
    proxy: {
      '/eggapi': {
        target: 'http://192.168.0.192:7001',
        changeOrigin: true,
      },
      '/restapi': {
        target: 'https://restapi.amap.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/restapi/, ''),
      },
    },
  },
});
