import { BaseType } from '@/service/type'


export interface SysResourceTree extends BaseType {
    id: number,
    level: number,
    name: string,
    sourceKey: string,
    sourceUrl?: string,
    children: SysResourceTree[],

}