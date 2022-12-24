<template>
    <div>
        <div class="query">
            <query-form :form-item-types="queryFormTypes" :query-bean="queryBean" :config="queryFormConfig"
                @search-data="searchData" @reset-form="resetForm">
                <template #accessNetwork>
                    <el-radio-group v-model="queryBean.accessNetwork">
                        <el-radio :label="2">未入网</el-radio>
                        <el-radio :label="1">入网</el-radio>
                    </el-radio-group>
                </template>
                <template #disabled>
                    <el-radio-group v-model="queryBean.disabled">
                        <el-radio :label="2">禁用</el-radio>
                        <el-radio :label="1">启用</el-radio>
                    </el-radio-group>
                </template>
            </query-form>
        </div>
        <common-table :config="config" :table-types="tableTypes" @delete-data="deleteData">
            <template #accessNetwork="{ item }">
                <el-tag v-if="item != 1" type='danger' effect="dark">
                    未入网
                </el-tag>
                <el-tag v-if="item == 1" type='success' effect="dark">
                    入网
                </el-tag>
            </template>
            <template #disabled="{ item }">
                <el-tag v-if="item != 1" type='info' effect="dark">
                    禁用
                </el-tag>
                <el-tag v-if="item == 1" type='success' effect="dark">
                    启用
                </el-tag>
            </template>
            <template #default>
                <base-form :config="config" :form-item-types="formTypes" @commit-data="commitData" :rules="rules">
                    <template #accessNetwork>
                        <el-radio-group v-model="formData.accessNetwork">
                            <el-radio :label="2">未入网</el-radio>
                            <el-radio :label="1">入网</el-radio>
                        </el-radio-group>
                    </template>
                    <template #disabled>
                        <el-switch v-model="formData.disabled" :active-value="1" :inactive-value="2"
                            style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" />
                    </template>
                    <template #productKey>
                        <el-select v-model="formData.productKey" clearable placeholder="请选择">
                            <el-option v-for="item in vaccinationOptions" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
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
import { defineComponent, reactive, watch, toRef } from 'vue'
import CommonTable from '@/components/table/CommonTable.vue'
import { useStore } from '@/store'
import { tableTypes, formTypes, rules, queryFormTypes } from './config/type'
import PageHelp from '@/components/ipage/PageHelp.vue'
import BaseForm from '@/components/from/BaseForm.vue'
import { ElMessage } from 'element-plus'
import { createCar, updateCar, deleteDevice } from '@/service/iot/device'
import QueryForm from '@/components/from/QueryForm.vue'

export default defineComponent({
    name: '',
    components: {
        CommonTable,
        PageHelp,
        BaseForm,
        QueryForm
    },
    setup() {
        const config = reactive({
            title: '设备列表', //标题
            formTitle: "设备",
            tableHeight: 400,
            dialogFormVisible: false, //控制dialog
            tableDataName: 'deviceList',//表格数据源
            formDataName: 'deviceFormData',
            storeModule: 'university',
            source: 'device',//路径标识父组件
            isUpdate: false//是否是更新操作
        });
        //分页信息
        const pageInfo = reactive({
            total: 100,
            page: 1,
            size: 5,
            pageOptions: [{ label: "5条/页", value: 5 }, { label: "10条/页", value: 10 }, { label: "15条/页", value: 15 }]
        })
        //搜索条件
        const queryBean = reactive({
            carNumber: '',
            deviceName: '',
            // type: '',
            disabled: null,
            accessNetwork: null,
            page: 1,
            size: 5,

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
        //拿到表单数据
        const formData = toRef(store.state[config.storeModule], config.formDataName)
        const commitData = async () => {
            if (config.isUpdate) {

                const result = await updateCar(formData.value)
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
                const result = await createCar(formData.value);
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
        const vaccinationOptions = reactive([{ label: "测试产品", value: "i2u8RbzQHjt" }])

        //删除数据
        const deleteData = async (id: number) => {
            const result = await deleteDevice(id);
            if (result.data) {
                //更新表格数据
                await store.dispatch(`${config.storeModule}/changeTableData`, payload)
                //提示删除成功
                ElMessage.success("删除成功~")
            } else {
                ElMessage.error(result.message)
            }
        }
        const queryFormConfig = reactive({
            style: { height: "150px" },
            isResetForm: true
        })
        //条件搜索
        const searchData = () => {
            store.dispatch(`${config.storeModule}/changeTableData`, payload)
        }
        const resetForm = () => {
            queryBean.accessNetwork = null;
            queryBean.disabled = null;
        }
        return {
            tableTypes,
            config,
            pageInfo,
            formTypes,
            commitData,
            formData,
            vaccinationOptions,
            rules,
            deleteData,
            queryFormConfig,
            queryBean,
            searchData,
            queryFormTypes,
            resetForm
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