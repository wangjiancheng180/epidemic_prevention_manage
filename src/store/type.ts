import { SysResourceTree } from "@/service/system/resource/type"
import { SysRole } from "@/service/system/role/type"
import { SystemState } from "./system/type"
import { UniversityState } from "./university/type"

//user用户类型
interface User {
    id: number,
    username: string,
    nickName: string,
    realName: string,
    sex: number,
    phone: string,
    status: number,
    roleDtos: Array<SysRole>,
    resourceTrees: Array<SysResourceTree>,
}
//根节点的state类型
export interface RootStateType {
    user: User,
    isFlush: boolean
}

//将根节点和各模块state类型结合
export interface RootWithModule extends RootStateType {
    system: SystemState
    university: UniversityState
}

export interface BaseEnetity {
    createUserId?: number,
    createUserName?: string,
    createTime?: string,
    updateUserId?: number,
    updateUserName?: string,
    updateTime?: string
}