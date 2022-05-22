import { myRequest } from "../index";
import { AccountLoginType, AccountResultType, CaptchaResult, CaptchaVo } from "./type"
import { ResultType } from "../type";


enum AccountLogintApi {
    ACCOUNT_LOGIN = "/login",
    CAPTCHA_GET_IMAGE = "/captcha/getImage",
    VERIFY = "/captcha/verify"
}

export function login(account: AccountLoginType): any {
    return myRequest.post<ResultType<AccountResultType>>({
        url: AccountLogintApi.ACCOUNT_LOGIN,
        data: account
    })
}

export function getImage(): Promise<ResultType<CaptchaVo>> {
    return myRequest.get<ResultType<CaptchaVo>>({
        url: AccountLogintApi.CAPTCHA_GET_IMAGE
    })
}

export function verify(map: any): Promise<ResultType<CaptchaResult>> {
    return myRequest.post<ResultType<CaptchaResult>>({
        url: AccountLogintApi.VERIFY,
        data: map
    })
}
