import MyRequest from "./request"
import localCache from "@/util/cache"
import { ElMessage } from 'element-plus'


export const myRequest = new MyRequest({
    //给全局绑定基础的url
    baseURL: process.env.VUE_APP_BASEURL,
    //设置请求超时
    timeout: Number(process.env.VUE_APP_TIMEOUT),
    //允许带上cookie
    withCredentials: true,
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

            //处理权限不足
            if (result.data.code === 5) {
                ElMessage.error("权限不足！")
            }
            return result;
        },
        responseInterceptorCatch: (error) => {
            return error;
        }
    }
})

export const excelRequest = new MyRequest({
    //给全局绑定基础的url
    baseURL: process.env.VUE_APP_BASEURL,
    //设置请求超时
    timeout: Number(process.env.VUE_APP_TIMEOUT),
    isShowLoading: false,
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
        responseInterceptor: (response) => {
            const disposition = response.headers['content-disposition'];
            //以下部分有需要优化，如后端返回时没有携带文件后缀名,没有.时会有问题等等
            const filename = disposition ? disposition.substring(disposition.indexOf("=") + 1, disposition.indexOf('.')) : "下载文件";
            //转换文件名
            const newName = decodeURIComponent(filename)
            //截取文件格式
            const extName = disposition.substring(disposition.indexOf('.') + 1)

            //lob 对象表示一个不可变、原始数据的类文件对象。它的数据可以按文本或二进制的格式进行读取，也可以转换成 ReadableStream 来用于数据操作。 
            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            //创建一个a标签元素
            const link = document.createElement("a");
            //创建一个事件
            // const evt = document.createEvent("HTMLEvents");
            // evt.initC
            //给a标签绑定href属性指向文件下载地址
            //URL.createObjectURL() 静态方法会创建一个 DOMString，其中包含一个表示参数中给出的对象的URL。
            //这个 URL 的生命周期和创建它的窗口中的 document 绑定。这个新的URL 对象表示指定的 File 对象或 Blob 对象。
            link.href = URL.createObjectURL(blob);
            //
            link.download = newName + "." + extName;
            link.style.display = "none";
            //加到body标签中
            document.body.appendChild(link);
            link.click();
            //URL.revokeObjectURL() 静态方法用来释放一个之前已经存在的、通过调用 URL.createObjectURL() 创建的 URL 对象。
            //当你结束使用某个 URL 对象之后，应该通过调用这个方法来让浏览器知道不用在内存中继续保留对这个文件的引用了。
            window.URL.revokeObjectURL(link.href);
            return response
        },
        responseInterceptorCatch: (error) => {
            return error;
        }
    }
})