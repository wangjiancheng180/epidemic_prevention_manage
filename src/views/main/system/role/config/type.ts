export const tableTypes = [
    { prop: 'name', label: "名称", width: "150" },
    { prop: 'roleKey', label: 'key值', width: "150" },
    { prop: 'status', label: '状态', width: '150', align: "center" },
    { prop: 'createUserId', label: '创建人ID', width: '100', align: "center" },
    { prop: 'createUserName', label: '创建人姓名', width: '180', align: "center" },
    { prop: 'createTime', label: '创建时间', width: '180' },
    { prop: 'updateUserId', label: '更新人ID', width: '100', align: "center" },
    { prop: 'updateUserName', label: '更新人姓名', width: '180', align: "center" },
    { prop: 'updateTime', label: '更新时间', width: '180' }

]

export const formItemTypes = [
    { label: "名称", prop: "name", field: "name" },
    { label: "key值", prop: "roleKey", field: "roleKey" },
    { label: "状态", prop: "status", field: "status", isSlot: true },
    { label: "排序", prop: "sort", field: "sort" },
    { label: "描述", prop: "description", field: "description", type: "textarea" },
    { label: "资源权限", prop: "resources", field: "resources", isSlot: true }

]