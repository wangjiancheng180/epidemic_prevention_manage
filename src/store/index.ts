import { createStore, useStore as useVuexStore, Store } from 'vuex'
import systemModule from './system'
import universityModule from './university'
import { RootWithModule, RootStateType } from './type'
import localCache from '@/util/cache'
import { queryByUsername } from '@/service/system/user'

//将根节点store的state指定为自定义state
const store = createStore<RootStateType>({
  state: {
    user: {
      id: 0,
      username: '',
      nickName: '',
      realName: '',
      sex: 0,
      phone: '',
      status: 0,
      roleDtos: [],
      resourceTrees: [],
    },
    isFlush: true
  },
  mutations: {
    changeUser(state, payload) {
      state.user = { ...payload }
      //这里也要将路由重新刷新
      state.isFlush = true
    }
  },
  actions: {
    async changeUser(context, payload) {
      const user = localCache.getCache("user")
      if (payload.isFlush) {
        //这里是为了修改角色后能及时更改当前用户的权限路径，就是新填资源路径菜单能及时更新不需要重新登录
        const result = await queryByUsername(user.username);
        //把user存到本地
        localCache.setCache("user", result.data)
        context.commit('changeUser', result.data)
      } else {
        context.commit('changeUser', user)
      }


      // console.log(user)



    }
  },
  modules: {
    system: systemModule,
    university: universityModule
  }
})

//将原vuex返回的store<RootStateType>改为Store<RootWithModule>将模块化的各state类型也结合起来
export function useStore(): Store<RootWithModule> {
  return useVuexStore()
}
//这里一定要将store抛出,在main.ts中挂到app上
export default store