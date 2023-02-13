// capacitor.js
import { Capacitor } from '@capacitor/core';
import { Filesystem } from '@capacitor/filesystem';
import { Camera } from '@capacitor/camera';

export default {
  install(app) {
    app.config.globalProperties.$capacitor = Capacitor;
    app.config.globalProperties.$capacitor_filesystem = Filesystem;
    app.config.globalProperties.$capacitor_camera = Camera;

  },
};