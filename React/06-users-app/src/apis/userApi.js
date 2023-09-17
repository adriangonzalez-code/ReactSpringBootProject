import axios from "axios";

const userApi = axios.create({
    baseURL: 'http://localhost:9000/users'
});

userApi.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        'Authorization': sessionStorage.getItem("token")
    };

    return config;
});

export default userApi;