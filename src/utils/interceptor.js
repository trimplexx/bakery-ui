import axios from 'axios'
import {connectionUrlString} from "./props";
const axiosInstance = axios.create({
    baseURL: connectionUrlString,
});

// Request interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        // Modify the response data here (e.g., parse, transform)

        return response;
    },
    async (error) => {
        const token = localStorage.getItem('token');
        const refreshToken = localStorage.getItem('refreshToken');
        if(token !== null)
        {
            // Handle response errors here
            if (error.response && error.response.status >= 400) {
                try {
                    const refreshResponse = await axiosInstance.post('api/Auth/refresh', {
                        Token: token,
                        refreshToken: refreshToken,
                    });
                    localStorage.setItem('token', refreshResponse.data.token);
                    localStorage.setItem('refreshToken', refreshResponse.data.refreshToken);
                } catch (refreshError) {
                    return Promise.reject(refreshError);
                }
            }
            return Promise.reject(error);
        }
    }
);

export default axiosInstance;