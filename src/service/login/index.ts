import { myRequest } from "../index";
import { AccountLoginType, AccountResultType } from "./type"
import { ResultType } from "../type";
import localCache from "@/util/cache"

enum AccountLogintApi {
    ACCOUNT_LOGIN = "/login"
}

export function login(account: AccountLoginType): any {
    return myRequest.post<ResultType<AccountResultType>>({
        url: AccountLogintApi.ACCOUNT_LOGIN + '?username=' + account.username + '&password=' + account.password,
        // myInterceptorManager: {
        //     responseInterceptor: (result) => {
        //         //把响应结果的请求头里的token拿到
        //         const token = result.headers?.Authorization;
        //         console.log('token==' + token)
        //         //将token缓存
        //         localCache.setCache("token", token);
        //         return result;
        //     }
        // }
    })
}