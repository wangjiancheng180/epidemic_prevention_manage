<template>
  <el-form label-width="70px" :model="loginForm" :rules="loginFormRules" ref="elFormRef">
    <el-form-item label="账号" prop="username" size="large" class="form-item">
      <el-input v-model="loginForm.username" size="large" placeholder="用户名/手机号" />
    </el-form-item>
    <el-form-item label="密码" prop="password" size="large" class="form-item">
      <el-input v-model="loginForm.password" size="large" type="password" show-password />
    </el-form-item>
    <el-form-item label="验证码" prop="code" size="large" class="form-item">
      <el-input v-model="loginForm.code" size="large" class="code" />
      <el-image filt="fill" class="image"></el-image>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="large" @click="submit">立即登录</el-button>
      <el-button type="primary" size="large" @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang='ts'>
import { defineComponent, ref, reactive, onBeforeMount, onMounted } from 'vue'
import { loginFormRules } from './hooks/loginFormRules'
import { ElForm, ElMessage } from "element-plus"
import { login } from '@/service/login'



export default defineComponent({
  name: 'LoginForm',
  setup() {
    const loginForm = reactive({
      username: "",
      password: "",
      code: ""
    })
    //声明elFormRef
    const elFormRef = ref<InstanceType<typeof ElForm>>();
    //重置form表单
    function resetForm() {
      elFormRef.value?.resetFields();
    }

    //提交form表单信息
    async function submit() {
      //验证表单信息
      await elFormRef.value?.validate((isValid, invalidFields) => {
        if (isValid) {
          // console.log(loginForm);
          const a = login(loginForm);
          // console.log(a)
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
    return {
      loginForm,
      loginFormRules,
      elFormRef,
      resetForm,
      submit
    }
  },
})

</script>
<style scoped lang='less'>
.form-item {
  font-weight: bold;

  .code {
    width: 500px;
  }

  .image {
    margin-left: 160px;
    width: 500px;

    border-radius: 20px;
  }
}
</style>