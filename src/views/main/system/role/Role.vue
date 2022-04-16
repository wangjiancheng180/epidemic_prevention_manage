<template>
    <div>
        <common-table :table-types="tableTypes" :config="config" @delete-data="deleteData">
            <template #default>
                <base-form :form-item-types="formItemTypes" :config="config" @commit-data="commitData" :rules="rules">
                    <template #resources>
                        <el-cascader :options="options" :props="props" v-model="formData.resourceModelIds" collapse-tags
                            collapse-tags-tooltip clearable :show-all-levels="false" tag-type="success" />
                    </template>
                    <template #status>
                        <el-radio-group v-model="formData.status">
                            <el-radio :label="0">禁用</el-radio>
                            <el-radio :label="1">启用</el-radio>

                        </el-radio-group>
                    </template>
                </base-form>
            </template>
        </common-table>

    </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRef } from 'vue'
import CommonTable from '@/components/table/CommonTable.vue'
import BaseForm from '@/components/from/BaseForm.vue'
import { SystemState } from "@/store/system/type"
import { tableTypes, formItemTypes } from './config/type'
import { useStore } from '@/store/index'
import { rules } from './hooks/rule'
import { createRole, updateRole, deleteRole } from '@/service/system/role'
import { ElMessage } from 'element-plus'
export default defineComponent({
    name: '',
    components: {
        CommonTable,
        BaseForm
    },
    setup() {
        const config = reactive({
            title: '角色列表', //标题
            tableHeight: 400,
            dialogFormVisible: false, //控制dialog
            tableDataName: 'roleList' as keyof SystemState,//表格数据源
            formDataName: 'roleFormData' as keyof SystemState,
            source: 'role',//路径标识父组件
            isUpdate: false//是否是更新操作
        })
        //这里的palyod相当于一个标识
        const payload = { dataName: 'roleList', source: 'role' }
        const store = useStore();
        //在vuex中改变角色列表
        store.dispatch('system/changeTableData', payload)
        //这里需要获取资源树
        const payload1 = { dataName: 'resourceTree', source: 'resoucre' }
        store.dispatch('system/changeTableData', payload1)
        //获取表单数据
        const formData = toRef(store.state.system, 'roleFormData')
        const props = { multiple: true, value: 'id', label: 'name' }
        const options = toRef(store.state.system, 'resourceTree')


        const commitData = async () => {
            //将与cascade选择器绑定的值转换成后台可提交的数据格式
            if (formData.value.resourceModelIds) {
                //给resourceIds重新赋值前都要清空原来的元素
                formData.value.resourceIds?.splice(0)
                for (let item of formData.value.resourceModelIds) {
                    const id = item[item.length - 1];
                    if (id) {
                        formData.value.resourceIds?.push(id);
                    }
                }
            }
            console.log(formData.value)
            if (config.isUpdate) {
                const result = await updateRole(formData.value);
                if (result.data) {
                    store.dispatch('system/changeTableData', payload).then(() => {
                        //关闭dialog
                        config.dialogFormVisible = false;
                        config.isUpdate = false;
                    })
                } else {
                    ElMessage.error("修改失败~")
                }
            } else {
                const result = await createRole(formData.value);
                if (result.data != 0) {
                    //在vuex中改变角色列表
                    store.dispatch('system/changeTableData', payload).then(() => {
                        //关闭dialog
                        config.dialogFormVisible = false;
                    })
                } else {
                    ElMessage.error("添加失败~")
                }
            }

        }
        const deleteData = async (id: number) => {
            const result = await deleteRole(id);
            if (result.data) {
                store.dispatch('system/changeTableData', payload).then(() => {
                    //提示删除成功
                    ElMessage.success("删除成功~")
                })
            } else {
                ElMessage.error("删除失败~")
            }
        }
        return {
            tableTypes,
            formItemTypes,
            config,
            formData,
            options,
            props,
            commitData,
            deleteData,
            rules
        }
    },
})

</script>
<style scoped lang='less'>
</style>