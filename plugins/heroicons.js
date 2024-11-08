import { defineNuxtPlugin } from '#app'
import * as heroicons from '@heroicons/vue/24/outline'

export default defineNuxtPlugin((nuxtApp) => {
    // Đăng ký tất cả icon như global components
    Object.entries(heroicons).forEach(([name, icon]) => {
        nuxtApp.vueApp.component(name, icon)
    })
})