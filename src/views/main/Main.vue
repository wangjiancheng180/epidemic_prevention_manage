<template>
    <el-container class="main">
        <el-aside width="200px" class="main-content">
            <side-menu></side-menu>
        </el-aside>
        <el-container class="page">
            <el-header class="page-header">
                <nav-head></nav-head>
            </el-header>
            <el-main>
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
</template>

<script lang='ts'>
import { defineComponent, onBeforeMount, onMounted } from 'vue'
import SideMenu from '@/components/menu/side-menu/src/SideMenu.vue'
import NavHead from '@/components/menu/nav-head/src/NavHead.vue'
export default defineComponent({
    name: 'Main',
    components: {
        SideMenu,
        NavHead
    },
    setup() {
        onBeforeMount(() => {
            //2.组件挂载页面之前执行----onBeforeMount
        })
        onMounted(() => {
            //3.组件挂载到页面之后执行-------onMounted
        })
        return {

        }
    },
})

</script>
<style scoped lang='less'>
.page {
    padding: 0px;
    background-color: #f0f2f5;
}

.page-header {
    padding: 0px;
    background-color: #ffffff;
}

.main {
    overflow-x: hidden;
    // padding: 0 30px;
    box-sizing: border-box;
}
.main-content {
    padding: 0px;
}
</style>