import MyRequest from "./request"
import localCache from "@/util/cache"



export const myRequest = new MyRequest({
    //给全局绑定基础的url
    baseURL: process.env.VUE_APP_BASEURL,
    //设置请求超时
    timeout: Number(process.env.VUE_APP_TIMEOUT),
    //设置拦截器
    myInterceptorManager: {
        requestInterceptor: (config) => {
            //取出存储的token
            const token = localCache.getCache("token");
            if (token) {
                //将token设置到请求头中
                config.headers!.Authorization = 'Bearer ' + token;
            }
            return config;
        },
        requestInterceptorCatch: (error) => {
            return error;
        },
        responseInterceptor: (result) => {
            return result;
        },
        responseInterceptorCatch: (error) => {
            return error;
        }
    }
})