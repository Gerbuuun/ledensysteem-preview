import { plugin, defaultConfig } from "@formkit/vue";
import { nl } from '@formkit/i18n';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(plugin, defaultConfig({
    theme: 'genesis',
    locales: { nl },
    locale: 'nl',
  }));
});