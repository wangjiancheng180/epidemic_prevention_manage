import { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface MyInterceptorManager<T> {
    requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
    requestInterceptorCatch?: (error: any) => any;
    responseInterceptor?: (respone: T) => T;
    responseInterceptorCatch?: (error: any) => any;

}

//这里默认返回的Respone就是axios的Resone,可以自我定制
export interface MyRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
    myInterceptorManager?: MyInterceptorManager<T>;
    isShowLoading?: boolean;

}
