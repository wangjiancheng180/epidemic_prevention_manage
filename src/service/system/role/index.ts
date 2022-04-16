
import { myRequest } from "../../index";
import { ResultType } from "../../type";
import { Role, SysRoleCreateBean, SysRole } from './type'

enum RoleApi {
    QUERY_ROLELIST = '/role/queryRoleList',
    CREATE_ROLE = '/role/createRole',
    QUERY_ROLE_BY_ID = '/role/queryRoleById',
    UPDATE_ROLE = 'role/updateRole',
    DELETE_ROLE = 'role/deleteRole'
}

export function queryRoleList(): Promise<ResultType<Array<Role>>> {
    return myRequest.get<ResultType<Array<Role>>>({
        url: RoleApi.QUERY_ROLELIST
    })
}
export function createRole(bean: SysRoleCreateBean): Promise<ResultType<number>> {
    return myRequest.post<ResultType<number>>({
        url: RoleApi.CREATE_ROLE,
        data: bean
    })
}

export function queryRoleById(id: number): Promise<ResultType<SysRole>> {
    return myRequest.get<ResultType<SysRole>>({
        url: `${RoleApi.QUERY_ROLE_BY_ID}?id=${id}`
    })
}

export function updateRole(bean: SysRoleCreateBean): Promise<ResultType<boolean>> {
    return myRequest.post<ResultType<boolean>>({
        url: RoleApi.UPDATE_ROLE,
        data: bean
    })
}

export function deleteRole(id: number): Promise<ResultType<boolean>> {
    return myRequest.delete<ResultType<boolean>>({
        url: `${RoleApi.DELETE_ROLE}?id=${id}`
    })
}