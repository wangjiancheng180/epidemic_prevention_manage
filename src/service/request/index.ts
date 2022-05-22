import { MyRequestConfig } from "./type"
import axios, { AxiosInstance } from "axios"
import { ElLoading } from 'element-plus'

const SHOW_LOADING = true;

class MyRequest {

    //axios对象主要配置对象
    instance: AxiosInstance;

    //是否显示加载信息，默认显示
    isShowLoading: boolean = SHOW_LOADING;

    //加载信息的实例
    loadingInstance: any;

    constructor(config: MyRequestConfig) {
        //创建axios实例
        this.instance = axios.create(config);

        //加载信息初始化
        this.isShowLoading = config.isShowLoading ?? SHOW_LOADING;

        //将自定义的配置拦截器实例化
        this.instance.interceptors.request.use(
            config.myInterceptorManager?.requestInterceptor,
            config.myInterceptorManager?.requestInterceptorCatch
        );
        this.instance.interceptors.response.use(
            config.myInterceptorManager?.responseInterceptor,
            config.myInterceptorManager?.responseInterceptorCatch
        )

        //实现全局的拦截器配置
        this.instance.interceptors.request.use(
            (config) => {
                if (this.isShowLoading) {
                    this.loadingInstance = ElLoading.service(
                        {
                            text: "信息加载中,请稍后...",
                            background: "rgba(0,0,0,.6)"
                        }
                    )
                }
                return config;
            },
            (error: any) => {
                return error;
            }


        )

        this.instance.interceptors.response.use(
            (result) => {
                //这里将显示的信息加载关闭
                this.loadingInstance?.close();
                //将得到的响应返回(这里返回data就可以和我们自定义的结果接口对应了)
                return result.data;
            },
            (error: any) => {
                return error;
            }
        )

    }

    request<T>(config: MyRequestConfig<T>): Promise<T> {
        //判断是否设置了请求拦截器
        if (config.myInterceptorManager?.requestInterceptor) {

            //如果设置了拦截器将是否显示信息加载与请求配置同步
            this.isShowLoading = config.isShowLoading ?? SHOW_LOADING;
            //将请求配置交给请求拦截器
            config = config.myInterceptorManager.requestInterceptor(config);
        }

        return this.instance.request<any, T>(config).then((res) => {
            //判断是否设置了响应拦截器
            if (config.myInterceptorManager?.responseInterceptor) {
                //将响应交给响应拦截器
                res = config.myInterceptorManager.responseInterceptor(res);
            }
            // console.log(res)
            //这里需要将是否显示加载信息重置
            this.isShowLoading = SHOW_LOADING;
            //成功返回响应

            return res;

        }).catch((error) => {
            //这里需要将是否显示加载信息重置
            this.isShowLoading = SHOW_LOADING;
            //返回异常
            return error;
        })
    }
    //get请求
    get<T>(config: MyRequestConfig<T>): Promise<T> {
        return this.request<T>({
            ...config,
            method: 'GET'
        })
    }
    //Post请求
    post<T>(config: MyRequestConfig<T>): Promise<T> {
        return this.request<T>({
            ...config,
            method: 'POST'
        })
    }

    //Delete请求
    delete<T>(config: MyRequestConfig<T>): Promise<T> {
        return this.request<T>({
            ...config,
            method: 'DELETE'
        })
    }



}

export default MyRequest