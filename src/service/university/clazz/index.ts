import { myRequest } from "../../index";
import { ResultType } from "../../type";
import { ClazzCreateBean, ClazzDto, ClazzQueryBean, ClazzPage } from "./type";

enum ClazzApi {
    QUERY_CLAZZ_PAGE = "/clazz/queryClazzPage",
    QUERY_CLAZZ_BY_ID = "/clazz/queryClazzById",
    CREATE_CLAZZ = "/clazz/createClazz",
    UPDATE_CLAZZ = "/clazz/updateClazz",
    DELETE_CLAZZ = "/clazz/deleteClazz"
}

export function queryClazzPage(bean: ClazzQueryBean): Promise<ResultType<ClazzPage>> {
    return myRequest.post<ResultType<ClazzPage>>({
        url: ClazzApi.QUERY_CLAZZ_PAGE,
        data: bean
    })
}

export function queryClazzById(id: number): Promise<ResultType<ClazzDto>> {
    return myRequest.get<ResultType<ClazzDto>>({
        url: `${ClazzApi.QUERY_CLAZZ_BY_ID}?id=${id}`
    })
}

export function createClazz(bean: ClazzCreateBean): Promise<ResultType<boolean>> {
    return myRequest.post<ResultType<boolean>>({
        url: ClazzApi.CREATE_CLAZZ,
        data: bean
    })
}

export function updateClazz(bean: ClazzCreateBean): Promise<ResultType<boolean>> {
    return myRequest.post<ResultType<boolean>>({
        url: ClazzApi.UPDATE_CLAZZ,
        data: bean
    })
}

export function deleteClazz(id: number): Promise<ResultType<boolean>> {
    return myRequest.delete<ResultType<boolean>>({
        url: `${ClazzApi.DELETE_CLAZZ}?id=${id}`
    })
}