import { BaseEnetity } from '@/store/type'

export interface Task extends BaseEnetity {
    id?: number,
    deviceName: string,
    name: string,
    address: string,
    lng?: string,
    lat?: string,

}

export interface CarQueryBean {
    page: number,
    size: number
    productKey?: ""
}

export interface Car extends BaseEnetity {
    id: string,
    carNumber: string,
    deviceName: string,
    productKey: string,
    deviceSecret: string,
    type: string,
    accessNetwork: number
}
export interface CarPage {
    records: Array<Car>,
    //总数
    total: number,
    //每页的条目数
    size: number,
    //当前页
    current: number,
    //总页数
    pages: number
}