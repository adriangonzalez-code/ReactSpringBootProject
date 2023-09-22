import axios from "axios";

const userApi = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/users`
});

userApi.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        'Authorization': sessionStorage.getItem("token")
    };

    return config;
});

export default userApi;