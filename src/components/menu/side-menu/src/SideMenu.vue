<template>
    <div class="side-menu">
        <el-menu active-text-color="#ffd04b" background-color="#060716" class="el-menu-vertical" text-color="#fff"
            :collapse="isCollapse" :router="true">
            <div class="logo">
                <div class="icon"><i class="iconfont">&#xe631;</i></div>
                <div class="title" v-show="!isCollapse">万物互联</div>
            </div>
            <tree-menu :children-list="user.resourceTrees"></tree-menu>
        </el-menu>
    </div>
</template>

<script lang='ts'>
import { defineComponent, toRef, onBeforeMount, onMounted } from 'vue'
import { useState, symbolState } from '@/util/store'
import TreeMenu from './TreeMenu.vue'
import { useStore } from '@/store'
export default defineComponent({
    name: 'SideMenu',
    components: {
        TreeMenu
    },
    setup() {

        onBeforeMount(() => {
            //2.组件挂载页面之前执行----onBeforeMount
        })
        onMounted(() => {
            //3.组件挂载到页面之后执行-------onMounted
        })

        const store = useStore()
        store.dispatch('changeUser', { isFlush: false })
        const user = toRef(store.state, "user")
        //取出state当中的isCollapse
        const state = useState(symbolState);
        //为源响应式对象上的 property 新创建一个 ref。然后可以将 ref 传递出去，从而保持对其源 property 的响应式连接。
        const isCollapse = toRef(state, 'isCollapse');

        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const logo_url = require('@/assets/images/logo.png');
        return {
            isCollapse,
            logo_url,
            user
        }
    },
})

</script>
<style scoped lang='less'>
.logo {
    display: flex;
    height: 180px;
    padding: 0px 50px 0px 100px;
    flex-direction: row;
    // background-color: black;
    // justify-content: space-evenly;
    align-items: center;


    .icon {
        color: white;
        margin: 0 20px 0 0;
    }

    .title {
        font-size: 60px;
        font-weight: 700;
        color: white;

    }
}

.el-menu-vertical {
    height: 100vh;
    //消除组件自带的边框
    border: none;
    transition: width 0.3s linear;
}
</style>