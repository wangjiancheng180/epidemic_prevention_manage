<template>
    <div>
        <common-table :table-types="tableTypes" :config="config" @delete-data="deleteData">
            <template #status="{ item }">

                <el-tag v-if="item == 1" type='success' effect="dark">
                    启用
                </el-tag>
                <el-tag v-if="item == 0" type='danger' effect="dark">
                    禁用
                </el-tag>

            </template>
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
            formTitle: "角色",
            tableHeight: 400,
            dialogFormVisible: false, //控制dialog
            tableDataName: 'roleList' as keyof SystemState,//表格数据源
            formDataName: 'roleFormData' as keyof SystemState,
            storeModule: 'system',//vuex的store模块
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
        //当前登录用户的信息
        const userToRef = toRef(store.state, 'user')
        //判断当前修改的角色是否跟当前登录的用户有所关联
        function isOrNot(roleId: number): boolean {

            for (const role of userToRef.value.roleDtos) {
                if (role.id === roleId) {
                    return true
                }
            }
            return false
        }


        const commitData = async () => {
            //将与cascade选择器绑定的值转换成后台可提交的数据格式
            if (formData.value.resourceModelIds) {
                //给resourceIds重新赋值前都要清空原来的元素
                formData.value.resourceIds = []
                for (let item of formData.value.resourceModelIds) {
                    for (const id of item) {
                        if (formData.value.resourceIds.includes(id)) {
                            continue;
                        }
                        formData.value.resourceIds.push(id)
                    }
                }
            }
            if (config.isUpdate) {
                // console.log(formData.value)
                const result = await updateRole(formData.value);
                if (result.data) {
                    //这里比对一下修改的角色跟当前登录的用户是否有关
                    if (isOrNot(formData.value.id)) {
                        //改变vuex中的user
                        store.dispatch('changeUser', { isFlush: true })
                    }


                    store.dispatch('system/changeTableData', payload).then(() => {
                        //关闭dialog
                        config.dialogFormVisible = false;
                        config.isUpdate = false;
                    })
                } else {
                    ElMessage.error("修改失败~")
                }
            } else {
                // console.log(formData.value)
                const result = await createRole(formData.value);
                if (result.data != -1) {
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
                //这里比对一下修改的角色跟当前登录的用户是否有关
                if (isOrNot(id)) {
                    //改变vuex中的user
                    store.dispatch('changeUser', { isFlush: true })

                }
                store.dispatch('system/changeTableData', payload).then(() => {
                    //提示删除成功
                    ElMessage.success("删除成功~")
                })
            } else {
                ElMessage.error(result.message)
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