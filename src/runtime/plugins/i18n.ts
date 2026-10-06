import { computed } from 'vue'
import type { Ref } from 'vue'
import { defineNuxtPlugin } from '#imports'
import locales from '#build/ui-locales'
import { localeContextInjectionKey } from '../composables/useLocale'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.provide(localeContextInjectionKey, computed(() => locales[(nuxtApp.$i18n as { locale: Ref<string> }).locale.value]))
})
