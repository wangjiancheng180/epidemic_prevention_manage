<template>
    <div class="side-menu">
        <el-menu
            active-text-color="#ffd04b"
            background-color="#060716"
            class="el-menu-vertical"
            default-active="1-1"
            text-color="#fff"
            :collapse="isCollapse"
        >
            <div class="logo">
                <div class="img">
                    <el-image :src="logo_url" :fit="'fill'"></el-image>
                </div>
                <span class="title" v-show="!isCollapse">万无疫失</span>
            </div>
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
    </div>
</template>

<script lang='ts'>
import { defineComponent, toRef, onBeforeMount, onMounted } from 'vue'
import { useState, symbolState } from '@/util/store'
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
        //取出state当中的isCollapse
        const state = useState(symbolState);
        //为源响应式对象上的 property 新创建一个 ref。然后可以将 ref 传递出去，从而保持对其源 property 的响应式连接。
        const isCollapse = toRef(state, 'isCollapse');

        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const logo_url = require('@/assets/images/logo.png');
        return {
            isCollapse,
            logo_url

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
    .img {
        width: 100px;
        height: 100px;
        // background-color: aqua;
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
}
</style>