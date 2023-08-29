import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import './assets/styles/app.css'
import { createI18n, type I18nOptions } from 'vue-i18n'
import en from './assets/i18n/en'

const i18n = createI18n(<I18nOptions>{
    allowComposition: true,
    locale: 'en',
    messages: {
        'en': en,
    },
})

createApp(App)
    .use(i18n)
    .use(createPinia())
    .mount('#app')
