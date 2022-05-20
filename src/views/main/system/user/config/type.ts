//用来配置表格的每一列
export const tableTypes = [
    { prop: 'username', label: '用户名', width: '150', align: "center" },
    { prop: 'realName', label: '真实姓名', width: '150', align: "center" },
    { prop: 'nickName', label: '昵称', width: '150', align: "center" },
    { prop: 'roleDtos', label: '角色', width: '150', align: 'center', isSlot: true },
    { prop: 'sex', label: '性别', width: '150', align: 'center', isSlot: true },
    { prop: 'phone', label: '手机号', width: '150', align: 'center' },
    { prop: 'status', label: '状态', width: '150', align: 'center', isSlot: true },
    // { prop: 'createUserId', label: '创建人ID', width: '100', align: "center" },
    { prop: 'createUserName', label: '创建人姓名', width: '180', align: "center" },
    { prop: 'createTime', label: '创建时间', width: '180' },
    // { prop: 'updateUserId', label: '更新人ID', width: '100', align: "center" },
    { prop: 'updateUserName', label: '更新人姓名', width: '180', align: "center" },
    { prop: 'updateTime', label: '更新时间', width: '180' }

]

export const formItemTypes = [
    { label: "用户名", prop: "username", field: "username" },
    { label: "真实姓名", prop: "realName", field: "realName" },
    { label: "昵称", prop: "nickName", field: "nickName" },
    { label: "性别", prop: "sex", field: "sex", isSlot: true },
    { label: "密码", prop: "password", field: "password", type: 'password' },
    { label: "手机号", prop: "phone", field: "phone" },
    { label: "状态", prop: "status", field: "status", isSlot: true },
    { label: "角色", prop: "roleIds", field: "roleIds", isSlot: true },
]

