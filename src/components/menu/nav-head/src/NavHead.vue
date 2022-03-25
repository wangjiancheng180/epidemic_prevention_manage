<template>
    <div class="nav">
        <el-row class="head" justify="space-between">
            <!-- 面包屑导航 -->
            <el-col :span="12" class="bread-crumb"></el-col>

            <el-col :span="12" class="find-user">
                <el-row justify="end" class="address" :gutter="10">
                    <!-- 作者联系方式 -->

                    <el-col :span="2" class="image">
                        <el-image :src="qq_logo_url" :fit="'fill'"></el-image>
                    </el-col>
                    <el-col :span="2" class="image">
                        <el-image :src="wechat_logo_url" :fit="'fill'"></el-image>
                    </el-col>
                    <el-col :span="2" class="image">
                        <el-image :src="github_logo_url" :fit="'fill'"></el-image>
                    </el-col>
                    <el-col :span="2" class="image">
                        <el-image :src="date_logo_url" :fit="'fill'"></el-image>
                    </el-col>
                    <el-col :span="2" class="image">
                        <el-image :src="msg_logo_url" :fit="'fill'"></el-image>
                    </el-col>

                    <!-- 用户信息 -->
                    <el-col :span="3">
                        <el-dropdown>
                            <!-- 头像 -->
                            <el-avatar
                                size="large"
                                src="https://img-blog.csdnimg.cn/img_convert/c44557e91e69011385a02e707505b19a.png"
                            ></el-avatar>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item>我的信息</el-dropdown-item>
                                    <el-dropdown-item>退出登录</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script lang='ts'>
import { defineComponent, onBeforeMount, onMounted } from 'vue'
export default defineComponent({
    name: 'NavHead',
    setup() {
        onBeforeMount(() => {
            //2.组件挂载页面之前执行----onBeforeMount
        })
        onMounted(() => {
            //3.组件挂载到页面之后执行-------onMounted
        })

        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const qq_logo_url = require('../../../../assets/images/qq_logo.png');

        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const wechat_logo_url = require('../../../../assets/images/wechat_logo.png');

        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const github_logo_url = require('../../../../assets/images/github_logo.png');

        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const date_logo_url = require('../../../../assets/images/date_logo.png');

        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const msg_logo_url = require('../../../../assets/images/msg_logo.png');


        return {
            qq_logo_url,
            wechat_logo_url,
            github_logo_url,
            date_logo_url,
            msg_logo_url
        }
    },
})

</script>
<style scoped lang='less'>
.nav {
    overflow-x: hidden;
    // padding: 0 30px;
    box-sizing: border-box;
}
// .head {
//     border: 1px solid rebeccapurple;
// }

.address {
    height: 100%;
    .image {
        padding-top: 30px;
    }
}
.avatar {
    .rem2px(height, 1.1);
}
</style>