import { SysResourceTree } from "../system/resource/type"
export interface AccountLoginType {
    username: string,
    password: string
}
interface Role {
    id: number,
    name: string,
    roleKey: string,
    sort: number,
    status: number,
    description: string,
}

export interface AccountResultType {
    id: number,
    username: string,
    nickName: string,
    realName: string,
    phone: string,
    status: number,
    roles: Array<Role>,
    resourceTrees: Array<SysResourceTree>
}
export interface UserInfo {
    id: number,
    username: string,
    nickName: string,
    realName: string,
    phone: string,
    password: string,
    status: number,
    createTime: string,
    updateTime: string,
    roles: Array<Role>
}

export interface CaptchaVo {
    image1: string,
    image2: string
}

export interface CaptchaResult {
    success: boolean,
    message: string
}