import { BaseType } from '@/service/type'


export interface SysResourceTree extends BaseType {
    id: number,
    level: number,
    name: string,
    sort: number,
    sourceKey: string,
    sourceUrl?: string,
    children: SysResourceTree[],

}

export interface SysResourceCreateBean {
    name: string,
    parentId: number,
    sourceKey: string,
    sourceUrl: string,
    level: number,
    sort: number,
}


export interface SysResource extends BaseType {
    id: number,
    level: number,
    name: string,
    sort: number,
    sourceKey: string,
    sourceUrl?: string,
    parentIds?: Array<number>
}