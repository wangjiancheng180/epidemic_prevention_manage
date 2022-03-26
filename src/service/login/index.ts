import { myRequest } from "../index";
import { AccountLoginType, AccountResultType } from "./type"
import { ResultType } from "../type";


enum AccountLogintApi {
    ACCOUNT_LOGIN = "/login"
}

export function login(account: AccountLoginType): any {
    return myRequest.post<ResultType<AccountResultType>>({
        url: AccountLogintApi.ACCOUNT_LOGIN + '?username=' + account.username + '&password=' + account.password,

    })
}