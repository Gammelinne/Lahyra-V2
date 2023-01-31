import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
loadFonts() //load fonts from google
import  Echo  from 'laravel-echo'
import Pusher from 'pusher-js'
window.Pusher = Pusher;
 

localStorage.setItem('token', process.env.VUE_APP_TOKEN) //set token for axios

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.VUE_APP_PUSHER_APP_KEY,
    wsHost: window.location.hostname,
    cluster: "mt1",
    wsPort: 6001,
    wssPort: 6001,
    forceTLS: false,
    authEndpoint: 'http://drinkolo-back.test/broadcasting/auth',
    auth: {
        headers: {
            //allow cors
            'Access-Control-Allow-Origin': '*',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
            Accept: 'application/json'
        }
    }
})


//configure axios


createApp(App).use(router).use(vuetify).mount('#app')