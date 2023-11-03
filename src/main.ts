import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import './assets/styles/app.css'
import gtag from 'vue-gtag-next'
import { createI18n, type I18nOptions } from 'vue-i18n'
import en from './assets/i18n/en'
import config from 'config'

const i18n = createI18n(<I18nOptions>{
    allowComposition: true,
    locale: 'en',
    messages: {
        'en': en,
    },
})

createApp(App)
    .use(gtag, { isEnabled: false, property: { id: config.gaMeasurementId } })
    .use(i18n)
    .use(createPinia())
    .mount('#app')
