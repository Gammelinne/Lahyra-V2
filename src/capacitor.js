// capacitor.js
import { Capacitor } from '@capacitor/core';


export default {
  install(app) {
    app.config.globalProperties.$capacitor = Capacitor;
    app.config.globalProperties.$capacitor_platform = Capacitor.getPlatform();
  },
};