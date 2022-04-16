<template>
    <div class="table">
        <div class="table-head">
            <span class="title">{{ configToRef.title }}</span>
            <el-button type="success" plain @click="createFormData()">新建</el-button>
        </div>
        <el-table :data="tableDataToRef" :border="true" row-key="id" style="width: 100%"
            :height="configToRef.tableHeight">
            <el-table-column v-for="(tableType, index) in tableTypesToRef" :prop="tableType.prop"
                :label="tableType.label" :width="tableType.width" :align="tableType.align || 'left'" :key="index">
                <template v-if="tableType.prop == 'status'" #default="scope">
                    <el-tag v-if="scope.row.status == 1" type='success' effect="dark">
                        启用
                    </el-tag>
                    <el-tag v-if="scope.row.status == 0" type='danger' effect="dark">
                        禁用
                    </el-tag>
                </template>
            </el-table-column>

            <el-table-column fixed="right" label="操作" width="120" :align="'center'">
                <template #default="scope">
                    <el-button type="text" :icon="Edit" @click="updateFormData(scope)"></el-button>
                    <el-button type="text" :icon="Delete" @click="deleteById(scope.row.id)"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog v-model="configToRef.dialogFormVisible" title="新建资源" center :close-on-click-modal="false"
            width="30%">
            <div class="form">
                <slot></slot>
            </div>
        </el-dialog>
    </div>
</template>

<script lang='ts'>
import { defineComponent, toRef, PropType } from 'vue'
import { Delete, Edit } from '@element-plus/icons-vue'
import { SystemState } from "@/store/system/type"
import { useStore } from '@/store'
interface TableTypes {
    prop: string,
    label: string,
    width?: string,
    align?: string
    [propNames: string]: any
}
interface ConfigType {

    title: string,
    tableHeight?: number,
    dialogFormVisible: boolean,
    tableDataName: keyof SystemState,
    source: string,
    isUpdate: boolean
}
export default defineComponent({
    name: 'CommonTable',
    props: {
        tableTypes: {
            type: Array as PropType<Array<TableTypes>>,
            required: true

        },
        config: {
            type: Object as PropType<ConfigType>,
            required: true,
        }
    },
    emits: ['deleteData'],
    setup(props, ctx) {
        //获取基本配置
        const configToRef = toRef(props, 'config')
        //获取表格配置
        const tableTypesToRef = toRef(props, 'tableTypes');
        const store = useStore();
        //获取表格数据
        const tableDataToRef = toRef<SystemState, keyof SystemState>(store.state.system, configToRef.value.tableDataName)

        //更新数据
        function updateFormData(scope: any) {
            const payload = { source: configToRef.value.source, id: scope.row.id }
            store.dispatch('system/changeFormData', payload).then(() => {
                configToRef.value.dialogFormVisible = true;
                configToRef.value.isUpdate = true;
            })
        }
        //新建数据
        const createFormData = async () => {
            const payload = { source: configToRef.value.source }
            await store.dispatch('system/clearFormData', payload)
            configToRef.value.dialogFormVisible = true;
        }

        //删除数据
        function deleteById(id: number) {
            ctx.emit('deleteData', id)
        }
        return {
            tableDataToRef,
            tableTypesToRef,
            configToRef,
            Edit,
            Delete,
            updateFormData,
            createFormData,
            deleteById
        }
    },
})

</script>
<style scoped lang='less'>
.table {
    background-color: #ffffff;

    // height: 2000px;
    // overflow-y: scroll;
    // &::-webkit-scrollbar {
    //     display: none;
    // }
    .table-head {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 20px 20px 20px 20px;
    }

    .title {
        font-size: 80px;
        font-weight: 700;
    }
}

.form {
    display: flex;
    justify-content: center;
    padding: 0 210px 0 0;
}
</style>