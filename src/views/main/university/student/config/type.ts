export const tableTypes = [
    { prop: 'studentNo', label: '学号', width: '150', align: "center" },
    { prop: 'name', label: "姓名", width: "150", align: "center" },
    { prop: 'collegeDtos', label: '所属院校', width: '350', isSlot: true, align: "center" },
    { prop: 'clazzDto', label: '所在班级', width: '150', isSlot: true, align: "center" },
    { prop: 'healthCode', label: '健康码', width: '150', isSlot: true, align: "center" },
    { prop: 'vaccination', label: '疫苗接种记录', width: '150', isSlot: true, align: "center" },
    { prop: 'traveCard', label: '行程码', width: '150', isSlot: true, align: "center" },
    { prop: 'vaccinationTimes', label: '疫苗接种情况', width: "150", isSlot: true, align: "center" },
    { prop: 'sex', label: '性别', width: '80', isSlot: true, align: "center" },
    { prop: 'age', label: '年龄', width: '80', align: "center" },

    { prop: 'temporaryHome', label: '现居地', width: '250', align: "center" },
    { prop: 'hometown', label: '家乡', width: '150', align: "center" },
    { prop: 'entrance', label: '入学日期', width: '180', align: "center" },
    { prop: 'birthday', label: '出生日期', width: '180', align: "center" },
    // { prop: 'telephone', label: '联系电话', width: '150' },
    // { prop: 'level', label: '层级', width: '100', align: "center" },
    // { prop: 'createUserId', label: '创建人ID', width: '80', align: "center" },
    { prop: 'createUserName', label: '创建人姓名', width: '150', align: "center" },
    { prop: 'createTime', label: '创建时间', width: '180', align: "center" },
    // { prop: 'updateUserId', label: '更新人ID', width: '80', align: "center" },
    { prop: 'updateUserName', label: '更新人姓名', width: '150', align: "center" },
    { prop: 'updateTime', label: '更新时间', width: '180', align: "center" }
]

export const formTypes = [
    { label: "学号", prop: "studentNo", field: 'studentNo' },
    { label: "名称", prop: "name", field: 'name' },
    { label: "性别", isSlot: true, field: 'sex' },
    { label: "所属院校", isSlot: true, field: 'collegeIds' },
    { label: "所在班级", isSlot: true, field: 'clazzId' },
    { label: "疫苗接种", isSlot: true, field: 'vaccinationTimes' },
    { label: "现居地址", prop: "temporaryHome", field: 'temporaryHome' },
    { label: "家乡", prop: "hometown", field: 'hometown' },
    { label: "入学日期", isSlot: true, field: 'entrance' },
    { label: "出生日期", isSlot: true, field: 'birthday' }
]

export const queryFormTypes = [
    { label: "学号", prop: "studentNo", field: "studentNo" },
    { label: "姓名", prop: "name", field: "name" },
    { label: "性别", isSlot: true, field: 'sex' },
    { label: "疫苗接种", isSlot: true, field: 'vaccinationTimes' },
    { label: "所属院校", isSlot: true, field: 'collegeIds' },
    { label: "所在班级", isSlot: true, field: 'clazzId' }
]