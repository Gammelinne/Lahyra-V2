import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import CapacitorPlugin from './capacitor';
//import './pusher-config'
import i18n from './i18n.config'
import vuetify from './plugins/vuetify';



createApp(App).use(CapacitorPlugin).use(router).use(vuetify).use(i18n).mount('#app')