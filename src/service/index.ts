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
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                config.headers!.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        requestInterceptorCatch: (error) => {
            return error;
        },
        responseInterceptor: (result) => {
            //把响应结果的请求头里的token拿到
            const token = result.headers.Authorization ?? result.headers.authorization;
            if (token) {
                // console.log('token==' + token)
                //将token缓存
                localCache.setCache("token", token);
            }
            return result;
        },
        responseInterceptorCatch: (error) => {
            return error;
        }
    }
})