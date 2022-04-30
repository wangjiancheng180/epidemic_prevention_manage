
import { BaseEnetity } from '@/store/type'

export interface CollegeTree extends BaseEnetity {
    id: number,
    name: string,
    /**
     * 学院地址
     */
    address: string,
    /**
     * 联系号码
     */
    telephone: string,

    /**
     * 学院层级（1级学院。二级学院）
     */
    level: number,
    /**
     * 排序
     */

    sort: number,
    /*
    *子节点
    */
    children: Array<CollegeTree>,

    clazzes: Array<Clazz>
}

interface Clazz {
    id: number,
    name: string,
    sort: number
}

export interface CollegeDto {
    id?: number,
    parentId: number,
    parentIds?: Array<number>
    name: string,
    address: string,
    telephone: string,
    level: number,
    sort: number
}

export interface CollegeCreateBean {
    id?: number,
    parentId: number,
    name: string,
    address: string,
    telephone: string,
    level: number,
    sort: number
}