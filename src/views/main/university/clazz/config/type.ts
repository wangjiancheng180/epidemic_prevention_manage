export const tableTypes = [
    { prop: 'name', label: "名称", width: "250" },
    // { prop: 'address', label: '地址', width: "250" },
    // { prop: 'telephone', label: '联系电话', width: '150' },
    // { prop: 'level', label: '层级', width: '100', align: "center" },
    { prop: 'collegeDtos', label: "所属院校", width: "450", isSlot: true },
    // { prop: 'createUserId', label: '创建人ID', width: '80', align: "center" },
    { prop: 'createUserName', label: '创建人姓名', width: '150', align: "center" },
    { prop: 'createTime', label: '创建时间', width: '180' },
    // { prop: 'updateUserId', label: '更新人ID', width: '80', align: "center" },
    { prop: 'updateUserName', label: '更新人姓名', width: '150', align: "center" },
    { prop: 'updateTime', label: '更新时间', width: '180' }
]

export const formTypes = [
    { label: "名称", prop: "name", field: 'name' },
    { label: "所属院校", isSlot: true, field: 'collegeIds' },
    { label: "排序", prop: "sort", field: 'sort' }
]

export const queryFormTypes = [
    { label: "名称", prop: "name", field: "name" },
    { label: "所属院校", isSlot: true, field: 'collegeIds' }
]