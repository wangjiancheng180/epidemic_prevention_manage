//利用Reative 和 provid inje 依赖注入完成对象的共享
import { inject, reactive, readonly } from "vue";


export const symbolState = Symbol('state');
export const symbolChangState = Symbol('chageState');
const state = reactive({ isCollapse: true })
export const createState = (): any => {
    //将对象包装为一个只可读对象
    return readonly(state)
}
//通过方法改变state对象的property
export const changeCollapse = (): void => {
    state.isCollapse = !state.isCollapse
}

export const useState = (symbol: symbol): any => {
    return inject(symbol);
}

