import Axios from 'axios';

Axios.defaults.baseURL = process.env.VUE_APP_API_URL + 'api/'; //URL of the API
Axios.defaults.headers.post['Content-Type'] = 'application/json';

export const setAuthorizationHeader = () => {
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
    if (user) {
        Axios.defaults.headers.common['Authorization'] = `Bearer ${user.access_token}`;
        return true;
    } else {
        delete Axios.defaults.headers.common['Authorization'];
        return false;
    }
};

Axios.interceptors.request.use(config => {
    setAuthorizationHeader();
    return config;
});

export default Axios;