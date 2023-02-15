import Axios from 'axios';

Axios.defaults.baseURL = "http://drinkolo-back.test/api/"
Axios.defaults.headers.post['Content-Type'] = 'application/json';

export const setAuthorizationHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));
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