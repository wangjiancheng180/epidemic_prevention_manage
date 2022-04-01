import { createStore, useStore as useVuexStore, Store } from 'vuex'
import systemMoule from './system'
import { RootWithModule, RootStateType } from './type'

//将根节点store的state指定为自定义state
const store = createStore<RootStateType>({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    system: systemMoule
  }
})

//将原vuex返回的store<RootStateType>改为Store<RootWithModule>将模块化的各state类型也结合起来
export function useStore(): Store<RootWithModule> {
  return useVuexStore()
}
//这里一定要将store抛出,在main.ts中挂到app上
export default store