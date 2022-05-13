<template>
    <div class="queryform">
        <el-form :inline="true" size="large" label-position="right" label-width="80px" :rules="rulesToRef"
            :model="queryBeanToRef" ref="elForm">
            <template v-for="(formItemType, index) in formTypesToRef" :key="index">
                <el-form-item :label="formItemType.label" :prop="formItemType.prop">
                    <el-input v-if="!formItemType.isSlot" v-model="queryBeanToRef[formItemType.field]"
                        :disabled="formItemType.disabled" :type="formItemType.type"
                        :autosize="{ minRows: 2, maxRows: 4 }" />
                    <slot :name="formItemType.field"></slot>
                </el-form-item>
            </template>
            <el-form-item>

                <el-button @click="resetForm">重置</el-button>
                <el-button type="primary" @click="search">搜索</el-button>

            </el-form-item>
        </el-form>
    </div>
</template>

<script lang='ts'>
import { defineComponent, toRef, PropType, ref } from 'vue'
import { ElForm } from 'element-plus'

interface FormItemType {
    label: string,
    prop?: string,
    field: string,
    type?: string,
    isSlot?: boolean,
    disabled?: boolean
}

export default defineComponent({
    name: 'QueryForm',
    props: {
        formItemTypes: {
            type: Array as PropType<Array<FormItemType>>,
            required: true
        },
        queryBean: {
            type: Object,
            required: true,
        },
        rules: {
            type: Object
        },
        config: {
            type: Object
        }
    },
    emits: ['searchData', 'resetForm'],
    setup(props, ctx) {
        //获取基本配置
        const queryBeanToRef = toRef(props, 'queryBean')
        //获取表单配置
        const formTypesToRef = toRef(props, 'formItemTypes');
        //获取表单校验
        const rulesToRef = toRef(props, 'rules');

        const configToRef = toRef(props, "config")

        //获得form对象
        const elForm = ref<InstanceType<typeof ElForm>>();

        //重置表单
        function resetForm() {
            elForm.value?.resetFields();
            if (configToRef.value?.isResetForm) {
                ctx.emit('resetForm')
            }
        }
        async function search() {
            // console.log("修改")
            // await elForm.value?.validate((isValid, invalidFields) => {
            //     if (isValid) {
            //校验通过提交数据
            ctx.emit('searchData')
            // } else {
            //信息提示表单错误,每次只提醒一个表单项的错误
            //         for (let filed in invalidFields) {
            //             let item = invalidFields[filed]
            //             ElMessage.error(item[0].message)
            //             break;
            //         }
            //     }
            // })
        }
        return {
            queryBeanToRef,
            formTypesToRef,
            search,
            rulesToRef,
            configToRef,
            elForm,
            resetForm
        }
    },
})

</script>
<style scoped lang='less'>
.el-form-item {
    font-weight: bold;
}

.el-form {
    width: 100%;
    // display: flex;
    // align-items: center;
    // flex-wrap: wrap;
    // justify-content: space-around;
}

.queryform {
    padding: 20px 0 0 0;
    background-color: #ffffff;
    display: flex;
    // justify-content: center;
    // align-items: center;
    height: 100%;
}
</style>