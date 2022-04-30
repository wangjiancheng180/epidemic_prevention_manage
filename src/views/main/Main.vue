<template>
    <div class="main">
        <el-container>
            <el-aside :width="state.isCollapse ? '65px' : '200px'" class="main-content">
                <side-menu></side-menu>
            </el-aside>
            <el-container class="page">
                <el-header class="page-header">
                    <nav-head></nav-head>
                </el-header>
                <el-main class="page-content">
                    <router-view v-slot="{ Component }">
                        <transition>
                            <keep-alive>
                                <component :is="Component"></component>
                            </keep-alive>
                        </transition>
                    </router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import SideMenu from '@/components/menu/side-menu/src/SideMenu.vue'
import NavHead from '@/components/menu/nav-head/src/NavHead.vue'
import { useState, symbolState } from '@/util/store'
export default defineComponent({
    name: 'Main',
    components: {
        SideMenu,
        NavHead
    },
    setup() {
        return {
            state: useState(symbolState)
        }
    },
})

</script>
<style scoped lang='less'>
.main {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.main-content {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    //改变鼠标光标样式
    cursor: pointer;
    // background-color: #060716;
    //给改变宽度添加动画
    transition: width 0.3s linear;
    //设置滚动条出现时的厚度 这里是为了ie和Firefox浏览器不兼容-webkit-scrollbar
    scrollbar-width: none;
    /* firefox */
    -ms-overflow-style: none;
    /* IE 10+ */


    &::-webkit-scrollbar {
        display: none;
    }
}

.page {
    height: calc(100% - 48px);
    background-color: #f0f2f5;

    .page-header {
        // padding: 0 0 0 0;
        height: 100%;
        background-color: #ffffff;
    }

    .page-content {
        height: calc(100% - 48px);
    }
}
</style>