import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
window.Pusher = Pusher;

try {
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
                Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user')).access_token,
                Accept: 'application/json'
            }
        }
    })
} catch (error) {
    console.log(error)
}