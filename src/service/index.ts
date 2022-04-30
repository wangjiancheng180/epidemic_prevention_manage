import MyRequest from "./request"
import localCache from "@/util/cache"
import { ElMessage } from 'element-plus'


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
            //这里还要处理token过期的问题
            if (result.data.code === 4) {
                //4是代表token解析异常,将缓存在本地的token删除
                localCache.clearCache()
                ElMessage.error("登录过期,请重新登录！")
            }
            return result;
        },
        responseInterceptorCatch: (error) => {
            return error;
        }
    }
})