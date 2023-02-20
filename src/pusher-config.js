import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
window.Pusher = Pusher;

export const registerWebSocket = () => {
    window.Echo = new Echo({
        broadcaster: 'pusher',
        key: process.env.VUE_APP_PUSHER_APP_KEY,
        wsHost: window.location.hostname,
        cluster: "mt1",
        wsPort: 6001,
        wssPort: 6001,
        forceTLS: false,
        //authEndpoint: 'http://192.168.1.27:80/broadcasting/auth', home
        authEndpoint: 'http://192.168.203.114:80/broadcasting/auth', //stage
        auth: {
            headers: {
                Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user')).access_token || null,
                Accept: 'application/json'
            }
        }
    })
}