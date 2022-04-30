
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

export interface Page {
    //总数
    total: number,
    //每页的条目数
    size: number,
    //当前页
    current: number,
    //总页数
    pages: number
}