import Axios from 'axios';

Axios.defaults.baseURL = process.env.VUE_APP_API_URL;
Axios.defaults.headers.post['Content-Type'] = 'application/json';

export const setAuthorizationHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        Axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
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