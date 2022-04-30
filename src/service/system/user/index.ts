import { myRequest } from "../../index";
import { ResultType } from "../../type";
import { User } from './type'

enum UserApi {
    QUERy_BY_USERNAME = '/user/queryByUsername'
}

export function queryByUsername(username: string): Promise<ResultType<User>> {
    return myRequest.get<ResultType<User>>({
        url: `${UserApi.QUERy_BY_USERNAME}?username=${username}`
    })
}