import { SystemState } from "./system/type"

//根节点的state类型
export interface RootStateType {
    departementList?: any[]
}

//将根节点和各模块state类型结合
export interface RootWithModule extends RootStateType {
    system: SystemState
}