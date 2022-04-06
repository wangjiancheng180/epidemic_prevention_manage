//系统管理的state
interface ResourceFormData {
    name: string,
    parentId: number,
    sourceKey: string,
    sourceUrl: string,
    level: number,
    sort: number,
}
export interface SystemState {
    resourceTree: any[]
    resourceFormData: ResourceFormData
}