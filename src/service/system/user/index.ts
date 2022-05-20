
import { myRequest } from "../../index";
import { ResultType } from "../../type";
import { User, UserInfoCreateBean } from './type'

enum UserApi {
    QUERY_BY_USERNAME = '/user/queryByUsername',
    QUERY_USERINFO = '/user/queryUserInfo',
    CREATE_USERINFO = '/user/createUserInfo',
    UPDATE_USERINFO = '/user/updateUserInfo',
    DELETE_USERINFO = '/user/deleteUserInfo',
    QUERY_USER_BY_ID = 'user/queryUserById'
}

export function queryByUsername(username: string): Promise<ResultType<User>> {
    return myRequest.get<ResultType<User>>({
        url: `${UserApi.QUERY_BY_USERNAME}?username=${username}`
    })
}

export function queryUserInfo(): Promise<ResultType<Array<User>>> {
    return myRequest.get<ResultType<Array<User>>>({
        url: UserApi.QUERY_USERINFO
    })
}

export function createUserInfo(bean: UserInfoCreateBean): Promise<ResultType<boolean>> {
    return myRequest.post<ResultType<boolean>>({
        url: UserApi.CREATE_USERINFO,
        data: bean
    })
}

export function updateUserInfo(bean: UserInfoCreateBean): Promise<ResultType<boolean>> {
    return myRequest.post<ResultType<boolean>>({
        url: UserApi.UPDATE_USERINFO,
        data: bean
    })
}

export function deleteUserInfo(id: number): Promise<ResultType<boolean>> {
    return myRequest.delete<ResultType<boolean>>({
        url: `${UserApi.DELETE_USERINFO}?id=${id}`
    })
}

export function queryUserById(id: number): Promise<ResultType<User>> {
    return myRequest.get<ResultType<User>>({
        url: `${UserApi.QUERY_USER_BY_ID}?id=${id}`
    })
}