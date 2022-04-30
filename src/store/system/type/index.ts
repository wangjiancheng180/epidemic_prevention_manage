import { BaseEnetity } from '@/store/type'

//系统管理的state
//资源的form表单类型
interface ResourceFormData {
    id?: number,
    name: string,
    parentId: number,
    sourceKey: string,
    sourceUrl: string,
    level: number,
    sort: number,
    type: number,
    icon: string,
    parentIds?: Array<number>
}

//资源树tableData类型
interface ResourceTree extends BaseEnetity {
    id: number,
    name: string,
    parentId: number,
    sourceKey: string,
    sourceUrl: string,
    level: number,
    sort: number,
    children: ResourceTree,

}

//角色tableData类型
interface Role extends BaseEnetity {
    id: number,
    name: string,
    rolekey: string,
    status: number,
    description?: string
}

//角色表单类型
interface RoleFormData {
    id: number,
    name: string,
    roleKey: string,
    status: number,
    sort: number,
    resourceModelIds?: Array<Array<number>>, //这个用来和cascader选择器绑定数据
    description?: string,
    resourceIds?: Array<number | undefined> //这个用来给后台发送绑定角色的资源id  
}
export interface SystemState {
    resourceTree: Array<ResourceTree>,
    resourceFormData: ResourceFormData,
    roleList: Array<Role>,
    roleFormData: RoleFormData
}