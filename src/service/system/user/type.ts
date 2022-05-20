import { SysResourceTree } from "../resource/type";
import { SysRole } from "../role/type";

export interface User {
    id: number,
    username: string,
    nickName: string,
    realName: string,
    sex: string,
    phone: string,
    status: number,
    roleDtos: Array<SysRole>,
    resourceTrees: Array<SysResourceTree>,
    roleIds: Array<number>
}

export interface UserInfoCreateBean {
    id: number | null,
    username: string,
    nickName: string,
    realName: string,
    sex: string,
    phone: string,
    status: number,
    roleIds: Array<number>
}