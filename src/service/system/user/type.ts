import { SysResourceTree } from "../resource/type";
import { SysRole } from "../role/type";

export interface User {
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