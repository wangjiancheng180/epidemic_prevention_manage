import { myRequest } from "../../index";
import { ResultType } from "../../type";
import { SysResourceTree, SysResourceCreateBean, SysResource } from "./type";

enum SysResourceApi {

    QUERY_RESOURCE_TREE = '/resource/queryResourceTree',
    CREATE_RESOURCE = '/resource/createResource',
    QUERY_RESOURCE_BY_ID = '/resource/queryResourceById',
    UPDATE_RESOURCE = '/resource/updateResource',
    DELETE_RESOURCE = '/resource/deleteResource'
}

export function queryResourceTree(): Promise<ResultType<SysResourceTree>> {
    return myRequest.get<ResultType<SysResourceTree>>({
        url: SysResourceApi.QUERY_RESOURCE_TREE,
    })
}
export function createResource(createBean: SysResourceCreateBean): Promise<ResultType<number>> {
    return myRequest.post<ResultType<number>>({
        url: SysResourceApi.CREATE_RESOURCE,
        data: createBean
    })
}

export function queryResourceById(id: number): Promise<ResultType<SysResource>> {
    return myRequest.get<ResultType<SysResource>>({
        url: `${SysResourceApi.QUERY_RESOURCE_BY_ID}?id=${id}`
    })
}

export function updateResource(updateBean: SysResourceCreateBean): Promise<ResultType<boolean>> {
    return myRequest.post<ResultType<boolean>>({
        url: SysResourceApi.UPDATE_RESOURCE,
        data: updateBean
    })
}

export function deleteResource(id: number): Promise<ResultType<boolean>> {
    return myRequest.delete<ResultType<boolean>>({
        url: `${SysResourceApi.DELETE_RESOURCE}?id=${id}`
    })
}