//用来配置表格的每一列
export const tableTypes = [
    { prop: 'name', label: "名称", width: "150" },
    { prop: 'sourceKey', label: 'key值', width: "150" },
    { prop: 'sourceUrl', label: '路径', width: '180' },
    { prop: 'level', label: '层级', width: '100', align: "center" },
    { prop: 'createUserId', label: '创建人ID', width: '100', align: "center" },
    { prop: 'createUserName', label: '创建人姓名', width: '180', align: "center" },
    { prop: 'updateUserId', label: '更新人ID', width: '100', align: "center" },
    { prop: 'updateUserName', label: '更新人姓名', width: '180', align: "center" },
    { prop: 'createTime', label: '创建时间', width: '180' },
    { prop: 'updateTime', label: '更新时间', width: '180' }

]

export const formTypes = [
    { label: "名称", prop: "name", field: 'name' },
    { label: "key值", prop: "sourceKey", field: 'sourceKey' },
    { label: "资源路径", prop: "sourceUrl", field: 'sourceUrl' },
    { label: "父级资源", isSlot: true, field: 'parentIds' },
    { label: "层级", prop: "level", field: 'level', disabled: true },
    { label: "排序", prop: "sort", field: 'sort' }
]

