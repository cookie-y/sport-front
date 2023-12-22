import { defineConfig, presetUno } from 'unocss';

export default defineConfig({
  presets: [presetUno()],
  rules: [
    [/^m-(\d+)$/, ([, d]) => ({ margin: `${d / 37.5}rem` })],
    [/^ml-(\d+)$/, ([, d]) => ({ 'margin-left': `${d / 37.5}rem` })],
    [/^mr-(\d+)$/, ([, d]) => ({ 'margin-right': `${d / 37.5}rem` })],
    [/^mt-(\d+)$/, ([, d]) => ({ 'margin-top': `${d / 37.5}rem` })],
    [/^mb-(\d+)$/, ([, d]) => ({ 'margin-bottom': `${d / 37.5}rem` })],
    [/^p-(\d+)$/, ([, d]) => ({ padding: `${d / 37.5}rem` })],
    [/^pl-(\d+)$/, ([, d]) => ({ 'padding-left': `${d / 37.5}rem` })],
    [/^pr-(\d+)$/, ([, d]) => ({ 'padding-right': `${d / 37.5}rem` })],
    [/^pt-(\d+)$/, ([, d]) => ({ 'padding-top': `${d / 37.5}rem` })],
    [/^pb-(\d+)$/, ([, d]) => ({ 'padding-bottom': `${d / 37.5}rem` })],
    [/^w-(\d+)$/, ([, d]) => ({ width: `${d / 37.5}rem !important` })],
    [/^h-(\d+)$/, ([, d]) => ({ height: `${d / 37.5}rem` })],
    [/^rounded-(\d+)$/, ([, d]) => ({ 'border-radius': `${d / 37.5}rem` })],
    [/^fs-(\d+)$/, ([, d]) => ({ 'font-size': `${d / 37.5}rem` })],
  ],
});
