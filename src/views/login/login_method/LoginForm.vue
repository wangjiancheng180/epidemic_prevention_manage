<template>
  <el-form label-width="70px" :model="loginForm" :rules="loginFormRules" ref="elFormRef">
    <el-form-item label="账号" prop="username" size="large" class="form-item">
      <el-input v-model="loginForm.username" size="large" placeholder="用户名/手机号" />
    </el-form-item>
    <el-form-item label="密码" prop="password" size="large" class="form-item">
      <el-input v-model="loginForm.password" size="large" type="password" show-password />
    </el-form-item>
    <el-form-item label="验证" prop="code" size="large" class="form-item">
      <!-- <el-input v-model="loginForm.code" size="large" class="code" />
      <el-image filt="fill" class="image"></el-image> -->
      <v-code :complete="complete" @success="success" style="width: 100%;"></v-code>
    </el-form-item>
    <el-form-item>
      <div class="submit">
        <el-button type="primary" size="large" @click="submit" :disabled="!complete">立即登录</el-button>
        <el-button type="primary" size="large" @click="resetForm">重置</el-button>
      </div>

    </el-form-item>
  </el-form>
</template>

<script lang='ts'>
import { defineComponent, ref, reactive, onBeforeMount, onMounted } from 'vue'
import { loginFormRules } from './hooks/loginFormRules'
import { ElForm, ElMessage } from "element-plus"
import { login } from '@/service/login'
import { useRouter } from 'vue-router'
import localeCache from '@/util/cache'
import VCode from '@/components/captcha/puzzle-captcha/VCode.vue'


export default defineComponent({
  name: 'LoginForm',
  components: {
    VCode
  },
  setup() {
    const loginForm = reactive({
      username: "",
      password: "",
    })
    //声明elFormRef
    const elFormRef = ref<InstanceType<typeof ElForm>>();
    //重置form表单
    function resetForm() {
      elFormRef.value?.resetFields();
    }
    //获取路由管理者对象
    const router = useRouter();

    //提交form表单信息
    async function submit() {
      //验证表单信息
      await elFormRef.value?.validate((isValid, invalidFields) => {
        if (isValid) {

          login(loginForm).then((result: any) => {
            //这里获取到用户登录成功返回的信息
            // console.log(result)
            switch (result.code) {
              case 1:
                localeCache.setCache("user", result.data)

                //这里只需要在成功登录的时候进行页面跳转
                router.push({
                  name: "Main"
                })
                //这里需要将验证码按钮重置
                complete.value = false;
                break;
              default:
                //其他时候都进行错误提示
                ElMessage.error(result.message)
                break;
            }

          })


        } else {
          //信息提示表单错误,每次只提醒一个表单项的错误
          for (let filed in invalidFields) {
            let item = invalidFields[filed]
            ElMessage.error(item[0].message)
            break;
          }
        }
      })
    }
    onBeforeMount(() => {
      //2.组件挂载页面之前执行----onBeforeMount
    })
    onMounted(() => {
      //3.组件挂载到页面之后执行-------onMounted
    })
    const complete = ref(false)
    function success() {
      complete.value = true;
    }
    return {
      loginForm,
      loginFormRules,
      elFormRef,
      resetForm,
      submit,
      complete,
      success
    }
  },
})

</script>
<style scoped lang='less'>
.form-item {
  font-weight: bold;
}

.submit {
  width: 95%;
  display: flex;
  justify-content: center;

}
</style>