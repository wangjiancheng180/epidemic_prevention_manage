import { Module } from "vuex"
import { SystemState } from "./type"
import { RootStateType } from "../type"
import { queryResourceTree } from "@/service/system/resource"
//这里Module要传入两个类型一个是本模块的state类型和节点的state类型
const systemMoule: Module<SystemState, RootStateType> = {
    namespaced: true,
    state: () => ({
        resourceTree: [], //资源信息
        resourceFormData: {
            name: '',
            parentId: 0,
            sourceKey: '',
            sourceUrl: '',
            level: 1,
            sort: 1,
        }
    }),
    mutations: {
        changeResourceTree(state, payload) {
            //更改resourceList
            state.resourceTree = payload
        },
        changeResourceFormData(state, payload) {
            state.resourceFormData = payload
        },
        clearResourceFormData(state) {
            state.resourceFormData.name = '';
            state.resourceFormData.parentId = 0;
            state.resourceFormData.sourceKey = '';
            state.resourceFormData.sourceUrl = '';
            state.resourceFormData.level = 1;
            state.resourceFormData.sort = 1
        }

    },
    actions: {
        //   act:{
        //       //让root=true，这个action就成为全局action了
        //       root:true,handler()}
        async changeTableData(context, payload) {
            //系统管理的数据更新都在这里
            switch (payload.dataName) {
                case 'resource': {
                    const result = await queryResourceTree()
                    context.commit('changeResourceTree', result.data)
                    break;
                }
            }
        },

        changeFormData(context, payload) {
            switch (payload.source) {
                case 'resource':
                    context.commit('changeResourceFormData', payload.formData)
                    break;
            }
        },

        clearFormData(context, payload) {
            switch (payload.source) {
                case 'resource':
                    context.commit('clearResourceFormData')
                    break;
            }
        }


    }
}
export default systemMoule;