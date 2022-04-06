<template>
    <div class="table">
        <div class="table-head">
            <span class="title">资源列表</span>
            <el-button type="success" plain @click="configToRef.dialogFormVisible = true">新建</el-button>
        </div>
        <el-table :data="tableDataToRef" :border="true" row-key="id" style="width: 100%">
            <el-table-column
                v-for="(tableType, index) in tableTypesToRef"
                :prop="tableType.prop"
                :label="tableType.label"
                :width="tableType.width"
                :align="tableType.align || 'left'"
                :key="index"
            />
            <el-table-column fixed="right" label="Operations" width="120">
                <template #default>
                    <el-button type="text" size="small">Detail</el-button>
                    <el-button type="text" size="small">Edit</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
            v-model="configToRef.dialogFormVisible"
            title="新建资源"
            center
            :close-on-click-modal="false"
            width="30%"
        >
            <div class="form">
                <slot></slot>
            </div>
        </el-dialog>
    </div>
</template>

<script lang='ts'>
import { defineComponent, toRef, PropType } from 'vue'
import { useStore } from '@/store'
interface TableTypes {
    prop: string,
    label: string,
    width?: string,
    align?: string
    [propNames: string]: any
}
interface ConfigType {
    dialogFormVisible: boolean,
    tableDataName: string,
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
    setup(props) {
        const configToRef = toRef(props, 'config')
        const store = useStore();
        const tableDataToRef = toRef<any, string>(store.state.system, configToRef.value.tableDataName)
        const tableTypesToRef = toRef(props, 'tableTypes');

        return {
            tableDataToRef,
            tableTypesToRef,
            configToRef,
        }
    },
})

</script>
<style scoped lang='less'>
.table {
    background-color: #ffffff;
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