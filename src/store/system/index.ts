import { Module } from "vuex"
import { SystemState } from "./type"
import { RootStateType } from "../type"
import { queryResourceTree } from "@/service/system/resource"
//这里Module要传入两个类型一个是本模块的state类型和节点的state类型
const systemMoule: Module<SystemState, RootStateType> = {
    namespaced: true,
    state: () => ({
        resourceList: [] //资源信息
    }),
    mutations: {
        changeResourceList(state, payload) {
            //更改resourceList
            state.resourceList = payload
        }

    },
    actions: {
        //   act:{
        //       //让root=true，这个action就成为全局action了
        //       root:true,handler()}
        async changeData(context, payload) {
            //系统管理的数据更新都在这里
            switch (payload.dataName) {
                case 'resource': {
                    const result = await queryResourceTree()
                    context.commit('changeResourceList', result.data)
                    break;
                }


            }


        }
    }
}
export default systemMoule;