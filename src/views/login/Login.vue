<template>
    <div class="login-form">
        <el-tabs stretch type="border-card" v-model="activeName">
            <el-tab-pane name="first">
                <template #label>
                    <span class="custom-tabs-label">
                        <el-icon color="black" size="40">
                            <UserFilled />
                        </el-icon>
                        <span>用户名登陆</span>
                    </span>
                </template>
                <login-form></login-form>
            </el-tab-pane>
            <el-tab-pane name="second">
                <template #label>
                    <span class="custom-tabs-label">
                        <el-icon color="black" size="40">
                            <Iphone />
                        </el-icon>
                        <span>手机号登陆</span>
                    </span>
                </template>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script lang='ts'>
import { defineComponent, ref, onBeforeMount, onMounted } from 'vue'
import LoginForm from './login_method/LoginForm.vue'
import {
    UserFilled,
    Iphone,
} from '@element-plus/icons-vue'
export default defineComponent({
    name: 'Login',
    components: {
        UserFilled,
        Iphone,
        LoginForm
    },
    setup() {

        const activeName = ref("first")
        onBeforeMount(() => {
            //2.组件挂载页面之前执行----onBeforeMount
        })
        onMounted(() => {
            //3.组件挂载到页面之后执行-------onMounted
        })



        return {
            activeName
        }
    },
})

</script>
<style scoped lang='less'>
.login-form {
    .rem2px(width, 8);
    // .rem2px(height, 4);
    border: 1px solid rebeccapurple;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.custom-tabs-label {
    .el-icon {
        vertical-align: middle;
    }
    span {
        vertical-align: middle;
        margin-left: 10px;
    }
}
</style>