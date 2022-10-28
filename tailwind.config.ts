import {Config} from "tailwindcss";

export default <Config> {
  content: [
    `components/**/*.{vue,js}`,
    `layouts/**/*.vue`,
    `pages/**/*.vue`,
    `composables/**/*.{js,ts}`,
    `plugins/**/*.{js,ts}`,
    `App.{js,ts,vue}`,
    `app.{js,ts,vue}`,
    'formkit.config.ts'
  ],
  theme: {},
  plugins: [
    require('daisyui'),
    require('@formkit/themes/tailwindcss'),
  ],
  daisyui: {
    themes: false,
  }
}
