import { CollegeDto } from "../college/type"

export interface ClazzDto {
    id: number,
    name: string,
    sort: number,
    collegeDtos: Array<CollegeDto>,
    collegeIds: Array<number>
}
export interface ClazzPage {
    records: Array<ClazzDto>,
    //总数
    total: number,
    //每页的条目数
    size: number,
    //当前页
    current: number,
    //总页数
    pages: number
}
export interface ClazzCreateBean {
    id: number,
    name: string,
    sort: number,
    collegeIds: Array<number>
}

export interface ClazzQueryBean {
    name: string,
    collegeId: number,
    page: number,
    size: number
}