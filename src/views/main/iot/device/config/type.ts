export const tableTypes = [
    { prop: 'carNumber', label: "车牌号", width: "150", align: "center" },
    // { prop: 'address', label: '地址', width: "250" },
    // { prop: 'telephone', label: '联系电话', width: '150' },
    // { prop: 'level', label: '层级', width: '100', align: "center" },
    { prop: 'deviceName', label: "设备名称", width: "150", align: "center" },
    { prop: 'productKey', label: "产品Key", width: "150", align: "center" },
    { prop: 'deviceSecret', label: "设备密钥", width: "300", align: "center" },
    { prop: 'type', label: "车辆型号", width: "100", align: "center" },
    { prop: 'accessNetwork', label: "是否入网", width: "150", align: "center", isSlot: true },
    { prop: 'disabled', label: "启用/禁用", width: "150", align: "center", isSlot: true },
    // { prop: 'createUserId', label: '创建人ID', width: '80', align: "center" },
    { prop: 'createUserName', label: '创建人姓名', width: '150', align: "center" },
    { prop: 'createTime', label: '创建时间', width: '180' },
    // { prop: 'updateUserId', label: '更新人ID', width: '80', align: "center" },
    { prop: 'updateUserName', label: '更新人姓名', width: '150', align: "center" },
    { prop: 'updateTime', label: '更新时间', width: '180' }
]

export const formTypes = [
    { label: "车牌号", prop: "carNumber", field: 'carNumber' },
    { label: "是否入网", isSlot: true, field: 'accessNetwork' },
    { label: "产品", isSlot: true, field: 'productKey' },
    { label: "设备名称", prop: "deviceName", field: 'deviceName' },
    { label: "启用/禁用", isSlot: true, field: 'disabled' },
    { label: "型号", prop: "type", field: 'type' },
]

export const queryFormTypes = [
    { label: "车牌号", prop: "carNumber", field: "carNumber" },
    { label: "设备名称", prop: "deviceName", field: "deviceName" },
    // { label: "车辆型号", prop: "type", field: "type" },
    { label: "启用/禁用", isSlot: true, field: 'disabled' },
    { label: "是否入网", isSlot: true, field: 'accessNetwork' },
    // { label: "产品key", prop: "productKey", filed: "productKey" }
]

export const rules = {
    carNumber: [
        {
            required: true,
            message: "车牌号不能为空~",
            trigger: "blur"
        },
        {
            pattern: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/,
            message: "车牌格式错误",
            trigger: "blur"
        }
    ],
    deviceName: [
        {
            required: true,
            message: "设备名称不能为空~",
            trigger: "blur"
        },
        {
            pattern: /^\w{4,32}/,
            message: '支持数字英文下划线长度4~32',
            tigger: 'blur'
        }
    ]
}