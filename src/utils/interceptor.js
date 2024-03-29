import axios from 'axios'
import {connectionUrlString} from "./props";

const axiosInstance = axios.create({
    baseURL: connectionUrlString,
});
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

axiosInstance.interceptors.response.use((response) => {
    return response;
}, async (error) => {
    const originalRequest = error.config;
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        if (!isRefreshing) {
            isRefreshing = true;
            axiosInstance.post('api/Auth/refresh', {
                Token: token, refreshToken: refreshToken,
            }).then(({data}) => {
                isRefreshing = false;
                localStorage.setItem('token', data.token);
                localStorage.setItem('refreshToken', data.refreshToken);
                processQueue(null, data.token);
            }).catch((refreshError) => {
                processQueue(refreshError, null);
                window.location.href = '/logout';
                return Promise.reject(refreshError);
            });
        }
        return new Promise(function(resolve, reject) {
            failedQueue.push({resolve, reject});
        }).then(token => {
            originalRequest.headers.token = token;
            return axiosInstance.request(originalRequest);
        }).catch(Promise.reject);
    }
    return Promise.reject(error);
});



export default axiosInstance;
