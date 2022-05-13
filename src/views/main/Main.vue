<template>
    <div class="main">
        <el-container class="main-content">
            <el-aside :width="state.isCollapse ? '65px' : '200px'">
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

.main-content,
.page {
    height: 100%;
}


.el-aside {
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




.page-header {
    padding: 0px;
    // height: 100%;
    // background-color: #ffffff;
}

.page-content {
    height: calc(100% - 48px);
    overflow: scroll;

    &::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 20px;
        /*高宽分别对应横竖滚动条的尺寸*/
        height: 20px;
    }

    &::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 20px;
        background-color: skyblue;
        background-image: -webkit-linear-gradient(45deg,
                rgba(255, 255, 255, 0.2) 25%,
                transparent 25%,
                transparent 50%,
                rgba(255, 255, 255, 0.2) 50%,
                rgba(255, 255, 255, 0.2) 75%,
                transparent 75%,
                transparent);
    }

    &::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: #ededed;
        border-radius: 20px;
    }
}

// .page-content:hover {

// }

.el-footer {
    display: flex;
    color: #333;
    text-align: center;
    align-items: center;
}

.el-header {
    height: 200px !important;
}

.el-main {
    color: #333;
    background-color: #f0f2f5;
}
</style>