import { defineConfig, presetUno } from 'unocss';

export default defineConfig({
  presets: [presetUno()],
  rules: [
    [/^m-(\d+)$/, ([, d]) => ({ margin: `${d * 2}rpx` })],
    [/^ml-(\d+)$/, ([, d]) => ({ 'margin-left': `${d * 2}rpx` })],
    [/^mr-(\d+)$/, ([, d]) => ({ 'margin-right': `${d * 2}rpx` })],
    [/^mt-(\d+)$/, ([, d]) => ({ 'margin-top': `${d * 2}rpx` })],
    [/^mb-(\d+)$/, ([, d]) => ({ 'margin-bottom': `${d * 2}rpx` })],
    [/^p-(\d+)$/, ([, d]) => ({ padding: `${d * 2}rpx` })],
    [/^pl-(\d+)$/, ([, d]) => ({ 'padding-left': `${d * 2}rpx` })],
    [/^pr-(\d+)$/, ([, d]) => ({ 'padding-right': `${d * 2}rpx` })],
    [/^pt-(\d+)$/, ([, d]) => ({ 'padding-top': `${d * 2}rpx` })],
    [/^pb-(\d+)$/, ([, d]) => ({ 'padding-bottom': `${d * 2}rpx` })],
    [/^w-(\d+)$/, ([, d]) => ({ width: `${d * 2}rpx !important` })],
    [/^h-(\d+)$/, ([, d]) => ({ height: `${d * 2}rpx` })],
    [/^rounded-(\d+)$/, ([, d]) => ({ 'border-radius': `${d * 2}rpx` })],
    [/^fs-(\d+)$/, ([, d]) => ({ 'font-size': `${d * 2}rpx` })],
  ],
});
