import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import CapacitorPlugin from './capacitor';
//import './pusher-config'
import i18n from './i18n.config'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})



createApp(App).use(CapacitorPlugin).use(router).use(vuetify).use(i18n).mount('#app')