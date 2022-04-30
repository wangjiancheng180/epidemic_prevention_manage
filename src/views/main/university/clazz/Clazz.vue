<template>
    <div>
        <div class="query">
            <query-form :form-item-types="queryFormTypes" :query-bean="queryBean" :config="queryFormConfig"
                @search-data="searchData" @reset-form="resetForm">
                <template v-slot:collegeIds>
                    <el-cascader ref="cascader" :options="options"
                        :props="{ checkStrictly: true, value: 'id', label: 'name' }" clearable size="large"
                        @change="cascaderChange" style="min-width: 400px;" />
                </template>
            </query-form>
        </div>
        <common-table :config="config" :table-types="tableTypes" @delete-data="deleteData">
            <template #collegeDtos="clazz">
                <span v-for="item in clazz" :key="item.id">
                    <span v-for="college in item.collegeDtos" :key="college.id">
                        {{ '/' + college.name }}
                    </span>
                </span>
            </template>
            <template #default>
                <base-form :form-item-types="formTypes" :config="config" @commit-data="commitData">
                    <template #collegeIds>
                        <el-cascader :options="options" :props="{ checkStrictly: true, value: 'id', label: 'name' }"
                            v-model="formData.collegeIds" clearable />
                    </template>

                </base-form>
            </template>
            <template #page>
                <page-help :page-info="pageInfo"></page-help>
            </template>
        </common-table>

    </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRef, ref, watch } from 'vue'
import CommonTable from '@/components/table/CommonTable.vue'
import PageHelp from '@/components/ipage/PageHelp.vue'
import BaseForm from '@/components/from/BaseForm.vue'
import QueryForm from '@/components/from/QueryForm.vue'
import { tableTypes, queryFormTypes, formTypes } from './config/type'
import { ElCascader, ElMessage } from 'element-plus'
import { useStore } from '@/store'
import { createClazz, updateClazz, deleteClazz } from '@/service/university/clazz'
export default defineComponent({
    name: 'Clazz',
    components: {
        CommonTable,
        QueryForm,
        PageHelp,
        BaseForm
    },
    setup() {
        //表格和表单的配置
        const config = reactive({
            title: '班级列表', //标题
            formTitle: "班级",
            tableHeight: 400,
            dialogFormVisible: false, //控制dialog
            tableDataName: 'clazzList',//表格数据源
            formDataName: 'clazzFormData',
            storeModule: 'university',
            source: 'clazz',//路径标识父组件
            isUpdate: false//是否是更新操作
        });

        //搜索列表的配置
        const queryFormConfig = reactive({
            style: { height: "100px" },
            isResetForm: true
        })
        //分页信息
        const pageInfo = reactive({
            total: 100,
            page: 1,
            size: 5,
            pageOptions: [{ label: "5条/页", value: 5 }, { label: "10条/页", value: 10 }, { label: "15条/页", value: 15 }]
        })
        //搜索条件
        const queryBean = reactive({
            name: '',
            collegeId: 0,
            page: 1,
            size: 10,

        })
        const store = useStore();
        //填充表格数据
        const payload = { dataName: config.tableDataName, source: config.source, queryBean: queryBean, pageInfo: pageInfo }
        store.dispatch(`${config.storeModule}/changeTableData`, payload)
        watch(() => pageInfo,
            (val, preVal) => {
                if (preVal) {
                    queryBean.page = val.page;
                    queryBean.size = val.size
                    store.dispatch(`${config.storeModule}/changeTableData`, payload)
                }
            },

            { deep: true })


        //这里先要拿到学院资源
        const collegePayload = { dataName: "collegeTrees", source: "college" }
        store.dispatch(`${config.storeModule}/changeTableData`, collegePayload)
        const options = toRef(store.state.university, "collegeTrees");


        const cascaderChange = (value: any) => {
            //这里返回Cascader中选择的节点
            if (value) {
                queryBean.collegeId = value.at(-1)
            }

        }

        //获取el-cascader组件的实例
        const cascader = ref<typeof ElCascader>();
        const resetForm = () => {
            //清空选中的节点
            cascader.value?.panel.clearCheckedNodes()
            queryBean.collegeId = 0
        }
        //条件搜索
        const searchData = () => {
            // console.log(payload)
            store.dispatch(`${config.storeModule}/changeTableData`, payload)
        }

        //拿到表单数据
        const formData = toRef(store.state[config.storeModule], config.formDataName)

        const commitData = async () => {
            if (config.isUpdate) {
                const result = await updateClazz(formData.value)
                if (result.data) {
                    //更新表格数据
                    await store.dispatch(`${config.storeModule}/changeTableData`, payload)
                    //关闭dialog
                    config.dialogFormVisible = false;
                    //将更新标识重置为false
                    config.isUpdate = false;
                } else {
                    ElMessage.error("系统繁忙~修改失败~")
                }

            } else {
                const result = await createClazz(formData.value);
                //将数据发送到后台完成添加操作
                if (result.data) {
                    //更新表格数据
                    await store.dispatch(`${config.storeModule}/changeTableData`, payload)
                    //关闭dialog
                    config.dialogFormVisible = false;

                } else {
                    ElMessage.error("系统繁忙~添加失败~")
                }
            }

        }

        //删除数据
        const deleteData = async (id: number) => {
            const result = await deleteClazz(id);
            if (result.data) {
                //更新表格数据
                await store.dispatch(`${config.storeModule}/changeTableData`, payload)
                //提示删除成功
                ElMessage.success("删除成功~")
            } else {
                ElMessage.error(result.message)
            }
        }

        return {
            config,
            tableTypes,
            queryFormTypes,
            queryBean,
            cascader,
            cascaderChange,
            options,
            queryFormConfig,
            searchData,
            resetForm,
            pageInfo,
            formTypes,
            formData,
            commitData,
            deleteData
        }
    },
})

</script>
<style scoped lang='less'>
.query {

    height: 100%;
    margin: 0 0 20px 0;
}
</style>