import { BaseType } from '@/service/type'
import { SysResourceTree, SysResource } from '../resource/type'
export interface Role extends BaseType {
    id: number,
    name: string,
    rolekey: string,
    status: number,
    description?: string
}

export interface SysRoleCreateBean {
    name: string,
    roleKey: string,
    status: number,
    sort: number,
    description?: string,
    resourceIds?: Array<number> //这个用来给后台发送绑定角色的资源id  
}

export interface SysRole {
    id: number,
    name: string,
    roleKey: string,
    status: number,
    sort: number,
    description?: string,
    resourceMoelIds: [],
    resourceTrees: Array<SysResourceTree>,
    resourceList: Array<SysResource>
}