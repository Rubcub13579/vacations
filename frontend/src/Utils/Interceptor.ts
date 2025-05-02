import axios, { InternalAxiosRequestConfig } from "axios";

class Interceptor {
    public create(): void {
        axios.interceptors.request.use((requestConfig: InternalAxiosRequestConfig) => {
            const token = localStorage.getItem("token");
            requestConfig.headers.Authorization = "Bearer " + token;
            return requestConfig
        });
    };

}

export const interceptor = new Interceptor();
