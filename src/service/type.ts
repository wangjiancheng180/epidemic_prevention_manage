
export interface ResultType<T> {
    code?: number,
    message?: string,
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