
export interface ResultType<T> {
    code?: number,
    messsage?: string,
    data?: T,
}

export interface BaseType {
    createUserId?: number,
    createUserName?: string,
    createTime?: string,
    updateUserId?: number,
    updateUserName?: string,
    updateTime?: string
}