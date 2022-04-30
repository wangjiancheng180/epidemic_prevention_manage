export const tableTypes = [
    { prop: 'name', label: "名称", width: "250" },
    { prop: 'address', label: '地址', width: "250" },
    { prop: 'telephone', label: '联系电话', width: '150' },
    { prop: 'level', label: '层级', width: '100', align: "center" },
    // { prop: 'createUserId', label: '创建人ID', width: '80', align: "center" },
    { prop: 'createUserName', label: '创建人姓名', width: '100', align: "center" },
    // { prop: 'updateUserId', label: '更新人ID', width: '80', align: "center" },
    { prop: 'updateUserName', label: '更新人姓名', width: '100', align: "center" },
    { prop: 'createTime', label: '创建时间', width: '180' },
    { prop: 'updateTime', label: '更新时间', width: '180' }
]

export const formTypes = [
    { label: "名称", prop: "name", field: 'name' },
    { label: "地址", prop: "address", field: 'address' },
    { label: "联系电话", prop: "telephone", field: 'telephone' },
    { label: "父级资源", isSlot: true, field: 'parentIds' },
    { label: "层级", prop: "level", field: 'level', disabled: true },
    { label: "排序", prop: "sort", field: 'sort' }
]