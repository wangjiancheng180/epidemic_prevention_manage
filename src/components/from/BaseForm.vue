<template>
    <div>
        <el-form label-position="right" label-width="80px" :rules="rulesToRef" :model="formData"
            style="max-width: 400px" ref="elForm">
            <template v-for="(formItemType, index) in formTypesToRef" :key="index">
                <el-form-item :label="formItemType.label" :prop="formItemType.prop">
                    <el-input v-if="!formItemType.isSlot" v-model="formData[formItemType.field]"
                        :disabled="formItemType.disabled" :type="formItemType.type"
                        :autosize="{ minRows: 2, maxRows: 4 }" />
                    <slot :name="formItemType.field"></slot>
                </el-form-item>
            </template>
            <el-form-item>
                <span class="dialog-footer">
                    <el-button @click="configToRef.dialogFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="commit">提交</el-button>
                </span>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang='ts'>
import { defineComponent, toRef, PropType, ref } from 'vue'
import { useStore } from '@/store/index'
import { ElForm, ElMessage } from 'element-plus'

interface FormItemType {
    label: string,
    prop?: string,
    field: string,
    type?: string,
    isSlot?: boolean,
    disabled?: boolean
}
interface ConfigType {
    title: string,
    formTitle?: string,
    dialogFormVisible: boolean,
    tableDataName: any,
    formDataName: any,
    storeModule: string,
    source: string,
    isUpdate: boolean
}
export default defineComponent({
    name: 'BaseForm',
    props: {
        formItemTypes: {
            type: Array as PropType<Array<FormItemType>>,
            required: true
        },
        config: {
            type: Object as PropType<ConfigType>,
            required: true,
        },
        rules: {
            type: Object
        }
    },
    emits: ['commitData'],
    setup(props, ctx) {
        //获取基本配置
        const configToRef = toRef(props, 'config')
        //获取表单配置
        const formTypesToRef = toRef(props, 'formItemTypes');
        //获取表单校验
        const rulesToRef = toRef(props, 'rules');

        const store = useStore();
        //拿到表单数据
        const formData = toRef(store.state[configToRef.value.storeModule], configToRef.value.formDataName)

        //获得form对象
        const elForm = ref<InstanceType<typeof ElForm>>();

        async function commit() {
            await elForm.value?.validate((isValid, invalidFields) => {
                if (isValid) {
                    //校验通过提交数据
                    ctx.emit('commitData')
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
        return {
            formData,
            formTypesToRef,
            configToRef,
            commit,
            rulesToRef,
            elForm
        }
    },
})

</script>
<style scoped lang='less'>
// .el-form {
//     max-height: 500px;
// }

.el-form-item {
    font-weight: bold;

    .dialog-footer {
        padding: 0 0 0 100px;
    }
}
</style>