<template>
    <div class="nav">
        <el-row justify="space-between">
            <el-col :span="12">
                <div class="head-left">
                    <!-- 菜单栏缩进 -->
                    <div class="icon-box">
                        <el-icon :size="25" :class="state.isCollapse ? '' : 'base-icon-unfold'">
                            <Expand @click="changeCollapse()" />
                        </el-icon>
                    </div>

                    <!-- 面包屑导航 -->
                </div>
            </el-col>

            <el-col :span="12">
                <!-- 用户信息 -->
                <div class="user-information">
                    <el-dropdown>
                        <!-- 头像 -->
                        <div class="avtar-box">
                            <el-avatar size="default"
                                src="https://img-blog.csdnimg.cn/img_convert/c44557e91e69011385a02e707505b19a.png"
                                class="base-avtar"></el-avatar>
                        </div>

                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item>我的信息</el-dropdown-item>
                                <el-dropdown-item>
                                    <el-button type="text" @click="logout"> 退出登录</el-button>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>

                    <el-image :src="msg_logo_url" :fit="'fill'" class="el-img"></el-image>
                    <el-image :src="date_logo_url" :fit="'fill'" class="el-img"></el-image>
                    <el-image :src="github_logo_url" :fit="'fill'" class="el-img"></el-image>
                    <el-image :src="wechat_logo_url" :fit="'fill'" class="el-img"></el-image>
                    <el-image :src="qq_logo_url" :fit="'fill'" class="el-img"></el-image>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script lang='ts'>
import { defineComponent, onBeforeMount, onMounted } from 'vue'
import { Expand } from '@element-plus/icons-vue'
import { useState, symbolState, symbolChangState } from '@/util/store'


export default defineComponent({
    name: 'NavHead',
    components: {
        Expand
    },
    emits: ['logout'],
    setup(props, context) {
        onBeforeMount(() => {
            //2.组件挂载页面之前执行----onBeforeMount
        })
        onMounted(() => {
            //3.组件挂载到页面之后执行-------onMounted
        })

        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const qq_logo_url = require('@/assets/images/qq_logo.png');

        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const wechat_logo_url = require('@/assets/images/wechat_logo.png');

        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const github_logo_url = require('@/assets/images/github_logo.png');

        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const date_logo_url = require('@/assets/images/date_logo.png');

        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const msg_logo_url = require('@/assets/images/msg_logo.png');
        const state = useState(symbolState);
        const changeCollapse = useState(symbolChangState)

        function logout() {
            context.emit("logout")
        }

        return {
            qq_logo_url,
            wechat_logo_url,
            github_logo_url,
            date_logo_url,
            msg_logo_url,
            changeCollapse,
            state,
            logout
        }
    },
})

</script>
<style scoped lang='less'>
.nav {
    overflow-x: hidden;
}

.head-left {
    height: 200px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .icon-box {
        cursor: pointer;
        margin: 0 0 0 70px;
    }

    .base-icon-unfold {
        transform: rotate(180deg);
    }
}

.user-information {
    display: flex;
    height: 200px;
    margin: 0 70px 0 0;
    flex-direction: row-reverse;
    justify-content: flex-start;
    align-items: center;

    .el-img {
        width: 100px;
        height: 100px;
        margin: 0 60px 0 0;
    }
}
</style>