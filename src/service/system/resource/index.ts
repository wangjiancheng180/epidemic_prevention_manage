import { myRequest } from "../../index";
import { ResultType } from "../../type";
import { SysResourceTree, SysResourceCreateBean } from "./type";

enum SysResourceApi {

    QUERY_RESOURCE_TREE = '/resource/queryResourceTree',
    CREATE_RESOURCE = '/resource/createResource'
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