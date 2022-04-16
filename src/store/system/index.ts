import { Module } from "vuex"
import { SystemState } from "./type"
import { RootStateType } from "../type"
import { queryResourceTree, queryResourceById } from "@/service/system/resource"
import { queryRoleList, queryRoleById } from "@/service/system/role"
//这里Module要传入两个类型一个是本模块的state类型和节点的state类型
const systemMoule: Module<SystemState, RootStateType> = {
    namespaced: true,
    state: () => ({
        //资源树结合
        resourceTree: [],
        //资源表单数据
        resourceFormData: {
            id: 0,
            name: '',
            parentId: 0,
            sourceKey: '',
            sourceUrl: '',
            level: 1,
            sort: 1,
            parentIds: []
        },
        //角色集合
        roleList: [],
        //角色表单数据
        roleFormData: {
            id: 0,
            name: '',
            roleKey: '',
            status: 1,
            sort: 1,
            resourceModelIds: [],
            description: '',
            resourceIds: []
        }
    }),
    mutations: {
        //资源管理
        changeResourceTree(state, payload) {
            //更改resourceList
            state.resourceTree = payload
        },
        changeResourceFormData(state, payload) {
            state.resourceFormData = { ...payload }
        },
        clearResourceFormData(state) {
            state.resourceFormData.id = 0;
            state.resourceFormData.name = '';
            state.resourceFormData.parentId = 0;
            state.resourceFormData.sourceKey = '';
            state.resourceFormData.sourceUrl = '';
            state.resourceFormData.level = 1;
            state.resourceFormData.sort = 1;
            state.resourceFormData.parentIds = []
        },

        //角色管理
        changeRoleList(state, payload) {
            state.roleList = payload
        },
        changeRoleFormData(state, payload) {
            state.roleFormData.id = payload.id;
            state.roleFormData.name = payload.name;
            state.roleFormData.roleKey = payload.roleKey;
            state.roleFormData.status = payload.status;
            state.roleFormData.sort = payload.sort;
            state.roleFormData.description = payload.description;
            state.roleFormData.resourceModelIds = payload.resourceModelIds;
            state.roleFormData.resourceIds = []
        },
        clearRoleFormDta(state) {
            state.roleFormData.id = 0;
            state.roleFormData.name = '';
            state.roleFormData.roleKey = '';
            state.roleFormData.sort = 1;
            state.roleFormData.status = 1;
            state.roleFormData.description = '';
            state.roleFormData.resourceIds = [];
            state.roleFormData.resourceModelIds = []
        }

    },
    actions: {
        //   act:{
        //       //让root=true，这个action就成为全局action了
        //       root:true,handler()}
        async changeTableData(context, payload) {
            //系统管理的数据更新都在这里
            switch (payload.dataName) {
                case 'resourceTree': {
                    const result = await queryResourceTree()
                    context.commit('changeResourceTree', result.data)
                    break;
                }
                case 'roleList': {
                    const result = await queryRoleList()
                    context.commit('changeRoleList', result.data)
                    break;
                }
            }
        },

        async changeFormData(context, payload) {
            switch (payload.source) {
                case 'resource': {
                    const result = await queryResourceById(payload.id)
                    context.commit('changeResourceFormData', result.data)
                    break;
                }
                case 'role': {
                    const result = await queryRoleById(payload.id)
                    context.commit('changeRoleFormData', result.data)
                    break;
                }

            }
        },

        clearFormData(context, payload) {
            switch (payload.source) {
                case 'resource':
                    context.commit('clearResourceFormData')
                    break;
                case 'role':
                    context.commit('clearRoleFormDta')
                    break;
            }
        }


    }
}
export default systemMoule;