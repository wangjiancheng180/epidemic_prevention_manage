<template>
    <div>
        <el-row class="tac">
            <el-col :span="24" class="menu-vertical">
                <h5 class="mb-2">万无“疫”失物联网平台</h5>
                <el-menu
                    active-text-color="#ffd04b"
                    background-color="#060716"
                    class="el-menu-vertical-demo"
                    default-active="2"
                    text-color="#fff"
                    @open="handleOpen"
                    @close="handleClose"
                >
                    <el-sub-menu index="1">
                        <template #title>
                            <el-icon color="#FFFFFF">
                                <UserFilled />
                            </el-icon>
                            <span>用户</span>
                        </template>
                        <el-menu-item-group title="Group One">
                            <el-menu-item index="1-1">item one</el-menu-item>
                            <el-menu-item index="1-2">item one</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="Group Two">
                            <el-menu-item index="1-3">item three</el-menu-item>
                        </el-menu-item-group>
                        <el-sub-menu index="1-4">
                            <template #title>item four</template>
                            <el-menu-item index="1-4-1">item one</el-menu-item>
                        </el-sub-menu>
                    </el-sub-menu>
                    <el-menu-item index="2">
                        <el-icon>
                            <icon-menu />
                        </el-icon>
                        <span>Navigator Two</span>
                    </el-menu-item>
                    <el-menu-item index="3" disabled>
                        <el-icon>
                            <document />
                        </el-icon>
                        <span>Navigator Three</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <el-icon>
                            <setting />
                        </el-icon>
                        <span>Navigator Four</span>
                    </el-menu-item>
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>

<script lang='ts'>
import { defineComponent, onBeforeMount, onMounted } from 'vue'
import {
    Document,
    Menu as IconMenu,
    Setting,
    UserFilled
} from '@element-plus/icons-vue'
export default defineComponent({
    name: 'SideMenu',
    components: {
        Document,
        IconMenu,
        Setting,
        UserFilled
    },
    setup() {
        onBeforeMount(() => {
            //2.组件挂载页面之前执行----onBeforeMount
        })
        onMounted(() => {
            //3.组件挂载到页面之后执行-------onMounted
        })
        const handleOpen = (key: string, keyPath: string[]) => {
            console.log(key, keyPath)
        }
        const handleClose = (key: string, keyPath: string[]) => {
            console.log(key, keyPath)
        }
        return {
            handleOpen,
            handleClose

        }
    },
})

</script>
<style scoped lang='less'>
.menu-vertical {
    height: 100vh;
    background-color: #060716;
    overflow-x: hidden;
    overflow-y: hidden;
}
.mb-2 {
    width: 100%;
    color: #ffffff;
    text-align: center;
    // .px2rem(font-size, 32);
    .rem2px(font-size, 0.3);
}
</style>