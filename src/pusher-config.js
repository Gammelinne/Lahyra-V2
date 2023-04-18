import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
window.Pusher = Pusher;
const userJSON = localStorage.getItem('user');
let user;
if (userJSON == 'undefined' || userJSON == null) {
    user = null;
} else {
    try {
        user = JSON.parse(userJSON);
    } catch (e) {
        //console.error(`Failed to parse user JSON: ${e}`);
        user = null;
    }
}
export const registerWebSocket = () => {
    window.Echo = new Echo({
        broadcaster: 'pusher',
        key: process.env.VUE_APP_PUSHER_APP_KEY,
        wsHost: window.location.hostname,
        cluster: "mt1",
        wsPort: 6001,
        wssPort: 6001,
        forceTLS: false,
        authEndpoint: process.env.VUE_APP_API_URL + 'broadcasting/auth',
        auth: {
            headers: {
                Authorization: user && user.access_token ? 'Bearer ' + user.access_token : '',
                Accept: 'application/json'
            }
        }
    })
}
