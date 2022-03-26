export interface AccountLoginType {
    username: string,
    password: string,
    code: string
}
interface Role {
    id: number,
    name: string,
    roleKey: string,
    status: number,
    description: string,
    createTime: string,
    updateTime: string
}

export interface AccountResultType {
    username: string
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