import { myRequest } from "../../index";
import { ResultType } from "../../type";
import { SysResourceTree } from "./type";

enum SysResourceApi {

    QUERY_RESOURCE_TREE = '/resource/queryResourceTree'
}

export function queryResourceTree(): any {
    return myRequest.get<ResultType<SysResourceTree>>({
        url: SysResourceApi.QUERY_RESOURCE_TREE,
    })
}