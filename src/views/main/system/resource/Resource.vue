<template>
    <div>
        <common-table :table-types="tableTypes" :config="config">
            <el-form
                label-position="right"
                label-width="80px"
                :model="formData"
                :rules="rules"
                style="max-width: 400px"
                ref="elForm"
            >
                <el-form-item label="名称" prop="name">
                    <el-input v-model="formData.name" />
                </el-form-item>
                <el-form-item label="key值" prop="sourceKey">
                    <el-input v-model="formData.sourceKey" />
                </el-form-item>
                <el-form-item label="资源路径" prop="sourceUrl">
                    <el-input v-model="formData.sourceUrl" />
                </el-form-item>
                <el-form-item label="父级资源">
                    <el-cascader
                        ref="cascader"
                        :options="options"
                        :props="{ checkStrictly: true, value: 'id', label: 'name' }"
                        clearable
                        placeholder="不选默认为顶级资源"
                        @change="cascaderChange"
                    />
                </el-form-item>
                <el-form-item label="层级">
                    <el-input v-model="formData.level" disabled />
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <el-input v-model="formData.sort" />
                </el-form-item>
                <el-form-item>
                    <span class="dialog-footer">
                        <el-button @click="config.dialogFormVisible = false">取消</el-button>
                        <el-button type="primary" @click="commit">提交</el-button>
                    </span>
                </el-form-item>
            </el-form>
        </common-table>
    </div>
</template>

<script lang='ts'>
import { defineComponent, toRef, ref, reactive } from 'vue'
import CommonTable from '@/components/table/CommonTable.vue'
import { tableTypes } from './config/tableConfig'
import { rules } from './hooks/rules'
import { useStore } from '@/store/index'
import { ElCascader, ElForm, ElMessage } from 'element-plus'
import { createResource } from '@/service/system/resource/index'

export default defineComponent({
    name: 'Resource',
    components: {
        CommonTable,

    },
    setup() {
        const config = reactive({
            dialogFormVisible: false,
            tableDataName: 'resourceTree',
            source: 'resoucre',
            isUpdate: false
        })

        const payload = { dataName: 'resource' }
        const store = useStore();
        store.dispatch('system/changeTableData', payload)
        const formData = toRef(store.state.system, 'resourceFormData')
        const options = toRef(store.state.system, 'resourceTree')


        const cascader = ref<typeof ElCascader>();
        const cascaderChange = (value: any) => {

            //这里返回Cascader
            const node = cascader.value?.getCheckedNodes()
            if (node[0]) {
                //这里只能不能用自增运算++,这样算了以后会改变node[0]的值
                formData.value.level = node[0].data.level + 1;
                //这里绑定form中parentId的值
                formData.value.parentId = value[value.length - 1];
            } else {
                //如果没有选择，要把层级重置成1
                formData.value.level = 1;
                //这里需要将parentID重置成0
                formData.value.parentId = 0
            }
        }
        //获取表单对象实例
        const elForm = ref<InstanceType<typeof ElForm>>();

        //用来提交表单数据
        const commit = async () => {
            if (config.isUpdate) {

                console.log("更新")
            } else {
                // console.log(elForm.value)
                await elForm.value?.validate((isValid, invalidFields) => {

                    if (isValid) {
                        // console.log(isValid)
                        //将数据发送到后台完成添加操作
                        createResource(formData.value).then((result) => {
                            if (result.data != -1) {
                                store.dispatch('system/changeTableData', payload).then(() => {
                                    store.dispatch('system/clearFormData', payload)
                                    config.dialogFormVisible = false;

                                })

                            } else {
                                ElMessage.error("系统繁忙~添加失败~")
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
        }
        return {
            tableTypes,
            formData,
            options,
            cascaderChange,
            cascader,
            config,
            rules,
            commit,
            elForm
        }
    },
})

</script>
<style scoped lang='less'>
.el-form-item {
    font-weight: bold;
    .dialog-footer {
        padding: 0 0 0 50px;
    }
}
</style>