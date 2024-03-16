import axios from 'axios'
import {connectionUrlString} from "./props";

const axiosInstance = axios.create({
    baseURL: connectionUrlString,
});

// Request interceptor
axiosInstance.interceptors.response.use((response) => {
    return response;
}, async (error) => {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');

    if (error.response && error.response.status === 401) {
        try {
            const refreshResponse = await axiosInstance.post('api/Auth/refresh', {
                Token: token, refreshToken: refreshToken,
            });
            //  Aktualizacja tokenów jeżeli wszystko gra
            localStorage.setItem('token', refreshResponse.data.token);
            localStorage.setItem('refreshToken', refreshResponse.data.refreshToken);
            // Ponów oryginalne zapytanie z nowym tokenem
            error.config.headers.token = refreshResponse.data.token;
            return axiosInstance.request(error.config);
        } catch (refreshError) {
            // Przekierowanie do strony logowania
            window.location.href = '/logout';
            return Promise.reject(refreshError);
        }
    }
    return Promise.reject(error);
});

export default axiosInstance;
