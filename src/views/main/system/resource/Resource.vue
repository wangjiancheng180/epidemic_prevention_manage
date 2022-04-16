<template>
    <div>
        <common-table :table-types="tableTypes" :config="config" @delete-data="deleteData">
            <base-form :form-item-types="formTypes" :config="config" :rules="rules" @commit-data="commitData">
                <template v-slot:parentIds>
                    <el-cascader ref="cascader" :options="options"
                        :props="{ checkStrictly: true, value: 'id', label: 'name' }" clearable
                        v-model="formData.parentIds" placeholder="不选默认为顶级资源" @change="cascaderChange" />
                </template>
            </base-form>
        </common-table>
    </div>
</template>

<script lang='ts'>
import { defineComponent, toRef, ref, reactive } from 'vue'
import CommonTable from '@/components/table/CommonTable.vue'
import { tableTypes, formTypes } from './config/type'
import { rules } from './hooks/rules'
import { useStore } from '@/store/index'
import { ElCascader, ElMessage } from 'element-plus'
import { createResource, updateResource, deleteResource } from '@/service/system/resource/index'
import { SystemState } from "@/store/system/type"
import BaseForm from '@/components/from/BaseForm.vue'
export default defineComponent({
    name: 'Resource',
    components: {
        CommonTable,
        BaseForm
    },
    setup() {
        // CommonTable的基本配置
        const config = reactive({
            title: '资源列表', //标题
            tableHeight: 400,
            dialogFormVisible: false, //控制dialog
            tableDataName: 'resourceTree' as keyof SystemState,//表格数据源
            formDataName: 'resourceFormData' as keyof SystemState,
            source: 'resource',//路径标识父组件
            isUpdate: false//是否是更新操作
        })
        //这里的palyod相当于一个标识
        const payload = { dataName: 'resourceTree', source: 'resoucre' }
        const store = useStore();
        //在vuex中改变资源树
        store.dispatch('system/changeTableData', payload)
        //拿到表单数据
        const formData = toRef(store.state.system, 'resourceFormData')
        //这里拿资源树是因为cascade多联级选择器（父级资源）需要用
        const options = toRef(store.state.system, 'resourceTree')

        //获取el-cascader组件的实例
        const cascader = ref<typeof ElCascader>();

        const cascaderChange = (value: any) => {
            //这里返回Cascader中选择的节点
            const node = cascader.value?.getCheckedNodes()
            if (node[0]) {
                //计算层级：父级资源层级+1
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

        const commitData = async () => {
            if (config.isUpdate) {
                const result = await updateResource(formData.value)
                if (result.data) {
                    //更新表格数据
                    store.dispatch('system/changeTableData', payload).then(() => {
                        //关闭dialog
                        config.dialogFormVisible = false;
                        //将更新标识重置为false
                        config.isUpdate = false;

                    })
                } else {
                    ElMessage.error("系统繁忙~修改失败~")
                }

            } else {
                const result = await createResource(formData.value);
                //将数据发送到后台完成添加操作
                if (result.data != -1) {
                    //更新表格数据
                    store.dispatch('system/changeTableData', payload).then(() => {
                        //关闭dialog
                        config.dialogFormVisible = false;
                    })
                } else {
                    ElMessage.error("系统繁忙~添加失败~")
                }
            }
        }

        //删除数据
        const deleteData = async (id: number) => {
            const result = await deleteResource(id);
            if (result.data) {
                //更新表格数据
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
            formTypes,
            formData,
            options,
            cascaderChange,
            cascader,
            config,
            rules,
            commitData,
            deleteData
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