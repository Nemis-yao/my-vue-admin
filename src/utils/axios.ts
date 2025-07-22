import axios, { AxiosError } from "axios";
import { ElNotification } from 'element-plus'
const service = axios.create({
    baseURL: "https://www.demo.com", // 请求地址
    timeout: 5000
});

// 请求拦截器
service.interceptors.request.use((config) => {
    return config;
}, (error: AxiosError) => {
    ElNotification({
        title: 'Error',
        message: error.message,
        type: 'error',
    });
    return Promise.reject(error)
}
)

// 响应拦截器
service.interceptors.response.use((response) => {
    return response.data
}, (error: AxiosError) => {
    ElNotification({
        title: 'Error',
        message: error.message,
        type: 'error',
    });
    return Promise.reject(error)
})

export default service