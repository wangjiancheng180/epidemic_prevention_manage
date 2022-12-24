import { Module } from "vuex"
import { UniversityState } from "./type"
import { RootStateType } from "../type"
import { queryCollegeTree, queryCollegeById } from "@/service/university/college"
import { queryClazzById, queryClazzPage } from "@/service/university/clazz"
import { queryStudentById, queryStudentPage } from "@/service/university/student"
import { queryCarPage, queryById } from "@/service/iot/device"
const universityModule: Module<UniversityState, RootStateType> = {
    namespaced: true,
    state: () => ({
        collegeTrees: [],
        collegeFormData: {
            id: 0,
            parentId: 0,
            parentIds: [],
            name: '',
            address: '',
            telephone: '',
            level: 1,
            sort: 1,
        },
        clazzList: [],
        clazzFormData: {
            id: 0,
            name: '',
            sort: 1,
            collegeIds: []
        },
        studentList: [],
        studentFormData: {
            id: 0,
            studentNo: '',
            name: '',
            sex: '',
            age: 0,
            vaccinationTimes: null,
            temporaryHome: '',
            //家乡
            hometown: '',
            //学生端用来登录
            account: '',
            //登录用的密码
            password: '',
            //入学日期
            entrance: '',
            //出生日期
            birthday: '',
            //关联班级
            clazzId: null
        },
        deviceList: [],
        deviceFormData: {
            id: "",
            carNumber: "",
            deviceName: "",
            productKey: "",
            deviceSecret: "",
            type: "",
            accessNetwork: 2,
            disabled: 1
        }
    }),
    mutations: {
        changeCollegeTrees(state, payload) {
            state.collegeTrees = payload
        },
        chagneCollgeFormData(state, payload) {
            state.collegeFormData = { ...payload }
        },
        clearCollegeFormData(state) {
            state.collegeFormData = {
                ...{
                    id: 0,
                    parentId: 0,
                    parentIds: [],
                    name: '',
                    address: '',
                    telephone: '',
                    level: 1,
                    sort: 1,
                }
            }
        },
        changeClazzList(state, payload) {
            state.clazzList = payload
        },
        changeClazzFormData(state, payload) {
            state.clazzFormData = { ...payload }
        },
        clearClazzFormData(state) {
            state.clazzFormData = {
                ... {
                    id: 0,
                    name: '',
                    sort: 1,
                    collegeIds: []
                }
            }
        },
        changeStudentList(state, payload) {
            state.studentList = payload
        },
        changeStudentFormData(state, payload) {
            state.studentFormData = { ...payload }
        },
        clearStudentFormData(state) {
            state.studentFormData =
            {
                id: 0,
                studentNo: '',
                name: '',
                sex: '',
                age: 0,
                vaccinationTimes: null,
                temporaryHome: '',
                hometown: '',
                account: '',
                password: '',
                entrance: '',
                birthday: '',
                clazzId: null
            }

        },
        changeDeviceList(state, payload) {
            state.deviceList = payload
        },
        changeDeviceFormData(state, payload) {
            state.deviceFormData = { ...payload }
        },
        clearDeviceFormData(state) {
            state.deviceFormData = {
                id: "",
                carNumber: "",
                deviceName: "",
                productKey: "",
                deviceSecret: "",
                type: "",
                accessNetwork: 2,
                disabled: 1
            }
        }

    },
    actions: {
        async changeTableData(context, payload) {
            switch (payload.dataName) {
                case 'collegeTrees': {
                    const result = await queryCollegeTree();
                    context.commit("changeCollegeTrees", result.data);
                    break;
                }
                case 'clazzList': {
                    const result = await queryClazzPage(payload.queryBean);
                    payload.pageInfo.total = result.data?.total;
                    context.commit("changeClazzList", result.data?.records);
                    break;
                }
                case 'studentList': {
                    const result = await queryStudentPage(payload.queryBean);
                    payload.pageInfo.total = result.data?.total;
                    context.commit('changeStudentList', result.data?.records)
                    break;
                }
                case 'deviceList': {
                    const result = await queryCarPage(payload.queryBean);
                    payload.pageInfo.total = result.data?.total;
                    context.commit("changeDeviceList", result.data?.records);
                    break;
                }
            }
        },

        async changeFormData(context, payload) {
            switch (payload.source) {
                case 'college': {
                    const result = await queryCollegeById(payload.id);
                    context.commit("chagneCollgeFormData", result.data);
                    break;
                }
                case 'clazz': {
                    const result = await queryClazzById(payload.id)
                    context.commit("changeClazzFormData", result.data)
                    break;
                }
                case 'student': {
                    const result = await queryStudentById(payload.id)
                    context.commit('changeStudentFormData', result.data)
                    break;
                }
                case 'device': {
                    const result = await queryById(payload.id)
                    context.commit('changeDeviceFormData', result.data)
                }
            }
        },

        clearFormData(context, payload) {
            switch (payload.source) {
                case 'college':
                    context.commit("clearCollegeFormData");
                    break;
                case 'clazz':
                    context.commit("clearClazzFormData");
                    break;
                case 'student':
                    context.commit("clearStudentFormData")
                    break;
                case 'device':
                    context.commit("clearDeviceFormData")
            }
        }
    }
}

export default universityModule