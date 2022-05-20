<template>
    <div>
        <common-table :config="config" :table-types="tableTypes" @delete-data="deleteData">
            <template #sex="{ item }">
                <span>{{ item === '002' ? '男' : '女' }}</span>
            </template>
            <template #status="{ item }">

                <el-tag v-if="item == 1" type='success' effect="dark">
                    启用
                </el-tag>
                <el-tag v-if="item == 2" type='danger' effect="dark">
                    禁用
                </el-tag>
            </template>
            <template #roleDtos="{ item }">
                <el-tag v-for="role of item" :key="role.id" effect="dark">
                    {{ role.name }}
                </el-tag>
            </template>
            <template #default>
                <base-form :config="config" :form-item-types="formItemTypes" @commit-data="commitData">
                    <template #sex>
                        <el-radio-group v-model="formData.sex">
                            <el-radio :label="'002'">男</el-radio>
                            <el-radio :label="'003'">女</el-radio>
                        </el-radio-group>
                    </template>
                    <template #status>
                        <el-radio-group v-model="formData.status">
                            <el-radio :label="1">启用</el-radio>
                            <el-radio :label="2">禁用</el-radio>

                        </el-radio-group>
                    </template>
                    <template #roleIds>
                        <el-select v-model="formData.roleIds" multiple collapse-tags collapse-tags-tooltip
                            placeholder="Select" style="width: 240px">
                            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id" />
                        </el-select>
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
import { useStore } from '@/store/index'
import { tableTypes, formItemTypes } from './config/type'
import { ElMessage } from 'element-plus'
import { createUserInfo, updateUserInfo, deleteUserInfo } from '@/service/system/user'
export default defineComponent({
    name: 'User',
    components: {
        CommonTable,
        BaseForm
    },
    setup() {
        const config = reactive({
            title: '用户列表', //标题
            formTitle: "用户",
            tableHeight: 400,
            dialogFormVisible: false, //控制dialog
            tableDataName: 'userList',//表格数据源
            formDataName: 'userFormData',
            storeModule: 'system',//vuex的store模块
            source: 'user',//路径标识父组件
            isUpdate: false//是否是更新操作
        })
        //这里的palyod相当于一个标识
        const payload = { dataName: 'userList', source: 'user' }
        const store = useStore();
        //在vuex中改变用户列表
        store.dispatch('system/changeTableData', payload)

        //这里需要获取角色资源
        const payload1 = { dataName: 'roleList', source: 'role' }
        store.dispatch('system/changeTableData', payload1)
        const options = toRef(store.state.system, 'roleList')
        const formData = toRef(store.state.system, 'userFormData')

        const commitData = async () => {
            //将与cascade选择器绑定的值转换成后台可提交的数据格式
            if (config.isUpdate) {
                // console.log(formData.value)
                const result = await updateUserInfo(formData.value);
                if (result.data) {

                    store.dispatch('system/changeTableData', payload).then(() => {
                        //关闭dialog
                        config.dialogFormVisible = false;
                        config.isUpdate = false;
                    })
                } else {
                    ElMessage.error(result.message)
                }
            } else {
                // console.log(formData.value)
                const result = await createUserInfo(formData.value);
                if (result.data) {
                    //在vuex中改变角色列表
                    store.dispatch('system/changeTableData', payload).then(() => {
                        //关闭dialog
                        config.dialogFormVisible = false;
                    })
                } else {
                    ElMessage.error(result.message)
                }
            }

        }
        const deleteData = async (id: number) => {
            const result = await deleteUserInfo(id);
            if (result.data) {

                store.dispatch('system/changeTableData', payload).then(() => {
                    //提示删除成功
                    ElMessage.success("删除成功~")
                })
            } else {
                ElMessage.error(result.message)
            }
        }
        return {
            config,
            tableTypes,
            formItemTypes,
            formData,
            options,
            commitData,
            deleteData
        }
    },
})

</script>
<style scoped lang='less'>
</style>