import  Echo  from 'laravel-echo'
import Pusher from 'pusher-js'
window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.VUE_APP_PUSHER_APP_KEY,
    wsHost: window.location.hostname,
    cluster: "mt1",
    wsPort: 6001,
    wssPort: 6001,
    forceTLS: false,
    authEndpoint: 'http://lahyra-back.test/broadcasting/auth',
    auth: {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
            Accept: 'application/json'
        }
    }
})